var Mm = Object.defineProperty;
var Mf = (i) => {
  throw TypeError(i);
};
var Xm = (i, e, t) => e in i ? Mm(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var Bt = (i, e, t) => Xm(i, typeof e != "symbol" ? e + "" : e, t), Al = (i, e, t) => e.has(i) || Mf("Cannot " + t);
var A = (i, e, t) => (Al(i, e, "read from private field"), t ? t.call(i) : e.get(i)), $e = (i, e, t) => e.has(i) ? Mf("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), ke = (i, e, t, n) => (Al(i, e, "write to private field"), n ? n.call(i, t) : e.set(i, t), t), Ie = (i, e, t) => (Al(i, e, "access private method"), t);
var Nd;
typeof window < "u" && ((Nd = window.__svelte ?? (window.__svelte = {})).v ?? (Nd.v = /* @__PURE__ */ new Set())).add("5");
let Sr = !1, jm = !1;
function Lm() {
  Sr = !0;
}
Lm();
const Im = 1, Dm = 2, Wd = 4, zm = 8, Nm = 16, Ym = 1, qm = 2, Wm = 4, Vm = 8, Bm = 16, Vd = 1, Gm = 2, $t = Symbol("uninitialized"), Bd = "http://www.w3.org/1999/xhtml", Gd = !1;
var sl = Array.isArray, Um = Array.prototype.indexOf, ps = Array.prototype.includes, rl = Array.from, Ud = Object.defineProperty, qs = Object.getOwnPropertyDescriptor, Fd = Object.getOwnPropertyDescriptors, Fm = Object.prototype, Hm = Array.prototype, Zc = Object.getPrototypeOf, Xf = Object.isExtensible;
const Os = () => {
};
function Km(i) {
  return i();
}
function wh(i) {
  for (var e = 0; e < i.length; e++)
    i[e]();
}
function Hd() {
  var i, e, t = new Promise((n, s) => {
    i = n, e = s;
  });
  return { promise: t, resolve: i, reject: e };
}
function Jm(i, e) {
  if (Array.isArray(i))
    return i;
  if (!(Symbol.iterator in i))
    return Array.from(i);
  const t = [];
  for (const n of i)
    if (t.push(n), t.length === e) break;
  return t;
}
const Mt = 2, or = 4, To = 8, Kd = 1 << 24, Xi = 16, Di = 32, Vn = 64, xh = 128, Si = 512, yt = 1024, Zt = 2048, zi = 4096, qt = 8192, ki = 16384, Cs = 32768, Sh = 1 << 25, ar = 65536, Sa = 1 << 17, ev = 1 << 18, kr = 1 << 19, Jd = 1 << 20, tn = 1 << 25, xs = 65536, ka = 1 << 21, Ws = 1 << 22, qn = 1 << 23, wn = Symbol("$state"), tv = Symbol("legacy props"), iv = Symbol(""), ca = Symbol("attributes"), kh = Symbol("class"), Qh = Symbol("style"), Nr = Symbol("text"), fa = Symbol("form reset"), ol = new class extends Error {
  constructor() {
    super(...arguments);
    Bt(this, "name", "StaleReactionError");
    Bt(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Yd;
const nv = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Yd = globalThis.document) != null && Yd.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function Ec(i) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function sv() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function rv(i, e, t) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function ov(i) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function av() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function lv(i) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function hv() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function cv(i) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function fv() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function uv() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function dv() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function pv() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function Ov() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function gv() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function mv() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function ep(i) {
  return i === this.v;
}
function Ac(i, e) {
  return i != i ? e == e : i !== e || i !== null && typeof i == "object" || typeof i == "function";
}
function tp(i) {
  return !Ac(i, this.v);
}
let rt = null;
function lr(i) {
  rt = i;
}
function xt(i, e = !1, t) {
  rt = {
    p: rt,
    i: !1,
    c: null,
    e: null,
    s: i,
    x: null,
    r: (
      /** @type {Effect} */
      Ee
    ),
    l: Sr && !e ? { s: null, u: null, $: [] } : null
  };
}
function St(i) {
  var e = (
    /** @type {ComponentContext} */
    rt
  ), t = e.e;
  if (t !== null) {
    e.e = null;
    for (var n of t)
      Sp(n);
  }
  return e.i = !0, rt = e.p, /** @type {T} */
  {};
}
function Qr() {
  return !Sr || rt !== null && rt.l === null;
}
let rs = [];
function ip() {
  var i = rs;
  rs = [], wh(i);
}
function Wn(i) {
  if (rs.length === 0 && !Hr) {
    var e = rs;
    queueMicrotask(() => {
      e === rs && ip();
    });
  }
  rs.push(i);
}
function vv() {
  for (; rs.length > 0; )
    ip();
}
function np(i) {
  var e = Ee;
  if (e === null)
    return Ae.f |= qn, i;
  if ((e.f & Cs) === 0 && (e.f & or) === 0)
    throw i;
  Nn(i, e);
}
function Nn(i, e) {
  for (; e !== null; ) {
    if ((e.f & xh) !== 0) {
      if ((e.f & Cs) === 0)
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
const bv = -7169;
function ct(i, e) {
  i.f = i.f & bv | e;
}
function Rc(i) {
  (i.f & Si) !== 0 || i.deps === null ? ct(i, yt) : ct(i, zi);
}
function sp(i) {
  if (i !== null)
    for (const e of i)
      (e.f & Mt) === 0 || (e.f & xs) === 0 || (e.f ^= xs, sp(
        /** @type {Derived} */
        e.deps
      ));
}
function rp(i, e, t) {
  (i.f & Zt) !== 0 ? e.add(i) : (i.f & zi) !== 0 && t.add(i), sp(i.deps), ct(i, yt);
}
function op(i, e, t) {
  if (i == null)
    return e(void 0), Os;
  const n = b(
    () => i.subscribe(
      e,
      // @ts-expect-error
      t
    )
  );
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const As = [];
function $n(i, e = Os) {
  let t = null;
  const n = /* @__PURE__ */ new Set();
  function s(a) {
    if (Ac(i, a) && (i = a, t)) {
      const l = !As.length;
      for (const h of n)
        h[1](), As.push(h, i);
      if (l) {
        for (let h = 0; h < As.length; h += 2)
          As[h][0](As[h + 1]);
        As.length = 0;
      }
    }
  }
  function r(a) {
    s(a(
      /** @type {T} */
      i
    ));
  }
  function o(a, l = Os) {
    const h = [a, l];
    return n.add(h), n.size === 1 && (t = e(s, r) || Os), a(
      /** @type {T} */
      i
    ), () => {
      n.delete(h), n.size === 0 && t && (t(), t = null);
    };
  }
  return { set: s, update: r, subscribe: o };
}
function ap(i) {
  let e;
  return op(i, (t) => e = t)(), e;
}
let $h = !1, No = !1, _h = Symbol("unmounted");
function ft(i, e, t) {
  const n = t[e] ?? (t[e] = {
    store: null,
    source: /* @__PURE__ */ W(void 0),
    unsubscribe: Os
  });
  if (n.store !== i && !(_h in t))
    if (n.unsubscribe(), n.store = i ?? null, i == null)
      n.source.v = void 0, n.unsubscribe = Os;
    else {
      var s = !0;
      n.unsubscribe = op(i, (r) => {
        s ? n.source.v = r : S(n.source, r);
      }), s = !1;
    }
  return i && _h in t ? ap(i) : u(n.source);
}
function _n() {
  const i = {};
  function e() {
    ll(() => {
      for (var t in i)
        i[t].unsubscribe();
      Ud(i, _h, {
        enumerable: !1,
        value: !0
      });
    });
  }
  return [i, e];
}
function yv(i, e) {
  $h = !0;
  try {
    i.set(e);
  } finally {
    $h = !1;
  }
}
function Rl(i, e, t) {
  return yv(i, t), e;
}
function wv(i) {
  var e = No;
  try {
    return No = !1, [i(), No];
  } finally {
    No = e;
  }
}
let Ml = null, Rs = null, ge = null, Fr = null, At = null, Ph = null, Hr = !1, Xl = !1, Is = null, ua = null;
var jf = 0;
let xv = 1;
var er, In, ls, tr, ir, hs, nr, On, So, li, ko, Dn, Fi, Hi, sr, cs, We, Th, Yr, Ch, lp, hp, da, Sv, Zh, Ms;
const tl = class tl {
  constructor() {
    $e(this, We);
    Bt(this, "id", xv++);
    /** True as soon as `#process` was called */
    $e(this, er, !1);
    Bt(this, "linked", !0);
    /** @type {Batch | null} */
    $e(this, In, null);
    /** @type {Batch | null} */
    $e(this, ls, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    Bt(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    Bt(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    Bt(this, "previous", /* @__PURE__ */ new Map());
    /**
     * Async effects which this batch doesn't take into account anymore when calculating blockers,
     * as it has a value for it already.
     * @type {Set<Effect>}
     */
    Bt(this, "unblocked", /* @__PURE__ */ new Set());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    $e(this, tr, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    $e(this, ir, /* @__PURE__ */ new Set());
    /**
     * Callbacks that should run only when a fork is committed.
     * @type {Set<(batch: Batch) => void>}
     */
    $e(this, hs, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    $e(this, nr, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    $e(this, On, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    $e(this, So, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    $e(this, li, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    $e(this, ko, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    $e(this, Dn, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    $e(this, Fi, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    $e(this, Hi, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    $e(this, sr, /* @__PURE__ */ new Set());
    Bt(this, "is_fork", !1);
    $e(this, cs, !1);
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    A(this, Hi).has(e) || A(this, Hi).set(e, { d: [], m: [] }), A(this, sr).delete(e);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(e, t = (n) => this.schedule(n)) {
    var n = A(this, Hi).get(e);
    if (n) {
      A(this, Hi).delete(e);
      for (var s of n.d)
        ct(s, Zt), t(s);
      for (s of n.m)
        ct(s, zi), t(s);
    }
    A(this, sr).add(e);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(e, t, n = !1) {
    e.v !== $t && !this.previous.has(e) && this.previous.set(e, e.v), (e.f & qn) === 0 && (this.current.set(e, [t, n]), At == null || At.set(e, t)), this.is_fork || (e.v = t);
  }
  activate() {
    ge = this;
  }
  deactivate() {
    ge = null, At = null;
  }
  flush() {
    try {
      Xl = !0, ge = this, Ie(this, We, Yr).call(this);
    } finally {
      jf = 0, Ph = null, Is = null, ua = null, Xl = !1, ge = null, At = null, gs.clear();
    }
  }
  discard() {
    for (const e of A(this, ir)) e(this);
    A(this, ir).clear(), A(this, hs).clear(), Ie(this, We, Ms).call(this);
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(e) {
    A(this, ko).push(e);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(e, t) {
    if (ke(this, nr, A(this, nr) + 1), e) {
      let n = A(this, On).get(t) ?? 0;
      A(this, On).set(t, n + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(e, t) {
    if (ke(this, nr, A(this, nr) - 1), e) {
      let n = A(this, On).get(t) ?? 0;
      n === 1 ? A(this, On).delete(t) : A(this, On).set(t, n - 1);
    }
    A(this, cs) || (ke(this, cs, !0), Wn(() => {
      ke(this, cs, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(e, t) {
    for (const n of e)
      A(this, Dn).add(n);
    for (const n of t)
      A(this, Fi).add(n);
    e.clear(), t.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    A(this, tr).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    A(this, ir).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  on_fork_commit(e) {
    A(this, hs).add(e);
  }
  run_fork_commit_callbacks() {
    for (const e of A(this, hs)) e(this);
    A(this, hs).clear();
  }
  settled() {
    return (A(this, So) ?? ke(this, So, Hd())).promise;
  }
  static ensure() {
    var e;
    if (ge === null) {
      const t = ge = new tl();
      Ie(e = t, We, Zh).call(e), !Xl && !Hr && Wn(() => {
        A(t, er) || t.flush();
      });
    }
    return ge;
  }
  apply() {
    {
      At = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    var s;
    if (Ph = e, (s = e.b) != null && s.is_pending && (e.f & (or | To | Kd)) !== 0 && (e.f & Cs) === 0) {
      e.b.defer_effect(e);
      return;
    }
    for (var t = e; t.parent !== null; ) {
      t = t.parent;
      var n = t.f;
      if (Is !== null && t === Ee && (Ae === null || (Ae.f & Mt) === 0) && !$h)
        return;
      if ((n & (Vn | Di)) !== 0) {
        if ((n & yt) === 0)
          return;
        t.f ^= yt;
      }
    }
    A(this, li).push(t);
  }
};
er = new WeakMap(), In = new WeakMap(), ls = new WeakMap(), tr = new WeakMap(), ir = new WeakMap(), hs = new WeakMap(), nr = new WeakMap(), On = new WeakMap(), So = new WeakMap(), li = new WeakMap(), ko = new WeakMap(), Dn = new WeakMap(), Fi = new WeakMap(), Hi = new WeakMap(), sr = new WeakMap(), cs = new WeakMap(), We = new WeakSet(), Th = function() {
  if (this.is_fork) return !0;
  for (const n of A(this, On).keys()) {
    for (var e = n, t = !1; e.parent !== null; ) {
      if (A(this, Hi).has(e)) {
        t = !0;
        break;
      }
      e = e.parent;
    }
    if (!t)
      return !0;
  }
  return !1;
}, Yr = function() {
  var l, h, c, f;
  if (ke(this, er, !0), jf++ > 1e3 && (Ie(this, We, Ms).call(this), Qv()), !Ie(this, We, Th).call(this)) {
    for (const d of A(this, Dn))
      A(this, Fi).delete(d), ct(d, Zt), this.schedule(d);
    for (const d of A(this, Fi))
      ct(d, zi), this.schedule(d);
  }
  const e = A(this, li);
  ke(this, li, []), this.apply();
  var t = Is = [], n = [], s = ua = [];
  for (const d of e)
    try {
      Ie(this, We, Ch).call(this, d, t, n);
    } catch (p) {
      throw up(d), p;
    }
  if (ge = null, s.length > 0) {
    var r = tl.ensure();
    for (const d of s)
      r.schedule(d);
  }
  if (Is = null, ua = null, Ie(this, We, Th).call(this)) {
    Ie(this, We, da).call(this, n), Ie(this, We, da).call(this, t);
    for (const [d, p] of A(this, Hi))
      fp(d, p);
    s.length > 0 && /** @type {unknown} */
    Ie(l = ge, We, Yr).call(l);
    return;
  }
  const o = Ie(this, We, lp).call(this);
  if (o) {
    Ie(h = o, We, hp).call(h, this);
    return;
  }
  A(this, Dn).clear(), A(this, Fi).clear();
  for (const d of A(this, tr)) d(this);
  A(this, tr).clear(), Fr = this, Lf(n), Lf(t), Fr = null, (c = A(this, So)) == null || c.resolve();
  var a = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    ge
  );
  if (this.linked && A(this, nr) === 0 && Ie(this, We, Ms).call(this), A(this, li).length > 0) {
    a === null && (a = this, Ie(this, We, Zh).call(this));
    const d = a;
    A(d, li).push(...A(this, li).filter((p) => !A(d, li).includes(p)));
  }
  a !== null && Ie(f = a, We, Yr).call(f);
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
Ch = function(e, t, n) {
  e.f ^= yt;
  for (var s = e.first; s !== null; ) {
    var r = s.f, o = (r & (Di | Vn)) !== 0, a = o && (r & yt) !== 0, l = a || (r & qt) !== 0 || A(this, Hi).has(s);
    if (!l && s.fn !== null) {
      o ? s.f ^= yt : (r & or) !== 0 ? t.push(s) : $r(s) && ((r & Xi) !== 0 && A(this, Fi).add(s), $s(s));
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
}, lp = function() {
  for (var e = A(this, In); e !== null; ) {
    if (!e.is_fork) {
      for (const [t, [, n]] of this.current)
        if (e.current.has(t) && !n)
          return e;
    }
    e = A(e, In);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
hp = function(e) {
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
      for (const l of r) {
        var o = l.f;
        if ((o & Mt) !== 0)
          t(
            /** @type {Derived} */
            l
          );
        else {
          var a = (
            /** @type {Effect} */
            l
          );
          o & (Ws | Xi) && !this.async_deriveds.has(a) && (A(this, Fi).delete(a), ct(a, Zt), this.schedule(a));
        }
      }
  };
  for (const s of this.current.keys())
    t(s);
  this.oncommit(() => e.discard()), Ie(n = e, We, Ms).call(n), ge = this, Ie(this, We, Yr).call(this);
}, /**
 * @param {Effect[]} effects
 */
da = function(e) {
  for (var t = 0; t < e.length; t += 1)
    rp(e[t], A(this, Dn), A(this, Fi));
}, Sv = function() {
  var c;
  Ie(this, We, Ms).call(this);
  for (let f = Ml; f !== null; f = A(f, ls)) {
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
    if (A(f, er)) {
      var s = [...f.current.keys()].filter((d) => !this.current.has(d));
      if (s.length === 0)
        e && f.discard();
      else if (t.length > 0) {
        if (e)
          for (const d of A(this, sr))
            f.unskip_effect(d, (p) => {
              var O;
              (p.f & (Xi | Ws)) !== 0 ? f.schedule(p) : Ie(O = f, We, da).call(O, [p]);
            });
        f.activate();
        var r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (var a of t)
          cp(a, s, r, o);
        o = /* @__PURE__ */ new Map();
        var l = [...f.current.keys()].filter(
          (d) => this.current.has(d) ? (
            /** @type {[any, boolean]} */
            this.current.get(d)[0] !== d.v
          ) : !0
        );
        if (l.length > 0)
          for (const d of A(this, ko))
            (d.f & (ki | qt | Sa)) === 0 && Mc(d, l, o) && ((d.f & (Ws | Xi)) !== 0 ? (ct(d, Zt), f.schedule(d)) : A(f, Dn).add(d));
        if (A(f, li).length > 0 && !A(f, cs)) {
          f.apply();
          for (var h of A(f, li))
            Ie(c = f, We, Ch).call(c, h, [], []);
          ke(f, li, []);
        }
        f.deactivate();
      }
    }
  }
}, Zh = function() {
  Rs === null ? Ml = Rs = this : (ke(Rs, ls, this), ke(this, In, Rs)), Rs = this;
}, Ms = function() {
  var e = A(this, In), t = A(this, ls);
  e === null ? Ml = t : ke(e, ls, t), t === null ? Rs = e : ke(t, In, e), this.linked = !1;
};
let Ss = tl;
function kv(i) {
  var e = Hr;
  Hr = !0;
  try {
    for (var t; ; ) {
      if (vv(), ge === null)
        return (
          /** @type {T} */
          t
        );
      ge.flush();
    }
  } finally {
    Hr = e;
  }
}
function Qv() {
  try {
    hv();
  } catch (i) {
    Nn(i, Ph);
  }
}
let Ai = null;
function Lf(i) {
  var e = i.length;
  if (e !== 0) {
    for (var t = 0; t < e; ) {
      var n = i[t++];
      if ((n.f & (ki | qt)) === 0 && $r(n) && (Ai = /* @__PURE__ */ new Set(), $s(n), n.deps === null && n.first === null && n.nodes === null && n.teardown === null && n.ac === null && Qp(n), (Ai == null ? void 0 : Ai.size) > 0)) {
        gs.clear();
        for (const s of Ai) {
          if ((s.f & (ki | qt)) !== 0) continue;
          const r = [s];
          let o = s.parent;
          for (; o !== null; )
            Ai.has(o) && (Ai.delete(o), r.push(o)), o = o.parent;
          for (let a = r.length - 1; a >= 0; a--) {
            const l = r[a];
            (l.f & (ki | qt)) === 0 && $s(l);
          }
        }
        Ai.clear();
      }
    }
    Ai = null;
  }
}
function cp(i, e, t, n) {
  if (!t.has(i) && (t.add(i), i.reactions !== null))
    for (const s of i.reactions) {
      const r = s.f;
      (r & Mt) !== 0 ? cp(
        /** @type {Derived} */
        s,
        e,
        t,
        n
      ) : (r & (Ws | Xi)) !== 0 && (r & Zt) === 0 && Mc(s, e, n) && (ct(s, Zt), Xc(
        /** @type {Effect} */
        s
      ));
    }
}
function Mc(i, e, t) {
  const n = t.get(i);
  if (n !== void 0) return n;
  if (i.deps !== null)
    for (const s of i.deps) {
      if (ps.call(e, s))
        return !0;
      if ((s.f & Mt) !== 0 && Mc(
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
function Xc(i) {
  ge.schedule(i);
}
function fp(i, e) {
  if (!((i.f & Di) !== 0 && (i.f & yt) !== 0)) {
    (i.f & Zt) !== 0 ? e.d.push(i) : (i.f & zi) !== 0 && e.m.push(i), ct(i, yt);
    for (var t = i.first; t !== null; )
      fp(t, e), t = t.next;
  }
}
function up(i) {
  ct(i, yt);
  for (var e = i.first; e !== null; )
    up(e), e = e.next;
}
function $v(i) {
  let e = 0, t = Qs(0), n;
  return () => {
    Ic() && (u(t), Zs(() => (e === 0 && (n = b(() => i(() => Kr(t)))), e += 1, () => {
      Wn(() => {
        e -= 1, e === 0 && (n == null || n(), n = void 0, Kr(t));
      });
    })));
  };
}
var _v = ar | kr;
function Pv(i, e, t, n) {
  new Tv(i, e, t, n);
}
var Oi, Cc, gi, fs, Ut, mi, Dt, hi, gn, us, zn, rr, Qo, $o, mn, il, Ot, Cv, Zv, Ev, Eh, pa, Oa, Ah, Rh;
class Tv {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(e, t, n, s) {
    $e(this, Ot);
    /** @type {Boundary | null} */
    Bt(this, "parent");
    Bt(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    Bt(this, "transform_error");
    /** @type {TemplateNode} */
    $e(this, Oi);
    /** @type {TemplateNode | null} */
    $e(this, Cc, null);
    /** @type {BoundaryProps} */
    $e(this, gi);
    /** @type {((anchor: Node) => void)} */
    $e(this, fs);
    /** @type {Effect} */
    $e(this, Ut);
    /** @type {Effect | null} */
    $e(this, mi, null);
    /** @type {Effect | null} */
    $e(this, Dt, null);
    /** @type {Effect | null} */
    $e(this, hi, null);
    /** @type {DocumentFragment | null} */
    $e(this, gn, null);
    $e(this, us, 0);
    $e(this, zn, 0);
    $e(this, rr, !1);
    /** @type {Set<Effect>} */
    $e(this, Qo, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    $e(this, $o, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    $e(this, mn, null);
    $e(this, il, $v(() => (ke(this, mn, Qs(A(this, us))), () => {
      ke(this, mn, null);
    })));
    var r;
    ke(this, Oi, e), ke(this, gi, t), ke(this, fs, (o) => {
      var a = (
        /** @type {Effect} */
        Ee
      );
      a.b = this, a.f |= xh, n(o);
    }), this.parent = /** @type {Effect} */
    Ee.b, this.transform_error = s ?? ((r = this.parent) == null ? void 0 : r.transform_error) ?? ((o) => o), ke(this, Ut, cl(() => {
      Ie(this, Ot, Eh).call(this);
    }, _v));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(e) {
    rp(e, A(this, Qo), A(this, $o));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!A(this, gi).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(e, t) {
    Ie(this, Ot, Ah).call(this, e, t), ke(this, us, A(this, us) + e), !(!A(this, mn) || A(this, rr)) && (ke(this, rr, !0), Wn(() => {
      ke(this, rr, !1), A(this, mn) && cr(A(this, mn), A(this, us));
    }));
  }
  get_effect_pending() {
    return A(this, il).call(this), u(
      /** @type {Source<number>} */
      A(this, mn)
    );
  }
  /** @param {unknown} error */
  error(e) {
    if (!A(this, gi).onerror && !A(this, gi).failed)
      throw e;
    ge != null && ge.is_fork ? (A(this, mi) && ge.skip_effect(A(this, mi)), A(this, Dt) && ge.skip_effect(A(this, Dt)), A(this, hi) && ge.skip_effect(A(this, hi)), ge.on_fork_commit(() => {
      Ie(this, Ot, Rh).call(this, e);
    })) : Ie(this, Ot, Rh).call(this, e);
  }
}
Oi = new WeakMap(), Cc = new WeakMap(), gi = new WeakMap(), fs = new WeakMap(), Ut = new WeakMap(), mi = new WeakMap(), Dt = new WeakMap(), hi = new WeakMap(), gn = new WeakMap(), us = new WeakMap(), zn = new WeakMap(), rr = new WeakMap(), Qo = new WeakMap(), $o = new WeakMap(), mn = new WeakMap(), il = new WeakMap(), Ot = new WeakSet(), Cv = function() {
  try {
    ke(this, mi, vi(() => A(this, fs).call(this, A(this, Oi))));
  } catch (e) {
    this.error(e);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
Zv = function(e) {
  const t = A(this, gi).failed;
  t && ke(this, hi, vi(() => {
    t(
      A(this, Oi),
      () => e,
      () => () => {
      }
    );
  }));
}, Ev = function() {
  const e = A(this, gi).pending;
  e && (this.is_pending = !0, ke(this, Dt, vi(() => e(A(this, Oi)))), Wn(() => {
    var t = ke(this, gn, document.createDocumentFragment()), n = xn();
    t.append(n), ke(this, mi, Ie(this, Ot, Oa).call(this, () => vi(() => A(this, fs).call(this, n)))), A(this, zn) === 0 && (A(this, Oi).before(t), ke(this, gn, null), ms(
      /** @type {Effect} */
      A(this, Dt),
      () => {
        ke(this, Dt, null);
      }
    ), Ie(this, Ot, pa).call(
      this,
      /** @type {Batch} */
      ge
    ));
  }));
}, Eh = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), ke(this, zn, 0), ke(this, us, 0), ke(this, mi, vi(() => {
      A(this, fs).call(this, A(this, Oi));
    })), A(this, zn) > 0) {
      var e = ke(this, gn, document.createDocumentFragment());
      Nc(A(this, mi), e);
      const t = (
        /** @type {(anchor: Node) => void} */
        A(this, gi).pending
      );
      ke(this, Dt, vi(() => t(A(this, Oi))));
    } else
      Ie(this, Ot, pa).call(
        this,
        /** @type {Batch} */
        ge
      );
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {Batch} batch
 */
pa = function(e) {
  this.is_pending = !1, e.transfer_effects(A(this, Qo), A(this, $o));
}, /**
 * @template T
 * @param {() => T} fn
 */
Oa = function(e) {
  var t = Ee, n = Ae, s = rt;
  Pi(A(this, Ut)), _i(A(this, Ut)), lr(A(this, Ut).ctx);
  try {
    return Ss.ensure(), e();
  } catch (r) {
    return np(r), null;
  } finally {
    Pi(t), _i(n), lr(s);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
Ah = function(e, t) {
  var n;
  if (!this.has_pending_snippet()) {
    this.parent && Ie(n = this.parent, Ot, Ah).call(n, e, t);
    return;
  }
  ke(this, zn, A(this, zn) + e), A(this, zn) === 0 && (Ie(this, Ot, pa).call(this, t), A(this, Dt) && ms(A(this, Dt), () => {
    ke(this, Dt, null);
  }), A(this, gn) && (A(this, Oi).before(A(this, gn)), ke(this, gn, null)));
}, /**
 * @param {unknown} error
 */
Rh = function(e) {
  A(this, mi) && (ti(A(this, mi)), ke(this, mi, null)), A(this, Dt) && (ti(A(this, Dt)), ke(this, Dt, null)), A(this, hi) && (ti(A(this, hi)), ke(this, hi, null));
  var t = A(this, gi).onerror;
  let n = A(this, gi).failed;
  var s = !1, r = !1;
  const o = () => {
    if (s) {
      mv();
      return;
    }
    s = !0, r && pv(), A(this, hi) !== null && ms(A(this, hi), () => {
      ke(this, hi, null);
    }), Ie(this, Ot, Oa).call(this, () => {
      Ie(this, Ot, Eh).call(this);
    });
  }, a = (l) => {
    try {
      r = !0, t == null || t(l, o), r = !1;
    } catch (h) {
      Nn(h, A(this, Ut) && A(this, Ut).parent);
    }
    n && ke(this, hi, Ie(this, Ot, Oa).call(this, () => {
      try {
        return vi(() => {
          var h = (
            /** @type {Effect} */
            Ee
          );
          h.b = this, h.f |= xh, n(
            A(this, Oi),
            () => l,
            () => o
          );
        });
      } catch (h) {
        return Nn(
          h,
          /** @type {Effect} */
          A(this, Ut).parent
        ), null;
      }
    }));
  };
  Wn(() => {
    var l;
    try {
      l = this.transform_error(e);
    } catch (h) {
      Nn(h, A(this, Ut) && A(this, Ut).parent);
      return;
    }
    l !== null && typeof l == "object" && typeof /** @type {any} */
    l.then == "function" ? l.then(
      a,
      /** @param {unknown} e */
      (h) => Nn(h, A(this, Ut) && A(this, Ut).parent)
    ) : a(l);
  });
};
function Av(i, e, t, n) {
  const s = Qr() ? hr : _t;
  var r = i.filter((d) => !d.settled);
  if (t.length === 0 && r.length === 0) {
    n(e.map(s));
    return;
  }
  var o = (
    /** @type {Effect} */
    Ee
  ), a = Rv(), l = r.length === 1 ? r[0].promise : r.length > 1 ? Promise.all(r.map((d) => d.promise)) : null;
  function h(d) {
    if ((o.f & ki) === 0) {
      a();
      try {
        n(d);
      } catch (p) {
        Nn(p, o);
      }
      Qa();
    }
  }
  var c = dp();
  if (t.length === 0) {
    l.then(() => h(e.map(s))).finally(c);
    return;
  }
  function f() {
    Promise.all(t.map((d) => /* @__PURE__ */ Mv(d))).then((d) => h([...e.map(s), ...d])).catch((d) => Nn(d, o)).finally(c);
  }
  l ? l.then(() => {
    a(), f(), Qa();
  }) : f();
}
function Rv() {
  var i = (
    /** @type {Effect} */
    Ee
  ), e = Ae, t = rt, n = (
    /** @type {Batch} */
    ge
  );
  return function(r = !0) {
    Pi(i), _i(e), lr(t), r && (i.f & ki) === 0 && (n == null || n.activate(), n == null || n.apply());
  };
}
function Qa(i = !0) {
  Pi(null), _i(null), lr(null), i && (ge == null || ge.deactivate());
}
function dp() {
  var i = (
    /** @type {Effect} */
    Ee
  ), e = (
    /** @type {Boundary} */
    i.b
  ), t = (
    /** @type {Batch} */
    ge
  ), n = e.is_rendered();
  return e.update_pending_count(1, t), t.increment(n, i), () => {
    e.update_pending_count(-1, t), t.decrement(n, i);
  };
}
// @__NO_SIDE_EFFECTS__
function hr(i) {
  var e = Mt | Zt;
  return Ee !== null && (Ee.f |= kr), {
    ctx: rt,
    deps: null,
    effects: null,
    equals: ep,
    f: e,
    fn: i,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      $t
    ),
    wv: 0,
    parent: Ee,
    ac: null
  };
}
const Yo = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function Mv(i, e, t) {
  let n = (
    /** @type {Effect | null} */
    Ee
  );
  n === null && sv();
  var s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), r = Qs(
    /** @type {V} */
    $t
  ), o = !Ae, a = /* @__PURE__ */ new Set();
  return Bv(() => {
    var p;
    var l = (
      /** @type {Effect} */
      Ee
    ), h = Hd();
    s = h.promise;
    try {
      Promise.resolve(i()).then(h.resolve, (O) => {
        O !== ol && h.reject(O);
      }).finally(Qa);
    } catch (O) {
      h.reject(O), Qa();
    }
    var c = (
      /** @type {Batch} */
      ge
    );
    if (o) {
      if ((l.f & Cs) !== 0)
        var f = dp();
      if (
        /** @type {Boundary} */
        n.b.is_rendered()
      )
        (p = c.async_deriveds.get(l)) == null || p.reject(Yo);
      else
        for (const O of a.values())
          O.reject(Yo);
      a.add(h), c.async_deriveds.set(l, h);
    }
    const d = (O, g = void 0) => {
      f == null || f(), a.delete(h), g !== Yo && (c.activate(), g ? (r.f |= qn, cr(r, g)) : ((r.f & qn) !== 0 && (r.f ^= qn), cr(r, O)), c.deactivate());
    };
    h.promise.then(d, (O) => d(null, O || "unknown"));
  }), ll(() => {
    for (const l of a)
      l.reject(Yo);
  }), new Promise((l) => {
    function h(c) {
      function f() {
        c === s ? l(r) : h(s);
      }
      c.then(f, f);
    }
    h(s);
  });
}
// @__NO_SIDE_EFFECTS__
function ks(i) {
  const e = /* @__PURE__ */ hr(i);
  return Pp(e), e;
}
// @__NO_SIDE_EFFECTS__
function _t(i) {
  const e = /* @__PURE__ */ hr(i);
  return e.equals = tp, e;
}
function Xv(i) {
  var e = i.effects;
  if (e !== null) {
    i.effects = null;
    for (var t = 0; t < e.length; t += 1)
      ti(
        /** @type {Effect} */
        e[t]
      );
  }
}
function jc(i) {
  var e, t = Ee, n = i.parent;
  if (!kn && n !== null && i.v !== $t && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (n.f & (ki | qt)) !== 0)
    return Ov(), i.v;
  Pi(n);
  try {
    i.f &= ~xs, Xv(i), e = Ep(i);
  } finally {
    Pi(t);
  }
  return e;
}
function pp(i) {
  var e = jc(i);
  if (!i.equals(e) && (i.wv = Cp(), (!(ge != null && ge.is_fork) || i.deps === null) && (ge !== null ? (ge.capture(i, e, !0), Fr == null || Fr.capture(i, e, !0)) : i.v = e, i.deps === null))) {
    ct(i, yt);
    return;
  }
  kn || (At !== null ? (Ic() || ge != null && ge.is_fork) && At.set(i, e) : Rc(i));
}
function jv(i) {
  var e, t;
  if (i.effects !== null)
    for (const n of i.effects)
      (n.teardown || n.ac) && ((e = n.teardown) == null || e.call(n), (t = n.ac) == null || t.abort(ol), n.fn !== null && (n.teardown = Os), n.ac = null, lo(n, 0), Dc(n));
}
function Op(i) {
  if (i.effects !== null)
    for (const e of i.effects)
      e.teardown && e.fn !== null && $s(e);
}
let $a = /* @__PURE__ */ new Set();
const gs = /* @__PURE__ */ new Map();
let gp = !1;
function Qs(i, e) {
  var t = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: i,
    reactions: null,
    equals: ep,
    rv: 0,
    wv: 0
  };
  return t;
}
// @__NO_SIDE_EFFECTS__
function En(i, e) {
  const t = Qs(i);
  return Pp(t), t;
}
// @__NO_SIDE_EFFECTS__
function W(i, e = !1, t = !0) {
  var s;
  const n = Qs(i);
  return e || (n.equals = tp), Sr && t && rt !== null && rt.l !== null && ((s = rt.l).s ?? (s.s = [])).push(n), n;
}
function Rn(i, e) {
  return S(
    i,
    b(() => u(i))
  ), e;
}
function S(i, e, t = !1) {
  Ae !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!ji || (Ae.f & Sa) !== 0) && Qr() && (Ae.f & (Mt | Xi | Ws | Sa)) !== 0 && (Qi === null || !ps.call(Qi, i)) && dv();
  let n = t ? Ds(e) : e;
  return cr(i, n, ua);
}
function cr(i, e, t = null) {
  if (!i.equals(e)) {
    gs.set(i, kn ? e : i.v);
    var n = Ss.ensure();
    if (n.capture(i, e), (i.f & Mt) !== 0) {
      const s = (
        /** @type {Derived} */
        i
      );
      (i.f & Zt) !== 0 && jc(s), At === null && Rc(s);
    }
    i.wv = Cp(), mp(i, Zt, t), Qr() && Ee !== null && (Ee.f & yt) !== 0 && (Ee.f & (Di | Vn)) === 0 && (pi === null ? Fv([i]) : pi.push(i)), !n.is_fork && $a.size > 0 && !gp && Lv();
  }
  return e;
}
function Lv() {
  gp = !1;
  for (const i of $a) {
    (i.f & yt) !== 0 && ct(i, zi);
    let e;
    try {
      e = $r(i);
    } catch {
      e = !0;
    }
    e && $s(i);
  }
  $a.clear();
}
function Kr(i) {
  S(i, i.v + 1);
}
function mp(i, e, t) {
  var n = i.reactions;
  if (n !== null)
    for (var s = Qr(), r = n.length, o = 0; o < r; o++) {
      var a = n[o], l = a.f;
      if (!(!s && a === Ee)) {
        var h = (l & Zt) === 0;
        if (h && ct(a, e), (l & Sa) !== 0)
          $a.add(
            /** @type {Effect} */
            a
          );
        else if ((l & Mt) !== 0) {
          var c = (
            /** @type {Derived} */
            a
          );
          At == null || At.delete(c), (l & xs) === 0 && (l & Si && (Ee === null || (Ee.f & ka) === 0) && (a.f |= xs), mp(c, zi, t));
        } else if (h) {
          var f = (
            /** @type {Effect} */
            a
          );
          (l & Xi) !== 0 && Ai !== null && Ai.add(f), t !== null ? t.push(f) : Xc(f);
        }
      }
    }
}
function Ds(i) {
  if (typeof i != "object" || i === null || wn in i)
    return i;
  const e = Zc(i);
  if (e !== Fm && e !== Hm)
    return i;
  var t = /* @__PURE__ */ new Map(), n = sl(i), s = /* @__PURE__ */ En(0), r = vs, o = (a) => {
    if (vs === r)
      return a();
    var l = Ae, h = vs;
    _i(null), Yf(r);
    var c = a();
    return _i(l), Yf(h), c;
  };
  return n && t.set("length", /* @__PURE__ */ En(
    /** @type {any[]} */
    i.length
  )), new Proxy(
    /** @type {any} */
    i,
    {
      defineProperty(a, l, h) {
        (!("value" in h) || h.configurable === !1 || h.enumerable === !1 || h.writable === !1) && fv();
        var c = t.get(l);
        return c === void 0 ? o(() => {
          var f = /* @__PURE__ */ En(h.value);
          return t.set(l, f), f;
        }) : S(c, h.value, !0), !0;
      },
      deleteProperty(a, l) {
        var h = t.get(l);
        if (h === void 0) {
          if (l in a) {
            const c = o(() => /* @__PURE__ */ En($t));
            t.set(l, c), Kr(s);
          }
        } else
          S(h, $t), Kr(s);
        return !0;
      },
      get(a, l, h) {
        var p;
        if (l === wn)
          return i;
        var c = t.get(l), f = l in a;
        if (c === void 0 && (!f || (p = qs(a, l)) != null && p.writable) && (c = o(() => {
          var O = Ds(f ? a[l] : $t), g = /* @__PURE__ */ En(O);
          return g;
        }), t.set(l, c)), c !== void 0) {
          var d = u(c);
          return d === $t ? void 0 : d;
        }
        return Reflect.get(a, l, h);
      },
      getOwnPropertyDescriptor(a, l) {
        var h = Reflect.getOwnPropertyDescriptor(a, l);
        if (h && "value" in h) {
          var c = t.get(l);
          c && (h.value = u(c));
        } else if (h === void 0) {
          var f = t.get(l), d = f == null ? void 0 : f.v;
          if (f !== void 0 && d !== $t)
            return {
              enumerable: !0,
              configurable: !0,
              value: d,
              writable: !0
            };
        }
        return h;
      },
      has(a, l) {
        var d;
        if (l === wn)
          return !0;
        var h = t.get(l), c = h !== void 0 && h.v !== $t || Reflect.has(a, l);
        if (h !== void 0 || Ee !== null && (!c || (d = qs(a, l)) != null && d.writable)) {
          h === void 0 && (h = o(() => {
            var p = c ? Ds(a[l]) : $t, O = /* @__PURE__ */ En(p);
            return O;
          }), t.set(l, h));
          var f = u(h);
          if (f === $t)
            return !1;
        }
        return c;
      },
      set(a, l, h, c) {
        var k;
        var f = t.get(l), d = l in a;
        if (n && l === "length")
          for (var p = h; p < /** @type {Source<number>} */
          f.v; p += 1) {
            var O = t.get(p + "");
            O !== void 0 ? S(O, $t) : p in a && (O = o(() => /* @__PURE__ */ En($t)), t.set(p + "", O));
          }
        if (f === void 0)
          (!d || (k = qs(a, l)) != null && k.writable) && (f = o(() => /* @__PURE__ */ En(void 0)), S(f, Ds(h)), t.set(l, f));
        else {
          d = f.v !== $t;
          var g = o(() => Ds(h));
          S(f, g);
        }
        var m = Reflect.getOwnPropertyDescriptor(a, l);
        if (m != null && m.set && m.set.call(c, h), !d) {
          if (n && typeof l == "string") {
            var v = (
              /** @type {Source<number>} */
              t.get("length")
            ), Q = Number(l);
            Number.isInteger(Q) && Q >= v.v && S(v, Q + 1);
          }
          Kr(s);
        }
        return !0;
      },
      ownKeys(a) {
        u(s);
        var l = Reflect.ownKeys(a).filter((f) => {
          var d = t.get(f);
          return d === void 0 || d.v !== $t;
        });
        for (var [h, c] of t)
          c.v !== $t && !(h in a) && l.push(h);
        return l;
      },
      setPrototypeOf() {
        uv();
      }
    }
  );
}
function If(i) {
  try {
    if (i !== null && typeof i == "object" && wn in i)
      return i[wn];
  } catch {
  }
  return i;
}
function Iv(i, e) {
  return Object.is(If(i), If(e));
}
var Df, vp, bp, yp;
function Dv() {
  if (Df === void 0) {
    Df = window, vp = /Firefox/.test(navigator.userAgent);
    var i = Element.prototype, e = Node.prototype, t = Text.prototype;
    bp = qs(e, "firstChild").get, yp = qs(e, "nextSibling").get, Xf(i) && (i[kh] = void 0, i[ca] = null, i[Qh] = void 0, i.__e = void 0), Xf(t) && (t[Nr] = void 0);
  }
}
function xn(i = "") {
  return document.createTextNode(i);
}
// @__NO_SIDE_EFFECTS__
function vn(i) {
  return (
    /** @type {TemplateNode | null} */
    bp.call(i)
  );
}
// @__NO_SIDE_EFFECTS__
function Co(i) {
  return (
    /** @type {TemplateNode | null} */
    yp.call(i)
  );
}
function x(i, e) {
  return /* @__PURE__ */ vn(i);
}
function Ye(i, e = !1) {
  {
    var t = /* @__PURE__ */ vn(i);
    return t instanceof Comment && t.data === "" ? /* @__PURE__ */ Co(t) : t;
  }
}
function w(i, e = 1, t = !1) {
  let n = i;
  for (; e--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ Co(n);
  return n;
}
function zv(i) {
  i.textContent = "";
}
function wp() {
  return !1;
}
function Nv(i, e, t) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(Bd, i, void 0)
  );
}
let zf = !1;
function Yv() {
  zf || (zf = !0, document.addEventListener(
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
            (e = t[fa]) == null || e.call(t);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function al(i) {
  var e = Ae, t = Ee;
  _i(null), Pi(null);
  try {
    return i();
  } finally {
    _i(e), Pi(t);
  }
}
function Lc(i, e, t, n = t) {
  i.addEventListener(e, () => al(t));
  const s = (
    /** @type {any} */
    i[fa]
  );
  s ? i[fa] = () => {
    s(), n(!0);
  } : i[fa] = () => n(!0), Yv();
}
function xp(i) {
  Ee === null && (Ae === null && lv(), av()), kn && ov();
}
function qv(i, e) {
  var t = e.last;
  t === null ? e.last = e.first = i : (t.next = i, i.prev = t, e.last = i);
}
function fn(i, e) {
  var t = Ee;
  t !== null && (t.f & qt) !== 0 && (i |= qt);
  var n = {
    ctx: rt,
    deps: null,
    nodes: null,
    f: i | Zt | Si,
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
  ge == null || ge.register_created_effect(n);
  var s = n;
  if ((i & or) !== 0)
    Is !== null ? Is.push(n) : Ss.ensure().schedule(n);
  else if (e !== null) {
    try {
      $s(n);
    } catch (o) {
      throw ti(n), o;
    }
    s.deps === null && s.teardown === null && s.nodes === null && s.first === s.last && // either `null`, or a singular child
    (s.f & kr) === 0 && (s = s.first, (i & Xi) !== 0 && (i & ar) !== 0 && s !== null && (s.f |= ar));
  }
  if (s !== null && (s.parent = t, t !== null && qv(s, t), Ae !== null && (Ae.f & Mt) !== 0 && (i & Vn) === 0)) {
    var r = (
      /** @type {Derived} */
      Ae
    );
    (r.effects ?? (r.effects = [])).push(s);
  }
  return n;
}
function Ic() {
  return Ae !== null && !ji;
}
function ll(i) {
  const e = fn(To, null);
  return ct(e, yt), e.teardown = i, e;
}
function Mh(i) {
  xp();
  var e = (
    /** @type {Effect} */
    Ee.f
  ), t = !Ae && (e & Di) !== 0 && (e & Cs) === 0;
  if (t) {
    var n = (
      /** @type {ComponentContext} */
      rt
    );
    (n.e ?? (n.e = [])).push(i);
  } else
    return Sp(i);
}
function Sp(i) {
  return fn(or | Jd, i);
}
function Wv(i) {
  return xp(), fn(To | Jd, i);
}
function Vv(i) {
  Ss.ensure();
  const e = fn(Vn | kr, i);
  return (t = {}) => new Promise((n) => {
    t.outro ? ms(e, () => {
      ti(e), n(void 0);
    }) : (ti(e), n(void 0));
  });
}
function hl(i) {
  return fn(or, i);
}
function qe(i, e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    rt
  ), n = { effect: null, ran: !1, deps: i };
  t.l.$.push(n), n.effect = Zs(() => {
    if (i(), !n.ran) {
      n.ran = !0;
      var s = (
        /** @type {Effect} */
        Ee
      );
      try {
        Pi(s.parent), b(e);
      } finally {
        Pi(s);
      }
    }
  });
}
function Ci() {
  var i = (
    /** @type {ComponentContextLegacy} */
    rt
  );
  Zs(() => {
    for (var e of i.l.$) {
      e.deps();
      var t = e.effect;
      (t.f & yt) !== 0 && t.deps !== null && ct(t, zi), $r(t) && $s(t), e.ran = !1;
    }
  });
}
function Bv(i) {
  return fn(Ws | kr, i);
}
function Zs(i, e = 0) {
  return fn(To | e, i);
}
function B(i, e = [], t = [], n = []) {
  Av(n, e, t, (s) => {
    fn(To, () => i(...s.map(u)));
  });
}
function cl(i, e = 0) {
  var t = fn(Xi | e, i);
  return t;
}
function vi(i) {
  return fn(Di | kr, i);
}
function kp(i) {
  var e = i.teardown;
  if (e !== null) {
    const t = kn, n = Ae;
    Nf(!0), _i(null);
    try {
      e.call(null);
    } finally {
      Nf(t), _i(n);
    }
  }
}
function Dc(i, e = !1) {
  var t = i.first;
  for (i.first = i.last = null; t !== null; ) {
    const s = t.ac;
    s !== null && al(() => {
      s.abort(ol);
    });
    var n = t.next;
    (t.f & Vn) !== 0 ? t.parent = null : ti(t, e), t = n;
  }
}
function Gv(i) {
  for (var e = i.first; e !== null; ) {
    var t = e.next;
    (e.f & Di) === 0 && ti(e), e = t;
  }
}
function ti(i, e = !0) {
  var t = !1;
  (e || (i.f & ev) !== 0) && i.nodes !== null && i.nodes.end !== null && (Uv(
    i.nodes.start,
    /** @type {TemplateNode} */
    i.nodes.end
  ), t = !0), ct(i, Sh), Dc(i, e && !t), lo(i, 0);
  var n = i.nodes && i.nodes.t;
  if (n !== null)
    for (const r of n)
      r.stop();
  kp(i), i.f ^= Sh, i.f |= ki;
  var s = i.parent;
  s !== null && s.first !== null && Qp(i), i.next = i.prev = i.teardown = i.ctx = i.deps = i.fn = i.nodes = i.ac = i.b = null;
}
function Uv(i, e) {
  for (; i !== null; ) {
    var t = i === e ? null : /* @__PURE__ */ Co(i);
    i.remove(), i = t;
  }
}
function Qp(i) {
  var e = i.parent, t = i.prev, n = i.next;
  t !== null && (t.next = n), n !== null && (n.prev = t), e !== null && (e.first === i && (e.first = n), e.last === i && (e.last = t));
}
function ms(i, e, t = !0) {
  var n = [];
  $p(i, n, !0);
  var s = () => {
    t && ti(i), e && e();
  }, r = n.length;
  if (r > 0) {
    var o = () => --r || s();
    for (var a of n)
      a.out(o);
  } else
    s();
}
function $p(i, e, t) {
  if ((i.f & qt) === 0) {
    i.f ^= qt;
    var n = i.nodes && i.nodes.t;
    if (n !== null)
      for (const a of n)
        (a.is_global || t) && e.push(a);
    for (var s = i.first; s !== null; ) {
      var r = s.next;
      if ((s.f & Vn) === 0) {
        var o = (s.f & ar) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (s.f & Di) !== 0 && (i.f & Xi) !== 0;
        $p(s, e, o ? t : !1);
      }
      s = r;
    }
  }
}
function zc(i) {
  _p(i, !0);
}
function _p(i, e) {
  if ((i.f & qt) !== 0) {
    i.f ^= qt, (i.f & yt) === 0 && (ct(i, Zt), Ss.ensure().schedule(i));
    for (var t = i.first; t !== null; ) {
      var n = t.next, s = (t.f & ar) !== 0 || (t.f & Di) !== 0;
      _p(t, s ? e : !1), t = n;
    }
    var r = i.nodes && i.nodes.t;
    if (r !== null)
      for (const o of r)
        (o.is_global || e) && o.in();
  }
}
function Nc(i, e) {
  if (i.nodes)
    for (var t = i.nodes.start, n = i.nodes.end; t !== null; ) {
      var s = t === n ? null : /* @__PURE__ */ Co(t);
      e.append(t), t = s;
    }
}
let ga = !1, kn = !1;
function Nf(i) {
  kn = i;
}
let Ae = null, ji = !1;
function _i(i) {
  Ae = i;
}
let Ee = null;
function Pi(i) {
  Ee = i;
}
let Qi = null;
function Pp(i) {
  Ae !== null && (Qi === null ? Qi = [i] : Qi.push(i));
}
let Ft = null, ai = 0, pi = null;
function Fv(i) {
  pi = i;
}
let Tp = 1, os = 0, vs = os;
function Yf(i) {
  vs = i;
}
function Cp() {
  return ++Tp;
}
function $r(i) {
  var e = i.f;
  if ((e & Zt) !== 0)
    return !0;
  if (e & Mt && (i.f &= ~xs), (e & zi) !== 0) {
    for (var t = (
      /** @type {Value[]} */
      i.deps
    ), n = t.length, s = 0; s < n; s++) {
      var r = t[s];
      if ($r(
        /** @type {Derived} */
        r
      ) && pp(
        /** @type {Derived} */
        r
      ), r.wv > i.wv)
        return !0;
    }
    (e & Si) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    At === null && ct(i, yt);
  }
  return !1;
}
function Zp(i, e, t = !0) {
  var n = i.reactions;
  if (n !== null && !(Qi !== null && ps.call(Qi, i)))
    for (var s = 0; s < n.length; s++) {
      var r = n[s];
      (r.f & Mt) !== 0 ? Zp(
        /** @type {Derived} */
        r,
        e,
        !1
      ) : e === r && (t ? ct(r, Zt) : (r.f & yt) !== 0 && ct(r, zi), Xc(
        /** @type {Effect} */
        r
      ));
    }
}
function Ep(i) {
  var g;
  var e = Ft, t = ai, n = pi, s = Ae, r = Qi, o = rt, a = ji, l = vs, h = i.f;
  Ft = /** @type {null | Value[]} */
  null, ai = 0, pi = null, Ae = (h & (Di | Vn)) === 0 ? i : null, Qi = null, lr(i.ctx), ji = !1, vs = ++os, i.ac !== null && (al(() => {
    i.ac.abort(ol);
  }), i.ac = null);
  try {
    i.f |= ka;
    var c = (
      /** @type {Function} */
      i.fn
    ), f = c();
    i.f |= Cs;
    var d = i.deps, p = ge == null ? void 0 : ge.is_fork;
    if (Ft !== null) {
      var O;
      if (p || lo(i, ai), d !== null && ai > 0)
        for (d.length = ai + Ft.length, O = 0; O < Ft.length; O++)
          d[ai + O] = Ft[O];
      else
        i.deps = d = Ft;
      if (Ic() && (i.f & Si) !== 0)
        for (O = ai; O < d.length; O++)
          ((g = d[O]).reactions ?? (g.reactions = [])).push(i);
    } else !p && d !== null && ai < d.length && (lo(i, ai), d.length = ai);
    if (Qr() && pi !== null && !ji && d !== null && (i.f & (Mt | zi | Zt)) === 0)
      for (O = 0; O < /** @type {Source[]} */
      pi.length; O++)
        Zp(
          pi[O],
          /** @type {Effect} */
          i
        );
    if (s !== null && s !== i) {
      if (os++, s.deps !== null)
        for (let m = 0; m < t; m += 1)
          s.deps[m].rv = os;
      if (e !== null)
        for (const m of e)
          m.rv = os;
      pi !== null && (n === null ? n = pi : n.push(.../** @type {Source[]} */
      pi));
    }
    return (i.f & qn) !== 0 && (i.f ^= qn), f;
  } catch (m) {
    return np(m);
  } finally {
    i.f ^= ka, Ft = e, ai = t, pi = n, Ae = s, Qi = r, lr(o), ji = a, vs = l;
  }
}
function Hv(i, e) {
  let t = e.reactions;
  if (t !== null) {
    var n = Um.call(t, i);
    if (n !== -1) {
      var s = t.length - 1;
      s === 0 ? t = e.reactions = null : (t[n] = t[s], t.pop());
    }
  }
  if (t === null && (e.f & Mt) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Ft === null || !ps.call(Ft, e))) {
    var r = (
      /** @type {Derived} */
      e
    );
    (r.f & Si) !== 0 && (r.f ^= Si, r.f &= ~xs), r.v !== $t && Rc(r), jv(r), lo(r, 0);
  }
}
function lo(i, e) {
  var t = i.deps;
  if (t !== null)
    for (var n = e; n < t.length; n++)
      Hv(i, t[n]);
}
function $s(i) {
  var e = i.f;
  if ((e & ki) === 0) {
    ct(i, yt);
    var t = Ee, n = ga;
    Ee = i, ga = !0;
    try {
      (e & (Xi | Kd)) !== 0 ? Gv(i) : Dc(i), kp(i);
      var s = Ep(i);
      i.teardown = typeof s == "function" ? s : null, i.wv = Tp;
      var r;
      Gd && jm && (i.f & Zt) !== 0 && i.deps;
    } finally {
      ga = n, Ee = t;
    }
  }
}
async function Kv() {
  await Promise.resolve(), kv();
}
function u(i) {
  var e = i.f, t = (e & Mt) !== 0;
  if (Ae !== null && !ji) {
    var n = Ee !== null && (Ee.f & ki) !== 0;
    if (!n && (Qi === null || !ps.call(Qi, i))) {
      var s = Ae.deps;
      if ((Ae.f & ka) !== 0)
        i.rv < os && (i.rv = os, Ft === null && s !== null && s[ai] === i ? ai++ : Ft === null ? Ft = [i] : Ft.push(i));
      else {
        Ae.deps ?? (Ae.deps = []), ps.call(Ae.deps, i) || Ae.deps.push(i);
        var r = i.reactions;
        r === null ? i.reactions = [Ae] : ps.call(r, Ae) || r.push(Ae);
      }
    }
  }
  if (kn && gs.has(i))
    return gs.get(i);
  if (t) {
    var o = (
      /** @type {Derived} */
      i
    );
    if (kn) {
      var a = o.v;
      return ((o.f & yt) === 0 && o.reactions !== null || Rp(o)) && (a = jc(o)), gs.set(o, a), a;
    }
    var l = (o.f & Si) === 0 && !ji && Ae !== null && (ga || (Ae.f & Si) !== 0), h = (o.f & Cs) === 0;
    $r(o) && (l && (o.f |= Si), pp(o)), l && !h && (Op(o), Ap(o));
  }
  if (At != null && At.has(i))
    return At.get(i);
  if ((i.f & qn) !== 0)
    throw i.v;
  return i.v;
}
function Ap(i) {
  if (i.f |= Si, i.deps !== null)
    for (const e of i.deps)
      (e.reactions ?? (e.reactions = [])).push(i), (e.f & Mt) !== 0 && (e.f & Si) === 0 && (Op(
        /** @type {Derived} */
        e
      ), Ap(
        /** @type {Derived} */
        e
      ));
}
function Rp(i) {
  if (i.v === $t) return !0;
  if (i.deps === null) return !1;
  for (const e of i.deps)
    if (gs.has(e) || (e.f & Mt) !== 0 && Rp(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function b(i) {
  var e = ji;
  try {
    return ji = !0, i();
  } finally {
    ji = e;
  }
}
function Ce(i) {
  if (!(typeof i != "object" || !i || i instanceof EventTarget)) {
    if (wn in i)
      Xh(i);
    else if (!Array.isArray(i))
      for (let e in i) {
        const t = i[e];
        typeof t == "object" && t && wn in t && Xh(t);
      }
  }
}
function Xh(i, e = /* @__PURE__ */ new Set()) {
  if (typeof i == "object" && i !== null && // We don't want to traverse DOM elements
  !(i instanceof EventTarget) && !e.has(i)) {
    e.add(i), i instanceof Date && i.getTime();
    for (let n in i)
      try {
        Xh(i[n], e);
      } catch {
      }
    const t = Zc(i);
    if (t !== Object.prototype && t !== Array.prototype && t !== Map.prototype && t !== Set.prototype && t !== Date.prototype) {
      const n = Fd(t);
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
const qo = Symbol("events"), Jv = /* @__PURE__ */ new Set(), qf = /* @__PURE__ */ new Set();
function e0(i, e, t, n = {}) {
  function s(r) {
    if (n.capture || jh.call(e, r), !r.cancelBubble)
      return al(() => t == null ? void 0 : t.call(this, r));
  }
  return i.startsWith("pointer") || i.startsWith("touch") || i === "wheel" ? Wn(() => {
    e.addEventListener(i, s, n);
  }) : e.addEventListener(i, s, n), s;
}
function ee(i, e, t, n, s) {
  var r = { capture: n, passive: s }, o = e0(i, e, t, r);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && ll(() => {
    e.removeEventListener(i, o, r);
  });
}
let Wf = null;
function jh(i) {
  var m, v;
  var e = this, t = (
    /** @type {Node} */
    e.ownerDocument
  ), n = i.type, s = ((m = i.composedPath) == null ? void 0 : m.call(i)) || [], r = (
    /** @type {null | Element} */
    s[0] || i.target
  );
  Wf = i;
  var o = 0, a = Wf === i && i[qo];
  if (a) {
    var l = s.indexOf(a);
    if (l !== -1 && (e === document || e === /** @type {any} */
    window)) {
      i[qo] = e;
      return;
    }
    var h = s.indexOf(e);
    if (h === -1)
      return;
    l <= h && (o = l);
  }
  if (r = /** @type {Element} */
  s[o] || i.target, r !== e) {
    Ud(i, "currentTarget", {
      configurable: !0,
      get() {
        return r || t;
      }
    });
    var c = Ae, f = Ee;
    _i(null), Pi(null);
    try {
      for (var d, p = []; r !== null; ) {
        var O = r.assignedSlot || r.parentNode || /** @type {any} */
        r.host || null;
        try {
          var g = (v = r[qo]) == null ? void 0 : v[n];
          g != null && (!/** @type {any} */
          r.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          i.target === r) && g.call(r, i);
        } catch (Q) {
          d ? p.push(Q) : d = Q;
        }
        if (i.cancelBubble || O === e || O === null)
          break;
        r = O;
      }
      if (d) {
        for (let Q of p)
          queueMicrotask(() => {
            throw Q;
          });
        throw d;
      }
    } finally {
      i[qo] = e, delete i.currentTarget, _i(c), Pi(f);
    }
  }
}
var qd;
const jl = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((qd = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : qd.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (i) => i
  })
);
function t0(i) {
  return (
    /** @type {string} */
    (jl == null ? void 0 : jl.createHTML(i)) ?? i
  );
}
function Mp(i) {
  var e = Nv("template");
  return e.innerHTML = t0(i.replaceAll("<!>", "<!---->")), e.content;
}
function fr(i, e) {
  var t = (
    /** @type {Effect} */
    Ee
  );
  t.nodes === null && (t.nodes = { start: i, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function j(i, e) {
  var t = (e & Vd) !== 0, n = (e & Gm) !== 0, s, r = !i.startsWith("<!>");
  return () => {
    s === void 0 && (s = Mp(r ? i : "<!>" + i), t || (s = /** @type {TemplateNode} */
    /* @__PURE__ */ vn(s)));
    var o = (
      /** @type {TemplateNode} */
      n || vp ? document.importNode(s, !0) : s.cloneNode(!0)
    );
    if (t) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ vn(o)
      ), l = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      fr(a, l);
    } else
      fr(o, o);
    return o;
  };
}
// @__NO_SIDE_EFFECTS__
function i0(i, e, t = "svg") {
  var n = !i.startsWith("<!>"), s = (e & Vd) !== 0, r = `<${t}>${n ? i : "<!>" + i}</${t}>`, o;
  return () => {
    if (!o) {
      var a = (
        /** @type {DocumentFragment} */
        Mp(r)
      ), l = (
        /** @type {Element} */
        /* @__PURE__ */ vn(a)
      );
      if (s)
        for (o = document.createDocumentFragment(); /* @__PURE__ */ vn(l); )
          o.appendChild(
            /** @type {TemplateNode} */
            /* @__PURE__ */ vn(l)
          );
      else
        o = /** @type {Element} */
        /* @__PURE__ */ vn(l);
    }
    var h = (
      /** @type {TemplateNode} */
      o.cloneNode(!0)
    );
    if (s) {
      var c = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ vn(h)
      ), f = (
        /** @type {TemplateNode} */
        h.lastChild
      );
      fr(c, f);
    } else
      fr(h, h);
    return h;
  };
}
// @__NO_SIDE_EFFECTS__
function Zo(i, e) {
  return /* @__PURE__ */ i0(i, e, "svg");
}
function Lh(i = "") {
  {
    var e = xn(i + "");
    return fr(e, e), e;
  }
}
function Ii() {
  var i = document.createDocumentFragment(), e = document.createComment(""), t = xn();
  return i.append(e, t), fr(e, t), i;
}
function E(i, e) {
  i !== null && i.before(
    /** @type {Node} */
    e
  );
}
const n0 = ["touchstart", "touchmove"];
function s0(i) {
  return n0.includes(i);
}
function V(i, e) {
  var t = e == null ? "" : typeof e == "object" ? `${e}` : e;
  t !== /** @type {any} */
  (i[Nr] ?? (i[Nr] = i.nodeValue)) && (i[Nr] = t, i.nodeValue = `${t}`);
}
function r0(i, e) {
  return o0(i, e);
}
const Wo = /* @__PURE__ */ new Map();
function o0(i, { target: e, anchor: t, props: n = {}, events: s, context: r, intro: o = !0, transformError: a }) {
  Dv();
  var l = void 0, h = Vv(() => {
    var c = t ?? e.appendChild(xn());
    Pv(
      /** @type {TemplateNode} */
      c,
      {
        pending: () => {
        }
      },
      (p) => {
        xt({});
        var O = (
          /** @type {ComponentContext} */
          rt
        );
        r && (O.c = r), s && (n.$$events = s), l = i(p, n) || {}, St();
      },
      a
    );
    var f = /* @__PURE__ */ new Set(), d = (p) => {
      for (var O = 0; O < p.length; O++) {
        var g = p[O];
        if (!f.has(g)) {
          f.add(g);
          var m = s0(g);
          for (const k of [e, document]) {
            var v = Wo.get(k);
            v === void 0 && (v = /* @__PURE__ */ new Map(), Wo.set(k, v));
            var Q = v.get(g);
            Q === void 0 ? (k.addEventListener(g, jh, { passive: m }), v.set(g, 1)) : v.set(g, Q + 1);
          }
        }
      }
    };
    return d(rl(Jv)), qf.add(d), () => {
      var m;
      for (var p of f)
        for (const v of [e, document]) {
          var O = (
            /** @type {Map<string, number>} */
            Wo.get(v)
          ), g = (
            /** @type {number} */
            O.get(p)
          );
          --g == 0 ? (v.removeEventListener(p, jh), O.delete(p), O.size === 0 && Wo.delete(v)) : O.set(p, g);
        }
      qf.delete(d), c !== t && ((m = c.parentNode) == null || m.removeChild(c));
    };
  });
  return a0.set(l, h), l;
}
let a0 = /* @__PURE__ */ new WeakMap();
var Ri, Ki, ci, ds, _o, Po, nl;
class Xp {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, t = !0) {
    /** @type {TemplateNode} */
    Bt(this, "anchor");
    /** @type {Map<Batch, Key>} */
    $e(this, Ri, /* @__PURE__ */ new Map());
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
    $e(this, Ki, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    $e(this, ci, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    $e(this, ds, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    $e(this, _o, !0);
    /**
     * @param {Batch} batch
     */
    $e(this, Po, (e) => {
      if (A(this, Ri).has(e)) {
        var t = (
          /** @type {Key} */
          A(this, Ri).get(e)
        ), n = A(this, Ki).get(t);
        if (n)
          zc(n), A(this, ds).delete(t);
        else {
          var s = A(this, ci).get(t);
          s && (A(this, Ki).set(t, s.effect), A(this, ci).delete(t), s.fragment.lastChild.remove(), this.anchor.before(s.fragment), n = s.effect);
        }
        for (const [r, o] of A(this, Ri)) {
          if (A(this, Ri).delete(r), r === e)
            break;
          const a = A(this, ci).get(o);
          a && (ti(a.effect), A(this, ci).delete(o));
        }
        for (const [r, o] of A(this, Ki)) {
          if (r === t || A(this, ds).has(r)) continue;
          const a = () => {
            if (Array.from(A(this, Ri).values()).includes(r)) {
              var h = document.createDocumentFragment();
              Nc(o, h), h.append(xn()), A(this, ci).set(r, { effect: o, fragment: h });
            } else
              ti(o);
            A(this, ds).delete(r), A(this, Ki).delete(r);
          };
          A(this, _o) || !n ? (A(this, ds).add(r), ms(o, a, !1)) : a();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    $e(this, nl, (e) => {
      A(this, Ri).delete(e);
      const t = Array.from(A(this, Ri).values());
      for (const [n, s] of A(this, ci))
        t.includes(n) || (ti(s.effect), A(this, ci).delete(n));
    });
    this.anchor = e, ke(this, _o, t);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, t) {
    var n = (
      /** @type {Batch} */
      ge
    ), s = wp();
    if (t && !A(this, Ki).has(e) && !A(this, ci).has(e))
      if (s) {
        var r = document.createDocumentFragment(), o = xn();
        r.append(o), A(this, ci).set(e, {
          effect: vi(() => t(o)),
          fragment: r
        });
      } else
        A(this, Ki).set(
          e,
          vi(() => t(this.anchor))
        );
    if (A(this, Ri).set(n, e), s) {
      for (const [a, l] of A(this, Ki))
        a === e ? n.unskip_effect(l) : n.skip_effect(l);
      for (const [a, l] of A(this, ci))
        a === e ? n.unskip_effect(l.effect) : n.skip_effect(l.effect);
      n.oncommit(A(this, Po)), n.ondiscard(A(this, nl));
    } else
      A(this, Po).call(this, n);
  }
}
Ri = new WeakMap(), Ki = new WeakMap(), ci = new WeakMap(), ds = new WeakMap(), _o = new WeakMap(), Po = new WeakMap(), nl = new WeakMap();
function Pn(i) {
  rt === null && Ec(), Sr && rt.l !== null ? h0(rt).m.push(i) : Mh(() => {
    const e = b(i);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
function Yc(i) {
  rt === null && Ec(), Pn(() => () => b(i));
}
function l0(i, e, { bubbles: t = !1, cancelable: n = !1 } = {}) {
  return new CustomEvent(i, { detail: e, bubbles: t, cancelable: n });
}
function fl() {
  const i = rt;
  return i === null && Ec(), (e, t, n) => {
    var r;
    const s = (
      /** @type {Record<string, Function | Function[]>} */
      (r = i.s.$$events) == null ? void 0 : r[
        /** @type {string} */
        e
      ]
    );
    if (s) {
      const o = sl(s) ? s.slice() : [s], a = l0(
        /** @type {string} */
        e,
        t,
        n
      );
      for (const l of o)
        l.call(i.x, a);
      return !a.defaultPrevented;
    }
    return !0;
  };
}
function h0(i) {
  var e = (
    /** @type {ComponentContextLegacy} */
    i.l
  );
  return e.u ?? (e.u = { a: [], b: [], m: [] });
}
function F(i, e, t = !1) {
  var n = new Xp(i), s = t ? ar : 0;
  function r(o, a) {
    n.ensure(o, a);
  }
  cl(() => {
    var o = !1;
    e((a, l = 0) => {
      o = !0, r(l, a);
    }), o || r(-1, null);
  }, s);
}
const c0 = Symbol("NaN");
function f0(i, e, t) {
  var n = new Xp(i), s = !Qr();
  cl(() => {
    var r = e();
    r !== r && (r = /** @type {any} */
    c0), s && r !== null && typeof r == "object" && (r = /** @type {V} */
    {}), n.ensure(r, t);
  });
}
function et(i, e) {
  return e;
}
function u0(i, e, t) {
  for (var n = [], s = e.length, r, o = e.length, a = 0; a < s; a++) {
    let f = e[a];
    ms(
      f,
      () => {
        if (r) {
          if (r.pending.delete(f), r.done.add(f), r.pending.size === 0) {
            var d = (
              /** @type {Set<EachOutroGroup>} */
              i.outrogroups
            );
            Ih(i, rl(r.done)), d.delete(r), d.size === 0 && (i.outrogroups = null);
          }
        } else
          o -= 1;
      },
      !1
    );
  }
  if (o === 0) {
    var l = n.length === 0 && t !== null;
    if (l) {
      var h = (
        /** @type {Element} */
        t
      ), c = (
        /** @type {Element} */
        h.parentNode
      );
      zv(c), c.append(h), i.items.clear();
    }
    Ih(i, e, !l);
  } else
    r = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (i.outrogroups ?? (i.outrogroups = /* @__PURE__ */ new Set())).add(r);
}
function Ih(i, e, t = !0) {
  var n;
  if (i.pending.size > 0) {
    n = /* @__PURE__ */ new Set();
    for (const o of i.pending.values())
      for (const a of o)
        n.add(
          /** @type {EachItem} */
          i.items.get(a).e
        );
  }
  for (var s = 0; s < e.length; s++) {
    var r = e[s];
    if (n != null && n.has(r)) {
      r.f |= tn;
      const o = document.createDocumentFragment();
      Nc(r, o);
    } else
      ti(e[s], t);
  }
}
var Vf;
function He(i, e, t, n, s, r = null) {
  var o = i, a = /* @__PURE__ */ new Map(), l = (e & Wd) !== 0;
  if (l) {
    var h = (
      /** @type {Element} */
      i
    );
    o = h.appendChild(xn());
  }
  var c = null, f = /* @__PURE__ */ _t(() => {
    var k = t();
    return sl(k) ? k : k == null ? [] : rl(k);
  }), d, p = /* @__PURE__ */ new Map(), O = !0;
  function g(k) {
    (Q.effect.f & ki) === 0 && (Q.pending.delete(k), Q.fallback = c, d0(Q, d, o, e, n), c !== null && (d.length === 0 ? (c.f & tn) === 0 ? zc(c) : (c.f ^= tn, qr(c, null, o)) : ms(c, () => {
      c = null;
    })));
  }
  function m(k) {
    Q.pending.delete(k);
  }
  var v = cl(() => {
    d = /** @type {V[]} */
    u(f);
    for (var k = d.length, R = /* @__PURE__ */ new Set(), T = (
      /** @type {Batch} */
      ge
    ), M = wp(), C = 0; C < k; C += 1) {
      var z = d[C], D = n(z, C), N = O ? null : a.get(D);
      N ? (N.v && cr(N.v, z), N.i && cr(N.i, C), M && T.unskip_effect(N.e)) : (N = p0(
        a,
        O ? o : Vf ?? (Vf = xn()),
        z,
        D,
        C,
        s,
        e,
        t
      ), O || (N.e.f |= tn), a.set(D, N)), R.add(D);
    }
    if (k === 0 && r && !c && (O ? c = vi(() => r(o)) : (c = vi(() => r(Vf ?? (Vf = xn()))), c.f |= tn)), k > R.size && rv(), !O)
      if (p.set(T, R), M) {
        for (const [Y, y] of a)
          R.has(Y) || T.skip_effect(y.e);
        T.oncommit(g), T.ondiscard(m);
      } else
        g(T);
    u(f);
  }), Q = { effect: v, items: a, pending: p, outrogroups: null, fallback: c };
  O = !1;
}
function Rr(i) {
  for (; i !== null && (i.f & Di) === 0; )
    i = i.next;
  return i;
}
function d0(i, e, t, n, s) {
  var N, Y, y, _, P, $, X, Z, H;
  var r = (n & zm) !== 0, o = e.length, a = i.items, l = Rr(i.effect.first), h, c = null, f, d = [], p = [], O, g, m, v;
  if (r)
    for (v = 0; v < o; v += 1)
      O = e[v], g = s(O, v), m = /** @type {EachItem} */
      a.get(g).e, (m.f & tn) === 0 && ((Y = (N = m.nodes) == null ? void 0 : N.a) == null || Y.measure(), (f ?? (f = /* @__PURE__ */ new Set())).add(m));
  for (v = 0; v < o; v += 1) {
    if (O = e[v], g = s(O, v), m = /** @type {EachItem} */
    a.get(g).e, i.outrogroups !== null)
      for (const J of i.outrogroups)
        J.pending.delete(m), J.done.delete(m);
    if ((m.f & qt) !== 0 && (zc(m), r && ((_ = (y = m.nodes) == null ? void 0 : y.a) == null || _.unfix(), (f ?? (f = /* @__PURE__ */ new Set())).delete(m))), (m.f & tn) !== 0)
      if (m.f ^= tn, m === l)
        qr(m, null, t);
      else {
        var Q = c ? c.next : l;
        m === i.effect.last && (i.effect.last = m.prev), m.prev && (m.prev.next = m.next), m.next && (m.next.prev = m.prev), An(i, c, m), An(i, m, Q), qr(m, Q, t), c = m, d = [], p = [], l = Rr(c.next);
        continue;
      }
    if (m !== l) {
      if (h !== void 0 && h.has(m)) {
        if (d.length < p.length) {
          var k = p[0], R;
          c = k.prev;
          var T = d[0], M = d[d.length - 1];
          for (R = 0; R < d.length; R += 1)
            qr(d[R], k, t);
          for (R = 0; R < p.length; R += 1)
            h.delete(p[R]);
          An(i, T.prev, M.next), An(i, c, T), An(i, M, k), l = k, c = M, v -= 1, d = [], p = [];
        } else
          h.delete(m), qr(m, l, t), An(i, m.prev, m.next), An(i, m, c === null ? i.effect.first : c.next), An(i, c, m), c = m;
        continue;
      }
      for (d = [], p = []; l !== null && l !== m; )
        (h ?? (h = /* @__PURE__ */ new Set())).add(l), p.push(l), l = Rr(l.next);
      if (l === null)
        continue;
    }
    (m.f & tn) === 0 && d.push(m), c = m, l = Rr(m.next);
  }
  if (i.outrogroups !== null) {
    for (const J of i.outrogroups)
      J.pending.size === 0 && (Ih(i, rl(J.done)), (P = i.outrogroups) == null || P.delete(J));
    i.outrogroups.size === 0 && (i.outrogroups = null);
  }
  if (l !== null || h !== void 0) {
    var C = [];
    if (h !== void 0)
      for (m of h)
        (m.f & qt) === 0 && C.push(m);
    for (; l !== null; )
      (l.f & qt) === 0 && l !== i.fallback && C.push(l), l = Rr(l.next);
    var z = C.length;
    if (z > 0) {
      var D = (n & Wd) !== 0 && o === 0 ? t : null;
      if (r) {
        for (v = 0; v < z; v += 1)
          (X = ($ = C[v].nodes) == null ? void 0 : $.a) == null || X.measure();
        for (v = 0; v < z; v += 1)
          (H = (Z = C[v].nodes) == null ? void 0 : Z.a) == null || H.fix();
      }
      u0(i, C, D);
    }
  }
  r && Wn(() => {
    var J, te;
    if (f !== void 0)
      for (m of f)
        (te = (J = m.nodes) == null ? void 0 : J.a) == null || te.apply();
  });
}
function p0(i, e, t, n, s, r, o, a) {
  var l = (o & Im) !== 0 ? (o & Nm) === 0 ? /* @__PURE__ */ W(t, !1, !1) : Qs(t) : null, h = (o & Dm) !== 0 ? Qs(s) : null;
  return {
    v: l,
    i: h,
    e: vi(() => (r(e, l ?? t, h ?? s, a), () => {
      i.delete(n);
    }))
  };
}
function qr(i, e, t) {
  if (i.nodes)
    for (var n = i.nodes.start, s = i.nodes.end, r = e && (e.f & tn) === 0 ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : t; n !== null; ) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Co(n)
      );
      if (r.before(n), n === s)
        return;
      n = o;
    }
}
function An(i, e, t) {
  e === null ? i.effect.first = t : e.next = t, t === null ? i.effect.last = e : t.prev = e;
}
function O0(i, e, t) {
  hl(() => {
    var n = b(() => e(i, t == null ? void 0 : t()) || {});
    if (t && (n != null && n.update)) {
      var s = !1, r = (
        /** @type {any} */
        {}
      );
      Zs(() => {
        var o = t();
        Ce(o), s && Ac(r, o) && (r = o, n.update(o));
      }), s = !0;
    }
    if (n != null && n.destroy)
      return () => (
        /** @type {Function} */
        n.destroy()
      );
  });
}
const Bf = [...` 	
\r\f \v\uFEFF`];
function g0(i, e, t) {
  var n = i == null ? "" : "" + i;
  if (e && (n = n ? n + " " + e : e), t) {
    for (var s of Object.keys(t))
      if (t[s])
        n = n ? n + " " + s : s;
      else if (n.length)
        for (var r = s.length, o = 0; (o = n.indexOf(s, o)) >= 0; ) {
          var a = o + r;
          (o === 0 || Bf.includes(n[o - 1])) && (a === n.length || Bf.includes(n[a])) ? n = (o === 0 ? "" : n.substring(0, o)) + n.substring(a + 1) : o = a;
        }
  }
  return n === "" ? null : n;
}
function m0(i, e) {
  return i == null ? null : String(i);
}
function Jt(i, e, t, n, s, r) {
  var o = (
    /** @type {any} */
    i[kh]
  );
  if (o !== t || o === void 0) {
    var a = g0(t, n, r);
    a == null ? i.removeAttribute("class") : i.className = a, i[kh] = t;
  } else if (r && s !== r)
    for (var l in r) {
      var h = !!r[l];
      (s == null || h !== !!s[l]) && i.classList.toggle(l, h);
    }
  return r;
}
function jp(i, e, t, n) {
  var s = (
    /** @type {any} */
    i[Qh]
  );
  if (s !== e) {
    var r = m0(e);
    r == null ? i.removeAttribute("style") : i.style.cssText = r, i[Qh] = e;
  }
  return n;
}
function ul(i, e, t = !1) {
  if (i.multiple) {
    if (e == null)
      return;
    if (!sl(e))
      return gv();
    for (var n of i.options)
      n.selected = e.includes(Jr(n));
    return;
  }
  for (n of i.options) {
    var s = Jr(n);
    if (Iv(s, e)) {
      n.selected = !0;
      return;
    }
  }
  (!t || e !== void 0) && (i.selectedIndex = -1);
}
function qc(i) {
  var e = new MutationObserver(() => {
    ul(i, i.__value);
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
  }), ll(() => {
    e.disconnect();
  });
}
function _a(i, e, t = e) {
  var n = /* @__PURE__ */ new WeakSet(), s = !0;
  Lc(i, "change", (r) => {
    var o = r ? "[selected]" : ":checked", a;
    if (i.multiple)
      a = [].map.call(i.querySelectorAll(o), Jr);
    else {
      var l = i.querySelector(o) ?? // will fall back to first non-disabled option if no option is selected
      i.querySelector("option:not([disabled])");
      a = l && Jr(l);
    }
    t(a), i.__value = a, ge !== null && n.add(ge);
  }), hl(() => {
    var r = e();
    if (i === document.activeElement) {
      var o = (
        /** @type {Batch} */
        ge
      );
      if (n.has(o))
        return;
    }
    if (ul(i, r, s), s && r === void 0) {
      var a = i.querySelector(":checked");
      a !== null && (r = Jr(a), t(r));
    }
    i.__value = r, s = !1;
  }), qc(i);
}
function Jr(i) {
  return "__value" in i ? i.__value : i.value;
}
const v0 = Symbol("is custom element"), b0 = Symbol("is html"), y0 = nv ? "progress" : "PROGRESS";
function zs(i, e) {
  var t = Wc(i);
  t.value === (t.value = // treat null and undefined the same for the initial value
  e ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  i.value === e && (e !== 0 || i.nodeName !== y0) || (i.value = e ?? "");
}
function w0(i, e) {
  var t = Wc(i);
  t.checked !== (t.checked = // treat null and undefined the same for the initial value
  e ?? void 0) && (i.checked = e);
}
function nt(i, e, t, n) {
  var s = Wc(i);
  s[e] !== (s[e] = t) && (e === "loading" && (i[iv] = t), t == null ? i.removeAttribute(e) : typeof t != "string" && x0(i).includes(e) ? i[e] = t : i.setAttribute(e, t));
}
function Wc(i) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    i[ca] ?? (i[ca] = {
      [v0]: i.nodeName.includes("-"),
      [b0]: i.namespaceURI === Bd
    })
  );
}
var Gf = /* @__PURE__ */ new Map();
function x0(i) {
  var e = i.getAttribute("is") || i.nodeName, t = Gf.get(e);
  if (t) return t;
  Gf.set(e, t = []);
  for (var n, s = i, r = Element.prototype; r !== s; ) {
    n = Fd(s);
    for (var o in n)
      n[o].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      o !== "innerHTML" && o !== "textContent" && o !== "innerText" && t.push(o);
    s = Zc(s);
  }
  return t;
}
function Nt(i, e, t = e) {
  var n = /* @__PURE__ */ new WeakSet();
  Lc(i, "input", async (s) => {
    var r = s ? i.defaultValue : i.value;
    if (r = Ll(i) ? Il(r) : r, t(r), ge !== null && n.add(ge), await Kv(), r !== (r = e())) {
      var o = i.selectionStart, a = i.selectionEnd, l = i.value.length;
      if (i.value = r ?? "", a !== null) {
        var h = i.value.length;
        o === a && a === l && h > l ? (i.selectionStart = h, i.selectionEnd = h) : (i.selectionStart = o, i.selectionEnd = Math.min(a, h));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  b(e) == null && i.value && (t(Ll(i) ? Il(i.value) : i.value), ge !== null && n.add(ge)), Zs(() => {
    var s = e();
    if (i === document.activeElement) {
      var r = (
        /** @type {Batch} */
        ge
      );
      if (n.has(r))
        return;
    }
    Ll(i) && s === Il(i.value) || i.type === "date" && !s && !i.value || s !== i.value && (i.value = s ?? "");
  });
}
function Lp(i, e, t = e) {
  Lc(i, "change", (n) => {
    var s = n ? i.defaultChecked : i.checked;
    t(s);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  // If defaultChecked is set, then checked == defaultChecked
  b(e) == null && t(i.checked), Zs(() => {
    var n = e();
    i.checked = !!n;
  });
}
function Ll(i) {
  var e = i.type;
  return e === "number" || e === "range";
}
function Il(i) {
  return i === "" ? null : +i;
}
function Dl(i, e) {
  return i === e || (i == null ? void 0 : i[wn]) === e;
}
function Vc(i = {}, e, t, n) {
  var s = (
    /** @type {ComponentContext} */
    rt.r
  ), r = (
    /** @type {Effect} */
    Ee
  );
  return hl(() => {
    var o, a;
    return Zs(() => {
      o = a, a = [], b(() => {
        Dl(t(...a), i) || (e(i, ...a), o && Dl(t(...o), i) && e(null, ...o));
      });
    }), () => {
      let l = r;
      for (; l !== s && l.parent !== null && l.parent.f & Sh; )
        l = l.parent;
      const h = () => {
        a && Dl(t(...a), i) && e(null, ...a);
      }, c = l.teardown;
      l.teardown = () => {
        h(), c == null || c();
      };
    };
  }), i;
}
function Dh(i) {
  return function(...e) {
    var t = (
      /** @type {Event} */
      e[0]
    );
    t.target === this && (i == null || i.apply(this, e));
  };
}
function zl(i) {
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
    rt
  ), t = e.l.u;
  if (!t) return;
  let n = () => Ce(e.s);
  if (i) {
    let s = 0, r = (
      /** @type {Record<string, any>} */
      {}
    );
    const o = /* @__PURE__ */ hr(() => {
      let a = !1;
      const l = e.s;
      for (const h in l)
        l[h] !== r[h] && (r[h] = l[h], a = !0);
      return a && s++, s;
    });
    n = () => u(o);
  }
  t.b.length && Wv(() => {
    Uf(e, n), wh(t.b);
  }), Mh(() => {
    const s = b(() => t.m.map(Km));
    return () => {
      for (const r of s)
        typeof r == "function" && r();
    };
  }), t.a.length && Mh(() => {
    Uf(e, n), wh(t.a);
  });
}
function Uf(i, e) {
  if (i.l.s)
    for (const t of i.l.s) u(t);
  e();
}
function Xe(i, e, t, n) {
  var R;
  var s = !Sr || (t & qm) !== 0, r = (t & Vm) !== 0, o = (t & Bm) !== 0, a = (
    /** @type {V} */
    n
  ), l = !0, h = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), c = () => o && s ? (h ?? (h = /* @__PURE__ */ hr(
    /** @type {() => V} */
    n
  )), u(h)) : (l && (l = !1, a = o ? b(
    /** @type {() => V} */
    n
  ) : (
    /** @type {V} */
    n
  )), a);
  let f;
  if (r) {
    var d = wn in i || tv in i;
    f = ((R = qs(i, e)) == null ? void 0 : R.set) ?? (d && e in i ? (T) => i[e] = T : void 0);
  }
  var p, O = !1;
  r ? [p, O] = wv(() => (
    /** @type {V} */
    i[e]
  )) : p = /** @type {V} */
  i[e], p === void 0 && n !== void 0 && (p = c(), f && (s && cv(), f(p)));
  var g;
  if (s ? g = () => {
    var T = (
      /** @type {V} */
      i[e]
    );
    return T === void 0 ? c() : (l = !0, T);
  } : g = () => {
    var T = (
      /** @type {V} */
      i[e]
    );
    return T !== void 0 && (a = /** @type {V} */
    void 0), T === void 0 ? a : T;
  }, s && (t & Wm) === 0)
    return g;
  if (f) {
    var m = i.$$legacy;
    return (
      /** @type {() => V} */
      (function(T, M) {
        return arguments.length > 0 ? ((!s || !M || m || O) && f(M ? g() : T), T) : g();
      })
    );
  }
  var v = !1, Q = ((t & Ym) !== 0 ? hr : _t)(() => (v = !1, g()));
  r && u(Q);
  var k = (
    /** @type {Effect} */
    Ee
  );
  return (
    /** @type {() => V} */
    (function(T, M) {
      if (arguments.length > 0) {
        const C = M ? u(Q) : s && r ? Ds(T) : T;
        return S(Q, C), v = !0, a !== void 0 && (a = C), T;
      }
      return kn && v || (k.f & ki) !== 0 ? Q.v : u(Q);
    })
  );
}
const ur = 160, dr = 40, Pa = 24;
function S0(i, e, t) {
  return i.x < e.x + e.w + t && i.x + i.w + t > e.x && i.y < e.y + e.h + t && i.y + i.h + t > e.y;
}
function Ff(i) {
  return { x: i.x, y: i.y, w: ur, h: dr };
}
function Hf(i, e, t) {
  const n = Ff(e);
  for (const s of Object.values(i.nodes))
    if (!(t && s.id === t) && s.position && S0(n, Ff(s.position), Pa))
      return !0;
  return !1;
}
const k0 = ur / 4, Q0 = 40;
function Bc(i, e, t) {
  if (!Hf(i, e, t)) return e;
  for (let s = 1; s <= Q0; s++) {
    const r = s * k0, o = [
      { x: e.x + r, y: e.y },
      { x: e.x - r, y: e.y },
      { x: e.x, y: e.y + r },
      { x: e.x, y: e.y - r },
      { x: e.x + r, y: e.y + r },
      { x: e.x + r, y: e.y - r },
      { x: e.x - r, y: e.y + r },
      { x: e.x - r, y: e.y - r }
    ];
    for (const a of o)
      if (!Hf(i, a, t)) return a;
  }
  let n = e.y;
  for (const s of Object.values(i.nodes))
    t && s.id === t || s.position && (n = Math.max(n, s.position.y + dr));
  return { x: e.x, y: n + Pa };
}
const lt = $n({ nodes: {}, edges: [], toolEdges: [] }), Bn = $n(null), ma = $n(null), Xs = $n({
  triggerType: "rest",
  description: "",
  cronExpression: "",
  webhookUrl: ""
});
function $0(i) {
  lt.update((e) => ({ ...e, edges: [...e.edges, i] }));
}
function Ip(i, e, t) {
  const n = `${i.replace(/:/g, "_")}_${Date.now()}`;
  return lt.update((s) => ({
    ...s,
    nodes: {
      ...s.nodes,
      [n]: { id: n, type: i, label: e, config: {}, position: Bc(s, t) }
    }
  })), n;
}
function _0(i, e) {
  lt.update((t) => ({
    ...t,
    nodes: {
      ...t.nodes,
      [i]: { ...t.nodes[i], position: Bc(t, e, i) }
    }
  }));
}
var Dp = Object.defineProperty, P0 = (i, e, t) => e in i ? Dp(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, T0 = (i, e) => {
  for (var t in e) Dp(i, t, { get: e[t], enumerable: !0 });
}, C0 = (i, e, t) => P0(i, e + "", t), Z0 = {};
T0(Z0, { Graph: () => Zi, alg: () => Gc, json: () => Np, version: () => R0 });
var E0 = Object.defineProperty, zp = (i, e) => {
  for (var t in e) E0(i, t, { get: e[t], enumerable: !0 });
}, Zi = class {
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
    let s, r, o, a, l = !1;
    typeof i == "object" && i !== null && "v" in i ? (s = i.v, r = i.w, o = i.name, arguments.length === 2 && (a = e, l = !0)) : (s = i, r = e, o = n, arguments.length > 2 && (a = t, l = !0)), s = "" + s, r = "" + r, o !== void 0 && (o = "" + o);
    let h = Wr(this._isDirected, s, r, o);
    if (h in this._edgeLabels) return l && (this._edgeLabels[h] = a), this;
    if (o !== void 0 && !this._isMultigraph) throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(s), this.setNode(r), this._edgeLabels[h] = l ? a : this._defaultEdgeLabelFn(s, r, o);
    let c = A0(this._isDirected, s, r, o);
    return s = c.v, r = c.w, Object.freeze(c), this._edgeObjs[h] = c, Kf(this._preds[r], s), Kf(this._sucs[s], r), this._in[r][h] = c, this._out[s][h] = c, this._edgeCount++, this;
  }
  edge(i, e, t) {
    let n = arguments.length === 1 ? Nl(this._isDirected, i) : Wr(this._isDirected, i, e, t);
    return this._edgeLabels[n];
  }
  edgeAsObj(i, e, t) {
    let n = arguments.length === 1 ? this.edge(i) : this.edge(i, e, t);
    return typeof n != "object" ? { label: n } : n;
  }
  hasEdge(i, e, t) {
    return (arguments.length === 1 ? Nl(this._isDirected, i) : Wr(this._isDirected, i, e, t)) in this._edgeLabels;
  }
  removeEdge(i, e, t) {
    let n = arguments.length === 1 ? Nl(this._isDirected, i) : Wr(this._isDirected, i, e, t), s = this._edgeObjs[n];
    if (s) {
      let r = s.v, o = s.w;
      delete this._edgeLabels[n], delete this._edgeObjs[n], Jf(this._preds[o], r), Jf(this._sucs[r], o), delete this._in[o][n], delete this._out[r][n], this._edgeCount--;
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
function Kf(i, e) {
  i[e] ? i[e]++ : i[e] = 1;
}
function Jf(i, e) {
  i[e] !== void 0 && !--i[e] && delete i[e];
}
function Wr(i, e, t, n) {
  let s = "" + e, r = "" + t;
  if (!i && s > r) {
    let o = s;
    s = r, r = o;
  }
  return s + "" + r + "" + (n === void 0 ? "\0" : n);
}
function A0(i, e, t, n) {
  let s = "" + e, r = "" + t;
  if (!i && s > r) {
    let a = s;
    s = r, r = a;
  }
  let o = { v: s, w: r };
  return n && (o.name = n), o;
}
function Nl(i, e) {
  return Wr(i, e.v, e.w, e.name);
}
var R0 = "4.0.1", Np = {};
zp(Np, { read: () => L0, write: () => M0 });
function M0(i) {
  let e = { options: { directed: i.isDirected(), multigraph: i.isMultigraph(), compound: i.isCompound() }, nodes: X0(i), edges: j0(i) }, t = i.graph();
  return t !== void 0 && (e.value = structuredClone(t)), e;
}
function X0(i) {
  return i.nodes().map((e) => {
    let t = i.node(e), n = i.parent(e), s = { v: e };
    return t !== void 0 && (s.value = t), n !== void 0 && (s.parent = n), s;
  });
}
function j0(i) {
  return i.edges().map((e) => {
    let t = i.edge(e), n = { v: e.v, w: e.w };
    return e.name !== void 0 && (n.name = e.name), t !== void 0 && (n.value = t), n;
  });
}
function L0(i) {
  let e = new Zi(i.options);
  return i.value !== void 0 && e.setGraph(i.value), i.nodes.forEach((t) => {
    e.setNode(t.v, t.value), t.parent && e.setParent(t.v, t.parent);
  }), i.edges.forEach((t) => {
    e.setEdge({ v: t.v, w: t.w, name: t.name }, t.value);
  }), e;
}
var Gc = {};
zp(Gc, { CycleException: () => Ca, bellmanFord: () => Yp, components: () => z0, dijkstra: () => Ta, dijkstraAll: () => q0, findCycles: () => W0, floydWarshall: () => B0, isAcyclic: () => U0, postorder: () => H0, preorder: () => K0, prim: () => J0, shortestPaths: () => eb, tarjan: () => Wp, topsort: () => Vp });
var I0 = () => 1;
function Yp(i, e, t, n) {
  return D0(i, String(e), t || I0, n || function(s) {
    return i.outEdges(s);
  });
}
function D0(i, e, t, n) {
  let s = {}, r, o = 0, a = i.nodes(), l = function(f) {
    let d = t(f);
    s[f.v].distance + d < s[f.w].distance && (s[f.w] = { distance: s[f.v].distance + d, predecessor: f.v }, r = !0);
  }, h = function() {
    a.forEach(function(f) {
      n(f).forEach(function(d) {
        let p = d.v === f ? d.v : d.w, O = p === d.v ? d.w : d.v;
        l({ v: p, w: O });
      });
    });
  };
  a.forEach(function(f) {
    let d = f === e ? 0 : Number.POSITIVE_INFINITY;
    s[f] = { distance: d, predecessor: "" };
  });
  let c = a.length;
  for (let f = 1; f < c && (r = !1, o++, h(), !!r); f++) ;
  if (o === c - 1 && (r = !1, h(), r)) throw new Error("The graph contains a negative weight cycle");
  return s;
}
function z0(i) {
  let e = {}, t = [], n;
  function s(r) {
    r in e || (e[r] = !0, n.push(r), i.successors(r).forEach(s), i.predecessors(r).forEach(s));
  }
  return i.nodes().forEach(function(r) {
    n = [], s(r), n.length && t.push(n);
  }), t;
}
var qp = class {
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
}, N0 = () => 1;
function Ta(i, e, t, n) {
  let s = function(r) {
    return i.outEdges(r);
  };
  return Y0(i, String(e), t || N0, n || s);
}
function Y0(i, e, t, n) {
  let s = {}, r = new qp(), o, a, l = function(h) {
    let c = h.v !== o ? h.v : h.w, f = s[c], d = t(h), p = a.distance + d;
    if (d < 0) throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + h + " Weight: " + d);
    p < f.distance && (f.distance = p, f.predecessor = o, r.decrease(c, p));
  };
  for (i.nodes().forEach(function(h) {
    let c = h === e ? 0 : Number.POSITIVE_INFINITY;
    s[h] = { distance: c, predecessor: "" }, r.add(h, c);
  }); r.size() > 0 && (o = r.removeMin(), a = s[o], a.distance !== Number.POSITIVE_INFINITY); ) n(o).forEach(l);
  return s;
}
function q0(i, e, t) {
  return i.nodes().reduce(function(n, s) {
    return n[s] = Ta(i, s, e, t), n;
  }, {});
}
function Wp(i) {
  let e = 0, t = [], n = {}, s = [];
  function r(o) {
    let a = n[o] = { onStack: !0, lowlink: e, index: e++ };
    if (t.push(o), i.successors(o).forEach(function(l) {
      l in n ? n[l].onStack && (a.lowlink = Math.min(a.lowlink, n[l].index)) : (r(l), a.lowlink = Math.min(a.lowlink, n[l].lowlink));
    }), a.lowlink === a.index) {
      let l = [], h;
      do
        h = t.pop(), n[h].onStack = !1, l.push(h);
      while (o !== h);
      s.push(l);
    }
  }
  return i.nodes().forEach(function(o) {
    o in n || r(o);
  }), s;
}
function W0(i) {
  return Wp(i).filter(function(e) {
    return e.length > 1 || e.length === 1 && i.hasEdge(e[0], e[0]);
  });
}
var V0 = () => 1;
function B0(i, e, t) {
  return G0(i, e || V0, t || function(n) {
    return i.outEdges(n);
  });
}
function G0(i, e, t) {
  let n = {}, s = i.nodes();
  return s.forEach(function(r) {
    n[r] = {}, n[r][r] = { distance: 0, predecessor: "" }, s.forEach(function(o) {
      r !== o && (n[r][o] = { distance: Number.POSITIVE_INFINITY, predecessor: "" });
    }), t(r).forEach(function(o) {
      let a = o.v === r ? o.w : o.v, l = e(o);
      n[r][a] = { distance: l, predecessor: r };
    });
  }), s.forEach(function(r) {
    let o = n[r];
    s.forEach(function(a) {
      let l = n[a];
      s.forEach(function(h) {
        let c = l[r], f = o[h], d = l[h], p = c.distance + f.distance;
        p < d.distance && (d.distance = p, d.predecessor = f.predecessor);
      });
    });
  }), n;
}
var Ca = class extends Error {
  constructor(...i) {
    super(...i);
  }
};
function Vp(i) {
  let e = {}, t = {}, n = [];
  function s(r) {
    if (r in t) throw new Ca();
    r in e || (t[r] = !0, e[r] = !0, i.predecessors(r).forEach(s), delete t[r], n.push(r));
  }
  if (i.sinks().forEach(s), Object.keys(e).length !== i.nodeCount()) throw new Ca();
  return n;
}
function U0(i) {
  try {
    Vp(i);
  } catch (e) {
    if (e instanceof Ca) return !1;
    throw e;
  }
  return !0;
}
function F0(i, e, t, n, s) {
  Array.isArray(e) || (e = [e]);
  let r = ((a) => {
    var l;
    return (l = i.isDirected() ? i.successors(a) : i.neighbors(a)) != null ? l : [];
  }), o = {};
  return e.forEach(function(a) {
    if (!i.hasNode(a)) throw new Error("Graph does not have node: " + a);
    s = Bp(i, a, t === "post", o, r, n, s);
  }), s;
}
function Bp(i, e, t, n, s, r, o) {
  return e in n || (n[e] = !0, t || (o = r(o, e)), s(e).forEach(function(a) {
    o = Bp(i, a, t, n, s, r, o);
  }), t && (o = r(o, e))), o;
}
function Gp(i, e, t) {
  return F0(i, e, t, function(n, s) {
    return n.push(s), n;
  }, []);
}
function H0(i, e) {
  return Gp(i, e, "post");
}
function K0(i, e) {
  return Gp(i, e, "pre");
}
function J0(i, e) {
  let t = new Zi(), n = {}, s = new qp(), r;
  function o(l) {
    let h = l.v === r ? l.w : l.v, c = s.priority(h);
    if (c !== void 0) {
      let f = e(l);
      f < c && (n[h] = r, s.decrease(h, f));
    }
  }
  if (i.nodeCount() === 0) return t;
  i.nodes().forEach(function(l) {
    s.add(l, Number.POSITIVE_INFINITY), t.setNode(l);
  }), s.decrease(i.nodes()[0], 0);
  let a = !1;
  for (; s.size() > 0; ) {
    if (r = s.removeMin(), r in n) t.setEdge(r, n[r]);
    else {
      if (a) throw new Error("Input graph is not connected: " + i);
      a = !0;
    }
    i.nodeEdges(r).forEach(o);
  }
  return t;
}
function eb(i, e, t, n) {
  return tb(i, e, t, n ?? ((s) => {
    let r = i.outEdges(s);
    return r ?? [];
  }));
}
function tb(i, e, t, n) {
  if (t === void 0) return Ta(i, e, t, n);
  let s = !1, r = i.nodes();
  for (let o = 0; o < r.length; o++) {
    let a = n(r[o]);
    for (let l = 0; l < a.length; l++) {
      let h = a[l], c = h.v === r[o] ? h.v : h.w, f = c === h.v ? h.w : h.v;
      t({ v: c, w: f }) < 0 && (s = !0);
    }
    if (s) return Yp(i, e, t, n);
  }
  return Ta(i, e, t, n);
}
function _r(i, e, t, n) {
  let s = n;
  for (; i.hasNode(s); ) s = Uc(n);
  return t.dummy = e, i.setNode(s, t), s;
}
function ib(i) {
  let e = new Zi().setGraph(i.graph());
  return i.nodes().forEach((t) => e.setNode(t, i.node(t))), i.edges().forEach((t) => {
    let n = e.edge(t.v, t.w) || { weight: 0, minlen: 1 }, s = i.edge(t);
    e.setEdge(t.v, t.w, { weight: n.weight + s.weight, minlen: Math.max(n.minlen, s.minlen) });
  }), e;
}
function Up(i) {
  let e = new Zi({ multigraph: i.isMultigraph() }).setGraph(i.graph());
  return i.nodes().forEach((t) => {
    i.children(t).length || e.setNode(t, i.node(t));
  }), i.edges().forEach((t) => {
    e.setEdge(t, i.edge(t));
  }), e;
}
function eu(i, e) {
  let t = i.x, n = i.y, s = e.x - t, r = e.y - n, o = i.width / 2, a = i.height / 2;
  if (!s && !r) throw new Error("Not possible to find intersection inside of the rectangle");
  let l, h;
  return Math.abs(r) * o > Math.abs(s) * a ? (r < 0 && (a = -a), l = a * s / r, h = a) : (s < 0 && (o = -o), l = o, h = o * r / s), { x: t + l, y: n + h };
}
function dl(i) {
  let e = ho(Hp(i) + 1).map(() => []);
  return i.nodes().forEach((t) => {
    let n = i.node(t), s = n.rank;
    s !== void 0 && (e[s] || (e[s] = []), e[s][n.order] = t);
  }), e;
}
function nb(i) {
  let e = i.nodes().map((n) => {
    let s = i.node(n).rank;
    return s === void 0 ? Number.MAX_VALUE : s;
  }), t = nn(Math.min, e);
  i.nodes().forEach((n) => {
    let s = i.node(n);
    Object.hasOwn(s, "rank") && (s.rank -= t);
  });
}
function sb(i) {
  let e = i.nodes().map((o) => i.node(o).rank).filter((o) => o !== void 0), t = nn(Math.min, e), n = [];
  i.nodes().forEach((o) => {
    let a = i.node(o).rank - t;
    n[a] || (n[a] = []), n[a].push(o);
  });
  let s = 0, r = i.graph().nodeRankFactor;
  Array.from(n).forEach((o, a) => {
    o === void 0 && a % r !== 0 ? --s : o !== void 0 && s && o.forEach((l) => i.node(l).rank += s);
  });
}
function tu(i, e, t, n) {
  let s = { width: 0, height: 0 };
  return arguments.length >= 4 && (s.rank = t, s.order = n), _r(i, "border", s, e);
}
function rb(i, e = Fp) {
  let t = [];
  for (let n = 0; n < i.length; n += e) {
    let s = i.slice(n, n + e);
    t.push(s);
  }
  return t;
}
var Fp = 65535;
function nn(i, e) {
  if (e.length > Fp) {
    let t = rb(e);
    return i(...t.map((n) => i(...n)));
  } else return i(...e);
}
function Hp(i) {
  let e = i.nodes().map((t) => {
    let n = i.node(t).rank;
    return n === void 0 ? Number.MIN_VALUE : n;
  });
  return nn(Math.max, e);
}
function ob(i, e) {
  let t = { lhs: [], rhs: [] };
  return i.forEach((n) => {
    e(n) ? t.lhs.push(n) : t.rhs.push(n);
  }), t;
}
function ab(i, e) {
  let t = Date.now();
  try {
    return e();
  } finally {
    console.log(i + " time: " + (Date.now() - t) + "ms");
  }
}
function lb(i, e) {
  return e();
}
var hb = 0;
function Uc(i) {
  let e = ++hb;
  return i + ("" + e);
}
function ho(i, e, t = 1) {
  e == null && (e = i, i = 0);
  let n = (r) => r < e;
  t < 0 && (n = (r) => e < r);
  let s = [];
  for (let r = i; n(r); r += t) s.push(r);
  return s;
}
function Za(i, e) {
  let t = {};
  for (let n of e) i[n] !== void 0 && (t[n] = i[n]);
  return t;
}
function pl(i, e) {
  let t;
  return typeof e == "string" ? t = (n) => n[e] : t = e, Object.entries(i).reduce((n, [s, r]) => (n[s] = t(r, s), n), {});
}
function cb(i, e) {
  return i.reduce((t, n, s) => (t[n] = e[s], t), {});
}
var Ol = "\0", fb = class {
  constructor() {
    C0(this, "_sentinel");
    let i = {};
    i._next = i._prev = i, this._sentinel = i;
  }
  dequeue() {
    let i = this._sentinel, e = i._prev;
    if (e !== i) return iu(e), e;
  }
  enqueue(i) {
    let e = this._sentinel;
    i._prev && i._next && iu(i), i._next = e._next, e._next._prev = i, e._next = i, i._prev = e;
  }
  toString() {
    let i = [], e = this._sentinel, t = e._prev;
    for (; t !== e; ) i.push(JSON.stringify(t, ub)), t = t._prev;
    return "[" + i.join(", ") + "]";
  }
};
function iu(i) {
  i._prev._next = i._next, i._next._prev = i._prev, delete i._next, delete i._prev;
}
function ub(i, e) {
  if (i !== "_next" && i !== "_prev") return e;
}
var db = fb, pb = () => 1;
function Ob(i, e) {
  if (i.nodeCount() <= 1) return [];
  let t = mb(i, e || pb);
  return gb(t.graph, t.buckets, t.zeroIdx).flatMap((n) => i.outEdges(n.v, n.w) || []);
}
function gb(i, e, t) {
  var n;
  let s = [], r = e[e.length - 1], o = e[0], a;
  for (; i.nodeCount(); ) {
    for (; a = o.dequeue(); ) Yl(i, e, t, a);
    for (; a = r.dequeue(); ) Yl(i, e, t, a);
    if (i.nodeCount()) {
      for (let l = e.length - 2; l > 0; --l) if (a = (n = e[l]) == null ? void 0 : n.dequeue(), a) {
        s = s.concat(Yl(i, e, t, a, !0) || []);
        break;
      }
    }
  }
  return s;
}
function Yl(i, e, t, n, s) {
  let r = [], o = s ? r : void 0;
  return (i.inEdges(n.v) || []).forEach((a) => {
    let l = i.edge(a), h = i.node(a.v);
    s && r.push({ v: a.v, w: a.w }), h.out -= l, zh(e, t, h);
  }), (i.outEdges(n.v) || []).forEach((a) => {
    let l = i.edge(a), h = a.w, c = i.node(h);
    c.in -= l, zh(e, t, c);
  }), i.removeNode(n.v), o;
}
function mb(i, e) {
  let t = new Zi(), n = 0, s = 0;
  i.nodes().forEach((a) => {
    t.setNode(a, { v: a, in: 0, out: 0 });
  }), i.edges().forEach((a) => {
    let l = t.edge(a.v, a.w) || 0, h = e(a), c = l + h;
    t.setEdge(a.v, a.w, c);
    let f = t.node(a.v), d = t.node(a.w);
    s = Math.max(s, f.out += h), n = Math.max(n, d.in += h);
  });
  let r = vb(s + n + 3).map(() => new db()), o = n + 1;
  return t.nodes().forEach((a) => {
    zh(r, o, t.node(a));
  }), { graph: t, buckets: r, zeroIdx: o };
}
function zh(i, e, t) {
  var n, s, r;
  t.out ? t.in ? (r = i[t.out - t.in + e]) == null || r.enqueue(t) : (s = i[i.length - 1]) == null || s.enqueue(t) : (n = i[0]) == null || n.enqueue(t);
}
function vb(i) {
  let e = [];
  for (let t = 0; t < i; t++) e.push(t);
  return e;
}
function bb(i) {
  (i.graph().acyclicer === "greedy" ? Ob(i, e(i)) : yb(i)).forEach((t) => {
    let n = i.edge(t);
    i.removeEdge(t), n.forwardName = t.name, n.reversed = !0, i.setEdge(t.w, t.v, n, Uc("rev"));
  });
  function e(t) {
    return (n) => t.edge(n).weight;
  }
}
function yb(i) {
  let e = [], t = {}, n = {};
  function s(r) {
    Object.hasOwn(n, r) || (n[r] = !0, t[r] = !0, i.outEdges(r).forEach((o) => {
      Object.hasOwn(t, o.w) ? e.push(o) : s(o.w);
    }), delete t[r]);
  }
  return i.nodes().forEach(s), e;
}
function wb(i) {
  i.edges().forEach((e) => {
    let t = i.edge(e);
    if (t.reversed) {
      i.removeEdge(e);
      let n = t.forwardName;
      delete t.reversed, delete t.forwardName, i.setEdge(e.w, e.v, t, n);
    }
  });
}
function xb(i) {
  i.graph().dummyChains = [], i.edges().forEach((e) => Sb(i, e));
}
function Sb(i, e) {
  let t = e.v, n = i.node(t).rank, s = e.w, r = i.node(s).rank, o = e.name, a = i.edge(e), l = a.labelRank;
  if (r === n + 1) return;
  i.removeEdge(e);
  let h, c, f;
  for (f = 0, ++n; n < r; ++f, ++n) a.points = [], c = { width: 0, height: 0, edgeLabel: a, edgeObj: e, rank: n }, h = _r(i, "edge", c, "_d"), n === l && (c.width = a.width, c.height = a.height, c.dummy = "edge-label", c.labelpos = a.labelpos), i.setEdge(t, h, { weight: a.weight }, o), f === 0 && i.graph().dummyChains.push(h), t = h;
  i.setEdge(t, s, { weight: a.weight }, o);
}
function kb(i) {
  i.graph().dummyChains.forEach((e) => {
    let t = i.node(e), n = t.edgeLabel, s;
    for (i.setEdge(t.edgeObj, n); t.dummy; ) s = i.successors(e)[0], i.removeNode(e), n.points.push({ x: t.x, y: t.y }), t.dummy === "edge-label" && (n.x = t.x, n.y = t.y, n.width = t.width, n.height = t.height), e = s, t = i.node(e);
  });
}
function Fc(i) {
  let e = {};
  function t(n) {
    let s = i.node(n);
    if (Object.hasOwn(e, n)) return s.rank;
    e[n] = !0;
    let r = i.outEdges(n), o = r ? r.map((l) => l == null ? Number.POSITIVE_INFINITY : t(l.w) - i.edge(l).minlen) : [], a = nn(Math.min, o);
    return a === Number.POSITIVE_INFINITY && (a = 0), s.rank = a;
  }
  i.sources().forEach(t);
}
function pr(i, e) {
  return i.node(e.w).rank - i.node(e.v).rank - i.edge(e).minlen;
}
var Kp = Qb;
function Qb(i) {
  let e = new Zi({ directed: !1 }), t = i.nodes();
  if (t.length === 0) throw new Error("Graph must have at least one node");
  let n = t[0], s = i.nodeCount();
  e.setNode(n, {});
  let r, o;
  for (; $b(e, i) < s && (r = _b(e, i), !!r); ) o = e.hasNode(r.v) ? pr(i, r) : -pr(i, r), Pb(e, i, o);
  return e;
}
function $b(i, e) {
  function t(n) {
    let s = e.nodeEdges(n);
    s && s.forEach((r) => {
      let o = r.v, a = n === o ? r.w : o;
      !i.hasNode(a) && !pr(e, r) && (i.setNode(a, {}), i.setEdge(n, a, {}), t(a));
    });
  }
  return i.nodes().forEach(t), i.nodeCount();
}
function _b(i, e) {
  return e.edges().reduce((t, n) => {
    let s = Number.POSITIVE_INFINITY;
    return i.hasNode(n.v) !== i.hasNode(n.w) && (s = pr(e, n)), s < t[0] ? [s, n] : t;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function Pb(i, e, t) {
  i.nodes().forEach((n) => e.node(n).rank += t);
}
var { preorder: Tb, postorder: Cb } = Gc, Zb = Es;
Es.initLowLimValues = Kc;
Es.initCutValues = Hc;
Es.calcCutValue = Jp;
Es.leaveEdge = tO;
Es.enterEdge = iO;
Es.exchangeEdges = nO;
function Es(i) {
  i = ib(i), Fc(i);
  let e = Kp(i);
  Kc(e), Hc(e, i);
  let t, n;
  for (; t = tO(e); ) n = iO(e, i, t), nO(e, i, t, n);
}
function Hc(i, e) {
  let t = Cb(i, i.nodes());
  t = t.slice(0, t.length - 1), t.forEach((n) => Eb(i, e, n));
}
function Eb(i, e, t) {
  let n = i.node(t).parent, s = i.edge(t, n);
  s.cutvalue = Jp(i, e, t);
}
function Jp(i, e, t) {
  let n = i.node(t).parent, s = !0, r = e.edge(t, n), o = 0;
  r || (s = !1, r = e.edge(n, t)), o = r.weight;
  let a = e.nodeEdges(t);
  return a && a.forEach((l) => {
    let h = l.v === t, c = h ? l.w : l.v;
    if (c !== n) {
      let f = h === s, d = e.edge(l).weight;
      if (o += f ? d : -d, Rb(i, t, c)) {
        let p = i.edge(t, c).cutvalue;
        o += f ? -p : p;
      }
    }
  }), o;
}
function Kc(i, e) {
  arguments.length < 2 && (e = i.nodes()[0]), eO(i, {}, 1, e);
}
function eO(i, e, t, n, s) {
  let r = t, o = i.node(n);
  e[n] = !0;
  let a = i.neighbors(n);
  return a && a.forEach((l) => {
    Object.hasOwn(e, l) || (t = eO(i, e, t, l, n));
  }), o.low = r, o.lim = t++, s ? o.parent = s : delete o.parent, t;
}
function tO(i) {
  return i.edges().find((e) => i.edge(e).cutvalue < 0);
}
function iO(i, e, t) {
  let n = t.v, s = t.w;
  e.hasEdge(n, s) || (n = t.w, s = t.v);
  let r = i.node(n), o = i.node(s), a = r, l = !1;
  return r.lim > o.lim && (a = o, l = !0), e.edges().filter((h) => l === nu(i, i.node(h.v), a) && l !== nu(i, i.node(h.w), a)).reduce((h, c) => pr(e, c) < pr(e, h) ? c : h);
}
function nO(i, e, t, n) {
  let s = t.v, r = t.w;
  i.removeEdge(s, r), i.setEdge(n.v, n.w, {}), Kc(i), Hc(i, e), Ab(i, e);
}
function Ab(i, e) {
  let t = i.nodes().find((s) => !i.node(s).parent);
  if (!t) return;
  let n = Tb(i, [t]);
  n = n.slice(1), n.forEach((s) => {
    let r = i.node(s).parent, o = e.edge(s, r), a = !1;
    o || (o = e.edge(r, s), a = !0), e.node(s).rank = e.node(r).rank + (a ? o.minlen : -o.minlen);
  });
}
function Rb(i, e, t) {
  return i.hasEdge(e, t);
}
function nu(i, e, t) {
  return t.low <= e.lim && e.lim <= t.lim;
}
var Mb = Xb;
function Xb(i) {
  let e = i.graph().ranker;
  if (typeof e == "function") return e(i);
  switch (e) {
    case "network-simplex":
      su(i);
      break;
    case "tight-tree":
      Lb(i);
      break;
    case "longest-path":
      jb(i);
      break;
    case "none":
      break;
    default:
      su(i);
  }
}
var jb = Fc;
function Lb(i) {
  Fc(i), Kp(i);
}
function su(i) {
  Zb(i);
}
var Ib = Db;
function Db(i) {
  let e = Nb(i);
  i.graph().dummyChains.forEach((t) => {
    let n = i.node(t), s = n.edgeObj, r = zb(i, e, s.v, s.w), o = r.path, a = r.lca, l = 0, h = o[l], c = !0;
    for (; t !== s.w; ) {
      if (n = i.node(t), c) {
        for (; (h = o[l]) !== a && i.node(h).maxRank < n.rank; ) l++;
        h === a && (c = !1);
      }
      if (!c) {
        for (; l < o.length - 1 && i.node(o[l + 1]).minRank <= n.rank; ) l++;
        h = o[l];
      }
      h !== void 0 && i.setParent(t, h), t = i.successors(t)[0];
    }
  });
}
function zb(i, e, t, n) {
  let s = [], r = [], o = Math.min(e[t].low, e[n].low), a = Math.max(e[t].lim, e[n].lim), l;
  l = t;
  do
    l = i.parent(l), s.push(l);
  while (l && (e[l].low > o || a > e[l].lim));
  let h = l, c = n;
  for (; (c = i.parent(c)) !== h; ) r.push(c);
  return { path: s.concat(r.reverse()), lca: h };
}
function Nb(i) {
  let e = {}, t = 0;
  function n(s) {
    let r = t;
    i.children(s).forEach(n), e[s] = { low: r, lim: t++ };
  }
  return i.children(Ol).forEach(n), e;
}
function Yb(i) {
  let e = _r(i, "root", {}, "_root"), t = qb(i), n = Object.values(t), s = nn(Math.max, n) - 1, r = 2 * s + 1;
  i.graph().nestingRoot = e, i.edges().forEach((a) => i.edge(a).minlen *= r);
  let o = Wb(i) + 1;
  i.children(Ol).forEach((a) => sO(i, e, r, o, s, t, a)), i.graph().nodeRankFactor = r;
}
function sO(i, e, t, n, s, r, o) {
  var a;
  let l = i.children(o);
  if (!l.length) {
    o !== e && i.setEdge(e, o, { weight: 0, minlen: t });
    return;
  }
  let h = tu(i, "_bt"), c = tu(i, "_bb"), f = i.node(o);
  i.setParent(h, o), f.borderTop = h, i.setParent(c, o), f.borderBottom = c, l.forEach((d) => {
    var p;
    sO(i, e, t, n, s, r, d);
    let O = i.node(d), g = O.borderTop ? O.borderTop : d, m = O.borderBottom ? O.borderBottom : d, v = O.borderTop ? n : 2 * n, Q = g !== m ? 1 : s - ((p = r[o]) != null ? p : 0) + 1;
    i.setEdge(h, g, { weight: v, minlen: Q, nestingEdge: !0 }), i.setEdge(m, c, { weight: v, minlen: Q, nestingEdge: !0 });
  }), i.parent(o) || i.setEdge(e, h, { weight: 0, minlen: s + ((a = r[o]) != null ? a : 0) });
}
function qb(i) {
  let e = {};
  function t(n, s) {
    let r = i.children(n);
    r && r.length && r.forEach((o) => t(o, s + 1)), e[n] = s;
  }
  return i.children(Ol).forEach((n) => t(n, 1)), e;
}
function Wb(i) {
  return i.edges().reduce((e, t) => e + i.edge(t).weight, 0);
}
function Vb(i) {
  let e = i.graph();
  i.removeNode(e.nestingRoot), delete e.nestingRoot, i.edges().forEach((t) => {
    i.edge(t).nestingEdge && i.removeEdge(t);
  });
}
var Bb = Gb;
function Gb(i) {
  function e(t) {
    let n = i.children(t), s = i.node(t);
    if (n.length && n.forEach(e), Object.hasOwn(s, "minRank")) {
      s.borderLeft = [], s.borderRight = [];
      for (let r = s.minRank, o = s.maxRank + 1; r < o; ++r) ru(i, "borderLeft", "_bl", t, s, r), ru(i, "borderRight", "_br", t, s, r);
    }
  }
  i.children(Ol).forEach(e);
}
function ru(i, e, t, n, s, r) {
  let o = { width: 0, height: 0, rank: r, borderType: e }, a = s[e][r - 1], l = _r(i, "border", o, t);
  s[e][r] = l, i.setParent(l, n), a && i.setEdge(a, l, { weight: 1 });
}
function Ub(i) {
  var e;
  let t = (e = i.graph().rankdir) == null ? void 0 : e.toLowerCase();
  (t === "lr" || t === "rl") && rO(i);
}
function Fb(i) {
  var e;
  let t = (e = i.graph().rankdir) == null ? void 0 : e.toLowerCase();
  (t === "bt" || t === "rl") && Hb(i), (t === "lr" || t === "rl") && (Kb(i), rO(i));
}
function rO(i) {
  i.nodes().forEach((e) => ou(i.node(e))), i.edges().forEach((e) => ou(i.edge(e)));
}
function ou(i) {
  let e = i.width;
  i.width = i.height, i.height = e;
}
function Hb(i) {
  i.nodes().forEach((e) => ql(i.node(e))), i.edges().forEach((e) => {
    var t;
    let n = i.edge(e);
    (t = n.points) == null || t.forEach(ql), Object.hasOwn(n, "y") && ql(n);
  });
}
function ql(i) {
  i.y = -i.y;
}
function Kb(i) {
  i.nodes().forEach((e) => Wl(i.node(e))), i.edges().forEach((e) => {
    var t;
    let n = i.edge(e);
    (t = n.points) == null || t.forEach(Wl), Object.hasOwn(n, "x") && Wl(n);
  });
}
function Wl(i) {
  let e = i.x;
  i.x = i.y, i.y = e;
}
function Jb(i) {
  let e = {}, t = i.nodes().filter((a) => !i.children(a).length), n = t.map((a) => i.node(a).rank), s = nn(Math.max, n), r = ho(s + 1).map(() => []);
  function o(a) {
    if (e[a]) return;
    e[a] = !0;
    let l = i.node(a);
    r[l.rank].push(a);
    let h = i.successors(a);
    h && h.forEach(o);
  }
  return t.sort((a, l) => i.node(a).rank - i.node(l).rank).forEach(o), r;
}
function e1(i, e) {
  let t = 0;
  for (let n = 1; n < e.length; ++n) t += t1(i, e[n - 1], e[n]);
  return t;
}
function t1(i, e, t) {
  let n = cb(t, t.map((h, c) => c)), s = e.flatMap((h) => {
    let c = i.outEdges(h);
    return c ? c.map((f) => ({ pos: n[f.w], weight: i.edge(f).weight })).sort((f, d) => f.pos - d.pos) : [];
  }), r = 1;
  for (; r < t.length; ) r <<= 1;
  let o = 2 * r - 1;
  r -= 1;
  let a = new Array(o).fill(0), l = 0;
  return s.forEach((h) => {
    let c = h.pos + r;
    a[c] += h.weight;
    let f = 0;
    for (; c > 0; ) c % 2 && (f += a[c + 1]), c = c - 1 >> 1, a[c] += h.weight;
    l += h.weight * f;
  }), l;
}
function i1(i, e = []) {
  return e.map((t) => {
    let n = i.inEdges(t);
    if (!n || !n.length) return { v: t };
    {
      let s = n.reduce((r, o) => {
        let a = i.edge(o), l = i.node(o.v);
        return { sum: r.sum + a.weight * l.order, weight: r.weight + a.weight };
      }, { sum: 0, weight: 0 });
      return { v: t, barycenter: s.sum / s.weight, weight: s.weight };
    }
  });
}
function n1(i, e) {
  let t = {};
  i.forEach((s, r) => {
    let o = { indegree: 0, in: [], out: [], vs: [s.v], i: r };
    s.barycenter !== void 0 && (o.barycenter = s.barycenter, o.weight = s.weight), t[s.v] = o;
  }), e.edges().forEach((s) => {
    let r = t[s.v], o = t[s.w];
    r !== void 0 && o !== void 0 && (o.indegree++, r.out.push(o));
  });
  let n = Object.values(t).filter((s) => !s.indegree);
  return s1(n);
}
function s1(i) {
  let e = [];
  function t(s) {
    return (r) => {
      r.merged || (r.barycenter === void 0 || s.barycenter === void 0 || r.barycenter >= s.barycenter) && r1(s, r);
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
  return e.filter((s) => !s.merged).map((s) => Za(s, ["vs", "i", "barycenter", "weight"]));
}
function r1(i, e) {
  let t = 0, n = 0;
  i.weight && (t += i.barycenter * i.weight, n += i.weight), e.weight && (t += e.barycenter * e.weight, n += e.weight), i.vs = e.vs.concat(i.vs), i.barycenter = t / n, i.weight = n, i.i = Math.min(e.i, i.i), e.merged = !0;
}
function o1(i, e) {
  let t = ob(i, (c) => Object.hasOwn(c, "barycenter")), n = t.lhs, s = t.rhs.sort((c, f) => f.i - c.i), r = [], o = 0, a = 0, l = 0;
  n.sort(a1(!!e)), l = au(r, s, l), n.forEach((c) => {
    l += c.vs.length, r.push(c.vs), o += c.barycenter * c.weight, a += c.weight, l = au(r, s, l);
  });
  let h = { vs: r.flat(1) };
  return a && (h.barycenter = o / a, h.weight = a), h;
}
function au(i, e, t) {
  let n;
  for (; e.length && (n = e[e.length - 1]).i <= t; ) e.pop(), i.push(n.vs), t++;
  return t;
}
function a1(i) {
  return (e, t) => e.barycenter < t.barycenter ? -1 : e.barycenter > t.barycenter ? 1 : i ? t.i - e.i : e.i - t.i;
}
function oO(i, e, t, n) {
  let s = i.children(e), r = i.node(e), o = r ? r.borderLeft : void 0, a = r ? r.borderRight : void 0, l = {};
  o && (s = s.filter((d) => d !== o && d !== a));
  let h = i1(i, s);
  h.forEach((d) => {
    if (i.children(d.v).length) {
      let p = oO(i, d.v, t, n);
      l[d.v] = p, Object.hasOwn(p, "barycenter") && h1(d, p);
    }
  });
  let c = n1(h, t);
  l1(c, l);
  let f = o1(c, n);
  if (o && a) {
    f.vs = [o, f.vs, a].flat(1);
    let d = i.predecessors(o);
    if (d && d.length) {
      let p = i.node(d[0]), O = i.predecessors(a), g = i.node(O[0]);
      Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + p.order + g.order) / (f.weight + 2), f.weight += 2;
    }
  }
  return f;
}
function l1(i, e) {
  i.forEach((t) => {
    t.vs = t.vs.flatMap((n) => e[n] ? e[n].vs : n);
  });
}
function h1(i, e) {
  i.barycenter !== void 0 ? (i.barycenter = (i.barycenter * i.weight + e.barycenter * e.weight) / (i.weight + e.weight), i.weight += e.weight) : (i.barycenter = e.barycenter, i.weight = e.weight);
}
function c1(i, e, t, n) {
  n || (n = i.nodes());
  let s = f1(i), r = new Zi({ compound: !0 }).setGraph({ root: s }).setDefaultNodeLabel((o) => i.node(o));
  return n.forEach((o) => {
    let a = i.node(o), l = i.parent(o);
    if (a.rank === e || a.minRank <= e && e <= a.maxRank) {
      r.setNode(o), r.setParent(o, l || s);
      let h = i[t](o);
      h && h.forEach((c) => {
        let f = c.v === o ? c.w : c.v, d = r.edge(f, o), p = d !== void 0 ? d.weight : 0;
        r.setEdge(f, o, { weight: i.edge(c).weight + p });
      }), Object.hasOwn(a, "minRank") && r.setNode(o, { borderLeft: a.borderLeft[e], borderRight: a.borderRight[e] });
    }
  }), r;
}
function f1(i) {
  let e;
  for (; i.hasNode(e = Uc("_root")); ) ;
  return e;
}
function u1(i, e, t) {
  let n = {}, s;
  t.forEach((r) => {
    let o = i.parent(r), a, l;
    for (; o; ) {
      if (a = i.parent(o), a ? (l = n[a], n[a] = o) : (l = s, s = o), l && l !== o) {
        e.setEdge(l, o);
        return;
      }
      o = a;
    }
  });
}
function aO(i, e = {}) {
  if (typeof e.customOrder == "function") {
    e.customOrder(i, aO);
    return;
  }
  let t = Hp(i), n = lu(i, ho(1, t + 1), "inEdges"), s = lu(i, ho(t - 1, -1, -1), "outEdges"), r = Jb(i);
  if (hu(i, r), e.disableOptimalOrderHeuristic) return;
  let o = Number.POSITIVE_INFINITY, a, l = e.constraints || [];
  for (let h = 0, c = 0; c < 4; ++h, ++c) {
    d1(h % 2 ? n : s, h % 4 >= 2, l), r = dl(i);
    let f = e1(i, r);
    f < o ? (c = 0, a = Object.assign({}, r), o = f) : f === o && (a = structuredClone(r));
  }
  hu(i, a);
}
function lu(i, e, t) {
  let n = /* @__PURE__ */ new Map(), s = (r, o) => {
    n.has(r) || n.set(r, []), n.get(r).push(o);
  };
  for (let r of i.nodes()) {
    let o = i.node(r);
    if (typeof o.rank == "number" && s(o.rank, r), typeof o.minRank == "number" && typeof o.maxRank == "number") for (let a = o.minRank; a <= o.maxRank; a++) a !== o.rank && s(a, r);
  }
  return e.map(function(r) {
    return c1(i, r, t, n.get(r) || []);
  });
}
function d1(i, e, t) {
  let n = new Zi();
  i.forEach(function(s) {
    t.forEach((a) => n.setEdge(a.left, a.right));
    let r = s.graph().root, o = oO(s, r, n, e);
    o.vs.forEach((a, l) => s.node(a).order = l), u1(s, n, o.vs);
  });
}
function hu(i, e) {
  Object.values(e).forEach((t) => t.forEach((n, s) => i.node(n).order = s));
}
function p1(i, e) {
  let t = {};
  function n(s, r) {
    let o = 0, a = 0, l = s.length, h = r[r.length - 1];
    return r.forEach((c, f) => {
      let d = g1(i, c), p = d ? i.node(d).order : l;
      (d || c === h) && (r.slice(a, f + 1).forEach((O) => {
        let g = i.predecessors(O);
        g && g.forEach((m) => {
          let v = i.node(m), Q = v.order;
          (Q < o || p < Q) && !(v.dummy && i.node(O).dummy) && lO(t, m, O);
        });
      }), a = f + 1, o = p);
    }), r;
  }
  return e.length && e.reduce(n), t;
}
function O1(i, e) {
  let t = {};
  function n(r, o, a, l, h) {
    ho(o, a).forEach((c) => {
      let f = r[c];
      if (f !== void 0 && i.node(f).dummy) {
        let d = i.predecessors(f);
        d && d.forEach((p) => {
          if (p === void 0) return;
          let O = i.node(p);
          O.dummy && (O.order < l || O.order > h) && lO(t, p, f);
        });
      }
    });
  }
  function s(r, o) {
    let a = -1, l = -1, h = 0;
    return o.forEach((c, f) => {
      if (i.node(c).dummy === "border") {
        let d = i.predecessors(c);
        if (d && d.length) {
          let p = d[0];
          if (p === void 0) return;
          l = i.node(p).order, n(o, h, f, a, l), h = f, a = l;
        }
      }
      n(o, h, o.length, l, r.length);
    }), o;
  }
  return e.length && e.reduce(s), t;
}
function g1(i, e) {
  if (i.node(e).dummy) {
    let t = i.predecessors(e);
    if (t) return t.find((n) => i.node(n).dummy);
  }
}
function lO(i, e, t) {
  if (e > t) {
    let s = e;
    e = t, t = s;
  }
  let n = i[e];
  n || (i[e] = n = {}), n[t] = !0;
}
function m1(i, e, t) {
  if (e > t) {
    let s = e;
    e = t, t = s;
  }
  let n = i[e];
  return n !== void 0 && Object.hasOwn(n, t);
}
function v1(i, e, t, n) {
  let s = {}, r = {}, o = {};
  return e.forEach((a) => {
    a.forEach((l, h) => {
      s[l] = l, r[l] = l, o[l] = h;
    });
  }), e.forEach((a) => {
    let l = -1;
    a.forEach((h) => {
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
          if (m !== void 0 && r[h] === h && l < m && !m1(t, h, g)) {
            let v = s[g];
            v !== void 0 && (r[g] = h, r[h] = s[h] = v, l = m);
          }
        }
      }
    });
  }), { root: s, align: r };
}
function b1(i, e, t, n, s = !1) {
  let r = {}, o = y1(i, e, t, s), a = s ? "borderLeft" : "borderRight";
  function l(p, O) {
    let g = o.nodes().slice(), m = {}, v = g.pop();
    for (; v; ) {
      if (m[v]) p(v);
      else {
        m[v] = !0, g.push(v);
        for (let Q of O(v)) g.push(Q);
      }
      v = g.pop();
    }
  }
  function h(p) {
    let O = o.inEdges(p);
    O ? r[p] = O.reduce((g, m) => {
      var v;
      let Q = (v = r[m.v]) != null ? v : 0, k = o.edge(m);
      return Math.max(g, Q + (k !== void 0 ? k : 0));
    }, 0) : r[p] = 0;
  }
  function c(p) {
    let O = o.outEdges(p), g = Number.POSITIVE_INFINITY;
    O && (g = O.reduce((v, Q) => {
      let k = r[Q.w], R = o.edge(Q);
      return Math.min(v, (k !== void 0 ? k : 0) - (R !== void 0 ? R : 0));
    }, Number.POSITIVE_INFINITY));
    let m = i.node(p);
    g !== Number.POSITIVE_INFINITY && m.borderType !== a && (r[p] = Math.max(r[p] !== void 0 ? r[p] : 0, g));
  }
  function f(p) {
    return o.predecessors(p) || [];
  }
  function d(p) {
    return o.successors(p) || [];
  }
  return l(h, f), l(c, d), Object.keys(n).forEach((p) => {
    var O;
    let g = t[p];
    g !== void 0 && (r[p] = (O = r[g]) != null ? O : 0);
  }), r;
}
function y1(i, e, t, n) {
  let s = new Zi(), r = i.graph(), o = Q1(r.nodesep, r.edgesep, n);
  return e.forEach((a) => {
    let l;
    a.forEach((h) => {
      let c = t[h];
      if (c !== void 0) {
        if (s.setNode(c), l !== void 0) {
          let f = t[l];
          if (f !== void 0) {
            let d = s.edge(f, c);
            s.setEdge(f, c, Math.max(o(i, h, l), d || 0));
          }
        }
        l = h;
      }
    });
  }), s;
}
function w1(i, e) {
  return Object.values(e).reduce((t, n) => {
    let s = Number.NEGATIVE_INFINITY, r = Number.POSITIVE_INFINITY;
    Object.entries(n).forEach(([a, l]) => {
      let h = $1(i, a) / 2;
      s = Math.max(l + h, s), r = Math.min(l - h, r);
    });
    let o = s - r;
    return o < t[0] && (t = [o, n]), t;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function x1(i, e) {
  let t = Object.values(e), n = nn(Math.min, t), s = nn(Math.max, t);
  ["u", "d"].forEach((r) => {
    ["l", "r"].forEach((o) => {
      let a = r + o, l = i[a];
      if (!l || l === e) return;
      let h = Object.values(l), c = n - nn(Math.min, h);
      o !== "l" && (c = s - nn(Math.max, h)), c && (i[a] = pl(l, (f) => f + c));
    });
  });
}
function S1(i, e = void 0) {
  let t = i.ul;
  return t ? pl(t, (n, s) => {
    var r, o;
    if (e) {
      let l = e.toLowerCase(), h = i[l];
      if (h && h[s] !== void 0) return h[s];
    }
    let a = Object.values(i).map((l) => {
      let h = l[s];
      return h !== void 0 ? h : 0;
    }).sort((l, h) => l - h);
    return (((r = a[1]) != null ? r : 0) + ((o = a[2]) != null ? o : 0)) / 2;
  }) : {};
}
function k1(i) {
  let e = dl(i), t = Object.assign(p1(i, e), O1(i, e)), n = {}, s;
  ["u", "d"].forEach((o) => {
    s = o === "u" ? e : Object.values(e).reverse(), ["l", "r"].forEach((a) => {
      a === "r" && (s = s.map((c) => Object.values(c).reverse()));
      let l = v1(i, s, t, (c) => (o === "u" ? i.predecessors(c) : i.successors(c)) || []), h = b1(i, s, l.root, l.align, a === "r");
      a === "r" && (h = pl(h, (c) => -c)), n[o + a] = h;
    });
  });
  let r = w1(i, n);
  return x1(n, r), S1(n, i.graph().align);
}
function Q1(i, e, t) {
  return (n, s, r) => {
    let o = n.node(s), a = n.node(r), l = 0, h;
    if (l += o.width / 2, Object.hasOwn(o, "labelpos")) switch (o.labelpos.toLowerCase()) {
      case "l":
        h = -o.width / 2;
        break;
      case "r":
        h = o.width / 2;
        break;
    }
    if (h && (l += t ? h : -h), h = void 0, l += (o.dummy ? e : i) / 2, l += (a.dummy ? e : i) / 2, l += a.width / 2, Object.hasOwn(a, "labelpos")) switch (a.labelpos.toLowerCase()) {
      case "l":
        h = a.width / 2;
        break;
      case "r":
        h = -a.width / 2;
        break;
    }
    return h && (l += t ? h : -h), l;
  };
}
function $1(i, e) {
  return i.node(e).width;
}
function _1(i) {
  i = Up(i), P1(i), Object.entries(k1(i)).forEach(([e, t]) => i.node(e).x = t);
}
function P1(i) {
  let e = dl(i), t = i.graph(), n = t.ranksep, s = t.rankalign, r = 0;
  e.forEach((o) => {
    let a = o.reduce((l, h) => {
      var c;
      let f = (c = i.node(h).height) != null ? c : 0;
      return l > f ? l : f;
    }, 0);
    o.forEach((l) => {
      let h = i.node(l);
      s === "top" ? h.y = r + h.height / 2 : s === "bottom" ? h.y = r + a - h.height / 2 : h.y = r + a / 2;
    }), r += a + n;
  });
}
function T1(i, e = {}) {
  let t = e.debugTiming ? ab : lb;
  return t("layout", () => {
    let n = t("  buildLayoutGraph", () => I1(i));
    return t("  runLayout", () => C1(n, t, e)), t("  updateInputGraph", () => Z1(i, n)), n;
  });
}
function C1(i, e, t) {
  e("    makeSpaceForEdgeLabels", () => D1(i)), e("    removeSelfEdges", () => U1(i)), e("    acyclic", () => bb(i)), e("    nestingGraph.run", () => Yb(i)), e("    rank", () => Mb(Up(i))), e("    injectEdgeLabelProxies", () => z1(i)), e("    removeEmptyRanks", () => sb(i)), e("    nestingGraph.cleanup", () => Vb(i)), e("    normalizeRanks", () => nb(i)), e("    assignRankMinMax", () => N1(i)), e("    removeEdgeLabelProxies", () => Y1(i)), e("    normalize.run", () => xb(i)), e("    parentDummyChains", () => Ib(i)), e("    addBorderSegments", () => Bb(i)), e("    order", () => aO(i, t)), e("    insertSelfEdges", () => F1(i)), e("    adjustCoordinateSystem", () => Ub(i)), e("    position", () => _1(i)), e("    positionSelfEdges", () => H1(i)), e("    removeBorderNodes", () => G1(i)), e("    normalize.undo", () => kb(i)), e("    fixupEdgeLabelCoords", () => V1(i)), e("    undoCoordinateSystem", () => Fb(i)), e("    translateGraph", () => q1(i)), e("    assignNodeIntersects", () => W1(i)), e("    reversePoints", () => B1(i)), e("    acyclic.undo", () => wb(i));
}
function Z1(i, e) {
  i.nodes().forEach((t) => {
    let n = i.node(t), s = e.node(t);
    n && (n.x = s.x, n.y = s.y, n.order = s.order, n.rank = s.rank, e.children(t).length && (n.width = s.width, n.height = s.height));
  }), i.edges().forEach((t) => {
    let n = i.edge(t), s = e.edge(t);
    n.points = s.points, Object.hasOwn(s, "x") && (n.x = s.x, n.y = s.y);
  }), i.graph().width = e.graph().width, i.graph().height = e.graph().height;
}
var E1 = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], A1 = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "TB", rankalign: "center" }, R1 = ["acyclicer", "ranker", "rankdir", "align", "rankalign"], M1 = ["width", "height", "rank"], cu = { width: 0, height: 0 }, X1 = ["minlen", "weight", "width", "height", "labeloffset"], j1 = { minlen: 1, weight: 1, width: 0, height: 0, labeloffset: 10, labelpos: "r" }, L1 = ["labelpos"];
function I1(i) {
  let e = new Zi({ multigraph: !0, compound: !0 }), t = Bl(i.graph());
  return e.setGraph(Object.assign({}, A1, Vl(t, E1), Za(t, R1))), i.nodes().forEach((n) => {
    let s = Bl(i.node(n)), r = Vl(s, M1);
    Object.keys(cu).forEach((a) => {
      r[a] === void 0 && (r[a] = cu[a]);
    }), e.setNode(n, r);
    let o = i.parent(n);
    o !== void 0 && e.setParent(n, o);
  }), i.edges().forEach((n) => {
    let s = Bl(i.edge(n));
    e.setEdge(n, Object.assign({}, j1, Vl(s, X1), Za(s, L1)));
  }), e;
}
function D1(i) {
  let e = i.graph();
  e.ranksep /= 2, i.edges().forEach((t) => {
    let n = i.edge(t);
    n.minlen *= 2, n.labelpos.toLowerCase() !== "c" && (e.rankdir === "TB" || e.rankdir === "BT" ? n.width += n.labeloffset : n.height += n.labeloffset);
  });
}
function z1(i) {
  i.edges().forEach((e) => {
    let t = i.edge(e);
    if (t.width && t.height) {
      let n = i.node(e.v), s = { rank: (i.node(e.w).rank - n.rank) / 2 + n.rank, e };
      _r(i, "edge-proxy", s, "_ep");
    }
  });
}
function N1(i) {
  let e = 0;
  i.nodes().forEach((t) => {
    let n = i.node(t);
    n.borderTop && (n.minRank = i.node(n.borderTop).rank, n.maxRank = i.node(n.borderBottom).rank, e = Math.max(e, n.maxRank));
  }), i.graph().maxRank = e;
}
function Y1(i) {
  i.nodes().forEach((e) => {
    let t = i.node(e);
    if (t.dummy === "edge-proxy") {
      let n = t;
      i.edge(n.e).labelRank = t.rank, i.removeNode(e);
    }
  });
}
function q1(i) {
  let e = Number.POSITIVE_INFINITY, t = 0, n = Number.POSITIVE_INFINITY, s = 0, r = i.graph(), o = r.marginx || 0, a = r.marginy || 0;
  function l(h) {
    let c = h.x, f = h.y, d = h.width, p = h.height;
    e = Math.min(e, c - d / 2), t = Math.max(t, c + d / 2), n = Math.min(n, f - p / 2), s = Math.max(s, f + p / 2);
  }
  i.nodes().forEach((h) => l(i.node(h))), i.edges().forEach((h) => {
    let c = i.edge(h);
    Object.hasOwn(c, "x") && l(c);
  }), e -= o, n -= a, i.nodes().forEach((h) => {
    let c = i.node(h);
    c.x -= e, c.y -= n;
  }), i.edges().forEach((h) => {
    let c = i.edge(h);
    c.points.forEach((f) => {
      f.x -= e, f.y -= n;
    }), Object.hasOwn(c, "x") && (c.x -= e), Object.hasOwn(c, "y") && (c.y -= n);
  }), r.width = t - e + o, r.height = s - n + a;
}
function W1(i) {
  i.edges().forEach((e) => {
    let t = i.edge(e), n = i.node(e.v), s = i.node(e.w), r, o;
    t.points ? (r = t.points[0], o = t.points[t.points.length - 1]) : (t.points = [], r = s, o = n), t.points.unshift(eu(n, r)), t.points.push(eu(s, o));
  });
}
function V1(i) {
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
function B1(i) {
  i.edges().forEach((e) => {
    let t = i.edge(e);
    t.reversed && t.points.reverse();
  });
}
function G1(i) {
  i.nodes().forEach((e) => {
    if (i.children(e).length) {
      let t = i.node(e), n = i.node(t.borderTop), s = i.node(t.borderBottom), r = i.node(t.borderLeft[t.borderLeft.length - 1]), o = i.node(t.borderRight[t.borderRight.length - 1]);
      t.width = Math.abs(o.x - r.x), t.height = Math.abs(s.y - n.y), t.x = r.x + t.width / 2, t.y = n.y + t.height / 2;
    }
  }), i.nodes().forEach((e) => {
    i.node(e).dummy === "border" && i.removeNode(e);
  });
}
function U1(i) {
  i.edges().forEach((e) => {
    if (e.v === e.w) {
      let t = i.node(e.v);
      t.selfEdges || (t.selfEdges = []), t.selfEdges.push({ e, label: i.edge(e) }), i.removeEdge(e);
    }
  });
}
function F1(i) {
  dl(i).forEach((e) => {
    let t = 0;
    e.forEach((n, s) => {
      let r = i.node(n);
      r.order = s + t, (r.selfEdges || []).forEach((o) => {
        _r(i, "selfedge", { width: o.label.width, height: o.label.height, rank: r.rank, order: s + ++t, e: o.e, label: o.label }, "_se");
      }), delete r.selfEdges;
    });
  });
}
function H1(i) {
  i.nodes().forEach((e) => {
    let t = i.node(e);
    if (t.dummy === "selfedge") {
      let n = t, s = i.node(n.e.v), r = s.x + s.width / 2, o = s.y, a = t.x - r, l = s.height / 2;
      i.setEdge(n.e, n.label), i.removeNode(e), n.label.points = [{ x: r + 2 * a / 3, y: o - l }, { x: r + 5 * a / 6, y: o - l }, { x: r + a, y: o }, { x: r + 5 * a / 6, y: o + l }, { x: r + 2 * a / 3, y: o + l }], n.label.x = t.x, n.label.y = t.y;
    }
  });
}
function Vl(i, e) {
  return pl(Za(i, e), Number);
}
function Bl(i) {
  let e = {};
  return i && Object.entries(i).forEach(([t, n]) => {
    typeof t == "string" && (t = t.toLowerCase()), e[t] = n;
  }), e;
}
/*! For license information please see dagre.esm.js.LEGAL.txt */
function hO(i) {
  const e = new Zi({ multigraph: !0 });
  e.setGraph({
    rankdir: "LR",
    nodesep: Pa,
    ranksep: Pa * 2,
    marginx: 40,
    marginy: 40
  }), e.setDefaultEdgeLabel(() => ({}));
  for (const n of Object.values(i.nodes))
    e.setNode(n.id, { width: ur, height: dr });
  for (const n of i.edges)
    i.nodes[n.from] && i.nodes[n.to] && e.setEdge(n.from, n.to);
  T1(e);
  const t = {};
  for (const [n, s] of Object.entries(i.nodes)) {
    const r = e.node(n);
    t[n] = r ? { ...s, position: { x: r.x - ur / 2, y: r.y - dr / 2 } } : s;
  }
  return { ...i, nodes: t };
}
const gl = $n(!1);
let Vs = null, co = !1, fu = !1;
lt.subscribe(() => {
  if (!fu) {
    fu = !0;
    return;
  }
  co || Vs && (Vs = null, gl.set(!1));
});
function K1() {
  Vs = structuredClone(ap(lt)), co = !0, lt.update((i) => hO(i)), co = !1, gl.set(!0);
}
function Gl() {
  if (!Vs) return;
  const i = Vs;
  co = !0, lt.set(i), co = !1, Vs = null, gl.set(!1);
}
const Eo = $n(!1);
let Bs = null, cO = "", fo = !1, uu = !1;
lt.subscribe(() => {
  if (!uu) {
    uu = !0;
    return;
  }
  fo || Bs && (Bs = null, Eo.set(!1));
});
function J1(i, e, t) {
  Bs = i, cO = e, fo = !0, t(), fo = !1, Eo.set(!0);
}
function fO() {
  if (!Bs) return null;
  const i = Bs, e = cO;
  return fo = !0, lt.set(i), fo = !1, Bs = null, Eo.set(!1), e;
}
var ey = /* @__PURE__ */ j('<button class="toolbar-btn svelte-x8b01c">Auto Placement</button>'), ty = /* @__PURE__ */ j('<button class="toolbar-btn toolbar-btn-undo svelte-x8b01c">Undo Auto Placement</button>'), iy = /* @__PURE__ */ j('<button class="toolbar-btn toolbar-btn-undo svelte-x8b01c">Undo Caal Change</button>'), ny = /* @__PURE__ */ j('<div class="canvas-toolbar svelte-x8b01c"><!> <!> <!></div>');
function sy(i, e) {
  xt(e, !1);
  let t = Xe(e, "readonly", 8, !1), n = Xe(e, "canUndo", 8, !1), s = Xe(e, "canUndoCaal", 8, !1);
  const r = fl();
  Tt();
  var o = ny(), a = x(o);
  {
    var l = (p) => {
      var O = ey();
      ee("click", O, () => r("autoPlacement")), E(p, O);
    };
    F(a, (p) => {
      t() || p(l);
    });
  }
  var h = w(a, 2);
  {
    var c = (p) => {
      var O = ty();
      ee("click", O, () => r("undo")), E(p, O);
    };
    F(h, (p) => {
      n() && !t() && p(c);
    });
  }
  var f = w(h, 2);
  {
    var d = (p) => {
      var O = iy();
      ee("click", O, () => r("undoCaal")), E(p, O);
    };
    F(f, (p) => {
      s() && !t() && p(d);
    });
  }
  E(i, o), St();
}
var ry = /* @__PURE__ */ Zo('<line stroke-width="2" marker-end="url(#arrow)"></line>'), oy = /* @__PURE__ */ Zo('<line stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.8"></line>'), ay = /* @__PURE__ */ Zo('<circle cx="148" cy="8" r="8" fill="#f59e0b"></circle><text x="148" y="12" fill="#000" font-size="8" font-family="monospace" text-anchor="middle"> </text>', 1), ly = /* @__PURE__ */ Zo('<g style="cursor:pointer" role="button" tabindex="0"><rect width="160" height="40" rx="6"></rect><text x="12" y="14" fill="#94a3b8" font-size="9" font-family="monospace"> </text><text x="12" y="29" fill="#e2e8f0" font-size="12" font-family="system-ui"> </text><!><circle cx="160" cy="20" r="5" class="port port-out"></circle><circle cx="0" cy="20" r="5" class="port port-in"></circle></g>'), hy = /* @__PURE__ */ Zo('<line stroke="#7c6af7" stroke-width="1.5" stroke-dasharray="6,3" pointer-events="none"></line>'), cy = /* @__PURE__ */ j('<input class="picker-input svelte-1lehbkp" type="text" placeholder="JSONata expression"/> <button class="picker-btn picker-add svelte-1lehbkp">Add</button>', 1), fy = /* @__PURE__ */ j('<div class="edge-picker svelte-1lehbkp"><button class="picker-btn svelte-1lehbkp">Unconditional</button> <button class="picker-btn svelte-1lehbkp">Fallback</button> <button class="picker-btn svelte-1lehbkp">Conditional</button> <!> <button class="picker-btn picker-cancel svelte-1lehbkp">Cancel</button></div>'), uy = /* @__PURE__ */ j('<div class="empty-hint svelte-1lehbkp">Drag nodes from the palette to build your agent graph</div>'), dy = /* @__PURE__ */ j('<div class="canvas-wrap svelte-1lehbkp" role="presentation"><!> <svg style="width:100%;height:100%"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7c6af7"></path></marker></defs><!><!><!><!></svg> <!> <!></div>');
function py(i, e) {
  xt(e, !1);
  const t = () => ft(lt, "$graph", o), n = () => ft(gl, "$canUndoAutoPlacement", o), s = () => ft(Eo, "$canUndoCaalChange", o), r = () => ft(Bn, "$selectedNode", o), [o, a] = _n(), l = /* @__PURE__ */ W();
  Xe(e, "agentId", 8);
  let h = Xe(e, "readonly", 8, !1);
  const c = "application/x-magicaal-node-type", f = /* @__PURE__ */ new Set(["core:tool", "core:mcp-client"]), d = /* @__PURE__ */ new Set(["core:tool-call", "core:react"]);
  let p = /* @__PURE__ */ W([]), O = /* @__PURE__ */ W([]), g = /* @__PURE__ */ W([]), m = null, v = { x: 0, y: 0 }, Q = /* @__PURE__ */ W(), k = /* @__PURE__ */ W({ x: 0, y: 0, w: 1e3, h: 600 }), R = !1, T = { mx: 0, my: 0, vbx: 0, vby: 0 }, M = /* @__PURE__ */ W(null), C = /* @__PURE__ */ W({ x: 0, y: 0 }), z = /* @__PURE__ */ W(null), D = /* @__PURE__ */ W({ x: 0, y: 0 }), N = /* @__PURE__ */ W(""), Y = /* @__PURE__ */ W(!1), y = /* @__PURE__ */ W(!1);
  function _(I) {
    Bn.set(I);
  }
  function P(I) {
    const L = t().nodes[I];
    return (L == null ? void 0 : L.position) ?? { x: 100, y: 100 };
  }
  function $(I, L) {
    const ne = u(Q).createSVGPoint();
    ne.x = I, ne.y = L;
    const le = ne.matrixTransform(u(Q).getScreenCTM().inverse());
    return { x: le.x, y: le.y };
  }
  function X(I, L) {
    return I.addEventListener("wheel", L, { passive: !1 }), {
      destroy() {
        I.removeEventListener("wheel", L);
      }
    };
  }
  function Z(I) {
    I.preventDefault();
    const L = I.deltaY > 0 ? 1.1 : 0.9, ne = u(Q).getBoundingClientRect(), le = (I.clientX - ne.left) / ne.width * u(k).w + u(k).x, _e = (I.clientY - ne.top) / ne.height * u(k).h + u(k).y;
    S(k, {
      x: le - (le - u(k).x) * L,
      y: _e - (_e - u(k).y) * L,
      w: u(k).w * L,
      h: u(k).h * L
    });
  }
  function H(I) {
    const L = I.target;
    L.closest("g") || L.tagName === "circle" || (R = !0, T = {
      mx: I.clientX,
      my: I.clientY,
      vbx: u(k).x,
      vby: u(k).y
    });
  }
  function J(I, L) {
    if (h()) return;
    const ne = $(I.clientX, I.clientY), le = L.position ?? { x: 100, y: 100 };
    m = L, v = { x: ne.x - le.x, y: ne.y - le.y };
  }
  function te(I, L) {
    if (h()) return;
    const ne = $(I.clientX, I.clientY);
    S(M, { fromNodeId: L, x: ne.x, y: ne.y }), S(C, ne);
  }
  function he(I) {
    if (u(M) && u(M).fromNodeId !== I) {
      const L = u(Q).getBoundingClientRect();
      S(D, {
        x: (u(C).x - u(k).x) / u(k).w * L.width,
        y: (u(C).y - u(k).y) / u(k).h * L.height
      }), S(z, { from: u(M).fromNodeId, to: I });
    }
    S(M, null);
  }
  function ue(I) {
    if (R) {
      const L = u(k).w / u(Q).clientWidth, ne = u(k).h / u(Q).clientHeight;
      S(k, {
        ...u(k),
        x: T.vbx - (I.clientX - T.mx) * L,
        y: T.vby - (I.clientY - T.my) * ne
      });
    }
    if (m) {
      const L = $(I.clientX, I.clientY), ne = m.id;
      lt.update((le) => ({
        ...le,
        nodes: {
          ...le.nodes,
          [ne]: {
            ...le.nodes[ne],
            position: { x: L.x - v.x, y: L.y - v.y }
          }
        }
      }));
    }
    u(M) && S(C, $(I.clientX, I.clientY));
  }
  function ie() {
    var I;
    if (m) {
      const L = (I = t().nodes[m.id]) == null ? void 0 : I.position;
      L && _0(m.id, L);
    }
    R = !1, m = null, S(M, null);
  }
  function ce(I) {
    I.preventDefault(), !h() && I.dataTransfer && (I.dataTransfer.dropEffect = "copy");
  }
  function ye(I) {
    var Qe;
    if (I.preventDefault(), h()) return;
    const L = (Qe = I.dataTransfer) == null ? void 0 : Qe.getData(c);
    if (!L) return;
    const { type: ne, name: le } = JSON.parse(L), _e = $(I.clientX, I.clientY), Ve = {
      x: _e.x - ur / 2,
      y: _e.y - dr / 2
    };
    Ip(ne, le, Ve);
  }
  function re() {
    const I = Object.values(t().nodes).map((Qe) => Qe.position).filter((Qe) => !!Qe);
    if (I.length === 0) return;
    const L = 60, ne = Math.min(...I.map((Qe) => Qe.x)) - L, le = Math.min(...I.map((Qe) => Qe.y)) - L, _e = Math.max(...I.map((Qe) => Qe.x + ur)) + L, Ve = Math.max(...I.map((Qe) => Qe.y + dr)) + L;
    S(k, {
      x: ne,
      y: le,
      w: Math.max(_e - ne, 200),
      h: Math.max(Ve - le, 150)
    });
  }
  function xe() {
    K1(), re();
  }
  function Pe(I, L) {
    if (h() || !u(z)) return;
    const ne = {
      id: `e-${Date.now()}`,
      from: u(z).from,
      to: u(z).to,
      type: I,
      ...L ? { condition: L } : {}
    };
    $0(ne), S(z, null), S(Y, !1), S(N, "");
  }
  qe(() => t(), () => {
    S(p, Object.values(t().nodes)), S(O, t().edges), S(g, t().toolEdges ?? []);
  }), qe(
    () => (Ce(h()), u(p), u(y)),
    () => {
      h() && u(p).length > 0 && !u(y) && (re(), S(y, !0));
    }
  ), qe(() => u(g), () => {
    S(l, u(g).reduce(
      (I, L) => (I[L.to] = (I[L.to] ?? 0) + 1, I),
      {}
    ));
  }), Ci(), Tt();
  var pe = dy(), Oe = x(pe);
  sy(Oe, {
    get readonly() {
      return h();
    },
    get canUndo() {
      return n();
    },
    get canUndoCaal() {
      return s();
    },
    $$events: {
      autoPlacement: xe,
      undo(...I) {
        Gl == null || Gl.apply(this, I);
      },
      undoCaal: () => fO()
    }
  });
  var de = w(Oe, 2), K = w(x(de));
  He(K, 1, () => u(O), et, (I, L) => {
    const ne = /* @__PURE__ */ _t(() => (u(L), b(() => P(u(L).from)))), le = /* @__PURE__ */ _t(() => (u(L), b(() => P(u(L).to))));
    var _e = ry();
    B(() => {
      nt(_e, "x1", (Ce(u(ne)), b(() => u(ne).x + 160))), nt(_e, "y1", (Ce(u(ne)), b(() => u(ne).y + 20))), nt(_e, "x2", (Ce(u(le)), b(() => u(le).x))), nt(_e, "y2", (Ce(u(le)), b(() => u(le).y + 20))), nt(_e, "stroke", (u(L), b(() => u(L).type === "fallback" ? "#94a3b8" : "#7c6af7"))), nt(_e, "stroke-dasharray", (u(L), b(() => u(L).type === "fallback" ? "4" : "0")));
    }), E(I, _e);
  });
  var oe = w(K);
  He(oe, 1, () => u(g), et, (I, L) => {
    var ne = Ii(), le = Ye(ne);
    {
      var _e = (Ve) => {
        const Qe = /* @__PURE__ */ _t(() => (u(L), b(() => P(u(L).from)))), U = /* @__PURE__ */ _t(() => (u(L), b(() => P(u(L).to))));
        var fe = oy();
        B(() => {
          nt(fe, "x1", (Ce(u(Qe)), b(() => u(Qe).x + 160))), nt(fe, "y1", (Ce(u(Qe)), b(() => u(Qe).y + 20))), nt(fe, "x2", (Ce(u(U)), b(() => u(U).x))), nt(fe, "y2", (Ce(u(U)), b(() => u(U).y + 20)));
        }), E(Ve, fe);
      };
      F(le, (Ve) => {
        t(), u(L), b(() => t().nodes[u(L).from]) && Ve(_e);
      });
    }
    E(I, ne);
  });
  var we = w(oe);
  He(we, 1, () => u(p), et, (I, L) => {
    const ne = /* @__PURE__ */ _t(() => (u(L), b(() => u(L).position ?? { x: 100, y: 100 }))), le = /* @__PURE__ */ _t(() => (u(L), b(() => f.has(u(L).type)))), _e = /* @__PURE__ */ _t(() => (u(L), b(() => d.has(u(L).type)))), Ve = /* @__PURE__ */ _t(() => (r(), u(L), b(() => {
      var gt;
      return ((gt = r()) == null ? void 0 : gt.id) === u(L).id;
    }))), Qe = /* @__PURE__ */ _t(() => (u(l), u(L), b(() => u(l)[u(L).id] ?? 0)));
    var U = ly(), fe = x(U), be = w(fe), Le = x(be), Te = w(be), Ze = x(Te), Fe = w(Te);
    {
      var ot = (gt) => {
        var Jn = ay(), ze = w(Ye(Jn)), ut = x(ze);
        B(() => V(ut, u(Qe))), E(gt, Jn);
      };
      F(Fe, (gt) => {
        u(_e) && u(Qe) > 0 && gt(ot);
      });
    }
    var at = w(Fe), Zr = w(at);
    B(() => {
      nt(U, "transform", `translate(${Ce(u(ne)), b(() => u(ne).x) ?? ""},${Ce(u(ne)), b(() => u(ne).y) ?? ""})`), nt(fe, "fill", u(Ve) ? u(le) ? "#2d1f00" : "#312e7a" : u(le) ? "#1e1600" : "#1e2035"), nt(fe, "stroke", u(Ve) ? u(le) ? "#f59e0b" : "#7c6af7" : u(le) ? "#b45309" : "#2d3148"), nt(fe, "stroke-width", u(le) ? "2" : "1.5"), V(Le, (u(L), b(() => u(L).type))), V(Ze, (u(L), b(() => u(L).label ?? u(L).id)));
    }), ee("mousedown", at, zl((gt) => te(gt, u(L).id))), ee("mouseup", Zr, zl(() => he(u(L).id))), ee("click", U, () => _(u(L))), ee("keydown", U, (gt) => gt.key === "Enter" && _(u(L))), ee("mousedown", U, zl((gt) => J(gt, u(L)))), E(I, U);
  });
  var Me = w(we);
  {
    var je = (I) => {
      var L = hy();
      B(() => {
        nt(L, "x1", (u(M), b(() => u(M).x))), nt(L, "y1", (u(M), b(() => u(M).y))), nt(L, "x2", (u(C), b(() => u(C).x))), nt(L, "y2", (u(C), b(() => u(C).y)));
      }), E(I, L);
    };
    F(Me, (I) => {
      u(M) && I(je);
    });
  }
  Vc(de, (I) => S(Q, I), () => u(Q)), O0(de, (I, L) => X == null ? void 0 : X(I, L), () => Z), hl(() => ee("mousedown", de, H));
  var Ge = w(de, 2);
  {
    var De = (I) => {
      var L = fy(), ne = x(L), le = w(ne, 2), _e = w(le, 2), Ve = w(_e, 2);
      {
        var Qe = (fe) => {
          var be = cy(), Le = Ye(be), Te = w(Le, 2);
          Nt(Le, () => u(N), (Ze) => S(N, Ze)), ee("click", Te, () => Pe("conditional", u(N))), E(fe, be);
        };
        F(Ve, (fe) => {
          u(Y) && fe(Qe);
        });
      }
      var U = w(Ve, 2);
      B(() => jp(L, `left:${u(D), b(() => u(D).x) ?? ""}px;top:${u(D), b(() => u(D).y) ?? ""}px`)), ee("click", ne, () => Pe("unconditional")), ee("click", le, () => Pe("fallback")), ee("click", _e, () => {
        S(Y, !u(Y));
      }), ee("click", U, () => {
        S(z, null), S(Y, !1);
      }), E(I, L);
    };
    F(Ge, (I) => {
      u(z) && I(De);
    });
  }
  var it = w(Ge, 2);
  {
    var Se = (I) => {
      var L = uy();
      E(I, L);
    };
    F(it, (I) => {
      u(p), b(() => u(p).length === 0) && I(Se);
    });
  }
  B(() => nt(de, "viewBox", `${u(k), b(() => u(k).x) ?? ""} ${u(k), b(() => u(k).y) ?? ""} ${u(k), b(() => u(k).w) ?? ""} ${u(k), b(() => u(k).h) ?? ""}`)), ee("mousemove", pe, ue), ee("mouseup", pe, ie), ee("mouseleave", pe, ie), ee("dragover", pe, ce), ee("drop", pe, ye), E(i, pe), St(), a();
}
const eo = $n([]), Jc = $n([]);
let Ul = !1;
async function uO() {
  if (!Ul) {
    Ul = !0;
    try {
      const i = await fetch("/api/integrations/connections");
      if (!i.ok) throw new Error(String(i.status));
      Jc.set(await i.json());
    } catch {
      Ul = !1;
    }
  }
}
var Oy = /* @__PURE__ */ j('<span class="not-connected-badge svelte-142uvrg">not connected</span>'), gy = /* @__PURE__ */ j('<button><span class="node-name svelte-142uvrg"> <!></span> <span class="node-type svelte-142uvrg"> </span></button>'), my = /* @__PURE__ */ j('<a class="marketplace-link svelte-142uvrg">Browse Marketplace →</a>'), vy = /* @__PURE__ */ j('<div class="category-header svelte-142uvrg"> </div> <!> <!>', 1), by = /* @__PURE__ */ j('<div class="palette svelte-142uvrg"><div class="palette-header svelte-142uvrg">Nodes</div> <!></div>');
function yy(i, e) {
  xt(e, !1);
  const t = () => ft(eo, "$nodeTypes", s), n = () => ft(Jc, "$connections", s), [s, r] = _n(), o = /* @__PURE__ */ W(), a = /* @__PURE__ */ W();
  let l = Xe(e, "readonly", 8, !1);
  const h = "application/x-magicaal-node-type", c = 3e4;
  let f = null, d = "", p = /* @__PURE__ */ W(!1);
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
  function g(C) {
    const z = /* @__PURE__ */ new Map();
    for (const D of C) {
      const N = D.meta.category ?? "other";
      z.has(N) || z.set(N, []), z.get(N).push(D);
    }
    return Array.from(z.entries()).map(([D, N]) => ({
      category: D,
      label: O[D] ?? D,
      items: N
    }));
  }
  async function m() {
    try {
      const C = await fetch("/api/nodes");
      if (!C.ok) return;
      const z = await C.json(), D = z.map((N) => N.type).sort().join(",");
      D !== d && (d = D, eo.set(z));
    } catch {
      t().length === 0 && eo.set([
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
  function v(C) {
    var D, N;
    const z = (N = (D = C.schema) == null ? void 0 : D.config) == null ? void 0 : N.properties;
    if (z) {
      for (const Y of Object.values(z))
        if (Y.format === "connection") return Y.service;
    }
  }
  function Q(C, z) {
    const D = v(C);
    return D ? !z.has(D) : !1;
  }
  Pn(async () => {
    await m(), uO(), f = setInterval(m, c);
    try {
      const C = await fetch("/api/system/config");
      if (C.ok) {
        const z = await C.json();
        S(p, z.marketplaceEnabled === !0);
      }
    } catch {
    }
  }), Yc(() => {
    f && clearInterval(f);
  });
  function k(C, z) {
    l() || Ip(C, z, { x: 200, y: 200 });
  }
  function R(C, z, D) {
    var N;
    if (l()) {
      C.preventDefault();
      return;
    }
    (N = C.dataTransfer) == null || N.setData(h, JSON.stringify({ type: z, name: D })), C.dataTransfer && (C.dataTransfer.effectAllowed = "copy");
  }
  qe(() => t(), () => {
    S(o, g(t()));
  }), qe(() => n(), () => {
    S(a, new Set(n().map((C) => C.service)));
  }), Ci(), Tt();
  var T = by(), M = w(x(T), 2);
  He(M, 1, () => u(o), et, (C, z) => {
    var D = vy(), N = Ye(D), Y = x(N), y = w(N, 2);
    He(y, 1, () => (u(z), b(() => u(z).items)), et, ($, X) => {
      var Z = gy();
      let H;
      var J = x(Z), te = x(J), he = w(te);
      {
        var ue = (re) => {
          var xe = Oy();
          B((Pe) => nt(xe, "title", `No ${Pe ?? ""} connection configured`), [
            () => (u(X), b(() => v(u(X))))
          ]), E(re, xe);
        }, ie = /* @__PURE__ */ ks(() => (u(X), u(a), b(() => Q(u(X), u(a)))));
        F(he, (re) => {
          u(ie) && re(ue);
        });
      }
      var ce = w(J, 2), ye = x(ce);
      B(() => {
        H = Jt(Z, 1, "palette-item svelte-142uvrg", null, H, { readonly: l() }), Z.disabled = l(), nt(Z, "draggable", !l()), V(te, `${u(X), b(() => u(X).meta.name) ?? ""} `), V(ye, (u(X), b(() => u(X).type)));
      }), ee("dragstart", Z, (re) => R(re, u(X).type, u(X).meta.name)), ee("click", Z, () => k(u(X).type, u(X).meta.name)), E($, Z);
    });
    var _ = w(y, 2);
    {
      var P = ($) => {
        var X = my();
        B(() => nt(X, "href", `/admin/marketplace?category=${u(z), b(() => u(z).category) ?? ""}`)), E($, X);
      };
      F(_, ($) => {
        u(p) && $(P);
      });
    }
    B(() => V(Y, (u(z), b(() => u(z).label)))), E(C, D);
  }), E(i, T), St(), r();
}
let Nh = [], dO = [];
(() => {
  let i = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((e) => e ? parseInt(e, 36) : 1);
  for (let e = 0, t = 0; e < i.length; e++)
    (e % 2 ? dO : Nh).push(t = t + i[e]);
})();
function wy(i) {
  if (i < 768) return !1;
  for (let e = 0, t = Nh.length; ; ) {
    let n = e + t >> 1;
    if (i < Nh[n]) t = n;
    else if (i >= dO[n]) e = n + 1;
    else return !0;
    if (e == t) return !1;
  }
}
function du(i) {
  return i >= 127462 && i <= 127487;
}
const pu = 8205;
function xy(i, e, t = !0, n = !0) {
  return (t ? pO : Sy)(i, e, n);
}
function pO(i, e, t) {
  if (e == i.length) return e;
  e && OO(i.charCodeAt(e)) && gO(i.charCodeAt(e - 1)) && e--;
  let n = Fl(i, e);
  for (e += Ou(n); e < i.length; ) {
    let s = Fl(i, e);
    if (n == pu || s == pu || t && wy(s))
      e += Ou(s), n = s;
    else if (du(s)) {
      let r = 0, o = e - 2;
      for (; o >= 0 && du(Fl(i, o)); )
        r++, o -= 2;
      if (r % 2 == 0) break;
      e += 2;
    } else
      break;
  }
  return e;
}
function Sy(i, e, t) {
  for (; e > 1; ) {
    let n = pO(i, e - 2, t);
    if (n < e) return n;
    e--;
  }
  return 0;
}
function Fl(i, e) {
  let t = i.charCodeAt(e);
  if (!gO(t) || e + 1 == i.length) return t;
  let n = i.charCodeAt(e + 1);
  return OO(n) ? (t - 55296 << 10) + (n - 56320) + 65536 : t;
}
function OO(i) {
  return i >= 56320 && i < 57344;
}
function gO(i) {
  return i >= 55296 && i < 56320;
}
function Ou(i) {
  return i < 65536 ? 1 : 2;
}
let Ne = class mO {
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
    [e, t] = Or(this, e, t);
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
    ), Ji.from(s, this.length - (t - e) + n.length);
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
    [e, t] = Or(this, e, t);
    let n = [];
    return this.decompose(e, t, n, 0), Ji.from(n, t - e);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(e) {
    if (e == this)
      return !0;
    if (e.length != this.length || e.lines != this.lines)
      return !1;
    let t = this.scanIdentical(e, 1), n = this.length - this.scanIdentical(e, -1), s = new to(this), r = new to(e);
    for (let o = t, a = t; ; ) {
      if (s.next(o), r.next(o), o = 0, s.lineBreak != r.lineBreak || s.done != r.done || s.value != r.value)
        return !1;
      if (a += s.value.length, s.done || a >= n)
        return !0;
    }
  }
  /**
  Iterate over the text. When `dir` is `-1`, iteration happens
  from end to start. This will return lines and the breaks between
  them as separate strings.
  */
  iter(e = 1) {
    return new to(this, e);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(e, t = this.length) {
    return new vO(this, e, t);
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
    return new bO(n);
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
    return e.length == 1 && !e[0] ? mO.empty : e.length <= 32 ? new vt(e) : Ji.from(vt.split(e, []));
  }
};
class vt extends Ne {
  constructor(e, t = ky(e)) {
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
      let o = this.text[r], a = s + o.length;
      if ((t ? n : a) >= e)
        return new Qy(s, a, n, o);
      s = a + 1, n++;
    }
  }
  decompose(e, t, n, s) {
    let r = e <= 0 && t >= this.length ? this : new vt(gu(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
    if (s & 1) {
      let o = n.pop(), a = va(r.text, o.text.slice(), 0, r.length);
      if (a.length <= 32)
        n.push(new vt(a, o.length + r.length));
      else {
        let l = a.length >> 1;
        n.push(new vt(a.slice(0, l)), new vt(a.slice(l)));
      }
    } else
      n.push(r);
  }
  replace(e, t, n) {
    if (!(n instanceof vt))
      return super.replace(e, t, n);
    [e, t] = Or(this, e, t);
    let s = va(this.text, va(n.text, gu(this.text, 0, e)), t), r = this.length + n.length - (t - e);
    return s.length <= 32 ? new vt(s, r) : Ji.from(vt.split(s, []), r);
  }
  sliceString(e, t = this.length, n = `
`) {
    [e, t] = Or(this, e, t);
    let s = "";
    for (let r = 0, o = 0; r <= t && o < this.text.length; o++) {
      let a = this.text[o], l = r + a.length;
      r > e && o && (s += n), e < l && t > r && (s += a.slice(Math.max(0, e - r), t - r)), r = l + 1;
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
      n.push(r), s += r.length + 1, n.length == 32 && (t.push(new vt(n, s)), n = [], s = -1);
    return s > -1 && t.push(new vt(n, s)), t;
  }
}
class Ji extends Ne {
  constructor(e, t) {
    super(), this.children = e, this.length = t, this.lines = 0;
    for (let n of e)
      this.lines += n.lines;
  }
  lineInner(e, t, n, s) {
    for (let r = 0; ; r++) {
      let o = this.children[r], a = s + o.length, l = n + o.lines - 1;
      if ((t ? l : a) >= e)
        return o.lineInner(e, t, n, s);
      s = a + 1, n = l + 1;
    }
  }
  decompose(e, t, n, s) {
    for (let r = 0, o = 0; o <= t && r < this.children.length; r++) {
      let a = this.children[r], l = o + a.length;
      if (e <= l && t >= o) {
        let h = s & ((o <= e ? 1 : 0) | (l >= t ? 2 : 0));
        o >= e && l <= t && !h ? n.push(a) : a.decompose(e - o, t - o, n, h);
      }
      o = l + 1;
    }
  }
  replace(e, t, n) {
    if ([e, t] = Or(this, e, t), n.lines < this.lines)
      for (let s = 0, r = 0; s < this.children.length; s++) {
        let o = this.children[s], a = r + o.length;
        if (e >= r && t <= a) {
          let l = o.replace(e - r, t - r, n), h = this.lines - o.lines + l.lines;
          if (l.lines < h >> 4 && l.lines > h >> 6) {
            let c = this.children.slice();
            return c[s] = l, new Ji(c, this.length - (t - e) + n.length);
          }
          return super.replace(r, a, l);
        }
        r = a + 1;
      }
    return super.replace(e, t, n);
  }
  sliceString(e, t = this.length, n = `
`) {
    [e, t] = Or(this, e, t);
    let s = "";
    for (let r = 0, o = 0; r < this.children.length && o <= t; r++) {
      let a = this.children[r], l = o + a.length;
      o > e && r && (s += n), e < l && t > o && (s += a.sliceString(e - o, t - o, n)), o = l + 1;
    }
    return s;
  }
  flatten(e) {
    for (let t of this.children)
      t.flatten(e);
  }
  scanIdentical(e, t) {
    if (!(e instanceof Ji))
      return 0;
    let n = 0, [s, r, o, a] = t > 0 ? [0, 0, this.children.length, e.children.length] : [this.children.length - 1, e.children.length - 1, -1, -1];
    for (; ; s += t, r += t) {
      if (s == o || r == a)
        return n;
      let l = this.children[s], h = e.children[r];
      if (l != h)
        return n + l.scanIdentical(h, t);
      n += l.length + 1;
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
      return new vt(p, t);
    }
    let s = Math.max(
      32,
      n >> 5
      /* Tree.BranchShift */
    ), r = s << 1, o = s >> 1, a = [], l = 0, h = -1, c = [];
    function f(p) {
      let O;
      if (p.lines > r && p instanceof Ji)
        for (let g of p.children)
          f(g);
      else p.lines > o && (l > o || !l) ? (d(), a.push(p)) : p instanceof vt && l && (O = c[c.length - 1]) instanceof vt && p.lines + O.lines <= 32 ? (l += p.lines, h += p.length + 1, c[c.length - 1] = new vt(O.text.concat(p.text), O.length + 1 + p.length)) : (l + p.lines > s && d(), l += p.lines, h += p.length + 1, c.push(p));
    }
    function d() {
      l != 0 && (a.push(c.length == 1 ? c[0] : Ji.from(c, h)), h = -1, l = c.length = 0);
    }
    for (let p of e)
      f(p);
    return d(), a.length == 1 ? a[0] : new Ji(a, t);
  }
}
Ne.empty = /* @__PURE__ */ new vt([""], 0);
function ky(i) {
  let e = -1;
  for (let t of i)
    e += t.length + 1;
  return e;
}
function va(i, e, t = 0, n = 1e9) {
  for (let s = 0, r = 0, o = !0; r < i.length && s <= n; r++) {
    let a = i[r], l = s + a.length;
    l >= t && (l > n && (a = a.slice(0, n - s)), s < t && (a = a.slice(t - s)), o ? (e[e.length - 1] += a, o = !1) : e.push(a)), s = l + 1;
  }
  return e;
}
function gu(i, e, t) {
  return va(i, [""], e, t);
}
class to {
  constructor(e, t = 1) {
    this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof vt ? e.text.length : e.children.length) << 1];
  }
  nextInner(e, t) {
    for (this.done = this.lineBreak = !1; ; ) {
      let n = this.nodes.length - 1, s = this.nodes[n], r = this.offsets[n], o = r >> 1, a = s instanceof vt ? s.text.length : s.children.length;
      if (o == (t > 0 ? a : 0)) {
        if (n == 0)
          return this.done = !0, this.value = "", this;
        t > 0 && this.offsets[n - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((r & 1) == (t > 0 ? 0 : 1)) {
        if (this.offsets[n] += t, e == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        e--;
      } else if (s instanceof vt) {
        let l = s.text[o + (t < 0 ? -1 : 0)];
        if (this.offsets[n] += t, l.length > Math.max(0, e))
          return this.value = e == 0 ? l : t > 0 ? l.slice(e) : l.slice(0, l.length - e), this;
        e -= l.length;
      } else {
        let l = s.children[o + (t < 0 ? -1 : 0)];
        e > l.length ? (e -= l.length, this.offsets[n] += t) : (t < 0 && this.offsets[n]--, this.nodes.push(l), this.offsets.push(t > 0 ? 1 : (l instanceof vt ? l.text.length : l.children.length) << 1));
      }
    }
  }
  next(e = 0) {
    return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
  }
}
class vO {
  constructor(e, t, n) {
    this.value = "", this.done = !1, this.cursor = new to(e, t > n ? -1 : 1), this.pos = t > n ? e.length : 0, this.from = Math.min(t, n), this.to = Math.max(t, n);
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
class bO {
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
typeof Symbol < "u" && (Ne.prototype[Symbol.iterator] = function() {
  return this.iter();
}, to.prototype[Symbol.iterator] = vO.prototype[Symbol.iterator] = bO.prototype[Symbol.iterator] = function() {
  return this;
});
class Qy {
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
function Or(i, e, t) {
  return e = Math.max(0, Math.min(i.length, e)), [e, Math.max(e, Math.min(i.length, t))];
}
function Lt(i, e, t = !0, n = !0) {
  return xy(i, e, t, n);
}
function $y(i) {
  return i >= 56320 && i < 57344;
}
function _y(i) {
  return i >= 55296 && i < 56320;
}
function is(i, e) {
  let t = i.charCodeAt(e);
  if (!_y(t) || e + 1 == i.length)
    return t;
  let n = i.charCodeAt(e + 1);
  return $y(n) ? (t - 55296 << 10) + (n - 56320) + 65536 : t;
}
function Py(i) {
  return i <= 65535 ? String.fromCharCode(i) : (i -= 65536, String.fromCharCode((i >> 10) + 55296, (i & 1023) + 56320));
}
function js(i) {
  return i < 65536 ? 1 : 2;
}
const Yh = /\r\n?|\n/;
var Yt = /* @__PURE__ */ (function(i) {
  return i[i.Simple = 0] = "Simple", i[i.TrackDel = 1] = "TrackDel", i[i.TrackBefore = 2] = "TrackBefore", i[i.TrackAfter = 3] = "TrackAfter", i;
})(Yt || (Yt = {}));
class hn {
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
    qh(this, e, t);
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
    return new hn(e);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(e) {
    return this.empty ? e : e.empty ? this : yO(this, e);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `this` happened before the ones in `other`.
  */
  mapDesc(e, t = !1) {
    return e.empty ? this : Wh(this, e, t);
  }
  mapPos(e, t = -1, n = Yt.Simple) {
    let s = 0, r = 0;
    for (let o = 0; o < this.sections.length; ) {
      let a = this.sections[o++], l = this.sections[o++], h = s + a;
      if (l < 0) {
        if (h > e)
          return r + (e - s);
        r += a;
      } else {
        if (n != Yt.Simple && h >= e && (n == Yt.TrackDel && s < e && h > e || n == Yt.TrackBefore && s < e || n == Yt.TrackAfter && h > e))
          return null;
        if (h > e || h == e && t < 0 && !a)
          return e == s || t < 0 ? r : r + l;
        r += l;
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
      let r = this.sections[n++], o = this.sections[n++], a = s + r;
      if (o >= 0 && s <= t && a >= e)
        return s < e && a > t ? "cover" : !0;
      s = a;
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
    return new hn(e);
  }
  /**
  @internal
  */
  static create(e) {
    return new hn(e);
  }
}
class Pt extends hn {
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
    return qh(this, (t, n, s, r, o) => e = e.replace(s, s + (n - t), o), !1), e;
  }
  mapDesc(e, t = !1) {
    return Wh(this, e, t, !0);
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
      let o = t[s], a = t[s + 1];
      if (a >= 0) {
        t[s] = a, t[s + 1] = o;
        let l = s >> 1;
        for (; n.length < l; )
          n.push(Ne.empty);
        n.push(o ? e.slice(r, r + o) : Ne.empty);
      }
      r += o;
    }
    return new Pt(t, n);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(e) {
    return this.empty ? e : e.empty ? this : yO(this, e, !0);
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
    return e.empty ? this : Wh(this, e, t, !0);
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
    qh(this, e, t);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return hn.create(this.sections);
  }
  /**
  @internal
  */
  filter(e) {
    let t = [], n = [], s = [], r = new uo(this);
    e: for (let o = 0, a = 0; ; ) {
      let l = o == e.length ? 1e9 : e[o++];
      for (; a < l || a == l && r.len == 0; ) {
        if (r.done)
          break e;
        let c = Math.min(r.len, l - a);
        jt(s, c, -1);
        let f = r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0;
        jt(t, c, f), f > 0 && Yn(n, t, r.text), r.forward(c), a += c;
      }
      let h = e[o++];
      for (; a < h; ) {
        if (r.done)
          break e;
        let c = Math.min(r.len, h - a);
        jt(t, c, -1), jt(s, c, r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0), r.forward(c), a += c;
      }
    }
    return {
      changes: new Pt(t, n),
      filtered: hn.create(s)
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
    let s = [], r = [], o = 0, a = null;
    function l(c = !1) {
      if (!c && !s.length)
        return;
      o < t && jt(s, t - o, -1);
      let f = new Pt(s, r);
      a = a ? a.compose(f.map(a)) : f, s = [], r = [], o = 0;
    }
    function h(c) {
      if (Array.isArray(c))
        for (let f of c)
          h(f);
      else if (c instanceof Pt) {
        if (c.length != t)
          throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);
        l(), a = a ? a.compose(c.map(a)) : c;
      } else {
        let { from: f, to: d = f, insert: p } = c;
        if (f > d || f < 0 || d > t)
          throw new RangeError(`Invalid change range ${f} to ${d} (in doc of length ${t})`);
        let O = p ? typeof p == "string" ? Ne.of(p.split(n || Yh)) : p : Ne.empty, g = O.length;
        if (f == d && g == 0)
          return;
        f < o && l(), f > o && jt(s, f - o, -1), jt(s, d - f, g), Yn(r, s, O), o = d;
      }
    }
    return h(e), l(!a), a;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(e) {
    return new Pt(e ? [e, -1] : [], []);
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
        if (!Array.isArray(r) || typeof r[0] != "number" || r.some((o, a) => a && typeof o != "string"))
          throw new RangeError("Invalid JSON representation of ChangeSet");
        if (r.length == 1)
          t.push(r[0], 0);
        else {
          for (; n.length < s; )
            n.push(Ne.empty);
          n[s] = Ne.of(r.slice(1)), t.push(r[0], n[s].length);
        }
      }
    }
    return new Pt(t, n);
  }
  /**
  @internal
  */
  static createSet(e, t) {
    return new Pt(e, t);
  }
}
function jt(i, e, t, n = !1) {
  if (e == 0 && t <= 0)
    return;
  let s = i.length - 2;
  s >= 0 && t <= 0 && t == i[s + 1] ? i[s] += e : s >= 0 && e == 0 && i[s] == 0 ? i[s + 1] += t : n ? (i[s] += e, i[s + 1] += t) : i.push(e, t);
}
function Yn(i, e, t) {
  if (t.length == 0)
    return;
  let n = e.length - 2 >> 1;
  if (n < i.length)
    i[i.length - 1] = i[i.length - 1].append(t);
  else {
    for (; i.length < n; )
      i.push(Ne.empty);
    i.push(t);
  }
}
function qh(i, e, t) {
  let n = i.inserted;
  for (let s = 0, r = 0, o = 0; o < i.sections.length; ) {
    let a = i.sections[o++], l = i.sections[o++];
    if (l < 0)
      s += a, r += a;
    else {
      let h = s, c = r, f = Ne.empty;
      for (; h += a, c += l, l && n && (f = f.append(n[o - 2 >> 1])), !(t || o == i.sections.length || i.sections[o + 1] < 0); )
        a = i.sections[o++], l = i.sections[o++];
      e(s, h, r, c, f), s = h, r = c;
    }
  }
}
function Wh(i, e, t, n = !1) {
  let s = [], r = n ? [] : null, o = new uo(i), a = new uo(e);
  for (let l = -1; ; ) {
    if (o.done && a.len || a.done && o.len)
      throw new Error("Mismatched change set lengths");
    if (o.ins == -1 && a.ins == -1) {
      let h = Math.min(o.len, a.len);
      jt(s, h, -1), o.forward(h), a.forward(h);
    } else if (a.ins >= 0 && (o.ins < 0 || l == o.i || o.off == 0 && (a.len < o.len || a.len == o.len && !t))) {
      let h = a.len;
      for (jt(s, a.ins, -1); h; ) {
        let c = Math.min(o.len, h);
        o.ins >= 0 && l < o.i && o.len <= c && (jt(s, 0, o.ins), r && Yn(r, s, o.text), l = o.i), o.forward(c), h -= c;
      }
      a.next();
    } else if (o.ins >= 0) {
      let h = 0, c = o.len;
      for (; c; )
        if (a.ins == -1) {
          let f = Math.min(c, a.len);
          h += f, c -= f, a.forward(f);
        } else if (a.ins == 0 && a.len < c)
          c -= a.len, a.next();
        else
          break;
      jt(s, h, l < o.i ? o.ins : 0), r && l < o.i && Yn(r, s, o.text), l = o.i, o.forward(o.len - c);
    } else {
      if (o.done && a.done)
        return r ? Pt.createSet(s, r) : hn.create(s);
      throw new Error("Mismatched change set lengths");
    }
  }
}
function yO(i, e, t = !1) {
  let n = [], s = t ? [] : null, r = new uo(i), o = new uo(e);
  for (let a = !1; ; ) {
    if (r.done && o.done)
      return s ? Pt.createSet(n, s) : hn.create(n);
    if (r.ins == 0)
      jt(n, r.len, 0, a), r.next();
    else if (o.len == 0 && !o.done)
      jt(n, 0, o.ins, a), s && Yn(s, n, o.text), o.next();
    else {
      if (r.done || o.done)
        throw new Error("Mismatched change set lengths");
      {
        let l = Math.min(r.len2, o.len), h = n.length;
        if (r.ins == -1) {
          let c = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
          jt(n, l, c, a), s && c && Yn(s, n, o.text);
        } else o.ins == -1 ? (jt(n, r.off ? 0 : r.len, l, a), s && Yn(s, n, r.textBit(l))) : (jt(n, r.off ? 0 : r.len, o.off ? 0 : o.ins, a), s && !o.off && Yn(s, n, o.text));
        a = (r.ins > l || o.ins >= 0 && o.len > l) && (a || n.length > h), r.forward2(l), o.forward(l);
      }
    }
  }
}
class uo {
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
    return t >= e.length ? Ne.empty : e[t];
  }
  textBit(e) {
    let { inserted: t } = this.set, n = this.i - 2 >> 1;
    return n >= t.length && !e ? Ne.empty : t[n].slice(this.off, e == null ? void 0 : this.off + e);
  }
  forward(e) {
    e == this.len ? this.next() : (this.len -= e, this.off += e);
  }
  forward2(e) {
    this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
  }
}
class jn {
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
    return this.empty ? n = s = e.mapPos(this.from, t) : (n = e.mapPos(this.from, 1), s = e.mapPos(this.to, -1)), n == this.from && s == this.to ? this : new jn(n, s, this.flags, this.goalColumn);
  }
  /**
  Extend this range to cover at least `from` to `to`.
  */
  extend(e, t = e, n = 0) {
    if (e <= this.anchor && t >= this.anchor)
      return G.range(e, t, void 0, void 0, n);
    let s = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
    return G.range(this.anchor, s, void 0, void 0, n);
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
    return G.range(e.anchor, e.head);
  }
  /**
  @internal
  */
  static create(e, t, n, s) {
    return new jn(e, t, n, s);
  }
}
class G {
  constructor(e, t) {
    this.ranges = e, this.mainIndex = t;
  }
  /**
  Map a selection through a change. Used to adjust the selection
  position for changes.
  */
  map(e, t = -1) {
    return e.empty ? this : G.create(this.ranges.map((n) => n.map(e, t)), this.mainIndex);
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
    return this.ranges.length == 1 ? this : new G([this.main], 0);
  }
  /**
  Extend this selection with an extra range.
  */
  addRange(e, t = !0) {
    return G.create([e].concat(this.ranges), t ? 0 : this.mainIndex + 1);
  }
  /**
  Replace a given range with another range, and then normalize the
  selection to merge and sort ranges if necessary.
  */
  replaceRange(e, t = this.mainIndex) {
    let n = this.ranges.slice();
    return n[t] = e, G.create(n, this.mainIndex);
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
    return new G(e.ranges.map((t) => jn.fromJSON(t)), e.main);
  }
  /**
  Create a selection holding a single range.
  */
  static single(e, t = e) {
    return new G([G.range(e, t)], 0);
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
        return G.normalized(e.slice(), t);
      n = r.to;
    }
    return new G(e, t);
  }
  /**
  Create a cursor selection range at the given position. You can
  safely ignore the optional arguments in most situations.
  */
  static cursor(e, t = 0, n, s) {
    return jn.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (n == null ? 7 : Math.min(6, n)), s);
  }
  /**
  Create a selection range.
  */
  static range(e, t, n, s, r) {
    let o = s == null ? 7 : Math.min(6, s);
    return !r && e != t && (r = t < e ? 1 : -1), r && (o |= r < 0 ? 8 : 16), t < e ? jn.create(t, e, o | 32, n) : jn.create(e, t, o, n);
  }
  /**
  Create an [undirectional](https://codemirror.net/6/docs/ref/#state.SelectionRange.undirectional)
  selection range.
  */
  static undirectionalRange(e, t) {
    return jn.create(e, t, 64, void 0);
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
        let a = o.from, l = Math.max(r.to, o.to);
        s <= t && t--, e.splice(--s, 2, r.anchor > r.head ? G.range(l, a) : G.range(a, l));
      }
    }
    return new G(e, t);
  }
}
function wO(i, e) {
  for (let t of i.ranges)
    if (t.to > e)
      throw new RangeError("Selection points outside of document");
}
let ef = 0;
class ve {
  constructor(e, t, n, s, r) {
    this.combine = e, this.compareInput = t, this.compare = n, this.isStatic = s, this.id = ef++, this.default = e([]), this.extensions = typeof r == "function" ? r(this) : r;
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
    return new ve(e.combine || ((t) => t), e.compareInput || ((t, n) => t === n), e.compare || (e.combine ? (t, n) => t === n : tf), !!e.static, e.enables);
  }
  /**
  Returns an extension that adds the given value to this facet.
  */
  of(e) {
    return new ba([], this, 0, e);
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
    return new ba(e, this, 1, t);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new ba(e, this, 2, t);
  }
  from(e, t) {
    return t || (t = (n) => n), this.compute([e], (n) => t(n.field(e)));
  }
}
function tf(i, e) {
  return i == e || i.length == e.length && i.every((t, n) => t === e[n]);
}
class ba {
  constructor(e, t, n, s) {
    this.dependencies = e, this.facet = t, this.type = n, this.value = s, this.id = ef++;
  }
  dynamicSlot(e) {
    var t;
    let n = this.value, s = this.facet.compareInput, r = this.id, o = e[r] >> 1, a = this.type == 2, l = !1, h = !1, c = [];
    for (let f of this.dependencies)
      f == "doc" ? l = !0 : f == "selection" ? h = !0 : (((t = e[f.id]) !== null && t !== void 0 ? t : 1) & 1) == 0 && c.push(e[f.id]);
    return {
      create(f) {
        return f.values[o] = n(f), 1;
      },
      update(f, d) {
        if (l && d.docChanged || h && (d.docChanged || d.selection) || Vh(f, c)) {
          let p = n(f);
          if (a ? !mu(p, f.values[o], s) : !s(p, f.values[o]))
            return f.values[o] = p, 1;
        }
        return 0;
      },
      reconfigure: (f, d) => {
        let p, O = d.config.address[r];
        if (O != null) {
          let g = Aa(d, O);
          if (this.dependencies.every((m) => m instanceof ve ? d.facet(m) === f.facet(m) : m instanceof un ? d.field(m, !1) == f.field(m, !1) : !0) || (a ? mu(p = n(f), g, s) : s(p = n(f), g)))
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
function mu(i, e, t) {
  if (i.length != e.length)
    return !1;
  for (let n = 0; n < i.length; n++)
    if (!t(i[n], e[n]))
      return !1;
  return !0;
}
function Vh(i, e) {
  let t = !1;
  for (let n of e)
    io(i, n) & 1 && (t = !0);
  return t;
}
function Ty(i, e, t) {
  let n = t.map((l) => i[l.id]), s = t.map((l) => l.type), r = n.filter((l) => !(l & 1)), o = i[e.id] >> 1;
  function a(l) {
    let h = [];
    for (let c = 0; c < n.length; c++) {
      let f = Aa(l, n[c]);
      if (s[c] == 2)
        for (let d of f)
          h.push(d);
      else
        h.push(f);
    }
    return e.combine(h);
  }
  return {
    create(l) {
      for (let h of n)
        io(l, h);
      return l.values[o] = a(l), 1;
    },
    update(l, h) {
      if (!Vh(l, r))
        return 0;
      let c = a(l);
      return e.compare(c, l.values[o]) ? 0 : (l.values[o] = c, 1);
    },
    reconfigure(l, h) {
      let c = Vh(l, n), f = h.config.facets[e.id], d = h.facet(e);
      if (f && !c && tf(t, f))
        return l.values[o] = d, 0;
      let p = a(l);
      return e.compare(p, d) ? (l.values[o] = d, 0) : (l.values[o] = p, 1);
    }
  };
}
const Vo = /* @__PURE__ */ ve.define({ static: !0 });
class un {
  constructor(e, t, n, s, r) {
    this.id = e, this.createF = t, this.updateF = n, this.compareF = s, this.spec = r, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(e) {
    let t = new un(ef++, e.create, e.update, e.compare || ((n, s) => n === s), e);
    return e.provide && (t.provides = e.provide(t)), t;
  }
  create(e) {
    let t = e.facet(Vo).find((n) => n.field == this);
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
        let r = n.facet(Vo), o = s.facet(Vo), a;
        return (a = r.find((l) => l.field == this)) && a != o.find((l) => l.field == this) ? (n.values[t] = a.create(n), 1) : s.config.address[this.id] != null ? (n.values[t] = s.field(this), 0) : (n.values[t] = this.create(n), 1);
      }
    };
  }
  /**
  Returns an extension that enables this field and overrides the
  way it is initialized. Can be useful when you need to provide a
  non-default starting value for the field.
  */
  init(e) {
    return [this, Vo.of({ field: this, create: e })];
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
const ss = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function Mr(i) {
  return (e) => new xO(e, i);
}
const Ao = {
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ Mr(ss.highest),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ Mr(ss.high),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ Mr(ss.default),
  /**
  A lower-than-default precedence.
  */
  low: /* @__PURE__ */ Mr(ss.low),
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ Mr(ss.lowest)
};
class xO {
  constructor(e, t) {
    this.inner = e, this.prec = t;
  }
  get extension() {
    return this;
  }
}
class ml {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(e) {
    return new Bh(this, e);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(e) {
    return ml.reconfigure.of({ compartment: this, extension: e });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(e) {
    return e.config.compartments.get(this);
  }
}
class Bh {
  constructor(e, t) {
    this.compartment = e, this.inner = t;
  }
  get extension() {
    return this;
  }
}
class Ea {
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
    for (let d of Cy(e, t, o))
      d instanceof un ? s.push(d) : (r[d.facet.id] || (r[d.facet.id] = [])).push(d);
    let a = /* @__PURE__ */ Object.create(null), l = [], h = [];
    for (let d of s)
      a[d.id] = h.length << 1, h.push((p) => d.slot(p));
    let c = n == null ? void 0 : n.config.facets;
    for (let d in r) {
      let p = r[d], O = p[0].facet, g = c && c[d] || [];
      if (p.every(
        (m) => m.type == 0
        /* Provider.Static */
      ))
        if (a[O.id] = l.length << 1 | 1, tf(g, p))
          l.push(n.facet(O));
        else {
          let m = O.combine(p.map((v) => v.value));
          l.push(n && O.compare(m, n.facet(O)) ? n.facet(O) : m);
        }
      else {
        for (let m of p)
          m.type == 0 ? (a[m.id] = l.length << 1 | 1, l.push(m.value)) : (a[m.id] = h.length << 1, h.push((v) => m.dynamicSlot(v)));
        a[O.id] = h.length << 1, h.push((m) => Ty(m, O, p));
      }
    }
    let f = h.map((d) => d(a));
    return new Ea(e, o, f, a, l, r);
  }
}
function Cy(i, e, t) {
  let n = [[], [], [], [], []], s = /* @__PURE__ */ new Map();
  function r(o, a) {
    let l = s.get(o);
    if (l != null) {
      if (l <= a)
        return;
      let h = n[l].indexOf(o);
      h > -1 && n[l].splice(h, 1), o instanceof Bh && t.delete(o.compartment);
    }
    if (s.set(o, a), Array.isArray(o))
      for (let h of o)
        r(h, a);
    else if (o instanceof Bh) {
      if (t.has(o.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let h = e.get(o.compartment) || o.inner;
      t.set(o.compartment, h), r(h, a);
    } else if (o instanceof xO)
      r(o.inner, o.prec);
    else if (o instanceof un)
      n[a].push(o), o.provides && r(o.provides, a);
    else if (o instanceof ba)
      n[a].push(o), o.facet.extensions && r(o.facet.extensions, ss.default);
    else {
      let h = o.extension;
      if (!h)
        throw new Error(`Unrecognized extension value in extension set (${o}).`);
      if (h == o)
        throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      r(h, a);
    }
  }
  return r(i, ss.default), n.reduce((o, a) => o.concat(a));
}
function io(i, e) {
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
function Aa(i, e) {
  return e & 1 ? i.config.staticValues[e >> 1] : i.values[e >> 1];
}
const SO = /* @__PURE__ */ ve.define(), Gh = /* @__PURE__ */ ve.define({
  combine: (i) => i.some((e) => e),
  static: !0
}), kO = /* @__PURE__ */ ve.define({
  combine: (i) => i.length ? i[0] : void 0,
  static: !0
}), QO = /* @__PURE__ */ ve.define(), $O = /* @__PURE__ */ ve.define(), _O = /* @__PURE__ */ ve.define(), PO = /* @__PURE__ */ ve.define({
  combine: (i) => i.length ? i[0] : !1
});
class Tn {
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
    return new Zy();
  }
}
class Zy {
  /**
  Create an instance of this annotation.
  */
  of(e) {
    return new Tn(this, e);
  }
}
class Ey {
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
    return new Ke(this, e);
  }
}
class Ke {
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
    return t === void 0 ? void 0 : t == this.value ? this : new Ke(this.type, t);
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
    return new Ey(e.map || ((t) => t));
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
Ke.reconfigure = /* @__PURE__ */ Ke.define();
Ke.appendConfig = /* @__PURE__ */ Ke.define();
class wt {
  constructor(e, t, n, s, r, o) {
    this.startState = e, this.changes = t, this.selection = n, this.effects = s, this.annotations = r, this.scrollIntoView = o, this._doc = null, this._state = null, n && wO(n, t.newLength), r.some((a) => a.type == wt.time) || (this.annotations = r.concat(wt.time.of(Date.now())));
  }
  /**
  @internal
  */
  static create(e, t, n, s, r, o) {
    return new wt(e, t, n, s, r, o);
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
    let t = this.annotation(wt.userEvent);
    return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."));
  }
}
wt.time = /* @__PURE__ */ Tn.define();
wt.userEvent = /* @__PURE__ */ Tn.define();
wt.addToHistory = /* @__PURE__ */ Tn.define();
wt.remote = /* @__PURE__ */ Tn.define();
function Ay(i, e) {
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
function TO(i, e, t) {
  var n;
  let s, r, o;
  return t ? (s = e.changes, r = Pt.empty(e.changes.length), o = i.changes.compose(e.changes)) : (s = e.changes.map(i.changes), r = i.changes.mapDesc(e.changes, !0), o = i.changes.compose(s)), {
    changes: o,
    selection: e.selection ? e.selection.map(r) : (n = i.selection) === null || n === void 0 ? void 0 : n.map(s),
    effects: Ke.mapEffects(i.effects, s).concat(Ke.mapEffects(e.effects, r)),
    annotations: i.annotations.length ? i.annotations.concat(e.annotations) : e.annotations,
    scrollIntoView: i.scrollIntoView || e.scrollIntoView
  };
}
function Uh(i, e, t) {
  let n = e.selection, s = Gs(e.annotations);
  return e.userEvent && (s = s.concat(wt.userEvent.of(e.userEvent))), {
    changes: e.changes instanceof Pt ? e.changes : Pt.of(e.changes || [], t, i.facet(kO)),
    selection: n && (n instanceof G ? n : G.single(n.anchor, n.head)),
    effects: Gs(e.effects),
    annotations: s,
    scrollIntoView: !!e.scrollIntoView
  };
}
function CO(i, e, t) {
  let n = Uh(i, e.length ? e[0] : {}, i.doc.length);
  e.length && e[0].filter === !1 && (t = !1);
  for (let r = 1; r < e.length; r++) {
    e[r].filter === !1 && (t = !1);
    let o = !!e[r].sequential;
    n = TO(n, Uh(i, e[r], o ? n.changes.newLength : i.doc.length), o);
  }
  let s = wt.create(i, n.changes, n.selection, n.effects, n.annotations, n.scrollIntoView);
  return My(t ? Ry(s) : s);
}
function Ry(i) {
  let e = i.startState, t = !0;
  for (let s of e.facet(QO)) {
    let r = s(i);
    if (r === !1) {
      t = !1;
      break;
    }
    Array.isArray(r) && (t = t === !0 ? r : Ay(t, r));
  }
  if (t !== !0) {
    let s, r;
    if (t === !1)
      r = i.changes.invertedDesc, s = Pt.empty(e.doc.length);
    else {
      let o = i.changes.filter(t);
      s = o.changes, r = o.filtered.mapDesc(o.changes).invertedDesc;
    }
    i = wt.create(e, s, i.selection && i.selection.map(r), Ke.mapEffects(i.effects, r), i.annotations, i.scrollIntoView);
  }
  let n = e.facet($O);
  for (let s = n.length - 1; s >= 0; s--) {
    let r = n[s](i);
    r instanceof wt ? i = r : Array.isArray(r) && r.length == 1 && r[0] instanceof wt ? i = r[0] : i = CO(e, Gs(r), !1);
  }
  return i;
}
function My(i) {
  let e = i.startState, t = e.facet(_O), n = i;
  for (let s = t.length - 1; s >= 0; s--) {
    let r = t[s](i);
    r && Object.keys(r).length && (n = TO(n, Uh(e, r, i.changes.newLength), !0));
  }
  return n == i ? i : wt.create(e, i.changes, i.selection, n.effects, n.annotations, n.scrollIntoView);
}
const Xy = [];
function Gs(i) {
  return i == null ? Xy : Array.isArray(i) ? i : [i];
}
var yn = /* @__PURE__ */ (function(i) {
  return i[i.Word = 0] = "Word", i[i.Space = 1] = "Space", i[i.Other = 2] = "Other", i;
})(yn || (yn = {}));
const jy = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let Fh;
try {
  Fh = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function Ly(i) {
  if (Fh)
    return Fh.test(i);
  for (let e = 0; e < i.length; e++) {
    let t = i[e];
    if (/\w/.test(t) || t > "" && (t.toUpperCase() != t.toLowerCase() || jy.test(t)))
      return !0;
  }
  return !1;
}
function Iy(i) {
  return (e) => {
    if (!/\S/.test(e))
      return yn.Space;
    if (Ly(e))
      return yn.Word;
    for (let t = 0; t < i.length; t++)
      if (e.indexOf(i[t]) > -1)
        return yn.Word;
    return yn.Other;
  };
}
class Be {
  constructor(e, t, n, s, r, o) {
    this.config = e, this.doc = t, this.selection = n, this.values = s, this.status = e.statusTemplate.slice(), this.computeSlot = r, o && (o._state = this);
    for (let a = 0; a < this.config.dynamicSlots.length; a++)
      io(this, a << 1);
    this.computeSlot = null;
  }
  field(e, t = !0) {
    let n = this.config.address[e.id];
    if (n == null) {
      if (t)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return io(this, n), Aa(this, n);
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
    return CO(this, e, !0);
  }
  /**
  @internal
  */
  applyTransaction(e) {
    let t = this.config, { base: n, compartments: s } = t;
    for (let a of e.effects)
      a.is(ml.reconfigure) ? (t && (s = /* @__PURE__ */ new Map(), t.compartments.forEach((l, h) => s.set(h, l)), t = null), s.set(a.value.compartment, a.value.extension)) : a.is(Ke.reconfigure) ? (t = null, n = a.value) : a.is(Ke.appendConfig) && (t = null, n = Gs(n).concat(a.value));
    let r;
    t ? r = e.startState.values.slice() : (t = Ea.resolve(n, s, this), r = new Be(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (l, h) => h.reconfigure(l, this), null).values);
    let o = e.startState.facet(Gh) ? e.newSelection : e.newSelection.asSingle();
    new Be(t, e.newDoc, o, r, (a, l) => l.update(a, e), e);
  }
  /**
  Create a [transaction spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec) that
  replaces every selection range with the given content.
  */
  replaceSelection(e) {
    return typeof e == "string" && (e = this.toText(e)), this.changeByRange((t) => ({
      changes: { from: t.from, to: t.to, insert: e },
      range: G.cursor(t.from + e.length)
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
    let t = this.selection, n = e(t.ranges[0]), s = this.changes(n.changes), r = [n.range], o = Gs(n.effects);
    for (let a = 1; a < t.ranges.length; a++) {
      let l = e(t.ranges[a]), h = this.changes(l.changes), c = h.map(s);
      for (let d = 0; d < a; d++)
        r[d] = r[d].map(c);
      let f = s.mapDesc(h, !0);
      r.push(l.range.map(f)), s = s.compose(c), o = Ke.mapEffects(o, c).concat(Ke.mapEffects(Gs(l.effects), f));
    }
    return {
      changes: s,
      selection: G.create(r, t.mainIndex),
      effects: o
    };
  }
  /**
  Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
  description, taking the state's document length and line
  separator into account.
  */
  changes(e = []) {
    return e instanceof Pt ? e : Pt.of(e, this.doc.length, this.facet(Be.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
  */
  toText(e) {
    return Ne.of(e.split(this.facet(Be.lineSeparator) || Yh));
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
    return t == null ? e.default : (io(this, t), Aa(this, t));
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
        s instanceof un && this.config.address[s.id] != null && (t[n] = s.spec.toJSON(this.field(e[n]), this));
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
          let o = n[r], a = e[r];
          s.push(o.init((l) => o.spec.fromJSON(a, l)));
        }
    }
    return Be.create({
      doc: e.doc,
      selection: G.fromJSON(e.selection),
      extensions: t.extensions ? s.concat([t.extensions]) : s
    });
  }
  /**
  Create a new state. You'll usually only need this when
  initializing an editor—updated states are created by applying
  transactions.
  */
  static create(e = {}) {
    let t = Ea.resolve(e.extensions || [], /* @__PURE__ */ new Map()), n = e.doc instanceof Ne ? e.doc : Ne.of((e.doc || "").split(t.staticFacet(Be.lineSeparator) || Yh)), s = e.selection ? e.selection instanceof G ? e.selection : G.single(e.selection.anchor, e.selection.head) : G.single(0);
    return wO(s, n.length), t.staticFacet(Gh) || (s = s.asSingle()), new Be(t, n, s, t.dynamicSlots.map(() => null), (r, o) => o.create(r), null);
  }
  /**
  The size (in columns) of a tab in the document, determined by
  the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
  */
  get tabSize() {
    return this.facet(Be.tabSize);
  }
  /**
  Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
  string for this state.
  */
  get lineBreak() {
    return this.facet(Be.lineSeparator) || `
`;
  }
  /**
  Returns true when the editor is
  [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
  */
  get readOnly() {
    return this.facet(PO);
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
    for (let n of this.facet(Be.phrases))
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
    for (let r of this.facet(SO))
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
    return Iy(t.length ? t[0] : "");
  }
  /**
  Find the word at the given position, meaning the range
  containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
  around it. If no word characters are adjacent to the position,
  this returns null.
  */
  wordAt(e) {
    let { text: t, from: n, length: s } = this.doc.lineAt(e), r = this.charCategorizer(e), o = e - n, a = e - n;
    for (; o > 0; ) {
      let l = Lt(t, o, !1);
      if (r(t.slice(l, o)) != yn.Word)
        break;
      o = l;
    }
    for (; a < s; ) {
      let l = Lt(t, a);
      if (r(t.slice(a, l)) != yn.Word)
        break;
      a = l;
    }
    return o == a ? null : G.range(o + n, a + n);
  }
}
Be.allowMultipleSelections = Gh;
Be.tabSize = /* @__PURE__ */ ve.define({
  combine: (i) => i.length ? i[0] : 4
});
Be.lineSeparator = kO;
Be.readOnly = PO;
Be.phrases = /* @__PURE__ */ ve.define({
  compare(i, e) {
    let t = Object.keys(i), n = Object.keys(e);
    return t.length == n.length && t.every((s) => i[s] == e[s]);
  }
});
Be.languageData = SO;
Be.changeFilter = QO;
Be.transactionFilter = $O;
Be.transactionExtender = _O;
ml.reconfigure = /* @__PURE__ */ Ke.define();
function nf(i, e, t = {}) {
  let n = {};
  for (let s of i)
    for (let r of Object.keys(s)) {
      let o = s[r], a = n[r];
      if (a === void 0)
        n[r] = o;
      else if (!(a === o || o === void 0)) if (Object.hasOwnProperty.call(t, r))
        n[r] = t[r](a, o);
      else
        throw new Error("Config merge conflict for field " + r);
    }
  for (let s in e)
    n[s] === void 0 && (n[s] = e[s]);
  return n;
}
class Gn {
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
    return Hh.create(e, t, this);
  }
}
Gn.prototype.startSide = Gn.prototype.endSide = 0;
Gn.prototype.point = !1;
Gn.prototype.mapMode = Yt.TrackDel;
function sf(i, e) {
  return i == e || i.constructor == e.constructor && i.eq(e);
}
let Hh = class ZO {
  constructor(e, t, n) {
    this.from = e, this.to = t, this.value = n;
  }
  /**
  @internal
  */
  static create(e, t, n) {
    return new ZO(e, t, n);
  }
};
function Kh(i, e) {
  return i.from - e.from || i.value.startSide - e.value.startSide;
}
class rf {
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
    for (let o = s, a = r.length; ; ) {
      if (o == a)
        return o;
      let l = o + a >> 1, h = r[l] - e || (n ? this.value[l].endSide : this.value[l].startSide) - t;
      if (l == o)
        return h >= 0 ? o : a;
      h >= 0 ? a = l : o = l + 1;
    }
  }
  between(e, t, n, s) {
    for (let r = this.findIndex(t, -1e9, !0), o = this.findIndex(n, 1e9, !1, r); r < o; r++)
      if (s(this.from[r] + e, this.to[r] + e, this.value[r]) === !1)
        return !1;
  }
  map(e, t) {
    let n = [], s = [], r = [], o = -1, a = -1;
    for (let l = 0; l < this.value.length; l++) {
      let h = this.value[l], c = this.from[l] + e, f = this.to[l] + e, d, p;
      if (c == f) {
        let O = t.mapPos(c, h.startSide, h.mapMode);
        if (O == null || (d = p = O, h.startSide != h.endSide && (p = t.mapPos(c, h.endSide), p < d)))
          continue;
      } else if (d = t.mapPos(c, h.startSide), p = t.mapPos(f, h.endSide), d > p || d == p && h.startSide > 0 && h.endSide <= 0)
        continue;
      (p - d || h.endSide - h.startSide) < 0 || (o < 0 && (o = d), h.point && (a = Math.max(a, p - d)), n.push(h), s.push(d - o), r.push(p - o));
    }
    return { mapped: n.length ? new rf(s, r, n, a) : null, pos: o };
  }
}
class Ue {
  constructor(e, t, n, s) {
    this.chunkPos = e, this.chunk = t, this.nextLayer = n, this.maxPoint = s;
  }
  /**
  @internal
  */
  static create(e, t, n, s) {
    return new Ue(e, t, n, s);
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
    if (n && (t = t.slice().sort(Kh)), this.isEmpty)
      return t.length ? Ue.of(t) : this;
    let a = new EO(this, null, -1).goto(0), l = 0, h = [], c = new Ra();
    for (; a.value || l < t.length; )
      if (l < t.length && (a.from - t[l].from || a.startSide - t[l].value.startSide) >= 0) {
        let f = t[l++];
        c.addInner(f.from, f.to, f.value) || h.push(f);
      } else a.rangeIndex == 1 && a.chunkIndex < this.chunk.length && (l == t.length || this.chunkEnd(a.chunkIndex) < t[l].from) && (!o || s > this.chunkEnd(a.chunkIndex) || r < this.chunkPos[a.chunkIndex]) && c.addChunk(this.chunkPos[a.chunkIndex], this.chunk[a.chunkIndex]) ? a.nextChunk() : ((!o || s > a.to || r < a.from || o(a.from, a.to, a.value)) && (c.addInner(a.from, a.to, a.value) || h.push(Hh.create(a.from, a.to, a.value))), a.next());
    return c.finishInner(this.nextLayer.isEmpty && !h.length ? Ue.empty : this.nextLayer.update({ add: h, filter: o, filterFrom: s, filterTo: r }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(e) {
    if (e.empty || this.isEmpty)
      return this;
    let t = [], n = [], s = -1;
    for (let o = 0; o < this.chunk.length; o++) {
      let a = this.chunkPos[o], l = this.chunk[o], h = e.touchesRange(a, a + l.length);
      if (h === !1)
        s = Math.max(s, l.maxPoint), t.push(l), n.push(e.mapPos(a));
      else if (h === !0) {
        let { mapped: c, pos: f } = l.map(a, e);
        c && (s = Math.max(s, c.maxPoint), t.push(c), n.push(f));
      }
    }
    let r = this.nextLayer.map(e);
    return t.length == 0 ? r : new Ue(n, t, r || Ue.empty, s);
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
    return po.from([this]).goto(e);
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
    return po.from(e).goto(t);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(e, t, n, s, r = -1) {
    let o = e.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), a = t.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), l = vu(o, a, n), h = new Xr(o, l, r), c = new Xr(a, l, r);
    n.iterGaps((f, d, p) => bu(h, f, c, d, p, s)), n.empty && n.length == 0 && bu(h, 0, c, 0, 0, s);
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
    let a = vu(r, o), l = new Xr(r, a, 0).goto(n), h = new Xr(o, a, 0).goto(n);
    for (; ; ) {
      if (l.to != h.to || !Jh(l.active, h.active) || l.point && (!h.point || !sf(l.point, h.point)))
        return !1;
      if (l.to > s)
        return !0;
      l.next(), h.next();
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
    let o = new Xr(e, null, r).goto(t), a = t, l = o.openStart;
    for (; ; ) {
      let h = Math.min(o.to, n);
      if (o.point) {
        let c = o.activeForPoint(o.to), f = o.pointFrom < t ? c.length + 1 : o.point.startSide < 0 ? c.length : Math.min(c.length, l);
        s.point(a, h, o.point, c, f, o.pointRank), l = Math.min(o.openEnd(h), c.length);
      } else h > a && (s.span(a, h, o.active, l), l = o.openEnd(h));
      if (o.to > n)
        return l + (o.point && o.to > n ? 1 : 0);
      a = o.to, o.next();
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
    let n = new Ra();
    for (let s of e instanceof Hh ? [e] : t ? Dy(e) : e)
      n.add(s.from, s.to, s.value);
    return n.finish();
  }
  /**
  Join an array of range sets into a single set.
  */
  static join(e) {
    if (!e.length)
      return Ue.empty;
    let t = e[e.length - 1];
    for (let n = e.length - 2; n >= 0; n--)
      for (let s = e[n]; s != Ue.empty; s = s.nextLayer)
        t = new Ue(s.chunkPos, s.chunk, t, Math.max(s.maxPoint, t.maxPoint));
    return t;
  }
}
Ue.empty = /* @__PURE__ */ new Ue([], [], null, -1);
function Dy(i) {
  if (i.length > 1)
    for (let e = i[0], t = 1; t < i.length; t++) {
      let n = i[t];
      if (Kh(e, n) > 0)
        return i.slice().sort(Kh);
      e = n;
    }
  return i;
}
Ue.empty.nextLayer = Ue.empty;
class Ra {
  finishChunk(e) {
    this.chunks.push(new rf(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
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
    this.addInner(e, t, n) || (this.nextLayer || (this.nextLayer = new Ra())).add(e, t, n);
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
    return this.finishInner(Ue.empty);
  }
  /**
  @internal
  */
  finishInner(e) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return e;
    let t = Ue.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
    return this.from = null, t;
  }
}
function vu(i, e, t) {
  let n = /* @__PURE__ */ new Map();
  for (let r of i)
    for (let o = 0; o < r.chunk.length; o++)
      r.chunk[o].maxPoint <= 0 && n.set(r.chunk[o], r.chunkPos[o]);
  let s = /* @__PURE__ */ new Set();
  for (let r of e)
    for (let o = 0; o < r.chunk.length; o++) {
      let a = n.get(r.chunk[o]);
      a != null && (t ? t.mapPos(a) : a) == r.chunkPos[o] && !(t != null && t.touchesRange(a, a + r.chunk[o].length)) && s.add(r.chunk[o]);
    }
  return s;
}
class EO {
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
class po {
  constructor(e) {
    this.heap = e;
  }
  static from(e, t = null, n = -1) {
    let s = [];
    for (let r = 0; r < e.length; r++)
      for (let o = e[r]; !o.isEmpty; o = o.nextLayer)
        o.maxPoint >= n && s.push(new EO(o, t, n, r));
    return s.length == 1 ? s[0] : new po(s);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(e, t = -1e9) {
    for (let n of this.heap)
      n.goto(e, t);
    for (let n = this.heap.length >> 1; n >= 0; n--)
      Hl(this.heap, n);
    return this.next(), this;
  }
  forward(e, t) {
    for (let n of this.heap)
      n.forward(e, t);
    for (let n = this.heap.length >> 1; n >= 0; n--)
      Hl(this.heap, n);
    (this.to - e || this.value.endSide - t) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let e = this.heap[0];
      this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), Hl(this.heap, 0);
    }
  }
}
function Hl(i, e) {
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
class Xr {
  constructor(e, t, n) {
    this.minPoint = n, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = po.from(e, t, n);
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
    Bo(this.active, e), Bo(this.activeTo, e), Bo(this.activeRank, e), this.minActive = yu(this.active, this.activeTo);
  }
  addActive(e) {
    let t = 0, { value: n, to: s, rank: r } = this.cursor;
    for (; t < this.activeRank.length && (r - this.activeRank[t] || s - this.activeTo[t]) > 0; )
      t++;
    Go(this.active, t, n), Go(this.activeTo, t, s), Go(this.activeRank, t, r), e && Go(e, t, this.cursor.from), this.minActive = yu(this.active, this.activeTo);
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
        this.removeActive(s), n && Bo(n, s);
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
function bu(i, e, t, n, s, r) {
  i.goto(e), t.goto(n);
  let o = n + s, a = n, l = n - e, h = !!r.boundChange;
  for (let c = !1; ; ) {
    let f = i.to + l - t.to, d = f || i.endSide - t.endSide, p = d < 0 ? i.to + l : t.to, O = Math.min(p, o);
    if (i.point || t.point ? (i.point && t.point && sf(i.point, t.point) && Jh(i.activeForPoint(i.to), t.activeForPoint(t.to)) || r.comparePoint(a, O, i.point, t.point), c = !1) : (c && r.boundChange(a), O > a && !Jh(i.active, t.active) && r.compareRange(a, O, i.active, t.active), h && O < o && (f || i.openEnd(p) != t.openEnd(p)) && (c = !0)), p > o)
      break;
    a = p, d <= 0 && i.next(), d >= 0 && t.next();
  }
}
function Jh(i, e) {
  if (i.length != e.length)
    return !1;
  for (let t = 0; t < i.length; t++)
    if (i[t] != e[t] && !sf(i[t], e[t]))
      return !1;
  return !0;
}
function Bo(i, e) {
  for (let t = e, n = i.length - 1; t < n; t++)
    i[t] = i[t + 1];
  i.pop();
}
function Go(i, e, t) {
  for (let n = i.length - 1; n >= e; n--)
    i[n + 1] = i[n];
  i[e] = t;
}
function yu(i, e) {
  let t = -1, n = 1e9;
  for (let s = 0; s < e.length; s++)
    (e[s] - n || i[s].endSide - i[t].endSide) < 0 && (t = s, n = e[s]);
  return t;
}
function vl(i, e, t = i.length) {
  let n = 0;
  for (let s = 0; s < t && s < i.length; )
    i.charCodeAt(s) == 9 ? (n += e - n % e, s++) : (n++, s = Lt(i, s));
  return n;
}
function zy(i, e, t, n) {
  for (let s = 0, r = 0; ; ) {
    if (r >= e)
      return s;
    if (s == i.length)
      break;
    r += i.charCodeAt(s) == 9 ? t - r % t : 1, s = Lt(i, s);
  }
  return i.length;
}
const ec = "ͼ", wu = typeof Symbol > "u" ? "__" + ec : Symbol.for(ec), tc = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), xu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
class gr {
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
    function r(o, a, l, h) {
      let c = [], f = /^@(\w+)\b/.exec(o[0]), d = f && f[1] == "keyframes";
      if (f && a == null) return l.push(o[0] + ";");
      for (let p in a) {
        let O = a[p];
        if (/&/.test(p))
          r(
            p.split(/,\s*/).map((g) => o.map((m) => g.replace(/&/, m))).reduce((g, m) => g.concat(m)),
            O,
            l
          );
        else if (O && typeof O == "object") {
          if (!f) throw new RangeError("The value of a property (" + p + ") should be a primitive value.");
          r(s(p), O, c, d);
        } else O != null && c.push(p.replace(/_.*/, "").replace(/[A-Z]/g, (g) => "-" + g.toLowerCase()) + ": " + O + ";");
      }
      (c.length || d) && l.push((n && !f && !h ? o.map(n) : o).join(", ") + " {" + c.join(" ") + "}");
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
    let e = xu[wu] || 1;
    return xu[wu] = e + 1, ec + e.toString(36);
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
    let s = e[tc], r = n && n.nonce;
    s ? r && s.setNonce(r) : s = new Ny(e, r), s.mount(Array.isArray(t) ? t : [t], e);
  }
}
let Su = /* @__PURE__ */ new Map();
class Ny {
  constructor(e, t) {
    let n = e.ownerDocument || e, s = n.defaultView;
    if (!e.head && e.adoptedStyleSheets && s.CSSStyleSheet) {
      let r = Su.get(n);
      if (r) return e[tc] = r;
      this.sheet = new s.CSSStyleSheet(), Su.set(n, this);
    } else
      this.styleTag = n.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
    this.modules = [], e[tc] = this;
  }
  mount(e, t) {
    let n = this.sheet, s = 0, r = 0;
    for (let o = 0; o < e.length; o++) {
      let a = e[o], l = this.modules.indexOf(a);
      if (l < r && l > -1 && (this.modules.splice(l, 1), r--, l = -1), l == -1) {
        if (this.modules.splice(r++, 0, a), n) for (let h = 0; h < a.rules.length; h++)
          n.insertRule(a.rules[h], s++);
      } else {
        for (; r < l; ) s += this.modules[r++].rules.length;
        s += a.rules.length, r++;
      }
    }
    if (n)
      t.adoptedStyleSheets.indexOf(this.sheet) < 0 && (t.adoptedStyleSheets = [this.sheet, ...t.adoptedStyleSheets]);
    else {
      let o = "";
      for (let l = 0; l < this.modules.length; l++)
        o += this.modules[l].getRules() + `
`;
      this.styleTag.textContent = o;
      let a = t.head || t;
      this.styleTag.parentNode != a && a.insertBefore(this.styleTag, a.firstChild);
    }
  }
  setNonce(e) {
    this.styleTag && this.styleTag.getAttribute("nonce") != e && this.styleTag.setAttribute("nonce", e);
  }
}
var Un = {
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
}, Oo = {
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
}, Yy = typeof navigator < "u" && /Mac/.test(navigator.platform), qy = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var Rt = 0; Rt < 10; Rt++) Un[48 + Rt] = Un[96 + Rt] = String(Rt);
for (var Rt = 1; Rt <= 24; Rt++) Un[Rt + 111] = "F" + Rt;
for (var Rt = 65; Rt <= 90; Rt++)
  Un[Rt] = String.fromCharCode(Rt + 32), Oo[Rt] = String.fromCharCode(Rt);
for (var Kl in Un) Oo.hasOwnProperty(Kl) || (Oo[Kl] = Un[Kl]);
function Wy(i) {
  var e = Yy && i.metaKey && i.shiftKey && !i.ctrlKey && !i.altKey || qy && i.shiftKey && i.key && i.key.length == 1 || i.key == "Unidentified", t = !e && i.key || (i.shiftKey ? Oo : Un)[i.keyCode] || i.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
let zt = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, ic = typeof document < "u" ? document : { documentElement: { style: {} } };
const nc = /* @__PURE__ */ /Edge\/(\d+)/.exec(zt.userAgent), AO = /* @__PURE__ */ /MSIE \d/.test(zt.userAgent), sc = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(zt.userAgent), bl = !!(AO || sc || nc), ku = !bl && /* @__PURE__ */ /gecko\/(\d+)/i.test(zt.userAgent), Jl = !bl && /* @__PURE__ */ /Chrome\/(\d+)/.exec(zt.userAgent), Qu = "webkitFontSmoothing" in ic.documentElement.style, rc = !bl && /* @__PURE__ */ /Apple Computer/.test(zt.vendor), $u = rc && (/* @__PURE__ */ /Mobile\/\w+/.test(zt.userAgent) || zt.maxTouchPoints > 2);
var ae = {
  mac: $u || /* @__PURE__ */ /Mac/.test(zt.platform),
  windows: /* @__PURE__ */ /Win/.test(zt.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(zt.platform),
  ie: bl,
  ie_version: AO ? ic.documentMode || 6 : sc ? +sc[1] : nc ? +nc[1] : 0,
  gecko: ku,
  gecko_version: ku ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(zt.userAgent) || [0, 0])[1] : 0,
  chrome: !!Jl,
  chrome_version: Jl ? +Jl[1] : 0,
  ios: $u,
  android: /* @__PURE__ */ /Android\b/.test(zt.userAgent),
  webkit: Qu,
  webkit_version: Qu ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(zt.userAgent) || [0, 0])[1] : 0,
  safari: rc,
  safari_version: rc ? +(/* @__PURE__ */ /\bVersion\/(\d+(\.\d+)?)/.exec(zt.userAgent) || [0, 0])[1] : 0,
  tabSize: ic.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
function of(i, e) {
  for (let t in i)
    t == "class" && e.class ? e.class += " " + i.class : t == "style" && e.style ? e.style += ";" + i.style : e[t] = i[t];
  return e;
}
const Ma = /* @__PURE__ */ Object.create(null);
function af(i, e, t) {
  if (i == e)
    return !0;
  i || (i = Ma), e || (e = Ma);
  let n = Object.keys(i), s = Object.keys(e);
  if (n.length - 0 != s.length - 0)
    return !1;
  for (let r of n)
    if (r != t && (s.indexOf(r) == -1 || i[r] !== e[r]))
      return !1;
  return !0;
}
function Vy(i, e) {
  for (let t = i.attributes.length - 1; t >= 0; t--) {
    let n = i.attributes[t].name;
    e[n] == null && i.removeAttribute(n);
  }
  for (let t in e) {
    let n = e[t];
    t == "style" ? i.style.cssText = n : i.getAttribute(t) != n && i.setAttribute(t, n);
  }
}
function _u(i, e, t) {
  let n = !1;
  if (e)
    for (let s in e)
      t && s in t || (n = !0, s == "style" ? i.style.cssText = "" : i.removeAttribute(s));
  if (t)
    for (let s in t)
      e && e[s] == t[s] || (n = !0, s == "style" ? i.style.cssText = t[s] : i.setAttribute(s, t[s]));
  return n;
}
function By(i) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t = 0; t < i.attributes.length; t++) {
    let n = i.attributes[t];
    e[n.name] = n.value;
  }
  return e;
}
class Pr {
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
var $i = /* @__PURE__ */ (function(i) {
  return i[i.Text = 0] = "Text", i[i.WidgetBefore = 1] = "WidgetBefore", i[i.WidgetAfter = 2] = "WidgetAfter", i[i.WidgetRange = 3] = "WidgetRange", i;
})($i || ($i = {}));
class tt extends Gn {
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
    return new Ro(e);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(e) {
    let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), n = !!e.block;
    return t += n && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new _s(e, t, t, n, e.widget || null, !1);
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
      let { start: r, end: o } = RO(e, t);
      n = (r ? t ? -3e8 : -1 : 5e8) - 1, s = (o ? t ? 2e8 : 1 : -6e8) + 1;
    }
    return new _s(e, n, s, t, e.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(e) {
    return new Mo(e);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(e, t = !1) {
    return Ue.of(e, t);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
tt.none = Ue.empty;
class Ro extends tt {
  constructor(e) {
    let { start: t, end: n } = RO(e);
    super(t ? -1 : 5e8, n ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.attrs = e.class && e.attributes ? of(e.attributes, { class: e.class }) : e.class ? { class: e.class } : e.attributes || Ma;
  }
  eq(e) {
    return this == e || e instanceof Ro && this.tagName == e.tagName && af(this.attrs, e.attrs);
  }
  range(e, t = e) {
    if (e >= t)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(e, t);
  }
}
Ro.prototype.point = !1;
class Mo extends tt {
  constructor(e) {
    super(-2e8, -2e8, null, e);
  }
  eq(e) {
    return e instanceof Mo && this.spec.class == e.spec.class && af(this.spec.attributes, e.spec.attributes);
  }
  range(e, t = e) {
    if (t != e)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(e, t);
  }
}
Mo.prototype.mapMode = Yt.TrackBefore;
Mo.prototype.point = !0;
class _s extends tt {
  constructor(e, t, n, s, r, o) {
    super(t, n, r, e), this.block = s, this.isReplace = o, this.mapMode = s ? t <= 0 ? Yt.TrackBefore : Yt.TrackAfter : Yt.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide != this.endSide ? $i.WidgetRange : this.startSide <= 0 ? $i.WidgetBefore : $i.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(e) {
    return e instanceof _s && Gy(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide;
  }
  range(e, t = e) {
    if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && t != e)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(e, t);
  }
}
_s.prototype.point = !0;
function RO(i, e = !1) {
  let { inclusiveStart: t, inclusiveEnd: n } = i;
  return t == null && (t = i.inclusive), n == null && (n = i.inclusive), { start: t ?? e, end: n ?? e };
}
function Gy(i, e) {
  return i == e || !!(i && e && i.compare(e));
}
function Us(i, e, t, n = 0) {
  let s = t.length - 1;
  s >= 0 && t[s] + n >= i ? t[s] = Math.max(t[s], e) : t.push(i, e);
}
class go extends Gn {
  constructor(e, t, n) {
    super(), this.tagName = e, this.attributes = t, this.rank = n;
  }
  eq(e) {
    return e == this || e instanceof go && this.tagName == e.tagName && af(this.attributes, e.attributes);
  }
  /**
  Create a block wrapper object with the given tag name and
  attributes.
  */
  static create(e) {
    return new go(e.tagName, e.attributes || Ma, e.rank == null ? 50 : Math.max(0, Math.min(e.rank, 100)));
  }
  /**
  Create a range set from the given block wrapper ranges.
  */
  static set(e, t = !1) {
    return Ue.of(e, t);
  }
}
go.prototype.startSide = go.prototype.endSide = -1;
function mo(i) {
  let e;
  return i.nodeType == 11 ? e = i.getSelection ? i : i.ownerDocument : e = i, e.getSelection();
}
function oc(i, e) {
  return e ? i == e || i.contains(e.nodeType != 1 ? e.parentNode : e) : !1;
}
function no(i, e) {
  if (!e.anchorNode)
    return !1;
  try {
    return oc(i, e.anchorNode);
  } catch {
    return !1;
  }
}
function so(i) {
  return i.nodeType == 3 ? bo(i, 0, i.nodeValue.length).getClientRects() : i.nodeType == 1 ? i.getClientRects() : [];
}
function ro(i, e, t, n) {
  return t ? Pu(i, e, t, n, -1) || Pu(i, e, t, n, 1) : !1;
}
function Fn(i) {
  for (var e = 0; ; e++)
    if (i = i.previousSibling, !i)
      return e;
}
function Xa(i) {
  return i.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(i.nodeName);
}
function Pu(i, e, t, n, s) {
  for (; ; ) {
    if (i == t && e == n)
      return !0;
    if (e == (s < 0 ? 0 : Qn(i))) {
      if (i.nodeName == "DIV")
        return !1;
      let r = i.parentNode;
      if (!r || r.nodeType != 1)
        return !1;
      e = Fn(i) + (s < 0 ? 0 : 1), i = r;
    } else if (i.nodeType == 1) {
      if (i = i.childNodes[e + (s < 0 ? -1 : 0)], i.nodeType == 1 && i.contentEditable == "false")
        return !1;
      e = s < 0 ? Qn(i) : 0;
    } else
      return !1;
  }
}
function Qn(i) {
  return i.nodeType == 3 ? i.nodeValue.length : i.childNodes.length;
}
function vo(i, e) {
  let { left: t, right: n } = i;
  if (t == n)
    return i;
  let s = e ? t : n;
  return { left: s, right: s, top: i.top, bottom: i.bottom };
}
function Uy(i) {
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
function MO(i, e) {
  let t = e.width / i.offsetWidth, n = e.height / i.offsetHeight;
  return (t > 0.995 && t < 1.005 || !isFinite(t) || Math.abs(e.width - i.offsetWidth) < 1) && (t = 1), (n > 0.995 && n < 1.005 || !isFinite(n) || Math.abs(e.height - i.offsetHeight) < 1) && (n = 1), { scaleX: t, scaleY: n };
}
function Fy(i, e, t, n, s, r, o, a) {
  let l = i.ownerDocument, h = l.defaultView || window;
  for (let c = i, f = !1; c && !f; )
    if (c.nodeType == 1) {
      let d, p = c == l.body, O = 1, g = 1;
      if (p)
        d = Uy(h);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(c).position) && (f = !0), c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth) {
          c = c.assignedSlot || c.parentNode;
          continue;
        }
        let Q = c.getBoundingClientRect();
        ({ scaleX: O, scaleY: g } = MO(c, Q)), d = {
          left: Q.left,
          right: Q.left + c.clientWidth * O,
          top: Q.top,
          bottom: Q.top + c.clientHeight * g
        };
      }
      let m = 0, v = 0;
      if (s == "nearest")
        e.top < d.top + o ? (v = e.top - (d.top + o), t > 0 && e.bottom > d.bottom + v && (v = e.bottom - d.bottom + o)) : e.bottom > d.bottom - o && (v = e.bottom - d.bottom + o, t < 0 && e.top - v < d.top && (v = e.top - (d.top + o)));
      else {
        let Q = e.bottom - e.top, k = d.bottom - d.top;
        v = (s == "center" && Q <= k ? e.top + Q / 2 - k / 2 : s == "start" || s == "center" && t < 0 ? e.top - o : e.bottom - k + o) - d.top;
      }
      if (n == "nearest" ? e.left < d.left + r ? (m = e.left - (d.left + r), t > 0 && e.right > d.right + m && (m = e.right - d.right + r)) : e.right > d.right - r && (m = e.right - d.right + r, t < 0 && e.left < d.left + m && (m = e.left - (d.left + r))) : m = (n == "center" ? e.left + (e.right - e.left) / 2 - (d.right - d.left) / 2 : n == "start" == a ? e.left - r : e.right - (d.right - d.left) + r) - d.left, m || v)
        if (p)
          h.scrollBy(m, v);
        else {
          let Q = 0, k = 0;
          if (v) {
            let R = c.scrollTop;
            c.scrollTop += v / g, k = (c.scrollTop - R) * g;
          }
          if (m) {
            let R = c.scrollLeft;
            c.scrollLeft += m / O, Q = (c.scrollLeft - R) * O;
          }
          e = {
            left: e.left - Q,
            top: e.top - k,
            right: e.right - Q,
            bottom: e.bottom - k
          }, Q && Math.abs(Q - m) < 1 && (n = "nearest"), k && Math.abs(k - v) < 1 && (s = "nearest");
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
function XO(i, e = !0) {
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
class Hy {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(e) {
    return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
  }
  setRange(e) {
    let { anchorNode: t, focusNode: n } = e;
    this.set(t, Math.min(e.anchorOffset, t ? Qn(t) : 0), n, Math.min(e.focusOffset, n ? Qn(n) : 0));
  }
  set(e, t, n, s) {
    this.anchorNode = e, this.anchorOffset = t, this.focusNode = n, this.focusOffset = s;
  }
}
let ns = null;
ae.safari && ae.safari_version >= 26 && (ns = !1);
function jO(i) {
  if (i.setActive)
    return i.setActive();
  if (ns)
    return i.focus(ns);
  let e = [];
  for (let t = i; t && (e.push(t, t.scrollTop, t.scrollLeft), t != t.ownerDocument); t = t.parentNode)
    ;
  if (i.focus(ns == null ? {
    get preventScroll() {
      return ns = { preventScroll: !0 }, !0;
    }
  } : void 0), !ns) {
    ns = !1;
    for (let t = 0; t < e.length; ) {
      let n = e[t++], s = e[t++], r = e[t++];
      n.scrollTop != s && (n.scrollTop = s), n.scrollLeft != r && (n.scrollLeft = r);
    }
  }
}
let Tu;
function bo(i, e, t = e) {
  let n = Tu || (Tu = document.createRange());
  return n.setEnd(i, t), n.setStart(i, e), n;
}
function Fs(i, e, t, n) {
  let s = { key: e, code: e, keyCode: t, which: t, cancelable: !0 };
  n && ({ altKey: s.altKey, ctrlKey: s.ctrlKey, shiftKey: s.shiftKey, metaKey: s.metaKey } = n);
  let r = new KeyboardEvent("keydown", s);
  r.synthetic = !0, i.dispatchEvent(r);
  let o = new KeyboardEvent("keyup", s);
  return o.synthetic = !0, i.dispatchEvent(o), r.defaultPrevented || o.defaultPrevented;
}
function Ky(i) {
  for (; i; ) {
    if (i && (i.nodeType == 9 || i.nodeType == 11 && i.host))
      return i;
    i = i.assignedSlot || i.parentNode;
  }
  return null;
}
function Jy(i, e) {
  let t = e.focusNode, n = e.focusOffset;
  if (!t || e.anchorNode != t || e.anchorOffset != n)
    return !1;
  for (n = Math.min(n, Qn(t)); ; )
    if (n) {
      if (t.nodeType != 1)
        return !1;
      let s = t.childNodes[n - 1];
      s.contentEditable == "false" ? n-- : (t = s, n = Qn(t));
    } else {
      if (t == i)
        return !0;
      n = Fn(t), t = t.parentNode;
    }
}
function LO(i) {
  return i instanceof Window ? i.pageYOffset > Math.max(0, i.document.documentElement.scrollHeight - i.innerHeight - 4) : i.scrollTop > Math.max(1, i.scrollHeight - i.clientHeight - 4);
}
function IO(i, e) {
  for (let t = i, n = e; ; ) {
    if (t.nodeType == 3 && n > 0)
      return { node: t, offset: n };
    if (t.nodeType == 1 && n > 0) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[n - 1], n = Qn(t);
    } else if (t.parentNode && !Xa(t))
      n = Fn(t), t = t.parentNode;
    else
      return null;
  }
}
function DO(i, e) {
  for (let t = i, n = e; ; ) {
    if (t.nodeType == 3 && n < t.nodeValue.length)
      return { node: t, offset: n };
    if (t.nodeType == 1 && n < t.childNodes.length) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[n], n = 0;
    } else if (t.parentNode && !Xa(t))
      n = Fn(t) + 1, t = t.parentNode;
    else
      return null;
  }
}
class Li {
  constructor(e, t, n = !0) {
    this.node = e, this.offset = t, this.precise = n;
  }
  static before(e, t) {
    return new Li(e.parentNode, Fn(e), t);
  }
  static after(e, t) {
    return new Li(e.parentNode, Fn(e) + 1, t);
  }
}
var dt = /* @__PURE__ */ (function(i) {
  return i[i.LTR = 0] = "LTR", i[i.RTL = 1] = "RTL", i;
})(dt || (dt = {}));
const Ps = dt.LTR, lf = dt.RTL;
function zO(i) {
  let e = [];
  for (let t = 0; t < i.length; t++)
    e.push(1 << +i[t]);
  return e;
}
const ew = /* @__PURE__ */ zO("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), tw = /* @__PURE__ */ zO("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), ac = /* @__PURE__ */ Object.create(null), Vi = [];
for (let i of ["()", "[]", "{}"]) {
  let e = /* @__PURE__ */ i.charCodeAt(0), t = /* @__PURE__ */ i.charCodeAt(1);
  ac[e] = t, ac[t] = -e;
}
function NO(i) {
  return i <= 247 ? ew[i] : 1424 <= i && i <= 1524 ? 2 : 1536 <= i && i <= 1785 ? tw[i - 1536] : 1774 <= i && i <= 2220 ? 4 : 8192 <= i && i <= 8204 ? 256 : 64336 <= i && i <= 65023 ? 4 : 1;
}
const iw = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class sn {
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? lf : Ps;
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
      let a = e[o];
      if (a.from <= t && a.to >= t) {
        if (a.level == n)
          return o;
        (r < 0 || (s != 0 ? s < 0 ? a.from < t : a.to > t : e[r].level > a.level)) && (r = o);
      }
    }
    if (r < 0)
      throw new RangeError("Index out of range");
    return r;
  }
}
function YO(i, e) {
  if (i.length != e.length)
    return !1;
  for (let t = 0; t < i.length; t++) {
    let n = i[t], s = e[t];
    if (n.from != s.from || n.to != s.to || n.direction != s.direction || !YO(n.inner, s.inner))
      return !1;
  }
  return !0;
}
const Je = [];
function nw(i, e, t, n, s) {
  for (let r = 0; r <= n.length; r++) {
    let o = r ? n[r - 1].to : e, a = r < n.length ? n[r].from : t, l = r ? 256 : s;
    for (let h = o, c = l, f = l; h < a; h++) {
      let d = NO(i.charCodeAt(h));
      d == 512 ? d = c : d == 8 && f == 4 && (d = 16), Je[h] = d == 4 ? 2 : d, d & 7 && (f = d), c = d;
    }
    for (let h = o, c = l, f = l; h < a; h++) {
      let d = Je[h];
      if (d == 128)
        h < a - 1 && c == Je[h + 1] && c & 24 ? d = Je[h] = c : Je[h] = 256;
      else if (d == 64) {
        let p = h + 1;
        for (; p < a && Je[p] == 64; )
          p++;
        let O = h && c == 8 || p < t && Je[p] == 8 ? f == 1 ? 1 : 8 : 256;
        for (let g = h; g < p; g++)
          Je[g] = O;
        h = p - 1;
      } else d == 8 && f == 1 && (Je[h] = 1);
      c = d, d & 7 && (f = d);
    }
  }
}
function sw(i, e, t, n, s) {
  let r = s == 1 ? 2 : 1;
  for (let o = 0, a = 0, l = 0; o <= n.length; o++) {
    let h = o ? n[o - 1].to : e, c = o < n.length ? n[o].from : t;
    for (let f = h, d, p, O; f < c; f++)
      if (p = ac[d = i.charCodeAt(f)])
        if (p < 0) {
          for (let g = a - 3; g >= 0; g -= 3)
            if (Vi[g + 1] == -p) {
              let m = Vi[g + 2], v = m & 2 ? s : m & 4 ? m & 1 ? r : s : 0;
              v && (Je[f] = Je[Vi[g]] = v), a = g;
              break;
            }
        } else {
          if (Vi.length == 189)
            break;
          Vi[a++] = f, Vi[a++] = d, Vi[a++] = l;
        }
      else if ((O = Je[f]) == 2 || O == 1) {
        let g = O == s;
        l = g ? 0 : 1;
        for (let m = a - 3; m >= 0; m -= 3) {
          let v = Vi[m + 2];
          if (v & 2)
            break;
          if (g)
            Vi[m + 2] |= 2;
          else {
            if (v & 4)
              break;
            Vi[m + 2] |= 4;
          }
        }
      }
  }
}
function rw(i, e, t, n) {
  for (let s = 0, r = n; s <= t.length; s++) {
    let o = s ? t[s - 1].to : i, a = s < t.length ? t[s].from : e;
    for (let l = o; l < a; ) {
      let h = Je[l];
      if (h == 256) {
        let c = l + 1;
        for (; ; )
          if (c == a) {
            if (s == t.length)
              break;
            c = t[s++].to, a = s < t.length ? t[s].from : e;
          } else if (Je[c] == 256)
            c++;
          else
            break;
        let f = r == 1, d = (c < e ? Je[c] : n) == 1, p = f == d ? f ? 1 : 2 : n;
        for (let O = c, g = s, m = g ? t[g - 1].to : i; O > l; )
          O == m && (O = t[--g].from, m = g ? t[g - 1].to : i), Je[--O] = p;
        l = c;
      } else
        r = h, l++;
    }
  }
}
function lc(i, e, t, n, s, r, o) {
  let a = n % 2 ? 2 : 1;
  if (n % 2 == s % 2)
    for (let l = e, h = 0; l < t; ) {
      let c = !0, f = !1;
      if (h == r.length || l < r[h].from) {
        let g = Je[l];
        g != a && (c = !1, f = g == 16);
      }
      let d = !c && a == 1 ? [] : null, p = c ? n : n + 1, O = l;
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
                if (Je[m] == a)
                  break e;
                break;
              }
            }
          if (h++, d)
            d.push(g);
          else {
            g.from > l && o.push(new sn(l, g.from, p));
            let m = g.direction == Ps != !(p % 2);
            hc(i, m ? n + 1 : n, s, g.inner, g.from, g.to, o), l = g.to;
          }
          O = g.to;
        } else {
          if (O == t || (c ? Je[O] != a : Je[O] == a))
            break;
          O++;
        }
      d ? lc(i, l, O, n + 1, s, d, o) : l < O && o.push(new sn(l, O, p)), l = O;
    }
  else
    for (let l = t, h = r.length; l > e; ) {
      let c = !0, f = !1;
      if (!h || l > r[h - 1].to) {
        let g = Je[l - 1];
        g != a && (c = !1, f = g == 16);
      }
      let d = !c && a == 1 ? [] : null, p = c ? n : n + 1, O = l;
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
                if (Je[m - 1] == a)
                  break e;
                break;
              }
            }
          if (d)
            d.push(g);
          else {
            g.to < l && o.push(new sn(g.to, l, p));
            let m = g.direction == Ps != !(p % 2);
            hc(i, m ? n + 1 : n, s, g.inner, g.from, g.to, o), l = g.from;
          }
          O = g.from;
        } else {
          if (O == e || (c ? Je[O - 1] != a : Je[O - 1] == a))
            break;
          O--;
        }
      d ? lc(i, O, l, n + 1, s, d, o) : O < l && o.push(new sn(O, l, p)), l = O;
    }
}
function hc(i, e, t, n, s, r, o) {
  let a = e % 2 ? 2 : 1;
  nw(i, s, r, n, a), sw(i, s, r, n, a), rw(s, r, n, a), lc(i, s, r, e, t, n, o);
}
function ow(i, e, t) {
  if (!i)
    return [new sn(0, 0, e == lf ? 1 : 0)];
  if (e == Ps && !t.length && !iw.test(i))
    return qO(i.length);
  if (t.length)
    for (; i.length > Je.length; )
      Je[Je.length] = 256;
  let n = [], s = e == Ps ? 0 : 1;
  return hc(i, s, s, t, 0, i.length, n), n;
}
function qO(i) {
  return [new sn(0, i, 0)];
}
let WO = "";
function aw(i, e, t, n, s) {
  var r;
  let o = n.head - i.from, a = sn.find(e, o, (r = n.bidiLevel) !== null && r !== void 0 ? r : -1, n.assoc), l = e[a], h = l.side(s, t);
  if (o == h) {
    let d = a += s ? 1 : -1;
    if (d < 0 || d >= e.length)
      return null;
    l = e[a = d], o = l.side(!s, t), h = l.side(s, t);
  }
  let c = Lt(i.text, o, l.forward(s, t));
  (c < l.from || c > l.to) && (c = h), WO = i.text.slice(Math.min(o, c), Math.max(o, c));
  let f = a == (s ? e.length - 1 : 0) ? null : e[a + (s ? 1 : -1)];
  return f && c == h && f.level + (s ? 0 : 1) < l.level ? G.cursor(f.side(!s, t) + i.from, f.forward(s, t) ? 1 : -1, f.level) : G.cursor(c + i.from, l.forward(s, t) ? -1 : 1, l.level);
}
function lw(i, e, t) {
  for (let n = e; n < t; n++) {
    let s = NO(i.charCodeAt(n));
    if (s == 1)
      return Ps;
    if (s == 2 || s == 4)
      return lf;
  }
  return Ps;
}
const VO = /* @__PURE__ */ ve.define(), BO = /* @__PURE__ */ ve.define(), GO = /* @__PURE__ */ ve.define(), UO = /* @__PURE__ */ ve.define(), cc = /* @__PURE__ */ ve.define(), FO = /* @__PURE__ */ ve.define(), HO = /* @__PURE__ */ ve.define(), hf = /* @__PURE__ */ ve.define(), cf = /* @__PURE__ */ ve.define(), KO = /* @__PURE__ */ ve.define({
  combine: (i) => i.some((e) => e)
}), hw = /* @__PURE__ */ ve.define({
  combine: (i) => i.some((e) => e)
}), JO = /* @__PURE__ */ ve.define();
class Hs {
  constructor(e, t, n, s, r, o = !1) {
    this.range = e, this.y = t, this.x = n, this.yMargin = s, this.xMargin = r, this.isSnapshot = o;
  }
  map(e) {
    return e.empty ? this : new Hs(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
  clip(e) {
    return this.range.to <= e.doc.length ? this : new Hs(G.cursor(e.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
}
const Uo = /* @__PURE__ */ Ke.define({ map: (i, e) => i.map(e) }), eg = /* @__PURE__ */ Ke.define();
function ui(i, e, t) {
  let n = i.facet(UO);
  n.length ? n[0](e) : window.onerror && window.onerror(String(e), t, void 0, void 0, e) || (t ? console.error(t + ":", e) : console.error(e));
}
const bn = /* @__PURE__ */ ve.define({ combine: (i) => i.length ? i[0] : !0 });
let cw = 0;
const Ns = /* @__PURE__ */ ve.define({
  combine(i) {
    return i.filter((e, t) => {
      for (let n = 0; n < t; n++)
        if (i[n].plugin == e.plugin)
          return !1;
      return !0;
    });
  }
});
class cn {
  constructor(e, t, n, s, r) {
    this.id = e, this.create = t, this.domEventHandlers = n, this.domEventObservers = s, this.baseExtensions = r(this), this.extension = this.baseExtensions.concat(Ns.of({ plugin: this, arg: void 0 }));
  }
  /**
  Create an extension for this plugin with the given argument.
  */
  of(e) {
    return this.baseExtensions.concat(Ns.of({ plugin: this, arg: e }));
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(e, t) {
    const { eventHandlers: n, eventObservers: s, provide: r, decorations: o } = t || {};
    return new cn(cw++, e, n, s, (a) => {
      let l = [];
      return o && l.push(yl.of((h) => {
        let c = h.plugin(a);
        return c ? o(c) : tt.none;
      })), r && l.push(r(a)), l;
    });
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(e, t) {
    return cn.define((n, s) => new e(n, s), t);
  }
}
class eh {
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
            if (ui(t.state, n, "CodeMirror plugin crashed"), this.value.destroy)
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
        ui(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(e) {
    var t;
    if (!((t = this.value) === null || t === void 0) && t.destroy)
      try {
        this.value.destroy();
      } catch (n) {
        ui(e.state, n, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const tg = /* @__PURE__ */ ve.define(), ff = /* @__PURE__ */ ve.define(), yl = /* @__PURE__ */ ve.define(), ig = /* @__PURE__ */ ve.define(), uf = /* @__PURE__ */ ve.define(), Xo = /* @__PURE__ */ ve.define(), ng = /* @__PURE__ */ ve.define();
function Cu(i, e) {
  let t = i.state.facet(ng);
  if (!t.length)
    return t;
  let n = t.map((r) => r instanceof Function ? r(i) : r), s = [];
  return Ue.spans(n, e.from, e.to, {
    point() {
    },
    span(r, o, a, l) {
      let h = r - e.from, c = o - e.from, f = s;
      for (let d = a.length - 1; d >= 0; d--, l--) {
        let p = a[d].spec.bidiIsolate, O;
        if (p == null && (p = lw(e.text, h, c)), l > 0 && f.length && (O = f[f.length - 1]).to == h && O.direction == p)
          O.to = c, f = O.inner;
        else {
          let g = { from: h, to: c, direction: p, inner: [] };
          f.push(g), f = g.inner;
        }
      }
    }
  }), s;
}
const sg = /* @__PURE__ */ ve.define();
function df(i) {
  let e = 0, t = 0, n = 0, s = 0;
  for (let r of i.state.facet(sg)) {
    let o = r(i);
    o && (o.left != null && (e = Math.max(e, o.left)), o.right != null && (t = Math.max(t, o.right)), o.top != null && (n = Math.max(n, o.top)), o.bottom != null && (s = Math.max(s, o.bottom)));
  }
  return { left: e, right: t, top: n, bottom: s };
}
const Vr = /* @__PURE__ */ ve.define();
class yi {
  constructor(e, t, n, s) {
    this.fromA = e, this.toA = t, this.fromB = n, this.toB = s;
  }
  join(e) {
    return new yi(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB));
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
      let a = s < e.length ? e[s].fromB : 1e9, l = r < t.length ? t[r] : 1e9, h = Math.min(a, l);
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
      n.push(new yi(c, d, h, f));
    }
    return n;
  }
}
class ja {
  constructor(e, t, n) {
    this.view = e, this.state = t, this.transactions = n, this.flags = 0, this.startState = e.state, this.changes = Pt.empty(this.startState.doc.length);
    for (let r of n)
      this.changes = this.changes.compose(r.changes);
    let s = [];
    this.changes.iterChangedRanges((r, o, a, l) => s.push(new yi(r, o, a, l))), this.changedRanges = s;
  }
  /**
  @internal
  */
  static create(e, t, n) {
    return new ja(e, t, n);
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
const fw = [];
class pt {
  constructor(e, t, n = 0) {
    this.dom = e, this.length = t, this.flags = n, this.parent = null, e.cmTile = this;
  }
  get breakAfter() {
    return this.flags & 1;
  }
  get children() {
    return fw;
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
      t && Vy(this.dom, t);
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
    let n = Fn(this.dom), s = this.length ? e > 0 : t > 0;
    return new Li(this.parent.dom, n + (s ? 1 : 0), e == 0 || e == this.length);
  }
  markDirty(e) {
    this.flags &= -3, e && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(!1);
  }
  get overrideDOMText() {
    return null;
  }
  get root() {
    for (let e = this; e; e = e.parent)
      if (e instanceof xl)
        return e;
    return null;
  }
  static get(e) {
    return e.cmTile;
  }
}
class wl extends pt {
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
    for (let a of this.children) {
      if (a.sync(e), o += a.length + a.breakAfter, s = n ? n.nextSibling : t.firstChild, r && s != a.dom && (r.written = !0), a.dom.parentNode == t)
        for (; s && s != a.dom; )
          s = Zu(s);
      else
        t.insertBefore(a.dom, s);
      n = a.dom;
    }
    for (s = n ? n.nextSibling : t.firstChild, r && s && (r.written = !0); s; )
      s = Zu(s);
    this.length = o;
  }
}
function Zu(i) {
  let e = i.nextSibling;
  return i.parentNode.removeChild(i), e;
}
class xl extends wl {
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
      let t = pt.get(e);
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
        if (o instanceof Sn)
          t.push(s), n = o, s = 0;
        else {
          let a = r + o.length, l = e(o, r);
          if (l !== void 0)
            return l;
          r = a + o.breakAfter;
        }
      }
  }
  // Find the block at the given position. If side < -1, make sure to
  // stay before block widgets at that position, if side > 1, after
  // such widgets (used for selection drawing, which needs to be able
  // to get coordinates for positions that aren't valid cursor positions).
  resolveBlock(e, t) {
    let n, s = -1, r, o = -1;
    if (this.blockTiles((a, l) => {
      let h = l + a.length;
      if (e >= l && e <= h) {
        if (a.isWidget() && t >= -1 && t <= 1) {
          if (a.flags & 32)
            return !0;
          a.flags & 16 && (n = void 0);
        }
        (l < e || e == h && (t < -1 ? a.length : a.covers(1))) && (!n || !a.isWidget() && n.isWidget()) && (n = a, s = e - l), (h > e || e == l && (t > 1 ? a.length : a.covers(-1))) && (!r || !a.isWidget() && r.isWidget()) && (r = a, o = e - l);
      }
    }), !n && !r)
      throw new Error("No tile at position " + e);
    return n && t < 0 || !r ? { tile: n, offset: s } : { tile: r, offset: o };
  }
}
class Sn extends wl {
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
    let n = new Sn(t || document.createElement(e.tagName), e);
    return t || (n.flags |= 4), n;
  }
}
class mr extends wl {
  constructor(e, t) {
    super(e), this.attrs = t;
  }
  isLine() {
    return !0;
  }
  static start(e, t, n) {
    let s = new mr(t || document.createElement("div"), e);
    return (!t || !n) && (s.flags |= 4), s;
  }
  get domAttrs() {
    return this.attrs;
  }
  // Find the tile associated with a given position in this line.
  resolveInline(e, t, n) {
    let s = null, r = -1, o = null, a = -1;
    function l(c, f) {
      for (let d = 0, p = 0; d < c.children.length && p <= f; d++) {
        let O = c.children[d], g = p + O.length;
        g >= f && (O.isComposite() ? l(O, f - p) : (!o || o.isHidden && (t > 0 && !(o.flags & 32) || n && dw(o, O))) && (g > f || O.flags & 32) ? (o = O, a = f - p) : (p < f || O.flags & 16 && !O.isHidden) && (s = O, r = f - p)), p = g;
      }
    }
    l(this, e);
    let h = (t < 0 ? s : o) || s || o;
    return h ? { tile: h, offset: h == s ? r : a } : null;
  }
  coordsIn(e, t, n) {
    let s = this.resolveInline(e, t, !0);
    return s ? s.tile.coordsIn(Math.max(0, s.offset), t, n) : uw(this);
  }
  domIn(e, t) {
    let n = this.resolveInline(e, t);
    if (n) {
      let { tile: s, offset: r } = n;
      if (this.dom.contains(s.dom))
        return s.isText() ? new Li(s.dom, Math.min(s.dom.nodeValue.length, r)) : s.domPosFor(r, s.flags & 16 ? 1 : s.flags & 32 ? -1 : t);
      let o = n.tile.parent, a = !1;
      for (let l of o.children) {
        if (a)
          return new Li(l.dom, 0);
        l == n.tile && (a = !0);
      }
    }
    return new Li(this.dom, 0);
  }
}
function uw(i) {
  let e = i.dom.lastChild;
  if (!e)
    return i.dom.getBoundingClientRect();
  let t = so(e);
  return t[t.length - 1] || null;
}
function dw(i, e) {
  let t = i.coordsIn(0, 1), n = e.coordsIn(0, 1);
  return t && n && n.top < t.bottom;
}
class Kt extends wl {
  constructor(e, t) {
    super(e), this.mark = t;
  }
  get domAttrs() {
    return this.mark.attrs;
  }
  static of(e, t) {
    let n = new Kt(t || document.createElement(e.tagName), e);
    return t || (n.flags |= 4), n;
  }
}
class as extends pt {
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
    let r = e, o = e, a = 0;
    e == 0 && t < 0 || e == s && t >= 0 ? ae.chrome || ae.gecko || (e ? (r--, a = 1) : o < s && (o++, a = -1)) : t < 0 ? r-- : o < s && o++;
    let l = bo(this.dom, r, o).getClientRects();
    if (!l.length)
      return null;
    let h = l[(a ? a < 0 : t >= 0) ? 0 : l.length - 1];
    return ae.safari && !a && h.width == 0 && (h = Array.prototype.find.call(l, (c) => c.width) || h), n == null ? h : vo(h, (a ? a > 0 : t < 0) == n);
  }
  static of(e, t) {
    let n = new as(t || document.createTextNode(e), e);
    return t || (n.flags |= 2), n;
  }
}
class Ts extends pt {
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
      return vo(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0);
    {
      let r = this.dom.getClientRects(), o = null;
      if (!r.length)
        return null;
      let a = this.flags & 16 ? !0 : this.flags & 32 ? !1 : e > 0;
      for (let l = a ? r.length - 1 : 0; o = r[l], !(e > 0 ? l == 0 : l == r.length - 1 || o.top < o.bottom); l += a ? -1 : 1)
        ;
      return vo(o, !a);
    }
  }
  get overrideDOMText() {
    if (!this.length)
      return Ne.empty;
    let { root: e } = this;
    if (!e)
      return Ne.empty;
    let t = this.posAtStart;
    return e.view.state.doc.slice(t, t + this.length);
  }
  destroy() {
    super.destroy(), this.widget.destroy(this.dom);
  }
  static of(e, t, n, s, r) {
    return r || (r = e.toDOM(t), e.editable || (r.contentEditable = "false")), new Ts(r, n, e, s);
  }
}
class La extends pt {
  constructor(e) {
    let t = document.createElement("img");
    t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), super(t, 0, e);
  }
  get isHidden() {
    return !0;
  }
  get overrideDOMText() {
    return Ne.empty;
  }
  coordsIn(e, t, n) {
    let s = this.dom.getBoundingClientRect();
    return n == null ? s : vo(s, t > 0 == n);
  }
}
class pw {
  constructor(e) {
    this.index = 0, this.beforeBreak = !1, this.parents = [], this.tile = e;
  }
  // Advance by the given distance. If side is -1, stop leaving or
  // entering tiles, or skipping zero-length tiles, once the distance
  // has been traversed. When side is 1, leave, enter, or skip
  // everything at the end position.
  advance(e, t, n) {
    let { tile: s, index: r, beforeBreak: o, parents: a } = this;
    for (; e || t > 0; )
      if (s.isComposite())
        if (o) {
          if (!e)
            break;
          n && n.break(), e--, o = !1;
        } else if (r == s.children.length) {
          if (!e && !a.length)
            break;
          n && n.leave(s), o = !!s.breakAfter, { tile: s, index: r } = a.pop(), r++;
        } else {
          let l = s.children[r], h = l.breakAfter;
          (t > 0 ? l.length <= e : l.length < e) && (!n || n.skip(l, 0, l.length) !== !1 || !l.isComposite) ? (o = !!h, r++, e -= l.length) : (a.push({ tile: s, index: r }), s = l, r = 0, n && l.isComposite() && n.enter(l));
        }
      else if (r == s.length)
        o = !!s.breakAfter, { tile: s, index: r } = a.pop(), r++;
      else if (e) {
        let l = Math.min(e, s.length - r);
        n && n.skip(s, r, r + l), e -= l, r += l;
      } else
        break;
    return this.tile = s, this.index = r, this.beforeBreak = o, this;
  }
  get root() {
    return this.parents.length ? this.parents[0].tile : this.tile;
  }
}
class Ow {
  constructor(e, t, n, s) {
    this.from = e, this.to = t, this.wrapper = n, this.rank = s;
  }
}
class gw {
  constructor(e, t, n) {
    this.cache = e, this.root = t, this.blockWrappers = n, this.curLine = null, this.lastBlock = null, this.afterWidget = null, this.pos = 0, this.wrappers = [], this.wrapperPos = 0;
  }
  addText(e, t, n, s) {
    var r;
    this.flushBuffer();
    let o = this.ensureMarks(t, n), a = o.lastChild;
    if (a && a.isText() && !(a.flags & 8) && a.length + e.length < 512) {
      this.cache.reused.set(
        a,
        2
        /* Reused.DOM */
      );
      let l = o.children[o.children.length - 1] = new as(a.dom, a.text + e);
      l.parent = o;
    } else
      o.append(s || as.of(e, (r = this.cache.find(as)) === null || r === void 0 ? void 0 : r.dom));
    this.pos += e.length, this.afterWidget = null;
  }
  addComposition(e, t) {
    let n = this.curLine;
    n.dom != t.line.dom && (n.setDOM(this.cache.reused.has(t.line) ? th(t.line.dom) : t.line.dom), this.cache.reused.set(
      t.line,
      2
      /* Reused.DOM */
    ));
    let s = n;
    for (let a = t.marks.length - 1; a >= 0; a--) {
      let l = t.marks[a], h = s.lastChild;
      if (h instanceof Kt && h.mark.eq(l.mark))
        h.dom != l.dom && h.setDOM(th(l.dom)), s = h;
      else {
        if (this.cache.reused.get(l)) {
          let f = pt.get(l.dom);
          f && f.setDOM(th(l.dom));
        }
        let c = Kt.of(l.mark, l.dom);
        s.append(c), s = c;
      }
      this.cache.reused.set(
        l,
        2
        /* Reused.DOM */
      );
    }
    let r = pt.get(e.text);
    r && this.cache.reused.set(
      r,
      2
      /* Reused.DOM */
    );
    let o = new as(e.text, e.text.nodeValue);
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
    e || (e = rg);
    let s = mr.start(e, t || ((n = this.cache.find(mr)) === null || n === void 0 ? void 0 : n.dom), !!t);
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
      let o = e[r], a;
      if (t > 0 && (a = s.lastChild) && a instanceof Kt && a.mark.eq(o))
        s = a, t--;
      else {
        let l = Kt.of(o, (n = this.cache.find(Kt, (h) => h.mark.eq(o))) === null || n === void 0 ? void 0 : n.dom);
        s.append(l), s = l, t = 0;
      }
    }
    return s;
  }
  endLine() {
    if (this.curLine) {
      this.flushBuffer();
      let e = this.curLine.lastChild;
      (!e || !Eu(this.curLine, !1) || e.dom.nodeName != "BR" && e.isWidget() && !(ae.ios && Eu(this.curLine, !0))) && this.curLine.append(this.cache.findWidget(
        ih,
        0,
        32
        /* TileFlag.After */
      ) || new Ts(
        ih.toDOM(),
        0,
        ih,
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
        let t = e.rank * 102 + e.value.rank, n = new Ow(e.from, e.to, e.value, t), s = this.wrappers.length;
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
      if (n.from < this.pos && s instanceof Sn && s.wrapper.eq(n.wrapper))
        t = s;
      else {
        let r = Sn.of(n.wrapper, (e = this.cache.find(Sn, (o) => o.wrapper.eq(n.wrapper))) === null || e === void 0 ? void 0 : e.dom);
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
      La,
      void 0,
      1
      /* Reused.Full */
    );
    return n && (n.flags = t), n || new La(t);
  }
  flushBuffer() {
    this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
  }
}
class mw {
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
      let a = this.textOff = Math.min(e, s.length);
      return r ? null : s.slice(0, a);
    }
    let t = Math.min(this.text.length, this.textOff + e), n = this.text.slice(this.textOff, t);
    return this.textOff = t, n;
  }
}
const Ia = [Ts, mr, as, Kt, La, Sn, xl];
for (let i = 0; i < Ia.length; i++)
  Ia[i].bucket = i;
class vw {
  constructor(e) {
    this.view = e, this.buckets = Ia.map(() => []), this.index = Ia.map(() => 0), this.reused = /* @__PURE__ */ new Map();
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
    for (let a = 0; a < r.length; a++) {
      let l = (a + o) % r.length, h = r[l];
      if ((!t || t(h)) && !this.reused.has(h))
        return r.splice(l, 1), l < o && this.index[s]--, this.reused.set(h, n), h;
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
        let a = s[r];
        if (!this.reused.has(a) && (o == 0 ? a.widget.compare(e) : a.widget.constructor == e.constructor && e.updateDOM(a.dom, this.view, a.widget)))
          return s.splice(r, 1), r < this.index[0] && this.index[0]--, a.widget == e && a.length == t && (a.flags & 497) == n ? (this.reused.set(
            a,
            1
            /* Reused.Full */
          ), a) : (this.reused.set(
            a,
            2
            /* Reused.DOM */
          ), new Ts(a.dom, t, e, a.flags & -498 | n));
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
class bw {
  constructor(e, t, n, s, r) {
    this.view = e, this.decorations = s, this.disallowBlockEffectsFor = r, this.openWidget = !1, this.openMarks = 0, this.cache = new vw(e), this.text = new mw(e.state.doc), this.builder = new gw(this.cache, new xl(e, e.contentDOM), Ue.iter(n)), this.cache.reused.set(
      t,
      2
      /* Reused.DOM */
    ), this.old = new pw(t), this.reuseWalker = {
      skip: (o, a, l) => {
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
      let a = o < e.length ? e[o++] : null, l = a ? a.fromA : this.old.root.length;
      if (l > s) {
        let h = l - s;
        this.preserve(h, !o, !a), s = l, r += h;
      }
      if (!a)
        break;
      t && a.fromA <= t.range.fromA && a.toA >= t.range.toA ? (this.forward(a.fromA, t.range.fromA, t.range.fromA < t.range.toA ? 1 : -1), this.emit(r, t.range.fromB), this.builder.flushBuffer(), this.cache.clear(), this.builder.addComposition(t, n), this.text.skip(t.range.toB - t.range.fromB), this.forward(t.range.fromA, a.toA), this.emit(t.range.toB, a.toB)) : (this.forward(a.fromA, a.toA), this.emit(r, a.toB)), r = a.toB, s = a.toA;
    }
    return this.builder.curLine && this.builder.endLine(), this.builder.root;
  }
  preserve(e, t, n) {
    let s = xw(this.old), r = this.openMarks;
    this.old.advance(e, n ? 1 : -1, {
      skip: (o, a, l) => {
        if (o.isWidget())
          if (this.openWidget)
            this.builder.continueWidget(l - a);
          else {
            let h = l > 0 || a < o.length ? Ts.of(o.widget, this.view, l - a, o.flags & 496, this.cache.maybeReuse(o)) : this.cache.reuse(o);
            h.flags & 256 ? (h.flags &= -2, this.builder.addBlockWidget(h)) : (this.builder.ensureLine(null), this.builder.addInlineWidget(h, s, r), r = s.length);
          }
        else if (o.isText())
          this.builder.ensureLine(null), !a && l == o.length && !this.cache.reused.has(o) ? this.builder.addText(o.text, s, r, this.cache.reuse(o)) : (this.cache.add(o), this.builder.addText(o.text.slice(a, l), s, r)), r = s.length;
        else if (o.isLine())
          o.flags &= -2, this.cache.reused.set(
            o,
            1
            /* Reused.Full */
          ), this.builder.addLine(o);
        else if (o instanceof La)
          this.cache.add(o);
        else if (o instanceof Kt)
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
        o.isLine() ? this.builder.addLineStart(o.attrs, this.cache.maybeReuse(o)) : (this.cache.add(o), o instanceof Kt && s.unshift(o.mark)), this.openWidget = !1;
      },
      leave: (o) => {
        o.isLine() ? s.length && (s.length = r = 0) : o instanceof Kt && (s.shift(), r = Math.min(r, s.length));
      },
      break: () => {
        this.builder.addBreak(), this.openWidget = !1;
      }
    }), this.text.skip(e);
  }
  emit(e, t) {
    let n = null, s = this.builder, r = -1, o = Ue.spans(this.decorations, e, t, {
      point: (a, l, h, c, f, d) => {
        if (h instanceof _s) {
          if (this.disallowBlockEffectsFor[d]) {
            if (h.block)
              throw new RangeError("Block decorations may not be specified via plugins");
            if (l > this.view.state.doc.lineAt(a).to)
              throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
          }
          if (r = c.length, f > c.length)
            s.continueWidget(l - a);
          else {
            let p = h.widget || (h.block ? vr.block : vr.inline), O = yw(h), g = this.cache.findWidget(p, l - a, O) || Ts.of(p, this.view, l - a, O);
            h.block ? (h.startSide > 0 && s.addLineStartIfNotCovered(n), s.addBlockWidget(g)) : (s.ensureLine(n), s.addInlineWidget(g, c, f));
          }
          n = null;
        } else
          n = ww(n, h);
        l > a && this.text.skip(l - a);
      },
      span: (a, l, h, c) => {
        for (let f = a; f < l; ) {
          let d = this.text.next(Math.min(512, l - f));
          d == null ? (s.addLineStartIfNotCovered(n), s.addBreak(), f++) : (s.ensureLine(n), s.addText(d, h, f == a ? c : h.length), f += d.length), n = null;
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
      let r = pt.get(s);
      if (s == this.view.contentDOM)
        break;
      r instanceof Kt ? t.push(r) : r != null && r.isLine() ? n = r : r instanceof Sn || (s.nodeName == "DIV" && !n && s != this.view.contentDOM ? n = new mr(s, rg) : n || t.push(Kt.of(new Ro({ tagName: s.nodeName.toLowerCase(), attributes: By(s) }), s)));
    }
    return { line: n, marks: t };
  }
}
function Eu(i, e) {
  let t = (n) => {
    for (let s of n.children)
      if ((e ? s.isText() : s.length) || t(s))
        return !0;
    return !1;
  };
  return t(i);
}
function yw(i) {
  let e = i.isReplace ? (i.startSide < 0 ? 64 : 0) | (i.endSide > 0 ? 128 : 0) : i.startSide > 0 ? 32 : 16;
  return i.block && (e |= 256), e;
}
const rg = { class: "cm-line" };
function ww(i, e) {
  let t = e.spec.attributes, n = e.spec.class;
  return !t && !n || (i || (i = { class: "cm-line" }), t && of(t, i), n && (i.class += " " + n)), i;
}
function xw(i) {
  let e = [];
  for (let t = i.parents.length; t > 1; t--) {
    let n = t == i.parents.length ? i.tile : i.parents[t].tile;
    n instanceof Kt && e.push(n.mark);
  }
  return e;
}
function th(i) {
  let e = pt.get(i);
  return e && e.setDOM(i.cloneNode()), i;
}
class vr extends Pr {
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
vr.inline = /* @__PURE__ */ new vr("span");
vr.block = /* @__PURE__ */ new vr("div");
const ih = /* @__PURE__ */ new class extends Pr {
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
class Au {
  constructor(e) {
    this.view = e, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = tt.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new xl(e, e.contentDOM), this.updateInner([new yi(0, 0, 0, e.state.doc.length)], null);
  }
  // Update the document view to a given state.
  update(e) {
    var t;
    let n = e.changedRanges;
    this.minWidth > 0 && n.length && (n.every(({ fromA: c, toA: f }) => f < this.minWidthFrom || c > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
    let s = -1;
    this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((t = this.domChanged) === null || t === void 0) && t.newSel ? s = this.domChanged.newSel.head : !Zw(e.changes, this.hasComposition) && !e.selectionSet && (s = e.state.selection.main.head));
    let r = s > -1 ? kw(this.view, e.changes, s) : null;
    if (this.domChanged = null, this.hasComposition) {
      let { from: c, to: f } = this.hasComposition;
      n = new yi(c, f, e.changes.mapPos(c, -1), e.changes.mapPos(f, 1)).addToSet(n.slice());
    }
    this.hasComposition = r ? { from: r.range.fromB, to: r.range.toB } : null, (ae.ie || ae.chrome) && !r && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
    let o = this.decorations, a = this.blockWrappers;
    this.updateDeco();
    let l = _w(o, this.decorations, e.changes);
    l.length && (n = yi.extendWithRanges(n, l));
    let h = Tw(a, this.blockWrappers, e.changes);
    return h.length && (n = yi.extendWithRanges(n, h)), r && !n.some((c) => c.fromA <= r.range.fromA && c.toA >= r.range.toA) && (n = r.range.addToSet(n.slice())), this.tile.flags & 2 && n.length == 0 ? !1 : (this.updateInner(n, r), e.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(e, t) {
    this.view.viewState.mustMeasureContent = !0;
    let { observer: n } = this.view;
    n.ignore(() => {
      if (t || e.length) {
        let o = this.tile, a = new bw(this.view, o, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
        t && pt.get(t.text) && a.cache.reused.set(
          pt.get(t.text),
          2
          /* Reused.DOM */
        ), this.tile = a.run(e, t), fc(o, a.cache.reused);
      }
      this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let r = ae.chrome || ae.ios ? { node: n.selectionRange.focusNode, written: !1 } : void 0;
      this.tile.sync(r), r && (r.written || n.selectionRange.focusNode != r.node || !this.tile.dom.contains(r.node)) && (this.forceSelection = !0), this.tile.dom.style.height = "";
    });
    let s = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let r of this.tile.children)
        r.isWidget() && r.widget instanceof nh && s.push(r.dom);
    n.updateGaps(s);
  }
  updateEditContextFormatting(e) {
    this.editContextFormatting = this.editContextFormatting.map(e.changes);
    for (let t of e.transactions)
      for (let n of t.effects)
        n.is(eg) && (this.editContextFormatting = n.value);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(e = !1, t = !1) {
    (e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let { dom: n } = this.tile, s = this.view.root.activeElement, r = s == n, o = !r && !(this.view.state.facet(bn) || n.tabIndex > -1) && no(n, this.view.observer.selectionRange) && !(s && n.contains(s));
    if (!(r || t || o))
      return;
    let a = this.forceSelection;
    this.forceSelection = !1;
    let l = this.view.state.selection.main, h, c;
    if (l.empty ? c = h = this.inlineDOMNearPos(l.anchor, l.assoc || 1) : (c = this.inlineDOMNearPos(l.head, l.head == l.from ? 1 : -1), h = this.inlineDOMNearPos(l.anchor, l.anchor == l.from ? 1 : -1)), ae.gecko && l.empty && !this.hasComposition && Sw(h)) {
      let d = document.createTextNode("");
      this.view.observer.ignore(() => h.node.insertBefore(d, h.node.childNodes[h.offset] || null)), h = c = new Li(d, 0), a = !0;
    }
    let f = this.view.observer.selectionRange;
    (a || !f.focusNode || (!ro(h.node, h.offset, f.anchorNode, f.anchorOffset) || !ro(c.node, c.offset, f.focusNode, f.focusOffset)) && !this.suppressWidgetCursorChange(f, l)) && (this.view.observer.ignore(() => {
      ae.android && ae.chrome && n.contains(f.focusNode) && Cw(f.focusNode, n) && (n.blur(), n.focus({ preventScroll: !0 }));
      let d = mo(this.view.root);
      if (d) if (l.empty) {
        if (ae.gecko) {
          let p = Qw(h.node, h.offset);
          if (p && p != 3) {
            let O = (p == 1 ? IO : DO)(h.node, h.offset);
            O && (h = new Li(O.node, O.offset));
          }
        }
        d.collapse(h.node, h.offset), l.bidiLevel != null && d.caretBidiLevel !== void 0 && (d.caretBidiLevel = l.bidiLevel);
      } else if (d.extend) {
        d.collapse(h.node, h.offset);
        try {
          d.extend(c.node, c.offset);
        } catch {
        }
      } else {
        let p = document.createRange();
        l.anchor > l.head && ([h, c] = [c, h]), p.setEnd(c.node, c.offset), p.setStart(h.node, h.offset), d.removeAllRanges(), d.addRange(p);
      }
      o && this.view.root.activeElement == n && (n.blur(), s && s.focus());
    }), this.view.observer.setSelectionRange(h, c)), this.impreciseAnchor = h.precise ? null : new Li(f.anchorNode, f.anchorOffset), this.impreciseHead = c.precise ? null : new Li(f.focusNode, f.focusOffset);
  }
  // If a zero-length widget is inserted next to the cursor during
  // composition, avoid moving it across it and disrupting the
  // composition.
  suppressWidgetCursorChange(e, t) {
    return this.hasComposition && t.empty && ro(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: e } = this, t = e.state.selection.main, n = mo(e.root), { anchorNode: s, anchorOffset: r } = e.observer.selectionRange;
    if (!n || !t.empty || !t.assoc || !n.modify)
      return;
    let o = this.lineAt(t.head, t.assoc);
    if (!o)
      return;
    let a = o.posAtStart;
    if (t.head == a || t.head == a + o.length)
      return;
    let l = this.coordsAt(t.head, -1), h = this.coordsAt(t.head, 1);
    if (!l || !h || l.bottom > h.top)
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
        let o = Qn(e) == 0 ? 0 : t == 0 ? -1 : 1;
        for (; ; ) {
          let a = e.parentNode;
          if (a == n.dom)
            break;
          o == 0 && a.firstChild != a.lastChild && (e == a.firstChild ? o = -1 : o = 1), e = a;
        }
        o < 0 ? r = e : r = e.nextSibling;
      }
      if (r == n.dom.firstChild)
        return s;
      for (; r && !pt.get(r); )
        r = r.nextSibling;
      if (!r)
        return s + n.length;
      for (let o = 0, a = s; ; o++) {
        let l = n.children[o];
        if (l.dom == r)
          return a;
        a += l.length + l.breakAfter;
      }
    } else return n.isText() ? e == n.dom ? s + t : s + (t ? n.length : 0) : s;
  }
  domAtPos(e, t) {
    let { tile: n, offset: s } = this.tile.resolveBlock(e, t);
    return n.isWidget() ? n.domPosFor(s, t) : n.domIn(s, t);
  }
  inlineDOMNearPos(e, t) {
    let n, s = -1, r = !1, o, a = -1, l = !1;
    return this.tile.blockTiles((h, c) => {
      if (h.isWidget()) {
        if (h.flags & 32 && c >= e)
          return !0;
        h.flags & 16 && (r = !0);
      } else {
        let f = c + h.length;
        if (c <= e && (n = h, s = e - c, r = f < e), f >= e && !o && (o = h, a = e - c, l = c > e), c > e && o)
          return !0;
      }
    }), !n && !o ? this.domAtPos(e, t) : (r && o ? n = null : l && n && (o = null), n && t < 0 || !o ? n.domIn(s, t) : o.domIn(a, t));
  }
  // Get the coord of the element at the given side of the given
  // position. If rtl is given, flatten it using that text direction.
  coordsAt(e, t, n) {
    let { tile: s, offset: r } = this.tile.resolveBlock(e, t);
    return s.isWidget() ? s.widget instanceof nh ? null : s.coordsInWidget(r, t, !0) : s.coordsIn(r, t, n);
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
        for (let a of r.children) {
          if (a.length >= o) {
            let l = s(a, o);
            if (l)
              return l;
          }
          if (o -= a.length, o < 0)
            break;
        }
      else if (r.isText() && o < r.length) {
        let a = Lt(r.text, o);
        if (a == o)
          return null;
        let l = bo(r.dom, o, a).getClientRects();
        for (let h = 0; h < l.length; h++) {
          let c = l[h];
          if (h == l.length - 1 || c.top < c.bottom && c.left < c.right)
            return c;
        }
      }
      return null;
    }
    return s(t, n);
  }
  measureVisibleLineHeights(e) {
    let t = [], { from: n, to: s } = e, r = this.view.contentDOM.clientWidth, o = r > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, a = -1, l = this.view.textDirection == dt.LTR, h = 0, c = (f, d, p) => {
      for (let O = 0; O < f.children.length && !(d > s); O++) {
        let g = f.children[O], m = d + g.length, v = g.dom.getBoundingClientRect(), { height: Q } = v;
        if (p && !O && (h += v.top - p.top), g instanceof Sn)
          m > n && c(g, d, v);
        else if (d >= n && (h > 0 && t.push(-h), t.push(Q + h), h = 0, o)) {
          let k = g.dom.lastChild, R = k ? so(k) : [];
          if (R.length) {
            let T = R[R.length - 1], M = l ? T.right - v.left : v.right - T.left;
            M > a && (a = M, this.minWidth = r, this.minWidthFrom = d, this.minWidthTo = m);
          }
        }
        p && O == f.children.length - 1 && (h += p.bottom - v.bottom), d = m + g.breakAfter;
      }
    };
    return c(this.tile, 0, null), t;
  }
  textDirectionAt(e) {
    let { tile: t } = this.tile.resolveBlock(e, 1);
    return getComputedStyle(t.dom).direction == "rtl" ? dt.RTL : dt.LTR;
  }
  measureTextSize() {
    let e = this.tile.blockTiles((o) => {
      if (o.isLine() && o.children.length && o.length <= 20) {
        let a = 0, l;
        for (let h of o.children) {
          if (!h.isText() || /[^ -~]/.test(h.text))
            return;
          let c = so(h.dom);
          if (c.length != 1)
            return;
          a += c[0].width, l = c[0].height;
        }
        if (a)
          return {
            lineHeight: o.dom.getBoundingClientRect().height,
            charWidth: a / o.length,
            textHeight: l
          };
      }
    });
    if (e)
      return e;
    let t = document.createElement("div"), n, s, r;
    return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.tile.dom.appendChild(t);
      let o = so(t.firstChild)[0];
      n = t.getBoundingClientRect().height, s = o && o.width ? o.width / 27 : 7, r = o && o.height ? o.height : n, t.remove();
    }), { lineHeight: n, charWidth: s, textHeight: r };
  }
  computeBlockGapDeco() {
    let e = [], t = this.view.viewState;
    for (let n = 0, s = 0; ; s++) {
      let r = s == t.viewports.length ? null : t.viewports[s], o = r ? r.from - 1 : this.view.state.doc.length;
      if (o > n) {
        let a = (t.lineBlockAt(o).bottom - t.lineBlockAt(n).top) / this.view.scaleY;
        e.push(tt.replace({
          widget: new nh(a),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(n, o));
      }
      if (!r)
        break;
      n = r.to + 1;
    }
    return tt.set(e);
  }
  updateDeco() {
    let e = 1, t = this.view.state.facet(yl).map((r) => (this.dynamicDecorationMap[e++] = typeof r == "function") ? r(this.view) : r), n = !1, s = this.view.state.facet(uf).map((r, o) => {
      let a = typeof r == "function";
      return a && (n = !0), a ? r(this.view) : r;
    });
    for (s.length && (this.dynamicDecorationMap[e++] = n, t.push(Ue.join(s))), this.decorations = [
      this.editContextFormatting,
      ...t,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ]; e < this.decorations.length; )
      this.dynamicDecorationMap[e++] = !1;
    this.blockWrappers = this.view.state.facet(ig).map((r) => typeof r == "function" ? r(this.view) : r);
  }
  scrollIntoView(e) {
    if (e.isSnapshot) {
      let h = this.view.viewState.lineBlockAt(e.range.head);
      this.view.scrollDOM.scrollTop = h.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
      return;
    }
    for (let h of this.view.state.facet(JO))
      try {
        if (h(this.view, e.range, e))
          return !0;
      } catch (c) {
        ui(this.view.state, c, "scroll handler");
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
    let r = df(this.view), o = {
      left: n.left - r.left,
      top: n.top - r.top,
      right: n.right + r.right,
      bottom: n.bottom + r.bottom
    }, { offsetWidth: a, offsetHeight: l } = this.view.scrollDOM;
    if (Fy(this.view.scrollDOM, o, t.head < t.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, a), -a), Math.max(Math.min(e.yMargin, l), -l), this.view.textDirection == dt.LTR), window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (n.top > window.pageYOffset + window.visualViewport.offsetTop + window.visualViewport.height || n.bottom < window.pageYOffset + window.visualViewport.offsetTop)) {
      let h = this.view.docView.lineAt(t.head, 1);
      h && h.dom.scrollIntoView({ block: "nearest" });
    }
  }
  lineHasWidget(e) {
    let t = (n) => n.isWidget() || n.children.some(t);
    return t(this.tile.resolveBlock(e, 1).tile);
  }
  destroy() {
    fc(this.tile);
  }
}
function fc(i, e) {
  let t = e == null ? void 0 : e.get(i);
  if (t != 1) {
    t == null && i.destroy();
    for (let n of i.children)
      fc(n, e);
  }
}
function Sw(i) {
  return i.node.nodeType == 1 && i.node.firstChild && (i.offset == 0 || i.node.childNodes[i.offset - 1].contentEditable == "false") && (i.offset == i.node.childNodes.length || i.node.childNodes[i.offset].contentEditable == "false");
}
function og(i, e) {
  let t = i.observer.selectionRange;
  if (!t.focusNode)
    return null;
  let n = IO(t.focusNode, t.focusOffset), s = DO(t.focusNode, t.focusOffset), r = n || s;
  if (s && n && s.node != n.node) {
    let a = pt.get(s.node);
    if (!a || a.isText() && a.text != s.node.nodeValue)
      r = s;
    else if (i.docView.lastCompositionAfterCursor) {
      let l = pt.get(n.node);
      !l || l.isText() && l.text != n.node.nodeValue || (r = s);
    }
  }
  if (i.docView.lastCompositionAfterCursor = r != n, !r)
    return null;
  let o = e - r.offset;
  return { from: o, to: o + r.node.nodeValue.length, node: r.node };
}
function kw(i, e, t) {
  let n = og(i, t);
  if (!n)
    return null;
  let { node: s, from: r, to: o } = n, a = s.nodeValue;
  if (/[\n\r]/.test(a) || i.state.doc.sliceString(n.from, n.to) != a)
    return null;
  let l = e.invertedDesc;
  return { range: new yi(l.mapPos(r), l.mapPos(o), r, o), text: s };
}
function Qw(i, e) {
  return i.nodeType != 1 ? 0 : (e && i.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < i.childNodes.length && i.childNodes[e].contentEditable == "false" ? 2 : 0);
}
let $w = class {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    Us(e, t, this.changes);
  }
  comparePoint(e, t) {
    Us(e, t, this.changes);
  }
  boundChange(e) {
    Us(e, e, this.changes);
  }
};
function _w(i, e, t) {
  let n = new $w();
  return Ue.compare(i, e, t, n), n.changes;
}
class Pw {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    Us(e, t, this.changes);
  }
  comparePoint() {
  }
  boundChange(e) {
    Us(e, e, this.changes);
  }
}
function Tw(i, e, t) {
  let n = new Pw();
  return Ue.compare(i, e, t, n), n.changes;
}
function Cw(i, e) {
  for (let t = i; t && t != e; t = t.assignedSlot || t.parentNode)
    if (t.nodeType == 1 && t.contentEditable == "false")
      return !0;
  return !1;
}
function Zw(i, e) {
  let t = !1;
  return e && i.iterChangedRanges((n, s) => {
    n < e.to && s > e.from && (t = !0);
  }), t;
}
class nh extends Pr {
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
function Ew(i, e, t = 1) {
  let n = i.charCategorizer(e), s = i.doc.lineAt(e), r = e - s.from;
  if (s.length == 0)
    return G.cursor(e);
  r == 0 ? t = 1 : r == s.length && (t = -1);
  let o = r, a = r;
  t < 0 ? o = Lt(s.text, r, !1) : a = Lt(s.text, r);
  let l = n(s.text.slice(o, a));
  for (; o > 0; ) {
    let h = Lt(s.text, o, !1);
    if (n(s.text.slice(h, o)) != l)
      break;
    o = h;
  }
  for (; a < s.length; ) {
    let h = Lt(s.text, a);
    if (n(s.text.slice(a, h)) != l)
      break;
    a = h;
  }
  return G.undirectionalRange(o + s.from, a + s.from);
}
function Aw(i, e, t, n, s) {
  let r = Math.round((n - e.left) * i.defaultCharacterWidth);
  if (i.lineWrapping && t.height > i.defaultLineHeight * 1.5) {
    let a = i.viewState.heightOracle.textHeight, l = Math.floor((s - t.top - (i.defaultLineHeight - a) * 0.5) / a);
    r += l * i.viewState.heightOracle.lineLength;
  }
  let o = i.state.sliceDoc(t.from, t.to);
  return t.from + zy(o, r, i.state.tabSize);
}
function Rw(i, e, t) {
  let n = i.lineBlockAt(e);
  if (Array.isArray(n.type)) {
    let s;
    for (let r of n.type) {
      if (r.from > e)
        break;
      if (!(r.to < e)) {
        if (r.from < e && r.to > e)
          return r;
        (!s || r.type == $i.Text && (s.type != r.type || (t < 0 ? r.from < e : r.to > e))) && (s = r);
      }
    }
    return s || n;
  }
  return n;
}
function Mw(i, e, t, n) {
  let s = Rw(i, e.head, e.assoc || -1), r = !n || s.type != $i.Text || !(i.lineWrapping || s.widgetLineBreaks) ? null : i.coordsAtPos(e.assoc < 0 && e.head > s.from ? e.head - 1 : e.head);
  if (r) {
    let o = i.dom.getBoundingClientRect(), a = i.textDirectionAt(s.from), l = i.posAtCoords({
      x: t == (a == dt.LTR) ? o.right - 1 : o.left + 1,
      y: (r.top + r.bottom) / 2
    });
    if (l != null)
      return G.cursor(l, t ? -1 : 1);
  }
  return G.cursor(t ? s.to : s.from, t ? -1 : 1);
}
function Ru(i, e, t, n) {
  let s = i.state.doc.lineAt(e.head), r = i.bidiSpans(s), o = i.textDirectionAt(s.from);
  for (let a = e, l = null; ; ) {
    let h = aw(s, r, o, a, t), c = WO;
    if (!h) {
      if (s.number == (t ? i.state.doc.lines : 1))
        return a;
      c = `
`, s = i.state.doc.line(s.number + (t ? 1 : -1)), r = i.bidiSpans(s), h = i.visualLineSide(s, !t);
    }
    if (l) {
      if (!l(c))
        return a;
    } else {
      if (!n)
        return h;
      l = n(c);
    }
    a = h;
  }
}
function Xw(i, e, t) {
  let n = i.state.charCategorizer(e), s = n(t);
  return (r) => {
    let o = n(r);
    return s == yn.Space && (s = o), s == o;
  };
}
function jw(i, e, t, n) {
  let s = e.head, r = t ? 1 : -1;
  if (s == (t ? i.state.doc.length : 0))
    return G.cursor(s, e.assoc);
  let o = e.goalColumn, a, l = i.contentDOM.getBoundingClientRect(), h = i.coordsAtPos(s, e.assoc || ((e.empty ? t : e.head == e.from) ? 1 : -1)), c = i.documentTop;
  if (h)
    o == null && (o = h.left - l.left), a = r < 0 ? h.top : h.bottom;
  else {
    let O = i.viewState.lineBlockAt(s);
    o == null && (o = Math.min(l.right - l.left, i.defaultCharacterWidth * (s - O.from))), a = (r < 0 ? O.top : O.bottom) + c;
  }
  let f = l.left + o, d = i.viewState.heightOracle.textHeight >> 1, p = n ?? d;
  for (let O = 0; ; O += d) {
    let g = a + (p + O) * r, m = uc(i, { x: f, y: g }, !1, r);
    if (t ? g > l.bottom : g < l.top)
      return G.cursor(m.pos, m.assoc);
    let v = i.coordsAtPos(m.pos, m.assoc), Q = v ? (v.top + v.bottom) / 2 : 0;
    if (!v || (t ? Q > a : Q < a))
      return G.cursor(m.pos, m.assoc, void 0, o);
  }
}
function oo(i, e, t) {
  for (; ; ) {
    let n = 0;
    for (let s of i)
      s.between(e - 1, e + 1, (r, o, a) => {
        if (e > r && e < o) {
          let l = n || t || (e - r < o - e ? -1 : 1);
          e = l < 0 ? r : o, n = l;
        }
      });
    if (!n)
      return e;
  }
}
function ag(i, e) {
  let t = null;
  for (let n = 0; n < e.ranges.length; n++) {
    let s = e.ranges[n], r = null;
    if (s.empty) {
      let o = oo(i, s.from, 0);
      o != s.from && (r = G.cursor(o, -1));
    } else {
      let o = oo(i, s.from, -1), a = oo(i, s.to, 1);
      (o != s.from || a != s.to) && (s.undirectional ? r = G.undirectionalRange(s.from, s.to) : r = G.range(s.from == s.anchor ? o : a, s.from == s.head ? o : a));
    }
    r && (t || (t = e.ranges.slice()), t[n] = r);
  }
  return t ? G.create(t, e.mainIndex) : e;
}
function sh(i, e, t) {
  let n = oo(i.state.facet(Xo).map((s) => s(i)), t.from, e.head > t.from ? -1 : 1);
  return n == t.from ? t : G.cursor(n, n < t.from ? 1 : -1);
}
class en {
  constructor(e, t) {
    this.pos = e, this.assoc = t;
  }
}
function uc(i, e, t, n) {
  let s = i.contentDOM.getBoundingClientRect(), r = s.top + i.viewState.paddingTop, { x: o, y: a } = e, l = a - r, h;
  for (; ; ) {
    if (l < 0)
      return new en(0, 1);
    if (l > i.viewState.docHeight)
      return new en(i.state.doc.length, -1);
    if (h = i.elementAtHeight(l), n == null)
      break;
    if (h.type == $i.Text) {
      if (n < 0 ? h.to < i.viewport.from : h.from > i.viewport.to)
        break;
      let d = i.docView.coordsAt(n < 0 ? h.from : h.to, n > 0 ? -1 : 1);
      if (d && (n < 0 ? d.top <= l + r : d.bottom >= l + r))
        break;
    }
    let f = i.viewState.heightOracle.textHeight / 2;
    l = n > 0 ? h.bottom + f : h.top - f;
  }
  if (i.viewport.from >= h.to || i.viewport.to <= h.from) {
    if (t)
      return null;
    if (h.type == $i.Text) {
      let f = Aw(i, s, h, o, a);
      return new en(f, f == h.from ? 1 : -1);
    }
  }
  if (h.type != $i.Text)
    return l < (h.top + h.bottom) / 2 ? new en(h.from, 1) : new en(h.to, -1);
  let c = i.docView.lineAt(h.from, 2);
  return (!c || c.length != h.length) && (c = i.docView.lineAt(h.from, -2)), new Lw(i, o, a, i.textDirectionAt(h.from)).scanTile(c, h.from);
}
class Lw {
  constructor(e, t, n, s) {
    this.view = e, this.x = t, this.y = n, this.baseDir = s, this.line = null, this.spans = null;
  }
  bidiSpansAt(e) {
    return (!this.line || this.line.from > e || this.line.to < e) && (this.line = this.view.state.doc.lineAt(e), this.spans = this.view.bidiSpans(this.line)), this;
  }
  baseDirAt(e, t) {
    let { line: n, spans: s } = this.bidiSpansAt(e);
    return s[sn.find(s, e - n.from, -1, t)].level == this.baseDir;
  }
  dirAt(e, t) {
    let { line: n, spans: s } = this.bidiSpansAt(e);
    return s[sn.find(s, e - n.from, -1, t)].dir;
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
    let s = 0, r = e.length - 1, o = /* @__PURE__ */ new Set(), a = this.bidiIn(e[0], e[r]), l, h, c = -1, f = 1e9, d;
    e: for (; s < r; ) {
      let O = r - s, g = s + r >> 1;
      t: if (o.has(g)) {
        let v = s + Math.floor(Math.random() * O);
        for (let Q = 0; Q < O; Q++) {
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
          let Q = m[v], k = 0;
          if (!(Q.width == 0 && m.length > 1)) {
            if (Q.bottom < this.y)
              (!l || l.bottom < Q.bottom) && (l = Q), k = 1;
            else if (Q.top > this.y)
              (!h || h.top > Q.top) && (h = Q), k = -1;
            else {
              let R = Q.left > this.x ? this.x - Q.left : Q.right < this.x ? this.x - Q.right : 0, T = Math.abs(R);
              T < f && (c = g, f = T, d = Q), R && (k = R < 0 == (this.baseDir == dt.LTR) ? -1 : 1);
            }
            k == -1 && (!a || this.baseDirAt(e[g], 1)) ? r = g : k == 1 && (!a || this.baseDirAt(e[g + 1], -1)) && (s = g + 1);
          }
        }
    }
    if (!d) {
      if (!h && !l)
        return { i: e[0], after: !1 };
      let O = l && (!h || this.y - l.bottom < h.top - this.y) ? l : h;
      return this.y = (O.top + O.bottom) / 2, this.scan(e, t, !0);
    }
    if (f && !n) {
      let { top: O, bottom: g } = d;
      if (l && l.bottom > (O + O + g) / 3)
        return this.y = l.bottom - 1, this.scan(e, t, !0);
      if (h && h.top < (O + g + g) / 3)
        return this.y = h.top + 1, this.scan(e, t, !0);
    }
    let p = (a ? this.dirAt(e[c], 1) : this.baseDir) == dt.LTR;
    return {
      i: c,
      // Test whether x is closes to the start or end of this element
      after: this.x > (d.left + d.right) / 2 == p
    };
  }
  scanText(e, t) {
    let n = [];
    for (let r = 0; r < e.length; r = Lt(e.text, r))
      n.push(t + r);
    n.push(t + e.length);
    let s = this.scan(n, (r) => {
      let o = n[r] - t, a = n[r + 1] - t;
      return bo(e.dom, o, a).getClientRects();
    });
    return s.after ? new en(n[s.i + 1], -1) : new en(n[s.i], 1);
  }
  scanTile(e, t) {
    if (!e.length)
      return new en(t, 1);
    if (e.children.length == 1) {
      let a = e.children[0];
      if (a.isText())
        return this.scanText(a, t);
      if (a.isComposite())
        return this.scanTile(a, t);
    }
    let n = [t];
    for (let a = 0, l = t; a < e.children.length; a++)
      n.push(l += e.children[a].length);
    let s = this.scan(n, (a) => {
      let l = e.children[a];
      return l.flags & 48 ? null : (l.dom.nodeType == 1 ? l.dom : bo(l.dom, 0, l.length)).getClientRects();
    }), r = e.children[s.i], o = n[s.i];
    return r.isText() ? this.scanText(r, o) : r.isComposite() ? this.scanTile(r, o) : s.after ? new en(n[s.i + 1], -1) : new en(o, 1);
  }
}
const Ls = "￿";
class Iw {
  constructor(e, t) {
    this.points = e, this.view = t, this.text = "", this.lineSeparator = t.state.facet(Be.lineSeparator);
  }
  append(e) {
    this.text += e;
  }
  lineBreak() {
    this.text += Ls;
  }
  readRange(e, t) {
    if (!e)
      return this;
    let n = e.parentNode;
    for (let s = e; ; ) {
      this.findPointBefore(n, s);
      let r = this.text.length;
      this.readNode(s);
      let o = pt.get(s), a = s.nextSibling;
      if (a == t) {
        o != null && o.breakAfter && !a && n != this.view.contentDOM && this.lineBreak();
        break;
      }
      let l = pt.get(a);
      (o && l ? o.breakAfter : (o ? o.breakAfter : Xa(s)) || Xa(a) && (s.nodeName != "BR" || o != null && o.isWidget()) && this.text.length > r) && !zw(a, t) && this.lineBreak(), s = a;
    }
    return this.findPointBefore(n, t), this;
  }
  readTextNode(e) {
    let t = e.nodeValue;
    for (let n of this.points)
      n.node == e && (n.pos = this.text.length + Math.min(n.offset, t.length));
    for (let n = 0, s = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let r = -1, o = 1, a;
      if (this.lineSeparator ? (r = t.indexOf(this.lineSeparator, n), o = this.lineSeparator.length) : (a = s.exec(t)) && (r = a.index, o = a[0].length), this.append(t.slice(n, r < 0 ? t.length : r)), r < 0)
        break;
      if (this.lineBreak(), o > 1)
        for (let l of this.points)
          l.node == e && l.pos > this.text.length && (l.pos -= o - 1);
      n = r + o;
    }
  }
  readNode(e) {
    let t = pt.get(e), n = t && t.overrideDOMText;
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
      (e.nodeType == 3 ? n.node == e : e.contains(n.node)) && (n.pos = this.text.length + (Dw(e, n.node, n.offset) ? t : 0));
  }
}
function Dw(i, e, t) {
  for (; ; ) {
    if (!e || t < Qn(e))
      return !1;
    if (e == i)
      return !0;
    t = Fn(e) + 1, e = e.parentNode;
  }
}
function zw(i, e) {
  let t;
  for (; !(i == e || !i); i = i.nextSibling) {
    let n = pt.get(i);
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
class Mu {
  constructor(e, t) {
    this.node = e, this.offset = t, this.pos = -1;
  }
}
class Nw {
  constructor(e, t, n, s) {
    this.typeOver = s, this.bounds = null, this.text = "", this.domChanged = t > -1;
    let { impreciseHead: r, impreciseAnchor: o } = e.docView, a = e.state.selection;
    if (e.state.readOnly && t > -1)
      this.newSel = null;
    else if (t > -1 && (this.bounds = lg(e.docView.tile, t, n, 0))) {
      let l = r || o ? [] : qw(e), h = new Iw(l, e);
      h.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = h.text, this.newSel = Ww(l, this.bounds.from);
    } else {
      let l = e.observer.selectionRange, h = r && r.node == l.focusNode && r.offset == l.focusOffset || !oc(e.contentDOM, l.focusNode) ? a.main.head : e.docView.posFromDOM(l.focusNode, l.focusOffset), c = o && o.node == l.anchorNode && o.offset == l.anchorOffset || !oc(e.contentDOM, l.anchorNode) ? a.main.anchor : e.docView.posFromDOM(l.anchorNode, l.anchorOffset), f = e.viewport;
      if ((ae.ios || ae.chrome) && h != c && Math.min(h, c) <= a.main.from && Math.max(h, c) >= a.main.to && (f.from > 0 || f.to < e.state.doc.length)) {
        let d = Math.min(h, c), p = Math.max(h, c), O = f.from - d, g = f.to - p;
        (O == 0 || O == 1 || d == 0) && (g == 0 || g == -1 || p == e.state.doc.length) && (h = 0, c = e.state.doc.length);
      }
      if (e.inputState.composing > -1 && a.ranges.length > 1)
        this.newSel = a.replaceRange(G.range(c, h));
      else if (e.lineWrapping && c == h && !(a.main.empty && a.main.head == h) && e.inputState.lastTouchTime > Date.now() - 100) {
        let d = e.coordsAtPos(h, -1), p = 0;
        d && (p = e.inputState.lastTouchY <= d.bottom ? -1 : 1), this.newSel = G.create([G.cursor(h, p)]);
      } else
        this.newSel = G.single(c, h);
    }
  }
}
function lg(i, e, t, n) {
  if (i.isComposite()) {
    let s = -1, r = -1, o = -1, a = -1;
    for (let l = 0, h = n, c = n; l < i.children.length; l++) {
      let f = i.children[l], d = h + f.length;
      if (h < e && d > t)
        return lg(f, e, t, h);
      if (d >= e && s == -1 && (s = l, r = h), h > t && f.dom.parentNode == i.dom) {
        o = l, a = c;
        break;
      }
      c = d, h = d + f.breakAfter;
    }
    return {
      from: r,
      to: a < 0 ? n + i.length : a,
      startDOM: (s ? i.children[s - 1].dom.nextSibling : null) || i.dom.firstChild,
      endDOM: o < i.children.length && o >= 0 ? i.children[o].dom : null
    };
  } else return i.isText() ? { from: n, to: n + i.length, startDOM: i.dom, endDOM: i.dom.nextSibling } : null;
}
function hg(i, e) {
  let t, { newSel: n } = e, { state: s } = i, r = s.selection.main, o = i.inputState.lastKeyTime > Date.now() - 100 ? i.inputState.lastKeyCode : -1;
  if (e.bounds) {
    let { from: a, to: l } = e.bounds, h = r.from, c = null;
    (o === 8 || ae.android && e.text.length < l - a) && (h = r.to, c = "end");
    let f = s.doc.sliceString(a, l, Ls), d, p;
    !r.empty && r.from >= a && r.to <= l && (e.typeOver || f != e.text) && f.slice(0, r.from - a) == e.text.slice(0, r.from - a) && f.slice(r.to - a) == e.text.slice(d = e.text.length - (f.length - (r.to - a))) ? t = {
      from: r.from,
      to: r.to,
      insert: Ne.of(e.text.slice(r.from - a, d).split(Ls))
    } : (p = cg(f, e.text, h - a, c)) && (ae.chrome && o == 13 && p.toB == p.from + 2 && e.text.slice(p.from, p.toB) == Ls + Ls && p.toB--, t = {
      from: a + p.from,
      to: a + p.toA,
      insert: Ne.of(e.text.slice(p.from, p.toB).split(Ls))
    });
  } else n && (!i.hasFocus && s.facet(bn) || Da(n, r)) && (n = null);
  if (!t && !n)
    return !1;
  if ((ae.mac || ae.android) && t && t.from == t.to && t.from == r.head - 1 && /^\. ?$/.test(t.insert.toString()) && i.contentDOM.getAttribute("autocorrect") == "off" ? (n && t.insert.length == 2 && (n = G.single(n.main.anchor - 1, n.main.head - 1)), t = { from: t.from, to: t.to, insert: Ne.of([t.insert.toString().replace(".", " ")]) }) : s.doc.lineAt(r.from).to < r.to && i.docView.lineHasWidget(r.to) && i.inputState.insertingTextAt > Date.now() - 50 ? t = {
    from: r.from,
    to: r.to,
    insert: s.toText(i.inputState.insertingText)
  } : ae.chrome && t && t.from == t.to && t.from == r.head && t.insert.toString() == `
 ` && i.lineWrapping && (n && (n = G.single(n.main.anchor - 1, n.main.head - 1)), t = { from: r.from, to: r.to, insert: Ne.of([" "]) }), t)
    return pf(i, t, n, o);
  if (n && !Da(n, r)) {
    let a = !1, l = "select";
    return i.inputState.lastSelectionTime > Date.now() - 50 && (i.inputState.lastSelectionOrigin == "select" && (a = !0), l = i.inputState.lastSelectionOrigin, l == "select.pointer" && (n = ag(s.facet(Xo).map((h) => h(i)), n))), i.dispatch({ selection: n, scrollIntoView: a, userEvent: l }), !0;
  } else
    return !1;
}
function pf(i, e, t, n = -1) {
  if (ae.ios && i.inputState.flushIOSKey(e))
    return !0;
  let s = i.state.selection.main;
  if (ae.android && (e.to == s.to && // GBoard will sometimes remove a space it just inserted
  // after a completion when you press enter
  (e.from == s.from || e.from == s.from - 1 && i.state.sliceDoc(e.from, s.from) == " ") && e.insert.length == 1 && e.insert.lines == 2 && Fs(i.contentDOM, "Enter", 13) || (e.from == s.from - 1 && e.to == s.to && e.insert.length == 0 || n == 8 && e.insert.length < e.to - e.from && e.to > s.head) && Fs(i.contentDOM, "Backspace", 8) || e.from == s.from && e.to == s.to + 1 && e.insert.length == 0 && Fs(i.contentDOM, "Delete", 46)))
    return !0;
  let r = e.insert.toString();
  i.inputState.composing >= 0 && i.inputState.composing++;
  let o, a = () => o || (o = Yw(i, e, t));
  return i.state.facet(FO).some((l) => l(i, e.from, e.to, r, a)) || i.dispatch(a()), !0;
}
function Yw(i, e, t) {
  let n, s = i.state, r = s.selection.main, o = -1;
  if (e.from == e.to && e.from < r.from || e.from > r.to) {
    let l = e.from < r.from ? -1 : 1, h = l < 0 ? r.from : r.to, c = oo(s.facet(Xo).map((f) => f(i)), h, l);
    e.from == c && (o = c);
  }
  if (o > -1)
    n = {
      changes: e,
      selection: G.cursor(e.from + e.insert.length, -1)
    };
  else if (e.from >= r.from && e.to <= r.to && e.to - e.from >= (r.to - r.from) / 3 && (!t || t.main.empty && t.main.from == e.from + e.insert.length) && i.inputState.composing < 0) {
    let l = r.from < e.from ? s.sliceDoc(r.from, e.from) : "", h = r.to > e.to ? s.sliceDoc(e.to, r.to) : "";
    n = s.replaceSelection(i.state.toText(l + e.insert.sliceString(0, void 0, i.state.lineBreak) + h));
  } else {
    let l = s.changes(e), h = t && t.main.to <= l.newLength ? t.main : void 0;
    if (s.selection.ranges.length > 1 && (i.inputState.composing >= 0 || i.inputState.compositionPendingChange) && e.to <= r.to + 10 && e.to >= r.to - 10) {
      let c = i.state.sliceDoc(e.from, e.to), f, d = t && og(i, t.main.head);
      if (d) {
        let O = e.insert.length - (e.to - e.from);
        f = { from: d.from, to: d.to - O };
      } else
        f = i.state.doc.lineAt(r.head);
      let p = r.to - e.to;
      n = s.changeByRange((O) => {
        if (O.from == r.from && O.to == r.to)
          return { changes: l, range: h || O.map(l) };
        let g = O.to - p, m = g - c.length;
        if (i.state.sliceDoc(m, g) != c || // Unfortunately, there's no way to make multiple
        // changes in the same node work without aborting
        // composition, so cursors in the composition range are
        // ignored.
        g >= f.from && m <= f.to)
          return { range: O };
        let v = s.changes({ from: m, to: g, insert: e.insert }), Q = O.to - r.to;
        return {
          changes: v,
          range: h ? G.range(Math.max(0, h.anchor + Q), Math.max(0, h.head + Q)) : O.map(v)
        };
      });
    } else
      n = {
        changes: l,
        selection: h && s.selection.replaceRange(h)
      };
  }
  let a = "input.type";
  return (i.composing || i.inputState.compositionPendingChange && i.inputState.compositionEndedAt > Date.now() - 50) && (i.inputState.compositionPendingChange = !1, a += ".compose", i.inputState.compositionFirstChange && (a += ".start", i.inputState.compositionFirstChange = !1)), s.update(n, { userEvent: a, scrollIntoView: !0 });
}
function cg(i, e, t, n) {
  let s = Math.min(i.length, e.length), r = 0;
  for (; r < s && i.charCodeAt(r) == e.charCodeAt(r); )
    r++;
  if (r == s && i.length == e.length)
    return null;
  let o = i.length, a = e.length;
  for (; o > 0 && a > 0 && i.charCodeAt(o - 1) == e.charCodeAt(a - 1); )
    o--, a--;
  if (n == "end") {
    let l = Math.max(0, r - Math.min(o, a));
    t -= o + l - r;
  }
  if (o < r && i.length < e.length) {
    let l = t <= r && t >= o ? r - t : 0;
    r -= l, a = r + (a - o), o = r;
  } else if (a < r) {
    let l = t <= r && t >= a ? r - t : 0;
    r -= l, o = r + (o - a), a = r;
  }
  return { from: r, toA: o, toB: a };
}
function qw(i) {
  let e = [];
  if (i.root.activeElement != i.contentDOM)
    return e;
  let { anchorNode: t, anchorOffset: n, focusNode: s, focusOffset: r } = i.observer.selectionRange;
  return t && (e.push(new Mu(t, n)), (s != t || r != n) && e.push(new Mu(s, r))), e;
}
function Ww(i, e) {
  if (i.length == 0)
    return null;
  let t = i[0].pos, n = i.length == 2 ? i[1].pos : t;
  return t > -1 && n > -1 ? G.single(t + e, n + e) : null;
}
function Da(i, e) {
  return e.head == i.main.head && e.anchor == i.main.anchor;
}
class Vw {
  setSelectionOrigin(e) {
    this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
  }
  constructor(e) {
    this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.touchActive = !1, this.lastTouchTime = 0, this.lastTouchX = 0, this.lastTouchY = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.lastWheelEvent = 0, this.pendingIOSKey = void 0, this.lastIOSMomentumScroll = 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, ae.safari && e.contentDOM.addEventListener("input", () => null), ae.gecko && lx(e.contentDOM.ownerDocument);
  }
  handleEvent(e) {
    !tx(this.view, e) || this.ignoreDuringComposition(e) || e.type == "keydown" && this.keydown(e) || (this.view.updateState != 0 ? Promise.resolve().then(() => this.runHandlers(e.type, e)) : this.runHandlers(e.type, e));
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
    let t = Gw(e), n = this.handlers, s = this.view.contentDOM;
    for (let r in t)
      if (r != "scroll") {
        let o = !t[r].handlers.length, a = n[r];
        a && o != !a.handlers.length && (s.removeEventListener(r, this.handleEvent), a = null), a || s.addEventListener(r, this.handleEvent, { passive: o });
      }
    for (let r in n)
      r != "scroll" && !t[r] && s.removeEventListener(r, this.handleEvent);
    this.handlers = t;
  }
  keydown(e) {
    if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), e.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
      return !0;
    if (this.tabFocusMode > 0 && e.keyCode != 27 && ug.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), ae.android && ae.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8))
      return this.view.observer.delayAndroidKey(e.key, e.keyCode), !0;
    if (ae.ios && !e.synthetic && !e.altKey && !e.metaKey && (fg.some((t) => t.keyCode == e.keyCode) && !e.ctrlKey || Uw.indexOf(e.key) > -1 && e.ctrlKey)) {
      let t = { ctrlKey: e.ctrlKey, altKey: e.altKey, metaKey: e.metaKey, shiftKey: e.shiftKey };
      return t.shiftKey && ae.ios && !/^(off|none)$/.test(this.view.contentDOM.autocapitalize) && Bw(this.view.win) && (t.shiftKey = !1), this.pendingIOSKey = { key: e.key, keyCode: e.keyCode, mods: t }, setTimeout(() => this.flushIOSKey(), 250), !0;
    }
    return e.keyCode != 229 && this.view.observer.forceFlush(), !1;
  }
  flushIOSKey(e) {
    let t = this.pendingIOSKey;
    return !t || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, Fs(this.view.contentDOM, t.key, t.keyCode, t.mods));
  }
  ignoreDuringComposition(e) {
    return !/^key/.test(e.type) || e.synthetic ? !1 : this.composing > 0 ? !0 : ae.safari && !ae.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1;
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
function Bw(i) {
  return i.visualViewport ? i.visualViewport.height * i.visualViewport.scale / i.document.documentElement.clientHeight < 0.85 : !1;
}
function Xu(i, e) {
  return (t, n) => {
    try {
      return e.call(i, n, t);
    } catch (s) {
      ui(t.state, s);
    }
  };
}
function Gw(i) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(n) {
    return e[n] || (e[n] = { observers: [], handlers: [] });
  }
  for (let n of i) {
    let s = n.spec, r = s && s.plugin.domEventHandlers, o = s && s.plugin.domEventObservers;
    if (r)
      for (let a in r) {
        let l = r[a];
        l && t(a).handlers.push(Xu(n.value, l));
      }
    if (o)
      for (let a in o) {
        let l = o[a];
        l && t(a).observers.push(Xu(n.value, l));
      }
  }
  for (let n in Ni)
    t(n).handlers.push(Ni[n]);
  for (let n in Vt)
    t(n).observers.push(Vt[n]);
  return e;
}
const fg = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], Uw = "dthko", ug = [16, 17, 18, 20, 91, 92, 224, 225], Fo = 6;
function Ho(i) {
  return Math.max(0, i) * 0.7 + 8;
}
function Fw(i, e) {
  return Math.max(Math.abs(i.clientX - e.clientX), Math.abs(i.clientY - e.clientY));
}
class Hw {
  constructor(e, t, n, s) {
    this.view = e, this.startEvent = t, this.style = n, this.mustSelect = s, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = t, this.scrollParents = XO(e.contentDOM), this.atoms = e.state.facet(Xo).map((o) => o(e));
    let r = e.contentDOM.ownerDocument;
    r.addEventListener("mousemove", this.move = this.move.bind(this)), r.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(Be.allowMultipleSelections) && Kw(e, t), this.dragging = ex(e, t) && Og(t) == 1 ? null : !1;
  }
  start(e) {
    this.dragging === !1 && this.select(e);
  }
  move(e) {
    if (e.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && Fw(this.startEvent, e) < 10)
      return;
    this.select(this.lastEvent = e);
    let t = 0, n = 0, s = 0, r = 0, o = this.view.win.innerWidth, a = this.view.win.innerHeight;
    this.scrollParents.x && ({ left: s, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: r, bottom: a } = this.scrollParents.y.getBoundingClientRect());
    let l = df(this.view);
    e.clientX - l.left <= s + Fo ? t = -Ho(s - e.clientX) : e.clientX + l.right >= o - Fo && (t = Ho(e.clientX - o)), e.clientY - l.top <= r + Fo ? n = -Ho(r - e.clientY) : e.clientY + l.bottom >= a - Fo && (n = Ho(e.clientY - a)), this.setScrollSpeed(t, n);
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
    let { view: t } = this, n = ag(this.atoms, this.style.get(e, this.extend, this.multiple));
    (this.mustSelect || !n.eq(t.state.selection, this.dragging === !1)) && this.view.dispatch({
      selection: n,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(e) {
    e.transactions.some((t) => t.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function Kw(i, e) {
  let t = i.state.facet(VO);
  return t.length ? t[0](e) : ae.mac ? e.metaKey : e.ctrlKey;
}
function Jw(i, e) {
  let t = i.state.facet(BO);
  return t.length ? t[0](e) : ae.mac ? !e.altKey : !e.ctrlKey;
}
function ex(i, e) {
  let { main: t } = i.state.selection;
  if (t.empty)
    return !1;
  let n = mo(i.root);
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
function tx(i, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target, n; t != i.contentDOM; t = t.parentNode)
    if (!t || t.nodeType == 11 || (n = pt.get(t)) && n.isWidget() && !n.isHidden && n.widget.ignoreEvent(e))
      return !1;
  return !0;
}
const Ni = /* @__PURE__ */ Object.create(null), Vt = /* @__PURE__ */ Object.create(null), dg = ae.ie && ae.ie_version < 15 || ae.ios && ae.webkit_version < 604;
function ix(i) {
  let e = i.dom.parentNode;
  if (!e)
    return;
  let t = e.appendChild(document.createElement("textarea"));
  t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
    i.focus(), t.remove(), pg(i, t.value);
  }, 50);
}
function Sl(i, e, t) {
  for (let n of i.facet(e))
    t = n(t, i);
  return t;
}
function pg(i, e) {
  e = Sl(i.state, hf, e);
  let { state: t } = i, n, s = 1, r = t.toText(e), o = r.lines == t.selection.ranges.length;
  if (dc != null && t.selection.ranges.every((l) => l.empty) && dc == r.toString()) {
    let l = -1;
    n = t.changeByRange((h) => {
      let c = t.doc.lineAt(h.from);
      if (c.from == l)
        return { range: h };
      l = c.from;
      let f = t.toText((o ? r.line(s++).text : e) + t.lineBreak);
      return {
        changes: { from: c.from, insert: f },
        range: G.cursor(h.from + f.length)
      };
    });
  } else o ? n = t.changeByRange((l) => {
    let h = r.line(s++);
    return {
      changes: { from: l.from, to: l.to, insert: h.text },
      range: G.cursor(l.from + h.length)
    };
  }) : n = t.replaceSelection(r);
  i.dispatch(n, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
Vt.scroll = (i) => {
  let e = i.inputState;
  e.lastScrollTop = i.scrollDOM.scrollTop, e.lastScrollLeft = i.scrollDOM.scrollLeft, ae.ios && !e.touchActive && (e.lastIOSMomentumScroll = Date.now());
};
Vt.wheel = Vt.mousewheel = (i) => {
  i.inputState.lastWheelEvent = Date.now();
};
Ni.keydown = (i, e) => (i.inputState.setSelectionOrigin("select"), e.keyCode == 27 && i.inputState.tabFocusMode != 0 && (i.inputState.tabFocusMode = Date.now() + 2e3), !1);
Vt.touchstart = (i, e) => {
  let t = i.inputState, n = e.targetTouches[0];
  t.touchActive = !0, t.lastTouchTime = Date.now(), n && (t.lastTouchX = n.clientX, t.lastTouchY = n.clientY), t.setSelectionOrigin("select.pointer");
};
Vt.touchmove = (i) => {
  i.inputState.setSelectionOrigin("select.pointer");
};
Vt.touchend = (i, e) => {
  i.inputState.touchActive = !1;
};
Ni.mousedown = (i, e) => {
  if (i.observer.flush(), i.inputState.lastTouchTime > Date.now() - 2e3)
    return !1;
  let t = null;
  for (let n of i.state.facet(GO))
    if (t = n(i, e), t)
      break;
  if (!t && e.button == 0 && (t = sx(i, e)), t) {
    let n = !i.hasFocus;
    i.inputState.startMouseSelection(new Hw(i, e, t, n)), n && i.observer.ignore(() => {
      jO(i.contentDOM);
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
function ju(i, e, t, n) {
  if (n == 1)
    return G.cursor(e, t);
  if (n == 2)
    return Ew(i.state, e, t);
  {
    let s = i.docView.lineAt(e, t), r = i.state.doc.lineAt(s ? s.posAtEnd : e), o = s ? s.posAtStart : r.from, a = s ? s.posAtEnd : r.to;
    return a < i.state.doc.length && a == r.to && a++, G.undirectionalRange(o, a);
  }
}
const nx = ae.ie && ae.ie_version <= 11;
let Lu = null, Iu = 0, Du = 0;
function Og(i) {
  if (!nx)
    return i.detail;
  let e = Lu, t = Du;
  return Lu = i, Du = Date.now(), Iu = !e || t > Date.now() - 400 && Math.abs(e.clientX - i.clientX) < 2 && Math.abs(e.clientY - i.clientY) < 2 ? (Iu + 1) % 3 : 1;
}
function sx(i, e) {
  let t = i.posAndSideAtCoords({ x: e.clientX, y: e.clientY }, !1), n = Og(e), s = i.state.selection;
  return {
    update(r) {
      r.docChanged && (t.pos = r.changes.mapPos(t.pos), s = s.map(r.changes));
    },
    get(r, o, a) {
      let l = i.posAndSideAtCoords({ x: r.clientX, y: r.clientY }, !1), h, c = ju(i, l.pos, l.assoc, n);
      if (t.pos != l.pos && !o) {
        let f = ju(i, t.pos, t.assoc, n), d = Math.min(f.from, c.from), p = Math.max(f.to, c.to);
        c = d < c.from ? G.range(d, p, c.assoc) : G.range(p, d, c.assoc);
      }
      return o ? s.replaceRange(s.main.extend(c.from, c.to, c.assoc)) : a && n == 1 && s.ranges.length > 1 && (h = rx(s, l.pos)) ? h : a ? s.addRange(c) : G.create([c]);
    }
  };
}
function rx(i, e) {
  for (let t = 0; t < i.ranges.length; t++) {
    let { from: n, to: s } = i.ranges[t];
    if (n <= e && s >= e)
      return G.create(i.ranges.slice(0, t).concat(i.ranges.slice(t + 1)), i.mainIndex == t ? 0 : i.mainIndex - (i.mainIndex > t ? 1 : 0));
  }
  return null;
}
Ni.dragstart = (i, e) => {
  let { selection: { main: t } } = i.state;
  if (e.target.draggable) {
    let s = i.docView.tile.nearest(e.target);
    if (s && s.isWidget()) {
      let r = s.posAtStart, o = r + s.length;
      (r >= t.to || o <= t.from) && (t = G.undirectionalRange(r, o));
    }
  }
  let { inputState: n } = i;
  return n.mouseSelection && (n.mouseSelection.dragging = !0), n.draggedContent = t, e.dataTransfer && (e.dataTransfer.setData("Text", Sl(i.state, cf, i.state.sliceDoc(t.from, t.to))), e.dataTransfer.effectAllowed = "copyMove"), !1;
};
Ni.dragend = (i) => (i.inputState.draggedContent = null, !1);
function zu(i, e, t, n) {
  if (t = Sl(i.state, hf, t), !t)
    return;
  let s = i.posAtCoords({ x: e.clientX, y: e.clientY }, !1), { draggedContent: r } = i.inputState, o = n && r && Jw(i, e) ? { from: r.from, to: r.to } : null, a = { from: s, insert: t }, l = i.state.changes(o ? [o, a] : a);
  i.focus(), i.dispatch({
    changes: l,
    selection: { anchor: l.mapPos(s, -1), head: l.mapPos(s, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  }), i.inputState.draggedContent = null;
}
Ni.drop = (i, e) => {
  if (!e.dataTransfer)
    return !1;
  if (i.state.readOnly)
    return !0;
  let t = e.dataTransfer.files;
  if (t && t.length) {
    let n = Array(t.length), s = 0, r = () => {
      ++s == t.length && zu(i, e, n.filter((o) => o != null).join(i.state.lineBreak), !1);
    };
    for (let o = 0; o < t.length; o++) {
      let a = new FileReader();
      a.onerror = r, a.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(a.result) || (n[o] = a.result), r();
      }, a.readAsText(t[o]);
    }
    return !0;
  } else {
    let n = e.dataTransfer.getData("Text");
    if (n)
      return zu(i, e, n, !0), !0;
  }
  return !1;
};
Ni.paste = (i, e) => {
  if (i.state.readOnly)
    return !0;
  i.observer.flush();
  let t = dg ? null : e.clipboardData;
  return t ? (pg(i, t.getData("text/plain") || t.getData("text/uri-list")), !0) : (ix(i), !1);
};
function ox(i, e) {
  let t = i.dom.parentNode;
  if (!t)
    return;
  let n = t.appendChild(document.createElement("textarea"));
  n.style.cssText = "position: fixed; left: -10000px; top: 10px", n.value = e, n.focus(), n.selectionEnd = e.length, n.selectionStart = 0, setTimeout(() => {
    n.remove(), i.focus();
  }, 50);
}
function ax(i) {
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
  return { text: Sl(i, cf, e.join(i.lineBreak)), ranges: t, linewise: n };
}
let dc = null;
Ni.copy = Ni.cut = (i, e) => {
  if (!no(i.contentDOM, i.observer.selectionRange))
    return !1;
  let { text: t, ranges: n, linewise: s } = ax(i.state);
  if (!t && !s)
    return !1;
  dc = s ? t : null, e.type == "cut" && !i.state.readOnly && i.dispatch({
    changes: n,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
  let r = dg ? null : e.clipboardData;
  return r ? (r.clearData(), r.setData("text/plain", t), !0) : (ox(i, t), !1);
};
const gg = /* @__PURE__ */ Tn.define();
function mg(i, e) {
  let t = [];
  for (let n of i.facet(HO)) {
    let s = n(i, e);
    s && t.push(s);
  }
  return t.length ? i.update({ effects: t, annotations: gg.of(!0) }) : null;
}
function vg(i) {
  setTimeout(() => {
    let e = i.hasFocus;
    if (e != i.inputState.notifiedFocused) {
      let t = mg(i.state, e);
      t ? i.dispatch(t) : i.update([]);
    }
  }, 10);
}
Vt.focus = (i) => {
  i.inputState.lastFocusTime = Date.now(), !i.scrollDOM.scrollTop && (i.inputState.lastScrollTop || i.inputState.lastScrollLeft) && (i.scrollDOM.scrollTop = i.inputState.lastScrollTop, i.scrollDOM.scrollLeft = i.inputState.lastScrollLeft), vg(i);
};
Vt.blur = (i) => {
  i.observer.clearSelectionRange(), vg(i);
};
Vt.compositionstart = Vt.compositionupdate = (i) => {
  i.observer.editContext || (i.inputState.compositionFirstChange == null && (i.inputState.compositionFirstChange = !0), i.inputState.composing < 0 && (i.inputState.composing = 0));
};
Vt.compositionend = (i) => {
  i.observer.editContext || (i.inputState.composing = -1, i.inputState.compositionEndedAt = Date.now(), i.inputState.compositionPendingKey = !0, i.inputState.compositionPendingChange = i.observer.pendingRecords().length > 0, i.inputState.compositionFirstChange = null, ae.chrome && ae.android ? i.observer.flushSoon() : i.inputState.compositionPendingChange ? Promise.resolve().then(() => i.observer.flush()) : setTimeout(() => {
    i.inputState.composing < 0 && i.docView.hasComposition && i.update([]);
  }, 50));
};
Vt.contextmenu = (i) => {
  i.inputState.lastContextMenu = Date.now();
};
Ni.beforeinput = (i, e) => {
  var t, n;
  if ((e.inputType == "insertText" || e.inputType == "insertCompositionText") && (i.inputState.insertingText = e.data, i.inputState.insertingTextAt = Date.now()), e.inputType == "insertReplacementText" && i.observer.editContext) {
    let r = (t = e.dataTransfer) === null || t === void 0 ? void 0 : t.getData("text/plain"), o = e.getTargetRanges();
    if (r && o.length) {
      let a = o[0], l = i.posAtDOM(a.startContainer, a.startOffset), h = i.posAtDOM(a.endContainer, a.endOffset);
      return pf(i, { from: l, to: h, insert: i.state.toText(r) }, null), !0;
    }
  }
  let s;
  if (ae.chrome && ae.android && (s = fg.find((r) => r.inputType == e.inputType)) && (i.observer.delayAndroidKey(s.key, s.keyCode), s.key == "Backspace" || s.key == "Delete")) {
    let r = ((n = window.visualViewport) === null || n === void 0 ? void 0 : n.height) || 0;
    setTimeout(() => {
      var o;
      (((o = window.visualViewport) === null || o === void 0 ? void 0 : o.height) || 0) > r + 10 && i.hasFocus && (i.contentDOM.blur(), i.focus());
    }, 100);
  }
  return ae.ios && e.inputType == "deleteContentForward" && i.observer.flushSoon(), ae.safari && e.inputType == "insertText" && i.inputState.composing >= 0 && setTimeout(() => Vt.compositionend(i, e), 20), !1;
};
const Nu = /* @__PURE__ */ new Set();
function lx(i) {
  Nu.has(i) || (Nu.add(i), i.addEventListener("copy", () => {
  }), i.addEventListener("cut", () => {
  }));
}
const Yu = ["pre-wrap", "normal", "pre-line", "break-spaces"];
let br = !1;
function qu() {
  br = !1;
}
class hx {
  constructor(e) {
    this.lineWrapping = e, this.doc = Ne.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
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
    return Yu.indexOf(e) > -1 != this.lineWrapping;
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
    let a = Yu.indexOf(e) > -1, l = Math.abs(t - this.lineHeight) > 0.3 || this.lineWrapping != a;
    if (this.lineWrapping = a, this.lineHeight = t, this.charWidth = n, this.textHeight = s, this.lineLength = r, l) {
      this.heightSamples = {};
      for (let h = 0; h < o.length; h++) {
        let c = o[h];
        c < 0 ? h++ : this.heightSamples[Math.floor(c * 10)] = !0;
      }
    }
    return l;
  }
}
class cx {
  constructor(e, t) {
    this.from = e, this.heights = t, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class Mi {
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
    return typeof this._content == "number" ? $i.Text : Array.isArray(this._content) ? this._content : this._content.type;
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
    return this._content instanceof _s ? this._content.widget : null;
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
    return new Mi(this.from, this.length + e.length, this.top, this.height + e.height, t);
  }
}
var st = /* @__PURE__ */ (function(i) {
  return i[i.ByPos = 0] = "ByPos", i[i.ByHeight = 1] = "ByHeight", i[i.ByPosNoHeight = 2] = "ByPosNoHeight", i;
})(st || (st = {}));
const ya = 1e-3;
class Wt {
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
    this.height != e && (Math.abs(this.height - e) > ya && (br = !0), this.height = e);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(e, t, n) {
    return Wt.of(n);
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
    for (let a = s.length - 1; a >= 0; a--) {
      let { fromA: l, toA: h, fromB: c, toB: f } = s[a], d = r.lineAt(l, st.ByPosNoHeight, n.setDoc(t), 0, 0), p = d.to >= h ? d : r.lineAt(h, st.ByPosNoHeight, n, 0, 0);
      for (f += p.to - h, h = p.to; a > 0 && d.from <= s[a - 1].toA; )
        l = s[a - 1].fromA, c = s[a - 1].fromB, a--, l < d.from && (d = r.lineAt(l, st.ByPosNoHeight, n, 0, 0));
      c += d.from - l, l = d.from;
      let O = Of.build(n.setDoc(o), e, c, f);
      r = za(r, r.replace(l, h, O));
    }
    return r.updateHeight(n, 0);
  }
  static empty() {
    return new fi(0, 0, 0);
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
          let a = e[t - 1];
          a.break ? e.splice(--t, 1, a.left, null, a.right) : e.splice(--t, 1, a.left, a.right), n += 1 + a.break, s -= a.size;
        } else if (r > s * 2) {
          let a = e[n];
          a.break ? e.splice(n, 1, a.left, null, a.right) : e.splice(n, 1, a.left, a.right), n += 2 + a.break, r -= a.size;
        } else
          break;
      else if (s < r) {
        let a = e[t++];
        a && (s += a.size);
      } else {
        let a = e[--n];
        a && (r += a.size);
      }
    let o = 0;
    return e[t - 1] == null ? (o = 1, t--) : e[t] == null && (o = 1, n++), new ux(Wt.of(e.slice(0, t)), o, Wt.of(e.slice(n)));
  }
}
function za(i, e) {
  return i == e ? i : (i.constructor != e.constructor && (br = !0), e);
}
Wt.prototype.size = 1;
const fx = /* @__PURE__ */ tt.replace({});
class bg extends Wt {
  constructor(e, t, n) {
    super(e, t), this.deco = n, this.spaceAbove = 0;
  }
  mainBlock(e, t) {
    return new Mi(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
  }
  blockAt(e, t, n, s) {
    return this.spaceAbove && e < n + this.spaceAbove ? new Mi(s, 0, n, this.spaceAbove, fx) : this.mainBlock(n, s);
  }
  lineAt(e, t, n, s, r) {
    let o = this.mainBlock(s, r);
    return this.spaceAbove ? this.blockAt(0, n, s, r).join(o) : o;
  }
  forEachLine(e, t, n, s, r, o) {
    e <= r + this.length && t >= r && o(this.lineAt(0, st.ByPos, n, s, r));
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
class fi extends bg {
  constructor(e, t, n) {
    super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = n;
  }
  mainBlock(e, t) {
    return new Mi(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
  }
  replace(e, t, n) {
    let s = n[0];
    return n.length == 1 && (s instanceof fi || s instanceof Et && s.flags & 4) && Math.abs(this.length - s.length) < 10 ? (s instanceof Et ? s = new fi(s.length, this.height, this.spaceAbove) : s.height = this.height, this.outdated || (s.outdated = !1), s) : Wt.of(n);
  }
  updateHeight(e, t = 0, n = !1, s) {
    return s && s.from <= t && s.more ? this.setMeasuredHeight(s) : (n || this.outdated) && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight)), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class Et extends Wt {
  constructor(e) {
    super(e, 0);
  }
  heightMetrics(e, t) {
    let n = e.doc.lineAt(t).number, s = e.doc.lineAt(t + this.length).number, r = s - n + 1, o, a = 0;
    if (e.lineWrapping) {
      let l = Math.min(this.height, e.lineHeight * r);
      o = l / r, this.length > r + 1 && (a = (this.height - l) / (this.length - r - 1));
    } else
      o = this.height / r;
    return { firstLine: n, lastLine: s, perLine: o, perChar: a };
  }
  blockAt(e, t, n, s) {
    let { firstLine: r, lastLine: o, perLine: a, perChar: l } = this.heightMetrics(t, s);
    if (t.lineWrapping) {
      let h = s + (e < t.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (e - n) / this.height)) * this.length)), c = t.doc.lineAt(h), f = a + c.length * l, d = Math.max(n, e - f / 2);
      return new Mi(c.from, c.length, d, f, 0);
    } else {
      let h = Math.max(0, Math.min(o - r, Math.floor((e - n) / a))), { from: c, length: f } = t.doc.line(r + h);
      return new Mi(c, f, n + a * h, a, 0);
    }
  }
  lineAt(e, t, n, s, r) {
    if (t == st.ByHeight)
      return this.blockAt(e, n, s, r);
    if (t == st.ByPosNoHeight) {
      let { from: p, to: O } = n.doc.lineAt(e);
      return new Mi(p, O - p, 0, 0, 0);
    }
    let { firstLine: o, perLine: a, perChar: l } = this.heightMetrics(n, r), h = n.doc.lineAt(e), c = a + h.length * l, f = h.number - o, d = s + a * f + l * (h.from - r - f);
    return new Mi(h.from, h.length, Math.max(s, Math.min(d, s + this.height - c)), c, 0);
  }
  forEachLine(e, t, n, s, r, o) {
    e = Math.max(e, r), t = Math.min(t, r + this.length);
    let { firstLine: a, perLine: l, perChar: h } = this.heightMetrics(n, r);
    for (let c = e, f = s; c <= t; ) {
      let d = n.doc.lineAt(c);
      if (c == e) {
        let O = d.number - a;
        f += l * O + h * (e - r - O);
      }
      let p = l + h * d.length;
      o(new Mi(d.from, d.length, f, p, 0)), f += p, c = d.to + 1;
    }
  }
  replace(e, t, n) {
    let s = this.length - t;
    if (s > 0) {
      let r = n[n.length - 1];
      r instanceof Et ? n[n.length - 1] = new Et(r.length + s) : n.push(null, new Et(s - 1));
    }
    if (e > 0) {
      let r = n[0];
      r instanceof Et ? n[0] = new Et(e + r.length) : n.unshift(new Et(e - 1), null);
    }
    return Wt.of(n);
  }
  decomposeLeft(e, t) {
    t.push(new Et(e - 1), null);
  }
  decomposeRight(e, t) {
    t.push(null, new Et(this.length - e - 1));
  }
  updateHeight(e, t = 0, n = !1, s) {
    let r = t + this.length;
    if (s && s.from <= t + this.length && s.more) {
      let o = [], a = Math.max(t, s.from), l = -1;
      for (s.from > t && o.push(new Et(s.from - t - 1).updateHeight(e, t)); a <= r && s.more; ) {
        let c = e.doc.lineAt(a).length;
        o.length && o.push(null);
        let f = s.heights[s.index++], d = 0;
        f < 0 && (d = -f, f = s.heights[s.index++]), l == -1 ? l = f : Math.abs(f - l) >= ya && (l = -2);
        let p = new fi(c, f, d);
        p.outdated = !1, o.push(p), a += c + 1;
      }
      a <= r && o.push(null, new Et(r - a).updateHeight(e, a));
      let h = Wt.of(o);
      return (l < 0 || Math.abs(h.height - this.height) >= ya || Math.abs(l - this.heightMetrics(e, t).perLine) >= ya) && (br = !0), za(this, h);
    } else (n || this.outdated) && (this.setHeight(e.heightForGap(t, t + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class ux extends Wt {
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
    let o = s + this.left.height, a = r + this.left.length + this.break, l = t == st.ByHeight ? e < o : e < a, h = l ? this.left.lineAt(e, t, n, s, r) : this.right.lineAt(e, t, n, o, a);
    if (this.break || (l ? h.to < a : h.from > a))
      return h;
    let c = t == st.ByPosNoHeight ? st.ByPosNoHeight : st.ByPos;
    return l ? h.join(this.right.lineAt(a, c, n, o, a)) : this.left.lineAt(a, c, n, s, r).join(h);
  }
  forEachLine(e, t, n, s, r, o) {
    let a = s + this.left.height, l = r + this.left.length + this.break;
    if (this.break)
      e < l && this.left.forEachLine(e, t, n, s, r, o), t >= l && this.right.forEachLine(e, t, n, a, l, o);
    else {
      let h = this.lineAt(l, st.ByPos, n, s, r);
      e < h.from && this.left.forEachLine(e, h.from - 1, n, s, r, o), h.to >= e && h.from <= t && o(h), t > h.to && this.right.forEachLine(h.to + 1, t, n, a, l, o);
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
    for (let a of n)
      r.push(a);
    if (e > 0 && Wu(r, o - 1), t < this.length) {
      let a = r.length;
      this.decomposeRight(t, r), Wu(r, a);
    }
    return Wt.of(r);
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
    return e.size > 2 * t.size || t.size > 2 * e.size ? Wt.of(this.break ? [e, null, t] : [e, t]) : (this.left = za(this.left, e), this.right = za(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
  }
  updateHeight(e, t = 0, n = !1, s) {
    let { left: r, right: o } = this, a = t + r.length + this.break, l = null;
    return s && s.from <= t + r.length && s.more ? l = r = r.updateHeight(e, t, n, s) : r.updateHeight(e, t, n), s && s.from <= a + o.length && s.more ? l = o = o.updateHeight(e, a, n, s) : o.updateHeight(e, a, n), l ? this.balanced(r, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function Wu(i, e) {
  let t, n;
  i[e] == null && (t = i[e - 1]) instanceof Et && (n = i[e + 1]) instanceof Et && i.splice(e - 1, 3, new Et(t.length + 1 + n.length));
}
const dx = 5;
class Of {
  constructor(e, t) {
    this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(e, t) {
    if (this.lineStart > -1) {
      let n = Math.min(t, this.lineEnd), s = this.nodes[this.nodes.length - 1];
      s instanceof fi ? s.length += n - this.pos : (n > this.pos || !this.isCovered) && this.nodes.push(new fi(n - this.pos, -1, 0)), this.writtenTo = n, t > n && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = t;
  }
  point(e, t, n) {
    if (e < t || n.heightRelevant) {
      let s = n.widget ? n.widget.estimatedHeight : 0, r = n.widget ? n.widget.lineBreaks : 0;
      s < 0 && (s = this.oracle.lineHeight);
      let o = t - e;
      n.block ? this.addBlock(new bg(o, s, n)) : (o || r || s >= dx) && this.addLineDeco(s, r, o);
    } else t > e && this.span(e, t);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new fi(this.pos - e, -1, 0)), this.writtenTo = this.pos;
  }
  blankContent(e, t) {
    let n = new Et(t - e);
    return this.oracle.doc.lineAt(e).to == t && (n.flags |= 4), n;
  }
  ensureLine() {
    this.enterLine();
    let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (e instanceof fi)
      return e;
    let t = new fi(0, -1, 0);
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
    this.lineStart > -1 && !(t instanceof fi) && !this.isCovered ? this.nodes.push(new fi(0, -1, 0)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let n = e;
    for (let s of this.nodes)
      s instanceof fi && s.updateHeight(this.oracle, n), n += s ? s.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(e, t, n, s) {
    let r = new Of(n, e);
    return Ue.spans(t, n, s, r, 0), r.finish(n);
  }
}
function px(i, e, t) {
  let n = new Ox();
  return Ue.compare(i, e, t, n, 0), n.changes;
}
class Ox {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(e, t, n, s) {
    (e < t || n && n.heightRelevant || s && s.heightRelevant) && Us(e, t, this.changes, 5);
  }
}
function gx(i, e) {
  let t = i.getBoundingClientRect(), n = i.ownerDocument, s = n.defaultView || window, r = Math.max(0, t.left), o = Math.min(s.innerWidth, t.right), a = Math.max(0, t.top), l = Math.min(s.innerHeight, t.bottom);
  for (let h = i.parentNode; h && h != n.body; )
    if (h.nodeType == 1) {
      let c = h, f = window.getComputedStyle(c);
      if ((c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth) && f.overflow != "visible") {
        let d = c.getBoundingClientRect();
        r = Math.max(r, d.left), o = Math.min(o, d.right), a = Math.max(a, d.top), l = Math.min(h == i.parentNode ? s.innerHeight : l, d.bottom);
      }
      h = f.position == "absolute" || f.position == "fixed" ? c.offsetParent : c.parentNode;
    } else if (h.nodeType == 11)
      h = h.host;
    else
      break;
  return {
    left: r - t.left,
    right: Math.max(r, o) - t.left,
    top: a - (t.top + e),
    bottom: Math.max(a, l) - (t.top + e)
  };
}
function mx(i) {
  let e = i.getBoundingClientRect(), t = i.ownerDocument.defaultView || window;
  return e.left < t.innerWidth && e.right > 0 && e.top < t.innerHeight && e.bottom > 0;
}
function vx(i, e) {
  let t = i.getBoundingClientRect();
  return {
    left: 0,
    right: t.right - t.left,
    top: e,
    bottom: t.bottom - (t.top + e)
  };
}
class rh {
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
    return tt.replace({
      widget: new bx(this.displaySize * (t ? e.scaleY : e.scaleX), t)
    }).range(this.from, this.to);
  }
}
class bx extends Pr {
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
class Vu {
  constructor(e, t) {
    this.view = e, this.state = t, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scaleX = 1, this.scaleY = 1, this.scrollOffset = 0, this.scrolledToBottom = !1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = Bu, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = dt.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let n = t.facet(ff).some((s) => typeof s != "function" && s.class == "cm-lineWrapping");
    this.heightOracle = new hx(n), this.stateDeco = Gu(t), this.heightMap = Wt.empty().applyChanges(this.stateDeco, Ne.empty, this.heightOracle.setDoc(t.doc), [new yi(0, 0, 0, t.doc.length)]);
    for (let s = 0; s < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); s++)
      ;
    this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = tt.set(this.lineGaps.map((s) => s.draw(this, !1))), this.scrollParent = e.scrollDOM, this.computeVisibleRanges();
  }
  updateForViewport() {
    let e = [this.viewport], { main: t } = this.state.selection;
    for (let n = 0; n <= 1; n++) {
      let s = n ? t.head : t.anchor;
      if (!e.some(({ from: r, to: o }) => s >= r && s <= o)) {
        let { from: r, to: o } = this.lineBlockAt(s);
        e.push(new Ko(r, o));
      }
    }
    return this.viewports = e.sort((n, s) => n.from - s.from), this.updateScaler();
  }
  updateScaler() {
    let e = this.scaler;
    return this.scaler = this.heightMap.height <= 7e6 ? Bu : new gf(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
      this.viewportLines.push(Br(e, this.scaler));
    });
  }
  update(e, t = null) {
    this.state = e.state;
    let n = this.stateDeco;
    this.stateDeco = Gu(this.state);
    let s = e.changedRanges, r = yi.extendWithRanges(s, px(n, this.stateDeco, e ? e.changes : Pt.empty(this.state.doc.length))), o = this.heightMap.height, a = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollOffset);
    qu(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), r), (this.heightMap.height != o || br) && (e.flags |= 2), a ? (this.scrollAnchorPos = e.changes.mapPos(a.from, -1), this.scrollAnchorHeight = a.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = o);
    let l = r.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
    (t && (t.range.head < l.from || t.range.head > l.to) || !this.viewportIsAppropriate(l)) && (l = this.getViewport(0, t));
    let h = l.from != this.viewport.from || l.to != this.viewport.to;
    this.viewport = l, e.flags |= this.updateForViewport(), (h || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && (e.selectionSet || e.focusChanged) && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(hw) && (this.mustEnforceCursorAssoc = !0);
  }
  measure() {
    let { view: e } = this, t = e.contentDOM, n = window.getComputedStyle(t), s = this.heightOracle, r = n.whiteSpace;
    this.defaultTextDirection = n.direction == "rtl" ? dt.RTL : dt.LTR;
    let o = this.heightOracle.mustRefreshForWrapping(r) || this.mustMeasureContent === "refresh", a = t.getBoundingClientRect(), l = o || this.mustMeasureContent || this.contentDOMHeight != a.height;
    this.contentDOMHeight = a.height, this.mustMeasureContent = !1;
    let h = 0, c = 0;
    if (a.width && a.height) {
      let { scaleX: T, scaleY: M } = MO(t, a);
      (T > 5e-3 && Math.abs(this.scaleX - T) > 5e-3 || M > 5e-3 && Math.abs(this.scaleY - M) > 5e-3) && (this.scaleX = T, this.scaleY = M, h |= 16, o = l = !0);
    }
    let f = (parseInt(n.paddingTop) || 0) * this.scaleY, d = (parseInt(n.paddingBottom) || 0) * this.scaleY;
    (this.paddingTop != f || this.paddingBottom != d) && (this.paddingTop = f, this.paddingBottom = d, h |= 18), this.editorWidth != e.scrollDOM.clientWidth && (s.lineWrapping && (l = !0), this.editorWidth = e.scrollDOM.clientWidth, h |= 16);
    let p = XO(this.view.contentDOM, !1).y;
    p != this.scrollParent && (this.scrollParent = p, this.scrollAnchorHeight = -1, this.scrollOffset = 0);
    let O = this.getScrollOffset();
    this.scrollOffset != O && (this.scrollAnchorHeight = -1, this.scrollOffset = O), this.scrolledToBottom = LO(this.scrollParent || e.win);
    let g = (this.printing ? vx : gx)(t, this.paddingTop), m = g.top - this.pixelViewport.top, v = g.bottom - this.pixelViewport.bottom;
    this.pixelViewport = g;
    let Q = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (Q != this.inView && (this.inView = Q, Q && (l = !0)), !this.inView && !this.scrollTarget && !mx(e.dom))
      return 0;
    let k = a.width;
    if ((this.contentDOMWidth != k || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = a.width, this.editorHeight = e.scrollDOM.clientHeight, h |= 16), l) {
      let T = e.docView.measureVisibleLineHeights(this.viewport);
      if (s.mustRefreshForHeights(T) && (o = !0), o || s.lineWrapping && Math.abs(k - this.contentDOMWidth) > s.charWidth) {
        let { lineHeight: M, charWidth: C, textHeight: z } = e.docView.measureTextSize();
        o = M > 0 && s.refresh(r, M, C, z, Math.max(5, k / C), T), o && (e.docView.minWidth = 0, h |= 16);
      }
      m > 0 && v > 0 ? c = Math.max(m, v) : m < 0 && v < 0 && (c = Math.min(m, v)), qu();
      for (let M of this.viewports) {
        let C = M.from == this.viewport.from ? T : e.docView.measureVisibleLineHeights(M);
        this.heightMap = (o ? Wt.empty().applyChanges(this.stateDeco, Ne.empty, this.heightOracle, [new yi(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(s, 0, o, new cx(M.from, C));
      }
      br && (h |= 2);
    }
    let R = !this.viewportIsAppropriate(this.viewport, c) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return R && (h & 2 && (h |= this.updateScaler()), this.viewport = this.getViewport(c, this.scrollTarget), h |= this.updateForViewport()), (h & 2 || R) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, e)), h |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), h;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(e, t) {
    let n = 0.5 - Math.max(-0.5, Math.min(0.5, e / 1e3 / 2)), s = this.heightMap, r = this.heightOracle, { visibleTop: o, visibleBottom: a } = this, l = new Ko(s.lineAt(o - n * 1e3, st.ByHeight, r, 0, 0).from, s.lineAt(a + (1 - n) * 1e3, st.ByHeight, r, 0, 0).to);
    if (t) {
      let { head: h } = t.range;
      if (h < l.from || h > l.to) {
        let c = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), f = s.lineAt(h, st.ByPos, r, 0, 0), d;
        t.y == "center" ? d = (f.top + f.bottom) / 2 - c / 2 : t.y == "start" || t.y == "nearest" && h < l.from ? d = f.top : d = f.bottom - c, l = new Ko(s.lineAt(d - 1e3 / 2, st.ByHeight, r, 0, 0).from, s.lineAt(d + c + 1e3 / 2, st.ByHeight, r, 0, 0).to);
      }
    }
    return l;
  }
  mapViewport(e, t) {
    let n = t.mapPos(e.from, -1), s = t.mapPos(e.to, 1);
    return new Ko(this.heightMap.lineAt(n, st.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(s, st.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: e, to: t }, n = 0) {
    if (!this.inView)
      return !0;
    let { top: s } = this.heightMap.lineAt(e, st.ByPos, this.heightOracle, 0, 0), { bottom: r } = this.heightMap.lineAt(t, st.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: a } = this;
    return (e == 0 || s <= o - Math.max(10, Math.min(
      -n,
      250
      /* VP.MaxCoverMargin */
    ))) && (t == this.state.doc.length || r >= a + Math.max(10, Math.min(
      n,
      250
      /* VP.MaxCoverMargin */
    ))) && s > o - 2 * 1e3 && r < a + 2 * 1e3;
  }
  mapLineGaps(e, t) {
    if (!e.length || t.empty)
      return e;
    let n = [];
    for (let s of e)
      t.touchesRange(s.from, s.to) || n.push(new rh(t.mapPos(s.from), t.mapPos(s.to), s.size, s.displaySize));
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
    if (this.defaultTextDirection != dt.LTR && !n)
      return [];
    let a = [], l = (c, f, d, p) => {
      if (f - c < r)
        return;
      let O = this.state.selection.main, g = [O.from];
      O.empty || g.push(O.to);
      for (let v of g)
        if (v > c && v < f) {
          l(c, v - 10, d, p), l(v + 10, f, d, p);
          return;
        }
      let m = wx(e, (v) => v.from >= d.from && v.to <= d.to && Math.abs(v.from - c) < r && Math.abs(v.to - f) < r && !g.some((Q) => v.from < Q && v.to > Q));
      if (!m) {
        if (f < d.to && t && n && t.visibleRanges.some((k) => k.from <= f && k.to >= f)) {
          let k = t.moveToLineBoundary(G.cursor(f), !1, !0).head;
          k > c && (f = k);
        }
        let v = this.gapSize(d, c, f, p), Q = n || v < 2e6 ? v : 2e6;
        m = new rh(c, f, v, Q);
      }
      a.push(m);
    }, h = (c) => {
      if (c.length < o || c.type != $i.Text)
        return;
      let f = yx(c.from, c.to, this.stateDeco);
      if (f.total < o)
        return;
      let d = this.scrollTarget ? this.scrollTarget.range.head : null, p, O;
      if (n) {
        let g = s / this.heightOracle.lineLength * this.heightOracle.lineHeight, m, v;
        if (d != null) {
          let Q = ea(f, d), k = ((this.visibleBottom - this.visibleTop) / 2 + g) / c.height;
          m = Q - k, v = Q + k;
        } else
          m = (this.visibleTop - c.top - g) / c.height, v = (this.visibleBottom - c.top + g) / c.height;
        p = Jo(f, m), O = Jo(f, v);
      } else {
        let g = f.total * this.heightOracle.charWidth, m = s * this.heightOracle.charWidth, v = 0;
        if (g > 2e6)
          for (let M of e)
            M.from >= c.from && M.from < c.to && M.size != M.displaySize && M.from * this.heightOracle.charWidth + v < this.pixelViewport.left && (v = M.size - M.displaySize);
        let Q = this.pixelViewport.left + v, k = this.pixelViewport.right + v, R, T;
        if (d != null) {
          let M = ea(f, d), C = ((k - Q) / 2 + m) / g;
          R = M - C, T = M + C;
        } else
          R = (Q - m) / g, T = (k + m) / g;
        p = Jo(f, R), O = Jo(f, T);
      }
      p > c.from && l(c.from, p, c, f), O < c.to && l(O, c.to, c, f);
    };
    for (let c of this.viewportLines)
      Array.isArray(c.type) ? c.type.forEach(h) : h(c);
    return a;
  }
  gapSize(e, t, n, s) {
    let r = ea(s, n) - ea(s, t);
    return this.heightOracle.lineWrapping ? e.height * r : s.total * this.heightOracle.charWidth * r;
  }
  updateLineGaps(e) {
    rh.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = tt.set(e.map((t) => t.draw(this, this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges(e) {
    let t = this.stateDeco;
    this.lineGaps.length && (t = t.concat(this.lineGapDeco));
    let n = [];
    Ue.spans(t, this.viewport.from, this.viewport.to, {
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
        let o = this.visibleRanges[r], a = n[r];
        (o.from != a.from || o.to != a.to) && (s |= 4, e && e.mapPos(o.from, -1) == a.from && e.mapPos(o.to, 1) == a.to || (s |= 8));
      }
    return this.visibleRanges = n, s;
  }
  lineBlockAt(e) {
    return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || Br(this.heightMap.lineAt(e, st.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(e) {
    return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || Br(this.heightMap.lineAt(this.scaler.fromDOM(e), st.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  getScrollOffset() {
    return (this.scrollParent == this.view.scrollDOM ? this.scrollParent.scrollTop : (this.scrollParent ? this.scrollParent.getBoundingClientRect().top : 0) - this.view.contentDOM.getBoundingClientRect().top) * this.scaleY;
  }
  scrollAnchorAt(e) {
    let t = this.lineBlockAtHeight(e + 8);
    return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
  }
  elementAtHeight(e) {
    return Br(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class Ko {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
function yx(i, e, t) {
  let n = [], s = i, r = 0;
  return Ue.spans(t, i, e, {
    span() {
    },
    point(o, a) {
      o > s && (n.push({ from: s, to: o }), r += o - s), s = a;
    }
  }, 20), s < e && (n.push({ from: s, to: e }), r += e - s), { total: r, ranges: n };
}
function Jo({ total: i, ranges: e }, t) {
  if (t <= 0)
    return e[0].from;
  if (t >= 1)
    return e[e.length - 1].to;
  let n = Math.floor(i * t);
  for (let s = 0; ; s++) {
    let { from: r, to: o } = e[s], a = o - r;
    if (n <= a)
      return r + n;
    n -= a;
  }
}
function ea(i, e) {
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
function wx(i, e) {
  for (let t of i)
    if (e(t))
      return t;
}
const Bu = {
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
function Gu(i) {
  let e = i.facet(yl).filter((n) => typeof n != "function"), t = i.facet(uf).filter((n) => typeof n != "function");
  return t.length && e.push(Ue.join(t)), e;
}
class gf {
  constructor(e, t, n) {
    let s = 0, r = 0, o = 0;
    this.viewports = n.map(({ from: a, to: l }) => {
      let h = t.lineAt(a, st.ByPos, e, 0, 0).top, c = t.lineAt(l, st.ByPos, e, 0, 0).bottom;
      return s += c - h, { from: a, to: l, top: h, bottom: c, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - s) / (t.height - s);
    for (let a of this.viewports)
      a.domTop = o + (a.top - r) * this.scale, o = a.domBottom = a.domTop + (a.bottom - a.top), r = a.bottom;
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
    return e instanceof gf ? this.scale == e.scale && this.viewports.length == e.viewports.length && this.viewports.every((t, n) => t.from == e.viewports[n].from && t.to == e.viewports[n].to) : !1;
  }
}
function Br(i, e) {
  if (e.scale == 1)
    return i;
  let t = e.toDOM(i.top), n = e.toDOM(i.bottom);
  return new Mi(i.from, i.length, t, n - t, Array.isArray(i._content) ? i._content.map((s) => Br(s, e)) : i._content);
}
const ta = /* @__PURE__ */ ve.define({ combine: (i) => i.join(" ") }), pc = /* @__PURE__ */ ve.define({ combine: (i) => i.indexOf(!0) > -1 }), Oc = /* @__PURE__ */ gr.newName(), yg = /* @__PURE__ */ gr.newName(), wg = /* @__PURE__ */ gr.newName(), xg = { "&light": "." + yg, "&dark": "." + wg };
function gc(i, e, t) {
  return new gr(e, {
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
const xx = /* @__PURE__ */ gc("." + Oc, {
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
}, xg), Sx = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, oh = ae.ie && ae.ie_version <= 11;
class kx {
  constructor(e) {
    this.view = e, this.active = !1, this.editContext = null, this.selectionRange = new Hy(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
      for (let n of t)
        this.queue.push(n);
      (ae.ie && ae.ie_version <= 11 || ae.ios && e.composing) && t.some((n) => n.type == "childList" && n.removedNodes.length || n.type == "characterData" && n.oldValue.length > n.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), window.EditContext && ae.android && e.constructor.EDIT_CONTEXT !== !1 && // Chrome <126 doesn't support inverted selections in edit context (#1392)
    !(ae.chrome && ae.chrome_version < 126) && (this.editContext = new $x(e), e.state.facet(bn) && (e.contentDOM.editContext = this.editContext.editContext)), oh && (this.onCharData = (t) => {
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
    if (n.state.facet(bn) ? n.root.activeElement != this.dom : !no(this.dom, s))
      return;
    let r = s.anchorNode && n.docView.tile.nearest(s.anchorNode);
    if (r && r.isWidget() && r.widget.ignoreEvent(e)) {
      t || (this.selectionChanged = !1);
      return;
    }
    (ae.ie && ae.ie_version <= 11 || ae.android && ae.chrome) && !n.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    s.focusNode && ro(s.focusNode, s.focusOffset, s.anchorNode, s.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: e } = this, t = mo(e.root);
    if (!t)
      return !1;
    let n = ae.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && Qx(this.view, t) || t;
    if (!n || this.selectionRange.eq(n))
      return !1;
    let s = no(this.dom, n);
    return s && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && Jy(this.dom, n) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(n), s && (this.selectionChanged = !0), !0);
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
    this.active || (this.observer.observe(this.dom, Sx), oh && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), oh && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
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
        r && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = r.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && r.force && Fs(this.dom, r.key, r.keyCode));
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
    let { from: e, to: t, typeOver: n } = this.processRecords(), s = this.selectionChanged && no(this.dom, this.selectionRange);
    if (e < 0 && !s)
      return null;
    e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
    let r = new Nw(this.view, e, t, n);
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
    let n = this.view.state, s = hg(this.view, t);
    return this.view.state == n && (t.domChanged || t.newSel && !Da(this.view.state.selection, t.newSel.main)) && this.view.update([]), s;
  }
  readMutation(e) {
    let t = this.view.docView.tile.nearest(e.target);
    if (!t || t.isWidget())
      return null;
    if (t.markDirty(e.type == "attributes"), e.type == "childList") {
      let n = Uu(t, e.previousSibling || e.target.previousSibling, -1), s = Uu(t, e.nextSibling || e.target.nextSibling, 1);
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
    this.editContext && (this.editContext.update(e), e.startState.facet(bn) != e.state.facet(bn) && (e.view.contentDOM.editContext = e.state.facet(bn) ? this.editContext.editContext : null));
  }
  destroy() {
    var e, t, n;
    this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (n = this.resizeScroll) === null || n === void 0 || n.disconnect();
    for (let s of this.scrollTargets)
      s.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
  }
}
function Uu(i, e, t) {
  for (; e; ) {
    let n = pt.get(e);
    if (n && n.parent == i)
      return n;
    let s = e.parentNode;
    e = s != i.dom ? s : t > 0 ? e.nextSibling : e.previousSibling;
  }
  return null;
}
function Fu(i, e) {
  let t = e.startContainer, n = e.startOffset, s = e.endContainer, r = e.endOffset, o = i.docView.domAtPos(i.state.selection.main.anchor, 1);
  return ro(o.node, o.offset, s, r) && ([t, n, s, r] = [s, r, t, n]), { anchorNode: t, anchorOffset: n, focusNode: s, focusOffset: r };
}
function Qx(i, e) {
  if (e.getComposedRanges) {
    let s = e.getComposedRanges(i.root)[0];
    if (s)
      return Fu(i, s);
  }
  let t = null;
  function n(s) {
    s.preventDefault(), s.stopImmediatePropagation(), t = s.getTargetRanges()[0];
  }
  return i.contentDOM.addEventListener("beforeinput", n, !0), i.dom.ownerDocument.execCommand("indent"), i.contentDOM.removeEventListener("beforeinput", n, !0), t ? Fu(i, t) : null;
}
class $x {
  constructor(e) {
    this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.composing = null, this.resetRange(e.state);
    let t = this.editContext = new window.EditContext({
      text: e.state.doc.sliceString(this.from, this.to),
      selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, e.state.selection.main.anchor))),
      selectionEnd: this.toContextPos(e.state.selection.main.head)
    });
    this.handlers.textupdate = (n) => {
      let s = e.state.selection.main, { anchor: r, head: o } = s, a = this.toEditorPos(n.updateRangeStart), l = this.toEditorPos(n.updateRangeEnd);
      e.inputState.composing >= 0 && !this.composing && (this.composing = { contextBase: n.updateRangeStart, editorBase: a, drifted: !1 });
      let h = l - a > n.text.length;
      a == this.from && r < this.from ? a = r : l == this.to && r > this.to && (l = r);
      let c = cg(e.state.sliceDoc(a, l), n.text, (h ? s.from : s.to) - a, h ? "end" : null);
      if (!c) {
        let d = G.single(this.toEditorPos(n.selectionStart), this.toEditorPos(n.selectionEnd));
        Da(d, s) || e.dispatch({ selection: d, userEvent: "select" });
        return;
      }
      let f = {
        from: c.from + a,
        to: c.toA + a,
        insert: Ne.of(n.text.slice(c.from, c.toB).split(`
`))
      };
      if ((ae.mac || ae.android) && f.from == o - 1 && /^\. ?$/.test(n.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (f = { from: a, to: l, insert: Ne.of([n.text.replace(".", " ")]) }), this.pendingContextChange = f, !e.state.readOnly) {
        let d = this.to - this.from + (f.to - f.from + f.insert.length);
        pf(e, f, G.single(this.toEditorPos(n.selectionStart, d), this.toEditorPos(n.selectionEnd, d)));
      }
      this.pendingContextChange && (this.revertPending(e.state), this.setSelection(e.state)), f.from < f.to && !f.insert.length && e.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0, n.updateRangeStart - 1), Math.min(t.text.length, n.updateRangeStart + 1))) && this.handlers.compositionend(n);
    }, this.handlers.characterboundsupdate = (n) => {
      let s = [], r = null;
      for (let o = this.toEditorPos(n.rangeStart), a = this.toEditorPos(n.rangeEnd); o < a; o++) {
        let l = e.coordsForChar(o);
        r = l && new DOMRect(l.left, l.top, l.right - l.left, l.bottom - l.top) || r || new DOMRect(), s.push(r);
      }
      t.updateCharacterBounds(n.rangeStart, s);
    }, this.handlers.textformatupdate = (n) => {
      let s = [];
      for (let r of n.getTextFormats()) {
        let o = r.underlineStyle, a = r.underlineThickness;
        if (!/none/i.test(o) && !/none/i.test(a)) {
          let l = this.toEditorPos(r.rangeStart), h = this.toEditorPos(r.rangeEnd);
          if (l < h) {
            let c = `text-decoration: underline ${/^[a-z]/.test(o) ? o + " " : o == "Dashed" ? "dashed " : o == "Squiggle" ? "wavy " : ""}${/thin/i.test(a) ? 1 : 2}px`;
            s.push(tt.mark({ attributes: { style: c } }).range(l, h));
          }
        }
      }
      e.dispatch({ effects: eg.of(tt.set(s)) });
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
      let s = mo(n.root);
      s && s.rangeCount && this.editContext.updateSelectionBounds(s.getRangeAt(0).getBoundingClientRect());
    } };
  }
  applyEdits(e) {
    let t = 0, n = !1, s = this.pendingContextChange;
    return e.changes.iterChanges((r, o, a, l, h) => {
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
class me {
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
    this.dispatchTransactions = e.dispatchTransactions || n && ((s) => s.forEach((r) => n(r, this))) || ((s) => this.update(s)), this.dispatch = this.dispatch.bind(this), this._root = e.root || Ky(e.parent) || document, this.viewState = new Vu(this, e.state || Be.create(e)), e.scrollTo && e.scrollTo.is(Uo) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(Ns).map((s) => new eh(s));
    for (let s of this.plugins)
      s.update(this);
    this.observer = new kx(this), this.inputState = new Vw(this), this.inputState.ensureHandlers(this.plugins), this.docView = new Au(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((t = document.fonts) === null || t === void 0) && t.ready && document.fonts.ready.then(() => {
      this.viewState.mustMeasureContent = "refresh", this.requestMeasure();
    });
  }
  dispatch(...e) {
    let t = e.length == 1 && e[0] instanceof wt ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [this.state.update(...e)];
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
    let o = this.hasFocus, a = 0, l = null;
    e.some((d) => d.annotation(gg)) ? (this.inputState.notifiedFocused = o, a = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, l = mg(r, o), l || (a = 1));
    let h = this.observer.delayedAndroidKey, c = null;
    if (h ? (this.observer.clearDelayedAndroidKey(), c = this.observer.readChange(), (c && !this.state.doc.eq(r.doc) || !this.state.selection.eq(r.selection)) && (c = null)) : this.observer.clear(), r.facet(Be.phrases) != this.state.facet(Be.phrases))
      return this.setState(r);
    s = ja.create(this, r, e), s.flags |= a;
    let f = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let d of e) {
        if (f && (f = f.map(d.changes)), d.scrollIntoView) {
          let { main: p } = d.state.selection, { x: O, y: g } = this.state.facet(me.cursorScrollMargin);
          f = new Hs(p.empty ? p : G.cursor(p.head, p.head > p.anchor ? -1 : 1), "nearest", "nearest", g, O);
        }
        for (let p of d.effects)
          p.is(Uo) && (f = p.value.clip(this.state));
      }
      this.viewState.update(s, f), this.bidiCache = Na.update(this.bidiCache, s.changes), s.empty || (this.updatePlugins(s), this.inputState.update(s)), t = this.docView.update(s), this.state.facet(Vr) != this.styleModules && this.mountStyles(), n = this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some((d) => d.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (s.startState.facet(ta) != s.state.facet(ta) && (this.viewState.mustMeasureContent = !0), (t || n || f || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), t && this.docViewUpdate(), !s.empty)
      for (let d of this.state.facet(cc))
        try {
          d(s);
        } catch (p) {
          ui(this.state, p, "update listener");
        }
    (l || c) && Promise.resolve().then(() => {
      l && this.state == l.startState && this.dispatch(l), c && !hg(this, c) && h.force && Fs(this.contentDOM, h.key, h.keyCode);
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
      this.viewState = new Vu(this, e), this.plugins = e.facet(Ns).map((n) => new eh(n)), this.pluginMap.clear();
      for (let n of this.plugins)
        n.update(this);
      this.docView.destroy(), this.docView = new Au(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    t && this.focus(), this.requestMeasure();
  }
  updatePlugins(e) {
    let t = e.startState.facet(Ns), n = e.state.facet(Ns);
    if (t != n) {
      let s = [];
      for (let r of n) {
        let o = t.indexOf(r);
        if (o < 0)
          s.push(new eh(r));
        else {
          let a = this.plugins[o];
          a.mustUpdate = e, s.push(a);
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
          ui(this.state, n, "doc view update listener");
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
      for (let a = 0; ; a++) {
        if (o < 0)
          if (LO(n || this.win))
            r = -1, o = this.viewState.heightMap.height;
          else {
            let p = this.viewState.scrollAnchorAt(s);
            r = p.from, o = p.top;
          }
        this.updateState = 1;
        let l = this.viewState.measure();
        if (!l && !this.measureRequests.length && this.viewState.scrollTarget == null)
          break;
        if (a > 5) {
          console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
          break;
        }
        let h = [];
        l & 4 || ([this.measureRequests, h] = [h, this.measureRequests]);
        let c = h.map((p) => {
          try {
            return p.read(this);
          } catch (O) {
            return ui(this.state, O), Hu;
          }
        }), f = ja.create(this, this.state, []), d = !1;
        f.flags |= l, t ? t.flags |= l : t = f, this.updateState = 2, f.empty || (this.updatePlugins(f), this.inputState.update(f), this.updateAttrs(), d = this.docView.update(f), d && this.docViewUpdate());
        for (let p = 0; p < h.length; p++)
          if (c[p] != Hu)
            try {
              let O = h[p];
              O.write && O.write(c[p], this);
            } catch (O) {
              ui(this.state, O);
            }
        if (d && this.docView.updateSelection(!0), !f.viewportChanged && this.measureRequests.length == 0) {
          if (this.viewState.editorHeight)
            if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, o = -1;
              continue;
            } else {
              let O = ((r < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(r).top) - o) / this.scaleY;
              if ((O > 1 || O < -1) && !(ae.ios && this.inputState.lastIOSMomentumScroll > Date.now() - 100) && (n == this.scrollDOM || this.hasFocus || Math.max(this.inputState.lastWheelEvent, this.inputState.lastTouchTime) > Date.now() - 100)) {
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
      for (let a of this.state.facet(cc))
        a(t);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return Oc + " " + (this.state.facet(pc) ? wg : yg) + " " + this.state.facet(ta);
  }
  updateAttrs() {
    let e = Ku(this, tg, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), t = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      writingsuggestions: "false",
      translate: "no",
      contenteditable: this.state.facet(bn) ? "true" : "false",
      class: "cm-content",
      style: `${ae.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (t["aria-readonly"] = "true"), Ku(this, ff, t);
    let n = this.observer.ignore(() => {
      let s = _u(this.contentDOM, this.contentAttrs, t), r = _u(this.dom, this.editorAttrs, e);
      return s || r;
    });
    return this.editorAttrs = e, this.contentAttrs = t, n;
  }
  showAnnouncements(e) {
    let t = !0;
    for (let n of e)
      for (let s of n.effects)
        if (s.is(me.announce)) {
          t && (this.announceDOM.textContent = ""), t = !1;
          let r = this.announceDOM.appendChild(document.createElement("div"));
          r.textContent = s.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(Vr);
    let e = this.state.facet(me.cspNonce);
    gr.mount(this.root, this.styleModules.concat(xx).reverse(), e ? { nonce: e } : void 0);
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
    return sh(this, e, Ru(this, e, t, n));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(e, t) {
    return sh(this, e, Ru(this, e, t, (n) => Xw(this, e.head, n)));
  }
  /**
  Get the cursor position visually at the start or end of a line.
  Note that this may differ from the _logical_ position at its
  start or end (which is simply at `line.from`/`line.to`) if text
  at the start or end goes against the line's base text direction.
  */
  visualLineSide(e, t) {
    let n = this.bidiSpans(e), s = this.textDirectionAt(e.from), r = n[t ? n.length - 1 : 0];
    return G.cursor(r.side(t, s) + e.from, r.forward(!t, s) ? 1 : -1);
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(e, t, n = !0) {
    return Mw(this, e, t, n);
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
    return sh(this, e, jw(this, e, t, n));
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
    let n = uc(this, e, t);
    return n && n.pos;
  }
  posAndSideAtCoords(e, t = !0) {
    return this.readMeasured(), uc(this, e, t);
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
    let n = this.state.doc.lineAt(e), s = this.bidiSpans(n), r = s[sn.find(s, e - n.from, -1, t)];
    return this.docView.coordsAt(e, t, r.dir == dt.RTL);
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
    return !this.state.facet(KO) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
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
    if (e.length > _x)
      return qO(e.length);
    let t = this.textDirectionAt(e.from), n;
    for (let r of this.bidiCache)
      if (r.from == e.from && r.dir == t && (r.fresh || YO(r.isolates, n = Cu(this, e))))
        return r.order;
    n || (n = Cu(this, e));
    let s = ow(e.text, t, n);
    return this.bidiCache.push(new Na(e.from, e.to, t, n, !0, s)), s;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var e;
    return (this.dom.ownerDocument.hasFocus() || ae.safari && ((e = this.inputState) === null || e === void 0 ? void 0 : e.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      jO(this.contentDOM), this.docView.updateSelection();
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
    return Uo.of(new Hs(typeof e == "number" ? G.cursor(e) : e, (n = t.y) !== null && n !== void 0 ? n : "nearest", (s = t.x) !== null && s !== void 0 ? s : "nearest", (r = t.yMargin) !== null && r !== void 0 ? r : 5, (o = t.xMargin) !== null && o !== void 0 ? o : 5));
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
    return Uo.of(new Hs(G.cursor(n.from), "start", "start", n.top - e, t, !0));
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
    return cn.define(() => ({}), { eventHandlers: e });
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
    return cn.define(() => ({}), { eventObservers: e });
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
    let n = gr.newName(), s = [ta.of(n), Vr.of(gc(`.${n}`, e))];
    return t && t.dark && s.push(pc.of(!0)), s;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(e) {
    return Ao.lowest(Vr.of(gc("." + Oc, e, xg)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(e) {
    var t;
    let n = e.querySelector(".cm-content"), s = n && pt.get(n) || pt.get(e);
    return ((t = s == null ? void 0 : s.root) === null || t === void 0 ? void 0 : t.view) || null;
  }
}
me.styleModule = Vr;
me.inputHandler = FO;
me.clipboardInputFilter = hf;
me.clipboardOutputFilter = cf;
me.scrollHandler = JO;
me.focusChangeEffect = HO;
me.perLineTextDirection = KO;
me.exceptionSink = UO;
me.updateListener = cc;
me.editable = bn;
me.mouseSelectionStyle = GO;
me.dragMovesSelection = BO;
me.clickAddsSelectionRange = VO;
me.decorations = yl;
me.blockWrappers = ig;
me.outerDecorations = uf;
me.atomicRanges = Xo;
me.bidiIsolatedRanges = ng;
me.cursorScrollMargin = /* @__PURE__ */ ve.define({
  combine: (i) => {
    let e = 5, t = 5;
    for (let n of i)
      typeof n == "number" ? e = t = n : { x: e, y: t } = n;
    return { x: e, y: t };
  }
});
me.scrollMargins = sg;
me.darkTheme = pc;
me.cspNonce = /* @__PURE__ */ ve.define({ combine: (i) => i.length ? i[0] : "" });
me.contentAttributes = ff;
me.editorAttributes = tg;
me.lineWrapping = /* @__PURE__ */ me.contentAttributes.of({ class: "cm-lineWrapping" });
me.announce = /* @__PURE__ */ Ke.define();
const _x = 4096, Hu = {};
class Na {
  constructor(e, t, n, s, r, o) {
    this.from = e, this.to = t, this.dir = n, this.isolates = s, this.fresh = r, this.order = o;
  }
  static update(e, t) {
    if (t.empty && !e.some((r) => r.fresh))
      return e;
    let n = [], s = e.length ? e[e.length - 1].dir : dt.LTR;
    for (let r = Math.max(0, e.length - 10); r < e.length; r++) {
      let o = e[r];
      o.dir == s && !t.touchesRange(o.from, o.to) && n.push(new Na(t.mapPos(o.from, 1), t.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
    }
    return n;
  }
}
function Ku(i, e, t) {
  for (let n = i.state.facet(e), s = n.length - 1; s >= 0; s--) {
    let r = n[s], o = typeof r == "function" ? r(i) : r;
    o && of(o, t);
  }
  return t;
}
const Px = ae.mac ? "mac" : ae.windows ? "win" : ae.linux ? "linux" : "key";
function Tx(i, e) {
  const t = i.split(/-(?!$)/);
  let n = t[t.length - 1];
  n == "Space" && (n = " ");
  let s, r, o, a;
  for (let l = 0; l < t.length - 1; ++l) {
    const h = t[l];
    if (/^(cmd|meta|m)$/i.test(h))
      a = !0;
    else if (/^a(lt)?$/i.test(h))
      s = !0;
    else if (/^(c|ctrl|control)$/i.test(h))
      r = !0;
    else if (/^s(hift)?$/i.test(h))
      o = !0;
    else if (/^mod$/i.test(h))
      e == "mac" ? a = !0 : r = !0;
    else
      throw new Error("Unrecognized modifier name: " + h);
  }
  return s && (n = "Alt-" + n), r && (n = "Ctrl-" + n), a && (n = "Meta-" + n), o && (n = "Shift-" + n), n;
}
function ia(i, e, t) {
  return e.altKey && (i = "Alt-" + i), e.ctrlKey && (i = "Ctrl-" + i), e.metaKey && (i = "Meta-" + i), t !== !1 && e.shiftKey && (i = "Shift-" + i), i;
}
const Cx = /* @__PURE__ */ Ao.default(/* @__PURE__ */ me.domEventHandlers({
  keydown(i, e) {
    return Rx(Zx(e.state), i, e, "editor");
  }
})), kl = /* @__PURE__ */ ve.define({ enables: Cx }), Ju = /* @__PURE__ */ new WeakMap();
function Zx(i) {
  let e = i.facet(kl), t = Ju.get(e);
  return t || Ju.set(e, t = Ax(e.reduce((n, s) => n.concat(s), []))), t;
}
let Ln = null;
const Ex = 4e3;
function Ax(i, e = Px) {
  let t = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null), s = (o, a) => {
    let l = n[o];
    if (l == null)
      n[o] = a;
    else if (l != a)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, r = (o, a, l, h, c) => {
    var f, d;
    let p = t[o] || (t[o] = /* @__PURE__ */ Object.create(null)), O = a.split(/ (?!$)/).map((v) => Tx(v, e));
    for (let v = 1; v < O.length; v++) {
      let Q = O.slice(0, v).join(" ");
      s(Q, !0), p[Q] || (p[Q] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [(k) => {
          let R = Ln = { view: k, prefix: Q, scope: o };
          return setTimeout(() => {
            Ln == R && (Ln = null);
          }, Ex), !0;
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
    l && m.run.push(l), h && (m.preventDefault = !0), c && (m.stopPropagation = !0);
  };
  for (let o of i) {
    let a = o.scope ? o.scope.split(" ") : ["editor"];
    if (o.any)
      for (let h of a) {
        let c = t[h] || (t[h] = /* @__PURE__ */ Object.create(null));
        c._any || (c._any = { preventDefault: !1, stopPropagation: !1, run: [] });
        let { any: f } = o;
        for (let d in c)
          c[d].run.push((p) => f(p, mc));
      }
    let l = o[e] || o.key;
    if (l)
      for (let h of a)
        r(h, l, o.run, o.preventDefault, o.stopPropagation), o.shift && r(h, "Shift-" + l, o.shift, o.preventDefault, o.stopPropagation);
  }
  return t;
}
let mc = null;
function Rx(i, e, t, n) {
  mc = e;
  let s = Wy(e), r = is(s, 0), o = js(r) == s.length && s != " ", a = "", l = !1, h = !1, c = !1;
  Ln && Ln.view == t && Ln.scope == n && (a = Ln.prefix + " ", ug.indexOf(e.keyCode) < 0 && (h = !0, Ln = null));
  let f = /* @__PURE__ */ new Set(), d = (m) => {
    if (m) {
      for (let v of m.run)
        if (!f.has(v) && (f.add(v), v(t)))
          return m.stopPropagation && (c = !0), !0;
      m.preventDefault && (m.stopPropagation && (c = !0), h = !0);
    }
    return !1;
  }, p = i[n], O, g;
  return p && (d(p[a + ia(s, e, !o)]) ? l = !0 : o && (e.altKey || e.metaKey || e.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(ae.windows && e.ctrlKey && e.altKey) && // Alt-combinations on macOS tend to be typed characters
  !(ae.mac && e.altKey && !(e.ctrlKey || e.metaKey)) && (O = Un[e.keyCode]) && O != s ? (d(p[a + ia(O, e, !0)]) || e.shiftKey && (g = Oo[e.keyCode]) != s && g != O && d(p[a + ia(g, e, !1)])) && (l = !0) : o && e.shiftKey && d(p[a + ia(s, e, !0)]) && (l = !0), !l && d(p._any) && (l = !0)), h && (l = !0), l && c && e.stopPropagation(), mc = null, l;
}
class Mx extends Pr {
  constructor(e) {
    super(), this.content = e;
  }
  toDOM(e) {
    let t = document.createElement("span");
    return t.className = "cm-placeholder", t.style.pointerEvents = "none", t.appendChild(typeof this.content == "string" ? document.createTextNode(this.content) : typeof this.content == "function" ? this.content(e) : this.content.cloneNode(!0)), t.setAttribute("aria-hidden", "true"), t;
  }
  coordsAt(e) {
    let t = e.firstChild ? so(e.firstChild) : [];
    if (!t.length)
      return null;
    let n = window.getComputedStyle(e.parentNode), s = vo(t[0], n.direction != "rtl"), r = parseInt(n.lineHeight);
    return s.bottom - s.top > r * 1.5 ? { left: s.left, right: s.right, top: s.top, bottom: s.top + r } : s;
  }
  ignoreEvent() {
    return !1;
  }
}
function Xx(i) {
  let e = cn.fromClass(class {
    constructor(t) {
      this.view = t, this.placeholder = i ? tt.set([tt.widget({ widget: new Mx(i), side: 1 }).range(0)]) : tt.none;
    }
    get decorations() {
      return this.view.state.doc.length ? tt.none : this.placeholder;
    }
  }, { decorations: (t) => t.decorations });
  return typeof i == "string" ? [
    e,
    me.contentAttributes.of({ "aria-placeholder": i })
  ] : e;
}
const na = "-10000px";
class jx {
  constructor(e, t, n, s) {
    this.facet = t, this.createTooltipView = n, this.removeTooltipView = s, this.input = e.state.facet(t), this.tooltips = this.input.filter((o) => o);
    let r = null;
    this.tooltipViews = this.tooltips.map((o) => r = n(o, r));
  }
  update(e, t) {
    var n;
    let s = e.state.facet(this.facet), r = s.filter((l) => l);
    if (s === this.input) {
      for (let l of this.tooltipViews)
        l.update && l.update(e);
      return !1;
    }
    let o = [], a = t ? [] : null;
    for (let l = 0; l < r.length; l++) {
      let h = r[l], c = -1;
      if (h) {
        for (let f = 0; f < this.tooltips.length; f++) {
          let d = this.tooltips[f];
          d && d.create == h.create && (c = f);
        }
        if (c < 0)
          o[l] = this.createTooltipView(h, l ? o[l - 1] : null), a && (a[l] = !!h.above);
        else {
          let f = o[l] = this.tooltipViews[c];
          a && (a[l] = t[c]), f.update && f.update(e);
        }
      }
    }
    for (let l of this.tooltipViews)
      o.indexOf(l) < 0 && (this.removeTooltipView(l), (n = l.destroy) === null || n === void 0 || n.call(l));
    return t && (a.forEach((l, h) => t[h] = l), t.length = a.length), this.input = s, this.tooltips = r, this.tooltipViews = o, !0;
  }
}
function Lx(i) {
  let e = i.dom.ownerDocument.documentElement;
  return { top: 0, left: 0, bottom: e.clientHeight, right: e.clientWidth };
}
const ah = /* @__PURE__ */ ve.define({
  combine: (i) => {
    var e, t, n;
    return {
      position: ae.ios ? "absolute" : ((e = i.find((s) => s.position)) === null || e === void 0 ? void 0 : e.position) || "fixed",
      parent: ((t = i.find((s) => s.parent)) === null || t === void 0 ? void 0 : t.parent) || null,
      tooltipSpace: ((n = i.find((s) => s.tooltipSpace)) === null || n === void 0 ? void 0 : n.tooltipSpace) || Lx
    };
  }
}), ed = /* @__PURE__ */ new WeakMap(), Sg = /* @__PURE__ */ cn.fromClass(class {
  constructor(i) {
    this.view = i, this.above = [], this.inView = !0, this.madeAbsolute = !1, this.lastTransaction = 0, this.measureTimeout = -1;
    let e = i.state.facet(ah);
    this.position = e.position, this.parent = e.parent, this.classes = i.themeClasses, this.createContainer(), this.measureReq = { read: this.readMeasure.bind(this), write: this.writeMeasure.bind(this), key: this }, this.resizeObserver = typeof ResizeObserver == "function" ? new ResizeObserver(() => this.measureSoon()) : null, this.manager = new jx(i, kg, (t, n) => this.createTooltip(t, n), (t) => {
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
    let t = e || i.geometryChanged, n = i.state.facet(ah);
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
    return t.dom.style.position = this.position, t.dom.style.top = na, t.dom.style.left = "0px", this.container.insertBefore(t.dom, n), t.mount && t.mount(this.view), this.resizeObserver && this.resizeObserver.observe(t.dom), t;
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
      if (ae.safari) {
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
    let n = this.view.scrollDOM.getBoundingClientRect(), s = df(this.view);
    return {
      visible: {
        left: n.left + s.left,
        top: n.top + s.top,
        right: n.right - s.right,
        bottom: n.bottom - s.bottom
      },
      parent: this.parent ? this.container.getBoundingClientRect() : this.view.dom.getBoundingClientRect(),
      pos: this.manager.tooltips.map((r, o) => {
        let a = this.manager.tooltipViews[o];
        return a.getCoords ? a.getCoords(r.pos) : this.view.coordsAtPos(r.pos);
      }),
      size: this.manager.tooltipViews.map(({ dom: r }) => r.getBoundingClientRect()),
      space: this.view.state.facet(ah).tooltipSpace(this.view),
      scaleX: i,
      scaleY: e,
      makeAbsolute: t
    };
  }
  writeMeasure(i) {
    var e;
    if (i.makeAbsolute) {
      this.madeAbsolute = !0, this.position = "absolute";
      for (let a of this.manager.tooltipViews)
        a.dom.style.position = "absolute";
    }
    let { visible: t, space: n, scaleX: s, scaleY: r } = i, o = [];
    for (let a = 0; a < this.manager.tooltips.length; a++) {
      let l = this.manager.tooltips[a], h = this.manager.tooltipViews[a], { dom: c } = h, f = i.pos[a], d = i.size[a];
      if (!f || l.clip !== !1 && (f.bottom <= Math.max(t.top, n.top) || f.top >= Math.min(t.bottom, n.bottom) || f.right < Math.max(t.left, n.left) - 0.1 || f.left > Math.min(t.right, n.right) + 0.1)) {
        c.style.top = na;
        continue;
      }
      let p = l.arrow ? h.dom.querySelector(".cm-tooltip-arrow") : null, O = p ? 7 : 0, g = d.right - d.left, m = (e = ed.get(h)) !== null && e !== void 0 ? e : d.bottom - d.top, v = h.offset || Dx, Q = this.view.textDirection == dt.LTR, k = d.width > n.right - n.left ? Q ? n.left : n.right - d.width : Q ? Math.max(n.left, Math.min(f.left - (p ? 14 : 0) + v.x, n.right - g)) : Math.min(Math.max(n.left, f.left - g + (p ? 14 : 0) - v.x), n.right - g), R = this.above[a];
      !l.strictSide && (R ? f.top - m - O - v.y < n.top : f.bottom + m + O + v.y > n.bottom) && R == n.bottom - f.bottom > f.top - n.top && (R = this.above[a] = !R);
      let T = (R ? f.top - n.top : n.bottom - f.bottom) - O;
      if (T < m && h.resize !== !1) {
        if (T < this.view.defaultLineHeight) {
          c.style.top = na;
          continue;
        }
        ed.set(h, m), c.style.height = (m = T) / r + "px";
      } else c.style.height && (c.style.height = "");
      let M = R ? f.top - m - O - v.y : f.bottom + O + v.y, C = k + g;
      if (h.overlap !== !0)
        for (let z of o)
          z.left < C && z.right > k && z.top < M + m && z.bottom > M && (M = R ? z.top - m - 2 - O : z.bottom + O + 2);
      if (this.position == "absolute" ? (c.style.top = (M - i.parent.top) / r + "px", td(c, (k - i.parent.left) / s)) : (c.style.top = M / r + "px", td(c, k / s)), p) {
        let z = f.left + (Q ? v.x : -v.x) - (k + 14 - 7);
        p.style.left = z / s + "px";
      }
      h.overlap !== !0 && o.push({ left: k, top: M, right: C, bottom: M + m }), c.classList.toggle("cm-tooltip-above", R), c.classList.toggle("cm-tooltip-below", !R), h.positioned && h.positioned(i.space);
    }
  }
  maybeMeasure() {
    if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView)))
      for (let i of this.manager.tooltipViews)
        i.dom.style.top = na;
  }
}, {
  eventObservers: {
    scroll() {
      this.maybeMeasure();
    }
  }
});
function td(i, e) {
  let t = parseInt(i.style.left, 10);
  (isNaN(t) || Math.abs(e - t) > 1) && (i.style.left = e + "px");
}
const Ix = /* @__PURE__ */ me.baseTheme({
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
}), Dx = { x: 0, y: 0 }, kg = /* @__PURE__ */ ve.define({
  enables: [Sg, Ix]
});
function Qg(i, e) {
  let t = i.plugin(Sg);
  if (!t)
    return null;
  let n = t.manager.tooltips.indexOf(e);
  return n < 0 ? null : t.manager.tooltipViews[n];
}
class yr extends Gn {
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
yr.prototype.elementClass = "";
yr.prototype.toDOM = void 0;
yr.prototype.mapMode = Yt.TrackBefore;
yr.prototype.startSide = yr.prototype.endSide = -1;
yr.prototype.point = !0;
const $g = 1024;
let zx = 0;
class lh {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
class Re {
  /**
  Create a new node prop type.
  */
  constructor(e = {}) {
    this.id = zx++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
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
    return typeof e != "function" && (e = ni.match(e)), (t) => {
      let n = e(t);
      return n === void 0 ? null : [this, n];
    };
  }
}
Re.closedBy = new Re({ deserialize: (i) => i.split(" ") });
Re.openedBy = new Re({ deserialize: (i) => i.split(" ") });
Re.group = new Re({ deserialize: (i) => i.split(" ") });
Re.isolate = new Re({ deserialize: (i) => {
  if (i && i != "rtl" && i != "ltr" && i != "auto")
    throw new RangeError("Invalid value for isolate: " + i);
  return i || "auto";
} });
Re.contextHash = new Re({ perNode: !0 });
Re.lookAhead = new Re({ perNode: !0 });
Re.mounted = new Re({ perNode: !0 });
class ao {
  constructor(e, t, n, s = !1) {
    this.tree = e, this.overlay = t, this.parser = n, this.bracketed = s;
  }
  /**
  @internal
  */
  static get(e) {
    return e && e.props && e.props[Re.mounted.id];
  }
}
const Nx = /* @__PURE__ */ Object.create(null);
class ni {
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
    let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : Nx, n = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), s = new ni(e.name || "", t, e.id, n);
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
      let t = this.prop(Re.group);
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
      for (let s = n.prop(Re.group), r = -1; r < (s ? s.length : 0); r++) {
        let o = t[r < 0 ? n.name : s[r]];
        if (o)
          return o;
      }
    };
  }
}
ni.none = new ni(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* NodeFlag.Anonymous */
);
class mf {
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
          let a = o[1], l = o[0];
          l.combine && l.id in s && (a = l.combine(s[l.id], a)), s[l.id] = a;
        }
      }
      t.push(s ? new ni(n.name, s, n.id, n.flags) : n);
    }
    return new mf(t);
  }
}
const sa = /* @__PURE__ */ new WeakMap(), id = /* @__PURE__ */ new WeakMap();
var ht;
(function(i) {
  i[i.ExcludeBuffers = 1] = "ExcludeBuffers", i[i.IncludeAnonymous = 2] = "IncludeAnonymous", i[i.IgnoreMounts = 4] = "IgnoreMounts", i[i.IgnoreOverlays = 8] = "IgnoreOverlays", i[i.EnterBracketed = 16] = "EnterBracketed";
})(ht || (ht = {}));
class bt {
  /**
  Construct a new tree. See also [`Tree.build`](#common.Tree^build).
  */
  constructor(e, t, n, s, r) {
    if (this.type = e, this.children = t, this.positions = n, this.length = s, this.props = null, r && r.length) {
      this.props = /* @__PURE__ */ Object.create(null);
      for (let [o, a] of r)
        this.props[typeof o == "number" ? o : o.id] = a;
    }
  }
  /**
  @internal
  */
  toString() {
    let e = ao.get(this);
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
    return new bc(this.topNode, e);
  }
  /**
  Get a [tree cursor](#common.TreeCursor) pointing into this tree
  at the given position and side (see
  [`moveTo`](#common.TreeCursor.moveTo).
  */
  cursorAt(e, t = 0, n = 0) {
    let s = sa.get(this) || this.topNode, r = new bc(s);
    return r.moveTo(e, t), sa.set(this, r._tree), r;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) object for the top of the
  tree.
  */
  get topNode() {
    return new ii(this, 0, 0, null);
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
    let n = yo(sa.get(this) || this.topNode, e, t, !1);
    return sa.set(this, n), n;
  }
  /**
  Like [`resolve`](#common.Tree.resolve), but will enter
  [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  pointing into the innermost overlaid tree at the given position
  (with parent links going through all parent structure, including
  the host trees).
  */
  resolveInner(e, t = 0) {
    let n = yo(id.get(this) || this.topNode, e, t, !0);
    return id.set(this, n), n;
  }
  /**
  In some situations, it can be useful to iterate through all
  nodes around a position, including those in overlays that don't
  directly cover the position. This method gives you an iterator
  that will produce all nodes, from small to big, around the given
  position.
  */
  resolveStack(e, t = 0) {
    return Wx(this, e, t);
  }
  /**
  Iterate over the tree and its children, calling `enter` for any
  node that touches the `from`/`to` region (if given) before
  running over such a node's children, and `leave` (if given) when
  leaving the node. When `enter` returns `false`, that node will
  not have its children iterated over (or `leave` called).
  */
  iterate(e) {
    let { enter: t, leave: n, from: s = 0, to: r = this.length } = e, o = e.mode || 0, a = (o & ht.IncludeAnonymous) > 0;
    for (let l = this.cursor(o | ht.IncludeAnonymous); ; ) {
      let h = !1;
      if (l.from <= r && l.to >= s && (!a && l.type.isAnonymous || t(l) !== !1)) {
        if (l.firstChild())
          continue;
        h = !0;
      }
      for (; h && n && (a || !l.type.isAnonymous) && n(l), !l.nextSibling(); ) {
        if (!l.parent())
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
    return this.children.length <= 8 ? this : yf(ni.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, n, s) => new bt(this.type, t, n, s, this.propValues), e.makeTree || ((t, n, s) => new bt(ni.none, t, n, s)));
  }
  /**
  Build a tree from a postfix-ordered buffer of node information,
  or a cursor over such a buffer.
  */
  static build(e) {
    return Vx(e);
  }
}
bt.empty = new bt(ni.none, [], [], 0);
class vf {
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
    return new vf(this.buffer, this.index);
  }
}
class Hn {
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
    return ni.none;
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
    let { buffer: o } = this, a = -1;
    for (let l = e; l != t && !(_g(r, s, o[l + 1], o[l + 2]) && (a = l, n > 0)); l = o[l + 3])
      ;
    return a;
  }
  /**
  @internal
  */
  slice(e, t, n) {
    let s = this.buffer, r = new Uint16Array(t - e), o = 0;
    for (let a = e, l = 0; a < t; ) {
      r[l++] = s[a++], r[l++] = s[a++] - n;
      let h = r[l++] = s[a++] - n;
      r[l++] = s[a++] - e, o = Math.max(o, h);
    }
    return new Hn(r, o, this.set);
  }
}
function _g(i, e, t, n) {
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
function yo(i, e, t, n) {
  for (var s; i.from == i.to || (t < 1 ? i.from >= e : i.from > e) || (t > -1 ? i.to <= e : i.to < e); ) {
    let o = !n && i instanceof ii && i.index < 0 ? null : i.parent;
    if (!o)
      return i;
    i = o;
  }
  let r = n ? 0 : ht.IgnoreOverlays;
  if (n)
    for (let o = i, a = o.parent; a; o = a, a = o.parent)
      o instanceof ii && o.index < 0 && ((s = a.enter(e, t, r)) === null || s === void 0 ? void 0 : s.from) != o.from && (i = a);
  for (; ; ) {
    let o = i.enter(e, t, r);
    if (!o)
      return i;
    i = o;
  }
}
class Pg {
  cursor(e = 0) {
    return new bc(this, e);
  }
  getChild(e, t = null, n = null) {
    let s = nd(this, e, t, n);
    return s.length ? s[0] : null;
  }
  getChildren(e, t = null, n = null) {
    return nd(this, e, t, n);
  }
  resolve(e, t = 0) {
    return yo(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return yo(this, e, t, !0);
  }
  matchContext(e) {
    return vc(this.parent, e);
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
class ii extends Pg {
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
      for (let { children: a, positions: l } = o._tree, h = t > 0 ? a.length : -1; e != h; e += t) {
        let c = a[e], f = l[e] + o.from, d;
        if (!(!(r & ht.EnterBracketed && c instanceof bt && (d = ao.get(c)) && !d.overlay && d.bracketed && n >= f && n <= f + c.length) && !_g(s, n, f, f + c.length))) {
          if (c instanceof Hn) {
            if (r & ht.ExcludeBuffers)
              continue;
            let p = c.findChild(0, c.buffer.length, t, n - f, s);
            if (p > -1)
              return new rn(new Yx(o, c, e, f), null, p);
          } else if (r & ht.IncludeAnonymous || !c.type.isAnonymous || bf(c)) {
            let p;
            if (!(r & ht.IgnoreMounts) && (p = ao.get(c)) && !p.overlay)
              return new ii(p.tree, f, e, o);
            let O = new ii(c, f, e, o);
            return r & ht.IncludeAnonymous || !O.type.isAnonymous ? O : O.nextChild(t < 0 ? c.children.length - 1 : 0, t, n, s, r);
          }
        }
      }
      if (r & ht.IncludeAnonymous || !o.type.isAnonymous || (o.index >= 0 ? e = o.index + t : e = t < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o))
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
    if (!(n & ht.IgnoreOverlays) && (s = ao.get(this._tree)) && s.overlay) {
      let r = e - this.from, o = n & ht.EnterBracketed && s.bracketed;
      for (let { from: a, to: l } of s.overlay)
        if ((t > 0 || o ? a <= r : a < r) && (t < 0 || o ? l >= r : l > r))
          return new ii(s.tree, s.overlay[0].from + this.from, -1, this);
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
function nd(i, e, t, n) {
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
function vc(i, e, t = e.length - 1) {
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
class Yx {
  constructor(e, t, n, s) {
    this.parent = e, this.buffer = t, this.index = n, this.start = s;
  }
}
class rn extends Pg {
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
    return r < 0 ? null : new rn(this.context, this, r);
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
    if (n & ht.ExcludeBuffers)
      return null;
    let { buffer: s } = this.context, r = s.findChild(this.index + 4, s.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
    return r < 0 ? null : new rn(this.context, this, r);
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
    return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new rn(this.context, this._parent, t) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
    return this.index == t ? this.externalSibling(-1) : new rn(this.context, this._parent, e.findChild(
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
    return new bt(this.type, e, t, this.to - this.from);
  }
  /**
  @internal
  */
  toString() {
    return this.context.buffer.childString(this.index);
  }
}
function Tg(i) {
  if (!i.length)
    return null;
  let e = 0, t = i[0];
  for (let r = 1; r < i.length; r++) {
    let o = i[r];
    (o.from > t.from || o.to < t.to) && (t = o, e = r);
  }
  let n = t instanceof ii && t.index < 0 ? null : t.parent, s = i.slice();
  return n ? s[e] = n : s.splice(e, 1), new qx(s, t);
}
class qx {
  constructor(e, t) {
    this.heads = e, this.node = t;
  }
  get next() {
    return Tg(this.heads);
  }
}
function Wx(i, e, t) {
  let n = i.resolveInner(e, t), s = null;
  for (let r = n instanceof ii ? n : n.context.parent; r; r = r.parent)
    if (r.index < 0) {
      let o = r.parent;
      (s || (s = [n])).push(o.resolve(e, t)), r = o;
    } else {
      let o = ao.get(r.tree);
      if (o && o.overlay && o.overlay[0].from <= e && o.overlay[o.overlay.length - 1].to >= e) {
        let a = new ii(o.tree, o.overlay[0].from + r.from, -1, r);
        (s || (s = [n])).push(yo(a, e, t, !1));
      }
    }
  return s ? Tg(s) : n;
}
class bc {
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
    if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~ht.EnterBracketed, e instanceof ii)
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
    return e ? e instanceof ii ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
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
    return this.buffer ? n & ht.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, n));
  }
  /**
  Move to the node's parent node, if this isn't the top node.
  */
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & ht.IncludeAnonymous ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let e = this.mode & ht.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
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
          let a = n._tree.children[r];
          if (this.mode & ht.IncludeAnonymous || a instanceof Hn || !a.type.isAnonymous || bf(a))
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
      t = new rn(this.buffer, t, this.stack[s]);
    return this.bufferNode = new rn(this.buffer, t, this.index);
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
      return vc(this.node.parent, e);
    let { buffer: t } = this.buffer, { types: n } = t.set;
    for (let s = e.length - 1, r = this.stack.length - 1; s >= 0; r--) {
      if (r < 0)
        return vc(this._tree, e, s);
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
function bf(i) {
  return i.children.some((e) => e instanceof Hn || !e.type.isAnonymous || bf(e));
}
function Vx(i) {
  var e;
  let { buffer: t, nodeSet: n, maxBufferLength: s = $g, reused: r = [], minRepeatType: o = n.types.length } = i, a = Array.isArray(t) ? new vf(t, t.length) : t, l = n.types, h = 0, c = 0;
  function f(T, M, C, z, D, N) {
    let { id: Y, start: y, end: _, size: P } = a, $ = c, X = h;
    if (P < 0)
      if (a.next(), P == -1) {
        let he = r[Y];
        C.push(he), z.push(y - T);
        return;
      } else if (P == -3) {
        h = Y;
        return;
      } else if (P == -4) {
        c = Y;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${P}`);
    let Z = l[Y], H, J, te = y - T;
    if (_ - y <= s && (J = m(a.pos - M, D))) {
      let he = new Uint16Array(J.size - J.skip), ue = a.pos - J.size, ie = he.length;
      for (; a.pos > ue; )
        ie = v(J.start, he, ie);
      H = new Hn(he, _ - J.start, n), te = J.start - T;
    } else {
      let he = a.pos - P;
      a.next();
      let ue = [], ie = [], ce = Y >= o ? Y : -1, ye = 0, re = _;
      for (; a.pos > he; )
        ce >= 0 && a.id == ce && a.size >= 0 ? (a.end <= re - s && (O(ue, ie, y, ye, a.end, re, ce, $, X), ye = ue.length, re = a.end), a.next()) : N > 2500 ? d(y, he, ue, ie) : f(y, he, ue, ie, ce, N + 1);
      if (ce >= 0 && ye > 0 && ye < ue.length && O(ue, ie, y, ye, y, re, ce, $, X), ue.reverse(), ie.reverse(), ce > -1 && ye > 0) {
        let xe = p(Z, X);
        H = yf(Z, ue, ie, 0, ue.length, 0, _ - y, xe, xe);
      } else
        H = g(Z, ue, ie, _ - y, $ - _, X);
    }
    C.push(H), z.push(te);
  }
  function d(T, M, C, z) {
    let D = [], N = 0, Y = -1;
    for (; a.pos > M; ) {
      let { id: y, start: _, end: P, size: $ } = a;
      if ($ > 4)
        a.next();
      else {
        if (Y > -1 && _ < Y)
          break;
        Y < 0 && (Y = P - s), D.push(y, _, P), N++, a.next();
      }
    }
    if (N) {
      let y = new Uint16Array(N * 4), _ = D[D.length - 2];
      for (let P = D.length - 3, $ = 0; P >= 0; P -= 3)
        y[$++] = D[P], y[$++] = D[P + 1] - _, y[$++] = D[P + 2] - _, y[$++] = $;
      C.push(new Hn(y, D[2] - _, n)), z.push(_ - T);
    }
  }
  function p(T, M) {
    return (C, z, D) => {
      let N = 0, Y = C.length - 1, y, _;
      if (Y >= 0 && (y = C[Y]) instanceof bt) {
        if (!Y && y.type == T && y.length == D)
          return y;
        (_ = y.prop(Re.lookAhead)) && (N = z[Y] + y.length + _);
      }
      return g(T, C, z, D, N, M);
    };
  }
  function O(T, M, C, z, D, N, Y, y, _) {
    let P = [], $ = [];
    for (; T.length > z; )
      P.push(T.pop()), $.push(M.pop() + C - D);
    T.push(g(n.types[Y], P, $, N - D, y - N, _)), M.push(D - C);
  }
  function g(T, M, C, z, D, N, Y) {
    if (N) {
      let y = [Re.contextHash, N];
      Y = Y ? [y].concat(Y) : [y];
    }
    if (D > 25) {
      let y = [Re.lookAhead, D];
      Y = Y ? [y].concat(Y) : [y];
    }
    return new bt(T, M, C, z, Y);
  }
  function m(T, M) {
    let C = a.fork(), z = 0, D = 0, N = 0, Y = C.end - s, y = { size: 0, start: 0, skip: 0 };
    e: for (let _ = C.pos - T; C.pos > _; ) {
      let P = C.size;
      if (C.id == M && P >= 0) {
        y.size = z, y.start = D, y.skip = N, N += 4, z += 4, C.next();
        continue;
      }
      let $ = C.pos - P;
      if (P < 0 || $ < _ || C.start < Y)
        break;
      let X = C.id >= o ? 4 : 0, Z = C.start;
      for (C.next(); C.pos > $; ) {
        if (C.size < 0)
          if (C.size == -3 || C.size == -4)
            X += 4;
          else
            break e;
        else C.id >= o && (X += 4);
        C.next();
      }
      D = Z, z += P, N += X;
    }
    return (M < 0 || z == T) && (y.size = z, y.start = D, y.skip = N), y.size > 4 ? y : void 0;
  }
  function v(T, M, C) {
    let { id: z, start: D, end: N, size: Y } = a;
    if (a.next(), Y >= 0 && z < o) {
      let y = C;
      if (Y > 4) {
        let _ = a.pos - (Y - 4);
        for (; a.pos > _; )
          C = v(T, M, C);
      }
      M[--C] = y, M[--C] = N - T, M[--C] = D - T, M[--C] = z;
    } else Y == -3 ? h = z : Y == -4 && (c = z);
    return C;
  }
  let Q = [], k = [];
  for (; a.pos > 0; )
    f(i.start || 0, i.bufferStart || 0, Q, k, -1, 0);
  let R = (e = i.length) !== null && e !== void 0 ? e : Q.length ? k[0] + Q[0].length : 0;
  return new bt(l[i.topID], Q.reverse(), k.reverse(), R);
}
const sd = /* @__PURE__ */ new WeakMap();
function wa(i, e) {
  if (!i.isAnonymous || e instanceof Hn || e.type != i)
    return 1;
  let t = sd.get(e);
  if (t == null) {
    t = 1;
    for (let n of e.children) {
      if (n.type != i || !(n instanceof bt)) {
        t = 1;
        break;
      }
      t += wa(i, n);
    }
    sd.set(e, t);
  }
  return t;
}
function yf(i, e, t, n, s, r, o, a, l) {
  let h = 0;
  for (let O = n; O < s; O++)
    h += wa(i, e[O]);
  let c = Math.ceil(
    h * 1.5 / 8
    /* Balance.BranchFactor */
  ), f = [], d = [];
  function p(O, g, m, v, Q) {
    for (let k = m; k < v; ) {
      let R = k, T = g[k], M = wa(i, O[k]);
      for (k++; k < v; k++) {
        let C = wa(i, O[k]);
        if (M + C >= c)
          break;
        M += C;
      }
      if (k == R + 1) {
        if (M > c) {
          let C = O[R];
          p(C.children, C.positions, 0, C.children.length, g[R] + Q);
          continue;
        }
        f.push(O[R]);
      } else {
        let C = g[k - 1] + O[k - 1].length - T;
        f.push(yf(i, O, g, R, k, T, C, null, l));
      }
      d.push(T + Q - r);
    }
  }
  return p(e, t, n, s, 0), (a || l)(f, d, o);
}
class Bx {
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
    e instanceof rn ? this.setBuffer(e.context.buffer, e.index, t) : e instanceof ii && this.map.set(e.tree, t);
  }
  /**
  Retrieve value for this syntax node, if it exists in the map.
  */
  get(e) {
    return e instanceof rn ? this.getBuffer(e.context.buffer, e.index) : e instanceof ii ? this.map.get(e.tree) : void 0;
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
class bs {
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
    let s = [new bs(0, e.length, e, 0, !1, n)];
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
    for (let a = 0, l = 0, h = 0; ; a++) {
      let c = a < t.length ? t[a] : null, f = c ? c.fromA : 1e9;
      if (f - l >= n)
        for (; o && o.from < f; ) {
          let d = o;
          if (l >= d.from || f <= d.to || h) {
            let p = Math.max(d.from, l) - h, O = Math.min(d.to, f) - h;
            d = p >= O ? null : new bs(p, O, d.tree, d.offset + h, a > 0, !!c);
          }
          if (d && s.push(d), o.to > f)
            break;
          o = r < e.length ? e[r++] : null;
        }
      if (!c)
        break;
      l = c.toA, h = c.toA - c.toB;
    }
    return s;
  }
}
class Cg {
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
    return typeof e == "string" && (e = new Gx(e)), n = n ? n.length ? n.map((s) => new lh(s.from, s.to)) : [new lh(0, 0)] : [new lh(0, e.length)], this.createParse(e, t || [], n);
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
class Gx {
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
new Re({ perNode: !0 });
let Ux = 0;
class bi {
  /**
  @internal
  */
  constructor(e, t, n, s) {
    this.name = e, this.set = t, this.base = n, this.modified = s, this.id = Ux++;
  }
  toString() {
    let { name: e } = this;
    for (let t of this.modified)
      t.name && (e = `${t.name}(${e})`);
    return e;
  }
  static define(e, t) {
    let n = typeof e == "string" ? e : "?";
    if (e instanceof bi && (t = e), t != null && t.base)
      throw new Error("Can not derive from a modified tag");
    let s = new bi(n, [], null, []);
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
    let t = new Ya(e);
    return (n) => n.modified.indexOf(t) > -1 ? n : Ya.get(n.base || n, n.modified.concat(t).sort((s, r) => s.id - r.id));
  }
}
let Fx = 0;
class Ya {
  constructor(e) {
    this.name = e, this.instances = [], this.id = Fx++;
  }
  static get(e, t) {
    if (!t.length)
      return e;
    let n = t[0].instances.find((a) => a.base == e && Hx(t, a.modified));
    if (n)
      return n;
    let s = [], r = new bi(e.name, s, e, t);
    for (let a of t)
      a.instances.push(r);
    let o = Kx(t);
    for (let a of e.set)
      if (!a.modified.length)
        for (let l of o)
          s.push(Ya.get(a, l));
    return r;
  }
}
function Hx(i, e) {
  return i.length == e.length && i.every((t, n) => t == e[n]);
}
function Kx(i) {
  let e = [[]];
  for (let t = 0; t < i.length; t++)
    for (let n = 0, s = e.length; n < s; n++)
      e.push(e[n].concat(i[t]));
  return e.sort((t, n) => n.length - t.length);
}
function Zg(i) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t in i) {
    let n = i[t];
    Array.isArray(n) || (n = [n]);
    for (let s of t.split(" "))
      if (s) {
        let r = [], o = 2, a = s;
        for (let f = 0; ; ) {
          if (a == "..." && f > 0 && f + 3 == s.length) {
            o = 1;
            break;
          }
          let d = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(a);
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
          a = s.slice(f);
        }
        let l = r.length - 1, h = r[l];
        if (!h)
          throw new RangeError("Invalid path: " + s);
        let c = new qa(n, o, l > 0 ? r.slice(0, l) : null);
        e[h] = c.sort(e[h]);
      }
  }
  return Jx.add(e);
}
const Jx = new Re({
  combine(i, e) {
    let t, n, s;
    for (; i || e; ) {
      if (!i || e && i.depth >= e.depth ? (s = e, e = e.next) : (s = i, i = i.next), t && t.mode == s.mode && !s.context && !t.context)
        continue;
      let r = new qa(s.tags, s.mode, s.context);
      t ? t.next = r : n = r, t = r;
    }
    return n;
  }
});
class qa {
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
qa.empty = new qa([], 2, null);
function eS(i, e) {
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
      for (let a of r)
        for (let l of a.set) {
          let h = t[l.id];
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
const se = bi.define, ra = se(), Mn = se(), rd = se(Mn), od = se(Mn), Xn = se(), oa = se(Xn), hh = se(Xn), Ui = se(), ts = se(Ui), Bi = se(), Gi = se(), yc = se(), jr = se(yc), aa = se(), q = {
  /**
  A comment.
  */
  comment: ra,
  /**
  A line [comment](#highlight.tags.comment).
  */
  lineComment: se(ra),
  /**
  A block [comment](#highlight.tags.comment).
  */
  blockComment: se(ra),
  /**
  A documentation [comment](#highlight.tags.comment).
  */
  docComment: se(ra),
  /**
  Any kind of identifier.
  */
  name: Mn,
  /**
  The [name](#highlight.tags.name) of a variable.
  */
  variableName: se(Mn),
  /**
  A type [name](#highlight.tags.name).
  */
  typeName: rd,
  /**
  A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
  */
  tagName: se(rd),
  /**
  A property or field [name](#highlight.tags.name).
  */
  propertyName: od,
  /**
  An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
  */
  attributeName: se(od),
  /**
  The [name](#highlight.tags.name) of a class.
  */
  className: se(Mn),
  /**
  A label [name](#highlight.tags.name).
  */
  labelName: se(Mn),
  /**
  A namespace [name](#highlight.tags.name).
  */
  namespace: se(Mn),
  /**
  The [name](#highlight.tags.name) of a macro.
  */
  macroName: se(Mn),
  /**
  A literal value.
  */
  literal: Xn,
  /**
  A string [literal](#highlight.tags.literal).
  */
  string: oa,
  /**
  A documentation [string](#highlight.tags.string).
  */
  docString: se(oa),
  /**
  A character literal (subtag of [string](#highlight.tags.string)).
  */
  character: se(oa),
  /**
  An attribute value (subtag of [string](#highlight.tags.string)).
  */
  attributeValue: se(oa),
  /**
  A number [literal](#highlight.tags.literal).
  */
  number: hh,
  /**
  An integer [number](#highlight.tags.number) literal.
  */
  integer: se(hh),
  /**
  A floating-point [number](#highlight.tags.number) literal.
  */
  float: se(hh),
  /**
  A boolean [literal](#highlight.tags.literal).
  */
  bool: se(Xn),
  /**
  Regular expression [literal](#highlight.tags.literal).
  */
  regexp: se(Xn),
  /**
  An escape [literal](#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: se(Xn),
  /**
  A color [literal](#highlight.tags.literal).
  */
  color: se(Xn),
  /**
  A URL [literal](#highlight.tags.literal).
  */
  url: se(Xn),
  /**
  A language keyword.
  */
  keyword: Bi,
  /**
  The [keyword](#highlight.tags.keyword) for the self or this
  object.
  */
  self: se(Bi),
  /**
  The [keyword](#highlight.tags.keyword) for null.
  */
  null: se(Bi),
  /**
  A [keyword](#highlight.tags.keyword) denoting some atomic value.
  */
  atom: se(Bi),
  /**
  A [keyword](#highlight.tags.keyword) that represents a unit.
  */
  unit: se(Bi),
  /**
  A modifier [keyword](#highlight.tags.keyword).
  */
  modifier: se(Bi),
  /**
  A [keyword](#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: se(Bi),
  /**
  A control-flow related [keyword](#highlight.tags.keyword).
  */
  controlKeyword: se(Bi),
  /**
  A [keyword](#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: se(Bi),
  /**
  A [keyword](#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: se(Bi),
  /**
  An operator.
  */
  operator: Gi,
  /**
  An [operator](#highlight.tags.operator) that dereferences something.
  */
  derefOperator: se(Gi),
  /**
  Arithmetic-related [operator](#highlight.tags.operator).
  */
  arithmeticOperator: se(Gi),
  /**
  Logical [operator](#highlight.tags.operator).
  */
  logicOperator: se(Gi),
  /**
  Bit [operator](#highlight.tags.operator).
  */
  bitwiseOperator: se(Gi),
  /**
  Comparison [operator](#highlight.tags.operator).
  */
  compareOperator: se(Gi),
  /**
  [Operator](#highlight.tags.operator) that updates its operand.
  */
  updateOperator: se(Gi),
  /**
  [Operator](#highlight.tags.operator) that defines something.
  */
  definitionOperator: se(Gi),
  /**
  Type-related [operator](#highlight.tags.operator).
  */
  typeOperator: se(Gi),
  /**
  Control-flow [operator](#highlight.tags.operator).
  */
  controlOperator: se(Gi),
  /**
  Program or markup punctuation.
  */
  punctuation: yc,
  /**
  [Punctuation](#highlight.tags.punctuation) that separates
  things.
  */
  separator: se(yc),
  /**
  Bracket-style [punctuation](#highlight.tags.punctuation).
  */
  bracket: jr,
  /**
  Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: se(jr),
  /**
  Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: se(jr),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  paren: se(jr),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  brace: se(jr),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: Ui,
  /**
  [Content](#highlight.tags.content) that represents a heading.
  */
  heading: ts,
  /**
  A level 1 [heading](#highlight.tags.heading).
  */
  heading1: se(ts),
  /**
  A level 2 [heading](#highlight.tags.heading).
  */
  heading2: se(ts),
  /**
  A level 3 [heading](#highlight.tags.heading).
  */
  heading3: se(ts),
  /**
  A level 4 [heading](#highlight.tags.heading).
  */
  heading4: se(ts),
  /**
  A level 5 [heading](#highlight.tags.heading).
  */
  heading5: se(ts),
  /**
  A level 6 [heading](#highlight.tags.heading).
  */
  heading6: se(ts),
  /**
  A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
  */
  contentSeparator: se(Ui),
  /**
  [Content](#highlight.tags.content) that represents a list.
  */
  list: se(Ui),
  /**
  [Content](#highlight.tags.content) that represents a quote.
  */
  quote: se(Ui),
  /**
  [Content](#highlight.tags.content) that is emphasized.
  */
  emphasis: se(Ui),
  /**
  [Content](#highlight.tags.content) that is styled strong.
  */
  strong: se(Ui),
  /**
  [Content](#highlight.tags.content) that is part of a link.
  */
  link: se(Ui),
  /**
  [Content](#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: se(Ui),
  /**
  [Content](#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: se(Ui),
  /**
  Inserted text in a change-tracking format.
  */
  inserted: se(),
  /**
  Deleted text.
  */
  deleted: se(),
  /**
  Changed text.
  */
  changed: se(),
  /**
  An invalid or unsyntactic element.
  */
  invalid: se(),
  /**
  Metadata or meta-instruction.
  */
  meta: aa,
  /**
  [Metadata](#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: se(aa),
  /**
  [Metadata](#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: se(aa),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](#highlight.tags.meta).
  */
  processingInstruction: se(aa),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](#highlight.tags.name) tags.
  */
  definition: bi.defineModifier("definition"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](#highlight.tags.variableName).
  */
  constant: bi.defineModifier("constant"),
  /**
  [Modifier](#highlight.Tag^defineModifier) used to indicate that
  a [variable](#highlight.tags.variableName) or [property
  name](#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: bi.defineModifier("function"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that can be applied to
  [names](#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: bi.defineModifier("standard"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates a given
  [names](#highlight.tags.name) is local to some scope.
  */
  local: bi.defineModifier("local"),
  /**
  A generic variant [modifier](#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](#highlight.tags.string) and
  [variable name](#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: bi.defineModifier("special")
};
for (let i in q) {
  let e = q[i];
  e instanceof bi && (e.name = i);
}
eS([
  { tag: q.link, class: "tok-link" },
  { tag: q.heading, class: "tok-heading" },
  { tag: q.emphasis, class: "tok-emphasis" },
  { tag: q.strong, class: "tok-strong" },
  { tag: q.keyword, class: "tok-keyword" },
  { tag: q.atom, class: "tok-atom" },
  { tag: q.bool, class: "tok-bool" },
  { tag: q.url, class: "tok-url" },
  { tag: q.labelName, class: "tok-labelName" },
  { tag: q.inserted, class: "tok-inserted" },
  { tag: q.deleted, class: "tok-deleted" },
  { tag: q.literal, class: "tok-literal" },
  { tag: q.string, class: "tok-string" },
  { tag: q.number, class: "tok-number" },
  { tag: [q.regexp, q.escape, q.special(q.string)], class: "tok-string2" },
  { tag: q.variableName, class: "tok-variableName" },
  { tag: q.local(q.variableName), class: "tok-variableName tok-local" },
  { tag: q.definition(q.variableName), class: "tok-variableName tok-definition" },
  { tag: q.special(q.variableName), class: "tok-variableName2" },
  { tag: q.definition(q.propertyName), class: "tok-propertyName tok-definition" },
  { tag: q.typeName, class: "tok-typeName" },
  { tag: q.namespace, class: "tok-namespace" },
  { tag: q.className, class: "tok-className" },
  { tag: q.macroName, class: "tok-macroName" },
  { tag: q.propertyName, class: "tok-propertyName" },
  { tag: q.operator, class: "tok-operator" },
  { tag: q.comment, class: "tok-comment" },
  { tag: q.meta, class: "tok-meta" },
  { tag: q.invalid, class: "tok-invalid" },
  { tag: q.punctuation, class: "tok-punctuation" }
]);
var ch;
const Gr = /* @__PURE__ */ new Re();
function Eg(i) {
  return ve.define({
    combine: i ? (e) => e.concat(i) : void 0
  });
}
const wf = /* @__PURE__ */ new Re();
class on {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(e, t, n = [], s = "") {
    this.data = e, this.name = s, Be.prototype.hasOwnProperty("tree") || Object.defineProperty(Be.prototype, "tree", { get() {
      return Ti(this);
    } }), this.parser = t, this.extension = [
      xr.of(this),
      Be.languageData.of((r, o, a) => {
        let l = ad(r, o, a), h = l.type.prop(Gr);
        if (!h)
          return [];
        let c = r.facet(h), f = l.type.prop(wf);
        if (f) {
          let d = l.resolve(o - l.from, a);
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
    return ad(e, t, n).type.prop(Gr) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(e) {
    let t = e.facet(xr);
    if ((t == null ? void 0 : t.data) == this.data)
      return [{ from: 0, to: e.doc.length }];
    if (!t || !t.allowsNesting)
      return [];
    let n = [], s = (r, o) => {
      if (r.prop(Gr) == this.data) {
        n.push({ from: o, to: o + r.length });
        return;
      }
      let a = r.prop(Re.mounted);
      if (a) {
        if (a.tree.prop(Gr) == this.data) {
          if (a.overlay)
            for (let l of a.overlay)
              n.push({ from: l.from + o, to: l.to + o });
          else
            n.push({ from: o, to: o + r.length });
          return;
        } else if (a.overlay) {
          let l = n.length;
          if (s(a.tree, a.overlay[0].from + o), n.length > l)
            return;
        }
      }
      for (let l = 0; l < r.children.length; l++) {
        let h = r.children[l];
        h instanceof bt && s(h, r.positions[l] + o);
      }
    };
    return s(Ti(e), 0), n;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
on.setState = /* @__PURE__ */ Ke.define();
function ad(i, e, t) {
  let n = i.facet(xr), s = Ti(i).topNode;
  if (!n || n.allowsNesting)
    for (let r = s; r; r = r.enter(e, t, ht.ExcludeBuffers | ht.EnterBracketed))
      r.type.isTop && (s = r);
  return s;
}
class Wa extends on {
  constructor(e, t, n) {
    super(e, t, [], n), this.parser = t;
  }
  /**
  Define a language from a parser.
  */
  static define(e) {
    let t = Eg(e.languageData);
    return new Wa(t, e.parser.configure({
      props: [Gr.add((n) => n.isTop ? t : void 0)]
    }), e.name);
  }
  /**
  Create a new instance of this language with a reconfigured
  version of its parser and optionally a new name.
  */
  configure(e, t) {
    return new Wa(this.data, this.parser.configure(e), t || this.name);
  }
  get allowsNesting() {
    return this.parser.hasWrappers();
  }
}
function Ti(i) {
  let e = i.field(on.state, !1);
  return e ? e.tree : bt.empty;
}
class tS {
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
let Lr = null;
class Va {
  constructor(e, t, n = [], s, r, o, a, l) {
    this.parser = e, this.state = t, this.fragments = n, this.tree = s, this.treeLen = r, this.viewport = o, this.skipped = a, this.scheduleOn = l, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(e, t, n) {
    return new Va(e, t, [], bt.empty, 0, n, [], null);
  }
  startParse() {
    return this.parser.startParse(new tS(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(e, t) {
    return t != null && t >= this.state.doc.length && (t = void 0), this.tree != bt.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var n;
      if (typeof e == "number") {
        let s = Date.now() + e;
        e = () => Date.now() > s;
      }
      for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
        let s = this.parse.advance();
        if (s)
          if (this.fragments = this.withoutTempSkipped(bs.addTree(s, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (n = this.parse.stoppedAt) !== null && n !== void 0 ? n : this.state.doc.length, this.tree = s, this.parse = null, this.treeLen < (t ?? this.state.doc.length))
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
    }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(bs.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(e) {
    let t = Lr;
    Lr = this;
    try {
      return e();
    } finally {
      Lr = t;
    }
  }
  withoutTempSkipped(e) {
    for (let t; t = this.tempSkipped.pop(); )
      e = ld(e, t.from, t.to);
    return e;
  }
  /**
  @internal
  */
  changes(e, t) {
    let { fragments: n, tree: s, treeLen: r, viewport: o, skipped: a } = this;
    if (this.takeTree(), !e.empty) {
      let l = [];
      if (e.iterChangedRanges((h, c, f, d) => l.push({ fromA: h, toA: c, fromB: f, toB: d })), n = bs.applyChanges(n, l), s = bt.empty, r = 0, o = { from: e.mapPos(o.from, -1), to: e.mapPos(o.to, 1) }, this.skipped.length) {
        a = [];
        for (let h of this.skipped) {
          let c = e.mapPos(h.from, 1), f = e.mapPos(h.to, -1);
          c < f && a.push({ from: c, to: f });
        }
      }
    }
    return new Va(this.parser, t, n, s, r, o, a, this.scheduleOn);
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
      s < e.to && r > e.from && (this.fragments = ld(this.fragments, s, r), this.skipped.splice(n--, 1));
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
    return new class extends Cg {
      createParse(t, n, s) {
        let r = s[0].from, o = s[s.length - 1].to;
        return {
          parsedPos: r,
          advance() {
            let l = Lr;
            if (l) {
              for (let h of s)
                l.tempSkipped.push(h);
              e && (l.scheduleOn = l.scheduleOn ? Promise.all([l.scheduleOn, e]) : e);
            }
            return this.parsedPos = o, new bt(ni.none, [], [], o - r);
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
    return Lr;
  }
}
function ld(i, e, t) {
  return bs.applyChanges(i, [{ fromA: e, toA: t, fromB: e, toB: t }]);
}
class wr {
  constructor(e) {
    this.context = e, this.tree = e.tree;
  }
  apply(e) {
    if (!e.docChanged && this.tree == this.context.tree)
      return this;
    let t = this.context.changes(e.changes, e.state), n = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
    return t.work(20, n) || t.takeTree(), new wr(t);
  }
  static init(e) {
    let t = Math.min(3e3, e.doc.length), n = Va.create(e.facet(xr).parser, e, { from: 0, to: t });
    return n.work(20, t) || n.takeTree(), new wr(n);
  }
}
on.state = /* @__PURE__ */ un.define({
  create: wr.init,
  update(i, e) {
    for (let t of e.effects)
      if (t.is(on.setState))
        return t.value;
    return e.startState.facet(xr) != e.state.facet(xr) ? wr.init(e.state) : i.apply(e);
  }
});
let Ag = (i) => {
  let e = setTimeout(
    () => i(),
    500
    /* Work.MaxPause */
  );
  return () => clearTimeout(e);
};
typeof requestIdleCallback < "u" && (Ag = (i) => {
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
const fh = typeof navigator < "u" && (!((ch = navigator.scheduling) === null || ch === void 0) && ch.isInputPending) ? () => navigator.scheduling.isInputPending() : null, iS = /* @__PURE__ */ cn.fromClass(class {
  constructor(e) {
    this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(e) {
    let t = this.view.state.field(on.state).context;
    (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: e } = this.view, t = e.field(on.state);
    (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = Ag(this.work));
  }
  work(e) {
    this.working = null;
    let t = Date.now();
    if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: n, viewport: { to: s } } = this.view, r = n.field(on.state);
    if (r.tree == r.context.tree && r.context.isDone(
      s + 1e5
      /* Work.MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, e && !fh ? Math.max(25, e.timeRemaining() - 5) : 1e9), a = r.context.treeLen < s && n.doc.length > s + 1e3, l = r.context.work(() => fh && fh() || Date.now() > o, s + (a ? 0 : 1e5));
    this.chunkBudget -= Date.now() - t, (l || this.chunkBudget <= 0) && (r.context.takeTree(), this.view.dispatch({ effects: on.setState.of(new wr(r.context)) })), this.chunkBudget > 0 && !(l && !a) && this.scheduleWork(), this.checkAsyncSchedule(r.context);
  }
  checkAsyncSchedule(e) {
    e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((t) => ui(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null);
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
}), xr = /* @__PURE__ */ ve.define({
  combine(i) {
    return i.length ? i[0] : null;
  },
  enables: (i) => [
    on.state,
    iS,
    me.contentAttributes.compute([i], (e) => {
      let t = e.facet(i);
      return t && t.name ? { "data-language": t.name } : {};
    })
  ]
});
class nS {
  /**
  Create a language support object.
  */
  constructor(e, t = []) {
    this.language = e, this.support = t, this.extension = [e, t];
  }
}
const sS = /* @__PURE__ */ ve.define(), Ql = /* @__PURE__ */ ve.define({
  combine: (i) => {
    if (!i.length)
      return "  ";
    let e = i[0];
    if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(i[0]));
    return e;
  }
});
function Ba(i) {
  let e = i.facet(Ql);
  return e.charCodeAt(0) == 9 ? i.tabSize * e.length : e.length;
}
function Ga(i, e) {
  let t = "", n = i.tabSize, s = i.facet(Ql)[0];
  if (s == "	") {
    for (; e >= n; )
      t += "	", e -= n;
    s = " ";
  }
  for (let r = 0; r < e; r++)
    t += s;
  return t;
}
function Rg(i, e) {
  i instanceof Be && (i = new $l(i));
  for (let n of i.state.facet(sS)) {
    let s = n(i, e);
    if (s !== void 0)
      return s;
  }
  let t = Ti(i.state);
  return t.length >= e ? rS(i, t, e) : null;
}
class $l {
  /**
  Create an indent context.
  */
  constructor(e, t = {}) {
    this.state = e, this.options = t, this.unit = Ba(e);
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
    return vl(e, this.state.tabSize, t);
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
const Mg = /* @__PURE__ */ new Re();
function rS(i, e, t) {
  let n = e.resolveStack(t), s = e.resolveInner(t, -1).resolve(t, 0).enterUnfinishedNodesBefore(t);
  if (s != n.node) {
    let r = [];
    for (let o = s; o && !(o.from < n.node.from || o.to > n.node.to || o.from == n.node.from && o.type == n.node.type); o = o.parent)
      r.push(o);
    for (let o = r.length - 1; o >= 0; o--)
      n = { node: r[o], next: n };
  }
  return Xg(n, i, t);
}
function Xg(i, e, t) {
  for (let n = i; n; n = n.next) {
    let s = aS(n.node);
    if (s)
      return s(xf.create(e, t, n));
  }
  return 0;
}
function oS(i) {
  return i.pos == i.options.simulateBreak && i.options.simulateDoubleBreak;
}
function aS(i) {
  let e = i.type.prop(Mg);
  if (e)
    return e;
  let t = i.firstChild, n;
  if (t && (n = t.type.prop(Re.closedBy))) {
    let s = i.lastChild, r = s && n.indexOf(s.name) > -1;
    return (o) => jg(o, !0, 1, void 0, r && !oS(o) ? s.from : void 0);
  }
  return i.parent == null ? lS : null;
}
function lS() {
  return 0;
}
class xf extends $l {
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
    return new xf(e, t, n);
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
      if (hS(n, e))
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
    return Xg(this.context.next, this.base, this.pos);
  }
}
function hS(i, e) {
  for (let t = e; t; t = t.parent)
    if (i == t)
      return !0;
  return !1;
}
function cS(i) {
  let e = i.node, t = e.childAfter(e.from), n = e.lastChild;
  if (!t)
    return null;
  let s = i.options.simulateBreak, r = i.state.doc.lineAt(t.from), o = s == null || s <= r.from ? r.to : Math.min(r.to, s);
  for (let a = t.to; ; ) {
    let l = e.childAfter(a);
    if (!l || l == n)
      return null;
    if (!l.type.isSkipped) {
      if (l.from >= o)
        return null;
      let h = /^ */.exec(r.text.slice(t.to - r.from))[0].length;
      return { from: t.from, to: t.to + h };
    }
    a = l.to;
  }
}
function fS({ closing: i, align: e = !0, units: t = 1 }) {
  return (n) => jg(n, e, t, i);
}
function jg(i, e, t, n, s) {
  let r = i.textAfter, o = r.match(/^\s*/)[0].length, a = n && r.slice(o, o + n.length) == n || s == i.pos + o, l = e ? cS(i) : null;
  return l ? a ? i.column(l.from) : i.column(l.to) : i.baseIndent + (a ? 0 : i.unit * t);
}
const uS = (i) => i.baseIndent;
function uh({ except: i, units: e = 1 } = {}) {
  return (t) => {
    let n = i && i.test(t.textAfter);
    return t.baseIndent + (n ? 0 : e * t.unit);
  };
}
const dS = /* @__PURE__ */ new Re();
function pS(i) {
  let e = i.firstChild, t = i.lastChild;
  return e && e.to < t.from ? { from: e.to, to: t.type.isError ? i.to : t.from } : null;
}
const OS = /* @__PURE__ */ me.baseTheme({
  "&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" },
  "&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" }
}), Lg = 1e4, Ig = "()[]{}", Dg = /* @__PURE__ */ ve.define({
  combine(i) {
    return nf(i, {
      afterCursor: !0,
      brackets: Ig,
      maxScanDistance: Lg,
      renderMatch: vS
    });
  }
}), gS = /* @__PURE__ */ tt.mark({ class: "cm-matchingBracket" }), mS = /* @__PURE__ */ tt.mark({ class: "cm-nonmatchingBracket" });
function vS(i) {
  let e = [], t = i.matched ? gS : mS;
  return e.push(t.range(i.start.from, i.start.to)), i.end && e.push(t.range(i.end.from, i.end.to)), e;
}
function hd(i) {
  let e = [], t = i.facet(Dg);
  for (let n of i.selection.ranges) {
    if (!n.empty)
      continue;
    let s = an(i, n.head, -1, t) || n.head > 0 && an(i, n.head - 1, 1, t) || t.afterCursor && (an(i, n.head, 1, t) || n.head < i.doc.length && an(i, n.head + 1, -1, t));
    s && (e = e.concat(t.renderMatch(s, i)));
  }
  return tt.set(e, !0);
}
const bS = /* @__PURE__ */ cn.fromClass(class {
  constructor(i) {
    this.paused = !1, this.decorations = hd(i.state);
  }
  update(i) {
    (i.docChanged || i.selectionSet || this.paused) && (i.view.composing ? (this.decorations = this.decorations.map(i.changes), this.paused = !0) : (this.decorations = hd(i.state), this.paused = !1));
  }
}, {
  decorations: (i) => i.decorations
}), yS = [
  bS,
  OS
];
function wS(i = {}) {
  return [Dg.of(i), yS];
}
const xS = /* @__PURE__ */ new Re();
function wc(i, e, t) {
  let n = i.prop(e < 0 ? Re.openedBy : Re.closedBy);
  if (n)
    return n;
  if (i.name.length == 1) {
    let s = t.indexOf(i.name);
    if (s > -1 && s % 2 == (e < 0 ? 1 : 0))
      return [t[s + e]];
  }
  return null;
}
function xc(i) {
  let e = i.type.prop(xS);
  return e ? e(i.node) : i;
}
function an(i, e, t, n = {}) {
  let s = n.maxScanDistance || Lg, r = n.brackets || Ig, o = Ti(i), a = o.resolveInner(e, t);
  for (let l = a; l; l = l.parent) {
    let h = wc(l.type, t, r);
    if (h && l.from < l.to) {
      let c = xc(l);
      if (c && (t > 0 ? e >= c.from && e < c.to : e > c.from && e <= c.to))
        return SS(i, e, t, l, c, h, r);
    }
  }
  return kS(i, e, t, o, a.type, s, r);
}
function SS(i, e, t, n, s, r, o) {
  let a = n.parent, l = { from: s.from, to: s.to }, h = 0, c = a == null ? void 0 : a.cursor();
  if (c && (t < 0 ? c.childBefore(n.from) : c.childAfter(n.to)))
    do
      if (t < 0 ? c.to <= n.from : c.from >= n.to) {
        if (h == 0 && r.indexOf(c.type.name) > -1 && c.from < c.to) {
          let f = xc(c);
          return { start: l, end: f ? { from: f.from, to: f.to } : void 0, matched: !0 };
        } else if (wc(c.type, t, o))
          h++;
        else if (wc(c.type, -t, o)) {
          if (h == 0) {
            let f = xc(c);
            return {
              start: l,
              end: f && f.from < f.to ? { from: f.from, to: f.to } : void 0,
              matched: !1
            };
          }
          h--;
        }
      }
    while (t < 0 ? c.prevSibling() : c.nextSibling());
  return { start: l, matched: !1 };
}
function kS(i, e, t, n, s, r, o) {
  if (t < 0 ? !e : e == i.doc.length)
    return null;
  let a = t < 0 ? i.sliceDoc(e - 1, e) : i.sliceDoc(e, e + 1), l = o.indexOf(a);
  if (l < 0 || l % 2 == 0 != t > 0)
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
            return { start: h, end: { from: O + g, to: O + g + 1 }, matched: v >> 1 == l >> 1 };
          f--;
        }
    }
    t > 0 && (d += p.length);
  }
  return c.done ? { start: h, matched: !1 } : null;
}
const QS = /* @__PURE__ */ Object.create(null), cd = [ni.none], fd = [], ud = /* @__PURE__ */ Object.create(null), $S = /* @__PURE__ */ Object.create(null);
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
  $S[i] = /* @__PURE__ */ _S(QS, e);
function dh(i, e) {
  fd.indexOf(i) > -1 || (fd.push(i), console.warn(e));
}
function _S(i, e) {
  let t = [];
  for (let a of e.split(" ")) {
    let l = [];
    for (let h of a.split(".")) {
      let c = i[h] || q[h];
      c ? typeof c == "function" ? l.length ? l = l.map(c) : dh(h, `Modifier ${h} used at start of tag`) : l.length ? dh(h, `Tag ${h} used as modifier`) : l = Array.isArray(c) ? c : [c] : dh(h, `Unknown highlighting tag ${h}`);
    }
    for (let h of l)
      t.push(h);
  }
  if (!t.length)
    return 0;
  let n = e.replace(/ /g, "_"), s = n + " " + t.map((a) => a.id), r = ud[s];
  if (r)
    return r.id;
  let o = ud[s] = ni.define({
    id: cd.length,
    name: n,
    props: [Zg({ [n]: t })]
  });
  return cd.push(o), o.id;
}
dt.RTL, dt.LTR;
const PS = (i) => {
  let { state: e } = i, t = e.doc.lineAt(e.selection.main.from), n = kf(i.state, t.from);
  return n.line ? TS(i) : n.block ? ZS(i) : !1;
};
function Sf(i, e) {
  return ({ state: t, dispatch: n }) => {
    if (t.readOnly)
      return !1;
    let s = i(e, t);
    return s ? (n(t.update(s)), !0) : !1;
  };
}
const TS = /* @__PURE__ */ Sf(
  RS,
  0
  /* CommentOption.Toggle */
), CS = /* @__PURE__ */ Sf(
  zg,
  0
  /* CommentOption.Toggle */
), ZS = /* @__PURE__ */ Sf(
  (i, e) => zg(i, e, AS(e)),
  0
  /* CommentOption.Toggle */
);
function kf(i, e) {
  let t = i.languageDataAt("commentTokens", e, 1);
  return t.length ? t[0] : {};
}
const Ir = 50;
function ES(i, { open: e, close: t }, n, s) {
  let r = i.sliceDoc(n - Ir, n), o = i.sliceDoc(s, s + Ir), a = /\s*$/.exec(r)[0].length, l = /^\s*/.exec(o)[0].length, h = r.length - a;
  if (r.slice(h - e.length, h) == e && o.slice(l, l + t.length) == t)
    return {
      open: { pos: n - a, margin: a && 1 },
      close: { pos: s + l, margin: l && 1 }
    };
  let c, f;
  s - n <= 2 * Ir ? c = f = i.sliceDoc(n, s) : (c = i.sliceDoc(n, n + Ir), f = i.sliceDoc(s - Ir, s));
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
function AS(i) {
  let e = [];
  for (let t of i.selection.ranges) {
    let n = i.doc.lineAt(t.from), s = t.to <= n.to ? n : i.doc.lineAt(t.to);
    s.from > n.from && s.from == t.to && (s = t.to == n.to + 1 ? n : i.doc.lineAt(t.to - 1));
    let r = e.length - 1;
    r >= 0 && e[r].to > n.from ? e[r].to = s.to : e.push({ from: n.from + /^\s*/.exec(n.text)[0].length, to: s.to });
  }
  return e;
}
function zg(i, e, t = e.selection.ranges) {
  let n = t.map((r) => kf(e, r.from).block);
  if (!n.every((r) => r))
    return null;
  let s = t.map((r, o) => ES(e, n[o], r.from, r.to));
  if (i != 2 && !s.every((r) => r))
    return { changes: e.changes(t.map((r, o) => s[o] ? [] : [{ from: r.from, insert: n[o].open + " " }, { from: r.to, insert: " " + n[o].close }])) };
  if (i != 1 && s.some((r) => r)) {
    let r = [];
    for (let o = 0, a; o < s.length; o++)
      if (a = s[o]) {
        let l = n[o], { open: h, close: c } = a;
        r.push({ from: h.pos - l.open.length, to: h.pos + h.margin }, { from: c.pos - c.margin, to: c.pos + l.close.length });
      }
    return { changes: r };
  }
  return null;
}
function RS(i, e, t = e.selection.ranges) {
  let n = [], s = -1;
  e: for (let { from: r, to: o } of t) {
    let a = n.length, l = 1e9, h;
    for (let c = r; c <= o; ) {
      let f = e.doc.lineAt(c);
      if (h == null && (h = kf(e, f.from).line, !h))
        continue e;
      if (f.from > s && (r == o || o > f.from)) {
        s = f.from;
        let d = /^\s*/.exec(f.text)[0].length, p = d == f.length, O = f.text.slice(d, d + h.length) == h ? d : -1;
        d < f.text.length && d < l && (l = d), n.push({ line: f, comment: O, token: h, indent: d, empty: p, single: !1 });
      }
      c = f.to + 1;
    }
    if (l < 1e9)
      for (let c = a; c < n.length; c++)
        n[c].indent < n[c].line.text.length && (n[c].indent = l);
    n.length == a + 1 && (n[a].single = !0);
  }
  if (i != 2 && n.some((r) => r.comment < 0 && (!r.empty || r.single))) {
    let r = [];
    for (let { line: a, token: l, indent: h, empty: c, single: f } of n)
      (f || !c) && r.push({ from: a.from + h, insert: l + " " });
    let o = e.changes(r);
    return { changes: o, selection: e.selection.map(o, 1) };
  } else if (i != 1 && n.some((r) => r.comment >= 0)) {
    let r = [];
    for (let { line: o, comment: a, token: l } of n)
      if (a >= 0) {
        let h = o.from + a, c = h + l.length;
        o.text[c - o.from] == " " && c++, r.push({ from: h, to: c });
      }
    return { changes: r };
  }
  return null;
}
const Sc = /* @__PURE__ */ Tn.define(), MS = /* @__PURE__ */ Tn.define(), XS = /* @__PURE__ */ ve.define(), Ng = /* @__PURE__ */ ve.define({
  combine(i) {
    return nf(i, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (e, t) => t
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (e, t) => (n, s) => e(n, s) || t(n, s)
    });
  }
}), Yg = /* @__PURE__ */ un.define({
  create() {
    return ln.empty;
  },
  update(i, e) {
    let t = e.state.facet(Ng), n = e.annotation(Sc);
    if (n) {
      let l = ei.fromTransaction(e, n.selection), h = n.side, c = h == 0 ? i.undone : i.done;
      return l ? c = Ua(c, c.length, t.minDepth, l) : c = Vg(c, e.startState.selection), new ln(h == 0 ? n.rest : c, h == 0 ? c : n.rest);
    }
    let s = e.annotation(MS);
    if ((s == "full" || s == "before") && (i = i.isolate()), e.annotation(wt.addToHistory) === !1)
      return e.changes.empty ? i : i.addMapping(e.changes.desc);
    let r = ei.fromTransaction(e), o = e.annotation(wt.time), a = e.annotation(wt.userEvent);
    return r ? i = i.addChanges(r, o, a, t, e) : e.selection && (i = i.addSelection(e.startState.selection, o, a, t.newGroupDelay)), (s == "full" || s == "after") && (i = i.isolate()), i;
  },
  toJSON(i) {
    return { done: i.done.map((e) => e.toJSON()), undone: i.undone.map((e) => e.toJSON()) };
  },
  fromJSON(i) {
    return new ln(i.done.map(ei.fromJSON), i.undone.map(ei.fromJSON));
  }
});
function jS(i = {}) {
  return [
    Yg,
    Ng.of(i),
    me.domEventHandlers({
      beforeinput(e, t) {
        let n = e.inputType == "historyUndo" ? qg : e.inputType == "historyRedo" ? kc : null;
        return n ? (e.preventDefault(), n(t)) : !1;
      }
    })
  ];
}
function _l(i, e) {
  return function({ state: t, dispatch: n }) {
    if (!e && t.readOnly)
      return !1;
    let s = t.field(Yg, !1);
    if (!s)
      return !1;
    let r = s.pop(i, t, e);
    return r ? (n(r), !0) : !1;
  };
}
const qg = /* @__PURE__ */ _l(0, !1), kc = /* @__PURE__ */ _l(1, !1), LS = /* @__PURE__ */ _l(0, !0), IS = /* @__PURE__ */ _l(1, !0);
class ei {
  constructor(e, t, n, s, r) {
    this.changes = e, this.effects = t, this.mapped = n, this.startSelection = s, this.selectionsAfter = r;
  }
  setSelAfter(e) {
    return new ei(this.changes, this.effects, this.mapped, this.startSelection, e);
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
    return new ei(e.changes && Pt.fromJSON(e.changes), [], e.mapped && hn.fromJSON(e.mapped), e.startSelection && G.fromJSON(e.startSelection), e.selectionsAfter.map(G.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(e, t) {
    let n = wi;
    for (let s of e.startState.facet(XS)) {
      let r = s(e);
      r.length && (n = n.concat(r));
    }
    return !n.length && e.changes.empty ? null : new ei(e.changes.invert(e.startState.doc), n, void 0, t || e.startState.selection, wi);
  }
  static selection(e) {
    return new ei(void 0, wi, void 0, void 0, e);
  }
}
function Ua(i, e, t, n) {
  let s = e + 1 > t + 20 ? e - t - 1 : 0, r = i.slice(s, e);
  return r.push(n), r;
}
function DS(i, e) {
  let t = [], n = !1;
  return i.iterChangedRanges((s, r) => t.push(s, r)), e.iterChangedRanges((s, r, o, a) => {
    for (let l = 0; l < t.length; ) {
      let h = t[l++], c = t[l++];
      a >= h && o <= c && (n = !0);
    }
  }), n;
}
function zS(i, e) {
  return i.ranges.length == e.ranges.length && i.ranges.filter((t, n) => t.empty != e.ranges[n].empty).length === 0;
}
function Wg(i, e) {
  return i.length ? e.length ? i.concat(e) : i : e;
}
const wi = [], NS = 200;
function Vg(i, e) {
  if (i.length) {
    let t = i[i.length - 1], n = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - NS));
    return n.length && n[n.length - 1].eq(e) ? i : (n.push(e), Ua(i, i.length - 1, 1e9, t.setSelAfter(n)));
  } else
    return [ei.selection([e])];
}
function YS(i) {
  let e = i[i.length - 1], t = i.slice();
  return t[i.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t;
}
function ph(i, e) {
  if (!i.length)
    return i;
  let t = i.length, n = wi;
  for (; t; ) {
    let s = qS(i[t - 1], e, n);
    if (s.changes && !s.changes.empty || s.effects.length) {
      let r = i.slice(0, t);
      return r[t - 1] = s, r;
    } else
      e = s.mapped, t--, n = s.selectionsAfter;
  }
  return n.length ? [ei.selection(n)] : wi;
}
function qS(i, e, t) {
  let n = Wg(i.selectionsAfter.length ? i.selectionsAfter.map((a) => a.map(e)) : wi, t);
  if (!i.changes)
    return ei.selection(n);
  let s = i.changes.map(e), r = e.mapDesc(i.changes, !0), o = i.mapped ? i.mapped.composeDesc(r) : r;
  return new ei(s, Ke.mapEffects(i.effects, e), o, i.startSelection.map(r), n);
}
const WS = /^(input\.type|delete)($|\.)/;
class ln {
  constructor(e, t, n = 0, s = void 0) {
    this.done = e, this.undone = t, this.prevTime = n, this.prevUserEvent = s;
  }
  isolate() {
    return this.prevTime ? new ln(this.done, this.undone) : this;
  }
  addChanges(e, t, n, s, r) {
    let o = this.done, a = o[o.length - 1];
    return a && a.changes && !a.changes.empty && e.changes && (!n || WS.test(n)) && (!a.selectionsAfter.length && t - this.prevTime < s.newGroupDelay && s.joinToEvent(r, DS(a.changes, e.changes)) || // For compose (but not compose.start) events, always join with previous event
    n == "input.type.compose") ? o = Ua(o, o.length - 1, s.minDepth, new ei(e.changes.compose(a.changes), Wg(Ke.mapEffects(e.effects, a.changes), a.effects), a.mapped, a.startSelection, wi)) : o = Ua(o, o.length, s.minDepth, e), new ln(o, wi, t, n);
  }
  addSelection(e, t, n, s) {
    let r = this.done.length ? this.done[this.done.length - 1].selectionsAfter : wi;
    return r.length > 0 && t - this.prevTime < s && n == this.prevUserEvent && n && /^select($|\.)/.test(n) && zS(r[r.length - 1], e) ? this : new ln(Vg(this.done, e), this.undone, t, n);
  }
  addMapping(e) {
    return new ln(ph(this.done, e), ph(this.undone, e), this.prevTime, this.prevUserEvent);
  }
  pop(e, t, n) {
    let s = e == 0 ? this.done : this.undone;
    if (s.length == 0)
      return null;
    let r = s[s.length - 1], o = r.selectionsAfter[0] || (r.startSelection ? r.startSelection.map(r.changes.invertedDesc, 1) : t.selection);
    if (n && r.selectionsAfter.length)
      return t.update({
        selection: r.selectionsAfter[r.selectionsAfter.length - 1],
        annotations: Sc.of({ side: e, rest: YS(s), selection: o }),
        userEvent: e == 0 ? "select.undo" : "select.redo",
        scrollIntoView: !0
      });
    if (r.changes) {
      let a = s.length == 1 ? wi : s.slice(0, s.length - 1);
      return r.mapped && (a = ph(a, r.mapped)), t.update({
        changes: r.changes,
        selection: r.startSelection,
        effects: r.effects,
        annotations: Sc.of({ side: e, rest: a, selection: o }),
        filter: !1,
        userEvent: e == 0 ? "undo" : "redo",
        scrollIntoView: !0
      });
    } else
      return null;
  }
}
ln.empty = /* @__PURE__ */ new ln(wi, wi);
const VS = [
  { key: "Mod-z", run: qg, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: kc, preventDefault: !0 },
  { linux: "Ctrl-Shift-z", run: kc, preventDefault: !0 },
  { key: "Mod-u", run: LS, preventDefault: !0 },
  { key: "Alt-u", mac: "Mod-Shift-u", run: IS, preventDefault: !0 }
];
function Tr(i, e) {
  return G.create(i.ranges.map(e), i.mainIndex);
}
function Yi(i, e) {
  return i.update({ selection: e, scrollIntoView: !0, userEvent: "select" });
}
function qi({ state: i, dispatch: e }, t) {
  let n = Tr(i.selection, t);
  return n.eq(i.selection, !0) ? !1 : (e(Yi(i, n)), !0);
}
function Pl(i, e) {
  return G.cursor(e ? i.to : i.from);
}
function Bg(i, e) {
  return qi(i, (t) => t.empty ? i.moveByChar(t, e) : Pl(t, e));
}
function It(i) {
  return i.textDirectionAt(i.state.selection.main.head) == dt.LTR;
}
const Gg = (i) => Bg(i, !It(i)), Ug = (i) => Bg(i, It(i));
function Fg(i, e) {
  return qi(i, (t) => t.empty ? i.moveByGroup(t, e) : Pl(t, e));
}
const BS = (i) => Fg(i, !It(i)), GS = (i) => Fg(i, It(i));
function US(i, e, t) {
  if (e.type.prop(t))
    return !0;
  let n = e.to - e.from;
  return n && (n > 2 || /[^\s,.;:]/.test(i.sliceDoc(e.from, e.to))) || e.firstChild;
}
function Tl(i, e, t) {
  let n = Ti(i).resolveInner(e.head), s = t ? Re.closedBy : Re.openedBy;
  for (let l = e.head; ; ) {
    let h = t ? n.childAfter(l) : n.childBefore(l);
    if (!h)
      break;
    US(i, h, s) ? n = h : l = t ? h.to : h.from;
  }
  let r = n.type.prop(s), o, a;
  return r && (o = t ? an(i, n.from, 1) : an(i, n.to, -1)) && o.matched ? a = t ? o.end.to : o.end.from : a = t ? n.to : n.from, G.cursor(a, t ? -1 : 1);
}
const FS = (i) => qi(i, (e) => Tl(i.state, e, !It(i))), HS = (i) => qi(i, (e) => Tl(i.state, e, It(i)));
function Hg(i, e) {
  return qi(i, (t) => {
    if (!t.empty)
      return Pl(t, e);
    let n = i.moveVertically(t, e);
    return n.head != t.head ? n : i.moveToLineBoundary(t, e);
  });
}
const Kg = (i) => Hg(i, !1), Jg = (i) => Hg(i, !0);
function em(i) {
  let e = i.scrollDOM.clientHeight < i.scrollDOM.scrollHeight - 2, t = 0, n = 0, s;
  if (e) {
    for (let r of i.state.facet(me.scrollMargins)) {
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
function tm(i, e) {
  let t = em(i), { state: n } = i, s = Tr(n.selection, (o) => o.empty ? i.moveVertically(o, e, t.height) : Pl(o, e));
  if (s.eq(n.selection))
    return !1;
  let r;
  if (t.selfScroll) {
    let o = i.coordsAtPos(n.selection.main.head), a = i.scrollDOM.getBoundingClientRect(), l = a.top + t.marginTop, h = a.bottom - t.marginBottom;
    o && o.top > l && o.bottom < h && (r = me.scrollIntoView(s.main.head, { y: "start", yMargin: o.top - l }));
  }
  return i.dispatch(Yi(n, s), { effects: r }), !0;
}
const dd = (i) => tm(i, !1), Qc = (i) => tm(i, !0);
function Kn(i, e, t) {
  let n = i.lineBlockAt(e.head), s = i.moveToLineBoundary(e, t);
  if (s.head == e.head && s.head != (t ? n.to : n.from) && (s = i.moveToLineBoundary(e, t, !1)), !t && s.head == n.from && n.length) {
    let r = /^\s*/.exec(i.state.sliceDoc(n.from, Math.min(n.from + 100, n.to)))[0].length;
    r && e.head != n.from + r && (s = G.cursor(n.from + r));
  }
  return s;
}
const KS = (i) => qi(i, (e) => Kn(i, e, !0)), JS = (i) => qi(i, (e) => Kn(i, e, !1)), ek = (i) => qi(i, (e) => Kn(i, e, !It(i))), tk = (i) => qi(i, (e) => Kn(i, e, It(i))), ik = (i) => qi(i, (e) => G.cursor(i.lineBlockAt(e.head).from, 1)), nk = (i) => qi(i, (e) => G.cursor(i.lineBlockAt(e.head).to, -1));
function sk(i, e, t) {
  let n = !1, s = Tr(i.selection, (r) => {
    let o = an(i, r.head, -1) || an(i, r.head, 1) || r.head > 0 && an(i, r.head - 1, 1) || r.head < i.doc.length && an(i, r.head + 1, -1);
    if (!o || !o.end)
      return r;
    n = !0;
    let a = o.start.from == r.head ? o.end.to : o.end.from;
    return G.cursor(a);
  });
  return n ? (e(Yi(i, s)), !0) : !1;
}
const rk = ({ state: i, dispatch: e }) => sk(i, e);
function Ei(i, e, t) {
  let n = Tr(i.state.selection, (s) => {
    s.undirectional && s.head >= s.anchor != e && (s = G.range(s.head, s.anchor));
    let r = t(s);
    return G.range(s.anchor, r.head, r.goalColumn, r.bidiLevel || void 0, r.assoc);
  });
  return n.eq(i.state.selection) ? !1 : (i.dispatch(Yi(i.state, n)), !0);
}
function im(i, e) {
  return Ei(i, e, (t) => i.moveByChar(t, e));
}
const nm = (i) => im(i, !It(i)), sm = (i) => im(i, It(i));
function rm(i, e) {
  return Ei(i, e, (t) => i.moveByGroup(t, e));
}
const ok = (i) => rm(i, !It(i)), ak = (i) => rm(i, It(i)), lk = (i) => {
  let e = !It(i);
  return Ei(i, e, (t) => Tl(i.state, t, e));
}, hk = (i) => {
  let e = It(i);
  return Ei(i, e, (t) => Tl(i.state, t, e));
};
function om(i, e) {
  return Ei(i, e, (t) => i.moveVertically(t, e));
}
const am = (i) => om(i, !1), lm = (i) => om(i, !0);
function hm(i, e) {
  return Ei(i, e, (t) => i.moveVertically(t, e, em(i).height));
}
const pd = (i) => hm(i, !1), Od = (i) => hm(i, !0), ck = (i) => Ei(i, !0, (e) => Kn(i, e, !0)), fk = (i) => Ei(i, !1, (e) => Kn(i, e, !1)), uk = (i) => {
  let e = !It(i);
  return Ei(i, e, (t) => Kn(i, t, e));
}, dk = (i) => {
  let e = It(i);
  return Ei(i, e, (t) => Kn(i, t, e));
}, pk = (i) => Ei(i, !1, (e) => G.cursor(i.lineBlockAt(e.head).from)), Ok = (i) => Ei(i, !0, (e) => G.cursor(i.lineBlockAt(e.head).to)), gd = ({ state: i, dispatch: e }) => (e(Yi(i, { anchor: 0 })), !0), md = ({ state: i, dispatch: e }) => (e(Yi(i, { anchor: i.doc.length })), !0), vd = ({ state: i, dispatch: e }) => (e(Yi(i, { anchor: i.selection.main.anchor, head: 0 })), !0), bd = ({ state: i, dispatch: e }) => (e(Yi(i, { anchor: i.selection.main.anchor, head: i.doc.length })), !0), gk = ({ state: i, dispatch: e }) => (e(i.update({ selection: { anchor: 0, head: i.doc.length }, userEvent: "select" })), !0), mk = ({ state: i, dispatch: e }) => {
  let t = Cl(i).map(({ from: n, to: s }) => G.range(n, Math.min(s + 1, i.doc.length)));
  return e(i.update({ selection: G.create(t), userEvent: "select" })), !0;
}, vk = ({ state: i, dispatch: e }) => {
  let t = Tr(i.selection, (n) => {
    let s = Ti(i), r = s.resolveStack(n.from, 1);
    if (n.empty) {
      let o = s.resolveStack(n.from, -1);
      o.node.from >= r.node.from && o.node.to <= r.node.to && (r = o);
    }
    for (let o = r; o; o = o.next) {
      let { node: a } = o;
      if ((a.from < n.from && a.to >= n.to || a.to > n.to && a.from <= n.from) && o.next)
        return G.range(a.to, a.from);
    }
    return n;
  });
  return t.eq(i.selection) ? !1 : (e(Yi(i, t)), !0);
};
function cm(i, e) {
  let { state: t } = i, n = t.selection, s = t.selection.ranges.slice();
  for (let r of t.selection.ranges) {
    let o = t.doc.lineAt(r.head);
    if (e ? o.to < i.state.doc.length : o.from > 0)
      for (let a = r; ; ) {
        let l = i.moveVertically(a, e);
        if (l.head < o.from || l.head > o.to) {
          s.some((h) => h.head == l.head) || s.push(l);
          break;
        } else {
          if (l.head == a.head)
            break;
          a = l;
        }
      }
  }
  return s.length == n.ranges.length ? !1 : (i.dispatch(Yi(t, G.create(s, s.length - 1))), !0);
}
const bk = (i) => cm(i, !1), yk = (i) => cm(i, !0), wk = ({ state: i, dispatch: e }) => {
  let t = i.selection, n = null;
  return t.ranges.length > 1 ? n = G.create([t.main]) : t.main.empty || (n = G.create([G.cursor(t.main.head)])), n ? (e(Yi(i, n)), !0) : !1;
};
function jo(i, e) {
  if (i.state.readOnly)
    return !1;
  let t = "delete.selection", { state: n } = i, s = n.changeByRange((r) => {
    let { from: o, to: a } = r;
    if (o == a) {
      let l = e(r);
      l < o ? (t = "delete.backward", l = la(i, l, !1)) : l > o && (t = "delete.forward", l = la(i, l, !0)), o = Math.min(o, l), a = Math.max(a, l);
    } else
      o = la(i, o, !1), a = la(i, a, !0);
    return o == a ? { range: r } : { changes: { from: o, to: a }, range: G.cursor(o, o < r.head ? -1 : 1) };
  });
  return s.changes.empty ? !1 : (i.dispatch(n.update(s, {
    scrollIntoView: !0,
    userEvent: t,
    effects: t == "delete.selection" ? me.announce.of(n.phrase("Selection deleted")) : void 0
  })), !0);
}
function la(i, e, t) {
  if (i instanceof me)
    for (let n of i.state.facet(me.atomicRanges).map((s) => s(i)))
      n.between(e, e, (s, r) => {
        s < e && r > e && (e = t ? r : s);
      });
  return e;
}
const fm = (i, e, t) => jo(i, (n) => {
  let s = n.from, { state: r } = i, o = r.doc.lineAt(s), a, l;
  if (t && !e && s > o.from && s < o.from + 200 && !/[^ \t]/.test(a = o.text.slice(0, s - o.from))) {
    if (a[a.length - 1] == "	")
      return s - 1;
    let h = vl(a, r.tabSize), c = h % Ba(r) || Ba(r);
    for (let f = 0; f < c && a[a.length - 1 - f] == " "; f++)
      s--;
    l = s;
  } else
    l = Lt(o.text, s - o.from, e, e) + o.from, l == s && o.number != (e ? r.doc.lines : 1) ? l += e ? 1 : -1 : !e && /[\ufe00-\ufe0f]/.test(o.text.slice(l - o.from, s - o.from)) && (l = Lt(o.text, l - o.from, !1, !1) + o.from);
  return l;
}), $c = (i) => fm(i, !1, !0), um = (i) => fm(i, !0, !1), dm = (i, e) => jo(i, (t) => {
  let n = t.head, { state: s } = i, r = s.doc.lineAt(n), o = s.charCategorizer(n);
  for (let a = null; ; ) {
    if (n == (e ? r.to : r.from)) {
      n == t.head && r.number != (e ? s.doc.lines : 1) && (n += e ? 1 : -1);
      break;
    }
    let l = Lt(r.text, n - r.from, e) + r.from, h = r.text.slice(Math.min(n, l) - r.from, Math.max(n, l) - r.from), c = o(h);
    if (a != null && c != a)
      break;
    (h != " " || n != t.head) && (a = c), n = l;
  }
  return n;
}), pm = (i) => dm(i, !1), xk = (i) => dm(i, !0), Sk = (i) => jo(i, (e) => {
  let t = i.lineBlockAt(e.head).to;
  return e.head < t ? t : Math.min(i.state.doc.length, e.head + 1);
}), kk = (i) => jo(i, (e) => {
  let t = i.moveToLineBoundary(e, !1).head;
  return e.head > t ? t : Math.max(0, e.head - 1);
}), Qk = (i) => jo(i, (e) => {
  let t = i.moveToLineBoundary(e, !0).head;
  return e.head < t ? t : Math.min(i.state.doc.length, e.head + 1);
}), $k = ({ state: i, dispatch: e }) => {
  if (i.readOnly)
    return !1;
  let t = i.changeByRange((n) => ({
    changes: { from: n.from, to: n.to, insert: Ne.of(["", ""]) },
    range: G.cursor(n.from)
  }));
  return e(i.update(t, { scrollIntoView: !0, userEvent: "input" })), !0;
}, _k = ({ state: i, dispatch: e }) => {
  if (i.readOnly)
    return !1;
  let t = i.changeByRange((n) => {
    if (!n.empty || n.from == 0 || n.from == i.doc.length)
      return { range: n };
    let s = n.from, r = i.doc.lineAt(s), o = s == r.from ? s - 1 : Lt(r.text, s - r.from, !1) + r.from, a = s == r.to ? s + 1 : Lt(r.text, s - r.from, !0) + r.from;
    return {
      changes: { from: o, to: a, insert: i.doc.slice(s, a).append(i.doc.slice(o, s)) },
      range: G.cursor(a)
    };
  });
  return t.changes.empty ? !1 : (e(i.update(t, { scrollIntoView: !0, userEvent: "move.character" })), !0);
};
function Cl(i) {
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
function Om(i, e, t) {
  if (i.readOnly)
    return !1;
  let n = [], s = [];
  for (let r of Cl(i)) {
    if (t ? r.to == i.doc.length : r.from == 0)
      continue;
    let o = i.doc.lineAt(t ? r.to + 1 : r.from - 1), a = o.length + 1;
    if (t) {
      n.push({ from: r.to, to: o.to }, { from: r.from, insert: o.text + i.lineBreak });
      for (let l of r.ranges)
        s.push(G.range(Math.min(i.doc.length, l.anchor + a), Math.min(i.doc.length, l.head + a)));
    } else {
      n.push({ from: o.from, to: r.from }, { from: r.to, insert: i.lineBreak + o.text });
      for (let l of r.ranges)
        s.push(G.range(l.anchor - a, l.head - a));
    }
  }
  return n.length ? (e(i.update({
    changes: n,
    scrollIntoView: !0,
    selection: G.create(s, i.selection.mainIndex),
    userEvent: "move.line"
  })), !0) : !1;
}
const Pk = ({ state: i, dispatch: e }) => Om(i, e, !1), Tk = ({ state: i, dispatch: e }) => Om(i, e, !0);
function gm(i, e, t) {
  if (i.readOnly)
    return !1;
  let n = [];
  for (let r of Cl(i))
    t ? n.push({ from: r.from, insert: i.doc.slice(r.from, r.to) + i.lineBreak }) : n.push({ from: r.to, insert: i.lineBreak + i.doc.slice(r.from, r.to) });
  let s = i.changes(n);
  return e(i.update({
    changes: s,
    selection: i.selection.map(s, t ? 1 : -1),
    scrollIntoView: !0,
    userEvent: "input.copyline"
  })), !0;
}
const Ck = ({ state: i, dispatch: e }) => gm(i, e, !1), Zk = ({ state: i, dispatch: e }) => gm(i, e, !0), Ek = (i) => {
  if (i.state.readOnly)
    return !1;
  let { state: e } = i, t = e.changes(Cl(e).map(({ from: s, to: r }) => (s > 0 ? s-- : r < e.doc.length && r++, { from: s, to: r }))), n = Tr(e.selection, (s) => {
    let r;
    if (i.lineWrapping) {
      let o = i.lineBlockAt(s.head), a = i.coordsAtPos(s.head, s.assoc || 1);
      a && (r = o.bottom + i.documentTop - a.bottom + i.defaultLineHeight / 2);
    }
    return i.moveVertically(s, !0, r);
  }).map(t);
  return i.dispatch({ changes: t, selection: n, scrollIntoView: !0, userEvent: "delete.line" }), !0;
};
function Ak(i, e) {
  if (/\(\)|\[\]|\{\}/.test(i.sliceDoc(e - 1, e + 1)))
    return { from: e, to: e };
  let t = Ti(i).resolveInner(e), n = t.childBefore(e), s = t.childAfter(e), r;
  return n && s && n.to <= e && s.from >= e && (r = n.type.prop(Re.closedBy)) && r.indexOf(s.name) > -1 && i.doc.lineAt(n.to).from == i.doc.lineAt(s.from).from && !/\S/.test(i.sliceDoc(n.to, s.from)) ? { from: n.to, to: s.from } : null;
}
const yd = /* @__PURE__ */ mm(!1), Rk = /* @__PURE__ */ mm(!0);
function mm(i) {
  return ({ state: e, dispatch: t }) => {
    if (e.readOnly)
      return !1;
    let n = e.changeByRange((s) => {
      let { from: r, to: o } = s, a = e.doc.lineAt(r), l = !i && r == o && Ak(e, r);
      i && (r = o = (o <= a.to ? a : e.doc.lineAt(o)).to);
      let h = new $l(e, { simulateBreak: r, simulateDoubleBreak: !!l }), c = Rg(h, r);
      for (c == null && (c = vl(/^\s*/.exec(e.doc.lineAt(r).text)[0], e.tabSize)); o < a.to && /\s/.test(a.text[o - a.from]); )
        o++;
      l ? { from: r, to: o } = l : r > a.from && r < a.from + 100 && !/\S/.test(a.text.slice(0, r)) && (r = a.from);
      let f = ["", Ga(e, c)];
      return l && f.push(Ga(e, h.lineIndent(a.from, -1))), {
        changes: { from: r, to: o, insert: Ne.of(f) },
        range: G.cursor(r + 1 + f[1].length)
      };
    });
    return t(e.update(n, { scrollIntoView: !0, userEvent: "input" })), !0;
  };
}
function Qf(i, e) {
  let t = -1;
  return i.changeByRange((n) => {
    let s = [];
    for (let o = n.from; o <= n.to; ) {
      let a = i.doc.lineAt(o);
      a.number > t && (n.empty || n.to > a.from) && (e(a, s, n), t = a.number), o = a.to + 1;
    }
    let r = i.changes(s);
    return {
      changes: s,
      range: G.range(r.mapPos(n.anchor, 1), r.mapPos(n.head, 1))
    };
  });
}
const Mk = ({ state: i, dispatch: e }) => {
  if (i.readOnly)
    return !1;
  let t = /* @__PURE__ */ Object.create(null), n = new $l(i, { overrideIndentation: (r) => {
    let o = t[r];
    return o ?? -1;
  } }), s = Qf(i, (r, o, a) => {
    let l = Rg(n, r.from);
    if (l == null)
      return;
    /\S/.test(r.text) || (l = 0);
    let h = /^\s*/.exec(r.text)[0], c = Ga(i, l);
    (h != c || a.from < r.from + h.length) && (t[r.from] = l, o.push({ from: r.from, to: r.from + h.length, insert: c }));
  });
  return s.changes.empty || e(i.update(s, { userEvent: "indent" })), !0;
}, Xk = ({ state: i, dispatch: e }) => i.readOnly ? !1 : (e(i.update(Qf(i, (t, n) => {
  n.push({ from: t.from, insert: i.facet(Ql) });
}), { userEvent: "input.indent" })), !0), jk = ({ state: i, dispatch: e }) => i.readOnly ? !1 : (e(i.update(Qf(i, (t, n) => {
  let s = /^\s*/.exec(t.text)[0];
  if (!s)
    return;
  let r = vl(s, i.tabSize), o = 0, a = Ga(i, Math.max(0, r - Ba(i)));
  for (; o < s.length && o < a.length && s.charCodeAt(o) == a.charCodeAt(o); )
    o++;
  n.push({ from: t.from + o, to: t.from + s.length, insert: a.slice(o) });
}), { userEvent: "delete.dedent" })), !0), Lk = (i) => (i.setTabFocusMode(), !0), Ik = [
  { key: "Ctrl-b", run: Gg, shift: nm, preventDefault: !0 },
  { key: "Ctrl-f", run: Ug, shift: sm },
  { key: "Ctrl-p", run: Kg, shift: am },
  { key: "Ctrl-n", run: Jg, shift: lm },
  { key: "Ctrl-a", run: ik, shift: pk },
  { key: "Ctrl-e", run: nk, shift: Ok },
  { key: "Ctrl-d", run: um },
  { key: "Ctrl-h", run: $c },
  { key: "Ctrl-k", run: Sk },
  { key: "Ctrl-Alt-h", run: pm },
  { key: "Ctrl-o", run: $k },
  { key: "Ctrl-t", run: _k },
  { key: "Ctrl-v", run: Qc }
], Dk = /* @__PURE__ */ [
  { key: "ArrowLeft", run: Gg, shift: nm, preventDefault: !0 },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: BS, shift: ok, preventDefault: !0 },
  { mac: "Cmd-ArrowLeft", run: ek, shift: uk, preventDefault: !0 },
  { key: "ArrowRight", run: Ug, shift: sm, preventDefault: !0 },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: GS, shift: ak, preventDefault: !0 },
  { mac: "Cmd-ArrowRight", run: tk, shift: dk, preventDefault: !0 },
  { key: "ArrowUp", run: Kg, shift: am, preventDefault: !0 },
  { mac: "Cmd-ArrowUp", run: gd, shift: vd },
  { mac: "Ctrl-ArrowUp", run: dd, shift: pd },
  { key: "ArrowDown", run: Jg, shift: lm, preventDefault: !0 },
  { mac: "Cmd-ArrowDown", run: md, shift: bd },
  { mac: "Ctrl-ArrowDown", run: Qc, shift: Od },
  { key: "PageUp", run: dd, shift: pd },
  { key: "PageDown", run: Qc, shift: Od },
  { key: "Home", run: JS, shift: fk, preventDefault: !0 },
  { key: "Mod-Home", run: gd, shift: vd },
  { key: "End", run: KS, shift: ck, preventDefault: !0 },
  { key: "Mod-End", run: md, shift: bd },
  { key: "Enter", run: yd, shift: yd },
  { key: "Mod-a", run: gk },
  { key: "Backspace", run: $c, shift: $c, preventDefault: !0 },
  { key: "Delete", run: um, preventDefault: !0 },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: pm, preventDefault: !0 },
  { key: "Mod-Delete", mac: "Alt-Delete", run: xk, preventDefault: !0 },
  { mac: "Mod-Backspace", run: kk, preventDefault: !0 },
  { mac: "Mod-Delete", run: Qk, preventDefault: !0 }
].concat(/* @__PURE__ */ Ik.map((i) => ({ mac: i.key, run: i.run, shift: i.shift }))), zk = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: FS, shift: lk },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: HS, shift: hk },
  { key: "Alt-ArrowUp", run: Pk },
  { key: "Shift-Alt-ArrowUp", run: Ck },
  { key: "Alt-ArrowDown", run: Tk },
  { key: "Shift-Alt-ArrowDown", run: Zk },
  { key: "Mod-Alt-ArrowUp", run: bk },
  { key: "Mod-Alt-ArrowDown", run: yk },
  { key: "Escape", run: wk },
  { key: "Mod-Enter", run: Rk },
  { key: "Alt-l", mac: "Ctrl-l", run: mk },
  { key: "Mod-i", run: vk, preventDefault: !0 },
  { key: "Mod-[", run: jk },
  { key: "Mod-]", run: Xk },
  { key: "Mod-Alt-\\", run: Mk },
  { key: "Shift-Mod-k", run: Ek },
  { key: "Shift-Mod-\\", run: rk },
  { key: "Mod-/", run: PS },
  { key: "Alt-A", run: CS },
  { key: "Ctrl-m", mac: "Shift-Alt-m", run: Lk }
].concat(Dk);
class Fa {
  /**
  @internal
  */
  constructor(e, t, n, s, r, o, a, l, h, c = 0, f) {
    this.p = e, this.stack = t, this.state = n, this.reducePos = s, this.pos = r, this.score = o, this.buffer = a, this.bufferBase = l, this.curContext = h, this.lookAhead = c, this.parent = f;
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
    return new Fa(e, [], t, n, n, 0, [], 0, s ? new wd(s, s.start) : null, 0, null);
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
    let n = e >> 19, s = e & 65535, { parser: r } = this.p, o = this.reducePos < this.pos - 25 && this.setLookAhead(this.pos), a = r.dynamicPrecedence(s);
    if (a && (this.score += a), n == 0) {
      s < r.minRepeatTerm && this.reducePos < this.pos && (this.reducePos = this.pos), this.pushState(r.getGoto(this.state, s, !0), this.reducePos), s < r.minRepeatTerm && this.storeNode(s, this.reducePos, this.reducePos, o ? 8 : 4, !0), this.reduceContext(s, this.reducePos);
      return;
    }
    let l = this.stack.length - (n - 1) * 3 - (e & 262144 ? 6 : 0), h = l ? this.stack[l - 2] : this.p.ranges[0].from;
    s < r.minRepeatTerm && h == this.reducePos && this.reducePos < this.pos && (this.reducePos = this.pos);
    let c = this.reducePos - h;
    c >= 2e3 && !(!((t = this.p.parser.nodeSet.types[s]) === null || t === void 0) && t.isAnonymous) && (h == this.p.lastBigReductionStart ? (this.p.bigReductionCount++, this.p.lastBigReductionSize = c) : this.p.lastBigReductionSize < c && (this.p.bigReductionCount = 1, this.p.lastBigReductionStart = h, this.p.lastBigReductionSize = c));
    let f = l ? this.stack[l - 1] : 0, d = this.bufferBase + this.buffer.length - f;
    if (s < r.minRepeatTerm || e & 131072) {
      let p = r.stateFlag(
        this.state,
        1
        /* StateFlag.Skipped */
      ) ? this.pos : this.reducePos;
      this.storeNode(s, h, p, d + 4, !0);
    }
    if (e & 262144)
      this.state = this.stack[l];
    else {
      let p = this.stack[l - 3];
      this.state = r.getGoto(p, s, !0);
    }
    for (; this.stack.length > l; )
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
        let a = !1;
        for (let l = o; l > 0 && this.buffer[l - 2] > n; l -= 4)
          if (this.buffer[l - 1] >= 0) {
            a = !0;
            break;
          }
        if (a)
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
      let a = o.stateFlag(
        r,
        1
        /* StateFlag.Skipped */
      );
      !a && (s > n || t <= o.maxNode) && (this.reducePos = s), this.pushState(r, a ? n : Math.min(n, this.reducePos)), this.shiftContext(t, n), t <= o.maxNode && this.buffer.push(t, n, s, 4);
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
    return new Fa(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, n, s, this.curContext, this.lookAhead, e);
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
    for (let t = new Nk(this); ; ) {
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
          s.some((a, l) => l & 1 && a == o) || s.push(t[r], o);
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
            let a = (o >> 19) - r;
            if (a > 1) {
              let l = o & 65535, h = this.stack.length - a * 3;
              if (h >= 0 && e.getGoto(this.stack[h], l, !1) >= 0)
                return a << 19 | 65536 | l;
            }
          } else {
            let a = n(o, r + 1);
            if (a != null)
              return a;
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
      let t = new wd(this.curContext.tracker, e);
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
class wd {
  constructor(e, t) {
    this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
  }
}
class Nk {
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
class Ha {
  constructor(e, t, n) {
    this.stack = e, this.pos = t, this.index = n, this.buffer = e.buffer, this.index == 0 && this.maybeNext();
  }
  static create(e, t = e.bufferBase + e.buffer.length) {
    return new Ha(e, t, t - e.bufferBase);
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
    return new Ha(this.stack, this.pos, this.index);
  }
}
function Ur(i, e = Uint16Array) {
  if (typeof i != "string")
    return i;
  let t = null;
  for (let n = 0, s = 0; n < i.length; ) {
    let r = 0;
    for (; ; ) {
      let o = i.charCodeAt(n++), a = !1;
      if (o == 126) {
        r = 65535;
        break;
      }
      o >= 92 && o--, o >= 34 && o--;
      let l = o - 32;
      if (l >= 46 && (l -= 46, a = !0), r += l, a)
        break;
      r *= 46;
    }
    t ? t[s++] = r : t = new e(r);
  }
  return t;
}
class xa {
  constructor() {
    this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
  }
}
const xd = new xa();
class Yk {
  /**
  @internal
  */
  constructor(e, t) {
    this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = xd, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
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
        let o = this.rangeIndex, a = this.range;
        for (; a.to <= n; )
          a = this.ranges[++o];
        this.chunk2 = this.input.chunk(this.chunk2Pos = n), n + this.chunk2.length > a.to && (this.chunk2 = this.chunk2.slice(0, a.to - n)), s = this.chunk2.charCodeAt(0);
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
    if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = xd, this.pos != e) {
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
class Ks {
  constructor(e, t) {
    this.data = e, this.id = t;
  }
  token(e, t) {
    let { parser: n } = t.p;
    vm(this.data, e, t, this.id, n.data, n.tokenPrecTable);
  }
}
Ks.prototype.contextual = Ks.prototype.fallback = Ks.prototype.extend = !1;
class _c {
  constructor(e, t, n) {
    this.precTable = t, this.elseToken = n, this.data = typeof e == "string" ? Ur(e) : e;
  }
  token(e, t) {
    let n = e.pos, s = 0;
    for (; ; ) {
      let r = e.next < 0, o = e.resolveOffset(1, 1);
      if (vm(this.data, e, t, 0, this.data, this.precTable), e.token.value > -1)
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
_c.prototype.contextual = Ks.prototype.fallback = Ks.prototype.extend = !1;
class Lo {
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
function vm(i, e, t, n, s, r) {
  let o = 0, a = 1 << n, { dialect: l } = t.p.parser;
  e: for (; (a & i[o]) != 0; ) {
    let h = i[o + 1];
    for (let p = o + 3; p < h; p += 2)
      if ((i[p + 1] & a) > 0) {
        let O = i[p];
        if (l.allows(O) && (e.token.value == -1 || e.token.value == O || qk(O, e.token.value, s, r))) {
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
function Sd(i, e, t) {
  for (let n = e, s; (s = i[n]) != 65535; n++)
    if (s == t)
      return n - e;
  return -1;
}
function qk(i, e, t, n) {
  let s = Sd(t, n, e);
  return s < 0 || Sd(t, n, i) < s;
}
const si = typeof process < "u" && process.env && /\bparse\b/.test(process.env.LOG);
let Oh = null;
function kd(i, e, t) {
  let n = i.cursor(ht.IncludeAnonymous);
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
class Wk {
  constructor(e, t) {
    this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
  }
  nextFragment() {
    let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
    if (e) {
      for (this.safeFrom = e.openStart ? kd(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? kd(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length; )
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
      if (r instanceof bt) {
        if (o == e) {
          if (o < this.safeFrom)
            return null;
          let a = o + r.length;
          if (a <= this.safeTo) {
            let l = r.prop(Re.lookAhead);
            if (!l || a + l < this.fragment.to)
              return r;
          }
        }
        this.index[t]++, o + r.length >= Math.max(this.safeFrom, e) && (this.trees.push(r), this.start.push(o), this.index.push(0));
      } else
        this.index[t]++, this.nextStart = o + r.length;
    }
  }
}
class Vk {
  constructor(e, t) {
    this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((n) => new xa());
  }
  getActions(e) {
    let t = 0, n = null, { parser: s } = e.p, { tokenizers: r } = s, o = s.stateSlot(
      e.state,
      3
      /* ParseState.TokenizerMask */
    ), a = e.curContext ? e.curContext.hash : 0, l = 0;
    for (let h = 0; h < r.length; h++) {
      if ((1 << h & o) == 0)
        continue;
      let c = r[h], f = this.tokens[h];
      if (!(n && !c.fallback) && ((c.contextual || f.start != e.pos || f.mask != o || f.context != a) && (this.updateCachedToken(f, c, e), f.mask = o, f.context = a), f.lookAhead > f.end + 25 && (l = Math.max(f.lookAhead, l)), f.value != 0)) {
        let d = t;
        if (f.extended > -1 && (t = this.addActions(e, f.extended, f.end, t)), t = this.addActions(e, f.value, f.end, t), !c.extend && (n = f, t > d))
          break;
      }
    }
    for (; this.actions.length > t; )
      this.actions.pop();
    return l && e.setLookAhead(l), !n && e.pos == this.stream.end && (n = new xa(), n.value = e.p.parser.eofTerm, n.start = n.end = e.pos, t = this.addActions(e, n.value, n.end, t)), this.mainToken = n, this.actions;
  }
  getMainToken(e) {
    if (this.mainToken)
      return this.mainToken;
    let t = new xa(), { pos: n, p: s } = e;
    return t.start = n, t.end = Math.min(n + 1, s.stream.end), t.value = n == s.stream.end ? s.parser.eofTerm : 0, t;
  }
  updateCachedToken(e, t, n) {
    let s = this.stream.clipPos(n.pos);
    if (t.token(this.stream.reset(s, e), n), e.value > -1) {
      let { parser: r } = n.p;
      for (let o = 0; o < r.specialized.length; o++)
        if (r.specialized[o] == e.value) {
          let a = r.specializers[o](this.stream.read(e.start, e.end), n);
          if (a >= 0 && n.p.parser.dialect.allows(a >> 1)) {
            (a & 1) == 0 ? e.value = a >> 1 : e.extended = a >> 1;
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
    let { state: r } = e, { parser: o } = e.p, { data: a } = o;
    for (let l = 0; l < 2; l++)
      for (let h = o.stateSlot(
        r,
        l ? 2 : 1
        /* ParseState.Actions */
      ); ; h += 3) {
        if (a[h] == 65535)
          if (a[h + 1] == 1)
            h = pn(a, h + 2);
          else {
            s == 0 && a[h + 1] == 2 && (s = this.putAction(pn(a, h + 2), t, n, s));
            break;
          }
        a[h] == t && (s = this.putAction(pn(a, h + 1), t, n, s));
      }
    return s;
  }
}
class Bk {
  constructor(e, t, n, s) {
    this.parser = e, this.input = t, this.ranges = s, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.lastBigReductionStart = -1, this.lastBigReductionSize = 0, this.bigReductionCount = 0, this.stream = new Yk(t, s), this.tokens = new Vk(e, this.stream), this.topTerm = e.top[1];
    let { from: r } = s[0];
    this.stacks = [Fa.start(this, e.top[0], r)], this.fragments = n.length && this.stream.end - r > e.bufferLength * 4 ? new Wk(n, e.nodeSet) : null;
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
      let a = e[o];
      for (; ; ) {
        if (this.tokens.mainToken = null, a.pos > t)
          n.push(a);
        else {
          if (this.advanceStack(a, n, e))
            continue;
          {
            s || (s = [], r = []), s.push(a);
            let l = this.tokens.getMainToken(a);
            r.push(l.value, l.end);
          }
        }
        break;
      }
    }
    if (!n.length) {
      let o = s && Fk(s);
      if (o)
        return si && console.log("Finish with " + this.stackID(o)), this.stackToTree(o);
      if (this.parser.strict)
        throw si && s && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), new SyntaxError("No parse at " + t);
      this.recovering || (this.recovering = 5);
    }
    if (this.recovering && s) {
      let o = this.stoppedAt != null && s[0].pos > this.stoppedAt ? s[0] : this.runRecovery(s, r, n);
      if (o)
        return si && console.log("Force-finish " + this.stackID(o)), this.stackToTree(o.forceAll());
    }
    if (this.recovering) {
      let o = this.recovering == 1 ? 1 : this.recovering * 3;
      if (n.length > o)
        for (n.sort((a, l) => l.score - a.score); n.length > o; )
          n.pop();
      n.some((a) => a.reducePos > t) && this.recovering--;
    } else if (n.length > 1) {
      e: for (let o = 0; o < n.length - 1; o++) {
        let a = n[o];
        for (let l = o + 1; l < n.length; l++) {
          let h = n[l];
          if (a.sameState(h) || a.buffer.length > 500 && h.buffer.length > 500)
            if ((a.score - h.score || a.buffer.length - h.buffer.length) > 0)
              n.splice(l--, 1);
            else {
              n.splice(o--, 1);
              continue e;
            }
        }
      }
      n.length > 12 && (n.sort((o, a) => a.score - o.score), n.splice(
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
    let s = e.pos, { parser: r } = this, o = si ? this.stackID(e) + " -> " : "";
    if (this.stoppedAt != null && s > this.stoppedAt)
      return e.forceReduce() ? e : null;
    if (this.fragments) {
      let h = e.curContext && e.curContext.tracker.strict, c = h ? e.curContext.hash : 0;
      for (let f = this.fragments.nodeAt(s); f; ) {
        let d = this.parser.nodeSet.types[f.type.id] == f.type ? r.getGoto(e.state, f.type.id) : -1;
        if (d > -1 && f.length && (!h || (f.prop(Re.contextHash) || 0) == c))
          return e.useNode(f, d), si && console.log(o + this.stackID(e) + ` (via reuse of ${r.getName(f.type.id)})`), !0;
        if (!(f instanceof bt) || f.children.length == 0 || f.positions[0] > 0)
          break;
        let p = f.children[0];
        if (p instanceof bt && f.positions[0] == 0)
          f = p;
        else
          break;
      }
    }
    let a = r.stateSlot(
      e.state,
      4
      /* ParseState.DefaultReduce */
    );
    if (a > 0)
      return e.reduce(a), si && console.log(o + this.stackID(e) + ` (via always-reduce ${r.getName(
        a & 65535
        /* Action.ValueMask */
      )})`), !0;
    if (e.stack.length >= 8400)
      for (; e.stack.length > 6e3 && e.forceReduce(); )
        ;
    let l = this.tokens.getActions(e);
    for (let h = 0; h < l.length; ) {
      let c = l[h++], f = l[h++], d = l[h++], p = h == l.length || !n, O = p ? e : e.split(), g = this.tokens.mainToken;
      if (O.apply(c, f, g ? g.start : O.pos, d), si && console.log(o + this.stackID(O) + ` (via ${(c & 65536) == 0 ? "shift" : `reduce of ${r.getName(
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
        return Qd(e, t), !0;
    }
  }
  runRecovery(e, t, n) {
    let s = null, r = !1;
    for (let o = 0; o < e.length; o++) {
      let a = e[o], l = t[o << 1], h = t[(o << 1) + 1], c = si ? this.stackID(a) + " -> " : "";
      if (a.deadEnd && (r || (r = !0, a.restart(), si && console.log(c + this.stackID(a) + " (restarted)"), this.advanceFully(a, n))))
        continue;
      let f = a.split(), d = c;
      for (let p = 0; p < 10 && f.forceReduce() && (si && console.log(d + this.stackID(f) + " (via force-reduce)"), !this.advanceFully(f, n)); p++)
        si && (d = this.stackID(f) + " -> ");
      for (let p of a.recoverByInsert(l))
        si && console.log(c + this.stackID(p) + " (via recover-insert)"), this.advanceFully(p, n);
      this.stream.end > a.pos ? (h == a.pos && (h++, l = 0), a.recoverByDelete(l, h), si && console.log(c + this.stackID(a) + ` (via recover-delete ${this.parser.getName(l)})`), Qd(a, n)) : (!s || s.score < f.score) && (s = f);
    }
    return s;
  }
  // Convert the stack's buffer to a syntax tree.
  stackToTree(e) {
    return e.close(), bt.build({
      buffer: Ha.create(e),
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
    let t = (Oh || (Oh = /* @__PURE__ */ new WeakMap())).get(e);
    return t || Oh.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
  }
}
function Qd(i, e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (n.pos == i.pos && n.sameState(i)) {
      e[t].score < i.score && (e[t] = i);
      return;
    }
  }
  e.push(i);
}
class Gk {
  constructor(e, t, n) {
    this.source = e, this.flags = t, this.disabled = n;
  }
  allows(e) {
    return !this.disabled || this.disabled[e] == 0;
  }
}
const gh = (i) => i;
class Uk {
  /**
  Define a context tracker.
  */
  constructor(e) {
    this.start = e.start, this.shift = e.shift || gh, this.reduce = e.reduce || gh, this.reuse = e.reuse || gh, this.hash = e.hash || (() => 0), this.strict = e.strict !== !1;
  }
}
class Ka extends Cg {
  /**
  @internal
  */
  constructor(e) {
    if (super(), this.wrappers = [], e.version != 14)
      throw new RangeError(`Parser version (${e.version}) doesn't match runtime version (14)`);
    let t = e.nodeNames.split(" ");
    this.minRepeatTerm = t.length;
    for (let a = 0; a < e.repeatNodeCount; a++)
      t.push("");
    let n = Object.keys(e.topRules).map((a) => e.topRules[a][1]), s = [];
    for (let a = 0; a < t.length; a++)
      s.push([]);
    function r(a, l, h) {
      s[a].push([l, l.deserialize(String(h))]);
    }
    if (e.nodeProps)
      for (let a of e.nodeProps) {
        let l = a[0];
        typeof l == "string" && (l = Re[l]);
        for (let h = 1; h < a.length; ) {
          let c = a[h++];
          if (c >= 0)
            r(c, l, a[h++]);
          else {
            let f = a[h + -c];
            for (let d = -c; d > 0; d--)
              r(a[h++], l, f);
            h++;
          }
        }
      }
    this.nodeSet = new mf(t.map((a, l) => ni.define({
      name: l >= this.minRepeatTerm ? void 0 : a,
      id: l,
      props: s[l],
      top: n.indexOf(l) > -1,
      error: l == 0,
      skipped: e.skippedNodes && e.skippedNodes.indexOf(l) > -1
    }))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = !1, this.bufferLength = $g;
    let o = Ur(e.tokenData);
    this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
    for (let a = 0; a < this.specializerSpecs.length; a++)
      this.specialized[a] = this.specializerSpecs[a].term;
    this.specializers = this.specializerSpecs.map($d), this.states = Ur(e.states, Uint32Array), this.data = Ur(e.stateData), this.goto = Ur(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((a) => typeof a == "number" ? new Ks(o, a) : a), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
  }
  createParse(e, t, n) {
    let s = new Bk(this, e, t, n);
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
      let o = s[r++], a = o & 1, l = s[r++];
      if (a && n)
        return l;
      for (let h = r + (o >> 1); r < h; r++)
        if (s[r] == e)
          return l;
      if (a)
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
            o = n[r = pn(n, r + 2)];
          else {
            if (n[r + 1] == 2)
              return pn(n, r + 2);
            break;
          }
        if (o == t || o == 0)
          return pn(n, r + 1);
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
          r = pn(this.data, r + 2);
        else
          break;
      s = t(pn(this.data, r + 1));
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
          n = pn(this.data, n + 2);
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
    let t = Object.assign(Object.create(Ka.prototype), this);
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
      let r = e.specializers.find((a) => a.from == n.external);
      if (!r)
        return n;
      let o = Object.assign(Object.assign({}, n), { external: r.to });
      return t.specializers[s] = $d(o), o;
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
        for (let o = this.dialects[t[r]], a; (a = this.data[o++]) != 65535; )
          (s || (s = new Uint8Array(this.maxTerm + 1)))[a] = 1;
    return new Gk(e, n, s);
  }
  /**
  Used by the output of the parser generator. Not available to
  user code. @hide
  */
  static deserialize(e) {
    return new Ka(e);
  }
}
function pn(i, e) {
  return i[e] | i[e + 1] << 16;
}
function Fk(i) {
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
function $d(i) {
  if (i.external) {
    let e = i.extend ? 1 : 0;
    return (t, n) => i.external(t, n) << 1 | e;
  }
  return i.get;
}
const Hk = 316, Kk = 317, _d = 1, Jk = 2, eQ = 3, tQ = 4, iQ = 318, nQ = 320, sQ = 321, rQ = 5, oQ = 6, aQ = 0, Pc = [
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
], bm = 125, lQ = 59, Tc = 47, hQ = 42, cQ = 43, fQ = 45, uQ = 60, dQ = 44, pQ = 63, OQ = 46, gQ = 91, mQ = new Uk({
  start: !1,
  shift(i, e) {
    return e == rQ || e == oQ || e == nQ ? i : e == sQ;
  },
  strict: !1
}), vQ = new Lo((i, e) => {
  let { next: t } = i;
  (t == bm || t == -1 || e.context) && i.acceptToken(iQ);
}, { contextual: !0, fallback: !0 }), bQ = new Lo((i, e) => {
  let { next: t } = i, n;
  Pc.indexOf(t) > -1 || t == Tc && ((n = i.peek(1)) == Tc || n == hQ) || t != bm && t != lQ && t != -1 && !e.context && i.acceptToken(Hk);
}, { contextual: !0 }), yQ = new Lo((i, e) => {
  i.next == gQ && !e.context && i.acceptToken(Kk);
}, { contextual: !0 }), wQ = new Lo((i, e) => {
  let { next: t } = i;
  if (t == cQ || t == fQ) {
    if (i.advance(), t == i.next) {
      i.advance();
      let n = !e.context && e.canShift(_d);
      i.acceptToken(n ? _d : Jk);
    }
  } else t == pQ && i.peek(1) == OQ && (i.advance(), i.advance(), (i.next < 48 || i.next > 57) && i.acceptToken(eQ));
}, { contextual: !0 });
function mh(i, e) {
  return i >= 65 && i <= 90 || i >= 97 && i <= 122 || i == 95 || i >= 192 || !e && i >= 48 && i <= 57;
}
const xQ = new Lo((i, e) => {
  if (i.next != uQ || !e.dialectEnabled(aQ) || (i.advance(), i.next == Tc)) return;
  let t = 0;
  for (; Pc.indexOf(i.next) > -1; )
    i.advance(), t++;
  if (mh(i.next, !0)) {
    for (i.advance(), t++; mh(i.next, !1); )
      i.advance(), t++;
    for (; Pc.indexOf(i.next) > -1; )
      i.advance(), t++;
    if (i.next == dQ) return;
    for (let n = 0; ; n++) {
      if (n == 7) {
        if (!mh(i.next, !0)) return;
        break;
      }
      if (i.next != "extends".charCodeAt(n)) break;
      i.advance(), t++;
    }
  }
  i.acceptToken(tQ, -t);
}), SQ = Zg({
  "get set async static": q.modifier,
  "for while do if else switch try catch finally return throw break continue default case defer": q.controlKeyword,
  "in of await yield void typeof delete instanceof as satisfies": q.operatorKeyword,
  "let var const using function class extends": q.definitionKeyword,
  "import export from": q.moduleKeyword,
  "with debugger new": q.keyword,
  TemplateString: q.special(q.string),
  super: q.atom,
  BooleanLiteral: q.bool,
  this: q.self,
  null: q.null,
  Star: q.modifier,
  VariableName: q.variableName,
  "CallExpression/VariableName TaggedTemplateExpression/VariableName": q.function(q.variableName),
  VariableDefinition: q.definition(q.variableName),
  Label: q.labelName,
  PropertyName: q.propertyName,
  PrivatePropertyName: q.special(q.propertyName),
  "CallExpression/MemberExpression/PropertyName": q.function(q.propertyName),
  "FunctionDeclaration/VariableDefinition": q.function(q.definition(q.variableName)),
  "ClassDeclaration/VariableDefinition": q.definition(q.className),
  "NewExpression/VariableName": q.className,
  PropertyDefinition: q.definition(q.propertyName),
  PrivatePropertyDefinition: q.definition(q.special(q.propertyName)),
  UpdateOp: q.updateOperator,
  "LineComment Hashbang": q.lineComment,
  BlockComment: q.blockComment,
  Number: q.number,
  String: q.string,
  Escape: q.escape,
  ArithOp: q.arithmeticOperator,
  LogicOp: q.logicOperator,
  BitOp: q.bitwiseOperator,
  CompareOp: q.compareOperator,
  RegExp: q.regexp,
  Equals: q.definitionOperator,
  Arrow: q.function(q.punctuation),
  ": Spread": q.punctuation,
  "( )": q.paren,
  "[ ]": q.squareBracket,
  "{ }": q.brace,
  "InterpolationStart InterpolationEnd": q.special(q.brace),
  ".": q.derefOperator,
  ", ;": q.separator,
  "@": q.meta,
  TypeName: q.typeName,
  TypeDefinition: q.definition(q.typeName),
  "type enum interface implements namespace module declare": q.definitionKeyword,
  "abstract global Privacy readonly override": q.modifier,
  "is keyof unique infer asserts": q.operatorKeyword,
  JSXAttributeValue: q.attributeValue,
  JSXText: q.content,
  "JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": q.angleBracket,
  "JSXIdentifier JSXNameSpacedName": q.tagName,
  "JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": q.attributeName,
  "JSXBuiltin/JSXIdentifier": q.standard(q.tagName)
}), kQ = { __proto__: null, export: 20, as: 25, from: 33, default: 36, async: 41, function: 42, in: 52, out: 55, const: 56, extends: 60, this: 64, true: 72, false: 72, null: 84, void: 88, typeof: 92, super: 108, new: 142, delete: 154, yield: 163, await: 167, class: 172, public: 235, private: 235, protected: 235, readonly: 237, instanceof: 256, satisfies: 259, import: 292, keyof: 349, unique: 353, infer: 359, asserts: 395, is: 397, abstract: 417, implements: 419, type: 421, let: 424, var: 426, using: 429, interface: 435, enum: 439, namespace: 445, module: 447, declare: 451, global: 455, defer: 471, for: 476, of: 485, while: 488, with: 492, do: 496, if: 500, else: 502, switch: 506, case: 512, try: 518, catch: 522, finally: 526, return: 530, throw: 534, break: 538, continue: 542, debugger: 546 }, QQ = { __proto__: null, async: 129, get: 131, set: 133, declare: 195, public: 197, private: 197, protected: 197, static: 199, abstract: 201, override: 203, readonly: 209, accessor: 211, new: 401 }, $Q = { __proto__: null, "<": 193 }, _Q = Ka.deserialize({
  version: 14,
  states: "$F|Q%TQlOOO%[QlOOO'_QpOOP(lO`OOO*zQ!0MxO'#CiO+RO#tO'#CjO+aO&jO'#CjO+oO#@ItO'#DaO.QQlO'#DgO.bQlO'#DrO%[QlO'#DzO0fQlO'#ESOOQ!0Lf'#E['#E[O1PQ`O'#EXOOQO'#Ep'#EpOOQO'#Il'#IlO1XQ`O'#GsO1dQ`O'#EoO1iQ`O'#EoO3hQ!0MxO'#JrO6[Q!0MxO'#JsO6uQ`O'#F]O6zQ,UO'#FtOOQ!0Lf'#Ff'#FfO7VO7dO'#FfO9XQMhO'#F|O9`Q`O'#F{OOQ!0Lf'#Js'#JsOOQ!0Lb'#Jr'#JrO9eQ`O'#GwOOQ['#K_'#K_O9pQ`O'#IYO9uQ!0LrO'#IZOOQ['#J`'#J`OOQ['#I_'#I_Q`QlOOQ`QlOOO9}Q!L^O'#DvO:UQlO'#EOO:]QlO'#EQO9kQ`O'#GsO:dQMhO'#CoO:rQ`O'#EnO:}Q`O'#EyO;hQMhO'#FeO;xQ`O'#GsOOQO'#K`'#K`O;}Q`O'#K`O<]Q`O'#G{O<]Q`O'#G|O<]Q`O'#HOO9kQ`O'#HRO=SQ`O'#HUO>kQ`O'#CeO>{Q`O'#HcO?TQ`O'#HiO?TQ`O'#HkO`QlO'#HmO?TQ`O'#HoO?TQ`O'#HrO?YQ`O'#HxO?_Q!0LsO'#IOO%[QlO'#IQO?jQ!0LsO'#ISO?uQ!0LsO'#IUO9uQ!0LrO'#IWO@QQ!0MxO'#CiOASQpO'#DlQOQ`OOO%[QlO'#EQOAjQ`O'#ETO:dQMhO'#EnOAuQ`O'#EnOBQQ!bO'#FeOOQ['#Cg'#CgOOQ!0Lb'#Dq'#DqOOQ!0Lb'#Jv'#JvO%[QlO'#JvOOQO'#Jy'#JyOOQO'#Ih'#IhOCQQpO'#EgOOQ!0Lb'#Ef'#EfOOQ!0Lb'#J}'#J}OC|Q!0MSO'#EgODWQpO'#EWOOQO'#Jx'#JxODlQpO'#JyOEyQpO'#EWODWQpO'#EgPFWO&2DjO'#CbPOOO)CD})CD}OOOO'#I`'#I`OFcO#tO,59UOOQ!0Lh,59U,59UOOOO'#Ia'#IaOFqO&jO,59UOGPQ!L^O'#DcOOOO'#Ic'#IcOGWO#@ItO,59{OOQ!0Lf,59{,59{OGfQlO'#IdOGyQ`O'#JtOIxQ!fO'#JtO+}QlO'#JtOJPQ`O,5:ROJgQ`O'#EpOJtQ`O'#KTOKPQ`O'#KSOKPQ`O'#KSOKXQ`O,5;^OK^Q`O'#KROOQ!0Ln,5:^,5:^OKeQlO,5:^OMcQ!0MxO,5:fONSQ`O,5:nONmQ!0LrO'#KQONtQ`O'#KPO9eQ`O'#KPO! YQ`O'#KPO! bQ`O,5;]O! gQ`O'#KPO!#lQ!fO'#JsOOQ!0Lh'#Ci'#CiO%[QlO'#ESO!$[Q!fO,5:sOOQS'#Jz'#JzOOQO-E<j-E<jO9kQ`O,5=_O!$rQ`O,5=_O!$wQlO,5;ZO!&zQMhO'#EkO!(eQ`O,5;ZO!(jQlO'#DyO!(tQpO,5;dO!(|QpO,5;dO%[QlO,5;dOOQ['#FT'#FTOOQ['#FV'#FVO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eOOQ['#FZ'#FZO!)[QlO,5;tOOQ!0Lf,5;y,5;yOOQ!0Lf,5;z,5;zOOQ!0Lf,5;|,5;|O%[QlO'#IpO!+_Q!0LrO,5<iO%[QlO,5;eO!&zQMhO,5;eO!+|QMhO,5;eO!-nQMhO'#E^O%[QlO,5;wOOQ!0Lf,5;{,5;{O!-uQ,UO'#FjO!.rQ,UO'#KXO!.^Q,UO'#KXO!.yQ,UO'#KXOOQO'#KX'#KXO!/_Q,UO,5<SOOOW,5<`,5<`O!/pQlO'#FvOOOW'#Io'#IoO7VO7dO,5<QO!/wQ,UO'#FxOOQ!0Lf,5<Q,5<QO!0hQ$IUO'#CyOOQ!0Lh'#C}'#C}O!0{O#@ItO'#DRO!1iQMjO,5<eO!1pQ`O,5<hO!3YQ(CWO'#GXO!3jQ`O'#GYO!3oQ`O'#GYO!5_Q(CWO'#G^O!6dQpO'#GbOOQO'#Gn'#GnO!,TQMhO'#GmOOQO'#Gp'#GpO!,TQMhO'#GoO!7VQ$IUO'#JlOOQ!0Lh'#Jl'#JlO!7aQ`O'#JkO!7oQ`O'#JjO!7wQ`O'#CuOOQ!0Lh'#C{'#C{O!8YQ`O'#C}OOQ!0Lh'#DV'#DVOOQ!0Lh'#DX'#DXO!8_Q`O,5<eO1SQ`O'#DZO!,TQMhO'#GPO!,TQMhO'#GRO!8gQ`O'#GTO!8lQ`O'#GUO!3oQ`O'#G[O!,TQMhO'#GaO<]Q`O'#JkO!8qQ`O'#EqO!9`Q`O,5<gOOQ!0Lb'#Cr'#CrO!9hQ`O'#ErO!:bQpO'#EsOOQ!0Lb'#KR'#KRO!:iQ!0LrO'#KaO9uQ!0LrO,5=cO`QlO,5>tOOQ['#Jh'#JhOOQ[,5>u,5>uOOQ[-E<]-E<]O!<hQ!0MxO,5:bO!:]QpO,5:`O!?RQ!0MxO,5:jO%[QlO,5:jO!AiQ!0MxO,5:lOOQO,5@z,5@zO!BYQMhO,5=_O!BhQ!0LrO'#JiO9`Q`O'#JiO!ByQ!0LrO,59ZO!CUQpO,59ZO!C^QMhO,59ZO:dQMhO,59ZO!CiQ`O,5;ZO!CqQ`O'#HbO!DVQ`O'#KdO%[QlO,5;}O!:]QpO,5<PO!D_Q`O,5=zO!DdQ`O,5=zO!DiQ`O,5=zO!DwQ`O,5=zO9uQ!0LrO,5=zO<]Q`O,5=jOOQO'#Cy'#CyO!EOQpO,5=gO!EWQMhO,5=hO!EcQ`O,5=jO!EhQ!bO,5=mO!EpQ`O'#K`O?YQ`O'#HWO9kQ`O'#HYO!EuQ`O'#HYO:dQMhO'#H[O!EzQ`O'#H[OOQ[,5=p,5=pO!FPQ`O'#H]O!FbQ`O'#CoO!FgQ`O,59PO!FqQ`O,59PO!HvQlO,59POOQ[,59P,59PO!IWQ!0LrO,59PO%[QlO,59PO!KcQlO'#HeOOQ['#Hf'#HfOOQ['#Hg'#HgO`QlO,5=}O!KyQ`O,5=}O`QlO,5>TO`QlO,5>VO!LOQ`O,5>XO`QlO,5>ZO!LTQ`O,5>^O!LYQlO,5>dOOQ[,5>j,5>jO%[QlO,5>jO9uQ!0LrO,5>lOOQ[,5>n,5>nO#!dQ`O,5>nOOQ[,5>p,5>pO#!dQ`O,5>pOOQ[,5>r,5>rO##QQpO'#D_O%[QlO'#JvO##sQpO'#JvO##}QpO'#DmO#$`QpO'#DmO#&qQlO'#DmO#&xQ`O'#JuO#'QQ`O,5:WO#'VQ`O'#EtO#'eQ`O'#KUO#'mQ`O,5;_O#'rQpO'#DmO#(PQpO'#EVOOQ!0Lf,5:o,5:oO%[QlO,5:oO#(WQ`O,5:oO?YQ`O,5;YO!CUQpO,5;YO!C^QMhO,5;YO:dQMhO,5;YO#(`Q`O,5@bO#(eQ07dO,5:sOOQO-E<f-E<fO#)kQ!0MSO,5;RODWQpO,5:rO#)uQpO,5:rODWQpO,5;RO!ByQ!0LrO,5:rOOQ!0Lb'#Ej'#EjOOQO,5;R,5;RO%[QlO,5;RO#*SQ!0LrO,5;RO#*_Q!0LrO,5;RO!CUQpO,5:rOOQO,5;X,5;XO#*mQ!0LrO,5;RPOOO'#I^'#I^P#+RO&2DjO,58|POOO,58|,58|OOOO-E<^-E<^OOQ!0Lh1G.p1G.pOOOO-E<_-E<_OOOO,59},59}O#+^Q!bO,59}OOOO-E<a-E<aOOQ!0Lf1G/g1G/gO#+cQ!fO,5?OO+}QlO,5?OOOQO,5?U,5?UO#+mQlO'#IdOOQO-E<b-E<bO#+zQ`O,5@`O#,SQ!fO,5@`O#,ZQ`O,5@nOOQ!0Lf1G/m1G/mO%[QlO,5@oO#,cQ`O'#IjOOQO-E<h-E<hO#,ZQ`O,5@nOOQ!0Lb1G0x1G0xOOQ!0Ln1G/x1G/xOOQ!0Ln1G0Y1G0YO%[QlO,5@lO#,wQ!0LrO,5@lO#-YQ!0LrO,5@lO#-aQ`O,5@kO9eQ`O,5@kO#-iQ`O,5@kO#-wQ`O'#ImO#-aQ`O,5@kOOQ!0Lb1G0w1G0wO!(tQpO,5:uO!)PQpO,5:uOOQS,5:w,5:wO#.iQdO,5:wO#.qQMhO1G2yO9kQ`O1G2yOOQ!0Lf1G0u1G0uO#/PQ!0MxO1G0uO#0UQ!0MvO,5;VOOQ!0Lh'#GW'#GWO#0rQ!0MzO'#JlO!$wQlO1G0uO#2}Q!fO'#JwO%[QlO'#JwO#3XQ`O,5:eOOQ!0Lh'#D_'#D_OOQ!0Lf1G1O1G1OO%[QlO1G1OOOQ!0Lf1G1f1G1fO#3^Q`O1G1OO#5rQ!0MxO1G1PO#5yQ!0MxO1G1PO#8aQ!0MxO1G1PO#8hQ!0MxO1G1PO#;OQ!0MxO1G1PO#=fQ!0MxO1G1PO#=mQ!0MxO1G1PO#=tQ!0MxO1G1PO#@[Q!0MxO1G1PO#@cQ!0MxO1G1PO#BpQ?MtO'#CiO#DkQ?MtO1G1`O#DrQ?MtO'#JsO#EVQ!0MxO,5?[OOQ!0Lb-E<n-E<nO#GdQ!0MxO1G1PO#HaQ!0MzO1G1POOQ!0Lf1G1P1G1PO#IdQMjO'#J|O#InQ`O,5:xO#IsQ!0MxO1G1cO#JgQ,UO,5<WO#JoQ,UO,5<XO#JwQ,UO'#FoO#K`Q`O'#FnOOQO'#KY'#KYOOQO'#In'#InO#KeQ,UO1G1nOOQ!0Lf1G1n1G1nOOOW1G1y1G1yO#KvQ?MtO'#JrO#LQQ`O,5<bO!)[QlO,5<bOOOW-E<m-E<mOOQ!0Lf1G1l1G1lO#LVQpO'#KXOOQ!0Lf,5<d,5<dO#L_QpO,5<dO#LdQMhO'#DTOOOO'#Ib'#IbO#LkO#@ItO,59mOOQ!0Lh,59m,59mO%[QlO1G2PO!8lQ`O'#IrO#LvQ`O,5<zOOQ!0Lh,5<w,5<wO!,TQMhO'#IuO#MdQMjO,5=XO!,TQMhO'#IwO#NVQMjO,5=ZO!&zQMhO,5=]OOQO1G2S1G2SO#NaQ!dO'#CrO#NtQ(CWO'#ErO$ |QpO'#GbO$!dQ!dO,5<sO$!kQ`O'#K[O9eQ`O'#K[O$!yQ`O,5<uO$#aQ!dO'#C{O!,TQMhO,5<tO$#kQ`O'#GZO$$PQ`O,5<tO$$UQ!dO'#GWO$$cQ!dO'#K]O$$mQ`O'#K]O!&zQMhO'#K]O$$rQ`O,5<xO$$wQlO'#JvO$%RQpO'#GcO#$`QpO'#GcO$%dQ`O'#GgO!3oQ`O'#GkO$%iQ!0LrO'#ItO$%tQpO,5<|OOQ!0Lp,5<|,5<|O$%{QpO'#GcO$&YQpO'#GdO$&kQpO'#GdO$&pQMjO,5=XO$'QQMjO,5=ZOOQ!0Lh,5=^,5=^O!,TQMhO,5@VO!,TQMhO,5@VO$'bQ`O'#IyO$'vQ`O,5@UO$(OQ`O,59aOOQ!0Lh,59i,59iO$(TQ`O,5@VO$)TQ$IYO,59uOOQ!0Lh'#Jp'#JpO$)vQMjO,5<kO$*iQMjO,5<mO@zQ`O,5<oOOQ!0Lh,5<p,5<pO$*sQ`O,5<vO$*xQMjO,5<{O$+YQ`O'#KPO!$wQlO1G2RO$+_Q`O1G2RO9eQ`O'#KSO9eQ`O'#EtO%[QlO'#EtO9eQ`O'#I{O$+dQ!0LrO,5@{OOQ[1G2}1G2}OOQ[1G4`1G4`OOQ!0Lf1G/|1G/|OOQ!0Lf1G/z1G/zO$-fQ!0MxO1G0UOOQ[1G2y1G2yO!&zQMhO1G2yO%[QlO1G2yO#.tQ`O1G2yO$/jQMhO'#EkOOQ!0Lb,5@T,5@TO$/wQ!0LrO,5@TOOQ[1G.u1G.uO!ByQ!0LrO1G.uO!CUQpO1G.uO!C^QMhO1G.uO$0YQ`O1G0uO$0_Q`O'#CiO$0jQ`O'#KeO$0rQ`O,5=|O$0wQ`O'#KeO$0|Q`O'#KeO$1[Q`O'#JRO$1jQ`O,5AOO$1rQ!fO1G1iOOQ!0Lf1G1k1G1kO9kQ`O1G3fO@zQ`O1G3fO$1yQ`O1G3fO$2OQ`O1G3fO!DiQ`O1G3fO9uQ!0LrO1G3fOOQ[1G3f1G3fO!EcQ`O1G3UO!&zQMhO1G3RO$2TQ`O1G3ROOQ[1G3S1G3SO!&zQMhO1G3SO$2YQ`O1G3SO$2bQpO'#HQOOQ[1G3U1G3UO!6_QpO'#I}O!EhQ!bO1G3XOOQ[1G3X1G3XOOQ[,5=r,5=rO$2jQMhO,5=tO9kQ`O,5=tO$%dQ`O,5=vO9`Q`O,5=vO!CUQpO,5=vO!C^QMhO,5=vO:dQMhO,5=vO$2xQ`O'#KcO$3TQ`O,5=wOOQ[1G.k1G.kO$3YQ!0LrO1G.kO@zQ`O1G.kO$3eQ`O1G.kO9uQ!0LrO1G.kO$5mQ!fO,5AQO$5zQ`O,5AQO9eQ`O,5AQO$6VQlO,5>PO$6^Q`O,5>POOQ[1G3i1G3iO`QlO1G3iOOQ[1G3o1G3oOOQ[1G3q1G3qO?TQ`O1G3sO$6cQlO1G3uO$:gQlO'#HtOOQ[1G3x1G3xO$:tQ`O'#HzO?YQ`O'#H|OOQ[1G4O1G4OO$:|QlO1G4OO9uQ!0LrO1G4UOOQ[1G4W1G4WOOQ!0Lb'#G_'#G_O9uQ!0LrO1G4YO9uQ!0LrO1G4[O$?TQ`O,5@bO!)[QlO,5;`O9eQ`O,5;`O?YQ`O,5:XO!)[QlO,5:XO!CUQpO,5:XO$?YQ?MtO,5:XOOQO,5;`,5;`O$?dQpO'#IeO$?zQ`O,5@aOOQ!0Lf1G/r1G/rO$@SQpO'#IkO$@^Q`O,5@pOOQ!0Lb1G0y1G0yO#$`QpO,5:XOOQO'#Ig'#IgO$@fQpO,5:qOOQ!0Ln,5:q,5:qO#(ZQ`O1G0ZOOQ!0Lf1G0Z1G0ZO%[QlO1G0ZOOQ!0Lf1G0t1G0tO?YQ`O1G0tO!CUQpO1G0tO!C^QMhO1G0tOOQ!0Lb1G5|1G5|O!ByQ!0LrO1G0^OOQO1G0m1G0mO%[QlO1G0mO$@mQ!0LrO1G0mO$@xQ!0LrO1G0mO!CUQpO1G0^ODWQpO1G0^O$AWQ!0LrO1G0mOOQO1G0^1G0^O$AlQ!0MxO1G0mPOOO-E<[-E<[POOO1G.h1G.hOOOO1G/i1G/iO$AvQ!bO,5<iO$BOQ!fO1G4jOOQO1G4p1G4pO%[QlO,5?OO$BYQ`O1G5zO$BbQ`O1G6YO$BjQ!fO1G6ZO9eQ`O,5?UO$BtQ!0MxO1G6WO%[QlO1G6WO$CUQ!0LrO1G6WO$CgQ`O1G6VO$CgQ`O1G6VO9eQ`O1G6VO$CoQ`O,5?XO9eQ`O,5?XOOQO,5?X,5?XO$DTQ`O,5?XO$+YQ`O,5?XOOQO-E<k-E<kOOQS1G0a1G0aOOQS1G0c1G0cO#.lQ`O1G0cOOQ[7+(e7+(eO!&zQMhO7+(eO%[QlO7+(eO$DcQ`O7+(eO$DnQMhO7+(eO$D|Q!0MzO,5=XO$GXQ!0MzO,5=ZO$IdQ!0MzO,5=XO$KuQ!0MzO,5=ZO$NWQ!0MzO,59uO%!]Q!0MzO,5<kO%$hQ!0MzO,5<mO%&sQ!0MzO,5<{OOQ!0Lf7+&a7+&aO%)UQ!0MxO7+&aO%)xQlO'#IfO%*VQ`O,5@cO%*_Q!fO,5@cOOQ!0Lf1G0P1G0PO%*iQ`O7+&jOOQ!0Lf7+&j7+&jO%*nQ?MtO,5:fO%[QlO7+&zO%*xQ?MtO,5:bO%+VQ?MtO,5:jO%+aQ?MtO,5:lO%+kQMhO'#IiO%+uQ`O,5@hOOQ!0Lh1G0d1G0dOOQO1G1r1G1rOOQO1G1s1G1sO%+}Q!jO,5<ZO!)[QlO,5<YOOQO-E<l-E<lOOQ!0Lf7+'Y7+'YOOOW7+'e7+'eOOOW1G1|1G1|O%,YQ`O1G1|OOQ!0Lf1G2O1G2OOOOO,59o,59oO%,_Q!dO,59oOOOO-E<`-E<`OOQ!0Lh1G/X1G/XO%,fQ!0MxO7+'kOOQ!0Lh,5?^,5?^O%-YQMhO1G2fP%-aQ`O'#IrPOQ!0Lh-E<p-E<pO%-}QMjO,5?aOOQ!0Lh-E<s-E<sO%.pQMjO,5?cOOQ!0Lh-E<u-E<uO%.zQ!dO1G2wO%/RQ!dO'#CrO%/iQMhO'#KSO$$wQlO'#JvOOQ!0Lh1G2_1G2_O%/sQ`O'#IqO%0[Q`O,5@vO%0[Q`O,5@vO%0dQ`O,5@vO%0oQ`O,5@vOOQO1G2a1G2aO%0}QMjO1G2`O$+YQ`O'#K[O!,TQMhO1G2`O%1_Q(CWO'#IsO%1lQ`O,5@wO!&zQMhO,5@wO%1tQ!dO,5@wOOQ!0Lh1G2d1G2dO%4UQ!fO'#CiO%4`Q`O,5=POOQ!0Lb,5<},5<}O%4hQpO,5<}OOQ!0Lb,5=O,5=OOCwQ`O,5<}O%4sQpO,5<}OOQ!0Lb,5=R,5=RO$+YQ`O,5=VOOQO,5?`,5?`OOQO-E<r-E<rOOQ!0Lp1G2h1G2hO#$`QpO,5<}O$$wQlO,5=PO%5RQ`O,5=OO%5^QpO,5=OO!,TQMhO'#IuO%6WQMjO1G2sO!,TQMhO'#IwO%6yQMjO1G2uO%7TQMjO1G5qO%7_QMjO1G5qOOQO,5?e,5?eOOQO-E<w-E<wOOQO1G.{1G.{O!,TQMhO1G5qO!,TQMhO1G5qO!:]QpO,59wO%[QlO,59wOOQ!0Lh,5<j,5<jO%7lQ`O1G2ZO!,TQMhO1G2bO%7qQ!0MxO7+'mOOQ!0Lf7+'m7+'mO!$wQlO7+'mO%8eQ`O,5;`OOQ!0Lb,5?g,5?gOOQ!0Lb-E<y-E<yO%8jQ!dO'#K^O#(ZQ`O7+(eO4UQ!fO7+(eO$DfQ`O7+(eO%8tQ!0MvO'#CiO%9XQ!0MvO,5=SO%9lQ`O,5=SO%9tQ`O,5=SOOQ!0Lb1G5o1G5oOOQ[7+$a7+$aO!ByQ!0LrO7+$aO!CUQpO7+$aO!$wQlO7+&aO%9yQ`O'#JQO%:bQ`O,5APOOQO1G3h1G3hO9kQ`O,5APO%:bQ`O,5APO%:jQ`O,5APOOQO,5?m,5?mOOQO-E=P-E=POOQ!0Lf7+'T7+'TO%:oQ`O7+)QO9uQ!0LrO7+)QO9kQ`O7+)QO@zQ`O7+)QO%:tQ`O7+)QOOQ[7+)Q7+)QOOQ[7+(p7+(pO%:yQ!0MvO7+(mO!&zQMhO7+(mO!E^Q`O7+(nOOQ[7+(n7+(nO!&zQMhO7+(nO%;TQ`O'#KbO%;`Q`O,5=lOOQO,5?i,5?iOOQO-E<{-E<{OOQ[7+(s7+(sO%<rQpO'#HZOOQ[1G3`1G3`O!&zQMhO1G3`O%[QlO1G3`O%<yQ`O1G3`O%=UQMhO1G3`O9uQ!0LrO1G3bO$%dQ`O1G3bO9`Q`O1G3bO!CUQpO1G3bO!C^QMhO1G3bO%=dQ`O'#JPO%=xQ`O,5@}O%>QQpO,5@}OOQ!0Lb1G3c1G3cOOQ[7+$V7+$VO@zQ`O7+$VO9uQ!0LrO7+$VO%>]Q`O7+$VO%[QlO1G6lO%[QlO1G6mO%>bQ!0LrO1G6lO%>lQlO1G3kO%>sQ`O1G3kO%>xQlO1G3kOOQ[7+)T7+)TO9uQ!0LrO7+)_O`QlO7+)aOOQ['#Kh'#KhOOQ['#JS'#JSO%?PQlO,5>`OOQ[,5>`,5>`O%[QlO'#HuO%?^Q`O'#HwOOQ[,5>f,5>fO9eQ`O,5>fOOQ[,5>h,5>hOOQ[7+)j7+)jOOQ[7+)p7+)pOOQ[7+)t7+)tOOQ[7+)v7+)vO%?cQpO1G5|O%?}Q?MtO1G0zO%@XQ`O1G0zOOQO1G/s1G/sO%@dQ?MtO1G/sO?YQ`O1G/sO!)[QlO'#DmOOQO,5?P,5?POOQO-E<c-E<cOOQO,5?V,5?VOOQO-E<i-E<iO!CUQpO1G/sOOQO-E<e-E<eOOQ!0Ln1G0]1G0]OOQ!0Lf7+%u7+%uO#(ZQ`O7+%uOOQ!0Lf7+&`7+&`O?YQ`O7+&`O!CUQpO7+&`OOQO7+%x7+%xO$AlQ!0MxO7+&XOOQO7+&X7+&XO%[QlO7+&XO%@nQ!0LrO7+&XO!ByQ!0LrO7+%xO!CUQpO7+%xO%@yQ!0LrO7+&XO%AXQ!0MxO7++rO%[QlO7++rO%AiQ`O7++qO%AiQ`O7++qOOQO1G4s1G4sO9eQ`O1G4sO%AqQ`O1G4sOOQS7+%}7+%}O#(ZQ`O<<LPO4UQ!fO<<LPO%BPQ`O<<LPOOQ[<<LP<<LPO!&zQMhO<<LPO%[QlO<<LPO%BXQ`O<<LPO%BdQ!0MzO,5?aO%DoQ!0MzO,5?cO%FzQ!0MzO1G2`O%I]Q!0MzO1G2sO%KhQ!0MzO1G2uO%MsQ!fO,5?QO%[QlO,5?QOOQO-E<d-E<dO%M}Q`O1G5}OOQ!0Lf<<JU<<JUO%NVQ?MtO1G0uO&!^Q?MtO1G1PO&!eQ?MtO1G1PO&$fQ?MtO1G1PO&$mQ?MtO1G1PO&&nQ?MtO1G1PO&(oQ?MtO1G1PO&(vQ?MtO1G1PO&(}Q?MtO1G1PO&+OQ?MtO1G1PO&+VQ?MtO1G1PO&+^Q!0MxO<<JfO&-UQ?MtO1G1PO&.RQ?MvO1G1PO&/UQ?MvO'#JlO&1[Q?MtO1G1cO&1iQ?MtO1G0UO&1sQMjO,5?TOOQO-E<g-E<gO!)[QlO'#FqOOQO'#KZ'#KZOOQO1G1u1G1uO&1}Q`O1G1tO&2SQ?MtO,5?[OOOW7+'h7+'hOOOO1G/Z1G/ZO&2^Q!dO1G4xOOQ!0Lh7+(Q7+(QP!&zQMhO,5?^O!,TQMhO7+(cO&2eQ`O,5?]O9eQ`O,5?]O$+YQ`O,5?]OOQO-E<o-E<oO&2sQ`O1G6bO&2sQ`O1G6bO&2{Q`O1G6bO&3WQMjO7+'zO&3hQ!dO,5?_O&3rQ`O,5?_O!&zQMhO,5?_OOQO-E<q-E<qO&3wQ!dO1G6cO&4RQ`O1G6cO&4ZQ`O1G2kO!&zQMhO1G2kOOQ!0Lb1G2i1G2iOOQ!0Lb1G2j1G2jO%4hQpO1G2iO!CUQpO1G2iOCwQ`O1G2iOOQ!0Lb1G2q1G2qO&4`QpO1G2iO&4nQ`O1G2kO$+YQ`O1G2jOCwQ`O1G2jO$$wQlO1G2kO&4vQ`O1G2jO&5jQMjO,5?aOOQ!0Lh-E<t-E<tO&6]QMjO,5?cOOQ!0Lh-E<v-E<vO!,TQMhO7++]O&6gQMjO7++]O&6qQMjO7++]OOQ!0Lh1G/c1G/cO&7OQ`O1G/cOOQ!0Lh7+'u7+'uO&7TQMjO7+'|O&7eQ!0MxO<<KXOOQ!0Lf<<KX<<KXO&8XQ`O1G0zO!&zQMhO'#IzO&8^Q`O,5@xO&:`Q!fO<<LPO!&zQMhO1G2nO&:gQ!0LrO1G2nOOQ[<<G{<<G{O!ByQ!0LrO<<G{O&:xQ!0MxO<<I{OOQ!0Lf<<I{<<I{OOQO,5?l,5?lO&;lQ`O,5?lO&;qQ`O,5?lOOQO-E=O-E=OO&<PQ`O1G6kO&<PQ`O1G6kO9kQ`O1G6kO@zQ`O<<LlOOQ[<<Ll<<LlO&<XQ`O<<LlO9uQ!0LrO<<LlO9kQ`O<<LlOOQ[<<LX<<LXO%:yQ!0MvO<<LXOOQ[<<LY<<LYO!E^Q`O<<LYO&<^QpO'#I|O&<iQ`O,5@|O!)[QlO,5@|OOQ[1G3W1G3WOOQO'#JO'#JOO9uQ!0LrO'#JOO&<qQpO,5=uOOQ[,5=u,5=uO&<xQpO'#EgO&=PQpO'#GeO&=UQ`O7+(zO&=ZQ`O7+(zOOQ[7+(z7+(zO!&zQMhO7+(zO%[QlO7+(zO&=cQ`O7+(zOOQ[7+(|7+(|O9uQ!0LrO7+(|O$%dQ`O7+(|O9`Q`O7+(|O!CUQpO7+(|O&=nQ`O,5?kOOQO-E<}-E<}OOQO'#H^'#H^O&=yQ`O1G6iO9uQ!0LrO<<GqOOQ[<<Gq<<GqO@zQ`O<<GqO&>RQ`O7+,WO&>WQ`O7+,XO%[QlO7+,WO%[QlO7+,XOOQ[7+)V7+)VO&>]Q`O7+)VO&>bQlO7+)VO&>iQ`O7+)VOOQ[<<Ly<<LyOOQ[<<L{<<L{OOQ[-E=Q-E=QOOQ[1G3z1G3zO&>nQ`O,5>aOOQ[,5>c,5>cO&>sQ`O1G4QO9eQ`O7+&fO!)[QlO7+&fOOQO7+%_7+%_O&>xQ?MtO1G6ZO?YQ`O7+%_OOQ!0Lf<<Ia<<IaOOQ!0Lf<<Iz<<IzO?YQ`O<<IzOOQO<<Is<<IsO$AlQ!0MxO<<IsO%[QlO<<IsOOQO<<Id<<IdO!ByQ!0LrO<<IdO&?SQ!0LrO<<IsO&?_Q!0MxO<= ^O&?oQ`O<= ]OOQO7+*_7+*_O9eQ`O7+*_OOQ[ANAkANAkO&?wQ!fOANAkO!&zQMhOANAkO#(ZQ`OANAkO4UQ!fOANAkO&@OQ`OANAkO%[QlOANAkO&@WQ!0MzO7+'zO&BiQ!0MzO,5?aO&DtQ!0MzO,5?cO&GPQ!0MzO7+'|O&IbQ!fO1G4lO&IlQ?MtO7+&aO&KpQ?MvO,5=XO&MwQ?MvO,5=ZO&NXQ?MvO,5=XO&NiQ?MvO,5=ZO&NyQ?MvO,59uO'#PQ?MvO,5<kO'%SQ?MvO,5<mO''hQ?MvO,5<{O')^Q?MtO7+'kO')kQ?MtO7+'mO')xQ`O,5<]OOQO7+'`7+'`OOQ!0Lh7+*d7+*dO')}QMjO<<K}OOQO1G4w1G4wO'*UQ`O1G4wO'*aQ`O1G4wO'*oQ`O7++|O'*oQ`O7++|O!&zQMhO1G4yO'*wQ!dO1G4yO'+RQ`O7++}O'+ZQ`O7+(VO'+fQ!dO7+(VOOQ!0Lb7+(T7+(TOOQ!0Lb7+(U7+(UO!CUQpO7+(TOCwQ`O7+(TO'+pQ`O7+(VO!&zQMhO7+(VO$+YQ`O7+(UO'+uQ`O7+(VOCwQ`O7+(UO'+}QMjO<<NwO!,TQMhO<<NwOOQ!0Lh7+$}7+$}O',XQ!dO,5?fOOQO-E<x-E<xO',cQ!0MvO7+(YO!&zQMhO7+(YOOQ[AN=gAN=gO9kQ`O1G5WOOQO1G5W1G5WO',sQ`O1G5WO',xQ`O7+,VO',xQ`O7+,VO9uQ!0LrOANBWO@zQ`OANBWOOQ[ANBWANBWO'-QQ`OANBWOOQ[ANAsANAsOOQ[ANAtANAtO'-VQ`O,5?hOOQO-E<z-E<zO'-bQ?MtO1G6hOOQO,5?j,5?jOOQO-E<|-E<|OOQ[1G3a1G3aO'-lQ`O,5=POOQ[<<Lf<<LfO!&zQMhO<<LfO&=UQ`O<<LfO'-qQ`O<<LfO%[QlO<<LfOOQ[<<Lh<<LhO9uQ!0LrO<<LhO$%dQ`O<<LhO9`Q`O<<LhO'-yQpO1G5VO'.UQ`O7+,TOOQ[AN=]AN=]O9uQ!0LrOAN=]OOQ[<= r<= rOOQ[<= s<= sO'.^Q`O<= rO'.cQ`O<= sOOQ[<<Lq<<LqO'.hQ`O<<LqO'.mQlO<<LqOOQ[1G3{1G3{O?YQ`O7+)lO'.tQ`O<<JQO'/PQ?MtO<<JQOOQO<<Hy<<HyOOQ!0LfAN?fAN?fOOQOAN?_AN?_O$AlQ!0MxOAN?_OOQOAN?OAN?OO%[QlOAN?_OOQO<<My<<MyOOQ[G27VG27VO!&zQMhOG27VO#(ZQ`OG27VO'/ZQ!fOG27VO4UQ!fOG27VO'/bQ`OG27VO'/jQ?MtO<<JfO'/wQ?MvO1G2`O'1mQ?MvO,5?aO'3pQ?MvO,5?cO'5sQ?MvO1G2sO'7vQ?MvO1G2uO'9yQ?MtO<<KXO':WQ?MtO<<I{OOQO1G1w1G1wO!,TQMhOANAiOOQO7+*c7+*cO':eQ`O7+*cO':pQ`O<= hO':xQ!dO7+*eOOQ!0Lb<<Kq<<KqO$+YQ`O<<KqOCwQ`O<<KqO';SQ`O<<KqO!&zQMhO<<KqOOQ!0Lb<<Ko<<KoO!CUQpO<<KoO';_Q!dO<<KqOOQ!0Lb<<Kp<<KpO';iQ`O<<KqO!&zQMhO<<KqO$+YQ`O<<KpO';nQMjOANDcO';xQ!0MvO<<KtOOQO7+*r7+*rO9kQ`O7+*rO'<YQ`O<= qOOQ[G27rG27rO9uQ!0LrOG27rO@zQ`OG27rO!)[QlO1G5SO'<bQ`O7+,SO'<jQ`O1G2kO&=UQ`OANBQOOQ[ANBQANBQO!&zQMhOANBQO'<oQ`OANBQOOQ[ANBSANBSO9uQ!0LrOANBSO$%dQ`OANBSOOQO'#H_'#H_OOQO7+*q7+*qOOQ[G22wG22wOOQ[ANE^ANE^OOQ[ANE_ANE_OOQ[ANB]ANB]O'<wQ`OANB]OOQ[<<MW<<MWO!)[QlOAN?lOOQOG24yG24yO$AlQ!0MxOG24yO#(ZQ`OLD,qOOQ[LD,qLD,qO!&zQMhOLD,qO'<|Q!fOLD,qO'=TQ?MvO7+'zO'>yQ?MvO,5?aO'@|Q?MvO,5?cO'CPQ?MvO7+'|O'DuQMjOG27TOOQO<<M}<<M}OOQ!0LbANA]ANA]O$+YQ`OANA]OCwQ`OANA]O'EVQ!dOANA]OOQ!0LbANAZANAZO'E^Q`OANA]O!&zQMhOANA]O'EiQ!dOANA]OOQ!0LbANA[ANA[OOQO<<N^<<N^OOQ[LD-^LD-^O9uQ!0LrOLD-^O'EsQ?MtO7+*nOOQO'#Gf'#GfOOQ[G27lG27lO&=UQ`OG27lO!&zQMhOG27lOOQ[G27nG27nO9uQ!0LrOG27nOOQ[G27wG27wO'E}Q?MtOG25WOOQOLD*eLD*eOOQ[!$(!]!$(!]O#(ZQ`O!$(!]O!&zQMhO!$(!]O'FXQ!0MzOG27TOOQ!0LbG26wG26wO$+YQ`OG26wO'HjQ`OG26wOCwQ`OG26wO'HuQ!dOG26wO!&zQMhOG26wOOQ[!$(!x!$(!xOOQ[LD-WLD-WO&=UQ`OLD-WOOQ[LD-YLD-YOOQ[!)9Ew!)9EwO#(ZQ`O!)9EwOOQ!0LbLD,cLD,cO$+YQ`OLD,cOCwQ`OLD,cO'H|Q`OLD,cO'IXQ!dOLD,cOOQ[!$(!r!$(!rOOQ[!.K;c!.K;cO'I`Q?MvOG27TOOQ!0Lb!$( }!$( }O$+YQ`O!$( }OCwQ`O!$( }O'KUQ`O!$( }OOQ!0Lb!)9Ei!)9EiO$+YQ`O!)9EiOCwQ`O!)9EiOOQ!0Lb!.K;T!.K;TO$+YQ`O!.K;TOOQ!0Lb!4/0o!4/0oO!)[QlO'#DzO1PQ`O'#EXO'KaQ!fO'#JrO'KhQ!L^O'#DvO'KoQlO'#EOO'KvQ!fO'#CiO'N^Q!fO'#CiO!)[QlO'#EQO'NnQlO,5;ZO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO'#IpO(!qQ`O,5<iO!)[QlO,5;eO(!yQMhO,5;eO($dQMhO,5;eO!)[QlO,5;wO!&zQMhO'#GmO(!yQMhO'#GmO!&zQMhO'#GoO(!yQMhO'#GoO1SQ`O'#DZO1SQ`O'#DZO!&zQMhO'#GPO(!yQMhO'#GPO!&zQMhO'#GRO(!yQMhO'#GRO!&zQMhO'#GaO(!yQMhO'#GaO!)[QlO,5:jO($kQpO'#D_O($uQpO'#JvO!)[QlO,5@oO'NnQlO1G0uO(%PQ?MtO'#CiO!)[QlO1G2PO!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO(%ZQ!dO'#CrO!&zQMhO,5<tO(!yQMhO,5<tO'NnQlO1G2RO!)[QlO7+&zO!&zQMhO1G2`O(!yQMhO1G2`O!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO!&zQMhO1G2bO(!yQMhO1G2bO'NnQlO7+'mO'NnQlO7+&aO!&zQMhOANAiO(!yQMhOANAiO(%nQ`O'#EoO(%sQ`O'#EoO(%{Q`O'#F]O(&QQ`O'#EyO(&VQ`O'#KTO(&bQ`O'#KRO(&mQ`O,5;ZO(&rQMjO,5<eO(&yQ`O'#GYO('OQ`O'#GYO('TQ`O,5<eO(']Q`O,5<gO('eQ`O,5;ZO('mQ?MtO1G1`O('tQ`O,5<tO('yQ`O,5<tO((OQ`O,5<vO((TQ`O,5<vO((YQ`O1G2RO((_Q`O1G0uO((dQMjO<<K}O((kQMjO<<K}O((rQMhO'#F|O9`Q`O'#F{OAuQ`O'#EnO!)[QlO,5;tO!3oQ`O'#GYO!3oQ`O'#GYO!3oQ`O'#G[O!3oQ`O'#G[O!,TQMhO7+(cO!,TQMhO7+(cO%.zQ!dO1G2wO%.zQ!dO1G2wO!&zQMhO,5=]O!&zQMhO,5=]",
  stateData: "()x~O'|OS'}OSTOS(ORQ~OPYOQYOSfOY!VOaqOdzOeyOl!POpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!uwO!xxO!|]O$W|O$niO%h}O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO&W!WO&^!XO&`!YO&b!ZO&d![O&g!]O&m!^O&s!_O&u!`O&w!aO&y!bO&{!cO(TSO(VTO(YUO(aVO(o[O~OWtO~P`OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa!wOs!nO!S!oO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!xO#W!pO#X!pO#[!zO#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O(O!{O~OP]XR]X[]Xa]Xj]Xr]X!Q]X!S]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X'z]X(a]X(r]X(y]X(z]X~O!g%RX~P(qO_!}O(V#PO(W!}O(X#PO~O_#QO(X#PO(Y#PO(Z#QO~Ox#SO!U#TO(b#TO(c#VO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T<ZO(VTO(YUO(aVO(o[O~O![#ZO!]#WO!Y(hP!Y(vP~P+}O!^#cO~P`OPYOQYOSfOd!jOe!iOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(VTO(YUO(aVO(o[O~Op#mO![#iO!|]O#i#lO#j#iO(T<[O!k(sP~P.iO!l#oO(T#nO~O!x#sO!|]O%h#tO~O#k#uO~O!g#vO#k#uO~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!]$_O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa(fX'z(fX'w(fX!k(fX!Y(fX!_(fX%i(fX!g(fX~P1qO#S$dO#`$eO$Q$eOP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX!_(gX%i(gX~Oa(gX'z(gX'w(gX!Y(gX!k(gXv(gX!g(gX~P4UO#`$eO~O$]$hO$_$gO$f$mO~OSfO!_$nO$i$oO$k$qO~Oh%VOj%dOk%dOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T$sO(VTO(YUO(a$uO(y$}O(z%POg(^P~Ol%[O~P7eO!l%eO~O!S%hO!_%iO(T%gO~O!g%mO~Oa%nO'z%nO~O!Q%rO~P%[O(U!lO~P%[O%n%vO~P%[Oh%VO!l%eO(T%gO(U!lO~Oe%}O!l%eO(T%gO~Oj$RO~O!_&PO(T%gO(U!lO(VTO(YUO`)WP~O!Q&SO!l&RO%j&VO&T&WO~P;SO!x#sO~O%s&YO!S)SX!_)SX(T)SX~O(T&ZO~Ol!PO!u&`O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO~Od&eOe&dO!x&bO%h&cO%{&aO~P<bOd&hOeyOl!PO!_&gO!u&`O!xxO!|]O%h}O%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO~Ob&kO#`&nO%j&iO(U!lO~P=gO!l&oO!u&sO~O!l#oO~O!_XO~Oa%nO'x&{O'z%nO~Oa%nO'x'OO'z%nO~Oa%nO'x'QO'z%nO~O'w]X!Y]Xv]X!k]X&[]X!_]X%i]X!g]X~P(qO!b'_O!c'WO!d'WO(U!lO(VTO(YUO~Os'UO!S'TO!['XO(e'SO!^(iP!^(xP~P@nOn'bO!_'`O(T%gO~Oe'gO!l%eO(T%gO~O!Q&SO!l&RO~Os!nO!S!oO!|<VO#T!pO#U!pO#W!pO#X!pO(U!lO(VTO(YUO(e!mO(o!sO~O!b'mO!c'lO!d'lO#V!pO#['nO#]'nO~PBYOa%nOh%VO!g#vO!l%eO'z%nO(r'pO~O!p'tO#`'rO~PChOs!nO!S!oO(VTO(YUO(e!mO(o!sO~O!_XOs(mX!S(mX!b(mX!c(mX!d(mX!|(mX#T(mX#U(mX#V(mX#W(mX#X(mX#[(mX#](mX(U(mX(V(mX(Y(mX(e(mX(o(mX~O!c'lO!d'lO(U!lO~PDWO(P'xO(Q'xO(R'zO~O_!}O(V'|O(W!}O(X'|O~O_#QO(X'|O(Y'|O(Z#QO~Ov(OO~P%[Ox#SO!U#TO(b#TO(c(RO~O![(TO!Y'WX!Y'^X!]'WX!]'^X~P+}O!](VO!Y(hX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!](VO!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~O!Y(hX~PHRO!Y([O~O!Y(uX!](uX!g(uX!k(uX(r(uX~O#`(uX#k#dX!^(uX~PJUO#`(]O!Y(wX!](wX~O!](^O!Y(vX~O!Y(aO~O#`$eO~PJUO!^(bO~P`OR#zO!Q#yO!S#{O!l#xO(aVOP!na[!naj!nar!na!]!na!p!na#R!na#n!na#o!na#p!na#q!na#r!na#s!na#t!na#u!na#v!na#x!na#z!na#{!na(r!na(y!na(z!na~Oa!na'z!na'w!na!Y!na!k!nav!na!_!na%i!na!g!na~PKlO!k(cO~O!g#vO#`(dO(r'pO!](tXa(tX'z(tX~O!k(tX~PNXO!S%hO!_%iO!|]O#i(iO#j(hO(T%gO~O!](jO!k(sX~O!k(lO~O!S%hO!_%iO#j(hO(T%gO~OP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~O!g#vO!k(gX~P! uOR(nO!Q(mO!l#xO#S$dO!|!{a!S!{a~O!x!{a%h!{a!_!{a#i!{a#j!{a(T!{a~P!#vO!x(rO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~O#k(xO~O![(zO!k(kP~P%[O(e(|O(o[O~O!S)OO!l#xO(e(|O(o[O~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]$_Oa$qa'z$qa'w$qa!k$qa!Y$qa!_$qa%i$qa!g$qa~Ol)dO~P!&zOh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Og(pP~P!,TO!Q)iO!g)hO!_$^X$Z$^X$]$^X$_$^X$f$^X~O!g)hO!_({X$Z({X$]({X$_({X$f({X~O!Q)iO~P!.^O!Q)iO!_({X$Z({X$]({X$_({X$f({X~O!_)kO$Z)oO$])jO$_)jO$f)pO~O![)sO~P!)[O$]$hO$_$gO$f)wO~On$zX!Q$zX#S$zX'y$zX(y$zX(z$zX~OgmXg$zXnmX!]mX#`mX~P!0SOx)yO(b)zO(c)|O~On*VO!Q*OO'y*PO(y$}O(z%PO~Og)}O~P!1WOg*WO~Oh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S*YO!_*ZO!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op*`O![*^O(T*XO!k)OP~P!1uO#k*aO~O!l*bO~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T*dO(VTO(YUO(a$uO(y$}O(z%PO~O![*gO!Y)PP~P!3tOr*sOs!nO!S*iO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO(e!mO~O!^*pO~P!5iO#S$dOn(`X!Q(`X'y(`X(y(`X(z(`X!](`X#`(`X~Og(`X$O(`X~P!6kOn*xO#`*wOg(_X!](_X~O!]*yOg(^X~Oj%dOk%dOl%dO(T&ZOg(^P~Os*|O~Og)}O(T&ZO~O!l+SO~O(T(vO~Op+WO!S%hO![#iO!_%iO!|]O#i#lO#j#iO(T%gO!k(sP~O!g#vO#k+XO~O!S%hO![+ZO!](^O!_%iO(T%gO!Y(vP~Os'[O!S+]O![+[O(VTO(YUO(e(|O~O!^(xP~P!9|O!]+^Oa)TX'z)TX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa!ja!]!ja'z!ja'w!ja!Y!ja!k!jav!ja!_!ja%i!ja!g!ja~P!:tOR#zO!Q#yO!S#{O!l#xO(aVOP!ra[!raj!rar!ra!]!ra!p!ra#R!ra#n!ra#o!ra#p!ra#q!ra#r!ra#s!ra#t!ra#u!ra#v!ra#x!ra#z!ra#{!ra(r!ra(y!ra(z!ra~Oa!ra'z!ra'w!ra!Y!ra!k!rav!ra!_!ra%i!ra!g!ra~P!=[OR#zO!Q#yO!S#{O!l#xO(aVOP!ta[!taj!tar!ta!]!ta!p!ta#R!ta#n!ta#o!ta#p!ta#q!ta#r!ta#s!ta#t!ta#u!ta#v!ta#x!ta#z!ta#{!ta(r!ta(y!ta(z!ta~Oa!ta'z!ta'w!ta!Y!ta!k!tav!ta!_!ta%i!ta!g!ta~P!?rOh%VOn+gO!_'`O%i+fO~O!g+iOa(]X!_(]X'z(]X!](]X~Oa%nO!_XO'z%nO~Oh%VO!l%eO~Oh%VO!l%eO(T%gO~O!g#vO#k(xO~Ob+tO%j+uO(T+qO(VTO(YUO!^)XP~O!]+vO`)WX~O[+zO~O`+{O~O!_&PO(T%gO(U!lO`)WP~O%j,OO~P;SOh%VO#`,SO~Oh%VOn,VO!_$|O~O!_,XO~O!Q,ZO!_XO~O%n%vO~O!x,`O~Oe,eO~Ob,fO(T#nO(VTO(YUO!^)VP~Oe%}O~O%j!QO(T&ZO~P=gO[,kO`,jO~OPYOQYOSfOdzOeyOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!iuO!lZO!oYO!pYO!qYO!svO!xxO!|]O$niO%h}O(VTO(YUO(aVO(o[O~O!_!eO!u!gO$W!kO(T!dO~P!FyO`,jOa%nO'z%nO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa,pOl!OO!uwO%l!OO%m!OO%n!OO~P!IcO!l&oO~O&^,vO~O!_,xO~O&o,zO&q,{OP&laQ&laS&laY&laa&lad&lae&lal&lap&lar&las&lat&laz&la|&la!O&la!S&la!W&la!X&la!_&la!i&la!l&la!o&la!p&la!q&la!s&la!u&la!x&la!|&la$W&la$n&la%h&la%j&la%l&la%m&la%n&la%q&la%s&la%v&la%w&la%y&la&W&la&^&la&`&la&b&la&d&la&g&la&m&la&s&la&u&la&w&la&y&la&{&la'w&la(T&la(V&la(Y&la(a&la(o&la!^&la&e&lab&la&j&la~O(T-QO~Oh!eX!]!RX!^!RX!g!RX!g!eX!l!eX#`!RX~O!]!eX!^!eX~P#!iO!g-VO#`-UOh(jX!]#hX!^#hX!g(jX!l(jX~O!](jX!^(jX~P##[Oh%VO!g-XO!l%eO!]!aX!^!aX~Os!nO!S!oO(VTO(YUO(e!mO~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(VTO(YUO(aVO(o[O~O(T=QO~P#$qO!]-]O!^(iX~O!^-_O~O!g-VO#`-UO!]#hX!^#hX~O!]-`O!^(xX~O!^-bO~O!c-cO!d-cO(U!lO~P#$`O!^-fO~P'_On-iO!_'`O~O!Y-nO~Os!{a!b!{a!c!{a!d!{a#T!{a#U!{a#V!{a#W!{a#X!{a#[!{a#]!{a(U!{a(V!{a(Y!{a(e!{a(o!{a~P!#vO!p-sO#`-qO~PChO!c-uO!d-uO(U!lO~PDWOa%nO#`-qO'z%nO~Oa%nO!g#vO#`-qO'z%nO~Oa%nO!g#vO!p-sO#`-qO'z%nO(r'pO~O(P'xO(Q'xO(R-zO~Ov-{O~O!Y'Wa!]'Wa~P!:tO![.PO!Y'WX!]'WX~P%[O!](VO!Y(ha~O!Y(ha~PHRO!](^O!Y(va~O!S%hO![.TO!_%iO(T%gO!Y'^X!]'^X~O#`.VO!](ta!k(taa(ta'z(ta~O!g#vO~P#,wO!](jO!k(sa~O!S%hO!_%iO#j.ZO(T%gO~Op.`O!S%hO![.]O!_%iO!|]O#i._O#j.]O(T%gO!]'aX!k'aX~OR.dO!l#xO~Oh%VOn.gO!_'`O%i.fO~Oa#ci!]#ci'z#ci'w#ci!Y#ci!k#civ#ci!_#ci%i#ci!g#ci~P!:tOn>]O!Q*OO'y*PO(y$}O(z%PO~O#k#_aa#_a#`#_a'z#_a!]#_a!k#_a!_#_a!Y#_a~P#/sO#k(`XP(`XR(`X[(`Xa(`Xj(`Xr(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X'z(`X(a(`X(r(`X!k(`X!Y(`X'w(`Xv(`X!_(`X%i(`X!g(`X~P!6kO!].tO!k(kX~P!:tO!k.wO~O!Y.yO~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mia#mij#mir#mi!]#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#n#mi~P#3cO#n$OO~P#3cOP$[OR#zOr$aO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO[#mia#mij#mi!]#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#r#mi~P#6QO#r$QO~P#6QOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO(aVOa#mi!]#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#v#mi~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO(aVO(z#}Oa#mi!]#mi#z#mi#{#mi'z#mi(r#mi(y#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#x$UO~P#;VO#x#mi~P#;VO#v$SO~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO(aVO(y#|O(z#}Oa#mi!]#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#z#mi~P#={O#z$WO~P#={OP]XR]X[]Xj]Xr]X!Q]X!S]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X!]]X!^]X~O$O]X~P#@jOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO#z<gO#{<hO(aVO(r$YO(y#|O(z#}O~O$O.{O~P#BwO#S$dO#`<nO$Q<nO$O(gX!^(gX~P! uOa'da!]'da'z'da'w'da!k'da!Y'dav'da!_'da%i'da!g'da~P!:tO[#mia#mij#mir#mi!]#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO(y#mi(z#mi~P#EyOn>]O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P#EyO!]/POg(pX~P!1WOg/RO~Oa$Pi!]$Pi'z$Pi'w$Pi!Y$Pi!k$Piv$Pi!_$Pi%i$Pi!g$Pi~P!:tO$]/SO$_/SO~O$]/TO$_/TO~O!g)hO#`/UO!_$cX$Z$cX$]$cX$_$cX$f$cX~O![/VO~O!_)kO$Z/XO$])jO$_)jO$f/YO~O!]<iO!^(fX~P#BwO!^/ZO~O!g)hO$f({X~O$f/]O~Ov/^O~P!&zOx)yO(b)zO(c/aO~O!S/dO~O(y$}On%aa!Q%aa'y%aa(z%aa!]%aa#`%aa~Og%aa$O%aa~P#L{O(z%POn%ca!Q%ca'y%ca(y%ca!]%ca#`%ca~Og%ca$O%ca~P#MnO!]fX!gfX!kfX!k$zX(rfX~P!0SOp%WO![/mO!](^O(T/lO!Y(vP!Y)PP~P!1uOr*sO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO~Os<}O!S/nO![+[O!^*pO(e<|O!^(xP~P$ [O!k/oO~P#/sO!]/pO!g#vO(r'pO!k)OX~O!k/uO~OnoX!QoX'yoX(yoX(zoX~O!g#vO!koX~P$#OOp/wO!S%hO![*^O!_%iO(T%gO!k)OP~O#k/xO~O!Y$zX!]$zX!g%RX~P!0SO!]/yO!Y)PX~P#/sO!g/{O~O!Y/}O~OpkO(T0OO~P.iOh%VOr0TO!g#vO!l%eO(r'pO~O!g+iO~Oa%nO!]0XO'z%nO~O!^0ZO~P!5iO!c0[O!d0[O(U!lO~P#$`Os!nO!S0]O(VTO(YUO(e!mO~O#[0_O~Og%aa!]%aa#`%aa$O%aa~P!1WOg%ca!]%ca#`%ca$O%ca~P!1WOj%dOk%dOl%dO(T&ZOg'mX!]'mX~O!]*yOg(^a~Og0hO~On0jO#`0iOg(_a!](_a~OR0kO!Q0kO!S0lO#S$dOn}a'y}a(y}a(z}a!]}a#`}a~Og}a$O}a~P$(cO!Q*OO'y*POn$sa(y$sa(z$sa!]$sa#`$sa~Og$sa$O$sa~P$)_O!Q*OO'y*POn$ua(y$ua(z$ua!]$ua#`$ua~Og$ua$O$ua~P$*QO#k0oO~Og%Ta!]%Ta#`%Ta$O%Ta~P!1WO!g#vO~O#k0rO~O!]+^Oa)Ta'z)Ta~OR#zO!Q#yO!S#{O!l#xO(aVOP!ri[!rij!rir!ri!]!ri!p!ri#R!ri#n!ri#o!ri#p!ri#q!ri#r!ri#s!ri#t!ri#u!ri#v!ri#x!ri#z!ri#{!ri(r!ri(y!ri(z!ri~Oa!ri'z!ri'w!ri!Y!ri!k!riv!ri!_!ri%i!ri!g!ri~P$+oOh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op0{O%]0|O(T0zO~P$.VO!g+iOa(]a!_(]a'z(]a!](]a~O#k1SO~O[]X!]fX!^fX~O!]1TO!^)XX~O!^1VO~O[1WO~Ob1YO(T+qO(VTO(YUO~O!_&PO(T%gO`'uX!]'uX~O!]+vO`)Wa~O!k1]O~P!:tO[1`O~O`1aO~O#`1fO~On1iO!_$|O~O(e(|O!^)UP~Oh%VOn1rO!_1oO%i1qO~O[1|O!]1zO!^)VX~O!^1}O~O`2POa%nO'z%nO~O(T#nO(VTO(YUO~O#S$dO#`$eO$Q$eOP(gXR(gX[(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~Oj2SO&[2TOa(gX~P$3pOj2SO#`$eO&[2TO~Oa2VO~P%[Oa2XO~O&e2[OP&ciQ&ciS&ciY&cia&cid&cie&cil&cip&cir&cis&cit&ciz&ci|&ci!O&ci!S&ci!W&ci!X&ci!_&ci!i&ci!l&ci!o&ci!p&ci!q&ci!s&ci!u&ci!x&ci!|&ci$W&ci$n&ci%h&ci%j&ci%l&ci%m&ci%n&ci%q&ci%s&ci%v&ci%w&ci%y&ci&W&ci&^&ci&`&ci&b&ci&d&ci&g&ci&m&ci&s&ci&u&ci&w&ci&y&ci&{&ci'w&ci(T&ci(V&ci(Y&ci(a&ci(o&ci!^&cib&ci&j&ci~Ob2bO!^2`O&j2aO~P`O!_XO!l2dO~O&q,{OP&liQ&liS&liY&lia&lid&lie&lil&lip&lir&lis&lit&liz&li|&li!O&li!S&li!W&li!X&li!_&li!i&li!l&li!o&li!p&li!q&li!s&li!u&li!x&li!|&li$W&li$n&li%h&li%j&li%l&li%m&li%n&li%q&li%s&li%v&li%w&li%y&li&W&li&^&li&`&li&b&li&d&li&g&li&m&li&s&li&u&li&w&li&y&li&{&li'w&li(T&li(V&li(Y&li(a&li(o&li!^&li&e&lib&li&j&li~O!Y2jO~O!]!aa!^!aa~P#BwOs!nO!S!oO![2pO(e!mO!]'XX!^'XX~P@nO!]-]O!^(ia~O!]'_X!^'_X~P!9|O!]-`O!^(xa~O!^2wO~P'_Oa%nO#`3QO'z%nO~Oa%nO!g#vO#`3QO'z%nO~Oa%nO!g#vO!p3UO#`3QO'z%nO(r'pO~Oa%nO'z%nO~P!:tO!]$_Ov$qa~O!Y'Wi!]'Wi~P!:tO!](VO!Y(hi~O!](^O!Y(vi~O!Y(wi!](wi~P!:tO!](ti!k(tia(ti'z(ti~P!:tO#`3WO!](ti!k(tia(ti'z(ti~O!](jO!k(si~O!S%hO!_%iO!|]O#i3]O#j3[O(T%gO~O!S%hO!_%iO#j3[O(T%gO~On3dO!_'`O%i3cO~Oh%VOn3dO!_'`O%i3cO~O#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aav%aa!_%aa%i%aa!g%aa~P#L{O#k%caP%caR%ca[%caa%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%cav%ca!_%ca%i%ca!g%ca~P#MnO#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!]%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aa#`%aav%aa!_%aa%i%aa!g%aa~P#/sO#k%caP%caR%ca[%caa%caj%car%ca!S%ca!]%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%ca#`%cav%ca!_%ca%i%ca!g%ca~P#/sO#k}aP}a[}aa}aj}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a'z}a(a}a(r}a!k}a!Y}a'w}av}a!_}a%i}a!g}a~P$(cO#k$saP$saR$sa[$saa$saj$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa'z$sa(a$sa(r$sa!k$sa!Y$sa'w$sav$sa!_$sa%i$sa!g$sa~P$)_O#k$uaP$uaR$ua[$uaa$uaj$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua'z$ua(a$ua(r$ua!k$ua!Y$ua'w$uav$ua!_$ua%i$ua!g$ua~P$*QO#k%TaP%TaR%Ta[%Taa%Taj%Tar%Ta!S%Ta!]%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta'z%Ta(a%Ta(r%Ta!k%Ta!Y%Ta'w%Ta#`%Tav%Ta!_%Ta%i%Ta!g%Ta~P#/sOa#cq!]#cq'z#cq'w#cq!Y#cq!k#cqv#cq!_#cq%i#cq!g#cq~P!:tO![3lO!]'YX!k'YX~P%[O!].tO!k(ka~O!].tO!k(ka~P!:tO!Y3oO~O$O!na!^!na~PKlO$O!ja!]!ja!^!ja~P#BwO$O!ra!^!ra~P!=[O$O!ta!^!ta~P!?rOg']X!]']X~P!,TO!]/POg(pa~OSfO!_4TO$d4UO~O!^4YO~Ov4ZO~P#/sOa$mq!]$mq'z$mq'w$mq!Y$mq!k$mqv$mq!_$mq%i$mq!g$mq~P!:tO!Y4]O~P!&zO!S4^O~O!Q*OO'y*PO(z%POn'ia(y'ia!]'ia#`'ia~Og'ia$O'ia~P%-fO!Q*OO'y*POn'ka(y'ka(z'ka!]'ka#`'ka~Og'ka$O'ka~P%.XO(r$YO~P#/sO!YfX!Y$zX!]fX!]$zX!g%RX#`fX~P!0SOp%WO(T=WO~P!1uOp4bO!S%hO![4aO!_%iO(T%gO!]'eX!k'eX~O!]/pO!k)Oa~O!]/pO!g#vO!k)Oa~O!]/pO!g#vO(r'pO!k)Oa~Og$|i!]$|i#`$|i$O$|i~P!1WO![4jO!Y'gX!]'gX~P!3tO!]/yO!Y)Pa~O!]/yO!Y)Pa~P#/sOP]XR]X[]Xj]Xr]X!Q]X!S]X!Y]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~Oj%YX!g%YX~P%2OOj4oO!g#vO~Oh%VO!g#vO!l%eO~Oh%VOr4tO!l%eO(r'pO~Or4yO!g#vO(r'pO~Os!nO!S4zO(VTO(YUO(e!mO~O(y$}On%ai!Q%ai'y%ai(z%ai!]%ai#`%ai~Og%ai$O%ai~P%5oO(z%POn%ci!Q%ci'y%ci(y%ci!]%ci#`%ci~Og%ci$O%ci~P%6bOg(_i!](_i~P!1WO#`5QOg(_i!](_i~P!1WO!k5VO~Oa$oq!]$oq'z$oq'w$oq!Y$oq!k$oqv$oq!_$oq%i$oq!g$oq~P!:tO!Y5ZO~O!]5[O!_)QX~P#/sOa$zX!_$zX%^]X'z$zX!]$zX~P!0SO%^5_OaoX!_oX'zoX!]oX~P$#OOp5`O(T#nO~O%^5_O~Ob5fO%j5gO(T+qO(VTO(YUO!]'tX!^'tX~O!]1TO!^)Xa~O[5kO~O`5lO~O[5pO~Oa%nO'z%nO~P#/sO!]5uO#`5wO!^)UX~O!^5xO~Or6OOs!nO!S*iO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!pO#W!pO#X!pO#[5}O#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O!^5|O~P%;eOn6TO!_1oO%i6SO~Oh%VOn6TO!_1oO%i6SO~Ob6[O(T#nO(VTO(YUO!]'sX!^'sX~O!]1zO!^)Va~O(VTO(YUO(e6^O~O`6bO~Oj6eO&[6fO~PNXO!k6gO~P%[Oa6iO~Oa6iO~P%[Ob2bO!^6nO&j2aO~P`O!g6pO~O!g6rOh(ji!](ji!^(ji!g(ji!l(jir(ji(r(ji~O!]#hi!^#hi~P#BwO#`6sO!]#hi!^#hi~O!]!ai!^!ai~P#BwOa%nO#`6|O'z%nO~Oa%nO!g#vO#`6|O'z%nO~O!](tq!k(tqa(tq'z(tq~P!:tO!](jO!k(sq~O!S%hO!_%iO#j7TO(T%gO~O!_'`O%i7WO~On7[O!_'`O%i7WO~O#k'iaP'iaR'ia['iaa'iaj'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia'z'ia(a'ia(r'ia!k'ia!Y'ia'w'iav'ia!_'ia%i'ia!g'ia~P%-fO#k'kaP'kaR'ka['kaa'kaj'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka'z'ka(a'ka(r'ka!k'ka!Y'ka'w'kav'ka!_'ka%i'ka!g'ka~P%.XO#k$|iP$|iR$|i[$|ia$|ij$|ir$|i!S$|i!]$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i'z$|i(a$|i(r$|i!k$|i!Y$|i'w$|i#`$|iv$|i!_$|i%i$|i!g$|i~P#/sO#k%aiP%aiR%ai[%aia%aij%air%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai'z%ai(a%ai(r%ai!k%ai!Y%ai'w%aiv%ai!_%ai%i%ai!g%ai~P%5oO#k%ciP%ciR%ci[%cia%cij%cir%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci'z%ci(a%ci(r%ci!k%ci!Y%ci'w%civ%ci!_%ci%i%ci!g%ci~P%6bO!]'Ya!k'Ya~P!:tO!].tO!k(ki~O$O#ci!]#ci!^#ci~P#BwOP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mij#mir#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#n#mi~P%NdO#n<_O~P%NdOP$[OR#zOr<kO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO[#mij#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#r#mi~P&!lO#r<aO~P&!lOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO(aVO#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#v#mi~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO(aVO(z#}O#z#mi#{#mi$O#mi(r#mi(y#mi!]#mi!^#mi~O#x<eO~P&&uO#x#mi~P&&uO#v<cO~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO(aVO(y#|O(z#}O#{#mi$O#mi(r#mi!]#mi!^#mi~O#z#mi~P&)UO#z<gO~P&)UOa#|y!]#|y'z#|y'w#|y!Y#|y!k#|yv#|y!_#|y%i#|y!g#|y~P!:tO[#mij#mir#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi!]#mi!^#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO(y#mi(z#mi~P&,QOn>^O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P&,QO#S$dOP(`XR(`X[(`Xj(`Xn(`Xr(`X!Q(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X$O(`X'y(`X(a(`X(r(`X(y(`X(z(`X!](`X!^(`X~O$O$Pi!]$Pi!^$Pi~P#BwO$O!ri!^!ri~P$+oOg']a!]']a~P!1WO!^7nO~O!]'da!^'da~P#BwO!Y7oO~P#/sO!g#vO(r'pO!]'ea!k'ea~O!]/pO!k)Oi~O!]/pO!g#vO!k)Oi~Og$|q!]$|q#`$|q$O$|q~P!1WO!Y'ga!]'ga~P#/sO!g7vO~O!]/yO!Y)Pi~P#/sO!]/yO!Y)Pi~O!Y7yO~Oh%VOr8OO!l%eO(r'pO~Oj8QO!g#vO~Or8TO!g#vO(r'pO~O!Q*OO'y*PO(z%POn'ja(y'ja!]'ja#`'ja~Og'ja$O'ja~P&5RO!Q*OO'y*POn'la(y'la(z'la!]'la#`'la~Og'la$O'la~P&5tOg(_q!](_q~P!1WO#`8VOg(_q!](_q~P!1WO!Y8WO~Og%Oq!]%Oq#`%Oq$O%Oq~P!1WOa$oy!]$oy'z$oy'w$oy!Y$oy!k$oyv$oy!_$oy%i$oy!g$oy~P!:tO!g6rO~O!]5[O!_)Qa~O!_'`OP$TaR$Ta[$Taj$Tar$Ta!Q$Ta!S$Ta!]$Ta!l$Ta!p$Ta#R$Ta#n$Ta#o$Ta#p$Ta#q$Ta#r$Ta#s$Ta#t$Ta#u$Ta#v$Ta#x$Ta#z$Ta#{$Ta(a$Ta(r$Ta(y$Ta(z$Ta~O%i7WO~P&8fO%^8[Oa%[i!_%[i'z%[i!]%[i~Oa#cy!]#cy'z#cy'w#cy!Y#cy!k#cyv#cy!_#cy%i#cy!g#cy~P!:tO[8^O~Ob8`O(T+qO(VTO(YUO~O!]1TO!^)Xi~O`8dO~O(e(|O!]'pX!^'pX~O!]5uO!^)Ua~O!^8nO~P%;eO(o!sO~P$&YO#[8oO~O!_1oO~O!_1oO%i8qO~On8tO!_1oO%i8qO~O[8yO!]'sa!^'sa~O!]1zO!^)Vi~O!k8}O~O!k9OO~O!k9RO~O!k9RO~P%[Oa9TO~O!g9UO~O!k9VO~O!](wi!^(wi~P#BwOa%nO#`9_O'z%nO~O!](ty!k(tya(ty'z(ty~P!:tO!](jO!k(sy~O%i9bO~P&8fO!_'`O%i9bO~O#k$|qP$|qR$|q[$|qa$|qj$|qr$|q!S$|q!]$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q'z$|q(a$|q(r$|q!k$|q!Y$|q'w$|q#`$|qv$|q!_$|q%i$|q!g$|q~P#/sO#k'jaP'jaR'ja['jaa'jaj'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja'z'ja(a'ja(r'ja!k'ja!Y'ja'w'jav'ja!_'ja%i'ja!g'ja~P&5RO#k'laP'laR'la['laa'laj'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la'z'la(a'la(r'la!k'la!Y'la'w'lav'la!_'la%i'la!g'la~P&5tO#k%OqP%OqR%Oq[%Oqa%Oqj%Oqr%Oq!S%Oq!]%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq'z%Oq(a%Oq(r%Oq!k%Oq!Y%Oq'w%Oq#`%Oqv%Oq!_%Oq%i%Oq!g%Oq~P#/sO!]'Yi!k'Yi~P!:tO$O#cq!]#cq!^#cq~P#BwO(y$}OP%aaR%aa[%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa$O%aa(a%aa(r%aa!]%aa!^%aa~On%aa!Q%aa'y%aa(z%aa~P&IyO(z%POP%caR%ca[%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca$O%ca(a%ca(r%ca!]%ca!^%ca~On%ca!Q%ca'y%ca(y%ca~P&LQOn>^O!Q*OO'y*PO(z%PO~P&IyOn>^O!Q*OO'y*PO(y$}O~P&LQOR0kO!Q0kO!S0lO#S$dOP}a[}aj}an}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a$O}a'y}a(a}a(r}a(y}a(z}a!]}a!^}a~O!Q*OO'y*POP$saR$sa[$saj$san$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa$O$sa(a$sa(r$sa(y$sa(z$sa!]$sa!^$sa~O!Q*OO'y*POP$uaR$ua[$uaj$uan$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua$O$ua(a$ua(r$ua(y$ua(z$ua!]$ua!^$ua~On>^O!Q*OO'y*PO(y$}O(z%PO~OP%TaR%Ta[%Taj%Tar%Ta!S%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta$O%Ta(a%Ta(r%Ta!]%Ta!^%Ta~P''VO$O$mq!]$mq!^$mq~P#BwO$O$oq!]$oq!^$oq~P#BwO!^9oO~O$O9pO~P!1WO!g#vO!]'ei!k'ei~O!g#vO(r'pO!]'ei!k'ei~O!]/pO!k)Oq~O!Y'gi!]'gi~P#/sO!]/yO!Y)Pq~Or9wO!g#vO(r'pO~O[9yO!Y9xO~P#/sO!Y9xO~Oj:PO!g#vO~Og(_y!](_y~P!1WO!]'na!_'na~P#/sOa%[q!_%[q'z%[q!]%[q~P#/sO[:UO~O!]1TO!^)Xq~O`:YO~O#`:ZO!]'pa!^'pa~O!]5uO!^)Ui~P#BwO!S:]O~O!_1oO%i:`O~O(VTO(YUO(e:eO~O!]1zO!^)Vq~O!k:hO~O!k:iO~O!k:jO~O!k:jO~P%[O#`:mO!]#hy!^#hy~O!]#hy!^#hy~P#BwO%i:rO~P&8fO!_'`O%i:rO~O$O#|y!]#|y!^#|y~P#BwOP$|iR$|i[$|ij$|ir$|i!S$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i$O$|i(a$|i(r$|i!]$|i!^$|i~P''VO!Q*OO'y*PO(z%POP'iaR'ia['iaj'ian'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia$O'ia(a'ia(r'ia(y'ia!]'ia!^'ia~O!Q*OO'y*POP'kaR'ka['kaj'kan'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka$O'ka(a'ka(r'ka(y'ka(z'ka!]'ka!^'ka~O(y$}OP%aiR%ai[%aij%ain%air%ai!Q%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai$O%ai'y%ai(a%ai(r%ai(z%ai!]%ai!^%ai~O(z%POP%ciR%ci[%cij%cin%cir%ci!Q%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci$O%ci'y%ci(a%ci(r%ci(y%ci!]%ci!^%ci~O$O$oy!]$oy!^$oy~P#BwO$O#cy!]#cy!^#cy~P#BwO!g#vO!]'eq!k'eq~O!]/pO!k)Oy~O!Y'gq!]'gq~P#/sOr:|O!g#vO(r'pO~O[;QO!Y;PO~P#/sO!Y;PO~Og(_!R!](_!R~P!1WOa%[y!_%[y'z%[y!]%[y~P#/sO!]1TO!^)Xy~O!]5uO!^)Uq~O(T;XO~O!_1oO%i;[O~O!k;_O~O%i;dO~P&8fOP$|qR$|q[$|qj$|qr$|q!S$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q$O$|q(a$|q(r$|q!]$|q!^$|q~P''VO!Q*OO'y*PO(z%POP'jaR'ja['jaj'jan'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja$O'ja(a'ja(r'ja(y'ja!]'ja!^'ja~O!Q*OO'y*POP'laR'la['laj'lan'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la$O'la(a'la(r'la(y'la(z'la!]'la!^'la~OP%OqR%Oq[%Oqj%Oqr%Oq!S%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq$O%Oq(a%Oq(r%Oq!]%Oq!^%Oq~P''VOg%e!Z!]%e!Z#`%e!Z$O%e!Z~P!1WO!Y;hO~P#/sOr;iO!g#vO(r'pO~O[;kO!Y;hO~P#/sO!]'pq!^'pq~P#BwO!]#h!Z!^#h!Z~P#BwO#k%e!ZP%e!ZR%e!Z[%e!Za%e!Zj%e!Zr%e!Z!S%e!Z!]%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z'z%e!Z(a%e!Z(r%e!Z!k%e!Z!Y%e!Z'w%e!Z#`%e!Zv%e!Z!_%e!Z%i%e!Z!g%e!Z~P#/sOr;tO!g#vO(r'pO~O!Y;uO~P#/sOr;|O!g#vO(r'pO~O!Y;}O~P#/sOP%e!ZR%e!Z[%e!Zj%e!Zr%e!Z!S%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z$O%e!Z(a%e!Z(r%e!Z!]%e!Z!^%e!Z~P''VOr<QO!g#vO(r'pO~Ov(fX~P1qO!Q%rO~P!)[O(U!lO~P!)[O!YfX!]fX#`fX~P%2OOP]XR]X[]Xj]Xr]X!Q]X!S]X!]]X!]fX!l]X!p]X#R]X#S]X#`]X#`fX#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~O!gfX!k]X!kfX(rfX~P'LTOP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_XO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]<iO!^$qa~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<tO!S${O!_$|O!i>WO!l$xO#j<zO$W%`O$t<vO$v<xO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Ol)dO~P(!yOr!eX(r!eX~P#!iOr(jX(r(jX~P##[O!^]X!^fX~P'LTO!YfX!Y$zX!]fX!]$zX#`fX~P!0SO#k<^O~O!g#vO#k<^O~O#`<nO~Oj<bO~O#`=OO!](wX!^(wX~O#`<nO!](uX!^(uX~O#k=PO~Og=RO~P!1WO#k=XO~O#k=YO~Og=RO(T&ZO~O!g#vO#k=ZO~O!g#vO#k=PO~O$O=[O~P#BwO#k=]O~O#k=^O~O#k=cO~O#k=dO~O#k=eO~O#k=fO~O$O=gO~P!1WO$O=hO~P!1WOl=sO~P7eOk#S#T#U#W#X#[#i#j#u$n$t$v$y%]%^%h%i%j%q%s%v%w%y%{~(OT#o!X'|(U#ps#n#qr!Q'}$]'}(T$_(e~",
  goto: "$9Y)]PPPPPP)^PP)aP)rP+W/]PPPP6mPP7TPP=QPPP@tPA^PA^PPPA^PCfPA^PA^PA^PCjPCoPD^PIWPPPI[PPPPI[L_PPPLeMVPI[PI[PP! eI[PPPI[PI[P!#lI[P!'S!(X!(bP!)U!)Y!)U!,gPPPPPPP!-W!(XPP!-h!/YP!2iI[I[!2n!5z!:h!:h!>gPPP!>oI[PPPPPPPPP!BOP!C]PPI[!DnPI[PI[I[I[I[I[PI[!FQP!I[P!LbP!Lf!Lp!Lt!LtP!IXP!Lx!LxP#!OP#!SI[PI[#!Y#%_CjA^PA^PA^A^P#&lA^A^#)OA^#+vA^#.SA^A^#.r#1W#1W#1]#1f#1W#1qPP#1WPA^#2ZA^#6YA^A^6mPPP#:_PPP#:x#:xP#:xP#;`#:xPP#;fP#;]P#;]#;y#;]#<e#<k#<n)aP#<q)aP#<z#<z#<zP)aP)aP)aP)aPP)aP#=Q#=TP#=T)aP#=XP#=[P)aP)aP)aP)aP)aP)a)aPP#=b#=h#=s#=y#>P#>V#>]#>k#>q#>{#?R#?]#?c#?s#?y#@k#@}#AT#AZ#Ai#BO#Cs#DR#DY#Et#FS#Gt#HS#HY#H`#Hf#Hp#Hv#H|#IW#Ij#IpPPPPPPPPPPP#IvPPPPPPP#Jk#Mx$ b$ i$ qPPP$']P$'f$*_$0x$0{$1O$1}$2Q$2X$2aP$2g$2jP$3W$3[$4S$5b$5g$5}PP$6S$6Y$6^$6a$6e$6i$7e$7|$8e$8i$8l$8o$8y$8|$9Q$9UR!|RoqOXst!Z#d%m&r&t&u&w,s,x2[2_Y!vQ'`-e1o5{Q%tvQ%|yQ&T|Q&j!VS'W!e-]Q'f!iS'l!r!yU*k$|*Z*oQ+o%}S+|&V&WQ,d&dQ-c'_Q-m'gQ-u'mQ0[*qQ1b,OQ1y,eR<{<Y%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_S#q]<V!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU+P%]<s<tQ+t&PQ,f&gQ,m&oQ0x+gQ0}+iQ1Y+uQ2R,kQ3`.gQ5`0|Q5f1TQ6[1zQ7Y3dQ8`5gR9e7['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S!S!nQ!r!v!y!z$|'W'_'`'l'm'n*k*o*q*r-]-c-e-u0[0_1o5{5}%[$ti#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q&X|Q'U!eS'[%i-`Q+t&PQ,P&WQ,f&gQ0n+SQ1Y+uQ1_+{Q2Q,jQ2R,kQ5f1TQ5o1aQ6[1zQ6_1|Q6`2PQ8`5gQ8c5lQ8|6bQ:X8dQ:f8yQ;V:YR<}*ZrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R,h&k&z^OPXYstuvwz!Z!`!g!j!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'b'r(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>R>S[#]WZ#W#Z'X(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ%wxQ%{yW&Q|&V&W,OQ&_!TQ'c!hQ'e!iQ(q#sS+n%|%}Q+r&PQ,_&bQ,c&dS-l'f'gQ.i(rQ1R+oQ1X+uQ1Z+vQ1^+zQ1t,`S1x,d,eQ2|-mQ5e1TQ5i1WQ5n1`Q6Z1yQ8_5gQ8b5kQ8f5pQ:T8^R;T:U!U$zi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y!^%yy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{Q+h%wQ,T&[Q,W&]Q,b&dQ.h(qQ1s,_U1w,c,d,eQ3e.iQ6U1tS6Y1x1yQ8x6Z#f>T#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o>U<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hW%Ti%V*y>PS&[!Q&iQ&]!RQ&^!SU*}%[%d=sR,R&Y%]%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^T)z$u){V+P%]<s<tW'[!e%i*Z-`S(}#y#zQ+c%rQ+y&SS.b(m(nQ1j,XQ5T0kR8i5u'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S$i$^c#Y#e%q%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.|.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vT#TV#U'RkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ'Y!eR2q-]!W!nQ!e!r!v!y!z$|'W'_'`'l'm'n*Z*k*o*q*r-]-c-e-u0[0_1o5{5}R1l,ZnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&y!^Q'v!xS(s#u<^Q+l%zQ,]&_Q,^&aQ-j'dQ-w'oS.r(x=PS0q+X=ZQ1P+mQ1n,[Q2c,zQ2e,{Q2m-WQ2z-kQ2}-oS5Y0r=eQ5a1QS5d1S=fQ6t2oQ6x2{Q6}3SQ8]5bQ9Y6vQ9Z6yQ9^7OR:l9V$d$]c#Y#e%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vS(o#p'iQ)P#zS+b%q.|S.c(n(pR3^.d'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS#q]<VQ&t!XQ&u!YQ&w![Q&x!]R2Z,vQ'a!hQ+e%wQ-h'cS.e(q+hQ2x-gW3b.h.i0w0yQ6w2yW7U3_3a3e5^U9a7V7X7ZU:q9c9d9fS;b:p:sQ;p;cR;x;qU!wQ'`-eT5y1o5{!Q_OXZ`st!V!Z#d#h%e%m&i&k&r&t&u&w(j,s,x.[2[2_]!pQ!r'`-e1o5{T#q]<V%^{OPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S(}#y#zS.b(m(n!s=l$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU$fd)_,mS(p#p'iU*v%R(w4OU0m+O.n7gQ5^0xQ7V3`Q9d7YR:s9em!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}Q't!uS(f#g2US-s'k'wQ/s*]Q0R*jQ3U-vQ4f/tQ4r0TQ4s0UQ4x0^Q7r4`S7}4t4vS8R4y4{Q9r7sQ9v7yQ9{8OQ:Q8TS:{9w9xS;g:|;PS;s;h;iS;{;t;uS<P;|;}R<S<QQ#wbQ's!uS(e#g2US(g#m+WQ+Y%fQ+j%xQ+p&OU-r'k't'wQ.W(fU/r*]*`/wQ0S*jQ0V*lQ1O+kQ1u,aS3R-s-vQ3Z.`S4e/s/tQ4n0PS4q0R0^Q4u0WQ6W1vQ7P3US7q4`4bQ7u4fU7|4r4x4{Q8P4wQ8v6XS9q7r7sQ9u7yQ9}8RQ:O8SQ:c8wQ:y9rS:z9v9xQ;S:QQ;^:dS;f:{;PS;r;g;hS;z;s;uS<O;{;}Q<R<PQ<T<SQ=o=jQ={=tR=|=uV!wQ'`-e%^aOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S#wz!j!r=i$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=o>R%^bOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Q%fj!^%xy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{S&Oz!jQ+k%yQ,a&dW1v,b,c,d,eU6X1w1x1yS8w6Y6ZQ:d8x!r=j$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ=t>QR=u>R%QeOPXYstuvw!Z!`!g!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Y#bWZ#W#Z(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ,n&o!p=k$Z$n)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=n'XU']!e%i*ZR2s-`%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ,m&oQ0x+gQ3`.gQ7Y3dR9e7[!b$Tc#Y%q(S(Y(t(y)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!P<d)^)q-Z.|2k2n3p3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!f$Vc#Y%q(S(Y(t(y)W)X)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!T<f)^)q-Z.|2k2n3p3v3w3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!^$Zc#Y%q(S(Y(t(y)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<WQ4_/kz>S)^)q-Z.|2k2n3p4P4X6u7b7k7l8k9X9g9m9n;W;`=vQ>X>ZR>Y>['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS$oh$pR4U/U'XgOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$kf$qQ$ifS)j$l)nR)v$qT$jf$qT)l$l)n'XhOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$oh$pQ$rhR)u$p%^jOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_!s>Q$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S#glOPXZst!Z!`!o#S#d#o#{$n%m&k&n&o&r&t&u&w&{'T'b)O)s*i+]+g,p,s,x-i.g/V/n0]0l1r2S2T2V2X2[2_2a3d4T4z6T6e6f6i7[8t9T!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^Q+T%aQ/c*Oo4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!U$yi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>YQ*c$zU*l$|*Z*oQ+U%bQ0W*m#f=q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n=r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hQ=w>TQ=x>UQ=y>VR=z>W!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hnoOXst!Z#d%m&r&t&u&w,s,x2[2_S*f${*YQ-R'OQ-S'QR4i/y%[%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q,U&]Q1h,WQ5s1gR8h5tV*n$|*Z*oU*n$|*Z*oT5z1o5{S0P*i/nQ4w0]T8S4z:]Q+j%xQ0V*lQ1O+kQ1u,aQ6W1vQ8v6XQ:c8wR;^:d!U%Oi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Yx*R$v)e*S*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>OS0`*t0a#f<o#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<p<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!d=S(u)c*[*e.j.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[`=T3}7c7f7j9h:t:w;yS=_.l3iT=`7e9k!U%Qi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y|*T$v)e*U*t+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>OS0b*u0c#f<q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!h=U(u)c*[*e.k.l.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[d=V3}7d7e7j9h9i:t:u:w;yS=a.m3jT=b7f9lrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q&f!UR,p&ornOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R&f!UQ,Y&^R1d,RsnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q1p,_S6R1s1tU8p6P6Q6US:_8r8sS;Y:^:aQ;m;ZR;w;nQ&m!VR,i&iR6_1|R:f8yW&Q|&V&W,OR1Z+vQ&r!WR,s&sR,y&xT2],x2_R,}&yQ,|&yR2f,}Q'y!{R-y'ySsOtQ#dXT%ps#dQ#OTR'{#OQ#RUR'}#RQ){$uR/`){Q#UVR(Q#UQ#XWU(W#X(X.QQ(X#YR.Q(YQ-^'YR2r-^Q.u(yS3m.u3nR3n.vQ-e'`R2v-eY!rQ'`-e1o5{R'j!rQ/Q)eR4S/QU#_W%h*YU(_#_(`.RQ(`#`R.R(ZQ-a']R2t-at`OXst!V!Z#d%m&i&k&r&t&u&w,s,x2[2_S#hZ%eU#r`#h.[R.[(jQ(k#jQ.X(gW.a(k.X3X7RQ3X.YR7R3YQ)n$lR/W)nQ$phR)t$pQ$`cU)a$`-|<jQ-|<WR<j)qQ/q*]W4c/q4d7t9sU4d/r/s/tS7t4e4fR9s7u$e*Q$v(u)c)e*[*e*t*u+Q+R+V.l.m.o.p.q/_/g/i/k/v/|0d0e0v1e3f3g3h3}4R4[4g4h4l4|5O5R5S5W5r7]7^7_7`7e7f7h7i7j7p7w7z8U8X8Z9h9i9j9t9|:R:S:t:u:v:w:x:};R;e;j;v;y=p=}>O>Z>[Q/z*eU4k/z4m7xQ4m/|R7x4lS*o$|*ZR0Y*ox*S$v)e*t*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>O!d.j(u)c*[*e.l.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/h*S.j7ca7c3}7e7f7j9h:t:w;yQ0a*tQ3i.lU4}0a3i9kR9k7e|*U$v)e*t*u+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>O!h.k(u)c*[*e.l.m.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/j*U.k7de7d3}7e7f7j9h9i:t:u:w;yQ0c*uQ3j.mU5P0c3j9lR9l7fQ*z%UR0g*zQ5]0vR8Y5]Q+_%kR0u+_Q5v1jS8j5v:[R:[8kQ,[&_R1m,[Q5{1oR8m5{Q1{,fS6]1{8zR8z6_Q1U+rW5h1U5j8a:VQ5j1XQ8a5iR:V8bQ+w&QR1[+wQ2_,xR6m2_YrOXst#dQ&v!ZQ+a%mQ,r&rQ,t&tQ,u&uQ,w&wQ2Y,sS2],x2_R6l2[Q%opQ&z!_Q&}!aQ'P!bQ'R!cQ'q!uQ+`%lQ+l%zQ,Q&XQ,h&mQ-P&|W-p'k's't'wQ-w'oQ0X*nQ1P+mQ1c,PS2O,i,lQ2g-OQ2h-RQ2i-SQ2}-oW3P-r-s-v-xQ5a1QQ5m1_Q5q1eQ6V1uQ6a2QQ6k2ZU6z3O3R3UQ6}3SQ8]5bQ8e5oQ8g5rQ8l5zQ8u6WQ8{6`S9[6{7PQ9^7OQ:W8cQ:b8vQ:g8|Q:n9]Q;U:XQ;]:cQ;a:oQ;l;VR;o;^Q%zyQ'd!iQ'o!uU+m%{%|%}Q-W'VU-k'e'f'gS-o'k'uQ0Q*jS1Q+n+oQ2o-YS2{-l-mQ3S-tS4p0R0UQ5b1RQ6v2uQ6y2|Q7O3TU7{4r4s4vQ9z7}R;O9{S$wi>PR*{%VU%Ui%V>PR0f*yQ$viS(u#v+iS)c$b$cQ)e$dQ*[$xS*e${*YQ*t%OQ*u%QQ+Q%^Q+R%_Q+V%cQ.l<oQ.m<qQ.o<uQ.p<wQ.q<yQ/_)yQ/g*RQ/i*TQ/k*VQ/v*aS/|*g/mQ0d*wQ0e*xl0v+f,V.f1i1q3c6S7W8q9b:`:r;[;dQ1e,SQ3f=SQ3g=UQ3h=XS3}<l<mQ4R/PS4[/d4^Q4g/xQ4h/yQ4l/{Q4|0`Q5O0bQ5R0iQ5S0jQ5W0oQ5r1fQ7]=]Q7^=_Q7_=aQ7`=cQ7e<pQ7f<rQ7h<vQ7i<xQ7j<zQ7p4_Q7w4jQ7z4oQ8U5QQ8X5[Q8Z5_Q9h=YQ9i=TQ9j=VQ9t7vQ9|8QQ:R8VQ:S8[Q:t=^Q:u=`Q:v=bQ:w=dQ:x9pQ:}9yQ;R:PQ;e=gQ;j;QQ;v;kQ;y=hQ=p>PQ=}>XQ>O>YQ>Z>]R>[>^Q+O%]Q.n<sR7g<tnpOXst!Z#d%m&r&t&u&w,s,x2[2_Q!fPS#fZ#oQ&|!`W'h!o*i0]4zQ(P#SQ)Q#{Q)r$nS,l&k&nQ,q&oQ-O&{S-T'T/nQ-g'bQ.x)OQ/[)sQ0s+]Q0y+gQ2W,pQ2y-iQ3a.gQ4W/VQ5U0lQ6Q1rQ6c2SQ6d2TQ6h2VQ6j2XQ6o2aQ7Z3dQ7m4TQ8s6TQ9P6eQ9Q6fQ9S6iQ9f7[Q:a8tR:k9T#[cOPXZst!Z!`!o#d#o#{%m&k&n&o&r&t&u&w&{'T'b)O*i+]+g,p,s,x-i.g/n0]0l1r2S2T2V2X2[2_2a3d4z6T6e6f6i7[8t9TQ#YWQ#eYQ%quQ%svS%uw!gS(S#W(VQ(Y#ZQ(t#uQ(y#xQ)R$OQ)S$PQ)T$QQ)U$RQ)V$SQ)W$TQ)X$UQ)Y$VQ)Z$WQ)[$XQ)^$ZQ)`$_Q)b$aQ)g$eW)q$n)s/V4TQ+d%tQ+x&RS-Z'X2pQ-x'rS-}(T.PQ.S(]Q.U(dQ.s(xQ.v(zQ.z<UQ.|<XQ.}<YQ/O<]Q/b)}Q0p+XQ2k-UQ2n-XQ3O-qQ3V.VQ3k.tQ3p<^Q3q<_Q3r<`Q3s<aQ3t<bQ3u<cQ3v<dQ3w<eQ3x<fQ3y<gQ3z<hQ3{.{Q3|<kQ4P<nQ4Q<{Q4X<iQ5X0rQ5c1SQ6u=OQ6{3QQ7Q3WQ7a3lQ7b=PQ7k=RQ7l=ZQ8k5wQ9X6sQ9]6|Q9g=[Q9m=eQ9n=fQ:o9_Q;W:ZQ;`:mQ<W#SR=v>SR#[WR'Z!el!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}S'V!e-]U*j$|*Z*oS-Y'W'_S0U*k*qQ0^*rQ2u-cQ4v0[R4{0_R({#xQ!fQT-d'`-e]!qQ!r'`-e1o5{Q#p]R'i<VR)f$dY!uQ'`-e1o5{Q'k!rS'u!v!yS'w!z5}S-t'l'mQ-v'nR3T-uT#kZ%eS#jZ%eS%km,oU(g#h#i#lS.Y(h(iQ.^(jQ0t+^Q3Y.ZU3Z.[.]._S7S3[3]R9`7Td#^W#W#Z%h(T(^*Y+Z.T/mr#gZm#h#i#l%e(h(i(j+^.Z.[.]._3[3]7TS*]$x*bQ/t*^Q2U,oQ2l-VQ4`/pQ6q2dQ7s4aQ9W6rT=m'X+[V#aW%h*YU#`W%h*YS(U#W(^U(Z#Z+Z/mS-['X+[T.O(T.TV'^!e%i*ZQ$lfR)x$qT)m$l)nR4V/UT*_$x*bT*h${*YQ0w+fQ1g,VQ3_.fQ5t1iQ6P1qQ7X3cQ8r6SQ9c7WQ:^8qQ:p9bQ;Z:`Q;c:rQ;n;[R;q;dnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&l!VR,h&itmOXst!U!V!Z#d%m&i&r&t&u&w,s,x2[2_R,o&oT%lm,oR1k,XR,g&gQ&U|S+}&V&WR1^,OR+s&PT&p!W&sT&q!W&sT2^,x2_",
  nodeNames: "⚠ ArithOp ArithOp ?. JSXStartTag LineComment BlockComment Script Hashbang ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > < TypeParamList in out const TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewTarget new NewExpression ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression TypeArgList CompareOp < declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression InstantiationExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast < ArrowFunction TypeParamList SequenceExpression InstantiationExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate asserts is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration defer ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem",
  maxTerm: 380,
  context: mQ,
  nodeProps: [
    ["isolate", -8, 5, 6, 14, 37, 39, 51, 53, 55, ""],
    ["group", -26, 9, 17, 19, 68, 207, 211, 215, 216, 218, 221, 224, 234, 237, 243, 245, 247, 249, 252, 258, 264, 266, 268, 270, 272, 274, 275, "Statement", -34, 13, 14, 32, 35, 36, 42, 51, 54, 55, 57, 62, 70, 72, 76, 80, 82, 84, 85, 110, 111, 120, 121, 136, 139, 141, 142, 143, 144, 145, 147, 148, 167, 169, 171, "Expression", -23, 31, 33, 37, 41, 43, 45, 173, 175, 177, 178, 180, 181, 182, 184, 185, 186, 188, 189, 190, 201, 203, 205, 206, "Type", -3, 88, 103, 109, "ClassItem"],
    ["openedBy", 23, "<", 38, "InterpolationStart", 56, "[", 60, "{", 73, "(", 160, "JSXStartCloseTag"],
    ["closedBy", -2, 24, 168, ">", 40, "InterpolationEnd", 50, "]", 61, "}", 74, ")", 165, "JSXEndTag"]
  ],
  propSources: [SQ],
  skippedNodes: [0, 5, 6, 278],
  repeatNodeCount: 37,
  tokenData: "$Fq07[R!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tuEruvJSvwLkwx! Yxy!'iyz!(sz{!)}{|!,q|}!.O}!O!,q!O!P!/Y!P!Q!9j!Q!R#:O!R![#<_![!]#I_!]!^#Jk!^!_#Ku!_!`$![!`!a$$v!a!b$*T!b!c$,r!c!}Er!}#O$-|#O#P$/W#P#Q$4o#Q#R$5y#R#SEr#S#T$7W#T#o$8b#o#p$<r#p#q$=h#q#r$>x#r#s$@U#s$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$I|Er$I|$I}$Dk$I}$JO$Dk$JO$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr(n%d_$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z07[+rq$i&j(Wp(Z!b'|0/lOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z07[.ST(X#S$i&j'}0/lO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c07[.n_$i&j(Wp(Z!b'}0/lOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)3p/x`$i&j!p),Q(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW1V`#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW2d_#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At3l_(V':f$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k(^4r_$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k&z5vX$i&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q&z6jT$d`$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c`6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y`7bO$d``7eP;=`<%l6y&z7kP;=`<%l5q(^7w]$d`$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!r8uZ(Z!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p!r9oU$d`(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!r:UP;=`<%l8p(^:[P;=`<%l4k%9[:hh$i&j(Wp(Z!bOY%ZYZ&cZq%Zqr<Srs&}st%ZtuCruw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr(r<__WS$i&j(Wp(Z!bOY<SYZ&cZr<Srs=^sw<Swx@nx!^<S!^!_Bm!_#O<S#O#P>`#P#o<S#o#pBm#p;'S<S;'S;=`Cl<%lO<S(Q=g]WS$i&j(Z!bOY=^YZ&cZw=^wx>`x!^=^!^!_?q!_#O=^#O#P>`#P#o=^#o#p?q#p;'S=^;'S;=`@h<%lO=^&n>gXWS$i&jOY>`YZ&cZ!^>`!^!_?S!_#o>`#o#p?S#p;'S>`;'S;=`?k<%lO>`S?XSWSOY?SZ;'S?S;'S;=`?e<%lO?SS?hP;=`<%l?S&n?nP;=`<%l>`!f?xWWS(Z!bOY?qZw?qwx?Sx#O?q#O#P?S#P;'S?q;'S;=`@b<%lO?q!f@eP;=`<%l?q(Q@kP;=`<%l=^'`@w]WS$i&j(WpOY@nYZ&cZr@nrs>`s!^@n!^!_Ap!_#O@n#O#P>`#P#o@n#o#pAp#p;'S@n;'S;=`Bg<%lO@ntAwWWS(WpOYApZrAprs?Ss#OAp#O#P?S#P;'SAp;'S;=`Ba<%lOAptBdP;=`<%lAp'`BjP;=`<%l@n#WBvYWS(Wp(Z!bOYBmZrBmrs?qswBmwxApx#OBm#O#P?S#P;'SBm;'S;=`Cf<%lOBm#WCiP;=`<%lBm(rCoP;=`<%l<S%9[C}i$i&j(o%1l(Wp(Z!bOY%ZYZ&cZr%Zrs&}st%ZtuCruw%Zwx(rx!Q%Z!Q![Cr![!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr%9[EoP;=`<%lCr07[FRk$i&j(Wp(Z!b$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr+dHRk$i&j(Wp(Z!b$]#tOY%ZYZ&cZr%Zrs&}st%ZtuGvuw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Gv![!^%Z!^!_*g!_!c%Z!c!}Gv!}#O%Z#O#P&c#P#R%Z#R#SGv#S#T%Z#T#oGv#o#p*g#p$g%Z$g;'SGv;'S;=`Iv<%lOGv+dIyP;=`<%lGv07[JPP;=`<%lEr(KWJ_`$i&j(Wp(Z!b#p(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWKl_$i&j$Q(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,#xLva(z+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sv%ZvwM{wx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWNW`$i&j#z(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At! c_(Y';W$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b'l!!i_$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b&z!#mX$i&jOw!#hwx6cx!^!#h!^!_!$Y!_#o!#h#o#p!$Y#p;'S!#h;'S;=`!$r<%lO!#h`!$]TOw!$Ywx7]x;'S!$Y;'S;=`!$l<%lO!$Y`!$oP;=`<%l!$Y&z!$uP;=`<%l!#h'l!%R]$d`$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r!Q!&PZ(WpOY!%zYZ!$YZr!%zrs!$Ysw!%zwx!&rx#O!%z#O#P!$Y#P;'S!%z;'S;=`!']<%lO!%z!Q!&yU$d`(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r!Q!'`P;=`<%l!%z'l!'fP;=`<%l!!b/5|!'t_!l/.^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&U!)O_!k!Lf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z-!n!*[b$i&j(Wp(Z!b(U%&f#q(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!+d{!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW!+o`$i&j(Wp(Z!b#n(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;x!,|`$i&j(Wp(Z!br+4YOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,$U!.Z_!]+Jf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!/ec$i&j(Wp(Z!b!Q.2^OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!0p!P!Q%Z!Q![!3Y![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!0ya$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!2O!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!2Z_![!L^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!3eg$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!3Y![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S!3Y#S#X%Z#X#Y!4|#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!5Vg$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!6n|}%Z}!O!6n!O!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!6wc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!8_c$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!9uf$i&j(Wp(Z!b#o(ChOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcxz!;Zz{#-}{!P!;Z!P!Q#/d!Q!^!;Z!^!_#(i!_!`#7S!`!a#8i!a!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z?O!;fb$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z>^!<w`$i&j(Z!b!X7`OY!<nYZ&cZw!<nwx!=yx!P!<n!P!Q!Eq!Q!^!<n!^!_!Gr!_!}!<n!}#O!KS#O#P!Dy#P#o!<n#o#p!Gr#p;'S!<n;'S;=`!L]<%lO!<n<z!>Q^$i&j!X7`OY!=yYZ&cZ!P!=y!P!Q!>|!Q!^!=y!^!_!@c!_!}!=y!}#O!CW#O#P!Dy#P#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!?Td$i&j!X7`O!^&c!_#W&c#W#X!>|#X#Z&c#Z#[!>|#[#]&c#]#^!>|#^#a&c#a#b!>|#b#g&c#g#h!>|#h#i&c#i#j!>|#j#k!>|#k#m&c#m#n!>|#n#o&c#p;'S&c;'S;=`&w<%lO&c7`!@hX!X7`OY!@cZ!P!@c!P!Q!AT!Q!}!@c!}#O!Ar#O#P!Bq#P;'S!@c;'S;=`!CQ<%lO!@c7`!AYW!X7`#W#X!AT#Z#[!AT#]#^!AT#a#b!AT#g#h!AT#i#j!AT#j#k!AT#m#n!AT7`!AuVOY!ArZ#O!Ar#O#P!B[#P#Q!@c#Q;'S!Ar;'S;=`!Bk<%lO!Ar7`!B_SOY!ArZ;'S!Ar;'S;=`!Bk<%lO!Ar7`!BnP;=`<%l!Ar7`!BtSOY!@cZ;'S!@c;'S;=`!CQ<%lO!@c7`!CTP;=`<%l!@c<z!C][$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#O!CW#O#P!DR#P#Q!=y#Q#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DWX$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DvP;=`<%l!CW<z!EOX$i&jOY!=yYZ&cZ!^!=y!^!_!@c!_#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!EnP;=`<%l!=y>^!Ezl$i&j(Z!b!X7`OY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#W&}#W#X!Eq#X#Z&}#Z#[!Eq#[#]&}#]#^!Eq#^#a&}#a#b!Eq#b#g&}#g#h!Eq#h#i&}#i#j!Eq#j#k!Eq#k#m&}#m#n!Eq#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}8r!GyZ(Z!b!X7`OY!GrZw!Grwx!@cx!P!Gr!P!Q!Hl!Q!}!Gr!}#O!JU#O#P!Bq#P;'S!Gr;'S;=`!J|<%lO!Gr8r!Hse(Z!b!X7`OY'}Zw'}x#O'}#P#W'}#W#X!Hl#X#Z'}#Z#[!Hl#[#]'}#]#^!Hl#^#a'}#a#b!Hl#b#g'}#g#h!Hl#h#i'}#i#j!Hl#j#k!Hl#k#m'}#m#n!Hl#n;'S'};'S;=`(f<%lO'}8r!JZX(Z!bOY!JUZw!JUwx!Arx#O!JU#O#P!B[#P#Q!Gr#Q;'S!JU;'S;=`!Jv<%lO!JU8r!JyP;=`<%l!JU8r!KPP;=`<%l!Gr>^!KZ^$i&j(Z!bOY!KSYZ&cZw!KSwx!CWx!^!KS!^!_!JU!_#O!KS#O#P!DR#P#Q!<n#Q#o!KS#o#p!JU#p;'S!KS;'S;=`!LV<%lO!KS>^!LYP;=`<%l!KS>^!L`P;=`<%l!<n=l!Ll`$i&j(Wp!X7`OY!LcYZ&cZr!Lcrs!=ys!P!Lc!P!Q!Mn!Q!^!Lc!^!_# o!_!}!Lc!}#O#%P#O#P!Dy#P#o!Lc#o#p# o#p;'S!Lc;'S;=`#&Y<%lO!Lc=l!Mwl$i&j(Wp!X7`OY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#W(r#W#X!Mn#X#Z(r#Z#[!Mn#[#](r#]#^!Mn#^#a(r#a#b!Mn#b#g(r#g#h!Mn#h#i(r#i#j!Mn#j#k!Mn#k#m(r#m#n!Mn#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r8Q# vZ(Wp!X7`OY# oZr# ors!@cs!P# o!P!Q#!i!Q!}# o!}#O#$R#O#P!Bq#P;'S# o;'S;=`#$y<%lO# o8Q#!pe(Wp!X7`OY)rZr)rs#O)r#P#W)r#W#X#!i#X#Z)r#Z#[#!i#[#])r#]#^#!i#^#a)r#a#b#!i#b#g)r#g#h#!i#h#i)r#i#j#!i#j#k#!i#k#m)r#m#n#!i#n;'S)r;'S;=`*Z<%lO)r8Q#$WX(WpOY#$RZr#$Rrs!Ars#O#$R#O#P!B[#P#Q# o#Q;'S#$R;'S;=`#$s<%lO#$R8Q#$vP;=`<%l#$R8Q#$|P;=`<%l# o=l#%W^$i&j(WpOY#%PYZ&cZr#%Prs!CWs!^#%P!^!_#$R!_#O#%P#O#P!DR#P#Q!Lc#Q#o#%P#o#p#$R#p;'S#%P;'S;=`#&S<%lO#%P=l#&VP;=`<%l#%P=l#&]P;=`<%l!Lc?O#&kn$i&j(Wp(Z!b!X7`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#W%Z#W#X#&`#X#Z%Z#Z#[#&`#[#]%Z#]#^#&`#^#a%Z#a#b#&`#b#g%Z#g#h#&`#h#i%Z#i#j#&`#j#k#&`#k#m%Z#m#n#&`#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z9d#(r](Wp(Z!b!X7`OY#(iZr#(irs!Grsw#(iwx# ox!P#(i!P!Q#)k!Q!}#(i!}#O#+`#O#P!Bq#P;'S#(i;'S;=`#,`<%lO#(i9d#)th(Wp(Z!b!X7`OY*gZr*grs'}sw*gwx)rx#O*g#P#W*g#W#X#)k#X#Z*g#Z#[#)k#[#]*g#]#^#)k#^#a*g#a#b#)k#b#g*g#g#h#)k#h#i*g#i#j#)k#j#k#)k#k#m*g#m#n#)k#n;'S*g;'S;=`+Z<%lO*g9d#+gZ(Wp(Z!bOY#+`Zr#+`rs!JUsw#+`wx#$Rx#O#+`#O#P!B[#P#Q#(i#Q;'S#+`;'S;=`#,Y<%lO#+`9d#,]P;=`<%l#+`9d#,cP;=`<%l#(i?O#,o`$i&j(Wp(Z!bOY#,fYZ&cZr#,frs!KSsw#,fwx#%Px!^#,f!^!_#+`!_#O#,f#O#P!DR#P#Q!;Z#Q#o#,f#o#p#+`#p;'S#,f;'S;=`#-q<%lO#,f?O#-tP;=`<%l#,f?O#-zP;=`<%l!;Z07[#.[b$i&j(Wp(Z!b(O0/l!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z07[#/o_$i&j(Wp(Z!bT0/lOY#/dYZ&cZr#/drs#0nsw#/dwx#4Ox!^#/d!^!_#5}!_#O#/d#O#P#1p#P#o#/d#o#p#5}#p;'S#/d;'S;=`#6|<%lO#/d06j#0w]$i&j(Z!bT0/lOY#0nYZ&cZw#0nwx#1px!^#0n!^!_#3R!_#O#0n#O#P#1p#P#o#0n#o#p#3R#p;'S#0n;'S;=`#3x<%lO#0n05W#1wX$i&jT0/lOY#1pYZ&cZ!^#1p!^!_#2d!_#o#1p#o#p#2d#p;'S#1p;'S;=`#2{<%lO#1p0/l#2iST0/lOY#2dZ;'S#2d;'S;=`#2u<%lO#2d0/l#2xP;=`<%l#2d05W#3OP;=`<%l#1p01O#3YW(Z!bT0/lOY#3RZw#3Rwx#2dx#O#3R#O#P#2d#P;'S#3R;'S;=`#3r<%lO#3R01O#3uP;=`<%l#3R06j#3{P;=`<%l#0n05x#4X]$i&j(WpT0/lOY#4OYZ&cZr#4Ors#1ps!^#4O!^!_#5Q!_#O#4O#O#P#1p#P#o#4O#o#p#5Q#p;'S#4O;'S;=`#5w<%lO#4O00^#5XW(WpT0/lOY#5QZr#5Qrs#2ds#O#5Q#O#P#2d#P;'S#5Q;'S;=`#5q<%lO#5Q00^#5tP;=`<%l#5Q05x#5zP;=`<%l#4O01p#6WY(Wp(Z!bT0/lOY#5}Zr#5}rs#3Rsw#5}wx#5Qx#O#5}#O#P#2d#P;'S#5};'S;=`#6v<%lO#5}01p#6yP;=`<%l#5}07[#7PP;=`<%l#/d)3h#7ab$i&j$Q(Ch(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;ZAt#8vb$Z#t$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z'Ad#:Zp$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#U%Z#U#V#?i#V#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#d#Bq#d#l%Z#l#m#Es#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#<jk$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#>j_$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#?rd$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#A]f$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Bzc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Dbe$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#E|g$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Gpi$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x#Il_!g$b$i&j$O)Lv(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Jv_al$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f#LS^h#)`#R-<U(Wp(Z!b$n7`OY*gZr*grs'}sw*gwx)rx!P*g!P!Q#MO!Q!^*g!^!_#Mt!_!`$ f!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#MXX$k&j(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El#M}Z#r(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Np!`#O*g#P;'S*g;'S;=`+Z<%lO*g(El#NyX$Q(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El$ oX#s(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g*)x$!ga#`*!Y$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a$#l!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(K[$#w_#k(Cl$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x$%Vag!*r#s(Ch$f#|$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`$&[!`!a$'f!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$&g_#s(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$'qa#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`!a$(v!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$)R`#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(Kd$*`a(r(Ct$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!a%Z!a!b$+e!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$+p`$i&j#{(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`$,}_!|$Ip$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f$.X_!S0,v$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$/]Z$i&jO!^$0O!^!_$0f!_#i$0O#i#j$0k#j#l$0O#l#m$2^#m#o$0O#o#p$0f#p;'S$0O;'S;=`$4i<%lO$0O(n$0VT_#S$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$0kO_#S(n$0p[$i&jO!Q&c!Q![$1f![!^&c!_!c&c!c!i$1f!i#T&c#T#Z$1f#Z#o&c#o#p$3|#p;'S&c;'S;=`&w<%lO&c(n$1kZ$i&jO!Q&c!Q![$2^![!^&c!_!c&c!c!i$2^!i#T&c#T#Z$2^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$2cZ$i&jO!Q&c!Q![$3U![!^&c!_!c&c!c!i$3U!i#T&c#T#Z$3U#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$3ZZ$i&jO!Q&c!Q![$0O![!^&c!_!c&c!c!i$0O!i#T&c#T#Z$0O#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$4PR!Q![$4Y!c!i$4Y#T#Z$4Y#S$4]S!Q![$4Y!c!i$4Y#T#Z$4Y#q#r$0f(n$4lP;=`<%l$0O#1[$4z_!Y#)l$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$6U`#x(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;p$7c_$i&j(Wp(Z!b(a+4QOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$8qk$i&j(Wp(Z!b(T,2j$_#t(e$I[OY%ZYZ&cZr%Zrs&}st%Ztu$8buw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$8b![!^%Z!^!_*g!_!c%Z!c!}$8b!}#O%Z#O#P&c#P#R%Z#R#S$8b#S#T%Z#T#o$8b#o#p*g#p$g%Z$g;'S$8b;'S;=`$<l<%lO$8b+d$:qk$i&j(Wp(Z!b$_#tOY%ZYZ&cZr%Zrs&}st%Ztu$:fuw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$:f![!^%Z!^!_*g!_!c%Z!c!}$:f!}#O%Z#O#P&c#P#R%Z#R#S$:f#S#T%Z#T#o$:f#o#p*g#p$g%Z$g;'S$:f;'S;=`$<f<%lO$:f+d$<iP;=`<%l$:f07[$<oP;=`<%l$8b#Jf$<{X!_#Hb(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g,#x$=sa(y+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$+e#q;'S%Z;'S;=`+a<%lO%Z)>v$?V_!^(CdvBr$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z?O$@a_!q7`$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$Aq|$i&j(Wp(Z!b'|0/l$]#t(T,2j(e$I[OX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr07[$D|k$i&j(Wp(Z!b'}0/l$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr",
  tokenizers: [bQ, yQ, wQ, xQ, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, vQ, new _c("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOx~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!U~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(c~~", 141, 340), new _c("j~RQYZXz{^~^O(Q~~aP!P!Qd~iO(R~~", 25, 323)],
  topRules: { Script: [0, 7], SingleExpression: [1, 276], SingleClassItem: [2, 277] },
  dialects: { jsx: 0, ts: 15175 },
  dynamicPrecedences: { 80: 1, 82: 1, 94: 1, 169: 1, 199: 1 },
  specialized: [{ term: 327, get: (i) => kQ[i] || -1 }, { term: 343, get: (i) => QQ[i] || -1 }, { term: 95, get: (i) => $Q[i] || -1 }],
  tokenPrec: 15201
});
class ym {
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
    let t = Ti(this.state).resolveInner(this.pos, -1);
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
    let t = this.state.doc.lineAt(this.pos), n = Math.max(t.from, this.pos - 250), s = t.text.slice(n - t.from, this.pos - t.from), r = s.search(wm(e, !1));
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
function Pd(i) {
  let e = Object.keys(i).join(""), t = /\w/.test(e);
  return t && (e = e.replace(/\w/g, "")), `[${t ? "\\w" : ""}${e.replace(/[^\w\s]/g, "\\$&")}]`;
}
function PQ(i) {
  let e = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  for (let { label: s } of i) {
    e[s[0]] = !0;
    for (let r = 1; r < s.length; r++)
      t[s[r]] = !0;
  }
  let n = Pd(e) + Pd(t) + "*$";
  return [new RegExp("^" + n), new RegExp(n)];
}
function $f(i) {
  let e = i.map((s) => typeof s == "string" ? { label: s } : s), [t, n] = e.every((s) => /^\w+$/.test(s.label)) ? [/\w*$/, /\w+$/] : PQ(e);
  return (s) => {
    let r = s.matchBefore(n);
    return r || s.explicit ? { from: r ? r.from : s.pos, options: e, validFor: t } : null;
  };
}
function TQ(i, e) {
  return (t) => {
    for (let n = Ti(t.state).resolveInner(t.pos, -1); n; n = n.parent) {
      if (i.indexOf(n.name) > -1)
        return null;
      if (n.type.isTop)
        break;
    }
    return e(t);
  };
}
class Td {
  constructor(e, t, n, s) {
    this.completion = e, this.source = t, this.match = n, this.score = s;
  }
}
function ys(i) {
  return i.selection.main.from;
}
function wm(i, e) {
  var t;
  let { source: n } = i, s = e && n[0] != "^", r = n[n.length - 1] != "$";
  return !s && !r ? i : new RegExp(`${s ? "^" : ""}(?:${n})${r ? "$" : ""}`, (t = i.flags) !== null && t !== void 0 ? t : i.ignoreCase ? "i" : "");
}
const _f = /* @__PURE__ */ Tn.define();
function CQ(i, e, t, n) {
  let { main: s } = i.selection, r = t - s.from, o = n - s.from;
  return {
    ...i.changeByRange((a) => {
      if (a != s && t != n && i.sliceDoc(a.from + r, a.from + o) != i.sliceDoc(t, n))
        return { range: a };
      let l = i.toText(e);
      return {
        changes: { from: a.from + r, to: n == s.from ? a.to : a.from + o, insert: l },
        range: G.cursor(a.from + r + l.length)
      };
    }),
    scrollIntoView: !0,
    userEvent: "input.complete"
  };
}
const Cd = /* @__PURE__ */ new WeakMap();
function ZQ(i) {
  if (!Array.isArray(i))
    return i;
  let e = Cd.get(i);
  return e || Cd.set(i, e = $f(i)), e;
}
const Ja = /* @__PURE__ */ Ke.define(), wo = /* @__PURE__ */ Ke.define();
class EQ {
  constructor(e) {
    this.pattern = e, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [], this.score = 0, this.matched = [];
    for (let t = 0; t < e.length; ) {
      let n = is(e, t), s = js(n);
      this.chars.push(n);
      let r = e.slice(t, t + s), o = r.toUpperCase();
      this.folded.push(is(o == r ? r.toLowerCase() : o, 0)), t += s;
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
      let Q = is(e, 0), k = js(Q), R = k == e.length ? 0 : -100;
      if (Q != t[0]) if (Q == n[0])
        R += -200;
      else
        return null;
      return this.ret(R, [0, k]);
    }
    let a = e.indexOf(this.pattern);
    if (a == 0)
      return this.ret(e.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
    let l = t.length, h = 0;
    if (a < 0) {
      for (let Q = 0, k = Math.min(e.length, 200); Q < k && h < l; ) {
        let R = is(e, Q);
        (R == t[h] || R == n[h]) && (s[h++] = Q), Q += js(R);
      }
      if (h < l)
        return null;
    }
    let c = 0, f = 0, d = !1, p = 0, O = -1, g = -1, m = /[a-z]/.test(e), v = !0;
    for (let Q = 0, k = Math.min(e.length, 200), R = 0; Q < k && f < l; ) {
      let T = is(e, Q);
      a < 0 && (c < l && T == t[c] && (r[c++] = Q), p < l && (T == t[p] || T == n[p] ? (p == 0 && (O = Q), g = Q + 1, p++) : p = 0));
      let M, C = T < 255 ? T >= 48 && T <= 57 || T >= 97 && T <= 122 ? 2 : T >= 65 && T <= 90 ? 1 : 0 : (M = Py(T)) != M.toLowerCase() ? 1 : M != M.toUpperCase() ? 2 : 0;
      (!Q || C == 1 && m || R == 0 && C != 0) && (t[f] == T || n[f] == T && (d = !0) ? o[f++] = Q : o.length && (v = !1)), R = C, Q += js(T);
    }
    return f == l && o[0] == 0 && v ? this.result(-100 + (d ? -200 : 0), o, e) : p == l && O == 0 ? this.ret(-200 - e.length + (g == e.length ? 0 : -100), [0, g]) : a > -1 ? this.ret(-700 - e.length, [a, a + this.pattern.length]) : p == l ? this.ret(-900 - e.length, [O, g]) : f == l ? this.result(-100 + (d ? -200 : 0) + -700 + (v ? 0 : -1100), o, e) : t.length == 2 ? null : this.result((s[0] ? -700 : 0) + -200 + -1100, s, e);
  }
  result(e, t, n) {
    let s = [], r = 0;
    for (let o of t) {
      let a = o + (this.astral ? js(is(n, o)) : 1);
      r && s[r - 1] == o ? s[r - 1] = a : (s[r++] = o, s[r++] = a);
    }
    return this.ret(e - n.length, s);
  }
}
class AQ {
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
const Ct = /* @__PURE__ */ ve.define({
  combine(i) {
    return nf(i, {
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
      positionInfo: RQ,
      filterStrict: !1,
      compareCompletions: (e, t) => (e.sortText || e.label).localeCompare(t.sortText || t.label),
      interactionDelay: 75,
      updateSyncTime: 100
    }, {
      defaultKeymap: (e, t) => e && t,
      closeOnBlur: (e, t) => e && t,
      icons: (e, t) => e && t,
      tooltipClass: (e, t) => (n) => Zd(e(n), t(n)),
      optionClass: (e, t) => (n) => Zd(e(n), t(n)),
      addToOptions: (e, t) => e.concat(t),
      filterStrict: (e, t) => e || t
    });
  }
});
function Zd(i, e) {
  return i ? e ? i + " " + e : i : e;
}
function RQ(i, e, t, n, s, r) {
  let o = i.textDirection == dt.RTL, a = o, l = !1, h = "top", c, f, d = e.left - s.left, p = s.right - e.right, O = n.right - n.left, g = n.bottom - n.top;
  if (a && d < Math.min(O, p) ? a = !1 : !a && p < Math.min(O, d) && (a = !0), O <= (a ? d : p))
    c = Math.max(s.top, Math.min(t.top, s.bottom - g)) - e.top, f = Math.min(400, a ? d : p);
  else {
    l = !0, f = Math.min(
      400,
      (o ? e.right : s.right - e.left) - 30
      /* Info.Margin */
    );
    let Q = s.bottom - e.bottom;
    Q >= g || Q > e.top ? c = t.bottom - e.top : (h = "bottom", c = e.bottom - t.top);
  }
  let m = (e.bottom - e.top) / r.offsetHeight, v = (e.right - e.left) / r.offsetWidth;
  return {
    style: `${h}: ${c / m}px; max-width: ${f / v}px`,
    class: "cm-completionInfo-" + (l ? o ? "left-narrow" : "right-narrow" : a ? "left" : "right")
  };
}
const Pf = /* @__PURE__ */ Ke.define();
function MQ(i) {
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
      let a = t.displayLabel || t.label, l = 0;
      for (let h = 0; h < r.length; ) {
        let c = r[h++], f = r[h++];
        c > l && o.appendChild(document.createTextNode(a.slice(l, c)));
        let d = o.appendChild(document.createElement("span"));
        d.appendChild(document.createTextNode(a.slice(c, f))), d.className = "cm-completionMatchedText", l = f;
      }
      return l < a.length && o.appendChild(document.createTextNode(a.slice(l))), o;
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
function vh(i, e, t) {
  if (i <= t)
    return { from: 0, to: i };
  if (e < 0 && (e = 0), e <= i >> 1) {
    let s = Math.floor(e / t);
    return { from: s * t, to: (s + 1) * t };
  }
  let n = Math.ceil((i - e) / t);
  return { from: i - n * t, to: i - (n - 1) * t };
}
class XQ {
  constructor(e, t, n) {
    this.view = e, this.stateField = t, this.applyCompletion = n, this.info = null, this.infoDestroy = null, this.placeInfoReq = {
      read: () => this.measureInfo(),
      write: (l) => this.placeInfo(l),
      key: this
    }, this.space = null, this.currentClass = "";
    let s = e.state.field(t), { options: r, selected: o } = s.open, a = e.state.facet(Ct);
    this.optionContent = MQ(a), this.optionClass = a.optionClass, this.tooltipClass = a.tooltipClass, this.range = vh(r.length, o, a.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.updateTooltipClass(e.state), this.dom.addEventListener("mousedown", (l) => {
      let { options: h } = e.state.field(t).open;
      for (let c = l.target, f; c && c != this.dom; c = c.parentNode)
        if (c.nodeName == "LI" && (f = /-(\d+)$/.exec(c.id)) && +f[1] < h.length) {
          this.applyCompletion(e, h[+f[1]]), l.preventDefault();
          return;
        }
      if (l.target == this.list) {
        let c = this.list.classList.contains("cm-completionListIncompleteTop") && l.clientY < this.list.firstChild.getBoundingClientRect().top ? this.range.from - 1 : this.list.classList.contains("cm-completionListIncompleteBottom") && l.clientY > this.list.lastChild.getBoundingClientRect().bottom ? this.range.to : null;
        c != null && (e.dispatch({ effects: Pf.of(c) }), l.preventDefault());
      }
    }), this.dom.addEventListener("focusout", (l) => {
      let h = e.state.field(this.stateField, !1);
      h && h.tooltip && e.state.facet(Ct).closeOnBlur && l.relatedTarget != e.contentDOM && e.dispatch({ effects: wo.of(null) });
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
      let { options: r, selected: o, disabled: a } = n.open;
      (!s.open || s.open.options != r) && (this.range = vh(r.length, o, e.state.facet(Ct).maxRenderedOptions), this.showOptions(r, n.id)), this.updateSel(), a != ((t = s.open) === null || t === void 0 ? void 0 : t.disabled) && this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!a);
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
    (t.selected > -1 && t.selected < this.range.from || t.selected >= this.range.to) && (this.range = vh(t.options.length, t.selected, this.view.state.facet(Ct).maxRenderedOptions), this.showOptions(t.options, e.id));
    let n = this.updateSelectedOption(t.selected);
    if (n) {
      this.destroyInfo();
      let { completion: s } = t.options[t.selected], { info: r } = s;
      if (!r)
        return;
      let o = typeof r == "string" ? document.createTextNode(r) : r(s);
      if (!o)
        return;
      "then" in o ? o.then((a) => {
        a && this.view.state.field(this.stateField, !1) == e && this.addInfoPane(a, s);
      }).catch((a) => ui(this.view.state, a, "completion info")) : (this.addInfoPane(o, s), n.setAttribute("aria-describedby", this.info.id));
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
    return t && LQ(this.list, t), t;
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
    return s.top > Math.min(r.bottom, t.bottom) - 10 || s.bottom < Math.max(r.top, t.top) + 10 ? null : this.view.state.facet(Ct).positionInfo(this.view, t, s, n, r, this.dom);
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
      let { completion: a, match: l } = e[o], { section: h } = a;
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
      let f = this.optionClass(a);
      f && (c.className = f);
      for (let d of this.optionContent) {
        let p = d(a, this.view.state, this.view, l);
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
function jQ(i, e) {
  return (t) => new XQ(t, i, e);
}
function LQ(i, e) {
  let t = i.getBoundingClientRect(), n = e.getBoundingClientRect(), s = t.height / i.offsetHeight;
  n.top < t.top ? i.scrollTop -= (t.top - n.top) / s : n.bottom > t.bottom && (i.scrollTop += (n.bottom - t.bottom) / s);
}
function Ed(i) {
  return (i.boost || 0) * 100 + (i.apply ? 10 : 0) + (i.info ? 5 : 0) + (i.type ? 1 : 0);
}
function IQ(i, e) {
  let t = [], n = null, s = null, r = (c) => {
    t.push(c);
    let { section: f } = c.completion;
    if (f) {
      n || (n = []);
      let d = typeof f == "string" ? f : f.name;
      n.some((p) => p.name == d) || n.push(typeof f == "string" ? { name: d } : f);
    }
  }, o = e.facet(Ct);
  for (let c of i)
    if (c.hasResult()) {
      let f = c.result.getMatch;
      if (c.result.filter === !1)
        for (let d of c.result.options)
          r(new Td(d, c.source, f ? f(d) : [], 1e9 - t.length));
      else {
        let d = e.sliceDoc(c.from, c.to), p, O = o.filterStrict ? new AQ(d) : new EQ(d);
        for (let g of c.result.options)
          if (p = O.match(g.label)) {
            let m = g.displayLabel ? f ? f(g, p.matched) : [] : p.matched, v = p.score + (g.boost || 0);
            if (r(new Td(g, c.source, m, v)), typeof g.section == "object" && g.section.rank === "dynamic") {
              let { name: Q } = g.section;
              s || (s = /* @__PURE__ */ Object.create(null)), s[Q] = Math.max(v, s[Q] || -1e9);
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
  let a = [], l = null, h = o.compareCompletions;
  for (let c of t.sort((f, d) => d.score - f.score || h(f.completion, d.completion))) {
    let f = c.completion;
    !l || l.label != f.label || l.detail != f.detail || l.type != null && f.type != null && l.type != f.type || l.apply != f.apply || l.boost != f.boost ? a.push(c) : Ed(c.completion) > Ed(l) && (a[a.length - 1] = c), l = c.completion;
  }
  return a;
}
class Ys {
  constructor(e, t, n, s, r, o) {
    this.options = e, this.attrs = t, this.tooltip = n, this.timestamp = s, this.selected = r, this.disabled = o;
  }
  setSelected(e, t) {
    return e == this.selected || e >= this.options.length ? this : new Ys(this.options, Ad(t, e), this.tooltip, this.timestamp, e, this.disabled);
  }
  static build(e, t, n, s, r, o) {
    if (s && !o && e.some((h) => h.isPending))
      return s.setDisabled();
    let a = IQ(e, t);
    if (!a.length)
      return s && e.some((h) => h.isPending) ? s.setDisabled() : null;
    let l = t.facet(Ct).selectOnOpen ? 0 : -1;
    if (s && s.selected != l && s.selected != -1) {
      let h = s.options[s.selected].completion;
      for (let c = 0; c < a.length; c++)
        if (a[c].completion == h) {
          l = c;
          break;
        }
    }
    return new Ys(a, Ad(n, l), {
      pos: e.reduce((h, c) => c.hasResult() ? Math.min(h, c.from) : h, 1e8),
      create: WQ,
      above: r.aboveCursor
    }, s ? s.timestamp : Date.now(), l, !1);
  }
  map(e) {
    return new Ys(this.options, this.attrs, { ...this.tooltip, pos: e.mapPos(this.tooltip.pos) }, this.timestamp, this.selected, this.disabled);
  }
  setDisabled() {
    return new Ys(this.options, this.attrs, this.tooltip, this.timestamp, this.selected, !0);
  }
}
class el {
  constructor(e, t, n) {
    this.active = e, this.id = t, this.open = n;
  }
  static start() {
    return new el(YQ, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
  }
  update(e) {
    let { state: t } = e, n = t.facet(Ct), r = (n.override || t.languageDataAt("autocomplete", ys(t)).map(ZQ)).map((l) => (this.active.find((c) => c.source == l) || new xi(
      l,
      this.active.some(
        (c) => c.state != 0
        /* State.Inactive */
      ) ? 1 : 0
      /* State.Inactive */
    )).update(e, n));
    r.length == this.active.length && r.every((l, h) => l == this.active[h]) && (r = this.active);
    let o = this.open, a = e.effects.some((l) => l.is(Tf));
    o && e.docChanged && (o = o.map(e.changes)), e.selection || r.some((l) => l.hasResult() && e.changes.touchesRange(l.from, l.to)) || !DQ(r, this.active) || a ? o = Ys.build(r, t, this.id, o, n, a) : o && o.disabled && !r.some((l) => l.isPending) && (o = null), !o && r.every((l) => !l.isPending) && r.some((l) => l.hasResult()) && (r = r.map((l) => l.hasResult() ? new xi(
      l.source,
      0
      /* State.Inactive */
    ) : l));
    for (let l of e.effects)
      l.is(Pf) && (o = o && o.setSelected(l.value, this.id));
    return r == this.active && o == this.open ? this : new el(r, this.id, o);
  }
  get tooltip() {
    return this.open ? this.open.tooltip : null;
  }
  get attrs() {
    return this.open ? this.open.attrs : this.active.length ? zQ : NQ;
  }
}
function DQ(i, e) {
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
const zQ = {
  "aria-autocomplete": "list"
}, NQ = {};
function Ad(i, e) {
  let t = {
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    "aria-controls": i
  };
  return e > -1 && (t["aria-activedescendant"] = i + "-" + e), t;
}
const YQ = [];
function xm(i, e) {
  if (i.isUserEvent("input.complete")) {
    let n = i.annotation(_f);
    if (n && e.activateOnCompletion(n))
      return 12;
  }
  let t = i.isUserEvent("input.type");
  return t && e.activateOnTyping ? 5 : t ? 1 : i.isUserEvent("delete.backward") ? 2 : i.selection ? 8 : i.docChanged ? 16 : 0;
}
class xi {
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
    let n = xm(e, t), s = this;
    (n & 8 || n & 16 && this.touches(e)) && (s = new xi(
      s.source,
      0
      /* State.Inactive */
    )), n & 4 && s.state == 0 && (s = new xi(
      this.source,
      1
      /* State.Pending */
    )), s = s.updateFor(e, n);
    for (let r of e.effects)
      if (r.is(Ja))
        s = new xi(s.source, 1, r.value);
      else if (r.is(wo))
        s = new xi(
          s.source,
          0
          /* State.Inactive */
        );
      else if (r.is(Tf))
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
    return e.changes.touchesRange(ys(e.state));
  }
}
class Js extends xi {
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
    let r = e.changes.mapPos(this.from), o = e.changes.mapPos(this.to, 1), a = ys(e.state);
    if (a > o || !s || t & 2 && (ys(e.startState) == this.from || a < this.limit))
      return new xi(
        this.source,
        t & 4 ? 1 : 0
        /* State.Inactive */
      );
    let l = e.changes.mapPos(this.limit);
    return qQ(s.validFor, e.state, r, o) ? new Js(this.source, this.explicit, l, s, r, o) : s.update && (s = s.update(s, r, o, new ym(e.state, a, !1))) ? new Js(this.source, this.explicit, l, s, s.from, (n = s.to) !== null && n !== void 0 ? n : ys(e.state)) : new xi(this.source, 1, this.explicit);
  }
  map(e) {
    if (e.empty)
      return this;
    let t = this.result.map ? this.result.map(this.result, e) : this.result;
    return t ? new Js(this.source, this.explicit, e.mapPos(this.limit), t, e.mapPos(this.from), e.mapPos(this.to, 1)) : new xi(
      this.source,
      0
      /* State.Inactive */
    );
  }
  touches(e) {
    return e.changes.touchesRange(this.from, this.to);
  }
}
function qQ(i, e, t, n) {
  if (!i)
    return !1;
  let s = e.sliceDoc(t, n);
  return typeof i == "function" ? i(s, t, n, e) : wm(i, !0).test(s);
}
const Tf = /* @__PURE__ */ Ke.define({
  map(i, e) {
    return i.map((t) => t.map(e));
  }
}), Ht = /* @__PURE__ */ un.define({
  create() {
    return el.start();
  },
  update(i, e) {
    return i.update(e);
  },
  provide: (i) => [
    kg.from(i, (e) => e.tooltip),
    me.contentAttributes.from(i, (e) => e.attrs)
  ]
});
function Cf(i, e) {
  const t = e.completion.apply || e.completion.label;
  let n = i.state.field(Ht).active.find((s) => s.source == e.source);
  return n instanceof Js ? (typeof t == "string" ? i.dispatch({
    ...CQ(i.state, t, n.from, n.to),
    annotations: _f.of(e.completion)
  }) : t(i, e.completion, n.from, n.to), !0) : !1;
}
const WQ = /* @__PURE__ */ jQ(Ht, Cf);
function ha(i, e = "option") {
  return (t) => {
    let n = t.state.field(Ht, !1);
    if (!n || !n.open || n.open.disabled || Date.now() - n.open.timestamp < t.state.facet(Ct).interactionDelay)
      return !1;
    let s = 1, r;
    e == "page" && (r = Qg(t, n.open.tooltip)) && (s = Math.max(2, Math.floor(r.dom.offsetHeight / r.dom.querySelector("li").offsetHeight) - 1));
    let { length: o } = n.open.options, a = n.open.selected > -1 ? n.open.selected + s * (i ? 1 : -1) : i ? 0 : o - 1;
    return a < 0 ? a = e == "page" ? 0 : o - 1 : a >= o && (a = e == "page" ? o - 1 : 0), t.dispatch({ effects: Pf.of(a) }), !0;
  };
}
const VQ = (i) => {
  let e = i.state.field(Ht, !1);
  return i.state.readOnly || !e || !e.open || e.open.selected < 0 || e.open.disabled || Date.now() - e.open.timestamp < i.state.facet(Ct).interactionDelay ? !1 : Cf(i, e.open.options[e.open.selected]);
}, bh = (i) => i.state.field(Ht, !1) ? (i.dispatch({ effects: Ja.of(!0) }), !0) : !1, BQ = (i) => {
  let e = i.state.field(Ht, !1);
  return !e || !e.active.some(
    (t) => t.state != 0
    /* State.Inactive */
  ) ? !1 : (i.dispatch({ effects: wo.of(null) }), !0);
};
class GQ {
  constructor(e, t) {
    this.active = e, this.context = t, this.time = Date.now(), this.updates = [], this.done = void 0;
  }
}
const UQ = 50, FQ = 1e3, HQ = /* @__PURE__ */ cn.fromClass(class {
  constructor(i) {
    this.view = i, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.pendingStart = !1, this.composing = 0;
    for (let e of i.state.field(Ht).active)
      e.isPending && this.startQuery(e);
  }
  update(i) {
    let e = i.state.field(Ht), t = i.state.facet(Ct);
    if (!i.selectionSet && !i.docChanged && i.startState.field(Ht) == e)
      return;
    let n = i.transactions.some((r) => {
      let o = xm(r, t);
      return o & 8 || (r.selection || r.docChanged) && !(o & 3);
    });
    for (let r = 0; r < this.running.length; r++) {
      let o = this.running[r];
      if (n || o.context.abortOnDocChange && i.docChanged || o.updates.length + i.transactions.length > UQ && Date.now() - o.time > FQ) {
        for (let a of o.context.abortListeners)
          try {
            a();
          } catch (l) {
            ui(this.view.state, l);
          }
        o.context.abortListeners = null, this.running.splice(r--, 1);
      } else
        o.updates.push(...i.transactions);
    }
    this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), i.transactions.some((r) => r.effects.some((o) => o.is(Ja))) && (this.pendingStart = !0);
    let s = this.pendingStart ? 50 : t.activateOnTypingDelay;
    if (this.debounceUpdate = e.active.some((r) => r.isPending && !this.running.some((o) => o.active.source == r.source)) ? setTimeout(() => this.startUpdate(), s) : -1, this.composing != 0)
      for (let r of i.transactions)
        r.isUserEvent("input.type") ? this.composing = 2 : this.composing == 2 && r.selection && (this.composing = 3);
  }
  startUpdate() {
    this.debounceUpdate = -1, this.pendingStart = !1;
    let { state: i } = this.view, e = i.field(Ht);
    for (let t of e.active)
      t.isPending && !this.running.some((n) => n.active.source == t.source) && this.startQuery(t);
    this.running.length && e.open && e.open.disabled && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(Ct).updateSyncTime));
  }
  startQuery(i) {
    let { state: e } = this.view, t = ys(e), n = new ym(e, t, i.explicit, this.view), s = new GQ(i, n);
    this.running.push(s), Promise.resolve(i.source(n)).then((r) => {
      s.context.aborted || (s.done = r || null, this.scheduleAccept());
    }, (r) => {
      this.view.dispatch({ effects: wo.of(null) }), ui(this.view.state, r);
    });
  }
  scheduleAccept() {
    this.running.every((i) => i.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(Ct).updateSyncTime));
  }
  // For each finished query in this.running, try to create a result
  // or, if appropriate, restart the query.
  accept() {
    var i;
    this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
    let e = [], t = this.view.state.facet(Ct), n = this.view.state.field(Ht);
    for (let s = 0; s < this.running.length; s++) {
      let r = this.running[s];
      if (r.done === void 0)
        continue;
      if (this.running.splice(s--, 1), r.done) {
        let a = ys(r.updates.length ? r.updates[0].startState : this.view.state), l = Math.min(a, r.done.from + (r.active.explicit ? 0 : 1)), h = new Js(r.active.source, r.active.explicit, l, r.done, r.done.from, (i = r.done.to) !== null && i !== void 0 ? i : a);
        for (let c of r.updates)
          h = h.update(c, t);
        if (h.hasResult()) {
          e.push(h);
          continue;
        }
      }
      let o = n.active.find((a) => a.source == r.active.source);
      if (o && o.isPending)
        if (r.done == null) {
          let a = new xi(
            r.active.source,
            0
            /* State.Inactive */
          );
          for (let l of r.updates)
            a = a.update(l, t);
          a.isPending || e.push(a);
        } else
          this.startQuery(o);
    }
    (e.length || n.open && n.open.disabled) && this.view.dispatch({ effects: Tf.of(e) });
  }
}, {
  eventHandlers: {
    blur(i) {
      let e = this.view.state.field(Ht, !1);
      if (e && e.tooltip && this.view.state.facet(Ct).closeOnBlur) {
        let t = e.open && Qg(this.view, e.open.tooltip);
        (!t || !t.dom.contains(i.relatedTarget)) && setTimeout(() => this.view.dispatch({ effects: wo.of(null) }), 10);
      }
    },
    compositionstart() {
      this.composing = 1;
    },
    compositionend() {
      this.composing == 3 && setTimeout(() => this.view.dispatch({ effects: Ja.of(!1) }), 20), this.composing = 0;
    }
  }
}), KQ = typeof navigator == "object" && /* @__PURE__ */ /Win/.test(navigator.platform), JQ = /* @__PURE__ */ Ao.highest(/* @__PURE__ */ me.domEventHandlers({
  keydown(i, e) {
    let t = e.state.field(Ht, !1);
    if (!t || !t.open || t.open.disabled || t.open.selected < 0 || i.key.length > 1 || i.ctrlKey && !(KQ && i.altKey) || i.metaKey)
      return !1;
    let n = t.open.options[t.open.selected], s = t.active.find((o) => o.source == n.source), r = n.completion.commitCharacters || s.result.commitCharacters;
    return r && r.indexOf(i.key) > -1 && Cf(e, n), !1;
  }
})), Sm = /* @__PURE__ */ me.baseTheme({
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
class e$ {
  constructor(e, t, n, s) {
    this.field = e, this.line = t, this.from = n, this.to = s;
  }
}
class Zf {
  constructor(e, t, n) {
    this.field = e, this.from = t, this.to = n;
  }
  map(e) {
    let t = e.mapPos(this.from, -1, Yt.TrackDel), n = e.mapPos(this.to, 1, Yt.TrackDel);
    return t == null || n == null ? null : new Zf(this.field, t, n);
  }
}
class Ef {
  constructor(e, t) {
    this.lines = e, this.fieldPositions = t;
  }
  instantiate(e, t) {
    let n = [], s = [t], r = e.doc.lineAt(t), o = /^\s*/.exec(r.text)[0];
    for (let l of this.lines) {
      if (n.length) {
        let h = o, c = /^\t*/.exec(l)[0].length;
        for (let f = 0; f < c; f++)
          h += e.facet(Ql);
        s.push(t + h.length - c), l = h + l.slice(c);
      }
      n.push(l), t += l.length + 1;
    }
    let a = this.fieldPositions.map((l) => new Zf(l.field, s[l.line] + l.from, s[l.line] + l.to));
    return { text: n, ranges: a };
  }
  static parse(e) {
    let t = [], n = [], s = [], r;
    for (let o of e.split(/\r\n?|\n/)) {
      for (; r = /[#$]\{(?:(\d+)(?::([^{}]*))?|((?:\\[{}]|[^{}])*))\}/.exec(o); ) {
        let a = r[1] ? +r[1] : null, l = r[2] || r[3] || "", h = -1;
        a === 0 && (a = 1e9);
        let c = l.replace(/\\[{}]/g, (f) => f[1]);
        for (let f = 0; f < t.length; f++)
          (a != null ? t[f].seq == a : c && t[f].name == c) && (h = f);
        if (h < 0) {
          let f = 0;
          for (; f < t.length && (a == null || t[f].seq != null && t[f].seq < a); )
            f++;
          t.splice(f, 0, { seq: a, name: c }), h = f;
          for (let d of s)
            d.field >= h && d.field++;
        }
        for (let f of s)
          if (f.line == n.length && f.from > r.index) {
            let d = r[2] ? 3 + (r[1] || "").length : 2;
            f.from -= d, f.to -= d;
          }
        s.push(new e$(h, n.length, r.index, r.index + c.length)), o = o.slice(0, r.index) + l + o.slice(r.index + r[0].length);
      }
      o = o.replace(/\\([{}])/g, (a, l, h) => {
        for (let c of s)
          c.line == n.length && c.from > h && (c.from--, c.to--);
        return l;
      }), n.push(o);
    }
    return new Ef(n, s);
  }
}
let t$ = /* @__PURE__ */ tt.widget({ widget: /* @__PURE__ */ new class extends Pr {
  toDOM() {
    let i = document.createElement("span");
    return i.className = "cm-snippetFieldPosition", i;
  }
  ignoreEvent() {
    return !1;
  }
}() }), i$ = /* @__PURE__ */ tt.mark({ class: "cm-snippetField" });
class Cr {
  constructor(e, t) {
    this.ranges = e, this.active = t, this.deco = tt.set(e.map((n) => (n.from == n.to ? t$ : i$).range(n.from, n.to)), !0);
  }
  map(e) {
    let t = [];
    for (let n of this.ranges) {
      let s = n.map(e);
      if (!s)
        return null;
      t.push(s);
    }
    return new Cr(t, this.active);
  }
  selectionInsideField(e) {
    return e.ranges.every((t) => this.ranges.some((n) => n.field == this.active && n.from <= t.from && n.to >= t.to));
  }
}
const Io = /* @__PURE__ */ Ke.define({
  map(i, e) {
    return i && i.map(e);
  }
}), n$ = /* @__PURE__ */ Ke.define(), xo = /* @__PURE__ */ un.define({
  create() {
    return null;
  },
  update(i, e) {
    for (let t of e.effects) {
      if (t.is(Io))
        return t.value;
      if (t.is(n$) && i)
        return new Cr(i.ranges, t.value);
    }
    return i && e.docChanged && (i = i.map(e.changes)), i && e.selection && !i.selectionInsideField(e.selection) && (i = null), i;
  },
  provide: (i) => me.decorations.from(i, (e) => e ? e.deco : tt.none)
});
function Af(i, e) {
  return G.create(i.filter((t) => t.field == e).map((t) => G.range(t.from, t.to)));
}
function s$(i) {
  let e = Ef.parse(i);
  return (t, n, s, r) => {
    let { text: o, ranges: a } = e.instantiate(t.state, s), { main: l } = t.state.selection, h = {
      changes: { from: s, to: r == l.from ? l.to : r, insert: Ne.of(o) },
      scrollIntoView: !0,
      annotations: n ? [_f.of(n), wt.userEvent.of("input.complete")] : void 0
    };
    if (a.length && (h.selection = Af(a, 0)), a.some((c) => c.field > 0)) {
      let c = new Cr(a, 0), f = h.effects = [Io.of(c)];
      t.state.field(xo, !1) === void 0 && f.push(Ke.appendConfig.of([xo, h$, c$, Sm]));
    }
    t.dispatch(t.state.update(h));
  };
}
function km(i) {
  return ({ state: e, dispatch: t }) => {
    let n = e.field(xo, !1);
    if (!n || i < 0 && n.active == 0)
      return !1;
    let s = n.active + i, r = i > 0 && !n.ranges.some((o) => o.field == s + i);
    return t(e.update({
      selection: Af(n.ranges, s),
      effects: Io.of(r ? null : new Cr(n.ranges, s)),
      scrollIntoView: !0
    })), !0;
  };
}
const r$ = ({ state: i, dispatch: e }) => i.field(xo, !1) ? (e(i.update({ effects: Io.of(null) })), !0) : !1, o$ = /* @__PURE__ */ km(1), a$ = /* @__PURE__ */ km(-1), l$ = [
  { key: "Tab", run: o$, shift: a$ },
  { key: "Escape", run: r$ }
], Rd = /* @__PURE__ */ ve.define({
  combine(i) {
    return i.length ? i[0] : l$;
  }
}), h$ = /* @__PURE__ */ Ao.highest(/* @__PURE__ */ kl.compute([Rd], (i) => i.facet(Rd)));
function Gt(i, e) {
  return { ...e, apply: s$(i) };
}
const c$ = /* @__PURE__ */ me.domEventHandlers({
  mousedown(i, e) {
    let t = e.state.field(xo, !1), n;
    if (!t || (n = e.posAtCoords({ x: i.clientX, y: i.clientY })) == null)
      return !1;
    let s = t.ranges.find((r) => r.from <= n && r.to >= n);
    return !s || s.field == t.active ? !1 : (e.dispatch({
      selection: Af(t.ranges, s.field),
      effects: Io.of(t.ranges.some((r) => r.field > s.field) ? new Cr(t.ranges, s.field) : null),
      scrollIntoView: !0
    }), !0);
  }
}), Qm = /* @__PURE__ */ new class extends Gn {
}();
Qm.startSide = 1;
Qm.endSide = -1;
function f$(i = {}) {
  return [
    JQ,
    Ht,
    Ct.of(i),
    HQ,
    d$,
    Sm
  ];
}
const u$ = [
  { key: "Ctrl-Space", run: bh },
  { mac: "Alt-`", run: bh },
  { mac: "Alt-i", run: bh },
  { key: "Escape", run: BQ },
  { key: "ArrowDown", run: /* @__PURE__ */ ha(!0) },
  { key: "ArrowUp", run: /* @__PURE__ */ ha(!1) },
  { key: "PageDown", run: /* @__PURE__ */ ha(!0, "page") },
  { key: "PageUp", run: /* @__PURE__ */ ha(!1, "page") },
  { key: "Enter", run: VQ }
], d$ = /* @__PURE__ */ Ao.highest(/* @__PURE__ */ kl.computeN([Ct], (i) => i.facet(Ct).defaultKeymap ? [u$] : [])), $m = [
  /* @__PURE__ */ Gt("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ Gt("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ Gt("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  /* @__PURE__ */ Gt("do {\n	${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ Gt("while (${}) {\n	${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ Gt(`try {
	\${}
} catch (\${error}) {
	\${}
}`, {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  /* @__PURE__ */ Gt("if (${}) {\n	${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ Gt(`if (\${}) {
	\${}
} else {
	\${}
}`, {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ Gt(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ Gt('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  /* @__PURE__ */ Gt('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
], p$ = /* @__PURE__ */ $m.concat([
  /* @__PURE__ */ Gt("interface ${name} {\n	${}\n}", {
    label: "interface",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ Gt("type ${name} = ${type}", {
    label: "type",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ Gt("enum ${name} {\n	${}\n}", {
    label: "enum",
    detail: "definition",
    type: "keyword"
  })
]), Md = /* @__PURE__ */ new Bx(), _m = /* @__PURE__ */ new Set([
  "Script",
  "Block",
  "FunctionExpression",
  "FunctionDeclaration",
  "ArrowFunction",
  "MethodDeclaration",
  "ForStatement"
]);
function Dr(i) {
  return (e, t) => {
    let n = e.node.getChild("VariableDefinition");
    return n && t(n, i), !0;
  };
}
const O$ = ["FunctionDeclaration"], g$ = {
  FunctionDeclaration: /* @__PURE__ */ Dr("function"),
  ClassDeclaration: /* @__PURE__ */ Dr("class"),
  ClassExpression: () => !0,
  EnumDeclaration: /* @__PURE__ */ Dr("constant"),
  TypeAliasDeclaration: /* @__PURE__ */ Dr("type"),
  NamespaceDeclaration: /* @__PURE__ */ Dr("namespace"),
  VariableDefinition(i, e) {
    i.matchContext(O$) || e(i, "variable");
  },
  TypeDefinition(i, e) {
    e(i, "type");
  },
  __proto__: null
};
function Pm(i, e) {
  let t = Md.get(e);
  if (t)
    return t;
  let n = [], s = !0;
  function r(o, a) {
    let l = i.sliceString(o.from, o.to);
    n.push({ label: l, type: a });
  }
  return e.cursor(ht.IncludeAnonymous).iterate((o) => {
    if (s)
      s = !1;
    else if (o.name) {
      let a = g$[o.name];
      if (a && a(o, r) || _m.has(o.name))
        return !1;
    } else if (o.to - o.from > 8192) {
      for (let a of Pm(i, o.node))
        n.push(a);
      return !1;
    }
  }), Md.set(e, n), n;
}
const Xd = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, Tm = [
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
function m$(i) {
  let e = Ti(i.state).resolveInner(i.pos, -1);
  if (Tm.indexOf(e.name) > -1)
    return null;
  let t = e.name == "VariableName" || e.to - e.from < 20 && Xd.test(i.state.sliceDoc(e.from, e.to));
  if (!t && !i.explicit)
    return null;
  let n = [];
  for (let s = e; s; s = s.parent)
    _m.has(s.name) && (n = n.concat(Pm(i.state.doc, s)));
  return {
    options: n,
    from: t ? e.from : i.pos,
    validFor: Xd
  };
}
const ws = /* @__PURE__ */ Wa.define({
  name: "javascript",
  parser: /* @__PURE__ */ _Q.configure({
    props: [
      /* @__PURE__ */ Mg.add({
        IfStatement: /* @__PURE__ */ uh({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ uh({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: uS,
        SwitchBody: (i) => {
          let e = i.textAfter, t = /^\s*\}/.test(e), n = /^\s*(case|default)\b/.test(e);
          return i.baseIndent + (t ? 0 : n ? 1 : 2) * i.unit;
        },
        Block: /* @__PURE__ */ fS({ closing: "}" }),
        ArrowFunction: (i) => i.baseIndent + i.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": /* @__PURE__ */ uh({ except: /^\s*{/ }),
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
      /* @__PURE__ */ dS.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": pS,
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
}), Cm = {
  test: (i) => /^JSX/.test(i.name),
  facet: /* @__PURE__ */ Eg({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
}, v$ = /* @__PURE__ */ ws.configure({ dialect: "ts" }, "typescript"), b$ = /* @__PURE__ */ ws.configure({
  dialect: "jsx",
  props: [/* @__PURE__ */ wf.add((i) => i.isTop ? [Cm] : void 0)]
}), y$ = /* @__PURE__ */ ws.configure({
  dialect: "jsx ts",
  props: [/* @__PURE__ */ wf.add((i) => i.isTop ? [Cm] : void 0)]
}, "typescript");
let Zm = (i) => ({ label: i, type: "keyword" });
const Em = /* @__PURE__ */ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(Zm), w$ = /* @__PURE__ */ Em.concat(/* @__PURE__ */ ["declare", "implements", "private", "protected", "public"].map(Zm));
function x$(i = {}) {
  let e = i.jsx ? i.typescript ? y$ : b$ : i.typescript ? v$ : ws, t = i.typescript ? p$.concat(w$) : $m.concat(Em);
  return new nS(e, [
    ws.data.of({
      autocomplete: TQ(Tm, $f(t))
    }),
    ws.data.of({
      autocomplete: m$
    }),
    i.jsx ? Q$ : []
  ]);
}
function S$(i) {
  for (; ; ) {
    if (i.name == "JSXOpenTag" || i.name == "JSXSelfClosingTag" || i.name == "JSXFragmentTag")
      return i;
    if (i.name == "JSXEscape" || !i.parent)
      return null;
    i = i.parent;
  }
}
function jd(i, e, t = i.length) {
  for (let n = e == null ? void 0 : e.firstChild; n; n = n.nextSibling)
    if (n.name == "JSXIdentifier" || n.name == "JSXBuiltin" || n.name == "JSXNamespacedName" || n.name == "JSXMemberExpression")
      return i.sliceString(n.from, Math.min(n.to, t));
  return "";
}
const k$ = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), Q$ = /* @__PURE__ */ me.inputHandler.of((i, e, t, n, s) => {
  if ((k$ ? i.composing : i.compositionStarted) || i.state.readOnly || e != t || n != ">" && n != "/" || !ws.isActiveAt(i.state, e, -1))
    return !1;
  let r = s(), { state: o } = r, a = o.changeByRange((l) => {
    var h;
    let { head: c } = l, f = Ti(o).resolveInner(c - 1, -1), d;
    if (f.name == "JSXStartTag" && (f = f.parent), !(o.doc.sliceString(c - 1, c) != n || f.name == "JSXAttributeValue" && f.to > c)) {
      if (n == ">" && f.name == "JSXFragmentTag")
        return { range: l, changes: { from: c, insert: "</>" } };
      if (n == "/" && f.name == "JSXStartCloseTag") {
        let p = f.parent, O = p.parent;
        if (O && p.from == c - 2 && ((d = jd(o.doc, O.firstChild, c)) || ((h = O.firstChild) === null || h === void 0 ? void 0 : h.name) == "JSXFragmentTag")) {
          let g = `${d}>`;
          return { range: G.cursor(c + g.length, -1), changes: { from: c, insert: g } };
        }
      } else if (n == ">") {
        let p = S$(f);
        if (p && p.name == "JSXOpenTag" && !/^\/?>|^<\//.test(o.doc.sliceString(c, c + 2)) && (d = jd(o.doc, p, c)))
          return { range: l, changes: { from: c, insert: `</${d}>` } };
      }
    }
    return { range: l };
  });
  return a.changes.empty ? !1 : (i.dispatch([
    r,
    o.update(a, { userEvent: "input.complete", scrollIntoView: !0 })
  ]), !0);
});
var $$ = /* @__PURE__ */ j('<div class="expr-editor svelte-c939oi"><div class="expr-cm svelte-c939oi"></div> <div class="expr-actions svelte-c939oi"><span class="expr-hint svelte-c939oi">JSONata</span> <button class="eval-btn svelte-c939oi" title="Evaluate against last run context">▶ Evaluate</button></div></div>');
function _$(i, e) {
  xt(e, !1);
  let t = Xe(e, "value", 12, ""), n = Xe(e, "placeholder", 8, "JSONata expression..."), s = Xe(e, "fieldName", 8, ""), r = Xe(e, "contextKeys", 24, () => []);
  const o = fl(), a = [
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
  let l = /* @__PURE__ */ W(), h = /* @__PURE__ */ W();
  function c() {
    const v = [
      ...a.map((Q) => ({ label: Q, type: "function" })),
      ...r().map((Q) => ({ label: Q, type: "variable" }))
    ];
    return $f(v);
  }
  function f() {
    return [
      jS(),
      kl.of([...zk, ...VS]),
      wS(),
      x$(),
      f$({ override: [c()] }),
      Xx(n()),
      me.lineWrapping,
      me.updateListener.of((v) => {
        v.docChanged && (t(v.state.doc.toString()), o("change", t()));
      }),
      me.theme({
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
  Pn(() => {
    S(h, new me({
      state: Be.create({ doc: t(), extensions: f() }),
      parent: u(l)
    }));
  }), Yc(() => {
    var v;
    (v = u(h)) == null || v.destroy();
  });
  function d() {
    o("evaluate", t());
  }
  qe(() => (u(h), Ce(t())), () => {
    u(h) && t() !== u(h).state.doc.toString() && u(h).dispatch({
      changes: { from: 0, to: u(h).state.doc.length, insert: t() }
    });
  }), Ci(), Tt();
  var p = $$(), O = x(p);
  Vc(O, (v) => S(l, v), () => u(l));
  var g = w(O, 2), m = w(x(g), 2);
  B(() => nt(O, "data-field", s())), ee("click", m, d), E(i, p), St();
}
var P$ = /* @__PURE__ */ j('<input type="text" placeholder="connection ID" class="svelte-awrrrl"/>'), T$ = /* @__PURE__ */ j("<option> </option>"), C$ = /* @__PURE__ */ j('<div class="hint svelte-awrrrl"> </div>'), Z$ = /* @__PURE__ */ j('<select class="svelte-awrrrl"><option>— select a connection —</option><!></select> <!>', 1);
function E$(i, e) {
  xt(e, !1);
  let t = Xe(e, "value", 8, ""), n = Xe(e, "service", 8, void 0), s = Xe(e, "onChange", 8), r = Xe(e, "disabled", 8, !1), o = /* @__PURE__ */ W([]), a = /* @__PURE__ */ W(!1);
  Pn(async () => {
    try {
      const d = await fetch("/api/integrations/connections");
      if (!d.ok) throw new Error(String(d.status));
      const p = await d.json();
      S(o, n() ? p.filter((O) => O.service === n()) : p);
    } catch {
      S(a, !0);
    }
  }), Tt();
  var l = Ii(), h = Ye(l);
  {
    var c = (d) => {
      var p = P$();
      B(() => {
        zs(p, t()), p.disabled = r();
      }), ee("input", p, (O) => s()(O.target.value)), E(d, p);
    }, f = (d) => {
      var p = Z$(), O = Ye(p), g = x(O);
      g.value = g.__value = "";
      var m = w(g);
      He(m, 1, () => u(o), et, (R, T) => {
        var M = T$(), C = x(M), z = {};
        B(() => {
          V(C, `${u(T), b(() => u(T).displayName) ?? ""} (${u(T), b(() => u(T).service) ?? ""}${u(T), b(() => u(T).status !== "active" ? ` — ${u(T).status}` : "") ?? ""})`), z !== (z = (u(T), b(() => u(T).id))) && (M.value = (M.__value = (u(T), b(() => u(T).id))) ?? "");
        }), E(R, M);
      });
      var v;
      qc(O);
      var Q = w(O, 2);
      {
        var k = (R) => {
          var T = C$(), M = x(T);
          B(() => V(M, `No ${n() ?? "integration" ?? ""} connections. Create one in Admin → Integration Connections.`)), E(R, T);
        };
        F(Q, (R) => {
          u(o), b(() => u(o).length === 0) && R(k);
        });
      }
      B(() => {
        O.disabled = r(), v !== (v = t()) && (O.value = (O.__value = t()) ?? "", ul(O, t()));
      }), ee("change", O, (R) => s()(R.target.value)), E(d, p);
    };
    F(h, (d) => {
      u(a) ? d(c) : d(f, -1);
    });
  }
  E(i, l), St();
}
var A$ = /* @__PURE__ */ j('<button class="mode-btn svelte-1l5nnoh" type="button">← Model picker</button>'), R$ = /* @__PURE__ */ j('<textarea rows="4" class="svelte-1l5nnoh"></textarea> <!>', 1), M$ = /* @__PURE__ */ j("<option> </option>"), X$ = /* @__PURE__ */ j("<option> </option>"), j$ = /* @__PURE__ */ j('<input class="spaced svelte-1l5nnoh" type="text" placeholder="model id"/>'), L$ = /* @__PURE__ */ j('<select class="spaced svelte-1l5nnoh"><!><option>Custom model…</option></select> <!>', 1), I$ = /* @__PURE__ */ j('<div class="hint svelte-1l5nnoh">No model providers connected. Add one in Admin → Integrations.</div>'), D$ = /* @__PURE__ */ j('<select class="svelte-1l5nnoh"><option>— graph default model —</option><!></select> <!> <!> <button class="mode-btn svelte-1l5nnoh" type="button">Advanced (JSON)</button>', 1);
function z$(i, e) {
  var N, Y;
  xt(e, !1);
  const t = /* @__PURE__ */ W(), n = /* @__PURE__ */ W(), s = /* @__PURE__ */ W(), r = /* @__PURE__ */ W(), o = /* @__PURE__ */ W();
  let a = Xe(e, "value", 8, void 0), l = Xe(e, "onChange", 8), h = Xe(e, "disabled", 8, !1);
  const c = "__custom";
  let f = /* @__PURE__ */ W([]), d = /* @__PURE__ */ W([]), p = /* @__PURE__ */ W(!1), O = /* @__PURE__ */ W(!1);
  const g = (Y = (N = a()) == null ? void 0 : N.targets) == null ? void 0 : Y[0];
  let m = /* @__PURE__ */ W((g == null ? void 0 : g.connectionId) ?? ""), v = /* @__PURE__ */ W((g == null ? void 0 : g.model) ?? ""), Q = /* @__PURE__ */ W("");
  Pn(async () => {
    try {
      const [y, _] = await Promise.all([
        fetch("/api/llm/providers"),
        fetch("/api/integrations/connections")
      ]);
      if (!y.ok || !_.ok) throw new Error("load failed");
      S(f, await y.json());
      const P = new Set(u(f).map((X) => X.provider));
      S(d, (await _.json()).filter((X) => P.has(X.service)));
      const $ = u(f).find((X) => {
        var Z;
        return X.provider === ((Z = u(d).find((H) => H.id === u(m))) == null ? void 0 : Z.service);
      });
      u(v) && $ && !$.models.some((X) => X.id === u(v)) && (S(Q, u(v)), S(v, c));
    } catch {
      S(p, !0), S(O, !0);
    }
  });
  function k(y, _) {
    !y || !_ || l()({
      strategy: "priority",
      targets: [
        {
          id: "primary",
          connectionId: y.id,
          provider: y.service,
          model: _
        }
      ],
      triggers: []
    });
  }
  function R() {
    k(u(r), u(v) === c ? u(Q).trim() : u(v));
  }
  function T(y) {
    var X;
    if (S(m, y), !y) {
      l()(void 0);
      return;
    }
    const _ = u(d).find((Z) => Z.id === y), P = u(f).find((Z) => Z.provider === (_ == null ? void 0 : _.service));
    u(v) === c || (P == null ? void 0 : P.models.some((Z) => Z.id === u(v))) || S(v, ((X = (P == null ? void 0 : P.models.find((Z) => Z.recommended)) ?? (P == null ? void 0 : P.models[0])) == null ? void 0 : X.id) ?? c), k(_, u(v) === c ? u(Q).trim() : u(v));
  }
  qe(() => Ce(a()), () => {
    S(t, a() ?? null);
  }), qe(() => u(t), () => {
    S(n, !u(t) || Object.keys(u(t)).length === 0);
  }), qe(() => (u(n), u(t)), () => {
    var y, _, P, $, X;
    S(s, u(n) || (((y = u(t)) == null ? void 0 : y.strategy) ?? "priority") === "priority" && (((P = (_ = u(t)) == null ? void 0 : _.targets) == null ? void 0 : P.length) ?? 0) === 1 && (((X = ($ = u(t)) == null ? void 0 : $.triggers) == null ? void 0 : X.length) ?? 0) === 0);
  }), qe(() => u(s), () => {
    u(s) || S(O, !0);
  }), qe(() => (u(d), u(m)), () => {
    S(r, u(d).find((y) => y.id === u(m)));
  }), qe(() => (u(f), u(r)), () => {
    S(o, u(f).find((y) => {
      var _;
      return y.provider === ((_ = u(r)) == null ? void 0 : _.service);
    }));
  }), Ci(), Tt();
  var M = Ii(), C = Ye(M);
  {
    var z = (y) => {
      var _ = R$(), P = Ye(_), $ = w(P, 2);
      {
        var X = (Z) => {
          var H = A$();
          ee("click", H, () => {
            S(O, !1);
          }), E(Z, H);
        };
        F($, (Z) => {
          !u(p) && u(s) && Z(X);
        });
      }
      B(
        (Z) => {
          zs(P, Z), P.disabled = h();
        },
        [
          () => (Ce(a()), b(() => JSON.stringify(a() ?? {}, null, 2)))
        ]
      ), ee("blur", P, (Z) => {
        try {
          l()(JSON.parse(Z.currentTarget.value));
        } catch {
        }
      }), E(y, _);
    }, D = (y) => {
      var _ = D$(), P = Ye(_), $ = x(P);
      $.value = $.__value = "";
      var X = w($);
      He(X, 1, () => u(d), et, (ie, ce) => {
        var ye = M$(), re = x(ye), xe = {};
        B(
          (Pe) => {
            V(re, `${u(ce), b(() => u(ce).displayName) ?? ""} (${Pe ?? ""}${u(ce), b(() => u(ce).status !== "active" ? ` — ${u(ce).status}` : "") ?? ""})`), xe !== (xe = (u(ce), b(() => u(ce).id))) && (ye.value = (ye.__value = (u(ce), b(() => u(ce).id))) ?? "");
          },
          [
            () => (u(f), u(ce), b(() => {
              var Pe;
              return ((Pe = u(f).find((pe) => pe.provider === u(ce).service)) == null ? void 0 : Pe.displayName) ?? u(ce).service;
            }))
          ]
        ), E(ie, ye);
      });
      var Z;
      qc(P);
      var H = w(P, 2);
      {
        var J = (ie) => {
          var ce = L$(), ye = Ye(ce), re = x(ye);
          He(
            re,
            1,
            () => (u(o), b(() => u(o).models)),
            et,
            (Oe, de) => {
              var K = X$(), oe = x(K), we = {};
              B(() => {
                V(oe, `${u(de), b(() => u(de).label) ?? ""}${u(de), b(() => u(de).recommended ? " (recommended)" : "") ?? ""}`), we !== (we = (u(de), b(() => u(de).id))) && (K.value = (K.__value = (u(de), b(() => u(de).id))) ?? "");
              }), E(Oe, K);
            }
          );
          var xe = w(re);
          xe.value = xe.__value = c;
          var Pe = w(ye, 2);
          {
            var pe = (Oe) => {
              var de = j$();
              B(() => de.disabled = h()), Nt(de, () => u(Q), (K) => S(Q, K)), ee("blur", de, R), E(Oe, de);
            };
            F(Pe, (Oe) => {
              u(v) === c && Oe(pe);
            });
          }
          B(() => ye.disabled = h()), _a(ye, () => u(v), (Oe) => S(v, Oe)), ee("change", ye, R), E(ie, ce);
        };
        F(H, (ie) => {
          u(o) && ie(J);
        });
      }
      var te = w(H, 2);
      {
        var he = (ie) => {
          var ce = I$();
          E(ie, ce);
        };
        F(te, (ie) => {
          u(d), b(() => u(d).length === 0) && ie(he);
        });
      }
      var ue = w(te, 2);
      B(() => {
        P.disabled = h(), Z !== (Z = u(m)) && (P.value = (P.__value = u(m)) ?? "", ul(P, u(m)));
      }), ee("change", P, (ie) => T(ie.currentTarget.value)), ee("click", ue, () => {
        S(O, !0);
      }), E(y, _);
    };
    F(C, (y) => {
      u(O) ? y(z) : y(D, -1);
    });
  }
  E(i, M), St();
}
var N$ = /* @__PURE__ */ j('<textarea rows="4" class="svelte-b5q3h1"></textarea>'), Y$ = /* @__PURE__ */ j('<input type="text" placeholder="comma-separated values" class="svelte-b5q3h1"/>'), q$ = /* @__PURE__ */ j('<input type="checkbox" style="width:auto" class="svelte-b5q3h1"/>'), W$ = /* @__PURE__ */ j('<div class="eval-result svelte-b5q3h1"> </div>'), V$ = /* @__PURE__ */ j('<!> <!> <button class="mode-toggle-btn svelte-b5q3h1">← Value Picker mode</button>', 1), B$ = /* @__PURE__ */ j('<button class="picker-btn svelte-b5q3h1" title="Reference upstream node output">↗</button>'), G$ = /* @__PURE__ */ j('<button class="picker-option svelte-b5q3h1"><span class="picker-node svelte-b5q3h1"> </span> <span class="picker-ref svelte-b5q3h1"> </span></button>'), U$ = /* @__PURE__ */ j('<div class="picker-dropdown svelte-b5q3h1"><div class="picker-label svelte-b5q3h1">Insert reference to:</div> <!></div>'), F$ = /* @__PURE__ */ j('<div class="field-with-picker svelte-b5q3h1"><input type="text" class="svelte-b5q3h1"/> <!> <button class="expr-toggle-btn svelte-b5q3h1" title="Switch to JSONata expression editor">ƒ</button></div> <!>', 1), H$ = /* @__PURE__ */ j('<div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1"> </label> <!></div>'), K$ = /* @__PURE__ */ j('<div class="panel-section svelte-b5q3h1"><div class="panel-header svelte-b5q3h1"><span> </span> <button class="close-btn svelte-b5q3h1">✕</button></div> <div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1">Label</label> <input type="text" class="svelte-b5q3h1"/></div> <!> <button class="btn-danger svelte-b5q3h1">Remove node</button></div>');
function J$(i, e) {
  xt(e, !1);
  const t = () => ft(eo, "$nodeTypes", s), n = () => ft(lt, "$graph", s), [s, r] = _n(), o = /* @__PURE__ */ W(), a = /* @__PURE__ */ W(), l = /* @__PURE__ */ W();
  let h = Xe(e, "node", 8), c = Xe(e, "readonly", 8, !1), f = /* @__PURE__ */ W(null), d = /* @__PURE__ */ W(
    null
    // field currently in expression editor mode
  ), p = /* @__PURE__ */ W(
    {}
    // fieldKey → eval result
  );
  function O(P) {
    var Z, H;
    const $ = t().find((J) => J.type === P.type), X = (H = (Z = $ == null ? void 0 : $.schema) == null ? void 0 : Z.output) == null ? void 0 : H.properties;
    return X && Object.keys(X).length > 0 ? Object.keys(X) : ["output"];
  }
  async function g(P, $) {
    try {
      const Z = await (await fetch("/studio/evaluate-expression", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: $ })
      })).json();
      S(p, {
        ...u(p),
        [P]: Z.error ? `Error: ${Z.error}` : JSON.stringify(Z.result)
      });
    } catch {
      S(p, { ...u(p), [P]: "Request failed" });
    }
  }
  function m(P, $) {
    lt.update((X) => ({
      ...X,
      nodes: {
        ...X.nodes,
        [h().id]: { ...h(), config: { ...h().config, [P]: $ } }
      }
    }));
  }
  function v(P) {
    lt.update(($) => ({
      ...$,
      nodes: { ...$.nodes, [h().id]: { ...h(), label: P } }
    }));
  }
  function Q() {
    lt.update((P) => {
      const $ = { ...P.nodes };
      return delete $[h().id], {
        ...P,
        nodes: $,
        edges: P.edges.filter((X) => X.from !== h().id && X.to !== h().id)
      };
    }), Bn.set(null);
  }
  function k(P) {
    return h().config[P] ?? void 0;
  }
  function R(P, $, X) {
    m(P, `$.${X}`), S(f, null);
  }
  qe(() => (t(), Ce(h())), () => {
    S(o, t().find((P) => P.type === h().type));
  }), qe(() => u(o), () => {
    var P, $, X;
    S(a, ((X = ($ = (P = u(o)) == null ? void 0 : P.schema) == null ? void 0 : $.config) == null ? void 0 : X.properties) ?? {});
  }), qe(() => (n(), Ce(h())), () => {
    S(l, Object.values(n().nodes).filter((P) => n().edges.some(($) => $.to === h().id && $.from === P.id)));
  }), qe(() => Ce(h()), () => {
    var P;
    (P = h()) != null && P.id && (S(d, null), S(p, {}), S(f, null));
  }), Ci(), Tt();
  var T = K$(), M = x(T), C = x(M), z = x(C), D = w(C, 2), N = w(M, 2), Y = w(x(N), 2), y = w(N, 2);
  He(
    y,
    1,
    () => (u(a), b(() => Object.entries(u(a)))),
    et,
    (P, $) => {
      var X = /* @__PURE__ */ ks(() => Jm(u($), 2));
      let Z = () => u(X)[0], H = () => u(X)[1];
      var J = H$(), te = x(J), he = x(te), ue = w(te, 2);
      {
        var ie = (pe) => {
          {
            let Oe = /* @__PURE__ */ _t(() => (Z(), b(() => String(k(Z()) ?? ""))));
            E$(pe, {
              get value() {
                return u(Oe);
              },
              get service() {
                return H(), b(() => H().service);
              },
              onChange: (de) => m(Z(), de),
              get disabled() {
                return c();
              }
            });
          }
        }, ce = (pe) => {
          var Oe = Ii(), de = Ye(Oe);
          f0(de, () => (Ce(h()), b(() => h().id)), (K) => {
            {
              let oe = /* @__PURE__ */ _t(() => (Z(), b(() => k(Z()))));
              z$(K, {
                get value() {
                  return u(oe);
                },
                onChange: (we) => m(Z(), we),
                get disabled() {
                  return c();
                }
              });
            }
          }), E(pe, Oe);
        }, ye = (pe) => {
          var Oe = N$();
          B(
            (de) => {
              zs(Oe, de), Oe.disabled = c();
            },
            [
              () => (Z(), b(() => JSON.stringify(k(Z()) ?? {}, null, 2)))
            ]
          ), ee("blur", Oe, (de) => {
            try {
              m(Z(), JSON.parse(de.target.value));
            } catch {
            }
          }), E(pe, Oe);
        }, re = (pe) => {
          var Oe = Y$();
          B(
            (de) => {
              zs(Oe, de), Oe.disabled = c();
            },
            [
              () => (Z(), b(() => Array.isArray(k(Z())) ? k(Z()).join(", ") : String(k(Z()) ?? "")))
            ]
          ), ee("input", Oe, (de) => m(Z(), de.target.value.split(",").map((K) => K.trim()).filter(Boolean))), E(pe, Oe);
        }, xe = (pe) => {
          var Oe = q$();
          B(
            (de) => {
              w0(Oe, de), Oe.disabled = c();
            },
            [() => (Z(), b(() => !!k(Z())))]
          ), ee("change", Oe, (de) => m(Z(), de.target.checked)), E(pe, Oe);
        }, Pe = (pe) => {
          var Oe = Ii(), de = Ye(Oe);
          {
            var K = (we) => {
              var Me = V$(), je = Ye(Me);
              {
                let Se = /* @__PURE__ */ _t(() => (Z(), b(() => String(k(Z()) ?? "")))), I = /* @__PURE__ */ _t(() => (u(l), b(() => u(l).flatMap(O))));
                _$(je, {
                  get value() {
                    return u(Se);
                  },
                  get fieldName() {
                    return Z();
                  },
                  get contextKeys() {
                    return u(I);
                  },
                  $$events: {
                    change: (L) => m(Z(), L.detail),
                    evaluate: (L) => g(Z(), L.detail)
                  }
                });
              }
              var Ge = w(je, 2);
              {
                var De = (Se) => {
                  var I = W$(), L = x(I);
                  B((ne) => V(L, ne), [
                    () => (u(p), Z(), b(() => String(u(p)[Z()])))
                  ]), E(Se, I);
                };
                F(Ge, (Se) => {
                  u(p), Z(), b(() => u(p)[Z()]) && Se(De);
                });
              }
              var it = w(Ge, 2);
              ee("click", it, () => {
                S(d, null), S(p, { ...u(p), [Z()]: void 0 });
              }), E(we, Me);
            }, oe = (we) => {
              var Me = F$(), je = Ye(Me), Ge = x(je), De = w(Ge, 2);
              {
                var it = (ne) => {
                  var le = B$();
                  B(() => le.disabled = c()), ee("click", le, () => {
                    S(f, u(f) === Z() ? null : Z());
                  }), E(ne, le);
                };
                F(De, (ne) => {
                  u(l), b(() => u(l).length > 0) && ne(it);
                });
              }
              var Se = w(De, 2), I = w(je, 2);
              {
                var L = (ne) => {
                  var le = U$(), _e = w(x(le), 2);
                  He(_e, 1, () => u(l), et, (Ve, Qe) => {
                    var U = Ii(), fe = Ye(U);
                    He(
                      fe,
                      1,
                      () => (u(Qe), b(() => O(u(Qe)))),
                      et,
                      (be, Le) => {
                        var Te = G$(), Ze = x(Te), Fe = x(Ze), ot = w(Ze, 2), at = x(ot);
                        B(() => {
                          V(Fe, (u(Qe), b(() => u(Qe).label ?? u(Qe).id))), V(at, `$.${u(Le) ?? ""}`);
                        }), ee("click", Te, () => R(Z(), u(Qe).id, u(Le))), E(be, Te);
                      }
                    ), E(Ve, U);
                  }), E(ne, le);
                };
                F(I, (ne) => {
                  u(f), Z(), u(l), b(() => u(f) === Z() && u(l).length > 0) && ne(L);
                });
              }
              B(
                (ne) => {
                  zs(Ge, ne), Ge.disabled = c(), Se.disabled = c();
                },
                [
                  () => (Z(), b(() => String(k(Z()) ?? "")))
                ]
              ), ee("input", Ge, (ne) => m(Z(), ne.target.value)), ee("click", Se, () => {
                S(d, Z()), S(f, null);
              }), E(we, Me);
            };
            F(de, (we) => {
              u(d) === Z() ? we(K) : we(oe, -1);
            });
          }
          E(pe, Oe);
        };
        F(ue, (pe) => {
          H(), b(() => H().format === "connection") ? pe(ie) : (H(), b(() => H().format === "model-router") ? pe(ce, 1) : (H(), b(() => H().type === "object") ? pe(ye, 2) : (H(), b(() => H().type === "array") ? pe(re, 3) : (H(), b(() => H().type === "boolean") ? pe(xe, 4) : pe(Pe, -1)))));
        });
      }
      B(() => V(he, (H(), Z(), b(() => H().description ?? Z())))), E(P, J);
    }
  );
  var _ = w(y, 2);
  B(() => {
    V(z, `Node: ${Ce(h()), b(() => h().type) ?? ""}`), zs(Y, (Ce(h()), b(() => h().label ?? ""))), Y.disabled = c(), _.disabled = c();
  }), ee("click", D, () => Bn.set(null)), ee("input", Y, (P) => v(P.target.value)), ee("click", _, Q), E(i, T), St(), r();
}
var e_ = /* @__PURE__ */ j('<div class="agent-name svelte-5tjmbm"> </div> <div> </div>', 1), t_ = /* @__PURE__ */ j('<div class="status-msg svelte-5tjmbm"> </div>'), i_ = /* @__PURE__ */ j('<div class="status-msg svelte-5tjmbm"> </div>'), n_ = /* @__PURE__ */ j('<div class="status-msg svelte-5tjmbm"> </div>'), s_ = /* @__PURE__ */ j('<button class="btn-revert svelte-5tjmbm"> </button> <!>', 1), r_ = /* @__PURE__ */ j('<span class="trigger-filter svelte-5tjmbm"> </span>'), o_ = /* @__PURE__ */ j('<div class="trigger-row svelte-5tjmbm"><div class="trigger-info svelte-5tjmbm"><span class="trigger-service svelte-5tjmbm"> </span> <!> <code class="trigger-url svelte-5tjmbm"> </code></div> <button class="trigger-remove svelte-5tjmbm" title="Remove trigger">✕</button></div>'), a_ = /* @__PURE__ */ j('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Registered Triggers</label> <!></div>'), l_ = /* @__PURE__ */ j("<option> </option>"), h_ = /* @__PURE__ */ j('<div class="status-msg svelte-5tjmbm"> </div>'), c_ = /* @__PURE__ */ j(`<!> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Service</label> <select class="svelte-5tjmbm"><option>— select a service —</option><!></select></div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Event Filter (optional)</label> <input type="text" placeholder="e.g. app_mention — blank for all events" class="svelte-5tjmbm"/></div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Signing Secret</label> <input type="password" placeholder="the service's webhook signing secret" class="svelte-5tjmbm"/> <div class="field-hint svelte-5tjmbm">Used to verify inbound event signatures. Never displayed after registration.</div></div> <button class="btn-save svelte-5tjmbm"> </button> <!>`, 1), f_ = /* @__PURE__ */ j('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Cron Expression</label> <input type="text" placeholder="0 * * * * (every hour)" class="svelte-5tjmbm"/> <div class="field-hint svelte-5tjmbm">Standard cron format: minute hour day month weekday</div></div>'), u_ = /* @__PURE__ */ j('<div class="webhook-url svelte-5tjmbm"><code class="svelte-5tjmbm"> </code> <div class="field-hint svelte-5tjmbm">POST your payload to this URL. No auth headers required.</div></div>'), d_ = /* @__PURE__ */ j('<div class="field-hint svelte-5tjmbm">Publish the agent to generate the webhook URL.</div>'), p_ = /* @__PURE__ */ j('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Webhook URL</label> <!></div>'), O_ = /* @__PURE__ */ j('<div class="status-msg svelte-5tjmbm"> </div>'), g_ = /* @__PURE__ */ j('<div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Agent</div> <!> <div class="btn-row svelte-5tjmbm"><button class="btn-draft svelte-5tjmbm"> </button> <button class="btn-publish svelte-5tjmbm"> </button></div> <!> <!> <!></div> <div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Trigger Config</div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Trigger Type</label> <select class="svelte-5tjmbm"><option>REST API</option><option>Scheduled (Cron)</option><option>Webhook</option><option>Integration Event</option></select></div> <!> <!> <!> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Description</label> <input type="text" placeholder="What does this agent do?" class="svelte-5tjmbm"/></div> <button class="btn-save svelte-5tjmbm"> </button> <!></div>', 1);
function m_(i, e) {
  xt(e, !1);
  const t = () => ft(lt, "$graph", r), n = () => ft(Xs, "$agentConfig", r), s = () => ft(ma, "$agent", r), [r, o] = _n();
  let a = Xe(e, "agentId", 8), l = Xe(e, "readonly", 8, !1), h = /* @__PURE__ */ W(!1), c = /* @__PURE__ */ W(""), f = /* @__PURE__ */ W(!1), d = /* @__PURE__ */ W(""), p = /* @__PURE__ */ W(!1), O = /* @__PURE__ */ W(""), g = /* @__PURE__ */ W(!1), m = /* @__PURE__ */ W(""), v = /* @__PURE__ */ W([]), Q = /* @__PURE__ */ W([]), k = /* @__PURE__ */ W(""), R = /* @__PURE__ */ W(""), T = /* @__PURE__ */ W(""), M = /* @__PURE__ */ W(""), C = /* @__PURE__ */ W(!1);
  Pn(async () => {
    try {
      const [U, fe] = await Promise.all([
        fetch("/api/integrations"),
        fetch("/api/integrations/triggers")
      ]);
      if (U.ok) {
        const be = await U.json();
        S(v, be.filter((Le) => Le.hasTrigger));
      }
      if (fe.ok) {
        const be = await fe.json();
        S(Q, be.filter((Le) => Le.agentId === a()));
      }
    } catch {
    }
  });
  async function z() {
    S(C, !0), S(M, "");
    try {
      const U = await fetch("/api/integrations/triggers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: u(k),
          agentId: a(),
          eventFilter: u(R) || void 0,
          secret: u(T)
        })
      });
      if (!U.ok) throw new Error("Registration failed");
      const fe = await U.json();
      S(Q, [...u(Q), fe]), S(T, ""), S(R, ""), S(M, "✓ Trigger registered");
    } catch (U) {
      S(M, "✗ " + (U instanceof Error ? U.message : "Error"));
    } finally {
      S(C, !1);
    }
  }
  async function D(U) {
    try {
      const fe = await fetch(`/api/integrations/triggers/${U}`, { method: "DELETE" });
      (fe.ok || fe.status === 204) && S(Q, u(Q).filter((be) => be.id !== U));
    } catch {
    }
  }
  async function N() {
    S(h, !0), S(c, "");
    try {
      const U = JSON.stringify(t());
      if (!(await fetch(`/api/agents/${a()}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graphJson: U })
      })).ok) throw new Error("Publish failed");
      S(c, "✓ Published");
      const be = await fetch(`/api/agents/${a()}`);
      be.ok && ma.set(await be.json());
    } catch (U) {
      S(c, "✗ " + (U instanceof Error ? U.message : "Error"));
    } finally {
      S(h, !1);
    }
  }
  async function Y() {
    S(p, !0), S(O, "");
    try {
      if (!(await fetch(`/api/agents/${a()}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftGraphJson: JSON.stringify(t()) })
      })).ok) throw new Error("Save failed");
      S(O, "✓ Draft saved");
    } catch (U) {
      S(O, "✗ " + (U instanceof Error ? U.message : "Error"));
    } finally {
      S(p, !1);
    }
  }
  async function y() {
    S(g, !0), S(m, "");
    try {
      const U = await fetch(`/api/agents/${a()}/draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (!U.ok) throw new Error("Revert failed");
      ma.set(await U.json()), S(m, "✓ Reverted to draft");
    } catch (U) {
      S(m, "✗ " + (U instanceof Error ? U.message : "Error"));
    } finally {
      S(g, !1);
    }
  }
  async function _() {
    S(f, !0), S(d, "");
    try {
      const U = { type: n().triggerType };
      if (n().triggerType === "cron" && (U.expression = n().cronExpression), !(await fetch(`/api/agents/${a()}/config`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ triggerConfig: U })
      })).ok) throw new Error("Save failed");
      if (S(d, "✓ Saved"), n().triggerType === "webhook") {
        const be = await fetch(`/api/agents/${a()}/config`);
        if (be.ok) {
          const Le = await be.json();
          Xs.update((Te) => {
            var Ze;
            return { ...Te, webhookUrl: ((Ze = Le.triggerConfig) == null ? void 0 : Ze.webhookUrl) ?? "" };
          });
        }
      }
    } catch (U) {
      S(d, "✗ " + (U instanceof Error ? U.message : "Error"));
    } finally {
      S(f, !1);
    }
  }
  Tt();
  var P = g_(), $ = Ye(P), X = w(x($), 2);
  {
    var Z = (U) => {
      var fe = e_(), be = Ye(fe), Le = x(be), Te = w(be, 2), Ze = x(Te);
      B(() => {
        V(Le, (s(), b(() => s().name))), Jt(Te, 1, `agent-status status-${s(), b(() => s().status) ?? ""}`, "svelte-5tjmbm"), V(Ze, (s(), b(() => s().status)));
      }), E(U, fe);
    };
    F(X, (U) => {
      s() && U(Z);
    });
  }
  var H = w(X, 2), J = x(H), te = x(J), he = w(J, 2), ue = x(he), ie = w(H, 2);
  {
    var ce = (U) => {
      var fe = t_(), be = x(fe);
      B(() => V(be, u(O))), E(U, fe);
    };
    F(ie, (U) => {
      u(O) && U(ce);
    });
  }
  var ye = w(ie, 2);
  {
    var re = (U) => {
      var fe = i_(), be = x(fe);
      B(() => V(be, u(c))), E(U, fe);
    };
    F(ye, (U) => {
      u(c) && U(re);
    });
  }
  var xe = w(ye, 2);
  {
    var Pe = (U) => {
      var fe = s_(), be = Ye(fe), Le = x(be), Te = w(be, 2);
      {
        var Ze = (Fe) => {
          var ot = n_(), at = x(ot);
          B(() => V(at, u(m))), E(Fe, ot);
        };
        F(Te, (Fe) => {
          u(m) && Fe(Ze);
        });
      }
      B(() => {
        be.disabled = u(g), V(Le, u(g) ? "Reverting…" : "Revert to Draft");
      }), ee("click", be, y), E(U, fe);
    };
    F(xe, (U) => {
      s(), Ce(l()), b(() => {
        var fe;
        return ((fe = s()) == null ? void 0 : fe.status) === "active" && !l();
      }) && U(Pe);
    });
  }
  var pe = w($, 2), Oe = w(x(pe), 2), de = w(x(Oe), 2), K = x(de);
  K.value = K.__value = "rest";
  var oe = w(K);
  oe.value = oe.__value = "cron";
  var we = w(oe);
  we.value = we.__value = "webhook";
  var Me = w(we);
  Me.value = Me.__value = "integration";
  var je = w(Oe, 2);
  {
    var Ge = (U) => {
      var fe = c_(), be = Ye(fe);
      {
        var Le = (kt) => {
          var mt = a_(), Qt = w(x(mt), 2);
          He(Qt, 1, () => u(Q), et, (dn, Xt) => {
            var Wi = o_(), Er = x(Wi), Do = x(Er), Zl = x(Do), zo = w(Do, 2);
            {
              var Cn = (El) => {
                var Rf = r_(), Rm = x(Rf);
                B(() => V(Rm, (u(Xt), b(() => u(Xt).eventFilter)))), E(El, Rf);
              };
              F(zo, (El) => {
                u(Xt), b(() => u(Xt).eventFilter) && El(Cn);
              });
            }
            var Zn = w(zo, 2), Ar = x(Zn), Am = w(Er, 2);
            B(() => {
              V(Zl, (u(Xt), b(() => u(Xt).service))), V(Ar, (u(Xt), b(() => u(Xt).url)));
            }), ee("click", Am, () => D(u(Xt).id)), E(dn, Wi);
          }), E(kt, mt);
        };
        F(be, (kt) => {
          u(Q), b(() => u(Q).length > 0) && kt(Le);
        });
      }
      var Te = w(be, 2), Ze = w(x(Te), 2), Fe = x(Ze);
      Fe.value = Fe.__value = "";
      var ot = w(Fe);
      He(ot, 1, () => u(v), et, (kt, mt) => {
        var Qt = l_(), dn = x(Qt), Xt = {};
        B(() => {
          V(dn, (u(mt), b(() => u(mt).displayName))), Xt !== (Xt = (u(mt), b(() => u(mt).service))) && (Qt.value = (Qt.__value = (u(mt), b(() => u(mt).service))) ?? "");
        }), E(kt, Qt);
      });
      var at = w(Te, 2), Zr = w(x(at), 2), gt = w(at, 2), Jn = w(x(gt), 2), ze = w(gt, 2), ut = x(ze), di = w(ze, 2);
      {
        var es = (kt) => {
          var mt = h_(), Qt = x(mt);
          B(() => V(Qt, u(M))), E(kt, mt);
        };
        F(di, (kt) => {
          u(M) && kt(es);
        });
      }
      B(() => {
        ze.disabled = u(C) || !u(k) || !u(T), V(ut, u(C) ? "Registering…" : "Register Trigger");
      }), _a(Ze, () => u(k), (kt) => S(k, kt)), Nt(Zr, () => u(R), (kt) => S(R, kt)), Nt(Jn, () => u(T), (kt) => S(T, kt)), ee("click", ze, z), E(U, fe);
    };
    F(je, (U) => {
      n(), b(() => n().triggerType === "integration") && U(Ge);
    });
  }
  var De = w(je, 2);
  {
    var it = (U) => {
      var fe = f_(), be = w(x(fe), 2);
      Nt(be, () => n().cronExpression, (Le) => Rl(Xs, b(n).cronExpression = Le, b(n))), E(U, fe);
    };
    F(De, (U) => {
      n(), b(() => n().triggerType === "cron") && U(it);
    });
  }
  var Se = w(De, 2);
  {
    var I = (U) => {
      var fe = p_(), be = w(x(fe), 2);
      {
        var Le = (Ze) => {
          var Fe = u_(), ot = x(Fe), at = x(ot);
          B(() => V(at, (n(), b(() => n().webhookUrl)))), E(Ze, Fe);
        }, Te = (Ze) => {
          var Fe = d_();
          E(Ze, Fe);
        };
        F(be, (Ze) => {
          n(), b(() => n().webhookUrl) ? Ze(Le) : Ze(Te, -1);
        });
      }
      E(U, fe);
    };
    F(Se, (U) => {
      n(), b(() => n().triggerType === "webhook") && U(I);
    });
  }
  var L = w(Se, 2), ne = w(x(L), 2), le = w(L, 2), _e = x(le), Ve = w(le, 2);
  {
    var Qe = (U) => {
      var fe = O_(), be = x(fe);
      B(() => V(be, u(d))), E(U, fe);
    };
    F(Ve, (U) => {
      u(d) && U(Qe);
    });
  }
  B(() => {
    J.disabled = u(p) || l(), V(te, u(p) ? "Saving…" : "Save Draft"), he.disabled = u(h) || l(), V(ue, u(h) ? "Publishing…" : "Publish"), le.disabled = u(f), V(_e, u(f) ? "Saving…" : "Save");
  }), ee("click", J, Y), ee("click", he, N), _a(de, () => n().triggerType, (U) => Rl(Xs, b(n).triggerType = U, b(n))), Nt(ne, () => n().description, (U) => Rl(Xs, b(n).description = U, b(n))), ee("click", le, _), E(i, P), St(), o();
}
const oi = $n({
  runId: null,
  status: "idle",
  output: null,
  error: null,
  steps: []
});
var v_ = /* @__PURE__ */ j('<button class="btn-stop svelte-gqobos">■ Stop</button>'), b_ = /* @__PURE__ */ j('<pre class="result-json svelte-gqobos"> </pre>'), y_ = /* @__PURE__ */ j('<div class="result-error svelte-gqobos"> </div>'), w_ = /* @__PURE__ */ j('<button class="traj-toggle svelte-gqobos"> </button>'), x_ = /* @__PURE__ */ j('<div class="traj-thought svelte-gqobos"><span class="traj-label svelte-gqobos">Thought</span> </div>'), S_ = /* @__PURE__ */ j('<div class="traj-action svelte-gqobos"><span class="traj-label svelte-gqobos">Action</span> </div>'), k_ = /* @__PURE__ */ j('<div class="traj-obs svelte-gqobos"><span class="traj-label svelte-gqobos">Obs</span> </div>'), Q_ = /* @__PURE__ */ j('<div class="traj-step svelte-gqobos"><span class="traj-iter svelte-gqobos"> </span> <!> <!> <!></div>'), $_ = /* @__PURE__ */ j('<div class="trajectory-block svelte-gqobos"></div>'), __ = /* @__PURE__ */ j('<div><span class="step-type svelte-gqobos"> </span> <span> </span> <!></div> <!>', 1), P_ = /* @__PURE__ */ j('<div class="steps-header svelte-gqobos"> </div> <!>', 1), T_ = /* @__PURE__ */ j('<div><div class="result-status svelte-gqobos"> </div> <!> <!></div> <!>', 1), C_ = /* @__PURE__ */ j('<div class="panel-section svelte-gqobos"><div class="panel-header svelte-gqobos">Test Run</div> <div class="form-group svelte-gqobos"><label class="svelte-gqobos">Input (JSON)</label> <textarea rows="4" class="svelte-gqobos"></textarea></div> <div class="run-controls svelte-gqobos"><button class="btn-run svelte-gqobos"> </button> <!></div> <!></div>');
function Z_(i, e) {
  xt(e, !1);
  const t = () => ft(oi, "$runState", n), [n, s] = _n();
  let r = Xe(e, "agentId", 8), o = /* @__PURE__ */ W("{}"), a = /* @__PURE__ */ W(!1), l = null;
  const h = /* @__PURE__ */ new Set(["core:react", "core:planner"]);
  let c = /* @__PURE__ */ W([]), f = /* @__PURE__ */ W(
    null
    // nodeId
  );
  async function d(D) {
    try {
      const N = await fetch(`/api/telemetry/trajectory/${D}`);
      if (!N.ok) return;
      const Y = await N.json();
      S(c, Y.trajectories ?? []);
    } catch {
    }
  }
  function p() {
    l && (l.close(), l = null), S(a, !1);
  }
  async function O() {
    var Y;
    p(), S(a, !0), oi.set({
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
      }), S(a, !1);
      return;
    }
    let N;
    try {
      const y = await fetch(`/api/agents/${r()}/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: D, mode: "async" })
      });
      if (!y.ok) {
        const P = await y.json();
        throw new Error(((Y = P == null ? void 0 : P.error) == null ? void 0 : Y.message) ?? `HTTP ${y.status}`);
      }
      N = (await y.json()).runId;
    } catch (y) {
      oi.set({
        runId: null,
        status: "failed",
        output: null,
        error: String(y),
        steps: []
      }), S(a, !1);
      return;
    }
    oi.update((y) => ({ ...y, runId: N })), l = new EventSource(`/api/agents/${r()}/runs/${N}/stream`), l.addEventListener("node.started", (y) => {
      const _ = JSON.parse(y.data);
      oi.update((P) => ({
        ...P,
        steps: [
          ...P.steps.filter(($) => $.nodeId !== _.nodeId),
          {
            id: _.nodeId,
            nodeId: _.nodeId,
            nodeType: _.nodeType,
            stepId: _.stepId,
            status: "running",
            startedAt: (/* @__PURE__ */ new Date()).toISOString(),
            completedAt: void 0,
            input: null,
            output: null,
            error: null
          }
        ]
      }));
    }), l.addEventListener("node.completed", (y) => {
      const _ = JSON.parse(y.data);
      oi.update((P) => ({
        ...P,
        steps: P.steps.map(($) => $.nodeId === _.nodeId ? {
          ...$,
          status: "complete",
          completedAt: (/* @__PURE__ */ new Date()).toISOString(),
          output: _.outputs
        } : $)
      }));
    }), l.addEventListener("node.failed", (y) => {
      const _ = JSON.parse(y.data);
      oi.update((P) => ({
        ...P,
        steps: P.steps.map(($) => $.nodeId === _.nodeId ? {
          ...$,
          status: "failed",
          completedAt: (/* @__PURE__ */ new Date()).toISOString(),
          error: _.error
        } : $)
      }));
    }), l.addEventListener("run.completed", (y) => {
      const _ = JSON.parse(y.data);
      oi.update((P) => ({ ...P, status: "completed", output: _.output })), p(), d(N);
    }), l.addEventListener("run.failed", (y) => {
      const _ = JSON.parse(y.data);
      oi.update((P) => ({ ...P, status: "failed", error: _.error.message })), p();
    }), l.addEventListener("run.suspended", () => {
      oi.update((y) => ({
        ...y,
        status: "failed",
        error: "Run suspended — awaiting human review"
      })), p();
    }), l.onerror = () => {
      u(a) && (oi.update((y) => ({
        ...y,
        status: y.status === "running" ? "failed" : y.status,
        error: y.error ?? "Stream connection lost"
      })), p());
    };
  }
  Tt();
  var g = C_(), m = w(x(g), 2), v = w(x(m), 2), Q = w(m, 2), k = x(Q), R = x(k), T = w(k, 2);
  {
    var M = (D) => {
      var N = v_();
      ee("click", N, p), E(D, N);
    };
    F(T, (D) => {
      u(a) && D(M);
    });
  }
  var C = w(Q, 2);
  {
    var z = (D) => {
      var N = T_(), Y = Ye(N), y = x(Y), _ = x(y), P = w(y, 2);
      {
        var $ = (te) => {
          var he = b_(), ue = x(he);
          B((ie) => V(ue, ie), [
            () => (t(), b(() => JSON.stringify(t().output, null, 2)))
          ]), E(te, he);
        };
        F(P, (te) => {
          t(), b(() => t().output) && te($);
        });
      }
      var X = w(P, 2);
      {
        var Z = (te) => {
          var he = y_(), ue = x(he);
          B(() => V(ue, (t(), b(() => t().error)))), E(te, he);
        };
        F(X, (te) => {
          t(), b(() => t().error) && te(Z);
        });
      }
      var H = w(Y, 2);
      {
        var J = (te) => {
          var he = P_(), ue = Ye(he), ie = x(ue), ce = w(ue, 2);
          He(ce, 1, () => (t(), b(() => t().steps)), et, (ye, re) => {
            var xe = __(), Pe = Ye(xe), pe = x(Pe), Oe = x(pe), de = w(pe, 2), K = x(de), oe = w(de, 2);
            {
              var we = (De) => {
                const it = /* @__PURE__ */ _t(() => (u(c), u(re), b(() => u(c).filter((ne) => ne.stepId === u(re).stepId))));
                var Se = Ii(), I = Ye(Se);
                {
                  var L = (ne) => {
                    var le = w_(), _e = x(le);
                    B(() => V(_e, `▶ Trajectory (${Ce(u(it)), b(() => u(it).length) ?? ""} steps)`)), ee("click", le, () => S(f, u(f) === u(re).nodeId ? null : u(re).nodeId)), E(ne, le);
                  };
                  F(I, (ne) => {
                    Ce(u(it)), b(() => u(it).length > 0) && ne(L);
                  });
                }
                E(De, Se);
              }, Me = /* @__PURE__ */ ks(() => (u(re), t(), b(() => h.has(u(re).nodeType) && t().status !== "running")));
              F(oe, (De) => {
                u(Me) && De(we);
              });
            }
            var je = w(Pe, 2);
            {
              var Ge = (De) => {
                const it = /* @__PURE__ */ _t(() => (u(c), u(re), b(() => u(c).filter((I) => I.stepId === u(re).stepId))));
                var Se = $_();
                He(Se, 5, () => u(it), et, (I, L) => {
                  var ne = Q_(), le = x(ne), _e = x(le), Ve = w(le, 2);
                  {
                    var Qe = (Te) => {
                      var Ze = x_(), Fe = w(x(Ze));
                      B(() => V(Fe, ` ${u(L), b(() => u(L).thought) ?? ""}`)), E(Te, Ze);
                    };
                    F(Ve, (Te) => {
                      u(L), b(() => u(L).thought) && Te(Qe);
                    });
                  }
                  var U = w(Ve, 2);
                  {
                    var fe = (Te) => {
                      var Ze = S_(), Fe = w(x(Ze));
                      B(() => V(Fe, ` ${u(L), b(() => u(L).action) ?? ""}`)), E(Te, Ze);
                    };
                    F(U, (Te) => {
                      u(L), b(() => u(L).action) && Te(fe);
                    });
                  }
                  var be = w(U, 2);
                  {
                    var Le = (Te) => {
                      var Ze = k_(), Fe = w(x(Ze));
                      B(() => V(Fe, ` ${u(L), b(() => u(L).observation) ?? ""}`)), E(Te, Ze);
                    };
                    F(be, (Te) => {
                      u(L), b(() => u(L).observation) && Te(Le);
                    });
                  }
                  B(() => V(_e, `Iter ${u(L), b(() => u(L).iteration) ?? ""}`)), E(I, ne);
                }), E(De, Se);
              };
              F(je, (De) => {
                u(f), u(re), b(() => u(f) === u(re).nodeId) && De(Ge);
              });
            }
            B(() => {
              Jt(Pe, 1, `step step-${u(re), b(() => u(re).status) ?? ""}`, "svelte-gqobos"), V(Oe, (u(re), b(() => u(re).nodeType))), Jt(de, 1, `step-badge badge-${u(re), b(() => u(re).status) ?? ""}`, "svelte-gqobos"), V(K, (u(re), b(() => u(re).status)));
            }), E(ye, xe);
          }), B(() => V(ie, `Steps (${t(), b(() => t().steps.length) ?? ""})`)), E(te, he);
        };
        F(H, (te) => {
          t(), b(() => t().steps.length > 0) && te(J);
        });
      }
      B(
        (te) => {
          Jt(Y, 1, `run-result status-${t(), b(() => t().status) ?? ""}`, "svelte-gqobos"), V(_, te);
        },
        [
          () => (t(), b(() => t().status.toUpperCase()))
        ]
      ), E(D, N);
    };
    F(C, (D) => {
      t(), b(() => t().status !== "idle") && D(z);
    });
  }
  B(() => {
    k.disabled = u(a), V(R, u(a) ? "Running…" : "▶ Run");
  }), Nt(v, () => u(o), (D) => S(o, D)), ee("click", k, O), E(i, g), St(), s();
}
const E_ = { x: 160, y: 160 };
function ri(i) {
  return typeof i == "string" && i.trim().length > 0 ? i.trim() : void 0;
}
function Ld(i, e) {
  let t = 1, n = `${i}_${t}`;
  for (; e.has(n); )
    t++, n = `${i}_${t}`;
  return e.add(n), n;
}
function Id(i, e) {
  return `${i}->${e}`;
}
const A_ = /* @__PURE__ */ new Set(["label", "position", "type"]);
function R_(i, e) {
  const t = { ...i }, n = { ...i.config ?? {} };
  for (const [s, r] of Object.entries(e))
    s === "config" && typeof r == "object" && r !== null ? Object.assign(n, r) : A_.has(s) ? t[s] = r : n[s] = r;
  return t.config = n, t;
}
function M_(i, e) {
  const t = structuredClone(i);
  t.nodes = t.nodes ?? {}, t.edges = t.edges ?? [], t.toolEdges = t.toolEdges ?? [];
  const n = new Set(t.edges.map((l) => l.id).filter(Boolean)), s = new Set(t.toolEdges.map((l) => l.id).filter(Boolean)), r = /* @__PURE__ */ new Set(), o = [];
  let a = 0;
  for (const l of e ?? []) {
    const h = (c) => {
      o.push({ op: l.op, target: l.target, reason: c });
    };
    switch (l.op) {
      case "add_node": {
        const c = l.data ?? {}, f = ri(c.id), d = ri(c.type);
        if (!f || !d) {
          h("add_node needs data with an id and a type");
          break;
        }
        if (t.nodes[f] !== void 0) {
          h(`a node "${f}" already exists`);
          break;
        }
        const p = {
          id: f,
          type: d,
          config: c.config ?? {},
          // Without a position every applied node lands on the canvas's
          // (100, 100) fallback, stacked on each other and on whatever is
          // already there.
          position: Bc(t, c.position ?? E_)
        }, O = ri(c.label);
        O && (p.label = O), t.nodes[f] = p, a++;
        break;
      }
      case "update_node": {
        if (!l.target || !l.data) {
          h("update_node needs a target node and data");
          break;
        }
        const c = t.nodes[l.target];
        if (!c) {
          h(`node "${l.target}" is not in the graph`);
          break;
        }
        const f = { ...l.data };
        if (delete f.id, Object.keys(f).length === 0) {
          h("update_node carried no changes");
          break;
        }
        t.nodes[l.target] = { ...R_(c, f), id: l.target }, a++;
        break;
      }
      case "delete_node": {
        if (!l.target) {
          h("delete_node needs a target node");
          break;
        }
        if (t.nodes[l.target] === void 0) {
          h(`node "${l.target}" is not in the graph`);
          break;
        }
        const c = l.target;
        delete t.nodes[c];
        for (const f of t.edges)
          (f.from === c || f.to === c) && r.add(Id(f.from, f.to));
        t.edges = t.edges.filter((f) => f.from !== c && f.to !== c), t.toolEdges = t.toolEdges.filter((f) => f.from !== c && f.to !== c), a++;
        break;
      }
      case "add_edge": {
        const c = l.data ?? {}, f = ri(c.from), d = ri(c.to);
        if (!f || !d) {
          h("add_edge needs data with from and to");
          break;
        }
        const p = [f, d].filter((m) => t.nodes[m] === void 0);
        if (p.length > 0) {
          h(`edge endpoint${p.length > 1 ? "s" : ""} ${p.join(", ")} not in the graph`);
          break;
        }
        const O = ri(c.condition), g = {
          id: ri(c.id) ?? Ld("e_caal", n),
          from: f,
          to: d,
          // The engine reads `type` to decide whether to evaluate `condition`
          // (graph-utils.ts) — an edge stored without one always fires.
          type: ri(c.type) ?? (O ? "conditional" : "unconditional")
        };
        O && (g.condition = O), t.edges = [...t.edges, g], a++;
        break;
      }
      case "delete_edge": {
        const { from: c, to: f } = l.data ?? {};
        if (!c || !f) {
          h("delete_edge needs data with from and to");
          break;
        }
        const d = t.edges.filter((p) => !(p.from === c && p.to === f));
        if (d.length === t.edges.length) {
          if (r.has(Id(c, f))) {
            a++;
            break;
          }
          h(`no edge from "${c}" to "${f}"`);
          break;
        }
        t.edges = d, a++;
        break;
      }
      case "add_tool_edge": {
        const c = l.data ?? {}, f = ri(c.from) ?? ri(c.tool), d = ri(c.to) ?? ri(c.agent);
        if (!f || !d) {
          h("add_tool_edge needs a tool node and an agent node");
          break;
        }
        if (t.nodes[d] === void 0) {
          h(`agent node "${d}" is not in the graph`);
          break;
        }
        const p = {
          id: ri(c.id) ?? Ld("te_caal", s),
          from: f,
          to: d
        };
        t.toolEdges = [...t.toolEdges, p], a++;
        break;
      }
      default:
        h(`unsupported operation "${l.op}"`);
    }
  }
  return { graph: t, applied: a, skipped: o };
}
function Dd(i) {
  return i.map((e) => e.target ? `${e.op} on ${e.target} (${e.reason})` : `${e.op} (${e.reason})`).join("; ");
}
var X_ = /* @__PURE__ */ j('<span class="badge badge-error svelte-do6mn6"> </span>'), j_ = /* @__PURE__ */ j('<span class="badge badge-warn svelte-do6mn6"> </span>'), L_ = /* @__PURE__ */ j('<div class="issue issue-error svelte-do6mn6" role="button" tabindex="0"><span class="issue-icon svelte-do6mn6">✗</span> <span class="issue-msg svelte-do6mn6"> </span></div>'), I_ = /* @__PURE__ */ j('<div class="issue issue-warning svelte-do6mn6" role="button" tabindex="0"><span class="issue-icon svelte-do6mn6">⚠</span> <span class="issue-msg svelte-do6mn6"> </span></div>'), D_ = /* @__PURE__ */ j('<label class="ack-label svelte-do6mn6"><input type="checkbox" class="svelte-do6mn6"/> Acknowledge warnings and allow publish</label>'), z_ = /* @__PURE__ */ j('<div class="lint-panel svelte-do6mn6"><div class="lint-header svelte-do6mn6"><span class="lint-title svelte-do6mn6">Graph Issues</span> <!> <!></div> <div class="issue-list svelte-do6mn6"><!> <!></div> <!></div>');
function N_(i, e) {
  xt(e, !1);
  const t = () => ft(lt, "$graph", r), n = () => ft(eo, "$nodeTypes", r), s = () => ft(Jc, "$connections", r), [r, o] = _n(), a = /* @__PURE__ */ W(), l = /* @__PURE__ */ W(), h = /* @__PURE__ */ W(), c = /* @__PURE__ */ W();
  let f = /* @__PURE__ */ W(!1);
  Pn(() => {
    uO();
  });
  function d(k) {
    const R = [], T = /* @__PURE__ */ new Map();
    for (const D of k.edges) {
      const N = T.get(D.from) ?? [];
      N.push(D.to), T.set(D.from, N);
    }
    const M = /* @__PURE__ */ new Map();
    function C(D) {
      var N;
      M.set(D, "visiting");
      for (const Y of T.get(D) ?? [])
        if (M.get(Y) === "visiting") {
          const y = k.nodes[D];
          (y == null ? void 0 : y.type) !== "core:loop" && R.push({
            severity: "error",
            message: `Cycle edge from "${(y == null ? void 0 : y.label) ?? D}" to "${((N = k.nodes[Y]) == null ? void 0 : N.label) ?? Y}" is only legal when the source is a core:loop node — the engine silently skips it otherwise`,
            nodeId: D
          });
        } else M.has(Y) || C(Y);
      M.set(D, "done");
    }
    const z = k.entry ?? Object.keys(k.nodes)[0];
    return z && k.nodes[z] && C(z), R;
  }
  function p(k, R, T) {
    var z, D;
    const M = [], C = new Set(T.map((N) => N.id));
    for (const N of Object.values(k.nodes)) {
      const Y = R.find((_) => _.type === N.type), y = (D = (z = Y == null ? void 0 : Y.schema) == null ? void 0 : z.config) == null ? void 0 : D.properties;
      if (y)
        for (const [_, P] of Object.entries(y)) {
          if (P.format !== "connection") continue;
          const $ = N.config[_];
          (!$ || !C.has(String($))) && M.push({
            severity: "error",
            message: `Node "${N.label ?? N.id}" is missing a valid ${P.service ?? "integration"} connection for "${_}"`,
            nodeId: N.id
          });
        }
    }
    return M;
  }
  function O(k, R, T) {
    const M = [], C = Object.values(k.nodes), z = k.edges, D = new Set(R.map(($) => $.type));
    if (C.length === 0)
      return M.push({
        severity: "error",
        message: "Graph is empty — add at least a Start and End node"
      }), M;
    for (const $ of C)
      D.size > 0 && !D.has($.type) && M.push({
        severity: "error",
        message: `Node "${$.label ?? $.id}" has unknown type "${$.type}"`,
        nodeId: $.id
      });
    const N = k.entry ?? Object.keys(k.nodes)[0];
    k.nodes[N] || M.push({ severity: "error", message: "No entry node defined" });
    const Y = /* @__PURE__ */ new Set(), y = [N];
    for (; y.length > 0; ) {
      const $ = y.shift();
      if (!Y.has($)) {
        Y.add($);
        for (const X of z)
          X.from === $ && !Y.has(X.to) && y.push(X.to);
      }
    }
    for (const $ of C)
      Y.has($.id) || M.push({
        severity: "warning",
        message: `Node "${$.label ?? $.id}" is unreachable from the entry node`,
        nodeId: $.id
      });
    for (const $ of C) {
      const X = z.filter((J) => J.from === $.id);
      if (X.length === 0) continue;
      const Z = X.some((J) => J.type === "conditional"), H = X.some((J) => J.type === "fallback" || J.type === "unconditional");
      Z && !H && M.push({
        severity: "warning",
        message: `Node "${$.label ?? $.id}" has conditional edges but no fallback — some inputs may go unhandled`,
        nodeId: $.id
      });
    }
    const _ = /* @__PURE__ */ new Set(["core:end", "core:stop"]);
    for (const $ of C) {
      if (_.has($.type)) continue;
      z.filter((Z) => Z.from === $.id).length === 0 && M.push({
        severity: "warning",
        message: `Node "${$.label ?? $.id}" has no outbound edges and is not a terminal node`,
        nodeId: $.id
      });
    }
    const P = k.toolEdges ?? [];
    for (const $ of C) {
      if ($.type === "core:tool") {
        const X = z.filter((H) => H.from === $.id);
        X.length !== 1 && M.push({
          severity: "error",
          message: `Tool node "${$.label ?? $.id}" must have exactly one outbound flow edge (has ${X.length})`,
          nodeId: $.id
        }), P.filter((H) => H.from === $.id).length === 0 && M.push({
          severity: "error",
          message: `Tool node "${$.label ?? $.id}" must be connected to an agent node via a tool edge`,
          nodeId: $.id
        });
      }
      ($.type === "core:tool-call" || $.type === "core:react") && P.filter((Z) => Z.to === $.id).length === 0 && M.push({
        severity: "warning",
        message: `Agent node "${$.label ?? $.id}" (${$.type}) has no tools connected — it will only be able to generate text without tool invocations`,
        nodeId: $.id
      });
    }
    return M.push(...d(k)), M.push(...p(k, R, T)), M;
  }
  function g(k) {
    if (!k) return;
    const R = t().nodes[k];
    R && Bn.set(R);
  }
  qe(() => (t(), n(), s()), () => {
    S(a, O(t(), n(), s()));
  }), qe(() => u(a), () => {
    S(l, u(a).filter((k) => k.severity === "error"));
  }), qe(() => u(a), () => {
    S(h, u(a).filter((k) => k.severity === "warning"));
  }), qe(() => (u(l), u(h), u(f)), () => {
    S(c, u(l).length === 0 && (u(h).length === 0 || u(f)));
  }), Ci(), Tt();
  var m = Ii(), v = Ye(m);
  {
    var Q = (k) => {
      var R = z_(), T = x(R), M = w(x(T), 2);
      {
        var C = ($) => {
          var X = X_(), Z = x(X);
          B(() => V(Z, `${u(l), b(() => u(l).length) ?? ""} error${u(l), b(() => u(l).length !== 1 ? "s" : "") ?? ""}`)), E($, X);
        };
        F(M, ($) => {
          u(l), b(() => u(l).length > 0) && $(C);
        });
      }
      var z = w(M, 2);
      {
        var D = ($) => {
          var X = j_(), Z = x(X);
          B(() => V(Z, `${u(h), b(() => u(h).length) ?? ""} warning${u(h), b(() => u(h).length !== 1 ? "s" : "") ?? ""}`)), E($, X);
        };
        F(z, ($) => {
          u(h), b(() => u(h).length > 0) && $(D);
        });
      }
      var N = w(T, 2), Y = x(N);
      He(Y, 1, () => u(l), et, ($, X) => {
        var Z = L_(), H = w(x(Z), 2), J = x(H);
        B(() => V(J, (u(X), b(() => u(X).message)))), ee("click", Z, () => g(u(X).nodeId)), ee("keydown", Z, (te) => te.key === "Enter" && g(u(X).nodeId)), E($, Z);
      });
      var y = w(Y, 2);
      He(y, 1, () => u(h), et, ($, X) => {
        var Z = I_(), H = w(x(Z), 2), J = x(H);
        B(() => V(J, (u(X), b(() => u(X).message)))), ee("click", Z, () => g(u(X).nodeId)), ee("keydown", Z, (te) => te.key === "Enter" && g(u(X).nodeId)), E($, Z);
      });
      var _ = w(N, 2);
      {
        var P = ($) => {
          var X = D_(), Z = x(X);
          Lp(Z, () => u(f), (H) => S(f, H)), E($, X);
        };
        F(_, ($) => {
          u(l), u(h), b(() => u(l).length === 0 && u(h).length > 0) && $(P);
        });
      }
      E(k, R);
    };
    F(v, (k) => {
      u(a), b(() => u(a).length > 0) && k(Q);
    });
  }
  E(i, m), St(), o();
}
var Y_ = /* @__PURE__ */ j('<p class="empty-state svelte-28mxb5">No tools connected.<br/>Connect <code class="svelte-28mxb5">core:tool</code> or <code class="svelte-28mxb5">core:mcp-client</code> nodes via tool edges.</p>'), q_ = /* @__PURE__ */ j('<span class="tool-desc svelte-28mxb5"> </span>'), W_ = /* @__PURE__ */ j('<li class="tool-item svelte-28mxb5"><span class="tool-name svelte-28mxb5"> </span> <span class="tool-source svelte-28mxb5"> </span> <!></li>'), V_ = /* @__PURE__ */ j('<ul class="tool-list svelte-28mxb5"></ul>'), B_ = /* @__PURE__ */ j('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Name</span><code class="svelte-28mxb5"> </code></div>'), G_ = /* @__PURE__ */ j('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Description</span><span class="svelte-28mxb5"> </span></div>'), U_ = /* @__PURE__ */ j('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Connected to</span> <span class="svelte-28mxb5"> </span></div>'), F_ = /* @__PURE__ */ j('<div class="tool-detail svelte-28mxb5"><!> <!> <!></div>'), H_ = /* @__PURE__ */ j('<p class="empty-state svelte-28mxb5">Select an agent node (<code class="svelte-28mxb5">core:tool-call</code>, <code class="svelte-28mxb5">core:react</code>) or a tool node to inspect its tools.</p>'), K_ = /* @__PURE__ */ j('<div class="tool-panel svelte-28mxb5"><div class="panel-header svelte-28mxb5">TOOLS</div> <!></div>');
function J_(i, e) {
  xt(e, !1);
  const t = () => ft(Bn, "$selectedNode", s), n = () => ft(lt, "$graph", s), [s, r] = _n(), o = /* @__PURE__ */ W(), a = /* @__PURE__ */ W(), l = /* @__PURE__ */ W(), h = /* @__PURE__ */ W(), c = /* @__PURE__ */ W(), f = /* @__PURE__ */ new Set(["core:tool", "core:mcp-client"]), d = /* @__PURE__ */ new Set(["core:tool-call", "core:react"]);
  qe(() => t(), () => {
    var R;
    S(o, ((R = t()) == null ? void 0 : R.id) ?? null);
  }), qe(() => t(), () => {
    var R;
    S(a, ((R = t()) == null ? void 0 : R.type) ?? null);
  }), qe(() => (u(o), u(a), n()), () => {
    S(l, u(o) && d.has(u(a) ?? "") ? (n().toolEdges ?? []).filter((R) => R.to === u(o)).map((R) => {
      var M, C;
      const T = n().nodes[R.from];
      return {
        edge: R,
        node: T,
        name: T ? String(((M = T.config) == null ? void 0 : M.name) ?? T.type) : R.from,
        source: T ? T.type === "core:mcp-client" ? "MCP" : "Graph" : "Native",
        description: T ? (C = T.config) == null ? void 0 : C.description : void 0
      };
    }) : []);
  }), qe(() => (u(o), u(a), t()), () => {
    var R;
    S(h, u(o) && f.has(u(a) ?? "") ? (R = t()) == null ? void 0 : R.config : null);
  }), qe(() => (u(o), u(a), n()), () => {
    S(c, u(o) && f.has(u(a) ?? "") ? (n().toolEdges ?? []).filter((R) => R.from === u(o)).map((R) => n().nodes[R.to]).filter(Boolean) : []);
  }), Ci(), Tt();
  var p = K_(), O = w(x(p), 2);
  {
    var g = (R) => {
      var T = Ii(), M = Ye(T);
      {
        var C = (D) => {
          var N = Y_();
          E(D, N);
        }, z = (D) => {
          var N = V_();
          He(N, 5, () => u(l), et, (Y, y) => {
            let _ = () => u(y).name, P = () => u(y).source, $ = () => u(y).description;
            var X = W_(), Z = x(X), H = x(Z), J = w(Z, 2), te = x(J), he = w(J, 2);
            {
              var ue = (ie) => {
                var ce = q_(), ye = x(ce);
                B((re) => V(ye, re), [
                  () => ($(), b(() => String($())))
                ]), E(ie, ce);
              };
              F(he, (ie) => {
                $() && ie(ue);
              });
            }
            B(() => {
              V(H, _()), V(te, P());
            }), E(Y, X);
          }), E(D, N);
        };
        F(M, (D) => {
          u(l), b(() => u(l).length === 0) ? D(C) : D(z, -1);
        });
      }
      E(R, T);
    }, m = /* @__PURE__ */ ks(() => (u(a), b(() => d.has(u(a) ?? "")))), v = (R) => {
      var T = F_(), M = x(T);
      {
        var C = (y) => {
          var _ = B_(), P = w(x(_)), $ = x(P);
          B((X) => V($, X), [
            () => (u(h), b(() => String(u(h).name)))
          ]), E(y, _);
        };
        F(M, (y) => {
          u(h), b(() => u(h).name) && y(C);
        });
      }
      var z = w(M, 2);
      {
        var D = (y) => {
          var _ = G_(), P = w(x(_)), $ = x(P);
          B((X) => V($, X), [
            () => (u(h), b(() => String(u(h).description)))
          ]), E(y, _);
        };
        F(z, (y) => {
          u(h), b(() => u(h).description) && y(D);
        });
      }
      var N = w(z, 2);
      {
        var Y = (y) => {
          var _ = U_(), P = w(x(_), 2), $ = x(P);
          B((X) => V($, X), [
            () => (u(c), b(() => u(c).map((X) => (X == null ? void 0 : X.label) ?? (X == null ? void 0 : X.id)).join(", ")))
          ]), E(y, _);
        };
        F(N, (y) => {
          u(c), b(() => u(c).length > 0) && y(Y);
        });
      }
      E(R, T);
    }, Q = /* @__PURE__ */ ks(() => (u(a), u(h), b(() => f.has(u(a) ?? "") && u(h)))), k = (R) => {
      var T = H_();
      E(R, T);
    };
    F(O, (R) => {
      u(m) ? R(g) : u(Q) ? R(v, 1) : R(k, -1);
    });
  }
  E(i, p), St(), r();
}
var eP = /* @__PURE__ */ j('<div class="rationale svelte-1grl4xd"> </div>'), tP = /* @__PURE__ */ j('<code class="target svelte-1grl4xd"> </code>'), iP = /* @__PURE__ */ j('<span class="data-preview svelte-1grl4xd"> </span>'), nP = /* @__PURE__ */ j('<label class="patch-row svelte-1grl4xd"><input type="checkbox"/> <span class="op-label svelte-1grl4xd"> </span> <!> <!></label>'), sP = /* @__PURE__ */ j('<div class="proposal-card svelte-1grl4xd"><div class="proposal-header svelte-1grl4xd"><span class="complexity-badge svelte-1grl4xd"> </span> <span class="proposal-desc svelte-1grl4xd"> </span></div> <!> <div class="patches-list svelte-1grl4xd"></div> <div class="proposal-actions svelte-1grl4xd"><button class="btn-text svelte-1grl4xd">Accept All</button> <button class="btn-text svelte-1grl4xd">Reject All</button> <span class="spacer svelte-1grl4xd"></span> <button class="btn-secondary svelte-1grl4xd">Dismiss</button> <button class="btn-primary svelte-1grl4xd"> </button></div></div>');
function rP(i, e) {
  xt(e, !1);
  const t = /* @__PURE__ */ W();
  let n = Xe(e, "proposal", 8);
  const s = fl();
  let r = /* @__PURE__ */ W({});
  function o() {
    S(r, Object.fromEntries(n().patches.map((Y, y) => [y, !0])));
  }
  function a() {
    S(r, Object.fromEntries(n().patches.map((Y, y) => [y, !1])));
  }
  function l() {
    const Y = n().patches.filter((y, _) => u(r)[_]);
    Y.length !== 0 && s("apply", { ...n(), patches: Y });
  }
  function h() {
    s("reject");
  }
  const c = {
    targeted: "#22c55e",
    structural: "#f59e0b",
    replacement: "#ef4444"
  };
  function f(Y) {
    return {
      add_node: "+ Add node",
      update_node: "~ Update node",
      delete_node: "− Delete node",
      add_edge: "+ Add edge",
      delete_edge: "− Delete edge",
      add_tool_edge: "+ Add tool edge"
    }[Y] ?? Y;
  }
  qe(() => Ce(n()), () => {
    S(r, Object.fromEntries(n().patches.map((Y, y) => [y, !0])));
  }), qe(() => (Ce(n()), u(r)), () => {
    S(t, n().patches.filter((Y, y) => u(r)[y]).length);
  }), Ci(), Tt();
  var d = sP(), p = x(d), O = x(p), g = x(O), m = w(O, 2), v = x(m), Q = w(p, 2);
  {
    var k = (Y) => {
      var y = eP(), _ = x(y);
      B(() => V(_, (Ce(n()), b(() => n().rationale)))), E(Y, y);
    };
    F(Q, (Y) => {
      Ce(n()), b(() => n().rationale) && Y(k);
    });
  }
  var R = w(Q, 2);
  He(
    R,
    5,
    () => (Ce(n()), b(() => n().patches)),
    et,
    (Y, y, _) => {
      var P = nP(), $ = x(P), X = w($, 2), Z = x(X), H = w(X, 2);
      {
        var J = (ie) => {
          var ce = tP(), ye = x(ce);
          B(() => V(ye, (u(y), b(() => u(y).target)))), E(ie, ce);
        };
        F(H, (ie) => {
          u(y), b(() => u(y).target) && ie(J);
        });
      }
      var te = w(H, 2);
      {
        var he = (ie) => {
          var ce = iP(), ye = x(ce);
          B((re) => V(ye, `${re ?? ""}…`), [
            () => (u(y), b(() => JSON.stringify(u(y).data).slice(0, 60)))
          ]), E(ie, ce);
        }, ue = /* @__PURE__ */ ks(() => (u(y), b(() => u(y).data && Object.keys(u(y).data).length > 0)));
        F(te, (ie) => {
          u(ue) && ie(he);
        });
      }
      B((ie) => V(Z, ie), [
        () => (u(y), b(() => f(u(y).op)))
      ]), Lp($, () => u(r)[_], (ie) => Rn(r, u(r)[_] = ie)), E(Y, P);
    }
  );
  var T = w(R, 2), M = x(T), C = w(M, 2), z = w(C, 4), D = w(z, 2), N = x(D);
  B(() => {
    jp(O, `color: ${Ce(n()), b(() => c[n().complexity]) ?? ""}`), V(g, (Ce(n()), b(() => n().complexity))), V(v, (Ce(n()), b(() => n().description))), D.disabled = u(t) === 0, V(N, `Apply${u(t) > 0 ? ` ${u(t)}` : ""}`);
  }), ee("click", M, o), ee("click", C, a), ee("click", z, h), ee("click", D, l), E(i, d), St();
}
var oP = /* @__PURE__ */ j('<span class="option-desc svelte-1aodac8"> </span>'), aP = /* @__PURE__ */ j('<button class="option-btn svelte-1aodac8"><span class="option-label svelte-1aodac8"> </span> <!></button>'), lP = /* @__PURE__ */ j('<div class="options-card svelte-1aodac8"><div class="options-question svelte-1aodac8"> </div> <div class="options-list svelte-1aodac8"></div></div>');
function hP(i, e) {
  xt(e, !1);
  let t = Xe(e, "prompt", 8), n = Xe(e, "disabled", 8, !1);
  const s = fl();
  Tt();
  var r = lP(), o = x(r), a = x(o), l = w(o, 2);
  He(
    l,
    5,
    () => (Ce(t()), b(() => t().options)),
    (h) => h.value,
    (h, c) => {
      var f = aP(), d = x(f), p = x(d), O = w(d, 2);
      {
        var g = (m) => {
          var v = oP(), Q = x(v);
          B(() => V(Q, (u(c), b(() => u(c).description)))), E(m, v);
        };
        F(O, (m) => {
          u(c), b(() => u(c).description) && m(g);
        });
      }
      B(() => {
        f.disabled = n(), V(p, (u(c), b(() => u(c).label)));
      }), ee("click", f, () => s("choose", u(c))), E(h, f);
    }
  ), B(() => V(a, (Ce(t()), b(() => t().question)))), E(i, r), St();
}
const cP = ["explain", "question", "suggest", "modify"], fP = 4, uP = 200, zd = 60, dP = 160, pP = 2e3;
function zr(i, e) {
  if (typeof i != "string") return;
  const t = i.trim();
  return t.length > 0 ? t.slice(0, e) : void 0;
}
function OP(i, e) {
  if (typeof i != "object" || i === null) return null;
  const t = i, n = zr(t.question, uP);
  if (!n || !Array.isArray(t.options)) return null;
  const s = [], r = /* @__PURE__ */ new Set();
  for (const o of t.options) {
    if (typeof o != "object" || o === null) continue;
    const a = o, l = zr(a.label, zd), h = zr(a.value, zd);
    if (!l || !h || r.has(h)) continue;
    r.add(h);
    const c = zr(a.followUpMessage, pP), f = typeof a.followUpIntent == "string" ? a.followUpIntent : void 0, d = cP.includes(f) ? f : void 0;
    if (e.readonly && d === "modify") continue;
    const p = { label: l, value: h }, O = zr(a.description, dP);
    if (O && (p.description = O), c && d && (p.followUpMessage = c, p.followUpIntent = d), s.push(p), s.length === fP) break;
  }
  return s.length === 0 ? null : { question: n, options: s };
}
function gP(i) {
  const e = i.toLowerCase();
  return /\b(add|create|remove|delete|update|change|modify|rename|move|connect|disconnect)\b/.test(e) ? "modify" : /\b(suggest|improve|optimize|better|recommend|enhance)\b/.test(e) ? "suggest" : "question";
}
var mP = /* @__PURE__ */ j('<button class="icon-btn undo-btn svelte-vtqea" title="Undo last Caal change">↺ Undo</button>'), vP = /* @__PURE__ */ j('<button class="icon-btn svelte-vtqea" title="History">⏱</button>'), bP = /* @__PURE__ */ j('<div><span class="msg-content svelte-vtqea"> </span></div>'), yP = /* @__PURE__ */ j('<div class="history-view svelte-vtqea"><div class="history-header svelte-vtqea"><span class="svelte-vtqea">Conversation History</span> <button class="icon-btn svelte-vtqea">✕</button></div> <div class="messages-list svelte-vtqea"></div></div>'), wP = /* @__PURE__ */ j('<div class="empty-state svelte-vtqea"><!></div>'), xP = /* @__PURE__ */ j('<button class="node-chip svelte-vtqea"> </button>'), SP = /* @__PURE__ */ j('<span class="svelte-vtqea"> </span>'), kP = /* @__PURE__ */ j('<div class="msg-content svelte-vtqea"></div>'), QP = /* @__PURE__ */ j('<span class="msg-content svelte-vtqea"> </span>'), $P = /* @__PURE__ */ j("<div><!></div>"), _P = /* @__PURE__ */ j('<div class="message assistant thinking svelte-vtqea"><span class="dot svelte-vtqea"></span><span class="dot svelte-vtqea"></span><span class="dot svelte-vtqea"></span></div>'), PP = /* @__PURE__ */ j('<button class="quick-btn svelte-vtqea"> </button>'), TP = /* @__PURE__ */ j('<div class="messages-list svelte-vtqea"><!> <!> <!></div> <!> <!> <div class="quick-actions svelte-vtqea"></div> <div class="input-area svelte-vtqea"><textarea class="caal-input svelte-vtqea" placeholder="Ask Caal… (Enter to send, Shift+Enter for newline)"></textarea> <button class="send-btn svelte-vtqea">➤</button></div>', 1), CP = /* @__PURE__ */ j('<div class="context-bar svelte-vtqea"><span class="svelte-vtqea"> </span> <span class="sep svelte-vtqea">·</span> <span class="svelte-vtqea"> </span> <span class="sep svelte-vtqea">·</span> <span> </span></div> <!>', 1), ZP = /* @__PURE__ */ j('<div><div class="caal-header svelte-vtqea"><span class="caal-title svelte-vtqea"><span class="caal-dot svelte-vtqea"></span> Caal AI</span> <div class="header-actions svelte-vtqea"><!> <!> <button class="icon-btn svelte-vtqea"> </button></div></div> <!></div>');
function EP(i, e) {
  xt(e, !1);
  const t = () => ft(lt, "$graph", o), n = () => ft(Bn, "$selectedNode", o), s = () => ft(oi, "$runState", o), r = () => ft(Eo, "$canUndoCaalChange", o), [o, a] = _n(), l = /* @__PURE__ */ W();
  let h = Xe(e, "agentId", 8), c = Xe(e, "readonly", 8, !1), f = /* @__PURE__ */ W([]), d = /* @__PURE__ */ W(""), p = /* @__PURE__ */ W(!1), O = /* @__PURE__ */ W(null), g = /* @__PURE__ */ W(null), m = /* @__PURE__ */ W(null), v = /* @__PURE__ */ W(!0), Q = /* @__PURE__ */ W(!1), k = /* @__PURE__ */ W([]), R = /* @__PURE__ */ W(), T = "";
  const M = [
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
  async function C(K, oe) {
    var Me, je;
    if (!K.trim() || u(p)) return;
    const we = { role: "user", content: K, timestamp: Date.now() };
    S(f, [...u(f), we]), S(g, null), S(d, ""), S(p, !0), y();
    try {
      const Ge = {
        ...t(),
        // authoringMode lives on the agent record (App.svelte reads it into
        // `readonly`), never in the graph JSON — reading it off $graph always
        // produced 'studio', so the graph's own isCodeDefined checks could
        // never fire for a code-defined agent.
        authoringMode: c() ? "code-defined" : "studio"
      }, De = {
        message: K,
        graphState: Ge,
        selectedNodeIds: n() ? [n().id] : [],
        // Deliberately NOT sending the sessionId the API returned: invokeCaal
        // treats the field as a *client* id and namespaces it again, so
        // echoing back the server's already-namespaced value nested one
        // wrapper deeper on every turn and started a fresh session each
        // message (ISS-069, same double-wrap as loadHistory below). agentId
        // alone gives a stable per-user, per-agent session across turns.
        // Without this, invokeCaal's session-ID suffix falls back to
        // 'global', and every agent a user edits shares one Caal session
        // bucket instead of one per agent — also needed for loadHistory()'s
        // agentId-keyed lookup below to match the session that was actually
        // written (ISS-069).
        agentId: h(),
        intent: oe ?? gP(K),
        lastRunResult: s().status === "idle" ? null : {
          status: s().status,
          output: s().output,
          error: s().error
        }
      }, it = await fetch("/api/caal/invoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(De)
      }), Se = await it.json();
      if (Se.sessionId && S(m, Se.sessionId), Se.code === "CAAL_STILL_RUNNING") {
        S(f, [
          ...u(f),
          {
            role: "assistant",
            content: "Caal is taking longer than usual — your message may still be processed. Check History shortly.",
            timestamp: Date.now()
          }
        ]);
        return;
      }
      if (it.status === 504) {
        S(f, [
          ...u(f),
          {
            role: "assistant",
            content: "Caal is taking longer than usual — your message may still be processed. Check History shortly.",
            timestamp: Date.now()
          }
        ]);
        return;
      }
      if (!it.ok) throw new Error(`Caal invoke failed: ${it.status}`);
      const I = Se.output ?? {}, L = {
        role: "assistant",
        content: I.content ?? "",
        nodeReferences: I.nodeReferences ?? [],
        proposal: I.proposal,
        canvasHighlight: I.canvasHighlight,
        canvasFocus: I.canvasFocus,
        timestamp: Date.now()
      };
      S(f, [...u(f), L]), (je = (Me = I.proposal) == null ? void 0 : Me.patches) != null && je.length && S(O, I.proposal), S(g, OP(I.options, { readonly: c() })), I.canvasHighlight && z(I.canvasHighlight), I.canvasFocus && D(I.canvasFocus);
    } catch (Ge) {
      const De = {
        role: "assistant",
        content: `Error: ${Ge.message}`,
        timestamp: Date.now()
      };
      S(f, [...u(f), De]);
    } finally {
      S(p, !1), y();
    }
  }
  function z(K) {
    window.dispatchEvent(new CustomEvent("caal:canvas-highlight", { detail: K }));
  }
  function D(K) {
    window.dispatchEvent(new CustomEvent("caal:canvas-focus", { detail: K }));
  }
  function N(K) {
    window.dispatchEvent(new CustomEvent("caal:canvas-focus", { detail: { nodeId: K, zoom: 1.5 } })), window.dispatchEvent(new CustomEvent("caal:canvas-highlight", {
      detail: { nodeIds: [K], color: "#F59E0B", durationMs: 2e3 }
    }));
  }
  function Y(K) {
    const oe = [], we = /\[\[([^\]]+)\]\]/g;
    let Me = 0, je;
    for (; (je = we.exec(K)) !== null; )
      je.index > Me && oe.push({ type: "text", value: K.slice(Me, je.index) }), oe.push({ type: "chip", value: je[1] }), Me = je.index + je[0].length;
    return Me < K.length && oe.push({ type: "text", value: K.slice(Me) }), oe;
  }
  function y() {
    requestAnimationFrame(() => {
      u(R) && Rn(R, u(R).scrollTop = u(R).scrollHeight);
    });
  }
  function _(K) {
    K.key === "Enter" && !K.shiftKey && (K.preventDefault(), C(u(d)));
  }
  async function P() {
    if (u(m))
      try {
        const K = await fetch(`/api/caal/sessions/${encodeURIComponent(h())}`);
        if (K.ok) {
          const oe = await K.json();
          S(k, oe.messages ?? []), S(Q, !0);
        }
      } catch {
      }
  }
  function $(K) {
    const oe = K.detail;
    T = oe.description, window.dispatchEvent(new CustomEvent("caal:apply-proposal", { detail: oe })), S(O, null);
  }
  function X(K) {
    const { applied: oe, skipped: we } = K.detail, Me = T;
    T = "";
    const je = oe > 0 ? `Applied ${oe} change${oe === 1 ? "" : "s"} from "${Me}".` + (we.length ? ` Skipped ${we.length}: ${Dd(we)}.` : "") : `Nothing to apply from "${Me}".` + (we.length ? ` Skipped ${we.length}: ${Dd(we)}.` : "");
    S(f, [
      ...u(f),
      { role: "assistant", content: je, timestamp: Date.now() }
    ]), y();
  }
  function Z(K) {
    const oe = K.detail;
    if (S(g, null), oe.followUpMessage && oe.followUpIntent) {
      C(oe.followUpMessage, oe.followUpIntent);
      return;
    }
    S(f, [
      ...u(f),
      {
        role: "assistant",
        content: "Okay — nothing changed.",
        timestamp: Date.now()
      }
    ]), y();
  }
  Pn(() => {
    window.addEventListener("caal:proposal-applied", X);
  }), Yc(() => {
    window.removeEventListener("caal:proposal-applied", X);
  });
  function H() {
    const K = fO();
    K && S(f, [
      ...u(f),
      {
        role: "assistant",
        content: `Undid: ${K}`,
        timestamp: Date.now()
      }
    ]);
  }
  function J() {
    S(O, null);
  }
  qe(() => Ce(c()), () => {
    S(l, c() ? M.filter((K) => K.intent !== "modify") : M);
  }), Ci(), Tt();
  var te = ZP();
  let he;
  var ue = x(te), ie = w(x(ue), 2), ce = x(ie);
  {
    var ye = (K) => {
      var oe = mP();
      ee("click", oe, H), E(K, oe);
    };
    F(ce, (K) => {
      r() && K(ye);
    });
  }
  var re = w(ce, 2);
  {
    var xe = (K) => {
      var oe = vP();
      ee("click", oe, P), E(K, oe);
    };
    F(re, (K) => {
      u(m) && K(xe);
    });
  }
  var Pe = w(re, 2), pe = x(Pe), Oe = w(ue, 2);
  {
    var de = (K) => {
      var oe = CP(), we = Ye(oe), Me = x(we), je = x(Me), Ge = w(Me, 4), De = x(Ge), it = w(Ge, 4), Se = x(it), I = w(we, 2);
      {
        var L = (le) => {
          var _e = yP(), Ve = x(_e), Qe = w(x(Ve), 2), U = w(Ve, 2);
          He(U, 5, () => u(k), et, (fe, be) => {
            var Le = bP(), Te = x(Le), Ze = x(Te);
            B(() => {
              Jt(Le, 1, `message ${u(be), b(() => u(be).role) ?? ""}`, "svelte-vtqea"), V(Ze, (u(be), b(() => u(be).content)));
            }), E(fe, Le);
          }), ee("click", Qe, () => S(Q, !1)), E(le, _e);
        }, ne = (le) => {
          var _e = TP(), Ve = Ye(_e), Qe = x(Ve);
          {
            var U = (ze) => {
              var ut = wP(), di = x(ut);
              {
                var es = (mt) => {
                  var Qt = Lh("Ask Caal to explain this agent. Modification isn't supported for code-defined agents yet — edit the source file directly.");
                  E(mt, Qt);
                }, kt = (mt) => {
                  var Qt = Lh("Ask Caal to explain, improve, or modify this agent graph.");
                  E(mt, Qt);
                };
                F(di, (mt) => {
                  c() ? mt(es) : mt(kt, -1);
                });
              }
              E(ze, ut);
            };
            F(Qe, (ze) => {
              u(f), b(() => u(f).length === 0) && ze(U);
            });
          }
          var fe = w(Qe, 2);
          He(fe, 1, () => u(f), et, (ze, ut) => {
            var di = $P(), es = x(di);
            {
              var kt = (Qt) => {
                var dn = kP();
                He(
                  dn,
                  5,
                  () => (u(ut), b(() => Y(u(ut).content))),
                  et,
                  (Xt, Wi) => {
                    var Er = Ii(), Do = Ye(Er);
                    {
                      var Zl = (Cn) => {
                        var Zn = xP(), Ar = x(Zn);
                        B(() => V(Ar, (u(Wi), b(() => u(Wi).value)))), ee("click", Zn, () => N(u(Wi).value)), E(Cn, Zn);
                      }, zo = (Cn) => {
                        var Zn = SP(), Ar = x(Zn);
                        B(() => V(Ar, (u(Wi), b(() => u(Wi).value)))), E(Cn, Zn);
                      };
                      F(Do, (Cn) => {
                        u(Wi), b(() => u(Wi).type === "chip") ? Cn(Zl) : Cn(zo, -1);
                      });
                    }
                    E(Xt, Er);
                  }
                ), E(Qt, dn);
              }, mt = (Qt) => {
                var dn = QP(), Xt = x(dn);
                B(() => V(Xt, (u(ut), b(() => u(ut).content)))), E(Qt, dn);
              };
              F(es, (Qt) => {
                u(ut), b(() => u(ut).role === "assistant") ? Qt(kt) : Qt(mt, -1);
              });
            }
            B(() => Jt(di, 1, `message ${u(ut), b(() => u(ut).role) ?? ""}`, "svelte-vtqea")), E(ze, di);
          });
          var be = w(fe, 2);
          {
            var Le = (ze) => {
              var ut = _P();
              E(ze, ut);
            };
            F(be, (ze) => {
              u(p) && ze(Le);
            });
          }
          Vc(Ve, (ze) => S(R, ze), () => u(R));
          var Te = w(Ve, 2);
          {
            var Ze = (ze) => {
              rP(ze, {
                get proposal() {
                  return u(O);
                },
                $$events: { apply: $, reject: J }
              });
            };
            F(Te, (ze) => {
              u(O) && ze(Ze);
            });
          }
          var Fe = w(Te, 2);
          {
            var ot = (ze) => {
              hP(ze, {
                get prompt() {
                  return u(g);
                },
                get disabled() {
                  return u(p);
                },
                $$events: { choose: Z }
              });
            };
            F(Fe, (ze) => {
              u(g) && ze(ot);
            });
          }
          var at = w(Fe, 2);
          He(at, 5, () => u(l), et, (ze, ut) => {
            var di = PP(), es = x(di);
            B(() => {
              di.disabled = u(p), V(es, (u(ut), b(() => u(ut).label)));
            }), ee("click", di, () => C(u(ut).prompt, u(ut).intent)), E(ze, di);
          });
          var Zr = w(at, 2), gt = x(Zr);
          nt(gt, "rows", 2);
          var Jn = w(gt, 2);
          B(
            (ze) => {
              gt.disabled = u(p), Jn.disabled = ze;
            },
            [
              () => (u(p), u(d), b(() => u(p) || !u(d).trim()))
            ]
          ), Nt(gt, () => u(d), (ze) => S(d, ze)), ee("keydown", gt, _), ee("click", Jn, () => C(u(d))), E(le, _e);
        };
        F(I, (le) => {
          u(Q) ? le(L) : le(ne, -1);
        });
      }
      B(
        (le, _e) => {
          V(je, `${le ?? ""} node${_e ?? ""}`), V(De, (n(), b(() => n() ? n().label || n().type : "no selection"))), Jt(it, 1, `run-status run-status-${s(), b(() => s().status) ?? ""}`, "svelte-vtqea"), V(Se, `last run: ${s(), b(() => s().status) ?? ""}`);
        },
        [
          () => (t(), b(() => Object.keys(t().nodes ?? {}).length)),
          () => (t(), b(() => Object.keys(t().nodes ?? {}).length === 1 ? "" : "s"))
        ]
      ), E(K, oe);
    };
    F(Oe, (K) => {
      u(v) && K(de);
    });
  }
  B(() => {
    he = Jt(te, 1, "caal-panel svelte-vtqea", null, he, { collapsed: !u(v) }), V(pe, u(v) ? "▼" : "▲");
  }), ee("click", Pe, () => S(v, !u(v))), E(i, te), St(), a();
}
var AP = /* @__PURE__ */ j('<span class="sync-time svelte-ra0acr"> </span>'), RP = /* @__PURE__ */ j('<div class="code-banner svelte-ra0acr"><span class="icon svelte-ra0acr">⟨/⟩</span> <div class="text svelte-ra0acr"><span class="label svelte-ra0acr">Code-defined agent</span> <span class="handle svelte-ra0acr"> </span></div> <!> <a class="sync-link svelte-ra0acr" href="/admin/system/sync">Sync log</a></div>');
function MP(i, e) {
  xt(e, !1);
  let t = Xe(e, "handle", 8), n = Xe(e, "lastSyncAt", 8, null);
  Tt();
  var s = RP(), r = w(x(s), 2), o = w(x(r), 2), a = x(o), l = w(r, 2);
  {
    var h = (c) => {
      var f = AP(), d = x(f);
      B((p) => V(d, `Synced ${p ?? ""}`), [
        () => (Ce(n()), b(() => new Date(n()).toLocaleTimeString()))
      ]), E(c, f);
    };
    F(l, (c) => {
      n() && c(h);
    });
  }
  B(() => V(a, t())), E(i, s), St();
}
var XP = /* @__PURE__ */ j('<div class="loading svelte-1pzk804">Loading…</div>'), jP = /* @__PURE__ */ j('<div class="error svelte-1pzk804"> </div>'), LP = /* @__PURE__ */ j('<div class="empty svelte-1pzk804">No context entries yet.</div>'), IP = /* @__PURE__ */ j('<span class="count svelte-1pzk804"> </span>'), DP = /* @__PURE__ */ j('<div class="entry svelte-1pzk804"><div class="entry-header svelte-1pzk804"><code class="entry-key svelte-1pzk804"> </code> <span class="acc-type svelte-1pzk804"> </span> <!> <span class="tokens svelte-1pzk804"> </span></div> <pre class="entry-value svelte-1pzk804"> </pre></div>'), zP = /* @__PURE__ */ j('<div class="entries svelte-1pzk804"></div>'), NP = /* @__PURE__ */ j('<div class="panel-body svelte-1pzk804"><div class="session-id-row svelte-1pzk804"><span class="label svelte-1pzk804">Session</span> <code class="sid svelte-1pzk804"> </code> <button class="refresh-btn svelte-1pzk804">↻</button></div> <!></div>'), YP = /* @__PURE__ */ j('<div class="session-panel svelte-1pzk804"><button class="panel-header svelte-1pzk804"><span>Session Context</span> <span class="toggle svelte-1pzk804"> </span></button> <!></div>');
function qP(i, e) {
  xt(e, !1);
  let t = Xe(e, "agentId", 8), n = Xe(e, "sessionId", 8, null), s = /* @__PURE__ */ W(!1), r = /* @__PURE__ */ W(!1), o = /* @__PURE__ */ W([]), a = /* @__PURE__ */ W(null);
  async function l() {
    if (!(!t() || !n())) {
      S(r, !0), S(a, null);
      try {
        const O = await fetch(`/api/agents/${t()}/sessions/${encodeURIComponent(n())}`);
        if (!O.ok) throw new Error(`${O.status}`);
        const g = await O.json();
        S(o, Object.entries(g.contextEntries ?? {}).map(([m, v]) => ({
          key: m,
          value: v.value,
          accumulationType: v.accumulationType,
          count: Array.isArray(v.value) ? v.value.length : void 0
        })));
      } catch (O) {
        S(a, O.message);
      } finally {
        S(r, !1);
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
  qe(() => (Ce(n()), u(s)), () => {
    n() && u(s) && l();
  }), Ci(), Tt();
  var f = Ii(), d = Ye(f);
  {
    var p = (O) => {
      var g = YP(), m = x(g), v = w(x(m), 2), Q = x(v), k = w(m, 2);
      {
        var R = (T) => {
          var M = NP(), C = x(M), z = w(x(C), 2), D = x(z), N = w(z, 2), Y = w(C, 2);
          {
            var y = (X) => {
              var Z = XP();
              E(X, Z);
            }, _ = (X) => {
              var Z = jP(), H = x(Z);
              B(() => V(H, u(a))), E(X, Z);
            }, P = (X) => {
              var Z = LP();
              E(X, Z);
            }, $ = (X) => {
              var Z = zP();
              He(Z, 5, () => u(o), et, (H, J) => {
                var te = DP(), he = x(te), ue = x(he), ie = x(ue), ce = w(ue, 2), ye = x(ce), re = w(ce, 2);
                {
                  var xe = (K) => {
                    var oe = IP(), we = x(oe);
                    B(() => V(we, `${u(J), b(() => u(J).count) ?? ""} items`)), E(K, oe);
                  };
                  F(re, (K) => {
                    u(J), b(() => u(J).count !== void 0) && K(xe);
                  });
                }
                var Pe = w(re, 2), pe = x(Pe), Oe = w(he, 2), de = x(Oe);
                B(
                  (K, oe) => {
                    V(ie, (u(J), b(() => u(J).key))), V(ye, (u(J), b(() => u(J).accumulationType))), V(pe, `~${K ?? ""}t`), V(de, oe);
                  },
                  [
                    () => (u(J), b(() => h(u(J).value))),
                    () => (u(J), b(() => c(u(J).value)))
                  ]
                ), E(H, te);
              }), E(X, Z);
            };
            F(Y, (X) => {
              u(r) ? X(y) : u(a) ? X(_, 1) : (u(o), b(() => u(o).length === 0) ? X(P, 2) : X($, -1));
            });
          }
          B(() => {
            V(D, n()), N.disabled = u(r);
          }), ee("click", N, l), E(T, M);
        };
        F(k, (T) => {
          u(s) && T(R);
        });
      }
      B(() => V(Q, u(s) ? "▼" : "▶")), ee("click", m, () => {
        S(s, !u(s));
      }), E(O, g);
    };
    F(d, (O) => {
      n() && O(p);
    });
  }
  E(i, f), St();
}
var WP = /* @__PURE__ */ j('<div class="loading svelte-ojvpsl">Loading…</div>'), VP = /* @__PURE__ */ j('<div class="error svelte-ojvpsl"> </div>'), BP = /* @__PURE__ */ j('<div class="empty svelte-ojvpsl">No prompts defined.</div>'), GP = /* @__PURE__ */ j('<span class="active-label svelte-ojvpsl">active</span>'), UP = /* @__PURE__ */ j('<button class="promote-btn svelte-ojvpsl">Promote</button>'), FP = /* @__PURE__ */ j('<button class="diff-btn svelte-ojvpsl">Diff</button>'), HP = /* @__PURE__ */ j('<div><span class="vnum svelte-ojvpsl"> </span> <!> <!> <span class="version-date svelte-ojvpsl"> </span></div> <pre class="version-preview svelte-ojvpsl"> </pre>', 1), KP = /* @__PURE__ */ j('<div class="versions-list svelte-ojvpsl"></div>'), JP = /* @__PURE__ */ j('<div class="prompt-item svelte-ojvpsl"><button class="prompt-name svelte-ojvpsl"><span></span> <span> </span> <span class="version-count svelte-ojvpsl"> </span> <span class="chevron svelte-ojvpsl"> </span></button> <!></div>'), e2 = /* @__PURE__ */ j('<div class="prompts-list svelte-ojvpsl"></div>'), t2 = /* @__PURE__ */ j('<div class="panel-body svelte-ojvpsl"><!> <button class="new-btn svelte-ojvpsl">+ New Version</button></div>'), i2 = /* @__PURE__ */ j('<div class="modal-overlay svelte-ojvpsl"><div class="modal svelte-ojvpsl"><h3 class="svelte-ojvpsl">New Prompt Version</h3> <label class="svelte-ojvpsl">Prompt Name <input placeholder="e.g. system-prompt" class="svelte-ojvpsl"/></label> <label class="svelte-ojvpsl">Content <textarea placeholder="Prompt content…" class="svelte-ojvpsl"></textarea></label> <div class="modal-actions svelte-ojvpsl"><button class="btn-secondary svelte-ojvpsl">Cancel</button> <button class="btn-primary svelte-ojvpsl">Create</button></div></div></div>'), n2 = /* @__PURE__ */ j('<div class="modal-overlay svelte-ojvpsl"><div class="modal diff-modal svelte-ojvpsl"><h3 class="svelte-ojvpsl"> </h3> <div class="diff-grid svelte-ojvpsl"><div class="diff-col svelte-ojvpsl"><div class="diff-label svelte-ojvpsl"> </div> <pre class="svelte-ojvpsl"> </pre></div> <div class="diff-col svelte-ojvpsl"><div class="diff-label svelte-ojvpsl"> </div> <pre class="svelte-ojvpsl"> </pre></div></div> <div class="modal-actions svelte-ojvpsl"><button class="btn-secondary svelte-ojvpsl">Close</button> <button class="btn-primary svelte-ojvpsl"> </button></div></div></div>'), s2 = /* @__PURE__ */ j('<div class="prompt-panel svelte-ojvpsl"><button class="panel-header svelte-ojvpsl"><span>Prompt Versions</span> <span class="toggle svelte-ojvpsl"> </span></button> <!></div> <!> <!>', 1);
function r2(i, e) {
  xt(e, !1), Xe(e, "agentId", 8);
  let t = /* @__PURE__ */ W(!1), n = /* @__PURE__ */ W(!1), s = /* @__PURE__ */ W([]), r = /* @__PURE__ */ W(/* @__PURE__ */ new Set()), o = /* @__PURE__ */ W(""), a = /* @__PURE__ */ W(""), l = /* @__PURE__ */ W(!1), h = /* @__PURE__ */ W(null), c = /* @__PURE__ */ W(null);
  async function f() {
    S(n, !0), S(c, null);
    try {
      const y = await fetch("/api/prompts");
      if (!y.ok) throw new Error(`${y.status}`);
      const _ = await y.json();
      S(s, _.map((P) => ({ name: P.name, activeVersion: P, versions: [] })));
    } catch (y) {
      S(c, y.message);
    } finally {
      S(n, !1);
    }
  }
  async function d(y) {
    const _ = await fetch(`/api/prompts/${encodeURIComponent(y)}/versions`);
    if (!_.ok) throw new Error(`${_.status}`);
    const P = await _.json();
    S(s, u(s).map(($) => $.name === y ? { ...$, versions: P } : $));
  }
  async function p(y, _) {
    try {
      const P = await fetch(`/api/prompts/${encodeURIComponent(y)}/versions/${_}/promote`, { method: "POST" });
      if (!P.ok) throw new Error(`${P.status}`);
      await f(), u(r).has(y) && await d(y);
    } catch (P) {
      S(c, P.message);
    }
  }
  async function O() {
    if (!(!u(o) || !u(a)))
      try {
        const y = await fetch("/api/prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: u(o),
            content: u(a)
          })
        });
        if (!y.ok) throw new Error(`${y.status}`);
        const _ = u(o);
        S(l, !1), S(o, ""), S(a, ""), await f(), u(r).has(_) && await d(_);
      } catch (y) {
        S(c, y.message);
      }
  }
  async function g(y) {
    if (u(r).has(y)) {
      u(r).delete(y), S(r, new Set(u(r)));
      return;
    }
    u(r).add(y), S(r, new Set(u(r)));
    try {
      await d(y);
    } catch (_) {
      S(c, _.message);
    }
  }
  function m(y, _, P) {
    S(h, { name: y, v1: _, v2: P });
  }
  qe(() => (u(t), u(s)), () => {
    u(t) && u(s).length === 0 && f();
  }), Ci(), Tt();
  var v = s2(), Q = Ye(v), k = x(Q), R = w(x(k), 2), T = x(R), M = w(k, 2);
  {
    var C = (y) => {
      var _ = t2(), P = x(_);
      {
        var $ = (te) => {
          var he = WP();
          E(te, he);
        }, X = (te) => {
          var he = VP(), ue = x(he);
          B(() => V(ue, u(c))), E(te, he);
        }, Z = (te) => {
          var he = BP();
          E(te, he);
        }, H = (te) => {
          var he = e2();
          He(he, 5, () => u(s), et, (ue, ie) => {
            var ce = JP(), ye = x(ce), re = x(ye);
            let xe;
            var Pe = w(re, 2), pe = x(Pe), Oe = w(Pe, 2), de = x(Oe), K = w(Oe, 2), oe = x(K), we = w(ye, 2);
            {
              var Me = (Ge) => {
                var De = KP();
                He(De, 5, () => (u(ie), b(() => u(ie).versions ?? [])), et, (it, Se) => {
                  var I = HP(), L = Ye(I);
                  let ne;
                  var le = x(L), _e = x(le), Ve = w(le, 2);
                  {
                    var Qe = (ot) => {
                      var at = GP();
                      E(ot, at);
                    }, U = (ot) => {
                      var at = UP();
                      ee("click", at, () => p(u(ie).name, u(Se).id)), E(ot, at);
                    };
                    F(Ve, (ot) => {
                      u(Se), b(() => u(Se).isActive) ? ot(Qe) : ot(U, -1);
                    });
                  }
                  var fe = w(Ve, 2);
                  {
                    var be = (ot) => {
                      var at = FP();
                      ee("click", at, () => m(u(ie).name, u(ie).activeVersion, u(Se))), E(ot, at);
                    };
                    F(fe, (ot) => {
                      u(ie), u(Se), b(() => u(ie).activeVersion && !u(Se).isActive) && ot(be);
                    });
                  }
                  var Le = w(fe, 2), Te = x(Le), Ze = w(L, 2), Fe = x(Ze);
                  B(
                    (ot, at) => {
                      ne = Jt(L, 1, "version-row svelte-ojvpsl", null, ne, { active: u(Se).isActive }), V(_e, `v${u(Se), b(() => u(Se).versionNumber) ?? ""}`), V(Te, ot), V(Fe, `${at ?? ""}${u(Se), b(() => u(Se).content.length > 120 ? "…" : "") ?? ""}`);
                    },
                    [
                      () => (u(Se), b(() => new Date(u(Se).createdAt).toLocaleDateString())),
                      () => (u(Se), b(() => u(Se).content.slice(0, 120)))
                    ]
                  ), E(it, I);
                }), E(Ge, De);
              }, je = /* @__PURE__ */ ks(() => (u(r), u(ie), b(() => u(r).has(u(ie).name))));
              F(we, (Ge) => {
                u(je) && Ge(Me);
              });
            }
            B(
              (Ge) => {
                xe = Jt(re, 1, "active-dot svelte-ojvpsl", null, xe, { active: u(ie).activeVersion !== null }), V(pe, (u(ie), b(() => u(ie).name))), V(de, `v${u(ie), b(() => {
                  var De;
                  return ((De = u(ie).activeVersion) == null ? void 0 : De.versionNumber) ?? "—";
                }) ?? ""}`), V(oe, Ge);
              },
              [
                () => (u(r), u(ie), b(() => u(r).has(u(ie).name) ? "▼" : "▶"))
              ]
            ), ee("click", ye, () => g(u(ie).name)), E(ue, ce);
          }), E(te, he);
        };
        F(P, (te) => {
          u(n) ? te($) : u(c) ? te(X, 1) : (u(s), b(() => u(s).length === 0) ? te(Z, 2) : te(H, -1));
        });
      }
      var J = w(P, 2);
      ee("click", J, () => S(l, !0)), E(y, _);
    };
    F(M, (y) => {
      u(t) && y(C);
    });
  }
  var z = w(Q, 2);
  {
    var D = (y) => {
      var _ = i2(), P = x(_), $ = w(x(P), 2), X = w(x($)), Z = w($, 2), H = w(x(Z));
      nt(H, "rows", 6);
      var J = w(Z, 2), te = x(J), he = w(te, 2);
      Nt(X, () => u(o), (ue) => S(o, ue)), Nt(H, () => u(a), (ue) => S(a, ue)), ee("click", te, () => S(l, !1)), ee("click", he, O), ee("click", _, Dh(() => S(l, !1))), E(y, _);
    };
    F(z, (y) => {
      u(l) && y(D);
    });
  }
  var N = w(z, 2);
  {
    var Y = (y) => {
      var _ = n2(), P = x(_), $ = x(P), X = x($), Z = w($, 2), H = x(Z), J = x(H), te = x(J), he = w(J, 2), ue = x(he), ie = w(H, 2), ce = x(ie), ye = x(ce), re = w(ce, 2), xe = x(re), Pe = w(Z, 2), pe = x(Pe), Oe = w(pe, 2), de = x(Oe);
      B(() => {
        V(X, `Diff: ${u(h), b(() => u(h).name) ?? ""}`), V(te, `Active (v${u(h), b(() => u(h).v1.versionNumber) ?? ""})`), V(ue, (u(h), b(() => u(h).v1.content))), V(ye, `v${u(h), b(() => u(h).v2.versionNumber) ?? ""}`), V(xe, (u(h), b(() => u(h).v2.content))), V(de, `Promote v${u(h), b(() => u(h).v2.versionNumber) ?? ""}`);
      }), ee("click", pe, () => S(h, null)), ee("click", Oe, () => {
        p(u(h).name, u(h).v2.id), S(h, null);
      }), ee("click", _, Dh(() => S(h, null))), E(y, _);
    };
    F(N, (y) => {
      u(h) && y(Y);
    });
  }
  B(() => V(T, u(t) ? "▼" : "▶")), ee("click", k, () => {
    S(t, !u(t));
  }), E(i, v), St();
}
var o2 = /* @__PURE__ */ j('<span class="badge svelte-1bw2oss"> </span>'), a2 = /* @__PURE__ */ j("<div> <!></div>"), l2 = /* @__PURE__ */ j('<div class="loading svelte-1bw2oss">Loading…</div>'), h2 = /* @__PURE__ */ j('<div class="error svelte-1bw2oss"> </div>'), c2 = /* @__PURE__ */ j('<div class="empty svelte-1bw2oss">No test cases yet.</div>'), f2 = /* @__PURE__ */ j('<span class="running-indicator svelte-1bw2oss">⟳</span>'), u2 = /* @__PURE__ */ j('<div class="case-row svelte-1bw2oss"><span></span> <span class="case-name svelte-1bw2oss"> </span> <span class="assertion-count svelte-1bw2oss"> </span> <!> <button class="delete-btn svelte-1bw2oss">✕</button></div>'), d2 = /* @__PURE__ */ j('<div class="cases-list svelte-1bw2oss"></div>'), p2 = /* @__PURE__ */ j('<div class="panel-body svelte-1bw2oss"><!> <!> <div class="panel-actions svelte-1bw2oss"><button class="new-btn svelte-1bw2oss">+ New Test</button> <button class="run-btn svelte-1bw2oss"> </button></div></div>'), O2 = /* @__PURE__ */ j('<input placeholder="Expected value (JSON or string)" class="svelte-1bw2oss"/>'), g2 = /* @__PURE__ */ j('<label class="inline svelte-1bw2oss">Threshold <input type="number" min="0" max="1" step="0.05" style="width: 70px;" class="svelte-1bw2oss"/></label>'), m2 = /* @__PURE__ */ j('<div class="modal-overlay svelte-1bw2oss"><div class="modal svelte-1bw2oss"><h3 class="svelte-1bw2oss">New Test Case</h3> <label class="svelte-1bw2oss">Name <input placeholder="Test case name" class="svelte-1bw2oss"/></label> <label class="svelte-1bw2oss">Input JSON <textarea class="mono svelte-1bw2oss"></textarea></label> <div class="assertion-builder svelte-1bw2oss"><div class="assertion-header svelte-1bw2oss">Assertion</div> <div class="assertion-row svelte-1bw2oss"><select class="svelte-1bw2oss"><option>Exact Match</option><option>Schema</option><option>Score Threshold</option></select> <input placeholder="Output key, e.g. output.text" class="svelte-1bw2oss"/></div> <!></div> <div class="modal-actions svelte-1bw2oss"><button class="btn-secondary svelte-1bw2oss">Cancel</button> <button class="btn-primary svelte-1bw2oss">Create</button></div></div></div>'), v2 = /* @__PURE__ */ j('<div class="test-panel svelte-1bw2oss"><button class="panel-header svelte-1bw2oss"><span>Test Cases</span> <!> <span class="toggle svelte-1bw2oss"> </span></button> <!></div> <!>', 1);
function b2(i, e) {
  xt(e, !1);
  let t = Xe(e, "agentId", 8);
  function n(_) {
    if (!_) return null;
    try {
      return JSON.parse(_);
    } catch {
      return null;
    }
  }
  let s = /* @__PURE__ */ W(!1), r = /* @__PURE__ */ W(!1), o = /* @__PURE__ */ W(null), a = /* @__PURE__ */ W(!1), l = /* @__PURE__ */ W([]), h = /* @__PURE__ */ W(null), c = /* @__PURE__ */ W(!1), f = /* @__PURE__ */ W(null), d = /* @__PURE__ */ W({
    name: "",
    inputJson: `{
  
}`,
    assertionType: "exact_match",
    assertionKey: "",
    assertionExpected: "",
    assertionThreshold: 0.8
  });
  async function p() {
    if (t()) {
      S(r, !0), S(f, null);
      try {
        const _ = await fetch(`/api/agents/${t()}/test-cases`);
        if (!_.ok) throw new Error(`${_.status}`);
        const P = await _.json();
        S(l, P.map(($) => ({
          id: $.id,
          name: $.name,
          inputJson: $.inputJson,
          assertions: n($.assertionsJson) ?? [],
          lastResult: n($.lastResult),
          createdAt: $.createdAt
        })));
      } catch (_) {
        S(f, _.message);
      } finally {
        S(o, t()), S(r, !1);
      }
    }
  }
  async function O() {
    S(a, !0), S(h, null), S(f, null);
    try {
      const _ = await fetch(`/api/agents/${t()}/test-cases/run`, { method: "POST" });
      if (!_.ok) throw new Error(`${_.status}`);
      S(h, await _.json()), await p();
    } catch (_) {
      S(f, _.message);
    } finally {
      S(a, !1);
    }
  }
  async function g() {
    try {
      const _ = {
        type: u(d).assertionType,
        key: u(d).assertionKey
      };
      if (u(d).assertionType === "exact_match")
        try {
          _.expected = JSON.parse(u(d).assertionExpected);
        } catch {
          _.expected = u(d).assertionExpected;
        }
      else u(d).assertionType === "evaluate_score" && (_.threshold = u(d).assertionThreshold);
      const P = await fetch(`/api/agents/${t()}/test-cases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: u(d).name,
          inputJson: u(d).inputJson,
          assertionsJson: JSON.stringify([_])
        })
      });
      if (!P.ok) throw new Error(`${P.status}`);
      S(c, !1), S(d, {
        name: "",
        inputJson: `{
  
}`,
        assertionType: "exact_match",
        assertionKey: "",
        assertionExpected: "",
        assertionThreshold: 0.8
      }), await p();
    } catch (_) {
      S(f, _.message);
    }
  }
  async function m(_) {
    try {
      await fetch(`/api/agents/${t()}/test-cases/${_}`, { method: "DELETE" }), await p();
    } catch {
    }
  }
  function v(_) {
    return `${_.passed}/${_.total}`;
  }
  qe(
    () => (u(s), u(o), Ce(t()), u(r)),
    () => {
      u(s) && u(o) !== t() && !u(r) && p();
    }
  ), Ci(), Tt();
  var Q = v2(), k = Ye(Q), R = x(k), T = w(x(R), 2);
  {
    var M = (_) => {
      var P = o2(), $ = x(P);
      B(() => V($, (u(l), b(() => u(l).length)))), E(_, P);
    };
    F(T, (_) => {
      u(l), b(() => u(l).length > 0) && _(M);
    });
  }
  var C = w(T, 2), z = x(C), D = w(R, 2);
  {
    var N = (_) => {
      var P = p2(), $ = x(P);
      {
        var X = (re) => {
          var xe = a2();
          let Pe;
          var pe = x(xe), Oe = w(pe);
          {
            var de = (K) => {
              var oe = Lh();
              B(() => V(oe, `— ${u(h), b(() => u(h).failed) ?? ""} failed`)), E(K, oe);
            };
            F(Oe, (K) => {
              u(h), b(() => u(h).failed > 0) && K(de);
            });
          }
          B(
            (K) => {
              Pe = Jt(xe, 1, "suite-summary svelte-1bw2oss", null, Pe, {
                passed: u(h).failed === 0,
                failed: u(h).failed > 0
              }), V(pe, `Suite: ${K ?? ""} passed `);
            },
            [
              () => (u(h), b(() => v(u(h))))
            ]
          ), E(re, xe);
        };
        F($, (re) => {
          u(h) && re(X);
        });
      }
      var Z = w($, 2);
      {
        var H = (re) => {
          var xe = l2();
          E(re, xe);
        }, J = (re) => {
          var xe = h2(), Pe = x(xe);
          B(() => V(Pe, u(f))), E(re, xe);
        }, te = (re) => {
          var xe = c2();
          E(re, xe);
        }, he = (re) => {
          var xe = d2();
          He(xe, 5, () => u(l), et, (Pe, pe) => {
            const Oe = /* @__PURE__ */ _t(() => (u(h), u(pe), b(() => {
              var I, L;
              return (L = (I = u(h)) == null ? void 0 : I.results) == null ? void 0 : L.find((ne) => ne.id === u(pe).id);
            })));
            var de = u2(), K = x(de);
            let oe;
            var we = w(K, 2), Me = x(we), je = w(we, 2), Ge = x(je), De = w(je, 2);
            {
              var it = (I) => {
                var L = f2();
                E(I, L);
              };
              F(De, (I) => {
                u(a) && I(it);
              });
            }
            var Se = w(De, 2);
            B(() => {
              var I, L, ne, le;
              oe = Jt(K, 1, "status-dot svelte-1bw2oss", null, oe, {
                pass: ((I = u(Oe)) == null ? void 0 : I.passed) === !0 || ((L = u(pe).lastResult) == null ? void 0 : L.passed) === !0,
                fail: ((ne = u(Oe)) == null ? void 0 : ne.passed) === !1 || ((le = u(pe).lastResult) == null ? void 0 : le.passed) === !1
              }), V(Me, (u(pe), b(() => u(pe).name))), V(Ge, `${u(pe), b(() => (u(pe).assertions ?? []).length) ?? ""} assertions`);
            }), ee("click", Se, () => m(u(pe).id)), E(Pe, de);
          }), E(re, xe);
        };
        F(Z, (re) => {
          u(r) ? re(H) : u(f) ? re(J, 1) : (u(l), b(() => u(l).length === 0) ? re(te, 2) : re(he, -1));
        });
      }
      var ue = w(Z, 2), ie = x(ue), ce = w(ie, 2), ye = x(ce);
      B(() => {
        ce.disabled = (u(a), u(l), b(() => u(a) || u(l).length === 0)), V(ye, u(a) ? "Running…" : "Run Suite");
      }), ee("click", ie, () => S(c, !0)), ee("click", ce, O), E(_, P);
    };
    F(D, (_) => {
      u(s) && _(N);
    });
  }
  var Y = w(k, 2);
  {
    var y = (_) => {
      var P = m2(), $ = x(P), X = w(x($), 2), Z = w(x(X)), H = w(X, 2), J = w(x(H));
      nt(J, "rows", 5);
      var te = w(H, 2), he = w(x(te), 2), ue = x(he), ie = x(ue);
      ie.value = ie.__value = "exact_match";
      var ce = w(ie);
      ce.value = ce.__value = "schema";
      var ye = w(ce);
      ye.value = ye.__value = "evaluate_score";
      var re = w(ue, 2), xe = w(he, 2);
      {
        var Pe = (oe) => {
          var we = O2();
          Nt(we, () => u(d).assertionExpected, (Me) => Rn(d, u(d).assertionExpected = Me)), E(oe, we);
        }, pe = (oe) => {
          var we = g2(), Me = w(x(we));
          Nt(Me, () => u(d).assertionThreshold, (je) => Rn(d, u(d).assertionThreshold = je)), E(oe, we);
        };
        F(xe, (oe) => {
          u(d), b(() => u(d).assertionType === "exact_match") ? oe(Pe) : (u(d), b(() => u(d).assertionType === "evaluate_score") && oe(pe, 1));
        });
      }
      var Oe = w(te, 2), de = x(Oe), K = w(de, 2);
      B(() => K.disabled = (u(d), b(() => !u(d).name))), Nt(Z, () => u(d).name, (oe) => Rn(d, u(d).name = oe)), Nt(J, () => u(d).inputJson, (oe) => Rn(d, u(d).inputJson = oe)), _a(ue, () => u(d).assertionType, (oe) => Rn(d, u(d).assertionType = oe)), Nt(re, () => u(d).assertionKey, (oe) => Rn(d, u(d).assertionKey = oe)), ee("click", de, () => S(c, !1)), ee("click", K, g), ee("click", P, Dh(() => S(c, !1))), E(_, P);
    };
    F(Y, (_) => {
      u(c) && _(y);
    });
  }
  B(() => V(z, u(s) ? "▼" : "▶")), ee("click", R, () => {
    S(s, !u(s));
  }), E(i, Q), St();
}
var y2 = /* @__PURE__ */ j('<div class="studio svelte-13r820j"><aside><!></aside> <main class="canvas-area svelte-13r820j"><!> <!></main> <aside class="panel svelte-13r820j"><!> <!> <!> <!> <!> <!> <!> <!></aside></div>');
function w2(i, e) {
  xt(e, !1);
  const t = () => ft(lt, "$graph", s), n = () => ft(Bn, "$selectedNode", s), [s, r] = _n();
  let o = Xe(e, "agentId", 8), a = /* @__PURE__ */ W(!1), l = /* @__PURE__ */ W(""), h = /* @__PURE__ */ W(null), c = /* @__PURE__ */ W(null);
  Pn(async () => {
    if (o()) {
      try {
        const [Z, H, J] = await Promise.all([
          fetch(`/api/agents/${o()}`),
          fetch(`/api/agents/${o()}/versions`),
          fetch(`/api/agents/${o()}/config`)
        ]);
        let te = null;
        if (Z.ok && (te = await Z.json(), ma.set(te), S(a, (te == null ? void 0 : te.authoringMode) === "code-defined"), S(l, (te == null ? void 0 : te.handle) ?? ""), u(a) && S(h, (te == null ? void 0 : te.updatedAt) ?? null)), te != null && te.draftGraphJson)
          lt.set(JSON.parse(te.draftGraphJson));
        else if (H.ok) {
          const he = await H.json();
          if (he.length > 0) {
            const ue = he[he.length - 1];
            lt.set(JSON.parse(ue.graphJson ?? "{}"));
          }
        }
        if (u(a) && lt.update((he) => hO(he)), J.ok) {
          const ue = (await J.json()).triggerConfig ?? {};
          Xs.set({
            triggerType: ue.type ?? "rest",
            description: "",
            cronExpression: ue.expression ?? "",
            webhookUrl: ue.webhookUrl ?? ""
          });
        }
      } catch {
      }
      window.addEventListener("caal:canvas-highlight", f), window.addEventListener("caal:canvas-focus", d), window.addEventListener("caal:apply-proposal", p);
    }
  });
  function f(Z) {
    const H = Z.detail;
    window.dispatchEvent(new CustomEvent("canvas:highlight", { detail: H }));
  }
  function d(Z) {
    const H = Z.detail;
    window.dispatchEvent(new CustomEvent("canvas:focus", { detail: H }));
  }
  function p(Z) {
    const H = Z.detail, J = M_(t(), H.patches);
    J.applied > 0 && J1(structuredClone(t()), H.description, () => {
      lt.set(J.graph);
    }), window.dispatchEvent(new CustomEvent("caal:proposal-applied", {
      detail: {
        id: H.id,
        applied: J.applied,
        skipped: J.skipped
      }
    }));
  }
  Tt();
  var O = y2(), g = x(O);
  let m;
  var v = x(g);
  yy(v, {
    get readonly() {
      return u(a);
    }
  });
  var Q = w(g, 2), k = x(Q);
  {
    var R = (Z) => {
      MP(Z, {
        get handle() {
          return u(l);
        },
        get lastSyncAt() {
          return u(h);
        }
      });
    };
    F(k, (Z) => {
      u(a) && Z(R);
    });
  }
  var T = w(k, 2);
  py(T, {
    get agentId() {
      return o();
    },
    get readonly() {
      return u(a);
    }
  });
  var M = w(Q, 2), C = x(M);
  {
    var z = (Z) => {
      J$(Z, {
        get node() {
          return n();
        },
        get readonly() {
          return u(a);
        }
      });
    }, D = (Z) => {
      m_(Z, {
        get agentId() {
          return o();
        },
        get readonly() {
          return u(a);
        }
      });
    };
    F(C, (Z) => {
      n() ? Z(z) : Z(D, -1);
    });
  }
  var N = w(C, 2);
  N_(N, {});
  var Y = w(N, 2);
  J_(Y, {});
  var y = w(Y, 2);
  Z_(y, {
    get agentId() {
      return o();
    },
    $$events: { sessionId: (Z) => S(c, Z.detail) }
  });
  var _ = w(y, 2);
  qP(_, {
    get agentId() {
      return o();
    },
    get sessionId() {
      return u(c);
    }
  });
  var P = w(_, 2);
  r2(P, {
    get agentId() {
      return o();
    }
  });
  var $ = w(P, 2);
  b2($, {
    get agentId() {
      return o();
    }
  });
  var X = w($, 2);
  EP(X, {
    get agentId() {
      return o();
    },
    get readonly() {
      return u(a);
    }
  }), B(() => m = Jt(g, 1, "palette svelte-13r820j", null, m, { readonly: u(a) })), E(i, O), St(), r();
}
const yh = document.getElementById("canvas-mount");
if (yh) {
  const i = yh.getAttribute("data-agent-id") ?? "";
  r0(w2, { target: yh, props: { agentId: i } });
}
