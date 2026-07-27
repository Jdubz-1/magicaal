var $m = Object.defineProperty;
var $f = (i) => {
  throw TypeError(i);
};
var _m = (i, e, t) => e in i ? $m(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var Yt = (i, e, t) => _m(i, typeof e != "symbol" ? e + "" : e, t), xa = (i, e, t) => e.has(i) || $f("Cannot " + t);
var _ = (i, e, t) => (xa(i, e, "read from private field"), t ? t.call(i) : e.get(i)), Qe = (i, e, t) => e.has(i) ? $f("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), ke = (i, e, t, n) => (xa(i, e, "write to private field"), n ? n.call(i, t) : e.set(i, t), t), Ae = (i, e, t) => (xa(i, e, "access private method"), t);
var Td;
typeof window < "u" && ((Td = window.__svelte ?? (window.__svelte = {})).v ?? (Td.v = /* @__PURE__ */ new Set())).add("5");
let br = !1, Pm = !1;
function Tm() {
  br = !0;
}
Tm();
const Cm = 1, Zm = 2, Ed = 4, Em = 8, Am = 16, Rm = 1, Mm = 2, Xm = 4, jm = 8, Lm = 16, Ad = 1, Im = 2, wt = Symbol("uninitialized"), Rd = "http://www.w3.org/1999/xhtml", Md = !1;
var Hl = Array.isArray, Dm = Array.prototype.indexOf, cs = Array.prototype.includes, Kl = Array.from, Xd = Object.defineProperty, Ds = Object.getOwnPropertyDescriptor, jd = Object.getOwnPropertyDescriptors, zm = Object.prototype, Nm = Array.prototype, wc = Object.getPrototypeOf, _f = Object.isExtensible;
const fs = () => {
};
function Ym(i) {
  return i();
}
function ch(i) {
  for (var e = 0; e < i.length; e++)
    i[e]();
}
function Ld() {
  var i, e, t = new Promise((n, s) => {
    i = n, e = s;
  });
  return { promise: t, resolve: i, reject: e };
}
function Wm(i, e) {
  if (Array.isArray(i))
    return i;
  if (!(Symbol.iterator in i))
    return Array.from(i);
  const t = [];
  for (const n of i)
    if (t.push(n), t.length === e) break;
  return t;
}
const Zt = 2, ir = 4, So = 8, Id = 1 << 24, Ai = 16, Xi = 32, Nn = 64, fh = 128, yi = 512, vt = 1024, Qt = 2048, ji = 4096, It = 8192, wi = 16384, $s = 32768, uh = 1 << 25, nr = 65536, ml = 1 << 17, qm = 1 << 18, yr = 1 << 19, Dd = 1 << 20, Ji = 1 << 25, vs = 65536, vl = 1 << 21, zs = 1 << 22, Dn = 1 << 23, yn = Symbol("$state"), Vm = Symbol("legacy props"), Bm = Symbol(""), sl = Symbol("attributes"), dh = Symbol("class"), ph = Symbol("style"), Mr = Symbol("text"), rl = Symbol("form reset"), Jl = new class extends Error {
  constructor() {
    super(...arguments);
    Yt(this, "name", "StaleReactionError");
    Yt(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}();
var Cd;
const Gm = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  !!((Cd = globalThis.document) != null && Cd.contentType) && /* @__PURE__ */ globalThis.document.contentType.includes("xml")
);
function xc(i) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function Um() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Fm(i, e, t) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function Hm(i) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Km() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Jm(i) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function ev() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function tv(i) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function iv() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function nv() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function sv() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function rv() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function ov() {
  console.warn("https://svelte.dev/e/derived_inert");
}
function lv() {
  console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function av() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function zd(i) {
  return i === this.v;
}
function Sc(i, e) {
  return i != i ? e == e : i !== e || i !== null && typeof i == "object" || typeof i == "function";
}
function Nd(i) {
  return !Sc(i, this.v);
}
let tt = null;
function sr(i) {
  tt = i;
}
function $t(i, e = !1, t) {
  tt = {
    p: tt,
    i: !1,
    c: null,
    e: null,
    s: i,
    x: null,
    r: (
      /** @type {Effect} */
      Pe
    ),
    l: br && !e ? { s: null, u: null, $: [] } : null
  };
}
function _t(i) {
  var e = (
    /** @type {ComponentContext} */
    tt
  ), t = e.e;
  if (t !== null) {
    e.e = null;
    for (var n of t)
      cp(n);
  }
  return e.i = !0, tt = e.p, /** @type {T} */
  {};
}
function ko() {
  return !br || tt !== null && tt.l === null;
}
let ts = [];
function Yd() {
  var i = ts;
  ts = [], ch(i);
}
function zn(i) {
  if (ts.length === 0 && !qr) {
    var e = ts;
    queueMicrotask(() => {
      e === ts && Yd();
    });
  }
  ts.push(i);
}
function hv() {
  for (; ts.length > 0; )
    Yd();
}
function Wd(i) {
  var e = Pe;
  if (e === null)
    return Te.f |= Dn, i;
  if ((e.f & $s) === 0 && (e.f & ir) === 0)
    throw i;
  Ln(i, e);
}
function Ln(i, e) {
  for (; e !== null; ) {
    if ((e.f & fh) !== 0) {
      if ((e.f & $s) === 0)
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
const cv = -7169;
function ot(i, e) {
  i.f = i.f & cv | e;
}
function kc(i) {
  (i.f & yi) !== 0 || i.deps === null ? ot(i, vt) : ot(i, ji);
}
function qd(i) {
  if (i !== null)
    for (const e of i)
      (e.f & Zt) === 0 || (e.f & vs) === 0 || (e.f ^= vs, qd(
        /** @type {Derived} */
        e.deps
      ));
}
function Vd(i, e, t) {
  (i.f & Qt) !== 0 ? e.add(i) : (i.f & ji) !== 0 && t.add(i), qd(i.deps), ot(i, vt);
}
function Bd(i, e, t) {
  if (i == null)
    return e(void 0), fs;
  const n = b(
    () => i.subscribe(
      e,
      // @ts-expect-error
      t
    )
  );
  return n.unsubscribe ? () => n.unsubscribe() : n;
}
const Cs = [];
function Qn(i, e = fs) {
  let t = null;
  const n = /* @__PURE__ */ new Set();
  function s(l) {
    if (Sc(i, l) && (i = l, t)) {
      const a = !Cs.length;
      for (const h of n)
        h[1](), Cs.push(h, i);
      if (a) {
        for (let h = 0; h < Cs.length; h += 2)
          Cs[h][0](Cs[h + 1]);
        Cs.length = 0;
      }
    }
  }
  function r(l) {
    s(l(
      /** @type {T} */
      i
    ));
  }
  function o(l, a = fs) {
    const h = [l, a];
    return n.add(h), n.size === 1 && (t = e(s, r) || fs), l(
      /** @type {T} */
      i
    ), () => {
      n.delete(h), n.size === 0 && t && (t(), t = null);
    };
  }
  return { set: s, update: r, subscribe: o };
}
function Gd(i) {
  let e;
  return Bd(i, (t) => e = t)(), e;
}
let Oh = !1, Xo = !1, gh = Symbol("unmounted");
function at(i, e, t) {
  const n = t[e] ?? (t[e] = {
    store: null,
    source: /* @__PURE__ */ F(void 0),
    unsubscribe: fs
  });
  if (n.store !== i && !(gh in t))
    if (n.unsubscribe(), n.store = i ?? null, i == null)
      n.source.v = void 0, n.unsubscribe = fs;
    else {
      var s = !0;
      n.unsubscribe = Bd(i, (r) => {
        s ? n.source.v = r : Q(n.source, r);
      }), s = !1;
    }
  return i && gh in t ? Gd(i) : d(n.source);
}
function $n() {
  const i = {};
  function e() {
    ta(() => {
      for (var t in i)
        i[t].unsubscribe();
      Xd(i, gh, {
        enumerable: !1,
        value: !0
      });
    });
  }
  return [i, e];
}
function fv(i, e) {
  Oh = !0;
  try {
    i.set(e);
  } finally {
    Oh = !1;
  }
}
function Sa(i, e, t) {
  return fv(i, t), e;
}
function uv(i) {
  var e = Xo;
  try {
    return Xo = !1, [i(), Xo];
  } finally {
    Xo = e;
  }
}
let ka = null, Zs = null, pe = null, Wr = null, Tt = null, mh = null, qr = !1, Qa = !1, Xs = null, ol = null;
var Pf = 0;
let dv = 1;
var Fs, Mn, ss, Hs, Ks, rs, Js, pn, mo, si, vo, Xn, Gi, Ui, er, os, Ie, vh, Xr, bh, Ud, Fd, ll, pv, yh, Es;
const Gl = class Gl {
  constructor() {
    Qe(this, Ie);
    Yt(this, "id", dv++);
    /** True as soon as `#process` was called */
    Qe(this, Fs, !1);
    Yt(this, "linked", !0);
    /** @type {Batch | null} */
    Qe(this, Mn, null);
    /** @type {Batch | null} */
    Qe(this, ss, null);
    /** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
    Yt(this, "async_deriveds", /* @__PURE__ */ new Map());
    /**
     * The current values of any signals that are updated in this batch.
     * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Value, [any, boolean]>}
     */
    Yt(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Value, any>}
     */
    Yt(this, "previous", /* @__PURE__ */ new Map());
    /**
     * Async effects which this batch doesn't take into account anymore when calculating blockers,
     * as it has a value for it already.
     * @type {Set<Effect>}
     */
    Yt(this, "unblocked", /* @__PURE__ */ new Set());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<(batch: Batch) => void>}
     */
    Qe(this, Hs, /* @__PURE__ */ new Set());
    /**
     * If a fork is discarded, we need to destroy any effects that are no longer needed
     * @type {Set<(batch: Batch) => void>}
     */
    Qe(this, Ks, /* @__PURE__ */ new Set());
    /**
     * Callbacks that should run only when a fork is committed.
     * @type {Set<(batch: Batch) => void>}
     */
    Qe(this, rs, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    Qe(this, Js, 0);
    /**
     * Async effects that are currently in flight, _not_ inside a pending boundary
     * @type {Map<Effect, number>}
     */
    Qe(this, pn, /* @__PURE__ */ new Map());
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    Qe(this, mo, null);
    /**
     * The root effects that need to be flushed
     * @type {Effect[]}
     */
    Qe(this, si, []);
    /**
     * Effects created while this batch was active.
     * @type {Effect[]}
     */
    Qe(this, vo, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Set<Effect>}
     */
    Qe(this, Xn, /* @__PURE__ */ new Set());
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Set<Effect>}
     */
    Qe(this, Gi, /* @__PURE__ */ new Set());
    /**
     * A map of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`.
     * The value contains child effects that were dirty/maybe_dirty before being reset,
     * so they can be rescheduled if the branch survives.
     * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
     */
    Qe(this, Ui, /* @__PURE__ */ new Map());
    /**
     * Inverse of #skipped_branches which we need to tell prior batches to unskip them when committing
     * @type {Set<Effect>}
     */
    Qe(this, er, /* @__PURE__ */ new Set());
    Yt(this, "is_fork", !1);
    Qe(this, os, !1);
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    _(this, Ui).has(e) || _(this, Ui).set(e, { d: [], m: [] }), _(this, er).delete(e);
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   * @param {(e: Effect) => void} callback
   */
  unskip_effect(e, t = (n) => this.schedule(n)) {
    var n = _(this, Ui).get(e);
    if (n) {
      _(this, Ui).delete(e);
      for (var s of n.d)
        ot(s, Qt), t(s);
      for (s of n.m)
        ot(s, ji), t(s);
    }
    _(this, er).add(e);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} value
   * @param {boolean} [is_derived]
   */
  capture(e, t, n = !1) {
    e.v !== wt && !this.previous.has(e) && this.previous.set(e, e.v), (e.f & Dn) === 0 && (this.current.set(e, [t, n]), Tt == null || Tt.set(e, t)), this.is_fork || (e.v = t);
  }
  activate() {
    pe = this;
  }
  deactivate() {
    pe = null, Tt = null;
  }
  flush() {
    try {
      Qa = !0, pe = this, Ae(this, Ie, Xr).call(this);
    } finally {
      Pf = 0, mh = null, Xs = null, ol = null, Qa = !1, pe = null, Tt = null, us.clear();
    }
  }
  discard() {
    for (const e of _(this, Ks)) e(this);
    _(this, Ks).clear(), _(this, rs).clear(), Ae(this, Ie, Es).call(this);
  }
  /**
   * @param {Effect} effect
   */
  register_created_effect(e) {
    _(this, vo).push(e);
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(e, t) {
    if (ke(this, Js, _(this, Js) + 1), e) {
      let n = _(this, pn).get(t) ?? 0;
      _(this, pn).set(t, n + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  decrement(e, t) {
    if (ke(this, Js, _(this, Js) - 1), e) {
      let n = _(this, pn).get(t) ?? 0;
      n === 1 ? _(this, pn).delete(t) : _(this, pn).set(t, n - 1);
    }
    _(this, os) || (ke(this, os, !0), zn(() => {
      ke(this, os, !1), this.linked && this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(e, t) {
    for (const n of e)
      _(this, Xn).add(n);
    for (const n of t)
      _(this, Gi).add(n);
    e.clear(), t.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    _(this, Hs).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    _(this, Ks).add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  on_fork_commit(e) {
    _(this, rs).add(e);
  }
  run_fork_commit_callbacks() {
    for (const e of _(this, rs)) e(this);
    _(this, rs).clear();
  }
  settled() {
    return (_(this, mo) ?? ke(this, mo, Ld())).promise;
  }
  static ensure() {
    var e;
    if (pe === null) {
      const t = pe = new Gl();
      Ae(e = t, Ie, yh).call(e), !Qa && !qr && zn(() => {
        _(t, Fs) || t.flush();
      });
    }
    return pe;
  }
  apply() {
    {
      Tt = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    var s;
    if (mh = e, (s = e.b) != null && s.is_pending && (e.f & (ir | So | Id)) !== 0 && (e.f & $s) === 0) {
      e.b.defer_effect(e);
      return;
    }
    for (var t = e; t.parent !== null; ) {
      t = t.parent;
      var n = t.f;
      if (Xs !== null && t === Pe && (Te === null || (Te.f & Zt) === 0) && !Oh)
        return;
      if ((n & (Nn | Xi)) !== 0) {
        if ((n & vt) === 0)
          return;
        t.f ^= vt;
      }
    }
    _(this, si).push(t);
  }
};
Fs = new WeakMap(), Mn = new WeakMap(), ss = new WeakMap(), Hs = new WeakMap(), Ks = new WeakMap(), rs = new WeakMap(), Js = new WeakMap(), pn = new WeakMap(), mo = new WeakMap(), si = new WeakMap(), vo = new WeakMap(), Xn = new WeakMap(), Gi = new WeakMap(), Ui = new WeakMap(), er = new WeakMap(), os = new WeakMap(), Ie = new WeakSet(), vh = function() {
  if (this.is_fork) return !0;
  for (const n of _(this, pn).keys()) {
    for (var e = n, t = !1; e.parent !== null; ) {
      if (_(this, Ui).has(e)) {
        t = !0;
        break;
      }
      e = e.parent;
    }
    if (!t)
      return !0;
  }
  return !1;
}, Xr = function() {
  var a, h, c, f;
  if (ke(this, Fs, !0), Pf++ > 1e3 && (Ae(this, Ie, Es).call(this), gv()), !Ae(this, Ie, vh).call(this)) {
    for (const u of _(this, Xn))
      _(this, Gi).delete(u), ot(u, Qt), this.schedule(u);
    for (const u of _(this, Gi))
      ot(u, ji), this.schedule(u);
  }
  const e = _(this, si);
  ke(this, si, []), this.apply();
  var t = Xs = [], n = [], s = ol = [];
  for (const u of e)
    try {
      Ae(this, Ie, bh).call(this, u, t, n);
    } catch (p) {
      throw Jd(u), p;
    }
  if (pe = null, s.length > 0) {
    var r = Gl.ensure();
    for (const u of s)
      r.schedule(u);
  }
  if (Xs = null, ol = null, Ae(this, Ie, vh).call(this)) {
    Ae(this, Ie, ll).call(this, n), Ae(this, Ie, ll).call(this, t);
    for (const [u, p] of _(this, Ui))
      Kd(u, p);
    s.length > 0 && /** @type {unknown} */
    Ae(a = pe, Ie, Xr).call(a);
    return;
  }
  const o = Ae(this, Ie, Ud).call(this);
  if (o) {
    Ae(h = o, Ie, Fd).call(h, this);
    return;
  }
  _(this, Xn).clear(), _(this, Gi).clear();
  for (const u of _(this, Hs)) u(this);
  _(this, Hs).clear(), Wr = this, Tf(n), Tf(t), Wr = null, (c = _(this, mo)) == null || c.resolve();
  var l = (
    /** @type {Batch | null} */
    /** @type {unknown} */
    pe
  );
  if (this.linked && _(this, Js) === 0 && Ae(this, Ie, Es).call(this), _(this, si).length > 0) {
    l === null && (l = this, Ae(this, Ie, yh).call(this));
    const u = l;
    _(u, si).push(..._(this, si).filter((p) => !_(u, si).includes(p)));
  }
  l !== null && Ae(f = l, Ie, Xr).call(f);
}, /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {Effect[]} effects
 * @param {Effect[]} render_effects
 */
bh = function(e, t, n) {
  e.f ^= vt;
  for (var s = e.first; s !== null; ) {
    var r = s.f, o = (r & (Xi | Nn)) !== 0, l = o && (r & vt) !== 0, a = l || (r & It) !== 0 || _(this, Ui).has(s);
    if (!a && s.fn !== null) {
      o ? s.f ^= vt : (r & ir) !== 0 ? t.push(s) : wr(s) && ((r & Ai) !== 0 && _(this, Gi).add(s), xs(s));
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
}, Ud = function() {
  for (var e = _(this, Mn); e !== null; ) {
    if (!e.is_fork) {
      for (const [t, [, n]] of this.current)
        if (e.current.has(t) && !n)
          return e;
    }
    e = _(e, Mn);
  }
  return null;
}, /**
 * @param {Batch} batch
 */
Fd = function(e) {
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
        if ((o & Zt) !== 0)
          t(
            /** @type {Derived} */
            a
          );
        else {
          var l = (
            /** @type {Effect} */
            a
          );
          o & (zs | Ai) && !this.async_deriveds.has(l) && (_(this, Gi).delete(l), ot(l, Qt), this.schedule(l));
        }
      }
  };
  for (const s of this.current.keys())
    t(s);
  this.oncommit(() => e.discard()), Ae(n = e, Ie, Es).call(n), pe = this, Ae(this, Ie, Xr).call(this);
}, /**
 * @param {Effect[]} effects
 */
ll = function(e) {
  for (var t = 0; t < e.length; t += 1)
    Vd(e[t], _(this, Xn), _(this, Gi));
}, pv = function() {
  var c;
  Ae(this, Ie, Es).call(this);
  for (let f = ka; f !== null; f = _(f, ss)) {
    var e = f.id < this.id, t = [];
    for (const [u, [p, O]] of this.current) {
      if (f.current.has(u)) {
        var n = (
          /** @type {[any, boolean]} */
          f.current.get(u)[0]
        );
        if (e && p !== n)
          f.current.set(u, [p, O]);
        else
          continue;
      }
      t.push(u);
    }
    if (e)
      for (const [u, p] of this.async_deriveds) {
        const O = f.async_deriveds.get(u);
        O && p.promise.then(O.resolve);
      }
    if (_(f, Fs)) {
      var s = [...f.current.keys()].filter((u) => !this.current.has(u));
      if (s.length === 0)
        e && f.discard();
      else if (t.length > 0) {
        if (e)
          for (const u of _(this, er))
            f.unskip_effect(u, (p) => {
              var O;
              (p.f & (Ai | zs)) !== 0 ? f.schedule(p) : Ae(O = f, Ie, ll).call(O, [p]);
            });
        f.activate();
        var r = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (var l of t)
          Hd(l, s, r, o);
        o = /* @__PURE__ */ new Map();
        var a = [...f.current.keys()].filter(
          (u) => this.current.has(u) ? (
            /** @type {[any, boolean]} */
            this.current.get(u)[0] !== u.v
          ) : !0
        );
        if (a.length > 0)
          for (const u of _(this, vo))
            (u.f & (wi | It | ml)) === 0 && Qc(u, a, o) && ((u.f & (zs | Ai)) !== 0 ? (ot(u, Qt), f.schedule(u)) : _(f, Xn).add(u));
        if (_(f, si).length > 0 && !_(f, os)) {
          f.apply();
          for (var h of _(f, si))
            Ae(c = f, Ie, bh).call(c, h, [], []);
          ke(f, si, []);
        }
        f.deactivate();
      }
    }
  }
}, yh = function() {
  Zs === null ? ka = Zs = this : (ke(Zs, ss, this), ke(this, Mn, Zs)), Zs = this;
}, Es = function() {
  var e = _(this, Mn), t = _(this, ss);
  e === null ? ka = t : ke(e, ss, t), t === null ? Zs = e : ke(t, Mn, e), this.linked = !1;
};
let bs = Gl;
function Ov(i) {
  var e = qr;
  qr = !0;
  try {
    for (var t; ; ) {
      if (hv(), pe === null)
        return (
          /** @type {T} */
          t
        );
      pe.flush();
    }
  } finally {
    qr = e;
  }
}
function gv() {
  try {
    ev();
  } catch (i) {
    Ln(i, mh);
  }
}
let Ci = null;
function Tf(i) {
  var e = i.length;
  if (e !== 0) {
    for (var t = 0; t < e; ) {
      var n = i[t++];
      if ((n.f & (wi | It)) === 0 && wr(n) && (Ci = /* @__PURE__ */ new Set(), xs(n), n.deps === null && n.first === null && n.nodes === null && n.teardown === null && n.ac === null && up(n), (Ci == null ? void 0 : Ci.size) > 0)) {
        us.clear();
        for (const s of Ci) {
          if ((s.f & (wi | It)) !== 0) continue;
          const r = [s];
          let o = s.parent;
          for (; o !== null; )
            Ci.has(o) && (Ci.delete(o), r.push(o)), o = o.parent;
          for (let l = r.length - 1; l >= 0; l--) {
            const a = r[l];
            (a.f & (wi | It)) === 0 && xs(a);
          }
        }
        Ci.clear();
      }
    }
    Ci = null;
  }
}
function Hd(i, e, t, n) {
  if (!t.has(i) && (t.add(i), i.reactions !== null))
    for (const s of i.reactions) {
      const r = s.f;
      (r & Zt) !== 0 ? Hd(
        /** @type {Derived} */
        s,
        e,
        t,
        n
      ) : (r & (zs | Ai)) !== 0 && (r & Qt) === 0 && Qc(s, e, n) && (ot(s, Qt), $c(
        /** @type {Effect} */
        s
      ));
    }
}
function Qc(i, e, t) {
  const n = t.get(i);
  if (n !== void 0) return n;
  if (i.deps !== null)
    for (const s of i.deps) {
      if (cs.call(e, s))
        return !0;
      if ((s.f & Zt) !== 0 && Qc(
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
function $c(i) {
  pe.schedule(i);
}
function Kd(i, e) {
  if (!((i.f & Xi) !== 0 && (i.f & vt) !== 0)) {
    (i.f & Qt) !== 0 ? e.d.push(i) : (i.f & ji) !== 0 && e.m.push(i), ot(i, vt);
    for (var t = i.first; t !== null; )
      Kd(t, e), t = t.next;
  }
}
function Jd(i) {
  ot(i, vt);
  for (var e = i.first; e !== null; )
    Jd(e), e = e.next;
}
function mv(i) {
  let e = 0, t = ws(0), n;
  return () => {
    Tc() && (d(t), _s(() => (e === 0 && (n = b(() => i(() => Vr(t)))), e += 1, () => {
      zn(() => {
        e -= 1, e === 0 && (n == null || n(), n = void 0, Vr(t));
      });
    })));
  };
}
var vv = nr | yr;
function bv(i, e, t, n) {
  new yv(i, e, t, n);
}
var ui, yc, di, ls, qt, pi, Xt, ri, On, as, jn, tr, bo, yo, gn, Ul, dt, wv, xv, Sv, wh, al, hl, xh, Sh;
class yv {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(e, t, n, s) {
    Qe(this, dt);
    /** @type {Boundary | null} */
    Yt(this, "parent");
    Yt(this, "is_pending", !1);
    /**
     * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
     * Inherited from parent boundary, or defaults to identity.
     * @type {(error: unknown) => unknown}
     */
    Yt(this, "transform_error");
    /** @type {TemplateNode} */
    Qe(this, ui);
    /** @type {TemplateNode | null} */
    Qe(this, yc, null);
    /** @type {BoundaryProps} */
    Qe(this, di);
    /** @type {((anchor: Node) => void)} */
    Qe(this, ls);
    /** @type {Effect} */
    Qe(this, qt);
    /** @type {Effect | null} */
    Qe(this, pi, null);
    /** @type {Effect | null} */
    Qe(this, Xt, null);
    /** @type {Effect | null} */
    Qe(this, ri, null);
    /** @type {DocumentFragment | null} */
    Qe(this, On, null);
    Qe(this, as, 0);
    Qe(this, jn, 0);
    Qe(this, tr, !1);
    /** @type {Set<Effect>} */
    Qe(this, bo, /* @__PURE__ */ new Set());
    /** @type {Set<Effect>} */
    Qe(this, yo, /* @__PURE__ */ new Set());
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    Qe(this, gn, null);
    Qe(this, Ul, mv(() => (ke(this, gn, ws(_(this, as))), () => {
      ke(this, gn, null);
    })));
    var r;
    ke(this, ui, e), ke(this, di, t), ke(this, ls, (o) => {
      var l = (
        /** @type {Effect} */
        Pe
      );
      l.b = this, l.f |= fh, n(o);
    }), this.parent = /** @type {Effect} */
    Pe.b, this.transform_error = s ?? ((r = this.parent) == null ? void 0 : r.transform_error) ?? ((o) => o), ke(this, qt, Cc(() => {
      Ae(this, dt, wh).call(this);
    }, vv));
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(e) {
    Vd(e, _(this, bo), _(this, yo));
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!_(this, di).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(e, t) {
    Ae(this, dt, xh).call(this, e, t), ke(this, as, _(this, as) + e), !(!_(this, gn) || _(this, tr)) && (ke(this, tr, !0), zn(() => {
      ke(this, tr, !1), _(this, gn) && or(_(this, gn), _(this, as));
    }));
  }
  get_effect_pending() {
    return _(this, Ul).call(this), d(
      /** @type {Source<number>} */
      _(this, gn)
    );
  }
  /** @param {unknown} error */
  error(e) {
    if (!_(this, di).onerror && !_(this, di).failed)
      throw e;
    pe != null && pe.is_fork ? (_(this, pi) && pe.skip_effect(_(this, pi)), _(this, Xt) && pe.skip_effect(_(this, Xt)), _(this, ri) && pe.skip_effect(_(this, ri)), pe.on_fork_commit(() => {
      Ae(this, dt, Sh).call(this, e);
    })) : Ae(this, dt, Sh).call(this, e);
  }
}
ui = new WeakMap(), yc = new WeakMap(), di = new WeakMap(), ls = new WeakMap(), qt = new WeakMap(), pi = new WeakMap(), Xt = new WeakMap(), ri = new WeakMap(), On = new WeakMap(), as = new WeakMap(), jn = new WeakMap(), tr = new WeakMap(), bo = new WeakMap(), yo = new WeakMap(), gn = new WeakMap(), Ul = new WeakMap(), dt = new WeakSet(), wv = function() {
  try {
    ke(this, pi, Oi(() => _(this, ls).call(this, _(this, ui))));
  } catch (e) {
    this.error(e);
  }
}, /**
 * @param {unknown} error The deserialized error from the server's hydration comment
 */
xv = function(e) {
  const t = _(this, di).failed;
  t && ke(this, ri, Oi(() => {
    t(
      _(this, ui),
      () => e,
      () => () => {
      }
    );
  }));
}, Sv = function() {
  const e = _(this, di).pending;
  e && (this.is_pending = !0, ke(this, Xt, Oi(() => e(_(this, ui)))), zn(() => {
    var t = ke(this, On, document.createDocumentFragment()), n = wn();
    t.append(n), ke(this, pi, Ae(this, dt, hl).call(this, () => Oi(() => _(this, ls).call(this, n)))), _(this, jn) === 0 && (_(this, ui).before(t), ke(this, On, null), ds(
      /** @type {Effect} */
      _(this, Xt),
      () => {
        ke(this, Xt, null);
      }
    ), Ae(this, dt, al).call(
      this,
      /** @type {Batch} */
      pe
    ));
  }));
}, wh = function() {
  try {
    if (this.is_pending = this.has_pending_snippet(), ke(this, jn, 0), ke(this, as, 0), ke(this, pi, Oi(() => {
      _(this, ls).call(this, _(this, ui));
    })), _(this, jn) > 0) {
      var e = ke(this, On, document.createDocumentFragment());
      Ac(_(this, pi), e);
      const t = (
        /** @type {(anchor: Node) => void} */
        _(this, di).pending
      );
      ke(this, Xt, Oi(() => t(_(this, ui))));
    } else
      Ae(this, dt, al).call(
        this,
        /** @type {Batch} */
        pe
      );
  } catch (t) {
    this.error(t);
  }
}, /**
 * @param {Batch} batch
 */
al = function(e) {
  this.is_pending = !1, e.transfer_effects(_(this, bo), _(this, yo));
}, /**
 * @template T
 * @param {() => T} fn
 */
hl = function(e) {
  var t = Pe, n = Te, s = tt;
  Qi(_(this, qt)), ki(_(this, qt)), sr(_(this, qt).ctx);
  try {
    return bs.ensure(), e();
  } catch (r) {
    return Wd(r), null;
  } finally {
    Qi(t), ki(n), sr(s);
  }
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 * @param {Batch} batch
 */
xh = function(e, t) {
  var n;
  if (!this.has_pending_snippet()) {
    this.parent && Ae(n = this.parent, dt, xh).call(n, e, t);
    return;
  }
  ke(this, jn, _(this, jn) + e), _(this, jn) === 0 && (Ae(this, dt, al).call(this, t), _(this, Xt) && ds(_(this, Xt), () => {
    ke(this, Xt, null);
  }), _(this, On) && (_(this, ui).before(_(this, On)), ke(this, On, null)));
}, /**
 * @param {unknown} error
 */
Sh = function(e) {
  _(this, pi) && (Kt(_(this, pi)), ke(this, pi, null)), _(this, Xt) && (Kt(_(this, Xt)), ke(this, Xt, null)), _(this, ri) && (Kt(_(this, ri)), ke(this, ri, null));
  var t = _(this, di).onerror;
  let n = _(this, di).failed;
  var s = !1, r = !1;
  const o = () => {
    if (s) {
      av();
      return;
    }
    s = !0, r && rv(), _(this, ri) !== null && ds(_(this, ri), () => {
      ke(this, ri, null);
    }), Ae(this, dt, hl).call(this, () => {
      Ae(this, dt, wh).call(this);
    });
  }, l = (a) => {
    try {
      r = !0, t == null || t(a, o), r = !1;
    } catch (h) {
      Ln(h, _(this, qt) && _(this, qt).parent);
    }
    n && ke(this, ri, Ae(this, dt, hl).call(this, () => {
      try {
        return Oi(() => {
          var h = (
            /** @type {Effect} */
            Pe
          );
          h.b = this, h.f |= fh, n(
            _(this, ui),
            () => a,
            () => o
          );
        });
      } catch (h) {
        return Ln(
          h,
          /** @type {Effect} */
          _(this, qt).parent
        ), null;
      }
    }));
  };
  zn(() => {
    var a;
    try {
      a = this.transform_error(e);
    } catch (h) {
      Ln(h, _(this, qt) && _(this, qt).parent);
      return;
    }
    a !== null && typeof a == "object" && typeof /** @type {any} */
    a.then == "function" ? a.then(
      l,
      /** @param {unknown} e */
      (h) => Ln(h, _(this, qt) && _(this, qt).parent)
    ) : l(a);
  });
};
function kv(i, e, t, n) {
  const s = ko() ? rr : St;
  var r = i.filter((u) => !u.settled);
  if (t.length === 0 && r.length === 0) {
    n(e.map(s));
    return;
  }
  var o = (
    /** @type {Effect} */
    Pe
  ), l = Qv(), a = r.length === 1 ? r[0].promise : r.length > 1 ? Promise.all(r.map((u) => u.promise)) : null;
  function h(u) {
    if ((o.f & wi) === 0) {
      l();
      try {
        n(u);
      } catch (p) {
        Ln(p, o);
      }
      bl();
    }
  }
  var c = ep();
  if (t.length === 0) {
    a.then(() => h(e.map(s))).finally(c);
    return;
  }
  function f() {
    Promise.all(t.map((u) => /* @__PURE__ */ $v(u))).then((u) => h([...e.map(s), ...u])).catch((u) => Ln(u, o)).finally(c);
  }
  a ? a.then(() => {
    l(), f(), bl();
  }) : f();
}
function Qv() {
  var i = (
    /** @type {Effect} */
    Pe
  ), e = Te, t = tt, n = (
    /** @type {Batch} */
    pe
  );
  return function(r = !0) {
    Qi(i), ki(e), sr(t), r && (i.f & wi) === 0 && (n == null || n.activate(), n == null || n.apply());
  };
}
function bl(i = !0) {
  Qi(null), ki(null), sr(null), i && (pe == null || pe.deactivate());
}
function ep() {
  var i = (
    /** @type {Effect} */
    Pe
  ), e = (
    /** @type {Boundary} */
    i.b
  ), t = (
    /** @type {Batch} */
    pe
  ), n = e.is_rendered();
  return e.update_pending_count(1, t), t.increment(n, i), () => {
    e.update_pending_count(-1, t), t.decrement(n, i);
  };
}
// @__NO_SIDE_EFFECTS__
function rr(i) {
  var e = Zt | Qt;
  return Pe !== null && (Pe.f |= yr), {
    ctx: tt,
    deps: null,
    effects: null,
    equals: zd,
    f: e,
    fn: i,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      wt
    ),
    wv: 0,
    parent: Pe,
    ac: null
  };
}
const jo = Symbol("obsolete");
// @__NO_SIDE_EFFECTS__
function $v(i, e, t) {
  let n = (
    /** @type {Effect | null} */
    Pe
  );
  n === null && Um();
  var s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), r = ws(
    /** @type {V} */
    wt
  ), o = !Te, l = /* @__PURE__ */ new Set();
  return Lv(() => {
    var p;
    var a = (
      /** @type {Effect} */
      Pe
    ), h = Ld();
    s = h.promise;
    try {
      Promise.resolve(i()).then(h.resolve, (O) => {
        O !== Jl && h.reject(O);
      }).finally(bl);
    } catch (O) {
      h.reject(O), bl();
    }
    var c = (
      /** @type {Batch} */
      pe
    );
    if (o) {
      if ((a.f & $s) !== 0)
        var f = ep();
      if (
        /** @type {Boundary} */
        n.b.is_rendered()
      )
        (p = c.async_deriveds.get(a)) == null || p.reject(jo);
      else
        for (const O of l.values())
          O.reject(jo);
      l.add(h), c.async_deriveds.set(a, h);
    }
    const u = (O, g = void 0) => {
      f == null || f(), l.delete(h), g !== jo && (c.activate(), g ? (r.f |= Dn, or(r, g)) : ((r.f & Dn) !== 0 && (r.f ^= Dn), or(r, O)), c.deactivate());
    };
    h.promise.then(u, (O) => u(null, O || "unknown"));
  }), ta(() => {
    for (const a of l)
      a.reject(jo);
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
function ys(i) {
  const e = /* @__PURE__ */ rr(i);
  return Op(e), e;
}
// @__NO_SIDE_EFFECTS__
function St(i) {
  const e = /* @__PURE__ */ rr(i);
  return e.equals = Nd, e;
}
function _v(i) {
  var e = i.effects;
  if (e !== null) {
    i.effects = null;
    for (var t = 0; t < e.length; t += 1)
      Kt(
        /** @type {Effect} */
        e[t]
      );
  }
}
function _c(i) {
  var e, t = Pe, n = i.parent;
  if (!Sn && n !== null && i.v !== wt && // if it was never evaluated before, it's guaranteed to fail downstream, so we try to execute instead
  (n.f & (wi | It)) !== 0)
    return ov(), i.v;
  Qi(n);
  try {
    i.f &= ~vs, _v(i), e = bp(i);
  } finally {
    Qi(t);
  }
  return e;
}
function tp(i) {
  var e = _c(i);
  if (!i.equals(e) && (i.wv = mp(), (!(pe != null && pe.is_fork) || i.deps === null) && (pe !== null ? (pe.capture(i, e, !0), Wr == null || Wr.capture(i, e, !0)) : i.v = e, i.deps === null))) {
    ot(i, vt);
    return;
  }
  Sn || (Tt !== null ? (Tc() || pe != null && pe.is_fork) && Tt.set(i, e) : kc(i));
}
function Pv(i) {
  var e, t;
  if (i.effects !== null)
    for (const n of i.effects)
      (n.teardown || n.ac) && ((e = n.teardown) == null || e.call(n), (t = n.ac) == null || t.abort(Jl), n.fn !== null && (n.teardown = fs), n.ac = null, io(n, 0), Zc(n));
}
function ip(i) {
  if (i.effects !== null)
    for (const e of i.effects)
      e.teardown && e.fn !== null && xs(e);
}
let yl = /* @__PURE__ */ new Set();
const us = /* @__PURE__ */ new Map();
let np = !1;
function ws(i, e) {
  var t = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: i,
    reactions: null,
    equals: zd,
    rv: 0,
    wv: 0
  };
  return t;
}
// @__NO_SIDE_EFFECTS__
function Pn(i, e) {
  const t = ws(i);
  return Op(t), t;
}
// @__NO_SIDE_EFFECTS__
function F(i, e = !1, t = !0) {
  var s;
  const n = ws(i);
  return e || (n.equals = Nd), br && t && tt !== null && tt.l !== null && ((s = tt.l).s ?? (s.s = [])).push(n), n;
}
function Cn(i, e) {
  return Q(
    i,
    b(() => d(i))
  ), e;
}
function Q(i, e, t = !1) {
  Te !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Ri || (Te.f & ml) !== 0) && ko() && (Te.f & (Zt | Ai | zs | ml)) !== 0 && (xi === null || !cs.call(xi, i)) && sv();
  let n = t ? js(e) : e;
  return or(i, n, ol);
}
function or(i, e, t = null) {
  if (!i.equals(e)) {
    us.set(i, Sn ? e : i.v);
    var n = bs.ensure();
    if (n.capture(i, e), (i.f & Zt) !== 0) {
      const s = (
        /** @type {Derived} */
        i
      );
      (i.f & Qt) !== 0 && _c(s), Tt === null && kc(s);
    }
    i.wv = mp(), sp(i, Qt, t), ko() && Pe !== null && (Pe.f & vt) !== 0 && (Pe.f & (Xi | Nn)) === 0 && (fi === null ? zv([i]) : fi.push(i)), !n.is_fork && yl.size > 0 && !np && Tv();
  }
  return e;
}
function Tv() {
  np = !1;
  for (const i of yl) {
    (i.f & vt) !== 0 && ot(i, ji);
    let e;
    try {
      e = wr(i);
    } catch {
      e = !0;
    }
    e && xs(i);
  }
  yl.clear();
}
function Vr(i) {
  Q(i, i.v + 1);
}
function sp(i, e, t) {
  var n = i.reactions;
  if (n !== null)
    for (var s = ko(), r = n.length, o = 0; o < r; o++) {
      var l = n[o], a = l.f;
      if (!(!s && l === Pe)) {
        var h = (a & Qt) === 0;
        if (h && ot(l, e), (a & ml) !== 0)
          yl.add(
            /** @type {Effect} */
            l
          );
        else if ((a & Zt) !== 0) {
          var c = (
            /** @type {Derived} */
            l
          );
          Tt == null || Tt.delete(c), (a & vs) === 0 && (a & yi && (Pe === null || (Pe.f & vl) === 0) && (l.f |= vs), sp(c, ji, t));
        } else if (h) {
          var f = (
            /** @type {Effect} */
            l
          );
          (a & Ai) !== 0 && Ci !== null && Ci.add(f), t !== null ? t.push(f) : $c(f);
        }
      }
    }
}
function js(i) {
  if (typeof i != "object" || i === null || yn in i)
    return i;
  const e = wc(i);
  if (e !== zm && e !== Nm)
    return i;
  var t = /* @__PURE__ */ new Map(), n = Hl(i), s = /* @__PURE__ */ Pn(0), r = ps, o = (l) => {
    if (ps === r)
      return l();
    var a = Te, h = ps;
    ki(null), Rf(r);
    var c = l();
    return ki(a), Rf(h), c;
  };
  return n && t.set("length", /* @__PURE__ */ Pn(
    /** @type {any[]} */
    i.length
  )), new Proxy(
    /** @type {any} */
    i,
    {
      defineProperty(l, a, h) {
        (!("value" in h) || h.configurable === !1 || h.enumerable === !1 || h.writable === !1) && iv();
        var c = t.get(a);
        return c === void 0 ? o(() => {
          var f = /* @__PURE__ */ Pn(h.value);
          return t.set(a, f), f;
        }) : Q(c, h.value, !0), !0;
      },
      deleteProperty(l, a) {
        var h = t.get(a);
        if (h === void 0) {
          if (a in l) {
            const c = o(() => /* @__PURE__ */ Pn(wt));
            t.set(a, c), Vr(s);
          }
        } else
          Q(h, wt), Vr(s);
        return !0;
      },
      get(l, a, h) {
        var p;
        if (a === yn)
          return i;
        var c = t.get(a), f = a in l;
        if (c === void 0 && (!f || (p = Ds(l, a)) != null && p.writable) && (c = o(() => {
          var O = js(f ? l[a] : wt), g = /* @__PURE__ */ Pn(O);
          return g;
        }), t.set(a, c)), c !== void 0) {
          var u = d(c);
          return u === wt ? void 0 : u;
        }
        return Reflect.get(l, a, h);
      },
      getOwnPropertyDescriptor(l, a) {
        var h = Reflect.getOwnPropertyDescriptor(l, a);
        if (h && "value" in h) {
          var c = t.get(a);
          c && (h.value = d(c));
        } else if (h === void 0) {
          var f = t.get(a), u = f == null ? void 0 : f.v;
          if (f !== void 0 && u !== wt)
            return {
              enumerable: !0,
              configurable: !0,
              value: u,
              writable: !0
            };
        }
        return h;
      },
      has(l, a) {
        var u;
        if (a === yn)
          return !0;
        var h = t.get(a), c = h !== void 0 && h.v !== wt || Reflect.has(l, a);
        if (h !== void 0 || Pe !== null && (!c || (u = Ds(l, a)) != null && u.writable)) {
          h === void 0 && (h = o(() => {
            var p = c ? js(l[a]) : wt, O = /* @__PURE__ */ Pn(p);
            return O;
          }), t.set(a, h));
          var f = d(h);
          if (f === wt)
            return !1;
        }
        return c;
      },
      set(l, a, h, c) {
        var x;
        var f = t.get(a), u = a in l;
        if (n && a === "length")
          for (var p = h; p < /** @type {Source<number>} */
          f.v; p += 1) {
            var O = t.get(p + "");
            O !== void 0 ? Q(O, wt) : p in l && (O = o(() => /* @__PURE__ */ Pn(wt)), t.set(p + "", O));
          }
        if (f === void 0)
          (!u || (x = Ds(l, a)) != null && x.writable) && (f = o(() => /* @__PURE__ */ Pn(void 0)), Q(f, js(h)), t.set(a, f));
        else {
          u = f.v !== wt;
          var g = o(() => js(h));
          Q(f, g);
        }
        var m = Reflect.getOwnPropertyDescriptor(l, a);
        if (m != null && m.set && m.set.call(c, h), !u) {
          if (n && typeof a == "string") {
            var v = (
              /** @type {Source<number>} */
              t.get("length")
            ), S = Number(a);
            Number.isInteger(S) && S >= v.v && Q(v, S + 1);
          }
          Vr(s);
        }
        return !0;
      },
      ownKeys(l) {
        d(s);
        var a = Reflect.ownKeys(l).filter((f) => {
          var u = t.get(f);
          return u === void 0 || u.v !== wt;
        });
        for (var [h, c] of t)
          c.v !== wt && !(h in l) && a.push(h);
        return a;
      },
      setPrototypeOf() {
        nv();
      }
    }
  );
}
function Cf(i) {
  try {
    if (i !== null && typeof i == "object" && yn in i)
      return i[yn];
  } catch {
  }
  return i;
}
function Cv(i, e) {
  return Object.is(Cf(i), Cf(e));
}
var Zf, rp, op, lp;
function Zv() {
  if (Zf === void 0) {
    Zf = window, rp = /Firefox/.test(navigator.userAgent);
    var i = Element.prototype, e = Node.prototype, t = Text.prototype;
    op = Ds(e, "firstChild").get, lp = Ds(e, "nextSibling").get, _f(i) && (i[dh] = void 0, i[sl] = null, i[ph] = void 0, i.__e = void 0), _f(t) && (t[Mr] = void 0);
  }
}
function wn(i = "") {
  return document.createTextNode(i);
}
// @__NO_SIDE_EFFECTS__
function mn(i) {
  return (
    /** @type {TemplateNode | null} */
    op.call(i)
  );
}
// @__NO_SIDE_EFFECTS__
function Qo(i) {
  return (
    /** @type {TemplateNode | null} */
    lp.call(i)
  );
}
function w(i, e) {
  return /* @__PURE__ */ mn(i);
}
function Je(i, e = !1) {
  {
    var t = /* @__PURE__ */ mn(i);
    return t instanceof Comment && t.data === "" ? /* @__PURE__ */ Qo(t) : t;
  }
}
function y(i, e = 1, t = !1) {
  let n = i;
  for (; e--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ Qo(n);
  return n;
}
function Ev(i) {
  i.textContent = "";
}
function ap() {
  return !1;
}
function Av(i, e, t) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(Rd, i, void 0)
  );
}
let Ef = !1;
function Rv() {
  Ef || (Ef = !0, document.addEventListener(
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
            (e = t[rl]) == null || e.call(t);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function ea(i) {
  var e = Te, t = Pe;
  ki(null), Qi(null);
  try {
    return i();
  } finally {
    ki(e), Qi(t);
  }
}
function Pc(i, e, t, n = t) {
  i.addEventListener(e, () => ea(t));
  const s = (
    /** @type {any} */
    i[rl]
  );
  s ? i[rl] = () => {
    s(), n(!0);
  } : i[rl] = () => n(!0), Rv();
}
function hp(i) {
  Pe === null && (Te === null && Jm(), Km()), Sn && Hm();
}
function Mv(i, e) {
  var t = e.last;
  t === null ? e.last = e.first = i : (t.next = i, i.prev = t, e.last = i);
}
function hn(i, e) {
  var t = Pe;
  t !== null && (t.f & It) !== 0 && (i |= It);
  var n = {
    ctx: tt,
    deps: null,
    nodes: null,
    f: i | Qt | yi,
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
  pe == null || pe.register_created_effect(n);
  var s = n;
  if ((i & ir) !== 0)
    Xs !== null ? Xs.push(n) : bs.ensure().schedule(n);
  else if (e !== null) {
    try {
      xs(n);
    } catch (o) {
      throw Kt(n), o;
    }
    s.deps === null && s.teardown === null && s.nodes === null && s.first === s.last && // either `null`, or a singular child
    (s.f & yr) === 0 && (s = s.first, (i & Ai) !== 0 && (i & nr) !== 0 && s !== null && (s.f |= nr));
  }
  if (s !== null && (s.parent = t, t !== null && Mv(s, t), Te !== null && (Te.f & Zt) !== 0 && (i & Nn) === 0)) {
    var r = (
      /** @type {Derived} */
      Te
    );
    (r.effects ?? (r.effects = [])).push(s);
  }
  return n;
}
function Tc() {
  return Te !== null && !Ri;
}
function ta(i) {
  const e = hn(So, null);
  return ot(e, vt), e.teardown = i, e;
}
function kh(i) {
  hp();
  var e = (
    /** @type {Effect} */
    Pe.f
  ), t = !Te && (e & Xi) !== 0 && (e & $s) === 0;
  if (t) {
    var n = (
      /** @type {ComponentContext} */
      tt
    );
    (n.e ?? (n.e = [])).push(i);
  } else
    return cp(i);
}
function cp(i) {
  return hn(ir | Dd, i);
}
function Xv(i) {
  return hp(), hn(So | Dd, i);
}
function jv(i) {
  bs.ensure();
  const e = hn(Nn | yr, i);
  return (t = {}) => new Promise((n) => {
    t.outro ? ds(e, () => {
      Kt(e), n(void 0);
    }) : (Kt(e), n(void 0));
  });
}
function ia(i) {
  return hn(ir, i);
}
function lt(i, e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    tt
  ), n = { effect: null, ran: !1, deps: i };
  t.l.$.push(n), n.effect = _s(() => {
    if (i(), !n.ran) {
      n.ran = !0;
      var s = (
        /** @type {Effect} */
        Pe
      );
      try {
        Qi(s.parent), b(e);
      } finally {
        Qi(s);
      }
    }
  });
}
function Ii() {
  var i = (
    /** @type {ComponentContextLegacy} */
    tt
  );
  _s(() => {
    for (var e of i.l.$) {
      e.deps();
      var t = e.effect;
      (t.f & vt) !== 0 && t.deps !== null && ot(t, ji), wr(t) && xs(t), e.ran = !1;
    }
  });
}
function Lv(i) {
  return hn(zs | yr, i);
}
function _s(i, e = 0) {
  return hn(So | e, i);
}
function U(i, e = [], t = [], n = []) {
  kv(n, e, t, (s) => {
    hn(So, () => i(...s.map(d)));
  });
}
function Cc(i, e = 0) {
  var t = hn(Ai | e, i);
  return t;
}
function Oi(i) {
  return hn(Xi | yr, i);
}
function fp(i) {
  var e = i.teardown;
  if (e !== null) {
    const t = Sn, n = Te;
    Af(!0), ki(null);
    try {
      e.call(null);
    } finally {
      Af(t), ki(n);
    }
  }
}
function Zc(i, e = !1) {
  var t = i.first;
  for (i.first = i.last = null; t !== null; ) {
    const s = t.ac;
    s !== null && ea(() => {
      s.abort(Jl);
    });
    var n = t.next;
    (t.f & Nn) !== 0 ? t.parent = null : Kt(t, e), t = n;
  }
}
function Iv(i) {
  for (var e = i.first; e !== null; ) {
    var t = e.next;
    (e.f & Xi) === 0 && Kt(e), e = t;
  }
}
function Kt(i, e = !0) {
  var t = !1;
  (e || (i.f & qm) !== 0) && i.nodes !== null && i.nodes.end !== null && (Dv(
    i.nodes.start,
    /** @type {TemplateNode} */
    i.nodes.end
  ), t = !0), ot(i, uh), Zc(i, e && !t), io(i, 0);
  var n = i.nodes && i.nodes.t;
  if (n !== null)
    for (const r of n)
      r.stop();
  fp(i), i.f ^= uh, i.f |= wi;
  var s = i.parent;
  s !== null && s.first !== null && up(i), i.next = i.prev = i.teardown = i.ctx = i.deps = i.fn = i.nodes = i.ac = i.b = null;
}
function Dv(i, e) {
  for (; i !== null; ) {
    var t = i === e ? null : /* @__PURE__ */ Qo(i);
    i.remove(), i = t;
  }
}
function up(i) {
  var e = i.parent, t = i.prev, n = i.next;
  t !== null && (t.next = n), n !== null && (n.prev = t), e !== null && (e.first === i && (e.first = n), e.last === i && (e.last = t));
}
function ds(i, e, t = !0) {
  var n = [];
  dp(i, n, !0);
  var s = () => {
    t && Kt(i), e && e();
  }, r = n.length;
  if (r > 0) {
    var o = () => --r || s();
    for (var l of n)
      l.out(o);
  } else
    s();
}
function dp(i, e, t) {
  if ((i.f & It) === 0) {
    i.f ^= It;
    var n = i.nodes && i.nodes.t;
    if (n !== null)
      for (const l of n)
        (l.is_global || t) && e.push(l);
    for (var s = i.first; s !== null; ) {
      var r = s.next;
      if ((s.f & Nn) === 0) {
        var o = (s.f & nr) !== 0 || // If this is a branch effect without a block effect parent,
        // it means the parent block effect was pruned. In that case,
        // transparency information was transferred to the branch effect.
        (s.f & Xi) !== 0 && (i.f & Ai) !== 0;
        dp(s, e, o ? t : !1);
      }
      s = r;
    }
  }
}
function Ec(i) {
  pp(i, !0);
}
function pp(i, e) {
  if ((i.f & It) !== 0) {
    i.f ^= It, (i.f & vt) === 0 && (ot(i, Qt), bs.ensure().schedule(i));
    for (var t = i.first; t !== null; ) {
      var n = t.next, s = (t.f & nr) !== 0 || (t.f & Xi) !== 0;
      pp(t, s ? e : !1), t = n;
    }
    var r = i.nodes && i.nodes.t;
    if (r !== null)
      for (const o of r)
        (o.is_global || e) && o.in();
  }
}
function Ac(i, e) {
  if (i.nodes)
    for (var t = i.nodes.start, n = i.nodes.end; t !== null; ) {
      var s = t === n ? null : /* @__PURE__ */ Qo(t);
      e.append(t), t = s;
    }
}
let cl = !1, Sn = !1;
function Af(i) {
  Sn = i;
}
let Te = null, Ri = !1;
function ki(i) {
  Te = i;
}
let Pe = null;
function Qi(i) {
  Pe = i;
}
let xi = null;
function Op(i) {
  Te !== null && (xi === null ? xi = [i] : xi.push(i));
}
let Vt = null, ni = 0, fi = null;
function zv(i) {
  fi = i;
}
let gp = 1, is = 0, ps = is;
function Rf(i) {
  ps = i;
}
function mp() {
  return ++gp;
}
function wr(i) {
  var e = i.f;
  if ((e & Qt) !== 0)
    return !0;
  if (e & Zt && (i.f &= ~vs), (e & ji) !== 0) {
    for (var t = (
      /** @type {Value[]} */
      i.deps
    ), n = t.length, s = 0; s < n; s++) {
      var r = t[s];
      if (wr(
        /** @type {Derived} */
        r
      ) && tp(
        /** @type {Derived} */
        r
      ), r.wv > i.wv)
        return !0;
    }
    (e & yi) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Tt === null && ot(i, vt);
  }
  return !1;
}
function vp(i, e, t = !0) {
  var n = i.reactions;
  if (n !== null && !(xi !== null && cs.call(xi, i)))
    for (var s = 0; s < n.length; s++) {
      var r = n[s];
      (r.f & Zt) !== 0 ? vp(
        /** @type {Derived} */
        r,
        e,
        !1
      ) : e === r && (t ? ot(r, Qt) : (r.f & vt) !== 0 && ot(r, ji), $c(
        /** @type {Effect} */
        r
      ));
    }
}
function bp(i) {
  var g;
  var e = Vt, t = ni, n = fi, s = Te, r = xi, o = tt, l = Ri, a = ps, h = i.f;
  Vt = /** @type {null | Value[]} */
  null, ni = 0, fi = null, Te = (h & (Xi | Nn)) === 0 ? i : null, xi = null, sr(i.ctx), Ri = !1, ps = ++is, i.ac !== null && (ea(() => {
    i.ac.abort(Jl);
  }), i.ac = null);
  try {
    i.f |= vl;
    var c = (
      /** @type {Function} */
      i.fn
    ), f = c();
    i.f |= $s;
    var u = i.deps, p = pe == null ? void 0 : pe.is_fork;
    if (Vt !== null) {
      var O;
      if (p || io(i, ni), u !== null && ni > 0)
        for (u.length = ni + Vt.length, O = 0; O < Vt.length; O++)
          u[ni + O] = Vt[O];
      else
        i.deps = u = Vt;
      if (Tc() && (i.f & yi) !== 0)
        for (O = ni; O < u.length; O++)
          ((g = u[O]).reactions ?? (g.reactions = [])).push(i);
    } else !p && u !== null && ni < u.length && (io(i, ni), u.length = ni);
    if (ko() && fi !== null && !Ri && u !== null && (i.f & (Zt | ji | Qt)) === 0)
      for (O = 0; O < /** @type {Source[]} */
      fi.length; O++)
        vp(
          fi[O],
          /** @type {Effect} */
          i
        );
    if (s !== null && s !== i) {
      if (is++, s.deps !== null)
        for (let m = 0; m < t; m += 1)
          s.deps[m].rv = is;
      if (e !== null)
        for (const m of e)
          m.rv = is;
      fi !== null && (n === null ? n = fi : n.push(.../** @type {Source[]} */
      fi));
    }
    return (i.f & Dn) !== 0 && (i.f ^= Dn), f;
  } catch (m) {
    return Wd(m);
  } finally {
    i.f ^= vl, Vt = e, ni = t, fi = n, Te = s, xi = r, sr(o), Ri = l, ps = a;
  }
}
function Nv(i, e) {
  let t = e.reactions;
  if (t !== null) {
    var n = Dm.call(t, i);
    if (n !== -1) {
      var s = t.length - 1;
      s === 0 ? t = e.reactions = null : (t[n] = t[s], t.pop());
    }
  }
  if (t === null && (e.f & Zt) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Vt === null || !cs.call(Vt, e))) {
    var r = (
      /** @type {Derived} */
      e
    );
    (r.f & yi) !== 0 && (r.f ^= yi, r.f &= ~vs), r.v !== wt && kc(r), Pv(r), io(r, 0);
  }
}
function io(i, e) {
  var t = i.deps;
  if (t !== null)
    for (var n = e; n < t.length; n++)
      Nv(i, t[n]);
}
function xs(i) {
  var e = i.f;
  if ((e & wi) === 0) {
    ot(i, vt);
    var t = Pe, n = cl;
    Pe = i, cl = !0;
    try {
      (e & (Ai | Id)) !== 0 ? Iv(i) : Zc(i), fp(i);
      var s = bp(i);
      i.teardown = typeof s == "function" ? s : null, i.wv = gp;
      var r;
      Md && Pm && (i.f & Qt) !== 0 && i.deps;
    } finally {
      cl = n, Pe = t;
    }
  }
}
async function Yv() {
  await Promise.resolve(), Ov();
}
function d(i) {
  var e = i.f, t = (e & Zt) !== 0;
  if (Te !== null && !Ri) {
    var n = Pe !== null && (Pe.f & wi) !== 0;
    if (!n && (xi === null || !cs.call(xi, i))) {
      var s = Te.deps;
      if ((Te.f & vl) !== 0)
        i.rv < is && (i.rv = is, Vt === null && s !== null && s[ni] === i ? ni++ : Vt === null ? Vt = [i] : Vt.push(i));
      else {
        Te.deps ?? (Te.deps = []), cs.call(Te.deps, i) || Te.deps.push(i);
        var r = i.reactions;
        r === null ? i.reactions = [Te] : cs.call(r, Te) || r.push(Te);
      }
    }
  }
  if (Sn && us.has(i))
    return us.get(i);
  if (t) {
    var o = (
      /** @type {Derived} */
      i
    );
    if (Sn) {
      var l = o.v;
      return ((o.f & vt) === 0 && o.reactions !== null || wp(o)) && (l = _c(o)), us.set(o, l), l;
    }
    var a = (o.f & yi) === 0 && !Ri && Te !== null && (cl || (Te.f & yi) !== 0), h = (o.f & $s) === 0;
    wr(o) && (a && (o.f |= yi), tp(o)), a && !h && (ip(o), yp(o));
  }
  if (Tt != null && Tt.has(i))
    return Tt.get(i);
  if ((i.f & Dn) !== 0)
    throw i.v;
  return i.v;
}
function yp(i) {
  if (i.f |= yi, i.deps !== null)
    for (const e of i.deps)
      (e.reactions ?? (e.reactions = [])).push(i), (e.f & Zt) !== 0 && (e.f & yi) === 0 && (ip(
        /** @type {Derived} */
        e
      ), yp(
        /** @type {Derived} */
        e
      ));
}
function wp(i) {
  if (i.v === wt) return !0;
  if (i.deps === null) return !1;
  for (const e of i.deps)
    if (us.has(e) || (e.f & Zt) !== 0 && wp(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function b(i) {
  var e = Ri;
  try {
    return Ri = !0, i();
  } finally {
    Ri = e;
  }
}
function De(i) {
  if (!(typeof i != "object" || !i || i instanceof EventTarget)) {
    if (yn in i)
      Qh(i);
    else if (!Array.isArray(i))
      for (let e in i) {
        const t = i[e];
        typeof t == "object" && t && yn in t && Qh(t);
      }
  }
}
function Qh(i, e = /* @__PURE__ */ new Set()) {
  if (typeof i == "object" && i !== null && // We don't want to traverse DOM elements
  !(i instanceof EventTarget) && !e.has(i)) {
    e.add(i), i instanceof Date && i.getTime();
    for (let n in i)
      try {
        Qh(i[n], e);
      } catch {
      }
    const t = wc(i);
    if (t !== Object.prototype && t !== Array.prototype && t !== Map.prototype && t !== Set.prototype && t !== Date.prototype) {
      const n = jd(t);
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
const Lo = Symbol("events"), Wv = /* @__PURE__ */ new Set(), Mf = /* @__PURE__ */ new Set();
function qv(i, e, t, n = {}) {
  function s(r) {
    if (n.capture || $h.call(e, r), !r.cancelBubble)
      return ea(() => t == null ? void 0 : t.call(this, r));
  }
  return i.startsWith("pointer") || i.startsWith("touch") || i === "wheel" ? zn(() => {
    e.addEventListener(i, s, n);
  }) : e.addEventListener(i, s, n), s;
}
function te(i, e, t, n, s) {
  var r = { capture: n, passive: s }, o = qv(i, e, t, r);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && ta(() => {
    e.removeEventListener(i, o, r);
  });
}
let Xf = null;
function $h(i) {
  var m, v;
  var e = this, t = (
    /** @type {Node} */
    e.ownerDocument
  ), n = i.type, s = ((m = i.composedPath) == null ? void 0 : m.call(i)) || [], r = (
    /** @type {null | Element} */
    s[0] || i.target
  );
  Xf = i;
  var o = 0, l = Xf === i && i[Lo];
  if (l) {
    var a = s.indexOf(l);
    if (a !== -1 && (e === document || e === /** @type {any} */
    window)) {
      i[Lo] = e;
      return;
    }
    var h = s.indexOf(e);
    if (h === -1)
      return;
    a <= h && (o = a);
  }
  if (r = /** @type {Element} */
  s[o] || i.target, r !== e) {
    Xd(i, "currentTarget", {
      configurable: !0,
      get() {
        return r || t;
      }
    });
    var c = Te, f = Pe;
    ki(null), Qi(null);
    try {
      for (var u, p = []; r !== null; ) {
        var O = r.assignedSlot || r.parentNode || /** @type {any} */
        r.host || null;
        try {
          var g = (v = r[Lo]) == null ? void 0 : v[n];
          g != null && (!/** @type {any} */
          r.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          i.target === r) && g.call(r, i);
        } catch (S) {
          u ? p.push(S) : u = S;
        }
        if (i.cancelBubble || O === e || O === null)
          break;
        r = O;
      }
      if (u) {
        for (let S of p)
          queueMicrotask(() => {
            throw S;
          });
        throw u;
      }
    } finally {
      i[Lo] = e, delete i.currentTarget, ki(c), Qi(f);
    }
  }
}
var Zd;
const $a = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  ((Zd = globalThis == null ? void 0 : globalThis.window) == null ? void 0 : Zd.trustedTypes) && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (i) => i
  })
);
function Vv(i) {
  return (
    /** @type {string} */
    ($a == null ? void 0 : $a.createHTML(i)) ?? i
  );
}
function xp(i) {
  var e = Av("template");
  return e.innerHTML = Vv(i.replaceAll("<!>", "<!---->")), e.content;
}
function lr(i, e) {
  var t = (
    /** @type {Effect} */
    Pe
  );
  t.nodes === null && (t.nodes = { start: i, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function I(i, e) {
  var t = (e & Ad) !== 0, n = (e & Im) !== 0, s, r = !i.startsWith("<!>");
  return () => {
    s === void 0 && (s = xp(r ? i : "<!>" + i), t || (s = /** @type {TemplateNode} */
    /* @__PURE__ */ mn(s)));
    var o = (
      /** @type {TemplateNode} */
      n || rp ? document.importNode(s, !0) : s.cloneNode(!0)
    );
    if (t) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ mn(o)
      ), a = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      lr(l, a);
    } else
      lr(o, o);
    return o;
  };
}
// @__NO_SIDE_EFFECTS__
function Bv(i, e, t = "svg") {
  var n = !i.startsWith("<!>"), s = (e & Ad) !== 0, r = `<${t}>${n ? i : "<!>" + i}</${t}>`, o;
  return () => {
    if (!o) {
      var l = (
        /** @type {DocumentFragment} */
        xp(r)
      ), a = (
        /** @type {Element} */
        /* @__PURE__ */ mn(l)
      );
      if (s)
        for (o = document.createDocumentFragment(); /* @__PURE__ */ mn(a); )
          o.appendChild(
            /** @type {TemplateNode} */
            /* @__PURE__ */ mn(a)
          );
      else
        o = /** @type {Element} */
        /* @__PURE__ */ mn(a);
    }
    var h = (
      /** @type {TemplateNode} */
      o.cloneNode(!0)
    );
    if (s) {
      var c = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ mn(h)
      ), f = (
        /** @type {TemplateNode} */
        h.lastChild
      );
      lr(c, f);
    } else
      lr(h, h);
    return h;
  };
}
// @__NO_SIDE_EFFECTS__
function $o(i, e) {
  return /* @__PURE__ */ Bv(i, e, "svg");
}
function _h(i = "") {
  {
    var e = wn(i + "");
    return lr(e, e), e;
  }
}
function Yn() {
  var i = document.createDocumentFragment(), e = document.createComment(""), t = wn();
  return i.append(e, t), lr(e, t), i;
}
function A(i, e) {
  i !== null && i.before(
    /** @type {Node} */
    e
  );
}
const Gv = ["touchstart", "touchmove"];
function Uv(i) {
  return Gv.includes(i);
}
function V(i, e) {
  var t = e == null ? "" : typeof e == "object" ? `${e}` : e;
  t !== /** @type {any} */
  (i[Mr] ?? (i[Mr] = i.nodeValue)) && (i[Mr] = t, i.nodeValue = `${t}`);
}
function Fv(i, e) {
  return Hv(i, e);
}
const Io = /* @__PURE__ */ new Map();
function Hv(i, { target: e, anchor: t, props: n = {}, events: s, context: r, intro: o = !0, transformError: l }) {
  Zv();
  var a = void 0, h = jv(() => {
    var c = t ?? e.appendChild(wn());
    bv(
      /** @type {TemplateNode} */
      c,
      {
        pending: () => {
        }
      },
      (p) => {
        $t({});
        var O = (
          /** @type {ComponentContext} */
          tt
        );
        r && (O.c = r), s && (n.$$events = s), a = i(p, n) || {}, _t();
      },
      l
    );
    var f = /* @__PURE__ */ new Set(), u = (p) => {
      for (var O = 0; O < p.length; O++) {
        var g = p[O];
        if (!f.has(g)) {
          f.add(g);
          var m = Uv(g);
          for (const x of [e, document]) {
            var v = Io.get(x);
            v === void 0 && (v = /* @__PURE__ */ new Map(), Io.set(x, v));
            var S = v.get(g);
            S === void 0 ? (x.addEventListener(g, $h, { passive: m }), v.set(g, 1)) : v.set(g, S + 1);
          }
        }
      }
    };
    return u(Kl(Wv)), Mf.add(u), () => {
      var m;
      for (var p of f)
        for (const v of [e, document]) {
          var O = (
            /** @type {Map<string, number>} */
            Io.get(v)
          ), g = (
            /** @type {number} */
            O.get(p)
          );
          --g == 0 ? (v.removeEventListener(p, $h), O.delete(p), O.size === 0 && Io.delete(v)) : O.set(p, g);
        }
      Mf.delete(u), c !== t && ((m = c.parentNode) == null || m.removeChild(c));
    };
  });
  return Kv.set(a, h), a;
}
let Kv = /* @__PURE__ */ new WeakMap();
var Zi, Fi, oi, hs, wo, xo, Fl;
class Jv {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, t = !0) {
    /** @type {TemplateNode} */
    Yt(this, "anchor");
    /** @type {Map<Batch, Key>} */
    Qe(this, Zi, /* @__PURE__ */ new Map());
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
    Qe(this, Fi, /* @__PURE__ */ new Map());
    /**
     * Similar to #onscreen with respect to the keys, but contains branches that are not yet
     * in the DOM, because their insertion is deferred.
     * @type {Map<Key, Branch>}
     */
    Qe(this, oi, /* @__PURE__ */ new Map());
    /**
     * Keys of effects that are currently outroing
     * @type {Set<Key>}
     */
    Qe(this, hs, /* @__PURE__ */ new Set());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    Qe(this, wo, !0);
    /**
     * @param {Batch} batch
     */
    Qe(this, xo, (e) => {
      if (_(this, Zi).has(e)) {
        var t = (
          /** @type {Key} */
          _(this, Zi).get(e)
        ), n = _(this, Fi).get(t);
        if (n)
          Ec(n), _(this, hs).delete(t);
        else {
          var s = _(this, oi).get(t);
          s && (_(this, Fi).set(t, s.effect), _(this, oi).delete(t), s.fragment.lastChild.remove(), this.anchor.before(s.fragment), n = s.effect);
        }
        for (const [r, o] of _(this, Zi)) {
          if (_(this, Zi).delete(r), r === e)
            break;
          const l = _(this, oi).get(o);
          l && (Kt(l.effect), _(this, oi).delete(o));
        }
        for (const [r, o] of _(this, Fi)) {
          if (r === t || _(this, hs).has(r)) continue;
          const l = () => {
            if (Array.from(_(this, Zi).values()).includes(r)) {
              var h = document.createDocumentFragment();
              Ac(o, h), h.append(wn()), _(this, oi).set(r, { effect: o, fragment: h });
            } else
              Kt(o);
            _(this, hs).delete(r), _(this, Fi).delete(r);
          };
          _(this, wo) || !n ? (_(this, hs).add(r), ds(o, l, !1)) : l();
        }
      }
    });
    /**
     * @param {Batch} batch
     */
    Qe(this, Fl, (e) => {
      _(this, Zi).delete(e);
      const t = Array.from(_(this, Zi).values());
      for (const [n, s] of _(this, oi))
        t.includes(n) || (Kt(s.effect), _(this, oi).delete(n));
    });
    this.anchor = e, ke(this, wo, t);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, t) {
    var n = (
      /** @type {Batch} */
      pe
    ), s = ap();
    if (t && !_(this, Fi).has(e) && !_(this, oi).has(e))
      if (s) {
        var r = document.createDocumentFragment(), o = wn();
        r.append(o), _(this, oi).set(e, {
          effect: Oi(() => t(o)),
          fragment: r
        });
      } else
        _(this, Fi).set(
          e,
          Oi(() => t(this.anchor))
        );
    if (_(this, Zi).set(n, e), s) {
      for (const [l, a] of _(this, Fi))
        l === e ? n.unskip_effect(a) : n.skip_effect(a);
      for (const [l, a] of _(this, oi))
        l === e ? n.unskip_effect(a.effect) : n.skip_effect(a.effect);
      n.oncommit(_(this, xo)), n.ondiscard(_(this, Fl));
    } else
      _(this, xo).call(this, n);
  }
}
Zi = new WeakMap(), Fi = new WeakMap(), oi = new WeakMap(), hs = new WeakMap(), wo = new WeakMap(), xo = new WeakMap(), Fl = new WeakMap();
function Ps(i) {
  tt === null && xc(), br && tt.l !== null ? t0(tt).m.push(i) : kh(() => {
    const e = b(i);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
function Sp(i) {
  tt === null && xc(), Ps(() => () => b(i));
}
function e0(i, e, { bubbles: t = !1, cancelable: n = !1 } = {}) {
  return new CustomEvent(i, { detail: e, bubbles: t, cancelable: n });
}
function Rc() {
  const i = tt;
  return i === null && xc(), (e, t, n) => {
    var r;
    const s = (
      /** @type {Record<string, Function | Function[]>} */
      (r = i.s.$$events) == null ? void 0 : r[
        /** @type {string} */
        e
      ]
    );
    if (s) {
      const o = Hl(s) ? s.slice() : [s], l = e0(
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
function t0(i) {
  var e = (
    /** @type {ComponentContextLegacy} */
    i.l
  );
  return e.u ?? (e.u = { a: [], b: [], m: [] });
}
function J(i, e, t = !1) {
  var n = new Jv(i), s = t ? nr : 0;
  function r(o, l) {
    n.ensure(o, l);
  }
  Cc(() => {
    var o = !1;
    e((l, a = 0) => {
      o = !0, r(a, l);
    }), o || r(-1, null);
  }, s);
}
function it(i, e) {
  return e;
}
function i0(i, e, t) {
  for (var n = [], s = e.length, r, o = e.length, l = 0; l < s; l++) {
    let f = e[l];
    ds(
      f,
      () => {
        if (r) {
          if (r.pending.delete(f), r.done.add(f), r.pending.size === 0) {
            var u = (
              /** @type {Set<EachOutroGroup>} */
              i.outrogroups
            );
            Ph(i, Kl(r.done)), u.delete(r), u.size === 0 && (i.outrogroups = null);
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
      Ev(c), c.append(h), i.items.clear();
    }
    Ph(i, e, !a);
  } else
    r = {
      pending: new Set(e),
      done: /* @__PURE__ */ new Set()
    }, (i.outrogroups ?? (i.outrogroups = /* @__PURE__ */ new Set())).add(r);
}
function Ph(i, e, t = !0) {
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
      r.f |= Ji;
      const o = document.createDocumentFragment();
      Ac(r, o);
    } else
      Kt(e[s], t);
  }
}
var jf;
function nt(i, e, t, n, s, r = null) {
  var o = i, l = /* @__PURE__ */ new Map(), a = (e & Ed) !== 0;
  if (a) {
    var h = (
      /** @type {Element} */
      i
    );
    o = h.appendChild(wn());
  }
  var c = null, f = /* @__PURE__ */ St(() => {
    var x = t();
    return Hl(x) ? x : x == null ? [] : Kl(x);
  }), u, p = /* @__PURE__ */ new Map(), O = !0;
  function g(x) {
    (S.effect.f & wi) === 0 && (S.pending.delete(x), S.fallback = c, n0(S, u, o, e, n), c !== null && (u.length === 0 ? (c.f & Ji) === 0 ? Ec(c) : (c.f ^= Ji, jr(c, null, o)) : ds(c, () => {
      c = null;
    })));
  }
  function m(x) {
    S.pending.delete(x);
  }
  var v = Cc(() => {
    u = /** @type {V[]} */
    d(f);
    for (var x = u.length, P = /* @__PURE__ */ new Set(), E = (
      /** @type {Batch} */
      pe
    ), R = ap(), C = 0; C < x; C += 1) {
      var Y = u[C], L = n(Y, C), X = O ? null : l.get(L);
      X ? (X.v && or(X.v, Y), X.i && or(X.i, C), R && E.unskip_effect(X.e)) : (X = s0(
        l,
        O ? o : jf ?? (jf = wn()),
        Y,
        L,
        C,
        s,
        e,
        t
      ), O || (X.e.f |= Ji), l.set(L, X)), P.add(L);
    }
    if (x === 0 && r && !c && (O ? c = Oi(() => r(o)) : (c = Oi(() => r(jf ?? (jf = wn()))), c.f |= Ji)), x > P.size && Fm(), !O)
      if (p.set(E, P), R) {
        for (const [M, k] of l)
          P.has(M) || E.skip_effect(k.e);
        E.oncommit(g), E.ondiscard(m);
      } else
        g(E);
    d(f);
  }), S = { effect: v, items: l, pending: p, outrogroups: null, fallback: c };
  O = !1;
}
function Pr(i) {
  for (; i !== null && (i.f & Xi) === 0; )
    i = i.next;
  return i;
}
function n0(i, e, t, n, s) {
  var X, M, k, T, D, $, Z, N, oe;
  var r = (n & Em) !== 0, o = e.length, l = i.items, a = Pr(i.effect.first), h, c = null, f, u = [], p = [], O, g, m, v;
  if (r)
    for (v = 0; v < o; v += 1)
      O = e[v], g = s(O, v), m = /** @type {EachItem} */
      l.get(g).e, (m.f & Ji) === 0 && ((M = (X = m.nodes) == null ? void 0 : X.a) == null || M.measure(), (f ?? (f = /* @__PURE__ */ new Set())).add(m));
  for (v = 0; v < o; v += 1) {
    if (O = e[v], g = s(O, v), m = /** @type {EachItem} */
    l.get(g).e, i.outrogroups !== null)
      for (const se of i.outrogroups)
        se.pending.delete(m), se.done.delete(m);
    if ((m.f & It) !== 0 && (Ec(m), r && ((T = (k = m.nodes) == null ? void 0 : k.a) == null || T.unfix(), (f ?? (f = /* @__PURE__ */ new Set())).delete(m))), (m.f & Ji) !== 0)
      if (m.f ^= Ji, m === a)
        jr(m, null, t);
      else {
        var S = c ? c.next : a;
        m === i.effect.last && (i.effect.last = m.prev), m.prev && (m.prev.next = m.next), m.next && (m.next.prev = m.prev), Tn(i, c, m), Tn(i, m, S), jr(m, S, t), c = m, u = [], p = [], a = Pr(c.next);
        continue;
      }
    if (m !== a) {
      if (h !== void 0 && h.has(m)) {
        if (u.length < p.length) {
          var x = p[0], P;
          c = x.prev;
          var E = u[0], R = u[u.length - 1];
          for (P = 0; P < u.length; P += 1)
            jr(u[P], x, t);
          for (P = 0; P < p.length; P += 1)
            h.delete(p[P]);
          Tn(i, E.prev, R.next), Tn(i, c, E), Tn(i, R, x), a = x, c = R, v -= 1, u = [], p = [];
        } else
          h.delete(m), jr(m, a, t), Tn(i, m.prev, m.next), Tn(i, m, c === null ? i.effect.first : c.next), Tn(i, c, m), c = m;
        continue;
      }
      for (u = [], p = []; a !== null && a !== m; )
        (h ?? (h = /* @__PURE__ */ new Set())).add(a), p.push(a), a = Pr(a.next);
      if (a === null)
        continue;
    }
    (m.f & Ji) === 0 && u.push(m), c = m, a = Pr(m.next);
  }
  if (i.outrogroups !== null) {
    for (const se of i.outrogroups)
      se.pending.size === 0 && (Ph(i, Kl(se.done)), (D = i.outrogroups) == null || D.delete(se));
    i.outrogroups.size === 0 && (i.outrogroups = null);
  }
  if (a !== null || h !== void 0) {
    var C = [];
    if (h !== void 0)
      for (m of h)
        (m.f & It) === 0 && C.push(m);
    for (; a !== null; )
      (a.f & It) === 0 && a !== i.fallback && C.push(a), a = Pr(a.next);
    var Y = C.length;
    if (Y > 0) {
      var L = (n & Ed) !== 0 && o === 0 ? t : null;
      if (r) {
        for (v = 0; v < Y; v += 1)
          (Z = ($ = C[v].nodes) == null ? void 0 : $.a) == null || Z.measure();
        for (v = 0; v < Y; v += 1)
          (oe = (N = C[v].nodes) == null ? void 0 : N.a) == null || oe.fix();
      }
      i0(i, C, L);
    }
  }
  r && zn(() => {
    var se, G;
    if (f !== void 0)
      for (m of f)
        (G = (se = m.nodes) == null ? void 0 : se.a) == null || G.apply();
  });
}
function s0(i, e, t, n, s, r, o, l) {
  var a = (o & Cm) !== 0 ? (o & Am) === 0 ? /* @__PURE__ */ F(t, !1, !1) : ws(t) : null, h = (o & Zm) !== 0 ? ws(s) : null;
  return {
    v: a,
    i: h,
    e: Oi(() => (r(e, a ?? t, h ?? s, l), () => {
      i.delete(n);
    }))
  };
}
function jr(i, e, t) {
  if (i.nodes)
    for (var n = i.nodes.start, s = i.nodes.end, r = e && (e.f & Ji) === 0 ? (
      /** @type {EffectNodes} */
      e.nodes.start
    ) : t; n !== null; ) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Qo(n)
      );
      if (r.before(n), n === s)
        return;
      n = o;
    }
}
function Tn(i, e, t) {
  e === null ? i.effect.first = t : e.next = t, t === null ? i.effect.last = e : t.prev = e;
}
function r0(i, e, t) {
  ia(() => {
    var n = b(() => e(i, t == null ? void 0 : t()) || {});
    if (t && (n != null && n.update)) {
      var s = !1, r = (
        /** @type {any} */
        {}
      );
      _s(() => {
        var o = t();
        De(o), s && Sc(r, o) && (r = o, n.update(o));
      }), s = !0;
    }
    if (n != null && n.destroy)
      return () => (
        /** @type {Function} */
        n.destroy()
      );
  });
}
const Lf = [...` 	
\r\f \v\uFEFF`];
function o0(i, e, t) {
  var n = i == null ? "" : "" + i;
  if (e && (n = n ? n + " " + e : e), t) {
    for (var s of Object.keys(t))
      if (t[s])
        n = n ? n + " " + s : s;
      else if (n.length)
        for (var r = s.length, o = 0; (o = n.indexOf(s, o)) >= 0; ) {
          var l = o + r;
          (o === 0 || Lf.includes(n[o - 1])) && (l === n.length || Lf.includes(n[l])) ? n = (o === 0 ? "" : n.substring(0, o)) + n.substring(l + 1) : o = l;
        }
  }
  return n === "" ? null : n;
}
function l0(i, e) {
  return i == null ? null : String(i);
}
function Ft(i, e, t, n, s, r) {
  var o = (
    /** @type {any} */
    i[dh]
  );
  if (o !== t || o === void 0) {
    var l = o0(t, n, r);
    l == null ? i.removeAttribute("class") : i.className = l, i[dh] = t;
  } else if (r && s !== r)
    for (var a in r) {
      var h = !!r[a];
      (s == null || h !== !!s[a]) && i.classList.toggle(a, h);
    }
  return r;
}
function kp(i, e, t, n) {
  var s = (
    /** @type {any} */
    i[ph]
  );
  if (s !== e) {
    var r = l0(e);
    r == null ? i.removeAttribute("style") : i.style.cssText = r, i[ph] = e;
  }
  return n;
}
function Mc(i, e, t = !1) {
  if (i.multiple) {
    if (e == null)
      return;
    if (!Hl(e))
      return lv();
    for (var n of i.options)
      n.selected = e.includes(Br(n));
    return;
  }
  for (n of i.options) {
    var s = Br(n);
    if (Cv(s, e)) {
      n.selected = !0;
      return;
    }
  }
  (!t || e !== void 0) && (i.selectedIndex = -1);
}
function Qp(i) {
  var e = new MutationObserver(() => {
    Mc(i, i.__value);
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
  }), ta(() => {
    e.disconnect();
  });
}
function Th(i, e, t = e) {
  var n = /* @__PURE__ */ new WeakSet(), s = !0;
  Pc(i, "change", (r) => {
    var o = r ? "[selected]" : ":checked", l;
    if (i.multiple)
      l = [].map.call(i.querySelectorAll(o), Br);
    else {
      var a = i.querySelector(o) ?? // will fall back to first non-disabled option if no option is selected
      i.querySelector("option:not([disabled])");
      l = a && Br(a);
    }
    t(l), i.__value = l, pe !== null && n.add(pe);
  }), ia(() => {
    var r = e();
    if (i === document.activeElement) {
      var o = (
        /** @type {Batch} */
        pe
      );
      if (n.has(o))
        return;
    }
    if (Mc(i, r, s), s && r === void 0) {
      var l = i.querySelector(":checked");
      l !== null && (r = Br(l), t(r));
    }
    i.__value = r, s = !1;
  }), Qp(i);
}
function Br(i) {
  return "__value" in i ? i.__value : i.value;
}
const a0 = Symbol("is custom element"), h0 = Symbol("is html"), c0 = Gm ? "progress" : "PROGRESS";
function Lr(i, e) {
  var t = Xc(i);
  t.value === (t.value = // treat null and undefined the same for the initial value
  e ?? void 0) || // @ts-expect-error
  // `progress` elements always need their value set when it's `0`
  i.value === e && (e !== 0 || i.nodeName !== c0) || (i.value = e ?? "");
}
function f0(i, e) {
  var t = Xc(i);
  t.checked !== (t.checked = // treat null and undefined the same for the initial value
  e ?? void 0) && (i.checked = e);
}
function He(i, e, t, n) {
  var s = Xc(i);
  s[e] !== (s[e] = t) && (e === "loading" && (i[Bm] = t), t == null ? i.removeAttribute(e) : typeof t != "string" && u0(i).includes(e) ? i[e] = t : i.setAttribute(e, t));
}
function Xc(i) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    /** @type {any} */
    i[sl] ?? (i[sl] = {
      [a0]: i.nodeName.includes("-"),
      [h0]: i.namespaceURI === Rd
    })
  );
}
var If = /* @__PURE__ */ new Map();
function u0(i) {
  var e = i.getAttribute("is") || i.nodeName, t = If.get(e);
  if (t) return t;
  If.set(e, t = []);
  for (var n, s = i, r = Element.prototype; r !== s; ) {
    n = jd(s);
    for (var o in n)
      n[o].set && // better safe than sorry, we don't want spread attributes to mess with HTML content
      o !== "innerHTML" && o !== "textContent" && o !== "innerText" && t.push(o);
    s = wc(s);
  }
  return t;
}
function Gt(i, e, t = e) {
  var n = /* @__PURE__ */ new WeakSet();
  Pc(i, "input", async (s) => {
    var r = s ? i.defaultValue : i.value;
    if (r = _a(i) ? Pa(r) : r, t(r), pe !== null && n.add(pe), await Yv(), r !== (r = e())) {
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
  b(e) == null && i.value && (t(_a(i) ? Pa(i.value) : i.value), pe !== null && n.add(pe)), _s(() => {
    var s = e();
    if (i === document.activeElement) {
      var r = (
        /** @type {Batch} */
        pe
      );
      if (n.has(r))
        return;
    }
    _a(i) && s === Pa(i.value) || i.type === "date" && !s && !i.value || s !== i.value && (i.value = s ?? "");
  });
}
function $p(i, e, t = e) {
  Pc(i, "change", (n) => {
    var s = n ? i.defaultChecked : i.checked;
    t(s);
  }), // If we are hydrating and the value has since changed,
  // then use the update value from the input instead.
  // If defaultChecked is set, then checked == defaultChecked
  b(e) == null && t(i.checked), _s(() => {
    var n = e();
    i.checked = !!n;
  });
}
function _a(i) {
  var e = i.type;
  return e === "number" || e === "range";
}
function Pa(i) {
  return i === "" ? null : +i;
}
function Ta(i, e) {
  return i === e || (i == null ? void 0 : i[yn]) === e;
}
function jc(i = {}, e, t, n) {
  var s = (
    /** @type {ComponentContext} */
    tt.r
  ), r = (
    /** @type {Effect} */
    Pe
  );
  return ia(() => {
    var o, l;
    return _s(() => {
      o = l, l = [], b(() => {
        Ta(t(...l), i) || (e(i, ...l), o && Ta(t(...o), i) && e(null, ...o));
      });
    }), () => {
      let a = r;
      for (; a !== s && a.parent !== null && a.parent.f & uh; )
        a = a.parent;
      const h = () => {
        l && Ta(t(...l), i) && e(null, ...l);
      }, c = a.teardown;
      a.teardown = () => {
        h(), c == null || c();
      };
    };
  }), i;
}
function Ch(i) {
  return function(...e) {
    var t = (
      /** @type {Event} */
      e[0]
    );
    t.target === this && (i == null || i.apply(this, e));
  };
}
function Ca(i) {
  return function(...e) {
    var t = (
      /** @type {Event} */
      e[0]
    );
    return t.stopPropagation(), i == null ? void 0 : i.apply(this, e);
  };
}
function Et(i = !1) {
  const e = (
    /** @type {ComponentContextLegacy} */
    tt
  ), t = e.l.u;
  if (!t) return;
  let n = () => De(e.s);
  if (i) {
    let s = 0, r = (
      /** @type {Record<string, any>} */
      {}
    );
    const o = /* @__PURE__ */ rr(() => {
      let l = !1;
      const a = e.s;
      for (const h in a)
        a[h] !== r[h] && (r[h] = a[h], l = !0);
      return l && s++, s;
    });
    n = () => d(o);
  }
  t.b.length && Xv(() => {
    Df(e, n), ch(t.b);
  }), kh(() => {
    const s = b(() => t.m.map(Ym));
    return () => {
      for (const r of s)
        typeof r == "function" && r();
    };
  }), t.a.length && kh(() => {
    Df(e, n), ch(t.a);
  });
}
function Df(i, e) {
  if (i.l.s)
    for (const t of i.l.s) d(t);
  e();
}
function et(i, e, t, n) {
  var P;
  var s = !br || (t & Mm) !== 0, r = (t & jm) !== 0, o = (t & Lm) !== 0, l = (
    /** @type {V} */
    n
  ), a = !0, h = (
    /** @type {Derived<V> | undefined} */
    void 0
  ), c = () => o && s ? (h ?? (h = /* @__PURE__ */ rr(
    /** @type {() => V} */
    n
  )), d(h)) : (a && (a = !1, l = o ? b(
    /** @type {() => V} */
    n
  ) : (
    /** @type {V} */
    n
  )), l);
  let f;
  if (r) {
    var u = yn in i || Vm in i;
    f = ((P = Ds(i, e)) == null ? void 0 : P.set) ?? (u && e in i ? (E) => i[e] = E : void 0);
  }
  var p, O = !1;
  r ? [p, O] = uv(() => (
    /** @type {V} */
    i[e]
  )) : p = /** @type {V} */
  i[e], p === void 0 && n !== void 0 && (p = c(), f && (s && tv(), f(p)));
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
  }, s && (t & Xm) === 0)
    return g;
  if (f) {
    var m = i.$$legacy;
    return (
      /** @type {() => V} */
      (function(E, R) {
        return arguments.length > 0 ? ((!s || !R || m || O) && f(R ? g() : E), E) : g();
      })
    );
  }
  var v = !1, S = ((t & Rm) !== 0 ? rr : St)(() => (v = !1, g()));
  r && d(S);
  var x = (
    /** @type {Effect} */
    Pe
  );
  return (
    /** @type {() => V} */
    (function(E, R) {
      if (arguments.length > 0) {
        const C = R ? d(S) : s && r ? js(E) : E;
        return Q(S, C), v = !0, l !== void 0 && (l = C), E;
      }
      return Sn && v || (x.f & wi) !== 0 ? S.v : d(S);
    })
  );
}
const ar = 160, hr = 40, wl = 24;
function d0(i, e, t) {
  return i.x < e.x + e.w + t && i.x + i.w + t > e.x && i.y < e.y + e.h + t && i.y + i.h + t > e.y;
}
function zf(i) {
  return { x: i.x, y: i.y, w: ar, h: hr };
}
function Nf(i, e, t) {
  const n = zf(e);
  for (const s of Object.values(i.nodes))
    if (!(t && s.id === t) && s.position && d0(n, zf(s.position), wl))
      return !0;
  return !1;
}
const p0 = ar / 4, O0 = 40;
function _p(i, e, t) {
  if (!Nf(i, e, t)) return e;
  for (let s = 1; s <= O0; s++) {
    const r = s * p0, o = [
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
      if (!Nf(i, l, t)) return l;
  }
  let n = e.y;
  for (const s of Object.values(i.nodes))
    t && s.id === t || s.position && (n = Math.max(n, s.position.y + hr));
  return { x: e.x, y: n + wl };
}
const ht = Qn({ nodes: {}, edges: [], toolEdges: [] }), Wn = Qn(null), fl = Qn(null), As = Qn({
  triggerType: "rest",
  description: "",
  cronExpression: "",
  webhookUrl: ""
});
function g0(i) {
  ht.update((e) => ({ ...e, edges: [...e.edges, i] }));
}
function Pp(i, e, t) {
  const n = `${i.replace(/:/g, "_")}_${Date.now()}`;
  return ht.update((s) => ({
    ...s,
    nodes: {
      ...s.nodes,
      [n]: { id: n, type: i, label: e, config: {}, position: _p(s, t) }
    }
  })), n;
}
function m0(i, e) {
  ht.update((t) => ({
    ...t,
    nodes: {
      ...t.nodes,
      [i]: { ...t.nodes[i], position: _p(t, e, i) }
    }
  }));
}
var Tp = Object.defineProperty, v0 = (i, e, t) => e in i ? Tp(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t, b0 = (i, e) => {
  for (var t in e) Tp(i, t, { get: e[t], enumerable: !0 });
}, y0 = (i, e, t) => v0(i, e + "", t), w0 = {};
b0(w0, { Graph: () => _i, alg: () => Lc, json: () => Zp, version: () => k0 });
var x0 = Object.defineProperty, Cp = (i, e) => {
  for (var t in e) x0(i, t, { get: e[t], enumerable: !0 });
}, _i = class {
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
    let h = Ir(this._isDirected, s, r, o);
    if (h in this._edgeLabels) return a && (this._edgeLabels[h] = l), this;
    if (o !== void 0 && !this._isMultigraph) throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(s), this.setNode(r), this._edgeLabels[h] = a ? l : this._defaultEdgeLabelFn(s, r, o);
    let c = S0(this._isDirected, s, r, o);
    return s = c.v, r = c.w, Object.freeze(c), this._edgeObjs[h] = c, Yf(this._preds[r], s), Yf(this._sucs[s], r), this._in[r][h] = c, this._out[s][h] = c, this._edgeCount++, this;
  }
  edge(i, e, t) {
    let n = arguments.length === 1 ? Za(this._isDirected, i) : Ir(this._isDirected, i, e, t);
    return this._edgeLabels[n];
  }
  edgeAsObj(i, e, t) {
    let n = arguments.length === 1 ? this.edge(i) : this.edge(i, e, t);
    return typeof n != "object" ? { label: n } : n;
  }
  hasEdge(i, e, t) {
    return (arguments.length === 1 ? Za(this._isDirected, i) : Ir(this._isDirected, i, e, t)) in this._edgeLabels;
  }
  removeEdge(i, e, t) {
    let n = arguments.length === 1 ? Za(this._isDirected, i) : Ir(this._isDirected, i, e, t), s = this._edgeObjs[n];
    if (s) {
      let r = s.v, o = s.w;
      delete this._edgeLabels[n], delete this._edgeObjs[n], Wf(this._preds[o], r), Wf(this._sucs[r], o), delete this._in[o][n], delete this._out[r][n], this._edgeCount--;
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
function Yf(i, e) {
  i[e] ? i[e]++ : i[e] = 1;
}
function Wf(i, e) {
  i[e] !== void 0 && !--i[e] && delete i[e];
}
function Ir(i, e, t, n) {
  let s = "" + e, r = "" + t;
  if (!i && s > r) {
    let o = s;
    s = r, r = o;
  }
  return s + "" + r + "" + (n === void 0 ? "\0" : n);
}
function S0(i, e, t, n) {
  let s = "" + e, r = "" + t;
  if (!i && s > r) {
    let l = s;
    s = r, r = l;
  }
  let o = { v: s, w: r };
  return n && (o.name = n), o;
}
function Za(i, e) {
  return Ir(i, e.v, e.w, e.name);
}
var k0 = "4.0.1", Zp = {};
Cp(Zp, { read: () => P0, write: () => Q0 });
function Q0(i) {
  let e = { options: { directed: i.isDirected(), multigraph: i.isMultigraph(), compound: i.isCompound() }, nodes: $0(i), edges: _0(i) }, t = i.graph();
  return t !== void 0 && (e.value = structuredClone(t)), e;
}
function $0(i) {
  return i.nodes().map((e) => {
    let t = i.node(e), n = i.parent(e), s = { v: e };
    return t !== void 0 && (s.value = t), n !== void 0 && (s.parent = n), s;
  });
}
function _0(i) {
  return i.edges().map((e) => {
    let t = i.edge(e), n = { v: e.v, w: e.w };
    return e.name !== void 0 && (n.name = e.name), t !== void 0 && (n.value = t), n;
  });
}
function P0(i) {
  let e = new _i(i.options);
  return i.value !== void 0 && e.setGraph(i.value), i.nodes.forEach((t) => {
    e.setNode(t.v, t.value), t.parent && e.setParent(t.v, t.parent);
  }), i.edges.forEach((t) => {
    e.setEdge({ v: t.v, w: t.w, name: t.name }, t.value);
  }), e;
}
var Lc = {};
Cp(Lc, { CycleException: () => Sl, bellmanFord: () => Ep, components: () => Z0, dijkstra: () => xl, dijkstraAll: () => R0, findCycles: () => M0, floydWarshall: () => j0, isAcyclic: () => I0, postorder: () => z0, preorder: () => N0, prim: () => Y0, shortestPaths: () => W0, tarjan: () => Rp, topsort: () => Mp });
var T0 = () => 1;
function Ep(i, e, t, n) {
  return C0(i, String(e), t || T0, n || function(s) {
    return i.outEdges(s);
  });
}
function C0(i, e, t, n) {
  let s = {}, r, o = 0, l = i.nodes(), a = function(f) {
    let u = t(f);
    s[f.v].distance + u < s[f.w].distance && (s[f.w] = { distance: s[f.v].distance + u, predecessor: f.v }, r = !0);
  }, h = function() {
    l.forEach(function(f) {
      n(f).forEach(function(u) {
        let p = u.v === f ? u.v : u.w, O = p === u.v ? u.w : u.v;
        a({ v: p, w: O });
      });
    });
  };
  l.forEach(function(f) {
    let u = f === e ? 0 : Number.POSITIVE_INFINITY;
    s[f] = { distance: u, predecessor: "" };
  });
  let c = l.length;
  for (let f = 1; f < c && (r = !1, o++, h(), !!r); f++) ;
  if (o === c - 1 && (r = !1, h(), r)) throw new Error("The graph contains a negative weight cycle");
  return s;
}
function Z0(i) {
  let e = {}, t = [], n;
  function s(r) {
    r in e || (e[r] = !0, n.push(r), i.successors(r).forEach(s), i.predecessors(r).forEach(s));
  }
  return i.nodes().forEach(function(r) {
    n = [], s(r), n.length && t.push(n);
  }), t;
}
var Ap = class {
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
}, E0 = () => 1;
function xl(i, e, t, n) {
  let s = function(r) {
    return i.outEdges(r);
  };
  return A0(i, String(e), t || E0, n || s);
}
function A0(i, e, t, n) {
  let s = {}, r = new Ap(), o, l, a = function(h) {
    let c = h.v !== o ? h.v : h.w, f = s[c], u = t(h), p = l.distance + u;
    if (u < 0) throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + h + " Weight: " + u);
    p < f.distance && (f.distance = p, f.predecessor = o, r.decrease(c, p));
  };
  for (i.nodes().forEach(function(h) {
    let c = h === e ? 0 : Number.POSITIVE_INFINITY;
    s[h] = { distance: c, predecessor: "" }, r.add(h, c);
  }); r.size() > 0 && (o = r.removeMin(), l = s[o], l.distance !== Number.POSITIVE_INFINITY); ) n(o).forEach(a);
  return s;
}
function R0(i, e, t) {
  return i.nodes().reduce(function(n, s) {
    return n[s] = xl(i, s, e, t), n;
  }, {});
}
function Rp(i) {
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
function M0(i) {
  return Rp(i).filter(function(e) {
    return e.length > 1 || e.length === 1 && i.hasEdge(e[0], e[0]);
  });
}
var X0 = () => 1;
function j0(i, e, t) {
  return L0(i, e || X0, t || function(n) {
    return i.outEdges(n);
  });
}
function L0(i, e, t) {
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
        let c = a[r], f = o[h], u = a[h], p = c.distance + f.distance;
        p < u.distance && (u.distance = p, u.predecessor = f.predecessor);
      });
    });
  }), n;
}
var Sl = class extends Error {
  constructor(...i) {
    super(...i);
  }
};
function Mp(i) {
  let e = {}, t = {}, n = [];
  function s(r) {
    if (r in t) throw new Sl();
    r in e || (t[r] = !0, e[r] = !0, i.predecessors(r).forEach(s), delete t[r], n.push(r));
  }
  if (i.sinks().forEach(s), Object.keys(e).length !== i.nodeCount()) throw new Sl();
  return n;
}
function I0(i) {
  try {
    Mp(i);
  } catch (e) {
    if (e instanceof Sl) return !1;
    throw e;
  }
  return !0;
}
function D0(i, e, t, n, s) {
  Array.isArray(e) || (e = [e]);
  let r = ((l) => {
    var a;
    return (a = i.isDirected() ? i.successors(l) : i.neighbors(l)) != null ? a : [];
  }), o = {};
  return e.forEach(function(l) {
    if (!i.hasNode(l)) throw new Error("Graph does not have node: " + l);
    s = Xp(i, l, t === "post", o, r, n, s);
  }), s;
}
function Xp(i, e, t, n, s, r, o) {
  return e in n || (n[e] = !0, t || (o = r(o, e)), s(e).forEach(function(l) {
    o = Xp(i, l, t, n, s, r, o);
  }), t && (o = r(o, e))), o;
}
function jp(i, e, t) {
  return D0(i, e, t, function(n, s) {
    return n.push(s), n;
  }, []);
}
function z0(i, e) {
  return jp(i, e, "post");
}
function N0(i, e) {
  return jp(i, e, "pre");
}
function Y0(i, e) {
  let t = new _i(), n = {}, s = new Ap(), r;
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
function W0(i, e, t, n) {
  return q0(i, e, t, n ?? ((s) => {
    let r = i.outEdges(s);
    return r ?? [];
  }));
}
function q0(i, e, t, n) {
  if (t === void 0) return xl(i, e, t, n);
  let s = !1, r = i.nodes();
  for (let o = 0; o < r.length; o++) {
    let l = n(r[o]);
    for (let a = 0; a < l.length; a++) {
      let h = l[a], c = h.v === r[o] ? h.v : h.w, f = c === h.v ? h.w : h.v;
      t({ v: c, w: f }) < 0 && (s = !0);
    }
    if (s) return Ep(i, e, t, n);
  }
  return xl(i, e, t, n);
}
function xr(i, e, t, n) {
  let s = n;
  for (; i.hasNode(s); ) s = Ic(n);
  return t.dummy = e, i.setNode(s, t), s;
}
function V0(i) {
  let e = new _i().setGraph(i.graph());
  return i.nodes().forEach((t) => e.setNode(t, i.node(t))), i.edges().forEach((t) => {
    let n = e.edge(t.v, t.w) || { weight: 0, minlen: 1 }, s = i.edge(t);
    e.setEdge(t.v, t.w, { weight: n.weight + s.weight, minlen: Math.max(n.minlen, s.minlen) });
  }), e;
}
function Lp(i) {
  let e = new _i({ multigraph: i.isMultigraph() }).setGraph(i.graph());
  return i.nodes().forEach((t) => {
    i.children(t).length || e.setNode(t, i.node(t));
  }), i.edges().forEach((t) => {
    e.setEdge(t, i.edge(t));
  }), e;
}
function qf(i, e) {
  let t = i.x, n = i.y, s = e.x - t, r = e.y - n, o = i.width / 2, l = i.height / 2;
  if (!s && !r) throw new Error("Not possible to find intersection inside of the rectangle");
  let a, h;
  return Math.abs(r) * o > Math.abs(s) * l ? (r < 0 && (l = -l), a = l * s / r, h = l) : (s < 0 && (o = -o), a = o, h = o * r / s), { x: t + a, y: n + h };
}
function na(i) {
  let e = no(Dp(i) + 1).map(() => []);
  return i.nodes().forEach((t) => {
    let n = i.node(t), s = n.rank;
    s !== void 0 && (e[s] || (e[s] = []), e[s][n.order] = t);
  }), e;
}
function B0(i) {
  let e = i.nodes().map((n) => {
    let s = i.node(n).rank;
    return s === void 0 ? Number.MAX_VALUE : s;
  }), t = en(Math.min, e);
  i.nodes().forEach((n) => {
    let s = i.node(n);
    Object.hasOwn(s, "rank") && (s.rank -= t);
  });
}
function G0(i) {
  let e = i.nodes().map((o) => i.node(o).rank).filter((o) => o !== void 0), t = en(Math.min, e), n = [];
  i.nodes().forEach((o) => {
    let l = i.node(o).rank - t;
    n[l] || (n[l] = []), n[l].push(o);
  });
  let s = 0, r = i.graph().nodeRankFactor;
  Array.from(n).forEach((o, l) => {
    o === void 0 && l % r !== 0 ? --s : o !== void 0 && s && o.forEach((a) => i.node(a).rank += s);
  });
}
function Vf(i, e, t, n) {
  let s = { width: 0, height: 0 };
  return arguments.length >= 4 && (s.rank = t, s.order = n), xr(i, "border", s, e);
}
function U0(i, e = Ip) {
  let t = [];
  for (let n = 0; n < i.length; n += e) {
    let s = i.slice(n, n + e);
    t.push(s);
  }
  return t;
}
var Ip = 65535;
function en(i, e) {
  if (e.length > Ip) {
    let t = U0(e);
    return i(...t.map((n) => i(...n)));
  } else return i(...e);
}
function Dp(i) {
  let e = i.nodes().map((t) => {
    let n = i.node(t).rank;
    return n === void 0 ? Number.MIN_VALUE : n;
  });
  return en(Math.max, e);
}
function F0(i, e) {
  let t = { lhs: [], rhs: [] };
  return i.forEach((n) => {
    e(n) ? t.lhs.push(n) : t.rhs.push(n);
  }), t;
}
function H0(i, e) {
  let t = Date.now();
  try {
    return e();
  } finally {
    console.log(i + " time: " + (Date.now() - t) + "ms");
  }
}
function K0(i, e) {
  return e();
}
var J0 = 0;
function Ic(i) {
  let e = ++J0;
  return i + ("" + e);
}
function no(i, e, t = 1) {
  e == null && (e = i, i = 0);
  let n = (r) => r < e;
  t < 0 && (n = (r) => e < r);
  let s = [];
  for (let r = i; n(r); r += t) s.push(r);
  return s;
}
function kl(i, e) {
  let t = {};
  for (let n of e) i[n] !== void 0 && (t[n] = i[n]);
  return t;
}
function sa(i, e) {
  let t;
  return typeof e == "string" ? t = (n) => n[e] : t = e, Object.entries(i).reduce((n, [s, r]) => (n[s] = t(r, s), n), {});
}
function eb(i, e) {
  return i.reduce((t, n, s) => (t[n] = e[s], t), {});
}
var ra = "\0", tb = class {
  constructor() {
    y0(this, "_sentinel");
    let i = {};
    i._next = i._prev = i, this._sentinel = i;
  }
  dequeue() {
    let i = this._sentinel, e = i._prev;
    if (e !== i) return Bf(e), e;
  }
  enqueue(i) {
    let e = this._sentinel;
    i._prev && i._next && Bf(i), i._next = e._next, e._next._prev = i, e._next = i, i._prev = e;
  }
  toString() {
    let i = [], e = this._sentinel, t = e._prev;
    for (; t !== e; ) i.push(JSON.stringify(t, ib)), t = t._prev;
    return "[" + i.join(", ") + "]";
  }
};
function Bf(i) {
  i._prev._next = i._next, i._next._prev = i._prev, delete i._next, delete i._prev;
}
function ib(i, e) {
  if (i !== "_next" && i !== "_prev") return e;
}
var nb = tb, sb = () => 1;
function rb(i, e) {
  if (i.nodeCount() <= 1) return [];
  let t = lb(i, e || sb);
  return ob(t.graph, t.buckets, t.zeroIdx).flatMap((n) => i.outEdges(n.v, n.w) || []);
}
function ob(i, e, t) {
  var n;
  let s = [], r = e[e.length - 1], o = e[0], l;
  for (; i.nodeCount(); ) {
    for (; l = o.dequeue(); ) Ea(i, e, t, l);
    for (; l = r.dequeue(); ) Ea(i, e, t, l);
    if (i.nodeCount()) {
      for (let a = e.length - 2; a > 0; --a) if (l = (n = e[a]) == null ? void 0 : n.dequeue(), l) {
        s = s.concat(Ea(i, e, t, l, !0) || []);
        break;
      }
    }
  }
  return s;
}
function Ea(i, e, t, n, s) {
  let r = [], o = s ? r : void 0;
  return (i.inEdges(n.v) || []).forEach((l) => {
    let a = i.edge(l), h = i.node(l.v);
    s && r.push({ v: l.v, w: l.w }), h.out -= a, Zh(e, t, h);
  }), (i.outEdges(n.v) || []).forEach((l) => {
    let a = i.edge(l), h = l.w, c = i.node(h);
    c.in -= a, Zh(e, t, c);
  }), i.removeNode(n.v), o;
}
function lb(i, e) {
  let t = new _i(), n = 0, s = 0;
  i.nodes().forEach((l) => {
    t.setNode(l, { v: l, in: 0, out: 0 });
  }), i.edges().forEach((l) => {
    let a = t.edge(l.v, l.w) || 0, h = e(l), c = a + h;
    t.setEdge(l.v, l.w, c);
    let f = t.node(l.v), u = t.node(l.w);
    s = Math.max(s, f.out += h), n = Math.max(n, u.in += h);
  });
  let r = ab(s + n + 3).map(() => new nb()), o = n + 1;
  return t.nodes().forEach((l) => {
    Zh(r, o, t.node(l));
  }), { graph: t, buckets: r, zeroIdx: o };
}
function Zh(i, e, t) {
  var n, s, r;
  t.out ? t.in ? (r = i[t.out - t.in + e]) == null || r.enqueue(t) : (s = i[i.length - 1]) == null || s.enqueue(t) : (n = i[0]) == null || n.enqueue(t);
}
function ab(i) {
  let e = [];
  for (let t = 0; t < i; t++) e.push(t);
  return e;
}
function hb(i) {
  (i.graph().acyclicer === "greedy" ? rb(i, e(i)) : cb(i)).forEach((t) => {
    let n = i.edge(t);
    i.removeEdge(t), n.forwardName = t.name, n.reversed = !0, i.setEdge(t.w, t.v, n, Ic("rev"));
  });
  function e(t) {
    return (n) => t.edge(n).weight;
  }
}
function cb(i) {
  let e = [], t = {}, n = {};
  function s(r) {
    Object.hasOwn(n, r) || (n[r] = !0, t[r] = !0, i.outEdges(r).forEach((o) => {
      Object.hasOwn(t, o.w) ? e.push(o) : s(o.w);
    }), delete t[r]);
  }
  return i.nodes().forEach(s), e;
}
function fb(i) {
  i.edges().forEach((e) => {
    let t = i.edge(e);
    if (t.reversed) {
      i.removeEdge(e);
      let n = t.forwardName;
      delete t.reversed, delete t.forwardName, i.setEdge(e.w, e.v, t, n);
    }
  });
}
function ub(i) {
  i.graph().dummyChains = [], i.edges().forEach((e) => db(i, e));
}
function db(i, e) {
  let t = e.v, n = i.node(t).rank, s = e.w, r = i.node(s).rank, o = e.name, l = i.edge(e), a = l.labelRank;
  if (r === n + 1) return;
  i.removeEdge(e);
  let h, c, f;
  for (f = 0, ++n; n < r; ++f, ++n) l.points = [], c = { width: 0, height: 0, edgeLabel: l, edgeObj: e, rank: n }, h = xr(i, "edge", c, "_d"), n === a && (c.width = l.width, c.height = l.height, c.dummy = "edge-label", c.labelpos = l.labelpos), i.setEdge(t, h, { weight: l.weight }, o), f === 0 && i.graph().dummyChains.push(h), t = h;
  i.setEdge(t, s, { weight: l.weight }, o);
}
function pb(i) {
  i.graph().dummyChains.forEach((e) => {
    let t = i.node(e), n = t.edgeLabel, s;
    for (i.setEdge(t.edgeObj, n); t.dummy; ) s = i.successors(e)[0], i.removeNode(e), n.points.push({ x: t.x, y: t.y }), t.dummy === "edge-label" && (n.x = t.x, n.y = t.y, n.width = t.width, n.height = t.height), e = s, t = i.node(e);
  });
}
function Dc(i) {
  let e = {};
  function t(n) {
    let s = i.node(n);
    if (Object.hasOwn(e, n)) return s.rank;
    e[n] = !0;
    let r = i.outEdges(n), o = r ? r.map((a) => a == null ? Number.POSITIVE_INFINITY : t(a.w) - i.edge(a).minlen) : [], l = en(Math.min, o);
    return l === Number.POSITIVE_INFINITY && (l = 0), s.rank = l;
  }
  i.sources().forEach(t);
}
function cr(i, e) {
  return i.node(e.w).rank - i.node(e.v).rank - i.edge(e).minlen;
}
var zp = Ob;
function Ob(i) {
  let e = new _i({ directed: !1 }), t = i.nodes();
  if (t.length === 0) throw new Error("Graph must have at least one node");
  let n = t[0], s = i.nodeCount();
  e.setNode(n, {});
  let r, o;
  for (; gb(e, i) < s && (r = mb(e, i), !!r); ) o = e.hasNode(r.v) ? cr(i, r) : -cr(i, r), vb(e, i, o);
  return e;
}
function gb(i, e) {
  function t(n) {
    let s = e.nodeEdges(n);
    s && s.forEach((r) => {
      let o = r.v, l = n === o ? r.w : o;
      !i.hasNode(l) && !cr(e, r) && (i.setNode(l, {}), i.setEdge(n, l, {}), t(l));
    });
  }
  return i.nodes().forEach(t), i.nodeCount();
}
function mb(i, e) {
  return e.edges().reduce((t, n) => {
    let s = Number.POSITIVE_INFINITY;
    return i.hasNode(n.v) !== i.hasNode(n.w) && (s = cr(e, n)), s < t[0] ? [s, n] : t;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function vb(i, e, t) {
  i.nodes().forEach((n) => e.node(n).rank += t);
}
var { preorder: bb, postorder: yb } = Lc, wb = Ts;
Ts.initLowLimValues = Nc;
Ts.initCutValues = zc;
Ts.calcCutValue = Np;
Ts.leaveEdge = Wp;
Ts.enterEdge = qp;
Ts.exchangeEdges = Vp;
function Ts(i) {
  i = V0(i), Dc(i);
  let e = zp(i);
  Nc(e), zc(e, i);
  let t, n;
  for (; t = Wp(e); ) n = qp(e, i, t), Vp(e, i, t, n);
}
function zc(i, e) {
  let t = yb(i, i.nodes());
  t = t.slice(0, t.length - 1), t.forEach((n) => xb(i, e, n));
}
function xb(i, e, t) {
  let n = i.node(t).parent, s = i.edge(t, n);
  s.cutvalue = Np(i, e, t);
}
function Np(i, e, t) {
  let n = i.node(t).parent, s = !0, r = e.edge(t, n), o = 0;
  r || (s = !1, r = e.edge(n, t)), o = r.weight;
  let l = e.nodeEdges(t);
  return l && l.forEach((a) => {
    let h = a.v === t, c = h ? a.w : a.v;
    if (c !== n) {
      let f = h === s, u = e.edge(a).weight;
      if (o += f ? u : -u, kb(i, t, c)) {
        let p = i.edge(t, c).cutvalue;
        o += f ? -p : p;
      }
    }
  }), o;
}
function Nc(i, e) {
  arguments.length < 2 && (e = i.nodes()[0]), Yp(i, {}, 1, e);
}
function Yp(i, e, t, n, s) {
  let r = t, o = i.node(n);
  e[n] = !0;
  let l = i.neighbors(n);
  return l && l.forEach((a) => {
    Object.hasOwn(e, a) || (t = Yp(i, e, t, a, n));
  }), o.low = r, o.lim = t++, s ? o.parent = s : delete o.parent, t;
}
function Wp(i) {
  return i.edges().find((e) => i.edge(e).cutvalue < 0);
}
function qp(i, e, t) {
  let n = t.v, s = t.w;
  e.hasEdge(n, s) || (n = t.w, s = t.v);
  let r = i.node(n), o = i.node(s), l = r, a = !1;
  return r.lim > o.lim && (l = o, a = !0), e.edges().filter((h) => a === Gf(i, i.node(h.v), l) && a !== Gf(i, i.node(h.w), l)).reduce((h, c) => cr(e, c) < cr(e, h) ? c : h);
}
function Vp(i, e, t, n) {
  let s = t.v, r = t.w;
  i.removeEdge(s, r), i.setEdge(n.v, n.w, {}), Nc(i), zc(i, e), Sb(i, e);
}
function Sb(i, e) {
  let t = i.nodes().find((s) => !i.node(s).parent);
  if (!t) return;
  let n = bb(i, [t]);
  n = n.slice(1), n.forEach((s) => {
    let r = i.node(s).parent, o = e.edge(s, r), l = !1;
    o || (o = e.edge(r, s), l = !0), e.node(s).rank = e.node(r).rank + (l ? o.minlen : -o.minlen);
  });
}
function kb(i, e, t) {
  return i.hasEdge(e, t);
}
function Gf(i, e, t) {
  return t.low <= e.lim && e.lim <= t.lim;
}
var Qb = $b;
function $b(i) {
  let e = i.graph().ranker;
  if (typeof e == "function") return e(i);
  switch (e) {
    case "network-simplex":
      Uf(i);
      break;
    case "tight-tree":
      Pb(i);
      break;
    case "longest-path":
      _b(i);
      break;
    case "none":
      break;
    default:
      Uf(i);
  }
}
var _b = Dc;
function Pb(i) {
  Dc(i), zp(i);
}
function Uf(i) {
  wb(i);
}
var Tb = Cb;
function Cb(i) {
  let e = Eb(i);
  i.graph().dummyChains.forEach((t) => {
    let n = i.node(t), s = n.edgeObj, r = Zb(i, e, s.v, s.w), o = r.path, l = r.lca, a = 0, h = o[a], c = !0;
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
function Zb(i, e, t, n) {
  let s = [], r = [], o = Math.min(e[t].low, e[n].low), l = Math.max(e[t].lim, e[n].lim), a;
  a = t;
  do
    a = i.parent(a), s.push(a);
  while (a && (e[a].low > o || l > e[a].lim));
  let h = a, c = n;
  for (; (c = i.parent(c)) !== h; ) r.push(c);
  return { path: s.concat(r.reverse()), lca: h };
}
function Eb(i) {
  let e = {}, t = 0;
  function n(s) {
    let r = t;
    i.children(s).forEach(n), e[s] = { low: r, lim: t++ };
  }
  return i.children(ra).forEach(n), e;
}
function Ab(i) {
  let e = xr(i, "root", {}, "_root"), t = Rb(i), n = Object.values(t), s = en(Math.max, n) - 1, r = 2 * s + 1;
  i.graph().nestingRoot = e, i.edges().forEach((l) => i.edge(l).minlen *= r);
  let o = Mb(i) + 1;
  i.children(ra).forEach((l) => Bp(i, e, r, o, s, t, l)), i.graph().nodeRankFactor = r;
}
function Bp(i, e, t, n, s, r, o) {
  var l;
  let a = i.children(o);
  if (!a.length) {
    o !== e && i.setEdge(e, o, { weight: 0, minlen: t });
    return;
  }
  let h = Vf(i, "_bt"), c = Vf(i, "_bb"), f = i.node(o);
  i.setParent(h, o), f.borderTop = h, i.setParent(c, o), f.borderBottom = c, a.forEach((u) => {
    var p;
    Bp(i, e, t, n, s, r, u);
    let O = i.node(u), g = O.borderTop ? O.borderTop : u, m = O.borderBottom ? O.borderBottom : u, v = O.borderTop ? n : 2 * n, S = g !== m ? 1 : s - ((p = r[o]) != null ? p : 0) + 1;
    i.setEdge(h, g, { weight: v, minlen: S, nestingEdge: !0 }), i.setEdge(m, c, { weight: v, minlen: S, nestingEdge: !0 });
  }), i.parent(o) || i.setEdge(e, h, { weight: 0, minlen: s + ((l = r[o]) != null ? l : 0) });
}
function Rb(i) {
  let e = {};
  function t(n, s) {
    let r = i.children(n);
    r && r.length && r.forEach((o) => t(o, s + 1)), e[n] = s;
  }
  return i.children(ra).forEach((n) => t(n, 1)), e;
}
function Mb(i) {
  return i.edges().reduce((e, t) => e + i.edge(t).weight, 0);
}
function Xb(i) {
  let e = i.graph();
  i.removeNode(e.nestingRoot), delete e.nestingRoot, i.edges().forEach((t) => {
    i.edge(t).nestingEdge && i.removeEdge(t);
  });
}
var jb = Lb;
function Lb(i) {
  function e(t) {
    let n = i.children(t), s = i.node(t);
    if (n.length && n.forEach(e), Object.hasOwn(s, "minRank")) {
      s.borderLeft = [], s.borderRight = [];
      for (let r = s.minRank, o = s.maxRank + 1; r < o; ++r) Ff(i, "borderLeft", "_bl", t, s, r), Ff(i, "borderRight", "_br", t, s, r);
    }
  }
  i.children(ra).forEach(e);
}
function Ff(i, e, t, n, s, r) {
  let o = { width: 0, height: 0, rank: r, borderType: e }, l = s[e][r - 1], a = xr(i, "border", o, t);
  s[e][r] = a, i.setParent(a, n), l && i.setEdge(l, a, { weight: 1 });
}
function Ib(i) {
  var e;
  let t = (e = i.graph().rankdir) == null ? void 0 : e.toLowerCase();
  (t === "lr" || t === "rl") && Gp(i);
}
function Db(i) {
  var e;
  let t = (e = i.graph().rankdir) == null ? void 0 : e.toLowerCase();
  (t === "bt" || t === "rl") && zb(i), (t === "lr" || t === "rl") && (Nb(i), Gp(i));
}
function Gp(i) {
  i.nodes().forEach((e) => Hf(i.node(e))), i.edges().forEach((e) => Hf(i.edge(e)));
}
function Hf(i) {
  let e = i.width;
  i.width = i.height, i.height = e;
}
function zb(i) {
  i.nodes().forEach((e) => Aa(i.node(e))), i.edges().forEach((e) => {
    var t;
    let n = i.edge(e);
    (t = n.points) == null || t.forEach(Aa), Object.hasOwn(n, "y") && Aa(n);
  });
}
function Aa(i) {
  i.y = -i.y;
}
function Nb(i) {
  i.nodes().forEach((e) => Ra(i.node(e))), i.edges().forEach((e) => {
    var t;
    let n = i.edge(e);
    (t = n.points) == null || t.forEach(Ra), Object.hasOwn(n, "x") && Ra(n);
  });
}
function Ra(i) {
  let e = i.x;
  i.x = i.y, i.y = e;
}
function Yb(i) {
  let e = {}, t = i.nodes().filter((l) => !i.children(l).length), n = t.map((l) => i.node(l).rank), s = en(Math.max, n), r = no(s + 1).map(() => []);
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
function Wb(i, e) {
  let t = 0;
  for (let n = 1; n < e.length; ++n) t += qb(i, e[n - 1], e[n]);
  return t;
}
function qb(i, e, t) {
  let n = eb(t, t.map((h, c) => c)), s = e.flatMap((h) => {
    let c = i.outEdges(h);
    return c ? c.map((f) => ({ pos: n[f.w], weight: i.edge(f).weight })).sort((f, u) => f.pos - u.pos) : [];
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
function Vb(i, e = []) {
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
function Bb(i, e) {
  let t = {};
  i.forEach((s, r) => {
    let o = { indegree: 0, in: [], out: [], vs: [s.v], i: r };
    s.barycenter !== void 0 && (o.barycenter = s.barycenter, o.weight = s.weight), t[s.v] = o;
  }), e.edges().forEach((s) => {
    let r = t[s.v], o = t[s.w];
    r !== void 0 && o !== void 0 && (o.indegree++, r.out.push(o));
  });
  let n = Object.values(t).filter((s) => !s.indegree);
  return Gb(n);
}
function Gb(i) {
  let e = [];
  function t(s) {
    return (r) => {
      r.merged || (r.barycenter === void 0 || s.barycenter === void 0 || r.barycenter >= s.barycenter) && Ub(s, r);
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
  return e.filter((s) => !s.merged).map((s) => kl(s, ["vs", "i", "barycenter", "weight"]));
}
function Ub(i, e) {
  let t = 0, n = 0;
  i.weight && (t += i.barycenter * i.weight, n += i.weight), e.weight && (t += e.barycenter * e.weight, n += e.weight), i.vs = e.vs.concat(i.vs), i.barycenter = t / n, i.weight = n, i.i = Math.min(e.i, i.i), e.merged = !0;
}
function Fb(i, e) {
  let t = F0(i, (c) => Object.hasOwn(c, "barycenter")), n = t.lhs, s = t.rhs.sort((c, f) => f.i - c.i), r = [], o = 0, l = 0, a = 0;
  n.sort(Hb(!!e)), a = Kf(r, s, a), n.forEach((c) => {
    a += c.vs.length, r.push(c.vs), o += c.barycenter * c.weight, l += c.weight, a = Kf(r, s, a);
  });
  let h = { vs: r.flat(1) };
  return l && (h.barycenter = o / l, h.weight = l), h;
}
function Kf(i, e, t) {
  let n;
  for (; e.length && (n = e[e.length - 1]).i <= t; ) e.pop(), i.push(n.vs), t++;
  return t;
}
function Hb(i) {
  return (e, t) => e.barycenter < t.barycenter ? -1 : e.barycenter > t.barycenter ? 1 : i ? t.i - e.i : e.i - t.i;
}
function Up(i, e, t, n) {
  let s = i.children(e), r = i.node(e), o = r ? r.borderLeft : void 0, l = r ? r.borderRight : void 0, a = {};
  o && (s = s.filter((u) => u !== o && u !== l));
  let h = Vb(i, s);
  h.forEach((u) => {
    if (i.children(u.v).length) {
      let p = Up(i, u.v, t, n);
      a[u.v] = p, Object.hasOwn(p, "barycenter") && Jb(u, p);
    }
  });
  let c = Bb(h, t);
  Kb(c, a);
  let f = Fb(c, n);
  if (o && l) {
    f.vs = [o, f.vs, l].flat(1);
    let u = i.predecessors(o);
    if (u && u.length) {
      let p = i.node(u[0]), O = i.predecessors(l), g = i.node(O[0]);
      Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + p.order + g.order) / (f.weight + 2), f.weight += 2;
    }
  }
  return f;
}
function Kb(i, e) {
  i.forEach((t) => {
    t.vs = t.vs.flatMap((n) => e[n] ? e[n].vs : n);
  });
}
function Jb(i, e) {
  i.barycenter !== void 0 ? (i.barycenter = (i.barycenter * i.weight + e.barycenter * e.weight) / (i.weight + e.weight), i.weight += e.weight) : (i.barycenter = e.barycenter, i.weight = e.weight);
}
function e1(i, e, t, n) {
  n || (n = i.nodes());
  let s = t1(i), r = new _i({ compound: !0 }).setGraph({ root: s }).setDefaultNodeLabel((o) => i.node(o));
  return n.forEach((o) => {
    let l = i.node(o), a = i.parent(o);
    if (l.rank === e || l.minRank <= e && e <= l.maxRank) {
      r.setNode(o), r.setParent(o, a || s);
      let h = i[t](o);
      h && h.forEach((c) => {
        let f = c.v === o ? c.w : c.v, u = r.edge(f, o), p = u !== void 0 ? u.weight : 0;
        r.setEdge(f, o, { weight: i.edge(c).weight + p });
      }), Object.hasOwn(l, "minRank") && r.setNode(o, { borderLeft: l.borderLeft[e], borderRight: l.borderRight[e] });
    }
  }), r;
}
function t1(i) {
  let e;
  for (; i.hasNode(e = Ic("_root")); ) ;
  return e;
}
function i1(i, e, t) {
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
function Fp(i, e = {}) {
  if (typeof e.customOrder == "function") {
    e.customOrder(i, Fp);
    return;
  }
  let t = Dp(i), n = Jf(i, no(1, t + 1), "inEdges"), s = Jf(i, no(t - 1, -1, -1), "outEdges"), r = Yb(i);
  if (eu(i, r), e.disableOptimalOrderHeuristic) return;
  let o = Number.POSITIVE_INFINITY, l, a = e.constraints || [];
  for (let h = 0, c = 0; c < 4; ++h, ++c) {
    n1(h % 2 ? n : s, h % 4 >= 2, a), r = na(i);
    let f = Wb(i, r);
    f < o ? (c = 0, l = Object.assign({}, r), o = f) : f === o && (l = structuredClone(r));
  }
  eu(i, l);
}
function Jf(i, e, t) {
  let n = /* @__PURE__ */ new Map(), s = (r, o) => {
    n.has(r) || n.set(r, []), n.get(r).push(o);
  };
  for (let r of i.nodes()) {
    let o = i.node(r);
    if (typeof o.rank == "number" && s(o.rank, r), typeof o.minRank == "number" && typeof o.maxRank == "number") for (let l = o.minRank; l <= o.maxRank; l++) l !== o.rank && s(l, r);
  }
  return e.map(function(r) {
    return e1(i, r, t, n.get(r) || []);
  });
}
function n1(i, e, t) {
  let n = new _i();
  i.forEach(function(s) {
    t.forEach((l) => n.setEdge(l.left, l.right));
    let r = s.graph().root, o = Up(s, r, n, e);
    o.vs.forEach((l, a) => s.node(l).order = a), i1(s, n, o.vs);
  });
}
function eu(i, e) {
  Object.values(e).forEach((t) => t.forEach((n, s) => i.node(n).order = s));
}
function s1(i, e) {
  let t = {};
  function n(s, r) {
    let o = 0, l = 0, a = s.length, h = r[r.length - 1];
    return r.forEach((c, f) => {
      let u = o1(i, c), p = u ? i.node(u).order : a;
      (u || c === h) && (r.slice(l, f + 1).forEach((O) => {
        let g = i.predecessors(O);
        g && g.forEach((m) => {
          let v = i.node(m), S = v.order;
          (S < o || p < S) && !(v.dummy && i.node(O).dummy) && Hp(t, m, O);
        });
      }), l = f + 1, o = p);
    }), r;
  }
  return e.length && e.reduce(n), t;
}
function r1(i, e) {
  let t = {};
  function n(r, o, l, a, h) {
    no(o, l).forEach((c) => {
      let f = r[c];
      if (f !== void 0 && i.node(f).dummy) {
        let u = i.predecessors(f);
        u && u.forEach((p) => {
          if (p === void 0) return;
          let O = i.node(p);
          O.dummy && (O.order < a || O.order > h) && Hp(t, p, f);
        });
      }
    });
  }
  function s(r, o) {
    let l = -1, a = -1, h = 0;
    return o.forEach((c, f) => {
      if (i.node(c).dummy === "border") {
        let u = i.predecessors(c);
        if (u && u.length) {
          let p = u[0];
          if (p === void 0) return;
          a = i.node(p).order, n(o, h, f, l, a), h = f, l = a;
        }
      }
      n(o, h, o.length, a, r.length);
    }), o;
  }
  return e.length && e.reduce(s), t;
}
function o1(i, e) {
  if (i.node(e).dummy) {
    let t = i.predecessors(e);
    if (t) return t.find((n) => i.node(n).dummy);
  }
}
function Hp(i, e, t) {
  if (e > t) {
    let s = e;
    e = t, t = s;
  }
  let n = i[e];
  n || (i[e] = n = {}), n[t] = !0;
}
function l1(i, e, t) {
  if (e > t) {
    let s = e;
    e = t, t = s;
  }
  let n = i[e];
  return n !== void 0 && Object.hasOwn(n, t);
}
function a1(i, e, t, n) {
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
        }), u = (f.length - 1) / 2;
        for (let p = Math.floor(u), O = Math.ceil(u); p <= O; ++p) {
          let g = f[p];
          if (g === void 0) continue;
          let m = o[g];
          if (m !== void 0 && r[h] === h && a < m && !l1(t, h, g)) {
            let v = s[g];
            v !== void 0 && (r[g] = h, r[h] = s[h] = v, a = m);
          }
        }
      }
    });
  }), { root: s, align: r };
}
function h1(i, e, t, n, s = !1) {
  let r = {}, o = c1(i, e, t, s), l = s ? "borderLeft" : "borderRight";
  function a(p, O) {
    let g = o.nodes().slice(), m = {}, v = g.pop();
    for (; v; ) {
      if (m[v]) p(v);
      else {
        m[v] = !0, g.push(v);
        for (let S of O(v)) g.push(S);
      }
      v = g.pop();
    }
  }
  function h(p) {
    let O = o.inEdges(p);
    O ? r[p] = O.reduce((g, m) => {
      var v;
      let S = (v = r[m.v]) != null ? v : 0, x = o.edge(m);
      return Math.max(g, S + (x !== void 0 ? x : 0));
    }, 0) : r[p] = 0;
  }
  function c(p) {
    let O = o.outEdges(p), g = Number.POSITIVE_INFINITY;
    O && (g = O.reduce((v, S) => {
      let x = r[S.w], P = o.edge(S);
      return Math.min(v, (x !== void 0 ? x : 0) - (P !== void 0 ? P : 0));
    }, Number.POSITIVE_INFINITY));
    let m = i.node(p);
    g !== Number.POSITIVE_INFINITY && m.borderType !== l && (r[p] = Math.max(r[p] !== void 0 ? r[p] : 0, g));
  }
  function f(p) {
    return o.predecessors(p) || [];
  }
  function u(p) {
    return o.successors(p) || [];
  }
  return a(h, f), a(c, u), Object.keys(n).forEach((p) => {
    var O;
    let g = t[p];
    g !== void 0 && (r[p] = (O = r[g]) != null ? O : 0);
  }), r;
}
function c1(i, e, t, n) {
  let s = new _i(), r = i.graph(), o = O1(r.nodesep, r.edgesep, n);
  return e.forEach((l) => {
    let a;
    l.forEach((h) => {
      let c = t[h];
      if (c !== void 0) {
        if (s.setNode(c), a !== void 0) {
          let f = t[a];
          if (f !== void 0) {
            let u = s.edge(f, c);
            s.setEdge(f, c, Math.max(o(i, h, a), u || 0));
          }
        }
        a = h;
      }
    });
  }), s;
}
function f1(i, e) {
  return Object.values(e).reduce((t, n) => {
    let s = Number.NEGATIVE_INFINITY, r = Number.POSITIVE_INFINITY;
    Object.entries(n).forEach(([l, a]) => {
      let h = g1(i, l) / 2;
      s = Math.max(a + h, s), r = Math.min(a - h, r);
    });
    let o = s - r;
    return o < t[0] && (t = [o, n]), t;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function u1(i, e) {
  let t = Object.values(e), n = en(Math.min, t), s = en(Math.max, t);
  ["u", "d"].forEach((r) => {
    ["l", "r"].forEach((o) => {
      let l = r + o, a = i[l];
      if (!a || a === e) return;
      let h = Object.values(a), c = n - en(Math.min, h);
      o !== "l" && (c = s - en(Math.max, h)), c && (i[l] = sa(a, (f) => f + c));
    });
  });
}
function d1(i, e = void 0) {
  let t = i.ul;
  return t ? sa(t, (n, s) => {
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
function p1(i) {
  let e = na(i), t = Object.assign(s1(i, e), r1(i, e)), n = {}, s;
  ["u", "d"].forEach((o) => {
    s = o === "u" ? e : Object.values(e).reverse(), ["l", "r"].forEach((l) => {
      l === "r" && (s = s.map((c) => Object.values(c).reverse()));
      let a = a1(i, s, t, (c) => (o === "u" ? i.predecessors(c) : i.successors(c)) || []), h = h1(i, s, a.root, a.align, l === "r");
      l === "r" && (h = sa(h, (c) => -c)), n[o + l] = h;
    });
  });
  let r = f1(i, n);
  return u1(n, r), d1(n, i.graph().align);
}
function O1(i, e, t) {
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
function g1(i, e) {
  return i.node(e).width;
}
function m1(i) {
  i = Lp(i), v1(i), Object.entries(p1(i)).forEach(([e, t]) => i.node(e).x = t);
}
function v1(i) {
  let e = na(i), t = i.graph(), n = t.ranksep, s = t.rankalign, r = 0;
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
function b1(i, e = {}) {
  let t = e.debugTiming ? H0 : K0;
  return t("layout", () => {
    let n = t("  buildLayoutGraph", () => T1(i));
    return t("  runLayout", () => y1(n, t, e)), t("  updateInputGraph", () => w1(i, n)), n;
  });
}
function y1(i, e, t) {
  e("    makeSpaceForEdgeLabels", () => C1(i)), e("    removeSelfEdges", () => I1(i)), e("    acyclic", () => hb(i)), e("    nestingGraph.run", () => Ab(i)), e("    rank", () => Qb(Lp(i))), e("    injectEdgeLabelProxies", () => Z1(i)), e("    removeEmptyRanks", () => G0(i)), e("    nestingGraph.cleanup", () => Xb(i)), e("    normalizeRanks", () => B0(i)), e("    assignRankMinMax", () => E1(i)), e("    removeEdgeLabelProxies", () => A1(i)), e("    normalize.run", () => ub(i)), e("    parentDummyChains", () => Tb(i)), e("    addBorderSegments", () => jb(i)), e("    order", () => Fp(i, t)), e("    insertSelfEdges", () => D1(i)), e("    adjustCoordinateSystem", () => Ib(i)), e("    position", () => m1(i)), e("    positionSelfEdges", () => z1(i)), e("    removeBorderNodes", () => L1(i)), e("    normalize.undo", () => pb(i)), e("    fixupEdgeLabelCoords", () => X1(i)), e("    undoCoordinateSystem", () => Db(i)), e("    translateGraph", () => R1(i)), e("    assignNodeIntersects", () => M1(i)), e("    reversePoints", () => j1(i)), e("    acyclic.undo", () => fb(i));
}
function w1(i, e) {
  i.nodes().forEach((t) => {
    let n = i.node(t), s = e.node(t);
    n && (n.x = s.x, n.y = s.y, n.order = s.order, n.rank = s.rank, e.children(t).length && (n.width = s.width, n.height = s.height));
  }), i.edges().forEach((t) => {
    let n = i.edge(t), s = e.edge(t);
    n.points = s.points, Object.hasOwn(s, "x") && (n.x = s.x, n.y = s.y);
  }), i.graph().width = e.graph().width, i.graph().height = e.graph().height;
}
var x1 = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], S1 = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "TB", rankalign: "center" }, k1 = ["acyclicer", "ranker", "rankdir", "align", "rankalign"], Q1 = ["width", "height", "rank"], tu = { width: 0, height: 0 }, $1 = ["minlen", "weight", "width", "height", "labeloffset"], _1 = { minlen: 1, weight: 1, width: 0, height: 0, labeloffset: 10, labelpos: "r" }, P1 = ["labelpos"];
function T1(i) {
  let e = new _i({ multigraph: !0, compound: !0 }), t = Xa(i.graph());
  return e.setGraph(Object.assign({}, S1, Ma(t, x1), kl(t, k1))), i.nodes().forEach((n) => {
    let s = Xa(i.node(n)), r = Ma(s, Q1);
    Object.keys(tu).forEach((l) => {
      r[l] === void 0 && (r[l] = tu[l]);
    }), e.setNode(n, r);
    let o = i.parent(n);
    o !== void 0 && e.setParent(n, o);
  }), i.edges().forEach((n) => {
    let s = Xa(i.edge(n));
    e.setEdge(n, Object.assign({}, _1, Ma(s, $1), kl(s, P1)));
  }), e;
}
function C1(i) {
  let e = i.graph();
  e.ranksep /= 2, i.edges().forEach((t) => {
    let n = i.edge(t);
    n.minlen *= 2, n.labelpos.toLowerCase() !== "c" && (e.rankdir === "TB" || e.rankdir === "BT" ? n.width += n.labeloffset : n.height += n.labeloffset);
  });
}
function Z1(i) {
  i.edges().forEach((e) => {
    let t = i.edge(e);
    if (t.width && t.height) {
      let n = i.node(e.v), s = { rank: (i.node(e.w).rank - n.rank) / 2 + n.rank, e };
      xr(i, "edge-proxy", s, "_ep");
    }
  });
}
function E1(i) {
  let e = 0;
  i.nodes().forEach((t) => {
    let n = i.node(t);
    n.borderTop && (n.minRank = i.node(n.borderTop).rank, n.maxRank = i.node(n.borderBottom).rank, e = Math.max(e, n.maxRank));
  }), i.graph().maxRank = e;
}
function A1(i) {
  i.nodes().forEach((e) => {
    let t = i.node(e);
    if (t.dummy === "edge-proxy") {
      let n = t;
      i.edge(n.e).labelRank = t.rank, i.removeNode(e);
    }
  });
}
function R1(i) {
  let e = Number.POSITIVE_INFINITY, t = 0, n = Number.POSITIVE_INFINITY, s = 0, r = i.graph(), o = r.marginx || 0, l = r.marginy || 0;
  function a(h) {
    let c = h.x, f = h.y, u = h.width, p = h.height;
    e = Math.min(e, c - u / 2), t = Math.max(t, c + u / 2), n = Math.min(n, f - p / 2), s = Math.max(s, f + p / 2);
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
function M1(i) {
  i.edges().forEach((e) => {
    let t = i.edge(e), n = i.node(e.v), s = i.node(e.w), r, o;
    t.points ? (r = t.points[0], o = t.points[t.points.length - 1]) : (t.points = [], r = s, o = n), t.points.unshift(qf(n, r)), t.points.push(qf(s, o));
  });
}
function X1(i) {
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
function j1(i) {
  i.edges().forEach((e) => {
    let t = i.edge(e);
    t.reversed && t.points.reverse();
  });
}
function L1(i) {
  i.nodes().forEach((e) => {
    if (i.children(e).length) {
      let t = i.node(e), n = i.node(t.borderTop), s = i.node(t.borderBottom), r = i.node(t.borderLeft[t.borderLeft.length - 1]), o = i.node(t.borderRight[t.borderRight.length - 1]);
      t.width = Math.abs(o.x - r.x), t.height = Math.abs(s.y - n.y), t.x = r.x + t.width / 2, t.y = n.y + t.height / 2;
    }
  }), i.nodes().forEach((e) => {
    i.node(e).dummy === "border" && i.removeNode(e);
  });
}
function I1(i) {
  i.edges().forEach((e) => {
    if (e.v === e.w) {
      let t = i.node(e.v);
      t.selfEdges || (t.selfEdges = []), t.selfEdges.push({ e, label: i.edge(e) }), i.removeEdge(e);
    }
  });
}
function D1(i) {
  na(i).forEach((e) => {
    let t = 0;
    e.forEach((n, s) => {
      let r = i.node(n);
      r.order = s + t, (r.selfEdges || []).forEach((o) => {
        xr(i, "selfedge", { width: o.label.width, height: o.label.height, rank: r.rank, order: s + ++t, e: o.e, label: o.label }, "_se");
      }), delete r.selfEdges;
    });
  });
}
function z1(i) {
  i.nodes().forEach((e) => {
    let t = i.node(e);
    if (t.dummy === "selfedge") {
      let n = t, s = i.node(n.e.v), r = s.x + s.width / 2, o = s.y, l = t.x - r, a = s.height / 2;
      i.setEdge(n.e, n.label), i.removeNode(e), n.label.points = [{ x: r + 2 * l / 3, y: o - a }, { x: r + 5 * l / 6, y: o - a }, { x: r + l, y: o }, { x: r + 5 * l / 6, y: o + a }, { x: r + 2 * l / 3, y: o + a }], n.label.x = t.x, n.label.y = t.y;
    }
  });
}
function Ma(i, e) {
  return sa(kl(i, e), Number);
}
function Xa(i) {
  let e = {};
  return i && Object.entries(i).forEach(([t, n]) => {
    typeof t == "string" && (t = t.toLowerCase()), e[t] = n;
  }), e;
}
/*! For license information please see dagre.esm.js.LEGAL.txt */
function N1(i) {
  const e = new _i({ multigraph: !0 });
  e.setGraph({
    rankdir: "LR",
    nodesep: wl,
    ranksep: wl * 2,
    marginx: 40,
    marginy: 40
  }), e.setDefaultEdgeLabel(() => ({}));
  for (const n of Object.values(i.nodes))
    e.setNode(n.id, { width: ar, height: hr });
  for (const n of i.edges)
    i.nodes[n.from] && i.nodes[n.to] && e.setEdge(n.from, n.to);
  b1(e);
  const t = {};
  for (const [n, s] of Object.entries(i.nodes)) {
    const r = e.node(n);
    t[n] = r ? { ...s, position: { x: r.x - ar / 2, y: r.y - hr / 2 } } : s;
  }
  return { ...i, nodes: t };
}
const oa = Qn(!1);
let Ns = null, so = !1, iu = !1;
ht.subscribe(() => {
  if (!iu) {
    iu = !0;
    return;
  }
  so || Ns && (Ns = null, oa.set(!1));
});
function Y1() {
  Ns = structuredClone(Gd(ht)), so = !0, ht.update((i) => N1(i)), so = !1, oa.set(!0);
}
function ja() {
  if (!Ns) return;
  const i = Ns;
  so = !0, ht.set(i), so = !1, Ns = null, oa.set(!1);
}
const _o = Qn(!1);
let Ys = null, Kp = "", ro = !1, nu = !1;
ht.subscribe(() => {
  if (!nu) {
    nu = !0;
    return;
  }
  ro || Ys && (Ys = null, _o.set(!1));
});
function W1(i, e, t) {
  Ys = i, Kp = e, ro = !0, t(), ro = !1, _o.set(!0);
}
function Jp() {
  if (!Ys) return null;
  const i = Ys, e = Kp;
  return ro = !0, ht.set(i), ro = !1, Ys = null, _o.set(!1), e;
}
var q1 = /* @__PURE__ */ I('<button class="toolbar-btn toolbar-btn-undo svelte-x8b01c">Undo Auto Placement</button>'), V1 = /* @__PURE__ */ I('<button class="toolbar-btn toolbar-btn-undo svelte-x8b01c">Undo Caal Change</button>'), B1 = /* @__PURE__ */ I('<div class="canvas-toolbar svelte-x8b01c"><button class="toolbar-btn svelte-x8b01c">Auto Placement</button> <!> <!></div>');
function G1(i, e) {
  $t(e, !1);
  let t = et(e, "readonly", 8, !1), n = et(e, "canUndo", 8, !1), s = et(e, "canUndoCaal", 8, !1);
  const r = Rc();
  Et();
  var o = B1(), l = w(o), a = y(l, 2);
  {
    var h = (u) => {
      var p = q1();
      te("click", p, () => r("undo")), A(u, p);
    };
    J(a, (u) => {
      n() && !t() && u(h);
    });
  }
  var c = y(a, 2);
  {
    var f = (u) => {
      var p = V1();
      te("click", p, () => r("undoCaal")), A(u, p);
    };
    J(c, (u) => {
      s() && !t() && u(f);
    });
  }
  U(() => l.disabled = t()), te("click", l, () => r("autoPlacement")), A(i, o), _t();
}
var U1 = /* @__PURE__ */ $o('<line stroke-width="2" marker-end="url(#arrow)"></line>'), F1 = /* @__PURE__ */ $o('<line stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5 3" opacity="0.8"></line>'), H1 = /* @__PURE__ */ $o('<circle cx="148" cy="8" r="8" fill="#f59e0b"></circle><text x="148" y="12" fill="#000" font-size="8" font-family="monospace" text-anchor="middle"> </text>', 1), K1 = /* @__PURE__ */ $o('<g style="cursor:pointer" role="button" tabindex="0"><rect width="160" height="40" rx="6"></rect><text x="12" y="14" fill="#94a3b8" font-size="9" font-family="monospace"> </text><text x="12" y="29" fill="#e2e8f0" font-size="12" font-family="system-ui"> </text><!><circle cx="160" cy="20" r="5" class="port port-out"></circle><circle cx="0" cy="20" r="5" class="port port-in"></circle></g>'), J1 = /* @__PURE__ */ $o('<line stroke="#7c6af7" stroke-width="1.5" stroke-dasharray="6,3" pointer-events="none"></line>'), ey = /* @__PURE__ */ I('<input class="picker-input svelte-1lehbkp" type="text" placeholder="JSONata expression"/> <button class="picker-btn picker-add svelte-1lehbkp">Add</button>', 1), ty = /* @__PURE__ */ I('<div class="edge-picker svelte-1lehbkp"><button class="picker-btn svelte-1lehbkp">Unconditional</button> <button class="picker-btn svelte-1lehbkp">Fallback</button> <button class="picker-btn svelte-1lehbkp">Conditional</button> <!> <button class="picker-btn picker-cancel svelte-1lehbkp">Cancel</button></div>'), iy = /* @__PURE__ */ I('<div class="empty-hint svelte-1lehbkp">Drag nodes from the palette to build your agent graph</div>'), ny = /* @__PURE__ */ I('<div class="canvas-wrap svelte-1lehbkp" role="presentation"><!> <svg style="width:100%;height:100%"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#7c6af7"></path></marker></defs><!><!><!><!></svg> <!> <!></div>');
function sy(i, e) {
  $t(e, !1);
  const t = () => at(ht, "$graph", o), n = () => at(oa, "$canUndoAutoPlacement", o), s = () => at(_o, "$canUndoCaalChange", o), r = () => at(Wn, "$selectedNode", o), [o, l] = $n(), a = /* @__PURE__ */ F();
  et(e, "agentId", 8);
  let h = et(e, "readonly", 8, !1);
  const c = "application/x-magicaal-node-type", f = /* @__PURE__ */ new Set(["core:tool", "core:mcp-client"]), u = /* @__PURE__ */ new Set(["core:tool-call", "core:react"]);
  let p = /* @__PURE__ */ F([]), O = /* @__PURE__ */ F([]), g = /* @__PURE__ */ F([]), m = null, v = { x: 0, y: 0 }, S = /* @__PURE__ */ F(), x = /* @__PURE__ */ F({ x: 0, y: 0, w: 1e3, h: 600 }), P = !1, E = { mx: 0, my: 0, vbx: 0, vby: 0 }, R = /* @__PURE__ */ F(null), C = /* @__PURE__ */ F({ x: 0, y: 0 }), Y = /* @__PURE__ */ F(null), L = /* @__PURE__ */ F({ x: 0, y: 0 }), X = /* @__PURE__ */ F(""), M = /* @__PURE__ */ F(!1);
  function k(z) {
    Wn.set(z);
  }
  function T(z) {
    const j = t().nodes[z];
    return (j == null ? void 0 : j.position) ?? { x: 100, y: 100 };
  }
  function D(z, j) {
    const K = d(S).createSVGPoint();
    K.x = z, K.y = j;
    const le = K.matrixTransform(d(S).getScreenCTM().inverse());
    return { x: le.x, y: le.y };
  }
  function $(z, j) {
    return z.addEventListener("wheel", j, { passive: !1 }), {
      destroy() {
        z.removeEventListener("wheel", j);
      }
    };
  }
  function Z(z) {
    z.preventDefault();
    const j = z.deltaY > 0 ? 1.1 : 0.9, K = d(S).getBoundingClientRect(), le = (z.clientX - K.left) / K.width * d(x).w + d(x).x, xe = (z.clientY - K.top) / K.height * d(x).h + d(x).y;
    Q(x, {
      x: le - (le - d(x).x) * j,
      y: xe - (xe - d(x).y) * j,
      w: d(x).w * j,
      h: d(x).h * j
    });
  }
  function N(z) {
    const j = z.target;
    j.closest("g") || j.tagName === "circle" || (P = !0, E = {
      mx: z.clientX,
      my: z.clientY,
      vbx: d(x).x,
      vby: d(x).y
    });
  }
  function oe(z, j) {
    if (h()) return;
    const K = D(z.clientX, z.clientY), le = j.position ?? { x: 100, y: 100 };
    m = j, v = { x: K.x - le.x, y: K.y - le.y };
  }
  function se(z, j) {
    if (h()) return;
    const K = D(z.clientX, z.clientY);
    Q(R, { fromNodeId: j, x: K.x, y: K.y }), Q(C, K);
  }
  function G(z) {
    if (d(R) && d(R).fromNodeId !== z) {
      const j = d(S).getBoundingClientRect();
      Q(L, {
        x: (d(C).x - d(x).x) / d(x).w * j.width,
        y: (d(C).y - d(x).y) / d(x).h * j.height
      }), Q(Y, { from: d(R).fromNodeId, to: z });
    }
    Q(R, null);
  }
  function q(z) {
    if (P) {
      const j = d(x).w / d(S).clientWidth, K = d(x).h / d(S).clientHeight;
      Q(x, {
        ...d(x),
        x: E.vbx - (z.clientX - E.mx) * j,
        y: E.vby - (z.clientY - E.my) * K
      });
    }
    if (m) {
      const j = D(z.clientX, z.clientY), K = m.id;
      ht.update((le) => ({
        ...le,
        nodes: {
          ...le.nodes,
          [K]: {
            ...le.nodes[K],
            position: { x: j.x - v.x, y: j.y - v.y }
          }
        }
      }));
    }
    d(R) && Q(C, D(z.clientX, z.clientY));
  }
  function ie() {
    var z;
    if (m) {
      const j = (z = t().nodes[m.id]) == null ? void 0 : z.position;
      j && m0(m.id, j);
    }
    P = !1, m = null, Q(R, null);
  }
  function ae(z) {
    z.preventDefault(), !h() && z.dataTransfer && (z.dataTransfer.dropEffect = "copy");
  }
  function fe(z) {
    var Ze;
    if (z.preventDefault(), h()) return;
    const j = (Ze = z.dataTransfer) == null ? void 0 : Ze.getData(c);
    if (!j) return;
    const { type: K, name: le } = JSON.parse(j), xe = D(z.clientX, z.clientY), qe = {
      x: xe.x - ar / 2,
      y: xe.y - hr / 2
    };
    Pp(K, le, qe);
  }
  function ye() {
    const z = Object.values(t().nodes).map((Ze) => Ze.position).filter((Ze) => !!Ze);
    if (z.length === 0) return;
    const j = 60, K = Math.min(...z.map((Ze) => Ze.x)) - j, le = Math.min(...z.map((Ze) => Ze.y)) - j, xe = Math.max(...z.map((Ze) => Ze.x + ar)) + j, qe = Math.max(...z.map((Ze) => Ze.y + hr)) + j;
    Q(x, {
      x: K,
      y: le,
      w: Math.max(xe - K, 200),
      h: Math.max(qe - le, 150)
    });
  }
  function ue() {
    Y1(), ye();
  }
  function de(z, j) {
    if (h() || !d(Y)) return;
    const K = {
      id: `e-${Date.now()}`,
      from: d(Y).from,
      to: d(Y).to,
      type: z,
      ...j ? { condition: j } : {}
    };
    g0(K), Q(Y, null), Q(M, !1), Q(X, "");
  }
  lt(() => t(), () => {
    Q(p, Object.values(t().nodes)), Q(O, t().edges), Q(g, t().toolEdges ?? []);
  }), lt(() => d(g), () => {
    Q(a, d(g).reduce(
      (z, j) => (z[j.to] = (z[j.to] ?? 0) + 1, z),
      {}
    ));
  }), Ii(), Et();
  var ve = ny(), ee = w(ve);
  G1(ee, {
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
      autoPlacement: ue,
      undo(...z) {
        ja == null || ja.apply(this, z);
      },
      undoCaal: () => Jp()
    }
  });
  var he = y(ee, 2), be = y(w(he));
  nt(be, 1, () => d(O), it, (z, j) => {
    const K = /* @__PURE__ */ St(() => (d(j), b(() => T(d(j).from)))), le = /* @__PURE__ */ St(() => (d(j), b(() => T(d(j).to))));
    var xe = U1();
    U(() => {
      He(xe, "x1", (De(d(K)), b(() => d(K).x + 160))), He(xe, "y1", (De(d(K)), b(() => d(K).y + 20))), He(xe, "x2", (De(d(le)), b(() => d(le).x))), He(xe, "y2", (De(d(le)), b(() => d(le).y + 20))), He(xe, "stroke", (d(j), b(() => d(j).type === "fallback" ? "#94a3b8" : "#7c6af7"))), He(xe, "stroke-dasharray", (d(j), b(() => d(j).type === "fallback" ? "4" : "0")));
    }), A(z, xe);
  });
  var we = y(be);
  nt(we, 1, () => d(g), it, (z, j) => {
    const K = /* @__PURE__ */ St(() => (d(j), b(() => T(d(j).from)))), le = /* @__PURE__ */ St(() => (d(j), b(() => T(d(j).to))));
    var xe = F1();
    U(() => {
      He(xe, "x1", (De(d(K)), b(() => d(K).x + 160))), He(xe, "y1", (De(d(K)), b(() => d(K).y + 20))), He(xe, "x2", (De(d(le)), b(() => d(le).x))), He(xe, "y2", (De(d(le)), b(() => d(le).y + 20)));
    }), A(z, xe);
  });
  var $e = y(we);
  nt($e, 1, () => d(p), it, (z, j) => {
    const K = /* @__PURE__ */ St(() => (d(j), b(() => d(j).position ?? { x: 100, y: 100 }))), le = /* @__PURE__ */ St(() => (d(j), b(() => f.has(d(j).type)))), xe = /* @__PURE__ */ St(() => (d(j), b(() => u.has(d(j).type)))), qe = /* @__PURE__ */ St(() => (r(), d(j), b(() => {
      var Fe;
      return ((Fe = r()) == null ? void 0 : Fe.id) === d(j).id;
    }))), Ze = /* @__PURE__ */ St(() => (d(a), d(j), b(() => d(a)[d(j).id] ?? 0)));
    var H = K1(), ce = w(H), me = y(ce), Me = w(me), Ue = y(me), _e = w(Ue), Ee = y(Ue);
    {
      var pt = (Fe) => {
        var Ni = H1(), Yi = y(Je(Ni)), hi = w(Yi);
        U(() => V(hi, d(Ze))), A(Fe, Ni);
      };
      J(Ee, (Fe) => {
        d(xe) && d(Ze) > 0 && Fe(pt);
      });
    }
    var Se = y(Ee), Xe = y(Se);
    U(() => {
      He(H, "transform", `translate(${De(d(K)), b(() => d(K).x) ?? ""},${De(d(K)), b(() => d(K).y) ?? ""})`), He(ce, "fill", d(qe) ? d(le) ? "#2d1f00" : "#312e7a" : d(le) ? "#1e1600" : "#1e2035"), He(ce, "stroke", d(qe) ? d(le) ? "#f59e0b" : "#7c6af7" : d(le) ? "#b45309" : "#2d3148"), He(ce, "stroke-width", d(le) ? "2" : "1.5"), V(Me, (d(j), b(() => d(j).type))), V(_e, (d(j), b(() => d(j).label ?? d(j).id)));
    }), te("mousedown", Se, Ca((Fe) => se(Fe, d(j).id))), te("mouseup", Xe, Ca(() => G(d(j).id))), te("click", H, () => k(d(j))), te("keydown", H, (Fe) => Fe.key === "Enter" && k(d(j))), te("mousedown", H, Ca((Fe) => oe(Fe, d(j)))), A(z, H);
  });
  var We = y($e);
  {
    var st = (z) => {
      var j = J1();
      U(() => {
        He(j, "x1", (d(R), b(() => d(R).x))), He(j, "y1", (d(R), b(() => d(R).y))), He(j, "x2", (d(C), b(() => d(C).x))), He(j, "y2", (d(C), b(() => d(C).y)));
      }), A(z, j);
    };
    J(We, (z) => {
      d(R) && z(st);
    });
  }
  jc(he, (z) => Q(S, z), () => d(S)), r0(he, (z, j) => $ == null ? void 0 : $(z, j), () => Z), ia(() => te("mousedown", he, N));
  var Le = y(he, 2);
  {
    var ct = (z) => {
      var j = ty(), K = w(j), le = y(K, 2), xe = y(le, 2), qe = y(xe, 2);
      {
        var Ze = (ce) => {
          var me = ey(), Me = Je(me), Ue = y(Me, 2);
          Gt(Me, () => d(X), (_e) => Q(X, _e)), te("click", Ue, () => de("conditional", d(X))), A(ce, me);
        };
        J(qe, (ce) => {
          d(M) && ce(Ze);
        });
      }
      var H = y(qe, 2);
      U(() => kp(j, `left:${d(L), b(() => d(L).x) ?? ""}px;top:${d(L), b(() => d(L).y) ?? ""}px`)), te("click", K, () => de("unconditional")), te("click", le, () => de("fallback")), te("click", xe, () => {
        Q(M, !d(M));
      }), te("click", H, () => {
        Q(Y, null), Q(M, !1);
      }), A(z, j);
    };
    J(Le, (z) => {
      d(Y) && z(ct);
    });
  }
  var Ne = y(Le, 2);
  {
    var Re = (z) => {
      var j = iy();
      A(z, j);
    };
    J(Ne, (z) => {
      d(p), b(() => d(p).length === 0) && z(Re);
    });
  }
  U(() => He(he, "viewBox", `${d(x), b(() => d(x).x) ?? ""} ${d(x), b(() => d(x).y) ?? ""} ${d(x), b(() => d(x).w) ?? ""} ${d(x), b(() => d(x).h) ?? ""}`)), te("mousemove", ve, q), te("mouseup", ve, ie), te("mouseleave", ve, ie), te("dragover", ve, ae), te("drop", ve, fe), A(i, ve), _t(), l();
}
const Gr = Qn([]), Yc = Qn([]);
let La = !1;
async function eO() {
  if (!La) {
    La = !0;
    try {
      const i = await fetch("/api/integrations/connections");
      if (!i.ok) throw new Error(String(i.status));
      Yc.set(await i.json());
    } catch {
      La = !1;
    }
  }
}
var ry = /* @__PURE__ */ I('<span class="not-connected-badge svelte-142uvrg">not connected</span>'), oy = /* @__PURE__ */ I('<button><span class="node-name svelte-142uvrg"> <!></span> <span class="node-type svelte-142uvrg"> </span></button>'), ly = /* @__PURE__ */ I('<a class="marketplace-link svelte-142uvrg">Browse Marketplace →</a>'), ay = /* @__PURE__ */ I('<div class="category-header svelte-142uvrg"> </div> <!> <!>', 1), hy = /* @__PURE__ */ I('<div class="palette svelte-142uvrg"><div class="palette-header svelte-142uvrg">Nodes</div> <!></div>');
function cy(i, e) {
  $t(e, !1);
  const t = () => at(Gr, "$nodeTypes", s), n = () => at(Yc, "$connections", s), [s, r] = $n(), o = /* @__PURE__ */ F(), l = /* @__PURE__ */ F();
  let a = et(e, "readonly", 8, !1);
  const h = "application/x-magicaal-node-type", c = 3e4;
  let f = null, u = "", p = /* @__PURE__ */ F(!1);
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
    const Y = /* @__PURE__ */ new Map();
    for (const L of C) {
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
      const C = await fetch("/api/nodes");
      if (!C.ok) return;
      const Y = await C.json(), L = Y.map((X) => X.type).sort().join(",");
      L !== u && (u = L, Gr.set(Y));
    } catch {
      t().length === 0 && Gr.set([
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
    var L, X;
    const Y = (X = (L = C.schema) == null ? void 0 : L.config) == null ? void 0 : X.properties;
    if (Y) {
      for (const M of Object.values(Y))
        if (M.format === "connection") return M.service;
    }
  }
  function S(C, Y) {
    const L = v(C);
    return L ? !Y.has(L) : !1;
  }
  Ps(async () => {
    await m(), eO(), f = setInterval(m, c);
    try {
      const C = await fetch("/api/system/config");
      if (C.ok) {
        const Y = await C.json();
        Q(p, Y.marketplaceEnabled === !0);
      }
    } catch {
    }
  }), Sp(() => {
    f && clearInterval(f);
  });
  function x(C, Y) {
    a() || Pp(C, Y, { x: 200, y: 200 });
  }
  function P(C, Y, L) {
    var X;
    if (a()) {
      C.preventDefault();
      return;
    }
    (X = C.dataTransfer) == null || X.setData(h, JSON.stringify({ type: Y, name: L })), C.dataTransfer && (C.dataTransfer.effectAllowed = "copy");
  }
  lt(() => t(), () => {
    Q(o, g(t()));
  }), lt(() => n(), () => {
    Q(l, new Set(n().map((C) => C.service)));
  }), Ii(), Et();
  var E = hy(), R = y(w(E), 2);
  nt(R, 1, () => d(o), it, (C, Y) => {
    var L = ay(), X = Je(L), M = w(X), k = y(X, 2);
    nt(k, 1, () => (d(Y), b(() => d(Y).items)), it, ($, Z) => {
      var N = oy();
      let oe;
      var se = w(N), G = w(se), q = y(G);
      {
        var ie = (ue) => {
          var de = ry();
          U((ve) => He(de, "title", `No ${ve ?? ""} connection configured`), [
            () => (d(Z), b(() => v(d(Z))))
          ]), A(ue, de);
        }, ae = /* @__PURE__ */ ys(() => (d(Z), d(l), b(() => S(d(Z), d(l)))));
        J(q, (ue) => {
          d(ae) && ue(ie);
        });
      }
      var fe = y(se, 2), ye = w(fe);
      U(() => {
        oe = Ft(N, 1, "palette-item svelte-142uvrg", null, oe, { readonly: a() }), N.disabled = a(), He(N, "draggable", !a()), V(G, `${d(Z), b(() => d(Z).meta.name) ?? ""} `), V(ye, (d(Z), b(() => d(Z).type)));
      }), te("dragstart", N, (ue) => P(ue, d(Z).type, d(Z).meta.name)), te("click", N, () => x(d(Z).type, d(Z).meta.name)), A($, N);
    });
    var T = y(k, 2);
    {
      var D = ($) => {
        var Z = ly();
        U(() => He(Z, "href", `/admin/marketplace?category=${d(Y), b(() => d(Y).category) ?? ""}`)), A($, Z);
      };
      J(T, ($) => {
        d(p) && $(D);
      });
    }
    U(() => V(M, (d(Y), b(() => d(Y).label)))), A(C, L);
  }), A(i, E), _t(), r();
}
let Eh = [], tO = [];
(() => {
  let i = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((e) => e ? parseInt(e, 36) : 1);
  for (let e = 0, t = 0; e < i.length; e++)
    (e % 2 ? tO : Eh).push(t = t + i[e]);
})();
function fy(i) {
  if (i < 768) return !1;
  for (let e = 0, t = Eh.length; ; ) {
    let n = e + t >> 1;
    if (i < Eh[n]) t = n;
    else if (i >= tO[n]) e = n + 1;
    else return !0;
    if (e == t) return !1;
  }
}
function su(i) {
  return i >= 127462 && i <= 127487;
}
const ru = 8205;
function uy(i, e, t = !0, n = !0) {
  return (t ? iO : dy)(i, e, n);
}
function iO(i, e, t) {
  if (e == i.length) return e;
  e && nO(i.charCodeAt(e)) && sO(i.charCodeAt(e - 1)) && e--;
  let n = Ia(i, e);
  for (e += ou(n); e < i.length; ) {
    let s = Ia(i, e);
    if (n == ru || s == ru || t && fy(s))
      e += ou(s), n = s;
    else if (su(s)) {
      let r = 0, o = e - 2;
      for (; o >= 0 && su(Ia(i, o)); )
        r++, o -= 2;
      if (r % 2 == 0) break;
      e += 2;
    } else
      break;
  }
  return e;
}
function dy(i, e, t) {
  for (; e > 1; ) {
    let n = iO(i, e - 2, t);
    if (n < e) return n;
    e--;
  }
  return 0;
}
function Ia(i, e) {
  let t = i.charCodeAt(e);
  if (!sO(t) || e + 1 == i.length) return t;
  let n = i.charCodeAt(e + 1);
  return nO(n) ? (t - 55296 << 10) + (n - 56320) + 65536 : t;
}
function nO(i) {
  return i >= 56320 && i < 57344;
}
function sO(i) {
  return i >= 55296 && i < 56320;
}
function ou(i) {
  return i < 65536 ? 1 : 2;
}
let je = class rO {
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
    [e, t] = fr(this, e, t);
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
    ), Hi.from(s, this.length - (t - e) + n.length);
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
    [e, t] = fr(this, e, t);
    let n = [];
    return this.decompose(e, t, n, 0), Hi.from(n, t - e);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(e) {
    if (e == this)
      return !0;
    if (e.length != this.length || e.lines != this.lines)
      return !1;
    let t = this.scanIdentical(e, 1), n = this.length - this.scanIdentical(e, -1), s = new Ur(this), r = new Ur(e);
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
    return new Ur(this, e);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(e, t = this.length) {
    return new oO(this, e, t);
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
    return new lO(n);
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
    return e.length == 1 && !e[0] ? rO.empty : e.length <= 32 ? new Ot(e) : Hi.from(Ot.split(e, []));
  }
};
class Ot extends je {
  constructor(e, t = py(e)) {
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
        return new Oy(s, l, n, o);
      s = l + 1, n++;
    }
  }
  decompose(e, t, n, s) {
    let r = e <= 0 && t >= this.length ? this : new Ot(lu(this.text, e, t), Math.min(t, this.length) - Math.max(0, e));
    if (s & 1) {
      let o = n.pop(), l = ul(r.text, o.text.slice(), 0, r.length);
      if (l.length <= 32)
        n.push(new Ot(l, o.length + r.length));
      else {
        let a = l.length >> 1;
        n.push(new Ot(l.slice(0, a)), new Ot(l.slice(a)));
      }
    } else
      n.push(r);
  }
  replace(e, t, n) {
    if (!(n instanceof Ot))
      return super.replace(e, t, n);
    [e, t] = fr(this, e, t);
    let s = ul(this.text, ul(n.text, lu(this.text, 0, e)), t), r = this.length + n.length - (t - e);
    return s.length <= 32 ? new Ot(s, r) : Hi.from(Ot.split(s, []), r);
  }
  sliceString(e, t = this.length, n = `
`) {
    [e, t] = fr(this, e, t);
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
      n.push(r), s += r.length + 1, n.length == 32 && (t.push(new Ot(n, s)), n = [], s = -1);
    return s > -1 && t.push(new Ot(n, s)), t;
  }
}
class Hi extends je {
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
    if ([e, t] = fr(this, e, t), n.lines < this.lines)
      for (let s = 0, r = 0; s < this.children.length; s++) {
        let o = this.children[s], l = r + o.length;
        if (e >= r && t <= l) {
          let a = o.replace(e - r, t - r, n), h = this.lines - o.lines + a.lines;
          if (a.lines < h >> 4 && a.lines > h >> 6) {
            let c = this.children.slice();
            return c[s] = a, new Hi(c, this.length - (t - e) + n.length);
          }
          return super.replace(r, l, a);
        }
        r = l + 1;
      }
    return super.replace(e, t, n);
  }
  sliceString(e, t = this.length, n = `
`) {
    [e, t] = fr(this, e, t);
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
    if (!(e instanceof Hi))
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
      return new Ot(p, t);
    }
    let s = Math.max(
      32,
      n >> 5
      /* Tree.BranchShift */
    ), r = s << 1, o = s >> 1, l = [], a = 0, h = -1, c = [];
    function f(p) {
      let O;
      if (p.lines > r && p instanceof Hi)
        for (let g of p.children)
          f(g);
      else p.lines > o && (a > o || !a) ? (u(), l.push(p)) : p instanceof Ot && a && (O = c[c.length - 1]) instanceof Ot && p.lines + O.lines <= 32 ? (a += p.lines, h += p.length + 1, c[c.length - 1] = new Ot(O.text.concat(p.text), O.length + 1 + p.length)) : (a + p.lines > s && u(), a += p.lines, h += p.length + 1, c.push(p));
    }
    function u() {
      a != 0 && (l.push(c.length == 1 ? c[0] : Hi.from(c, h)), h = -1, a = c.length = 0);
    }
    for (let p of e)
      f(p);
    return u(), l.length == 1 ? l[0] : new Hi(l, t);
  }
}
je.empty = /* @__PURE__ */ new Ot([""], 0);
function py(i) {
  let e = -1;
  for (let t of i)
    e += t.length + 1;
  return e;
}
function ul(i, e, t = 0, n = 1e9) {
  for (let s = 0, r = 0, o = !0; r < i.length && s <= n; r++) {
    let l = i[r], a = s + l.length;
    a >= t && (a > n && (l = l.slice(0, n - s)), s < t && (l = l.slice(t - s)), o ? (e[e.length - 1] += l, o = !1) : e.push(l)), s = a + 1;
  }
  return e;
}
function lu(i, e, t) {
  return ul(i, [""], e, t);
}
class Ur {
  constructor(e, t = 1) {
    this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof Ot ? e.text.length : e.children.length) << 1];
  }
  nextInner(e, t) {
    for (this.done = this.lineBreak = !1; ; ) {
      let n = this.nodes.length - 1, s = this.nodes[n], r = this.offsets[n], o = r >> 1, l = s instanceof Ot ? s.text.length : s.children.length;
      if (o == (t > 0 ? l : 0)) {
        if (n == 0)
          return this.done = !0, this.value = "", this;
        t > 0 && this.offsets[n - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((r & 1) == (t > 0 ? 0 : 1)) {
        if (this.offsets[n] += t, e == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        e--;
      } else if (s instanceof Ot) {
        let a = s.text[o + (t < 0 ? -1 : 0)];
        if (this.offsets[n] += t, a.length > Math.max(0, e))
          return this.value = e == 0 ? a : t > 0 ? a.slice(e) : a.slice(0, a.length - e), this;
        e -= a.length;
      } else {
        let a = s.children[o + (t < 0 ? -1 : 0)];
        e > a.length ? (e -= a.length, this.offsets[n] += t) : (t < 0 && this.offsets[n]--, this.nodes.push(a), this.offsets.push(t > 0 ? 1 : (a instanceof Ot ? a.text.length : a.children.length) << 1));
      }
    }
  }
  next(e = 0) {
    return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
  }
}
class oO {
  constructor(e, t, n) {
    this.value = "", this.done = !1, this.cursor = new Ur(e, t > n ? -1 : 1), this.pos = t > n ? e.length : 0, this.from = Math.min(t, n), this.to = Math.max(t, n);
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
class lO {
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
typeof Symbol < "u" && (je.prototype[Symbol.iterator] = function() {
  return this.iter();
}, Ur.prototype[Symbol.iterator] = oO.prototype[Symbol.iterator] = lO.prototype[Symbol.iterator] = function() {
  return this;
});
class Oy {
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
function fr(i, e, t) {
  return e = Math.max(0, Math.min(i.length, e)), [e, Math.max(e, Math.min(i.length, t))];
}
function Rt(i, e, t = !0, n = !0) {
  return uy(i, e, t, n);
}
function gy(i) {
  return i >= 56320 && i < 57344;
}
function my(i) {
  return i >= 55296 && i < 56320;
}
function Kn(i, e) {
  let t = i.charCodeAt(e);
  if (!my(t) || e + 1 == i.length)
    return t;
  let n = i.charCodeAt(e + 1);
  return gy(n) ? (t - 55296 << 10) + (n - 56320) + 65536 : t;
}
function vy(i) {
  return i <= 65535 ? String.fromCharCode(i) : (i -= 65536, String.fromCharCode((i >> 10) + 55296, (i & 1023) + 56320));
}
function Rs(i) {
  return i < 65536 ? 1 : 2;
}
const Ah = /\r\n?|\n/;
var Lt = /* @__PURE__ */ (function(i) {
  return i[i.Simple = 0] = "Simple", i[i.TrackDel = 1] = "TrackDel", i[i.TrackBefore = 2] = "TrackBefore", i[i.TrackAfter = 3] = "TrackAfter", i;
})(Lt || (Lt = {}));
class ln {
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
    Rh(this, e, t);
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
    return new ln(e);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(e) {
    return this.empty ? e : e.empty ? this : aO(this, e);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `this` happened before the ones in `other`.
  */
  mapDesc(e, t = !1) {
    return e.empty ? this : Mh(this, e, t);
  }
  mapPos(e, t = -1, n = Lt.Simple) {
    let s = 0, r = 0;
    for (let o = 0; o < this.sections.length; ) {
      let l = this.sections[o++], a = this.sections[o++], h = s + l;
      if (a < 0) {
        if (h > e)
          return r + (e - s);
        r += l;
      } else {
        if (n != Lt.Simple && h >= e && (n == Lt.TrackDel && s < e && h > e || n == Lt.TrackBefore && s < e || n == Lt.TrackAfter && h > e))
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
    return new ln(e);
  }
  /**
  @internal
  */
  static create(e) {
    return new ln(e);
  }
}
class xt extends ln {
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
    return Rh(this, (t, n, s, r, o) => e = e.replace(s, s + (n - t), o), !1), e;
  }
  mapDesc(e, t = !1) {
    return Mh(this, e, t, !0);
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
          n.push(je.empty);
        n.push(o ? e.slice(r, r + o) : je.empty);
      }
      r += o;
    }
    return new xt(t, n);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(e) {
    return this.empty ? e : e.empty ? this : aO(this, e, !0);
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
    return e.empty ? this : Mh(this, e, t, !0);
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
    Rh(this, e, t);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return ln.create(this.sections);
  }
  /**
  @internal
  */
  filter(e) {
    let t = [], n = [], s = [], r = new oo(this);
    e: for (let o = 0, l = 0; ; ) {
      let a = o == e.length ? 1e9 : e[o++];
      for (; l < a || l == a && r.len == 0; ) {
        if (r.done)
          break e;
        let c = Math.min(r.len, a - l);
        At(s, c, -1);
        let f = r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0;
        At(t, c, f), f > 0 && In(n, t, r.text), r.forward(c), l += c;
      }
      let h = e[o++];
      for (; l < h; ) {
        if (r.done)
          break e;
        let c = Math.min(r.len, h - l);
        At(t, c, -1), At(s, c, r.ins == -1 ? -1 : r.off == 0 ? r.ins : 0), r.forward(c), l += c;
      }
    }
    return {
      changes: new xt(t, n),
      filtered: ln.create(s)
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
      o < t && At(s, t - o, -1);
      let f = new xt(s, r);
      l = l ? l.compose(f.map(l)) : f, s = [], r = [], o = 0;
    }
    function h(c) {
      if (Array.isArray(c))
        for (let f of c)
          h(f);
      else if (c instanceof xt) {
        if (c.length != t)
          throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${t})`);
        a(), l = l ? l.compose(c.map(l)) : c;
      } else {
        let { from: f, to: u = f, insert: p } = c;
        if (f > u || f < 0 || u > t)
          throw new RangeError(`Invalid change range ${f} to ${u} (in doc of length ${t})`);
        let O = p ? typeof p == "string" ? je.of(p.split(n || Ah)) : p : je.empty, g = O.length;
        if (f == u && g == 0)
          return;
        f < o && a(), f > o && At(s, f - o, -1), At(s, u - f, g), In(r, s, O), o = u;
      }
    }
    return h(e), a(!l), l;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(e) {
    return new xt(e ? [e, -1] : [], []);
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
            n.push(je.empty);
          n[s] = je.of(r.slice(1)), t.push(r[0], n[s].length);
        }
      }
    }
    return new xt(t, n);
  }
  /**
  @internal
  */
  static createSet(e, t) {
    return new xt(e, t);
  }
}
function At(i, e, t, n = !1) {
  if (e == 0 && t <= 0)
    return;
  let s = i.length - 2;
  s >= 0 && t <= 0 && t == i[s + 1] ? i[s] += e : s >= 0 && e == 0 && i[s] == 0 ? i[s + 1] += t : n ? (i[s] += e, i[s + 1] += t) : i.push(e, t);
}
function In(i, e, t) {
  if (t.length == 0)
    return;
  let n = e.length - 2 >> 1;
  if (n < i.length)
    i[i.length - 1] = i[i.length - 1].append(t);
  else {
    for (; i.length < n; )
      i.push(je.empty);
    i.push(t);
  }
}
function Rh(i, e, t) {
  let n = i.inserted;
  for (let s = 0, r = 0, o = 0; o < i.sections.length; ) {
    let l = i.sections[o++], a = i.sections[o++];
    if (a < 0)
      s += l, r += l;
    else {
      let h = s, c = r, f = je.empty;
      for (; h += l, c += a, a && n && (f = f.append(n[o - 2 >> 1])), !(t || o == i.sections.length || i.sections[o + 1] < 0); )
        l = i.sections[o++], a = i.sections[o++];
      e(s, h, r, c, f), s = h, r = c;
    }
  }
}
function Mh(i, e, t, n = !1) {
  let s = [], r = n ? [] : null, o = new oo(i), l = new oo(e);
  for (let a = -1; ; ) {
    if (o.done && l.len || l.done && o.len)
      throw new Error("Mismatched change set lengths");
    if (o.ins == -1 && l.ins == -1) {
      let h = Math.min(o.len, l.len);
      At(s, h, -1), o.forward(h), l.forward(h);
    } else if (l.ins >= 0 && (o.ins < 0 || a == o.i || o.off == 0 && (l.len < o.len || l.len == o.len && !t))) {
      let h = l.len;
      for (At(s, l.ins, -1); h; ) {
        let c = Math.min(o.len, h);
        o.ins >= 0 && a < o.i && o.len <= c && (At(s, 0, o.ins), r && In(r, s, o.text), a = o.i), o.forward(c), h -= c;
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
      At(s, h, a < o.i ? o.ins : 0), r && a < o.i && In(r, s, o.text), a = o.i, o.forward(o.len - c);
    } else {
      if (o.done && l.done)
        return r ? xt.createSet(s, r) : ln.create(s);
      throw new Error("Mismatched change set lengths");
    }
  }
}
function aO(i, e, t = !1) {
  let n = [], s = t ? [] : null, r = new oo(i), o = new oo(e);
  for (let l = !1; ; ) {
    if (r.done && o.done)
      return s ? xt.createSet(n, s) : ln.create(n);
    if (r.ins == 0)
      At(n, r.len, 0, l), r.next();
    else if (o.len == 0 && !o.done)
      At(n, 0, o.ins, l), s && In(s, n, o.text), o.next();
    else {
      if (r.done || o.done)
        throw new Error("Mismatched change set lengths");
      {
        let a = Math.min(r.len2, o.len), h = n.length;
        if (r.ins == -1) {
          let c = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
          At(n, a, c, l), s && c && In(s, n, o.text);
        } else o.ins == -1 ? (At(n, r.off ? 0 : r.len, a, l), s && In(s, n, r.textBit(a))) : (At(n, r.off ? 0 : r.len, o.off ? 0 : o.ins, l), s && !o.off && In(s, n, o.text));
        l = (r.ins > a || o.ins >= 0 && o.len > a) && (l || n.length > h), r.forward2(a), o.forward(a);
      }
    }
  }
}
class oo {
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
    return t >= e.length ? je.empty : e[t];
  }
  textBit(e) {
    let { inserted: t } = this.set, n = this.i - 2 >> 1;
    return n >= t.length && !e ? je.empty : t[n].slice(this.off, e == null ? void 0 : this.off + e);
  }
  forward(e) {
    e == this.len ? this.next() : (this.len -= e, this.off += e);
  }
  forward2(e) {
    this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
  }
}
class An {
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
    return this.empty ? n = s = e.mapPos(this.from, t) : (n = e.mapPos(this.from, 1), s = e.mapPos(this.to, -1)), n == this.from && s == this.to ? this : new An(n, s, this.flags, this.goalColumn);
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
    return new An(e, t, n, s);
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
    return new B(e.ranges.map((t) => An.fromJSON(t)), e.main);
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
    return An.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (n == null ? 7 : Math.min(6, n)), s);
  }
  /**
  Create a selection range.
  */
  static range(e, t, n, s, r) {
    let o = s == null ? 7 : Math.min(6, s);
    return !r && e != t && (r = t < e ? 1 : -1), r && (o |= r < 0 ? 8 : 16), t < e ? An.create(t, e, o | 32, n) : An.create(e, t, o, n);
  }
  /**
  Create an [undirectional](https://codemirror.net/6/docs/ref/#state.SelectionRange.undirectional)
  selection range.
  */
  static undirectionalRange(e, t) {
    return An.create(e, t, 64, void 0);
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
function hO(i, e) {
  for (let t of i.ranges)
    if (t.to > e)
      throw new RangeError("Selection points outside of document");
}
let Wc = 0;
class ge {
  constructor(e, t, n, s, r) {
    this.combine = e, this.compareInput = t, this.compare = n, this.isStatic = s, this.id = Wc++, this.default = e([]), this.extensions = typeof r == "function" ? r(this) : r;
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
    return new ge(e.combine || ((t) => t), e.compareInput || ((t, n) => t === n), e.compare || (e.combine ? (t, n) => t === n : qc), !!e.static, e.enables);
  }
  /**
  Returns an extension that adds the given value to this facet.
  */
  of(e) {
    return new dl([], this, 0, e);
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
    return new dl(e, this, 1, t);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(e, t) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new dl(e, this, 2, t);
  }
  from(e, t) {
    return t || (t = (n) => n), this.compute([e], (n) => t(n.field(e)));
  }
}
function qc(i, e) {
  return i == e || i.length == e.length && i.every((t, n) => t === e[n]);
}
class dl {
  constructor(e, t, n, s) {
    this.dependencies = e, this.facet = t, this.type = n, this.value = s, this.id = Wc++;
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
      update(f, u) {
        if (a && u.docChanged || h && (u.docChanged || u.selection) || Xh(f, c)) {
          let p = n(f);
          if (l ? !au(p, f.values[o], s) : !s(p, f.values[o]))
            return f.values[o] = p, 1;
        }
        return 0;
      },
      reconfigure: (f, u) => {
        let p, O = u.config.address[r];
        if (O != null) {
          let g = $l(u, O);
          if (this.dependencies.every((m) => m instanceof ge ? u.facet(m) === f.facet(m) : m instanceof cn ? u.field(m, !1) == f.field(m, !1) : !0) || (l ? au(p = n(f), g, s) : s(p = n(f), g)))
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
function au(i, e, t) {
  if (i.length != e.length)
    return !1;
  for (let n = 0; n < i.length; n++)
    if (!t(i[n], e[n]))
      return !1;
  return !0;
}
function Xh(i, e) {
  let t = !1;
  for (let n of e)
    Fr(i, n) & 1 && (t = !0);
  return t;
}
function by(i, e, t) {
  let n = t.map((a) => i[a.id]), s = t.map((a) => a.type), r = n.filter((a) => !(a & 1)), o = i[e.id] >> 1;
  function l(a) {
    let h = [];
    for (let c = 0; c < n.length; c++) {
      let f = $l(a, n[c]);
      if (s[c] == 2)
        for (let u of f)
          h.push(u);
      else
        h.push(f);
    }
    return e.combine(h);
  }
  return {
    create(a) {
      for (let h of n)
        Fr(a, h);
      return a.values[o] = l(a), 1;
    },
    update(a, h) {
      if (!Xh(a, r))
        return 0;
      let c = l(a);
      return e.compare(c, a.values[o]) ? 0 : (a.values[o] = c, 1);
    },
    reconfigure(a, h) {
      let c = Xh(a, n), f = h.config.facets[e.id], u = h.facet(e);
      if (f && !c && qc(t, f))
        return a.values[o] = u, 0;
      let p = l(a);
      return e.compare(p, u) ? (a.values[o] = u, 0) : (a.values[o] = p, 1);
    }
  };
}
const Do = /* @__PURE__ */ ge.define({ static: !0 });
class cn {
  constructor(e, t, n, s, r) {
    this.id = e, this.createF = t, this.updateF = n, this.compareF = s, this.spec = r, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(e) {
    let t = new cn(Wc++, e.create, e.update, e.compare || ((n, s) => n === s), e);
    return e.provide && (t.provides = e.provide(t)), t;
  }
  create(e) {
    let t = e.facet(Do).find((n) => n.field == this);
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
        let r = n.facet(Do), o = s.facet(Do), l;
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
    return [this, Do.of({ field: this, create: e })];
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
const es = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function Tr(i) {
  return (e) => new cO(e, i);
}
const Po = {
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ Tr(es.highest),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ Tr(es.high),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ Tr(es.default),
  /**
  A lower-than-default precedence.
  */
  low: /* @__PURE__ */ Tr(es.low),
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ Tr(es.lowest)
};
class cO {
  constructor(e, t) {
    this.inner = e, this.prec = t;
  }
  get extension() {
    return this;
  }
}
class la {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(e) {
    return new jh(this, e);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(e) {
    return la.reconfigure.of({ compartment: this, extension: e });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(e) {
    return e.config.compartments.get(this);
  }
}
class jh {
  constructor(e, t) {
    this.compartment = e, this.inner = t;
  }
  get extension() {
    return this;
  }
}
class Ql {
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
    for (let u of yy(e, t, o))
      u instanceof cn ? s.push(u) : (r[u.facet.id] || (r[u.facet.id] = [])).push(u);
    let l = /* @__PURE__ */ Object.create(null), a = [], h = [];
    for (let u of s)
      l[u.id] = h.length << 1, h.push((p) => u.slot(p));
    let c = n == null ? void 0 : n.config.facets;
    for (let u in r) {
      let p = r[u], O = p[0].facet, g = c && c[u] || [];
      if (p.every(
        (m) => m.type == 0
        /* Provider.Static */
      ))
        if (l[O.id] = a.length << 1 | 1, qc(g, p))
          a.push(n.facet(O));
        else {
          let m = O.combine(p.map((v) => v.value));
          a.push(n && O.compare(m, n.facet(O)) ? n.facet(O) : m);
        }
      else {
        for (let m of p)
          m.type == 0 ? (l[m.id] = a.length << 1 | 1, a.push(m.value)) : (l[m.id] = h.length << 1, h.push((v) => m.dynamicSlot(v)));
        l[O.id] = h.length << 1, h.push((m) => by(m, O, p));
      }
    }
    let f = h.map((u) => u(l));
    return new Ql(e, o, f, l, a, r);
  }
}
function yy(i, e, t) {
  let n = [[], [], [], [], []], s = /* @__PURE__ */ new Map();
  function r(o, l) {
    let a = s.get(o);
    if (a != null) {
      if (a <= l)
        return;
      let h = n[a].indexOf(o);
      h > -1 && n[a].splice(h, 1), o instanceof jh && t.delete(o.compartment);
    }
    if (s.set(o, l), Array.isArray(o))
      for (let h of o)
        r(h, l);
    else if (o instanceof jh) {
      if (t.has(o.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let h = e.get(o.compartment) || o.inner;
      t.set(o.compartment, h), r(h, l);
    } else if (o instanceof cO)
      r(o.inner, o.prec);
    else if (o instanceof cn)
      n[l].push(o), o.provides && r(o.provides, l);
    else if (o instanceof dl)
      n[l].push(o), o.facet.extensions && r(o.facet.extensions, es.default);
    else {
      let h = o.extension;
      if (!h)
        throw new Error(`Unrecognized extension value in extension set (${o}).`);
      if (h == o)
        throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      r(h, l);
    }
  }
  return r(i, es.default), n.reduce((o, l) => o.concat(l));
}
function Fr(i, e) {
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
function $l(i, e) {
  return e & 1 ? i.config.staticValues[e >> 1] : i.values[e >> 1];
}
const fO = /* @__PURE__ */ ge.define(), Lh = /* @__PURE__ */ ge.define({
  combine: (i) => i.some((e) => e),
  static: !0
}), uO = /* @__PURE__ */ ge.define({
  combine: (i) => i.length ? i[0] : void 0,
  static: !0
}), dO = /* @__PURE__ */ ge.define(), pO = /* @__PURE__ */ ge.define(), OO = /* @__PURE__ */ ge.define(), gO = /* @__PURE__ */ ge.define({
  combine: (i) => i.length ? i[0] : !1
});
class _n {
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
    return new wy();
  }
}
class wy {
  /**
  Create an instance of this annotation.
  */
  of(e) {
    return new _n(this, e);
  }
}
class xy {
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
    return new Ve(this, e);
  }
}
class Ve {
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
    return t === void 0 ? void 0 : t == this.value ? this : new Ve(this.type, t);
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
    return new xy(e.map || ((t) => t));
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
Ve.reconfigure = /* @__PURE__ */ Ve.define();
Ve.appendConfig = /* @__PURE__ */ Ve.define();
class bt {
  constructor(e, t, n, s, r, o) {
    this.startState = e, this.changes = t, this.selection = n, this.effects = s, this.annotations = r, this.scrollIntoView = o, this._doc = null, this._state = null, n && hO(n, t.newLength), r.some((l) => l.type == bt.time) || (this.annotations = r.concat(bt.time.of(Date.now())));
  }
  /**
  @internal
  */
  static create(e, t, n, s, r, o) {
    return new bt(e, t, n, s, r, o);
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
    let t = this.annotation(bt.userEvent);
    return !!(t && (t == e || t.length > e.length && t.slice(0, e.length) == e && t[e.length] == "."));
  }
}
bt.time = /* @__PURE__ */ _n.define();
bt.userEvent = /* @__PURE__ */ _n.define();
bt.addToHistory = /* @__PURE__ */ _n.define();
bt.remote = /* @__PURE__ */ _n.define();
function Sy(i, e) {
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
function mO(i, e, t) {
  var n;
  let s, r, o;
  return t ? (s = e.changes, r = xt.empty(e.changes.length), o = i.changes.compose(e.changes)) : (s = e.changes.map(i.changes), r = i.changes.mapDesc(e.changes, !0), o = i.changes.compose(s)), {
    changes: o,
    selection: e.selection ? e.selection.map(r) : (n = i.selection) === null || n === void 0 ? void 0 : n.map(s),
    effects: Ve.mapEffects(i.effects, s).concat(Ve.mapEffects(e.effects, r)),
    annotations: i.annotations.length ? i.annotations.concat(e.annotations) : e.annotations,
    scrollIntoView: i.scrollIntoView || e.scrollIntoView
  };
}
function Ih(i, e, t) {
  let n = e.selection, s = Ws(e.annotations);
  return e.userEvent && (s = s.concat(bt.userEvent.of(e.userEvent))), {
    changes: e.changes instanceof xt ? e.changes : xt.of(e.changes || [], t, i.facet(uO)),
    selection: n && (n instanceof B ? n : B.single(n.anchor, n.head)),
    effects: Ws(e.effects),
    annotations: s,
    scrollIntoView: !!e.scrollIntoView
  };
}
function vO(i, e, t) {
  let n = Ih(i, e.length ? e[0] : {}, i.doc.length);
  e.length && e[0].filter === !1 && (t = !1);
  for (let r = 1; r < e.length; r++) {
    e[r].filter === !1 && (t = !1);
    let o = !!e[r].sequential;
    n = mO(n, Ih(i, e[r], o ? n.changes.newLength : i.doc.length), o);
  }
  let s = bt.create(i, n.changes, n.selection, n.effects, n.annotations, n.scrollIntoView);
  return Qy(t ? ky(s) : s);
}
function ky(i) {
  let e = i.startState, t = !0;
  for (let s of e.facet(dO)) {
    let r = s(i);
    if (r === !1) {
      t = !1;
      break;
    }
    Array.isArray(r) && (t = t === !0 ? r : Sy(t, r));
  }
  if (t !== !0) {
    let s, r;
    if (t === !1)
      r = i.changes.invertedDesc, s = xt.empty(e.doc.length);
    else {
      let o = i.changes.filter(t);
      s = o.changes, r = o.filtered.mapDesc(o.changes).invertedDesc;
    }
    i = bt.create(e, s, i.selection && i.selection.map(r), Ve.mapEffects(i.effects, r), i.annotations, i.scrollIntoView);
  }
  let n = e.facet(pO);
  for (let s = n.length - 1; s >= 0; s--) {
    let r = n[s](i);
    r instanceof bt ? i = r : Array.isArray(r) && r.length == 1 && r[0] instanceof bt ? i = r[0] : i = vO(e, Ws(r), !1);
  }
  return i;
}
function Qy(i) {
  let e = i.startState, t = e.facet(OO), n = i;
  for (let s = t.length - 1; s >= 0; s--) {
    let r = t[s](i);
    r && Object.keys(r).length && (n = mO(n, Ih(e, r, i.changes.newLength), !0));
  }
  return n == i ? i : bt.create(e, i.changes, i.selection, n.effects, n.annotations, n.scrollIntoView);
}
const $y = [];
function Ws(i) {
  return i == null ? $y : Array.isArray(i) ? i : [i];
}
var bn = /* @__PURE__ */ (function(i) {
  return i[i.Word = 0] = "Word", i[i.Space = 1] = "Space", i[i.Other = 2] = "Other", i;
})(bn || (bn = {}));
const _y = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let Dh;
try {
  Dh = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function Py(i) {
  if (Dh)
    return Dh.test(i);
  for (let e = 0; e < i.length; e++) {
    let t = i[e];
    if (/\w/.test(t) || t > "" && (t.toUpperCase() != t.toLowerCase() || _y.test(t)))
      return !0;
  }
  return !1;
}
function Ty(i) {
  return (e) => {
    if (!/\S/.test(e))
      return bn.Space;
    if (Py(e))
      return bn.Word;
    for (let t = 0; t < i.length; t++)
      if (e.indexOf(i[t]) > -1)
        return bn.Word;
    return bn.Other;
  };
}
class ze {
  constructor(e, t, n, s, r, o) {
    this.config = e, this.doc = t, this.selection = n, this.values = s, this.status = e.statusTemplate.slice(), this.computeSlot = r, o && (o._state = this);
    for (let l = 0; l < this.config.dynamicSlots.length; l++)
      Fr(this, l << 1);
    this.computeSlot = null;
  }
  field(e, t = !0) {
    let n = this.config.address[e.id];
    if (n == null) {
      if (t)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return Fr(this, n), $l(this, n);
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
    return vO(this, e, !0);
  }
  /**
  @internal
  */
  applyTransaction(e) {
    let t = this.config, { base: n, compartments: s } = t;
    for (let l of e.effects)
      l.is(la.reconfigure) ? (t && (s = /* @__PURE__ */ new Map(), t.compartments.forEach((a, h) => s.set(h, a)), t = null), s.set(l.value.compartment, l.value.extension)) : l.is(Ve.reconfigure) ? (t = null, n = l.value) : l.is(Ve.appendConfig) && (t = null, n = Ws(n).concat(l.value));
    let r;
    t ? r = e.startState.values.slice() : (t = Ql.resolve(n, s, this), r = new ze(t, this.doc, this.selection, t.dynamicSlots.map(() => null), (a, h) => h.reconfigure(a, this), null).values);
    let o = e.startState.facet(Lh) ? e.newSelection : e.newSelection.asSingle();
    new ze(t, e.newDoc, o, r, (l, a) => a.update(l, e), e);
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
    let t = this.selection, n = e(t.ranges[0]), s = this.changes(n.changes), r = [n.range], o = Ws(n.effects);
    for (let l = 1; l < t.ranges.length; l++) {
      let a = e(t.ranges[l]), h = this.changes(a.changes), c = h.map(s);
      for (let u = 0; u < l; u++)
        r[u] = r[u].map(c);
      let f = s.mapDesc(h, !0);
      r.push(a.range.map(f)), s = s.compose(c), o = Ve.mapEffects(o, c).concat(Ve.mapEffects(Ws(a.effects), f));
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
    return e instanceof xt ? e : xt.of(e, this.doc.length, this.facet(ze.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
  */
  toText(e) {
    return je.of(e.split(this.facet(ze.lineSeparator) || Ah));
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
    return t == null ? e.default : (Fr(this, t), $l(this, t));
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
        s instanceof cn && this.config.address[s.id] != null && (t[n] = s.spec.toJSON(this.field(e[n]), this));
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
    return ze.create({
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
    let t = Ql.resolve(e.extensions || [], /* @__PURE__ */ new Map()), n = e.doc instanceof je ? e.doc : je.of((e.doc || "").split(t.staticFacet(ze.lineSeparator) || Ah)), s = e.selection ? e.selection instanceof B ? e.selection : B.single(e.selection.anchor, e.selection.head) : B.single(0);
    return hO(s, n.length), t.staticFacet(Lh) || (s = s.asSingle()), new ze(t, n, s, t.dynamicSlots.map(() => null), (r, o) => o.create(r), null);
  }
  /**
  The size (in columns) of a tab in the document, determined by
  the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
  */
  get tabSize() {
    return this.facet(ze.tabSize);
  }
  /**
  Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
  string for this state.
  */
  get lineBreak() {
    return this.facet(ze.lineSeparator) || `
`;
  }
  /**
  Returns true when the editor is
  [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
  */
  get readOnly() {
    return this.facet(gO);
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
    for (let n of this.facet(ze.phrases))
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
    for (let r of this.facet(fO))
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
    return Ty(t.length ? t[0] : "");
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
      let a = Rt(t, o, !1);
      if (r(t.slice(a, o)) != bn.Word)
        break;
      o = a;
    }
    for (; l < s; ) {
      let a = Rt(t, l);
      if (r(t.slice(l, a)) != bn.Word)
        break;
      l = a;
    }
    return o == l ? null : B.range(o + n, l + n);
  }
}
ze.allowMultipleSelections = Lh;
ze.tabSize = /* @__PURE__ */ ge.define({
  combine: (i) => i.length ? i[0] : 4
});
ze.lineSeparator = uO;
ze.readOnly = gO;
ze.phrases = /* @__PURE__ */ ge.define({
  compare(i, e) {
    let t = Object.keys(i), n = Object.keys(e);
    return t.length == n.length && t.every((s) => i[s] == e[s]);
  }
});
ze.languageData = fO;
ze.changeFilter = dO;
ze.transactionFilter = pO;
ze.transactionExtender = OO;
la.reconfigure = /* @__PURE__ */ Ve.define();
function Vc(i, e, t = {}) {
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
class qn {
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
    return zh.create(e, t, this);
  }
}
qn.prototype.startSide = qn.prototype.endSide = 0;
qn.prototype.point = !1;
qn.prototype.mapMode = Lt.TrackDel;
function Bc(i, e) {
  return i == e || i.constructor == e.constructor && i.eq(e);
}
let zh = class bO {
  constructor(e, t, n) {
    this.from = e, this.to = t, this.value = n;
  }
  /**
  @internal
  */
  static create(e, t, n) {
    return new bO(e, t, n);
  }
};
function Nh(i, e) {
  return i.from - e.from || i.value.startSide - e.value.startSide;
}
class Gc {
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
      let h = this.value[a], c = this.from[a] + e, f = this.to[a] + e, u, p;
      if (c == f) {
        let O = t.mapPos(c, h.startSide, h.mapMode);
        if (O == null || (u = p = O, h.startSide != h.endSide && (p = t.mapPos(c, h.endSide), p < u)))
          continue;
      } else if (u = t.mapPos(c, h.startSide), p = t.mapPos(f, h.endSide), u > p || u == p && h.startSide > 0 && h.endSide <= 0)
        continue;
      (p - u || h.endSide - h.startSide) < 0 || (o < 0 && (o = u), h.point && (l = Math.max(l, p - u)), n.push(h), s.push(u - o), r.push(p - o));
    }
    return { mapped: n.length ? new Gc(s, r, n, l) : null, pos: o };
  }
}
class Ye {
  constructor(e, t, n, s) {
    this.chunkPos = e, this.chunk = t, this.nextLayer = n, this.maxPoint = s;
  }
  /**
  @internal
  */
  static create(e, t, n, s) {
    return new Ye(e, t, n, s);
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
    if (n && (t = t.slice().sort(Nh)), this.isEmpty)
      return t.length ? Ye.of(t) : this;
    let l = new yO(this, null, -1).goto(0), a = 0, h = [], c = new _l();
    for (; l.value || a < t.length; )
      if (a < t.length && (l.from - t[a].from || l.startSide - t[a].value.startSide) >= 0) {
        let f = t[a++];
        c.addInner(f.from, f.to, f.value) || h.push(f);
      } else l.rangeIndex == 1 && l.chunkIndex < this.chunk.length && (a == t.length || this.chunkEnd(l.chunkIndex) < t[a].from) && (!o || s > this.chunkEnd(l.chunkIndex) || r < this.chunkPos[l.chunkIndex]) && c.addChunk(this.chunkPos[l.chunkIndex], this.chunk[l.chunkIndex]) ? l.nextChunk() : ((!o || s > l.to || r < l.from || o(l.from, l.to, l.value)) && (c.addInner(l.from, l.to, l.value) || h.push(zh.create(l.from, l.to, l.value))), l.next());
    return c.finishInner(this.nextLayer.isEmpty && !h.length ? Ye.empty : this.nextLayer.update({ add: h, filter: o, filterFrom: s, filterTo: r }));
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
    return t.length == 0 ? r : new Ye(n, t, r || Ye.empty, s);
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
    return lo.from([this]).goto(e);
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
    return lo.from(e).goto(t);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(e, t, n, s, r = -1) {
    let o = e.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), l = t.filter((f) => f.maxPoint > 0 || !f.isEmpty && f.maxPoint >= r), a = hu(o, l, n), h = new Cr(o, a, r), c = new Cr(l, a, r);
    n.iterGaps((f, u, p) => cu(h, f, c, u, p, s)), n.empty && n.length == 0 && cu(h, 0, c, 0, 0, s);
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
    let l = hu(r, o), a = new Cr(r, l, 0).goto(n), h = new Cr(o, l, 0).goto(n);
    for (; ; ) {
      if (a.to != h.to || !Yh(a.active, h.active) || a.point && (!h.point || !Bc(a.point, h.point)))
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
    let o = new Cr(e, null, r).goto(t), l = t, a = o.openStart;
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
    let n = new _l();
    for (let s of e instanceof zh ? [e] : t ? Cy(e) : e)
      n.add(s.from, s.to, s.value);
    return n.finish();
  }
  /**
  Join an array of range sets into a single set.
  */
  static join(e) {
    if (!e.length)
      return Ye.empty;
    let t = e[e.length - 1];
    for (let n = e.length - 2; n >= 0; n--)
      for (let s = e[n]; s != Ye.empty; s = s.nextLayer)
        t = new Ye(s.chunkPos, s.chunk, t, Math.max(s.maxPoint, t.maxPoint));
    return t;
  }
}
Ye.empty = /* @__PURE__ */ new Ye([], [], null, -1);
function Cy(i) {
  if (i.length > 1)
    for (let e = i[0], t = 1; t < i.length; t++) {
      let n = i[t];
      if (Nh(e, n) > 0)
        return i.slice().sort(Nh);
      e = n;
    }
  return i;
}
Ye.empty.nextLayer = Ye.empty;
class _l {
  finishChunk(e) {
    this.chunks.push(new Gc(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
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
    this.addInner(e, t, n) || (this.nextLayer || (this.nextLayer = new _l())).add(e, t, n);
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
    return this.finishInner(Ye.empty);
  }
  /**
  @internal
  */
  finishInner(e) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return e;
    let t = Ye.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
    return this.from = null, t;
  }
}
function hu(i, e, t) {
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
class yO {
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
class lo {
  constructor(e) {
    this.heap = e;
  }
  static from(e, t = null, n = -1) {
    let s = [];
    for (let r = 0; r < e.length; r++)
      for (let o = e[r]; !o.isEmpty; o = o.nextLayer)
        o.maxPoint >= n && s.push(new yO(o, t, n, r));
    return s.length == 1 ? s[0] : new lo(s);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(e, t = -1e9) {
    for (let n of this.heap)
      n.goto(e, t);
    for (let n = this.heap.length >> 1; n >= 0; n--)
      Da(this.heap, n);
    return this.next(), this;
  }
  forward(e, t) {
    for (let n of this.heap)
      n.forward(e, t);
    for (let n = this.heap.length >> 1; n >= 0; n--)
      Da(this.heap, n);
    (this.to - e || this.value.endSide - t) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let e = this.heap[0];
      this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), Da(this.heap, 0);
    }
  }
}
function Da(i, e) {
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
class Cr {
  constructor(e, t, n) {
    this.minPoint = n, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = lo.from(e, t, n);
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
    zo(this.active, e), zo(this.activeTo, e), zo(this.activeRank, e), this.minActive = fu(this.active, this.activeTo);
  }
  addActive(e) {
    let t = 0, { value: n, to: s, rank: r } = this.cursor;
    for (; t < this.activeRank.length && (r - this.activeRank[t] || s - this.activeTo[t]) > 0; )
      t++;
    No(this.active, t, n), No(this.activeTo, t, s), No(this.activeRank, t, r), e && No(e, t, this.cursor.from), this.minActive = fu(this.active, this.activeTo);
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
        this.removeActive(s), n && zo(n, s);
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
function cu(i, e, t, n, s, r) {
  i.goto(e), t.goto(n);
  let o = n + s, l = n, a = n - e, h = !!r.boundChange;
  for (let c = !1; ; ) {
    let f = i.to + a - t.to, u = f || i.endSide - t.endSide, p = u < 0 ? i.to + a : t.to, O = Math.min(p, o);
    if (i.point || t.point ? (i.point && t.point && Bc(i.point, t.point) && Yh(i.activeForPoint(i.to), t.activeForPoint(t.to)) || r.comparePoint(l, O, i.point, t.point), c = !1) : (c && r.boundChange(l), O > l && !Yh(i.active, t.active) && r.compareRange(l, O, i.active, t.active), h && O < o && (f || i.openEnd(p) != t.openEnd(p)) && (c = !0)), p > o)
      break;
    l = p, u <= 0 && i.next(), u >= 0 && t.next();
  }
}
function Yh(i, e) {
  if (i.length != e.length)
    return !1;
  for (let t = 0; t < i.length; t++)
    if (i[t] != e[t] && !Bc(i[t], e[t]))
      return !1;
  return !0;
}
function zo(i, e) {
  for (let t = e, n = i.length - 1; t < n; t++)
    i[t] = i[t + 1];
  i.pop();
}
function No(i, e, t) {
  for (let n = i.length - 1; n >= e; n--)
    i[n + 1] = i[n];
  i[e] = t;
}
function fu(i, e) {
  let t = -1, n = 1e9;
  for (let s = 0; s < e.length; s++)
    (e[s] - n || i[s].endSide - i[t].endSide) < 0 && (t = s, n = e[s]);
  return t;
}
function aa(i, e, t = i.length) {
  let n = 0;
  for (let s = 0; s < t && s < i.length; )
    i.charCodeAt(s) == 9 ? (n += e - n % e, s++) : (n++, s = Rt(i, s));
  return n;
}
function Zy(i, e, t, n) {
  for (let s = 0, r = 0; ; ) {
    if (r >= e)
      return s;
    if (s == i.length)
      break;
    r += i.charCodeAt(s) == 9 ? t - r % t : 1, s = Rt(i, s);
  }
  return i.length;
}
const Wh = "ͼ", uu = typeof Symbol > "u" ? "__" + Wh : Symbol.for(Wh), qh = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), du = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
class ur {
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
      let c = [], f = /^@(\w+)\b/.exec(o[0]), u = f && f[1] == "keyframes";
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
          r(s(p), O, c, u);
        } else O != null && c.push(p.replace(/_.*/, "").replace(/[A-Z]/g, (g) => "-" + g.toLowerCase()) + ": " + O + ";");
      }
      (c.length || u) && a.push((n && !f && !h ? o.map(n) : o).join(", ") + " {" + c.join(" ") + "}");
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
    let e = du[uu] || 1;
    return du[uu] = e + 1, Wh + e.toString(36);
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
    let s = e[qh], r = n && n.nonce;
    s ? r && s.setNonce(r) : s = new Ey(e, r), s.mount(Array.isArray(t) ? t : [t], e);
  }
}
let pu = /* @__PURE__ */ new Map();
class Ey {
  constructor(e, t) {
    let n = e.ownerDocument || e, s = n.defaultView;
    if (!e.head && e.adoptedStyleSheets && s.CSSStyleSheet) {
      let r = pu.get(n);
      if (r) return e[qh] = r;
      this.sheet = new s.CSSStyleSheet(), pu.set(n, this);
    } else
      this.styleTag = n.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
    this.modules = [], e[qh] = this;
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
var Vn = {
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
}, ao = {
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
}, Ay = typeof navigator < "u" && /Mac/.test(navigator.platform), Ry = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var Ct = 0; Ct < 10; Ct++) Vn[48 + Ct] = Vn[96 + Ct] = String(Ct);
for (var Ct = 1; Ct <= 24; Ct++) Vn[Ct + 111] = "F" + Ct;
for (var Ct = 65; Ct <= 90; Ct++)
  Vn[Ct] = String.fromCharCode(Ct + 32), ao[Ct] = String.fromCharCode(Ct);
for (var za in Vn) ao.hasOwnProperty(za) || (ao[za] = Vn[za]);
function My(i) {
  var e = Ay && i.metaKey && i.shiftKey && !i.ctrlKey && !i.altKey || Ry && i.shiftKey && i.key && i.key.length == 1 || i.key == "Unidentified", t = !e && i.key || (i.shiftKey ? ao : Vn)[i.keyCode] || i.key || "Unidentified";
  return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
let jt = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, Vh = typeof document < "u" ? document : { documentElement: { style: {} } };
const Bh = /* @__PURE__ */ /Edge\/(\d+)/.exec(jt.userAgent), wO = /* @__PURE__ */ /MSIE \d/.test(jt.userAgent), Gh = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(jt.userAgent), ha = !!(wO || Gh || Bh), Ou = !ha && /* @__PURE__ */ /gecko\/(\d+)/i.test(jt.userAgent), Na = !ha && /* @__PURE__ */ /Chrome\/(\d+)/.exec(jt.userAgent), gu = "webkitFontSmoothing" in Vh.documentElement.style, Uh = !ha && /* @__PURE__ */ /Apple Computer/.test(jt.vendor), mu = Uh && (/* @__PURE__ */ /Mobile\/\w+/.test(jt.userAgent) || jt.maxTouchPoints > 2);
var re = {
  mac: mu || /* @__PURE__ */ /Mac/.test(jt.platform),
  windows: /* @__PURE__ */ /Win/.test(jt.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(jt.platform),
  ie: ha,
  ie_version: wO ? Vh.documentMode || 6 : Gh ? +Gh[1] : Bh ? +Bh[1] : 0,
  gecko: Ou,
  gecko_version: Ou ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(jt.userAgent) || [0, 0])[1] : 0,
  chrome: !!Na,
  chrome_version: Na ? +Na[1] : 0,
  ios: mu,
  android: /* @__PURE__ */ /Android\b/.test(jt.userAgent),
  webkit: gu,
  webkit_version: gu ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(jt.userAgent) || [0, 0])[1] : 0,
  safari: Uh,
  safari_version: Uh ? +(/* @__PURE__ */ /\bVersion\/(\d+(\.\d+)?)/.exec(jt.userAgent) || [0, 0])[1] : 0,
  tabSize: Vh.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
function Uc(i, e) {
  for (let t in i)
    t == "class" && e.class ? e.class += " " + i.class : t == "style" && e.style ? e.style += ";" + i.style : e[t] = i[t];
  return e;
}
const Pl = /* @__PURE__ */ Object.create(null);
function Fc(i, e, t) {
  if (i == e)
    return !0;
  i || (i = Pl), e || (e = Pl);
  let n = Object.keys(i), s = Object.keys(e);
  if (n.length - 0 != s.length - 0)
    return !1;
  for (let r of n)
    if (r != t && (s.indexOf(r) == -1 || i[r] !== e[r]))
      return !1;
  return !0;
}
function Xy(i, e) {
  for (let t = i.attributes.length - 1; t >= 0; t--) {
    let n = i.attributes[t].name;
    e[n] == null && i.removeAttribute(n);
  }
  for (let t in e) {
    let n = e[t];
    t == "style" ? i.style.cssText = n : i.getAttribute(t) != n && i.setAttribute(t, n);
  }
}
function vu(i, e, t) {
  let n = !1;
  if (e)
    for (let s in e)
      t && s in t || (n = !0, s == "style" ? i.style.cssText = "" : i.removeAttribute(s));
  if (t)
    for (let s in t)
      e && e[s] == t[s] || (n = !0, s == "style" ? i.style.cssText = t[s] : i.setAttribute(s, t[s]));
  return n;
}
function jy(i) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let t = 0; t < i.attributes.length; t++) {
    let n = i.attributes[t];
    e[n.name] = n.value;
  }
  return e;
}
class Sr {
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
var Si = /* @__PURE__ */ (function(i) {
  return i[i.Text = 0] = "Text", i[i.WidgetBefore = 1] = "WidgetBefore", i[i.WidgetAfter = 2] = "WidgetAfter", i[i.WidgetRange = 3] = "WidgetRange", i;
})(Si || (Si = {}));
class Ge extends qn {
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
    return new To(e);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(e) {
    let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), n = !!e.block;
    return t += n && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new Ss(e, t, t, n, e.widget || null, !1);
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
      let { start: r, end: o } = xO(e, t);
      n = (r ? t ? -3e8 : -1 : 5e8) - 1, s = (o ? t ? 2e8 : 1 : -6e8) + 1;
    }
    return new Ss(e, n, s, t, e.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(e) {
    return new Co(e);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(e, t = !1) {
    return Ye.of(e, t);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
Ge.none = Ye.empty;
class To extends Ge {
  constructor(e) {
    let { start: t, end: n } = xO(e);
    super(t ? -1 : 5e8, n ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.attrs = e.class && e.attributes ? Uc(e.attributes, { class: e.class }) : e.class ? { class: e.class } : e.attributes || Pl;
  }
  eq(e) {
    return this == e || e instanceof To && this.tagName == e.tagName && Fc(this.attrs, e.attrs);
  }
  range(e, t = e) {
    if (e >= t)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(e, t);
  }
}
To.prototype.point = !1;
class Co extends Ge {
  constructor(e) {
    super(-2e8, -2e8, null, e);
  }
  eq(e) {
    return e instanceof Co && this.spec.class == e.spec.class && Fc(this.spec.attributes, e.spec.attributes);
  }
  range(e, t = e) {
    if (t != e)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(e, t);
  }
}
Co.prototype.mapMode = Lt.TrackBefore;
Co.prototype.point = !0;
class Ss extends Ge {
  constructor(e, t, n, s, r, o) {
    super(t, n, r, e), this.block = s, this.isReplace = o, this.mapMode = s ? t <= 0 ? Lt.TrackBefore : Lt.TrackAfter : Lt.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide != this.endSide ? Si.WidgetRange : this.startSide <= 0 ? Si.WidgetBefore : Si.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(e) {
    return e instanceof Ss && Ly(this.widget, e.widget) && this.block == e.block && this.startSide == e.startSide && this.endSide == e.endSide;
  }
  range(e, t = e) {
    if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && t != e)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(e, t);
  }
}
Ss.prototype.point = !0;
function xO(i, e = !1) {
  let { inclusiveStart: t, inclusiveEnd: n } = i;
  return t == null && (t = i.inclusive), n == null && (n = i.inclusive), { start: t ?? e, end: n ?? e };
}
function Ly(i, e) {
  return i == e || !!(i && e && i.compare(e));
}
function qs(i, e, t, n = 0) {
  let s = t.length - 1;
  s >= 0 && t[s] + n >= i ? t[s] = Math.max(t[s], e) : t.push(i, e);
}
class ho extends qn {
  constructor(e, t, n) {
    super(), this.tagName = e, this.attributes = t, this.rank = n;
  }
  eq(e) {
    return e == this || e instanceof ho && this.tagName == e.tagName && Fc(this.attributes, e.attributes);
  }
  /**
  Create a block wrapper object with the given tag name and
  attributes.
  */
  static create(e) {
    return new ho(e.tagName, e.attributes || Pl, e.rank == null ? 50 : Math.max(0, Math.min(e.rank, 100)));
  }
  /**
  Create a range set from the given block wrapper ranges.
  */
  static set(e, t = !1) {
    return Ye.of(e, t);
  }
}
ho.prototype.startSide = ho.prototype.endSide = -1;
function co(i) {
  let e;
  return i.nodeType == 11 ? e = i.getSelection ? i : i.ownerDocument : e = i, e.getSelection();
}
function Fh(i, e) {
  return e ? i == e || i.contains(e.nodeType != 1 ? e.parentNode : e) : !1;
}
function Hr(i, e) {
  if (!e.anchorNode)
    return !1;
  try {
    return Fh(i, e.anchorNode);
  } catch {
    return !1;
  }
}
function Kr(i) {
  return i.nodeType == 3 ? uo(i, 0, i.nodeValue.length).getClientRects() : i.nodeType == 1 ? i.getClientRects() : [];
}
function Jr(i, e, t, n) {
  return t ? bu(i, e, t, n, -1) || bu(i, e, t, n, 1) : !1;
}
function Bn(i) {
  for (var e = 0; ; e++)
    if (i = i.previousSibling, !i)
      return e;
}
function Tl(i) {
  return i.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(i.nodeName);
}
function bu(i, e, t, n, s) {
  for (; ; ) {
    if (i == t && e == n)
      return !0;
    if (e == (s < 0 ? 0 : kn(i))) {
      if (i.nodeName == "DIV")
        return !1;
      let r = i.parentNode;
      if (!r || r.nodeType != 1)
        return !1;
      e = Bn(i) + (s < 0 ? 0 : 1), i = r;
    } else if (i.nodeType == 1) {
      if (i = i.childNodes[e + (s < 0 ? -1 : 0)], i.nodeType == 1 && i.contentEditable == "false")
        return !1;
      e = s < 0 ? kn(i) : 0;
    } else
      return !1;
  }
}
function kn(i) {
  return i.nodeType == 3 ? i.nodeValue.length : i.childNodes.length;
}
function fo(i, e) {
  let { left: t, right: n } = i;
  if (t == n)
    return i;
  let s = e ? t : n;
  return { left: s, right: s, top: i.top, bottom: i.bottom };
}
function Iy(i) {
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
function SO(i, e) {
  let t = e.width / i.offsetWidth, n = e.height / i.offsetHeight;
  return (t > 0.995 && t < 1.005 || !isFinite(t) || Math.abs(e.width - i.offsetWidth) < 1) && (t = 1), (n > 0.995 && n < 1.005 || !isFinite(n) || Math.abs(e.height - i.offsetHeight) < 1) && (n = 1), { scaleX: t, scaleY: n };
}
function Dy(i, e, t, n, s, r, o, l) {
  let a = i.ownerDocument, h = a.defaultView || window;
  for (let c = i, f = !1; c && !f; )
    if (c.nodeType == 1) {
      let u, p = c == a.body, O = 1, g = 1;
      if (p)
        u = Iy(h);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(c).position) && (f = !0), c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth) {
          c = c.assignedSlot || c.parentNode;
          continue;
        }
        let S = c.getBoundingClientRect();
        ({ scaleX: O, scaleY: g } = SO(c, S)), u = {
          left: S.left,
          right: S.left + c.clientWidth * O,
          top: S.top,
          bottom: S.top + c.clientHeight * g
        };
      }
      let m = 0, v = 0;
      if (s == "nearest")
        e.top < u.top + o ? (v = e.top - (u.top + o), t > 0 && e.bottom > u.bottom + v && (v = e.bottom - u.bottom + o)) : e.bottom > u.bottom - o && (v = e.bottom - u.bottom + o, t < 0 && e.top - v < u.top && (v = e.top - (u.top + o)));
      else {
        let S = e.bottom - e.top, x = u.bottom - u.top;
        v = (s == "center" && S <= x ? e.top + S / 2 - x / 2 : s == "start" || s == "center" && t < 0 ? e.top - o : e.bottom - x + o) - u.top;
      }
      if (n == "nearest" ? e.left < u.left + r ? (m = e.left - (u.left + r), t > 0 && e.right > u.right + m && (m = e.right - u.right + r)) : e.right > u.right - r && (m = e.right - u.right + r, t < 0 && e.left < u.left + m && (m = e.left - (u.left + r))) : m = (n == "center" ? e.left + (e.right - e.left) / 2 - (u.right - u.left) / 2 : n == "start" == l ? e.left - r : e.right - (u.right - u.left) + r) - u.left, m || v)
        if (p)
          h.scrollBy(m, v);
        else {
          let S = 0, x = 0;
          if (v) {
            let P = c.scrollTop;
            c.scrollTop += v / g, x = (c.scrollTop - P) * g;
          }
          if (m) {
            let P = c.scrollLeft;
            c.scrollLeft += m / O, S = (c.scrollLeft - P) * O;
          }
          e = {
            left: e.left - S,
            top: e.top - x,
            right: e.right - S,
            bottom: e.bottom - x
          }, S && Math.abs(S - m) < 1 && (n = "nearest"), x && Math.abs(x - v) < 1 && (s = "nearest");
        }
      if (p)
        break;
      (e.top < u.top || e.bottom > u.bottom || e.left < u.left || e.right > u.right) && (e = {
        left: Math.max(e.left, u.left),
        right: Math.min(e.right, u.right),
        top: Math.max(e.top, u.top),
        bottom: Math.min(e.bottom, u.bottom)
      }), c = c.assignedSlot || c.parentNode;
    } else if (c.nodeType == 11)
      c = c.host;
    else
      break;
}
function kO(i, e = !0) {
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
class zy {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(e) {
    return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
  }
  setRange(e) {
    let { anchorNode: t, focusNode: n } = e;
    this.set(t, Math.min(e.anchorOffset, t ? kn(t) : 0), n, Math.min(e.focusOffset, n ? kn(n) : 0));
  }
  set(e, t, n, s) {
    this.anchorNode = e, this.anchorOffset = t, this.focusNode = n, this.focusOffset = s;
  }
}
let Jn = null;
re.safari && re.safari_version >= 26 && (Jn = !1);
function QO(i) {
  if (i.setActive)
    return i.setActive();
  if (Jn)
    return i.focus(Jn);
  let e = [];
  for (let t = i; t && (e.push(t, t.scrollTop, t.scrollLeft), t != t.ownerDocument); t = t.parentNode)
    ;
  if (i.focus(Jn == null ? {
    get preventScroll() {
      return Jn = { preventScroll: !0 }, !0;
    }
  } : void 0), !Jn) {
    Jn = !1;
    for (let t = 0; t < e.length; ) {
      let n = e[t++], s = e[t++], r = e[t++];
      n.scrollTop != s && (n.scrollTop = s), n.scrollLeft != r && (n.scrollLeft = r);
    }
  }
}
let yu;
function uo(i, e, t = e) {
  let n = yu || (yu = document.createRange());
  return n.setEnd(i, t), n.setStart(i, e), n;
}
function Vs(i, e, t, n) {
  let s = { key: e, code: e, keyCode: t, which: t, cancelable: !0 };
  n && ({ altKey: s.altKey, ctrlKey: s.ctrlKey, shiftKey: s.shiftKey, metaKey: s.metaKey } = n);
  let r = new KeyboardEvent("keydown", s);
  r.synthetic = !0, i.dispatchEvent(r);
  let o = new KeyboardEvent("keyup", s);
  return o.synthetic = !0, i.dispatchEvent(o), r.defaultPrevented || o.defaultPrevented;
}
function Ny(i) {
  for (; i; ) {
    if (i && (i.nodeType == 9 || i.nodeType == 11 && i.host))
      return i;
    i = i.assignedSlot || i.parentNode;
  }
  return null;
}
function Yy(i, e) {
  let t = e.focusNode, n = e.focusOffset;
  if (!t || e.anchorNode != t || e.anchorOffset != n)
    return !1;
  for (n = Math.min(n, kn(t)); ; )
    if (n) {
      if (t.nodeType != 1)
        return !1;
      let s = t.childNodes[n - 1];
      s.contentEditable == "false" ? n-- : (t = s, n = kn(t));
    } else {
      if (t == i)
        return !0;
      n = Bn(t), t = t.parentNode;
    }
}
function $O(i) {
  return i instanceof Window ? i.pageYOffset > Math.max(0, i.document.documentElement.scrollHeight - i.innerHeight - 4) : i.scrollTop > Math.max(1, i.scrollHeight - i.clientHeight - 4);
}
function _O(i, e) {
  for (let t = i, n = e; ; ) {
    if (t.nodeType == 3 && n > 0)
      return { node: t, offset: n };
    if (t.nodeType == 1 && n > 0) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[n - 1], n = kn(t);
    } else if (t.parentNode && !Tl(t))
      n = Bn(t), t = t.parentNode;
    else
      return null;
  }
}
function PO(i, e) {
  for (let t = i, n = e; ; ) {
    if (t.nodeType == 3 && n < t.nodeValue.length)
      return { node: t, offset: n };
    if (t.nodeType == 1 && n < t.childNodes.length) {
      if (t.contentEditable == "false")
        return null;
      t = t.childNodes[n], n = 0;
    } else if (t.parentNode && !Tl(t))
      n = Bn(t) + 1, t = t.parentNode;
    else
      return null;
  }
}
class Mi {
  constructor(e, t, n = !0) {
    this.node = e, this.offset = t, this.precise = n;
  }
  static before(e, t) {
    return new Mi(e.parentNode, Bn(e), t);
  }
  static after(e, t) {
    return new Mi(e.parentNode, Bn(e) + 1, t);
  }
}
var ft = /* @__PURE__ */ (function(i) {
  return i[i.LTR = 0] = "LTR", i[i.RTL = 1] = "RTL", i;
})(ft || (ft = {}));
const ks = ft.LTR, Hc = ft.RTL;
function TO(i) {
  let e = [];
  for (let t = 0; t < i.length; t++)
    e.push(1 << +i[t]);
  return e;
}
const Wy = /* @__PURE__ */ TO("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), qy = /* @__PURE__ */ TO("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), Hh = /* @__PURE__ */ Object.create(null), Wi = [];
for (let i of ["()", "[]", "{}"]) {
  let e = /* @__PURE__ */ i.charCodeAt(0), t = /* @__PURE__ */ i.charCodeAt(1);
  Hh[e] = t, Hh[t] = -e;
}
function CO(i) {
  return i <= 247 ? Wy[i] : 1424 <= i && i <= 1524 ? 2 : 1536 <= i && i <= 1785 ? qy[i - 1536] : 1774 <= i && i <= 2220 ? 4 : 8192 <= i && i <= 8204 ? 256 : 64336 <= i && i <= 65023 ? 4 : 1;
}
const Vy = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class tn {
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? Hc : ks;
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
function ZO(i, e) {
  if (i.length != e.length)
    return !1;
  for (let t = 0; t < i.length; t++) {
    let n = i[t], s = e[t];
    if (n.from != s.from || n.to != s.to || n.direction != s.direction || !ZO(n.inner, s.inner))
      return !1;
  }
  return !0;
}
const Be = [];
function By(i, e, t, n, s) {
  for (let r = 0; r <= n.length; r++) {
    let o = r ? n[r - 1].to : e, l = r < n.length ? n[r].from : t, a = r ? 256 : s;
    for (let h = o, c = a, f = a; h < l; h++) {
      let u = CO(i.charCodeAt(h));
      u == 512 ? u = c : u == 8 && f == 4 && (u = 16), Be[h] = u == 4 ? 2 : u, u & 7 && (f = u), c = u;
    }
    for (let h = o, c = a, f = a; h < l; h++) {
      let u = Be[h];
      if (u == 128)
        h < l - 1 && c == Be[h + 1] && c & 24 ? u = Be[h] = c : Be[h] = 256;
      else if (u == 64) {
        let p = h + 1;
        for (; p < l && Be[p] == 64; )
          p++;
        let O = h && c == 8 || p < t && Be[p] == 8 ? f == 1 ? 1 : 8 : 256;
        for (let g = h; g < p; g++)
          Be[g] = O;
        h = p - 1;
      } else u == 8 && f == 1 && (Be[h] = 1);
      c = u, u & 7 && (f = u);
    }
  }
}
function Gy(i, e, t, n, s) {
  let r = s == 1 ? 2 : 1;
  for (let o = 0, l = 0, a = 0; o <= n.length; o++) {
    let h = o ? n[o - 1].to : e, c = o < n.length ? n[o].from : t;
    for (let f = h, u, p, O; f < c; f++)
      if (p = Hh[u = i.charCodeAt(f)])
        if (p < 0) {
          for (let g = l - 3; g >= 0; g -= 3)
            if (Wi[g + 1] == -p) {
              let m = Wi[g + 2], v = m & 2 ? s : m & 4 ? m & 1 ? r : s : 0;
              v && (Be[f] = Be[Wi[g]] = v), l = g;
              break;
            }
        } else {
          if (Wi.length == 189)
            break;
          Wi[l++] = f, Wi[l++] = u, Wi[l++] = a;
        }
      else if ((O = Be[f]) == 2 || O == 1) {
        let g = O == s;
        a = g ? 0 : 1;
        for (let m = l - 3; m >= 0; m -= 3) {
          let v = Wi[m + 2];
          if (v & 2)
            break;
          if (g)
            Wi[m + 2] |= 2;
          else {
            if (v & 4)
              break;
            Wi[m + 2] |= 4;
          }
        }
      }
  }
}
function Uy(i, e, t, n) {
  for (let s = 0, r = n; s <= t.length; s++) {
    let o = s ? t[s - 1].to : i, l = s < t.length ? t[s].from : e;
    for (let a = o; a < l; ) {
      let h = Be[a];
      if (h == 256) {
        let c = a + 1;
        for (; ; )
          if (c == l) {
            if (s == t.length)
              break;
            c = t[s++].to, l = s < t.length ? t[s].from : e;
          } else if (Be[c] == 256)
            c++;
          else
            break;
        let f = r == 1, u = (c < e ? Be[c] : n) == 1, p = f == u ? f ? 1 : 2 : n;
        for (let O = c, g = s, m = g ? t[g - 1].to : i; O > a; )
          O == m && (O = t[--g].from, m = g ? t[g - 1].to : i), Be[--O] = p;
        a = c;
      } else
        r = h, a++;
    }
  }
}
function Kh(i, e, t, n, s, r, o) {
  let l = n % 2 ? 2 : 1;
  if (n % 2 == s % 2)
    for (let a = e, h = 0; a < t; ) {
      let c = !0, f = !1;
      if (h == r.length || a < r[h].from) {
        let g = Be[a];
        g != l && (c = !1, f = g == 16);
      }
      let u = !c && l == 1 ? [] : null, p = c ? n : n + 1, O = a;
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
                if (Be[m] == l)
                  break e;
                break;
              }
            }
          if (h++, u)
            u.push(g);
          else {
            g.from > a && o.push(new tn(a, g.from, p));
            let m = g.direction == ks != !(p % 2);
            Jh(i, m ? n + 1 : n, s, g.inner, g.from, g.to, o), a = g.to;
          }
          O = g.to;
        } else {
          if (O == t || (c ? Be[O] != l : Be[O] == l))
            break;
          O++;
        }
      u ? Kh(i, a, O, n + 1, s, u, o) : a < O && o.push(new tn(a, O, p)), a = O;
    }
  else
    for (let a = t, h = r.length; a > e; ) {
      let c = !0, f = !1;
      if (!h || a > r[h - 1].to) {
        let g = Be[a - 1];
        g != l && (c = !1, f = g == 16);
      }
      let u = !c && l == 1 ? [] : null, p = c ? n : n + 1, O = a;
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
                if (Be[m - 1] == l)
                  break e;
                break;
              }
            }
          if (u)
            u.push(g);
          else {
            g.to < a && o.push(new tn(g.to, a, p));
            let m = g.direction == ks != !(p % 2);
            Jh(i, m ? n + 1 : n, s, g.inner, g.from, g.to, o), a = g.from;
          }
          O = g.from;
        } else {
          if (O == e || (c ? Be[O - 1] != l : Be[O - 1] == l))
            break;
          O--;
        }
      u ? Kh(i, O, a, n + 1, s, u, o) : O < a && o.push(new tn(O, a, p)), a = O;
    }
}
function Jh(i, e, t, n, s, r, o) {
  let l = e % 2 ? 2 : 1;
  By(i, s, r, n, l), Gy(i, s, r, n, l), Uy(s, r, n, l), Kh(i, s, r, e, t, n, o);
}
function Fy(i, e, t) {
  if (!i)
    return [new tn(0, 0, e == Hc ? 1 : 0)];
  if (e == ks && !t.length && !Vy.test(i))
    return EO(i.length);
  if (t.length)
    for (; i.length > Be.length; )
      Be[Be.length] = 256;
  let n = [], s = e == ks ? 0 : 1;
  return Jh(i, s, s, t, 0, i.length, n), n;
}
function EO(i) {
  return [new tn(0, i, 0)];
}
let AO = "";
function Hy(i, e, t, n, s) {
  var r;
  let o = n.head - i.from, l = tn.find(e, o, (r = n.bidiLevel) !== null && r !== void 0 ? r : -1, n.assoc), a = e[l], h = a.side(s, t);
  if (o == h) {
    let u = l += s ? 1 : -1;
    if (u < 0 || u >= e.length)
      return null;
    a = e[l = u], o = a.side(!s, t), h = a.side(s, t);
  }
  let c = Rt(i.text, o, a.forward(s, t));
  (c < a.from || c > a.to) && (c = h), AO = i.text.slice(Math.min(o, c), Math.max(o, c));
  let f = l == (s ? e.length - 1 : 0) ? null : e[l + (s ? 1 : -1)];
  return f && c == h && f.level + (s ? 0 : 1) < a.level ? B.cursor(f.side(!s, t) + i.from, f.forward(s, t) ? 1 : -1, f.level) : B.cursor(c + i.from, a.forward(s, t) ? -1 : 1, a.level);
}
function Ky(i, e, t) {
  for (let n = e; n < t; n++) {
    let s = CO(i.charCodeAt(n));
    if (s == 1)
      return ks;
    if (s == 2 || s == 4)
      return Hc;
  }
  return ks;
}
const RO = /* @__PURE__ */ ge.define(), MO = /* @__PURE__ */ ge.define(), XO = /* @__PURE__ */ ge.define(), jO = /* @__PURE__ */ ge.define(), ec = /* @__PURE__ */ ge.define(), LO = /* @__PURE__ */ ge.define(), IO = /* @__PURE__ */ ge.define(), Kc = /* @__PURE__ */ ge.define(), Jc = /* @__PURE__ */ ge.define(), DO = /* @__PURE__ */ ge.define({
  combine: (i) => i.some((e) => e)
}), Jy = /* @__PURE__ */ ge.define({
  combine: (i) => i.some((e) => e)
}), zO = /* @__PURE__ */ ge.define();
class Bs {
  constructor(e, t, n, s, r, o = !1) {
    this.range = e, this.y = t, this.x = n, this.yMargin = s, this.xMargin = r, this.isSnapshot = o;
  }
  map(e) {
    return e.empty ? this : new Bs(this.range.map(e), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
  clip(e) {
    return this.range.to <= e.doc.length ? this : new Bs(B.cursor(e.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
}
const Yo = /* @__PURE__ */ Ve.define({ map: (i, e) => i.map(e) }), NO = /* @__PURE__ */ Ve.define();
function ai(i, e, t) {
  let n = i.facet(jO);
  n.length ? n[0](e) : window.onerror && window.onerror(String(e), t, void 0, void 0, e) || (t ? console.error(t + ":", e) : console.error(e));
}
const vn = /* @__PURE__ */ ge.define({ combine: (i) => i.length ? i[0] : !0 });
let ew = 0;
const Ls = /* @__PURE__ */ ge.define({
  combine(i) {
    return i.filter((e, t) => {
      for (let n = 0; n < t; n++)
        if (i[n].plugin == e.plugin)
          return !1;
      return !0;
    });
  }
});
class an {
  constructor(e, t, n, s, r) {
    this.id = e, this.create = t, this.domEventHandlers = n, this.domEventObservers = s, this.baseExtensions = r(this), this.extension = this.baseExtensions.concat(Ls.of({ plugin: this, arg: void 0 }));
  }
  /**
  Create an extension for this plugin with the given argument.
  */
  of(e) {
    return this.baseExtensions.concat(Ls.of({ plugin: this, arg: e }));
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(e, t) {
    const { eventHandlers: n, eventObservers: s, provide: r, decorations: o } = t || {};
    return new an(ew++, e, n, s, (l) => {
      let a = [];
      return o && a.push(ca.of((h) => {
        let c = h.plugin(l);
        return c ? o(c) : Ge.none;
      })), r && a.push(r(l)), a;
    });
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(e, t) {
    return an.define((n, s) => new e(n, s), t);
  }
}
class Ya {
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
            if (ai(t.state, n, "CodeMirror plugin crashed"), this.value.destroy)
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
        ai(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(e) {
    var t;
    if (!((t = this.value) === null || t === void 0) && t.destroy)
      try {
        this.value.destroy();
      } catch (n) {
        ai(e.state, n, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const YO = /* @__PURE__ */ ge.define(), ef = /* @__PURE__ */ ge.define(), ca = /* @__PURE__ */ ge.define(), WO = /* @__PURE__ */ ge.define(), tf = /* @__PURE__ */ ge.define(), Zo = /* @__PURE__ */ ge.define(), qO = /* @__PURE__ */ ge.define();
function wu(i, e) {
  let t = i.state.facet(qO);
  if (!t.length)
    return t;
  let n = t.map((r) => r instanceof Function ? r(i) : r), s = [];
  return Ye.spans(n, e.from, e.to, {
    point() {
    },
    span(r, o, l, a) {
      let h = r - e.from, c = o - e.from, f = s;
      for (let u = l.length - 1; u >= 0; u--, a--) {
        let p = l[u].spec.bidiIsolate, O;
        if (p == null && (p = Ky(e.text, h, c)), a > 0 && f.length && (O = f[f.length - 1]).to == h && O.direction == p)
          O.to = c, f = O.inner;
        else {
          let g = { from: h, to: c, direction: p, inner: [] };
          f.push(g), f = g.inner;
        }
      }
    }
  }), s;
}
const VO = /* @__PURE__ */ ge.define();
function nf(i) {
  let e = 0, t = 0, n = 0, s = 0;
  for (let r of i.state.facet(VO)) {
    let o = r(i);
    o && (o.left != null && (e = Math.max(e, o.left)), o.right != null && (t = Math.max(t, o.right)), o.top != null && (n = Math.max(n, o.top)), o.bottom != null && (s = Math.max(s, o.bottom)));
  }
  return { left: e, right: t, top: n, bottom: s };
}
const Dr = /* @__PURE__ */ ge.define();
class mi {
  constructor(e, t, n, s) {
    this.fromA = e, this.toA = t, this.fromB = n, this.toB = s;
  }
  join(e) {
    return new mi(Math.min(this.fromA, e.fromA), Math.max(this.toA, e.toA), Math.min(this.fromB, e.fromB), Math.max(this.toB, e.toB));
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
      let c = h + o, f = h, u = c;
      for (; ; )
        if (r < t.length && t[r] <= f) {
          let p = t[r + 1];
          r += 2, f = Math.max(f, p);
          for (let O = s; O < e.length && e[O].fromB <= f; O++)
            o = e[O].toA - e[O].toB;
          u = Math.max(u, p + o);
        } else if (s < e.length && e[s].fromB <= f) {
          let p = e[s++];
          f = Math.max(f, p.toB), u = Math.max(u, p.toA), o = p.toA - p.toB;
        } else
          break;
      n.push(new mi(c, u, h, f));
    }
    return n;
  }
}
class Cl {
  constructor(e, t, n) {
    this.view = e, this.state = t, this.transactions = n, this.flags = 0, this.startState = e.state, this.changes = xt.empty(this.startState.doc.length);
    for (let r of n)
      this.changes = this.changes.compose(r.changes);
    let s = [];
    this.changes.iterChangedRanges((r, o, l, a) => s.push(new mi(r, o, l, a))), this.changedRanges = s;
  }
  /**
  @internal
  */
  static create(e, t, n) {
    return new Cl(e, t, n);
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
const tw = [];
class ut {
  constructor(e, t, n = 0) {
    this.dom = e, this.length = t, this.flags = n, this.parent = null, e.cmTile = this;
  }
  get breakAfter() {
    return this.flags & 1;
  }
  get children() {
    return tw;
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
      t && Xy(this.dom, t);
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
    let n = Bn(this.dom), s = this.length ? e > 0 : t > 0;
    return new Mi(this.parent.dom, n + (s ? 1 : 0), e == 0 || e == this.length);
  }
  markDirty(e) {
    this.flags &= -3, e && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(!1);
  }
  get overrideDOMText() {
    return null;
  }
  get root() {
    for (let e = this; e; e = e.parent)
      if (e instanceof ua)
        return e;
    return null;
  }
  static get(e) {
    return e.cmTile;
  }
}
class fa extends ut {
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
          s = xu(s);
      else
        t.insertBefore(l.dom, s);
      n = l.dom;
    }
    for (s = n ? n.nextSibling : t.firstChild, r && s && (r.written = !0); s; )
      s = xu(s);
    this.length = o;
  }
}
function xu(i) {
  let e = i.nextSibling;
  return i.parentNode.removeChild(i), e;
}
class ua extends fa {
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
      let t = ut.get(e);
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
        if (o instanceof xn)
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
class xn extends fa {
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
    let n = new xn(t || document.createElement(e.tagName), e);
    return t || (n.flags |= 4), n;
  }
}
class dr extends fa {
  constructor(e, t) {
    super(e), this.attrs = t;
  }
  isLine() {
    return !0;
  }
  static start(e, t, n) {
    let s = new dr(t || document.createElement("div"), e);
    return (!t || !n) && (s.flags |= 4), s;
  }
  get domAttrs() {
    return this.attrs;
  }
  // Find the tile associated with a given position in this line.
  resolveInline(e, t, n) {
    let s = null, r = -1, o = null, l = -1;
    function a(c, f) {
      for (let u = 0, p = 0; u < c.children.length && p <= f; u++) {
        let O = c.children[u], g = p + O.length;
        g >= f && (O.isComposite() ? a(O, f - p) : (!o || o.isHidden && (t > 0 && !(o.flags & 32) || n && nw(o, O))) && (g > f || O.flags & 32) ? (o = O, l = f - p) : (p < f || O.flags & 16 && !O.isHidden) && (s = O, r = f - p)), p = g;
      }
    }
    a(this, e);
    let h = (t < 0 ? s : o) || s || o;
    return h ? { tile: h, offset: h == s ? r : l } : null;
  }
  coordsIn(e, t, n) {
    let s = this.resolveInline(e, t, !0);
    return s ? s.tile.coordsIn(Math.max(0, s.offset), t, n) : iw(this);
  }
  domIn(e, t) {
    let n = this.resolveInline(e, t);
    if (n) {
      let { tile: s, offset: r } = n;
      if (this.dom.contains(s.dom))
        return s.isText() ? new Mi(s.dom, Math.min(s.dom.nodeValue.length, r)) : s.domPosFor(r, s.flags & 16 ? 1 : s.flags & 32 ? -1 : t);
      let o = n.tile.parent, l = !1;
      for (let a of o.children) {
        if (l)
          return new Mi(a.dom, 0);
        a == n.tile && (l = !0);
      }
    }
    return new Mi(this.dom, 0);
  }
}
function iw(i) {
  let e = i.dom.lastChild;
  if (!e)
    return i.dom.getBoundingClientRect();
  let t = Kr(e);
  return t[t.length - 1] || null;
}
function nw(i, e) {
  let t = i.coordsIn(0, 1), n = e.coordsIn(0, 1);
  return t && n && n.top < t.bottom;
}
class Ut extends fa {
  constructor(e, t) {
    super(e), this.mark = t;
  }
  get domAttrs() {
    return this.mark.attrs;
  }
  static of(e, t) {
    let n = new Ut(t || document.createElement(e.tagName), e);
    return t || (n.flags |= 4), n;
  }
}
class ns extends ut {
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
    let a = uo(this.dom, r, o).getClientRects();
    if (!a.length)
      return null;
    let h = a[(l ? l < 0 : t >= 0) ? 0 : a.length - 1];
    return re.safari && !l && h.width == 0 && (h = Array.prototype.find.call(a, (c) => c.width) || h), n == null ? h : fo(h, (l ? l > 0 : t < 0) == n);
  }
  static of(e, t) {
    let n = new ns(t || document.createTextNode(e), e);
    return t || (n.flags |= 2), n;
  }
}
class Qs extends ut {
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
      return fo(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0);
    {
      let r = this.dom.getClientRects(), o = null;
      if (!r.length)
        return null;
      let l = this.flags & 16 ? !0 : this.flags & 32 ? !1 : e > 0;
      for (let a = l ? r.length - 1 : 0; o = r[a], !(e > 0 ? a == 0 : a == r.length - 1 || o.top < o.bottom); a += l ? -1 : 1)
        ;
      return fo(o, !l);
    }
  }
  get overrideDOMText() {
    if (!this.length)
      return je.empty;
    let { root: e } = this;
    if (!e)
      return je.empty;
    let t = this.posAtStart;
    return e.view.state.doc.slice(t, t + this.length);
  }
  destroy() {
    super.destroy(), this.widget.destroy(this.dom);
  }
  static of(e, t, n, s, r) {
    return r || (r = e.toDOM(t), e.editable || (r.contentEditable = "false")), new Qs(r, n, e, s);
  }
}
class Zl extends ut {
  constructor(e) {
    let t = document.createElement("img");
    t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), super(t, 0, e);
  }
  get isHidden() {
    return !0;
  }
  get overrideDOMText() {
    return je.empty;
  }
  coordsIn(e, t, n) {
    let s = this.dom.getBoundingClientRect();
    return n == null ? s : fo(s, t > 0 == n);
  }
}
class sw {
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
class rw {
  constructor(e, t, n, s) {
    this.from = e, this.to = t, this.wrapper = n, this.rank = s;
  }
}
class ow {
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
      let a = o.children[o.children.length - 1] = new ns(l.dom, l.text + e);
      a.parent = o;
    } else
      o.append(s || ns.of(e, (r = this.cache.find(ns)) === null || r === void 0 ? void 0 : r.dom));
    this.pos += e.length, this.afterWidget = null;
  }
  addComposition(e, t) {
    let n = this.curLine;
    n.dom != t.line.dom && (n.setDOM(this.cache.reused.has(t.line) ? Wa(t.line.dom) : t.line.dom), this.cache.reused.set(
      t.line,
      2
      /* Reused.DOM */
    ));
    let s = n;
    for (let l = t.marks.length - 1; l >= 0; l--) {
      let a = t.marks[l], h = s.lastChild;
      if (h instanceof Ut && h.mark.eq(a.mark))
        h.dom != a.dom && h.setDOM(Wa(a.dom)), s = h;
      else {
        if (this.cache.reused.get(a)) {
          let f = ut.get(a.dom);
          f && f.setDOM(Wa(a.dom));
        }
        let c = Ut.of(a.mark, a.dom);
        s.append(c), s = c;
      }
      this.cache.reused.set(
        a,
        2
        /* Reused.DOM */
      );
    }
    let r = ut.get(e.text);
    r && this.cache.reused.set(
      r,
      2
      /* Reused.DOM */
    );
    let o = new ns(e.text, e.text.nodeValue);
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
    e || (e = BO);
    let s = dr.start(e, t || ((n = this.cache.find(dr)) === null || n === void 0 ? void 0 : n.dom), !!t);
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
      if (t > 0 && (l = s.lastChild) && l instanceof Ut && l.mark.eq(o))
        s = l, t--;
      else {
        let a = Ut.of(o, (n = this.cache.find(Ut, (h) => h.mark.eq(o))) === null || n === void 0 ? void 0 : n.dom);
        s.append(a), s = a, t = 0;
      }
    }
    return s;
  }
  endLine() {
    if (this.curLine) {
      this.flushBuffer();
      let e = this.curLine.lastChild;
      (!e || !Su(this.curLine, !1) || e.dom.nodeName != "BR" && e.isWidget() && !(re.ios && Su(this.curLine, !0))) && this.curLine.append(this.cache.findWidget(
        qa,
        0,
        32
        /* TileFlag.After */
      ) || new Qs(
        qa.toDOM(),
        0,
        qa,
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
        let t = e.rank * 102 + e.value.rank, n = new rw(e.from, e.to, e.value, t), s = this.wrappers.length;
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
      if (n.from < this.pos && s instanceof xn && s.wrapper.eq(n.wrapper))
        t = s;
      else {
        let r = xn.of(n.wrapper, (e = this.cache.find(xn, (o) => o.wrapper.eq(n.wrapper))) === null || e === void 0 ? void 0 : e.dom);
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
      Zl,
      void 0,
      1
      /* Reused.Full */
    );
    return n && (n.flags = t), n || new Zl(t);
  }
  flushBuffer() {
    this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
  }
}
class lw {
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
const El = [Qs, dr, ns, Ut, Zl, xn, ua];
for (let i = 0; i < El.length; i++)
  El[i].bucket = i;
class aw {
  constructor(e) {
    this.view = e, this.buckets = El.map(() => []), this.index = El.map(() => 0), this.reused = /* @__PURE__ */ new Map();
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
          ), new Qs(l.dom, t, e, l.flags & -498 | n));
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
class hw {
  constructor(e, t, n, s, r) {
    this.view = e, this.decorations = s, this.disallowBlockEffectsFor = r, this.openWidget = !1, this.openMarks = 0, this.cache = new aw(e), this.text = new lw(e.state.doc), this.builder = new ow(this.cache, new ua(e, e.contentDOM), Ye.iter(n)), this.cache.reused.set(
      t,
      2
      /* Reused.DOM */
    ), this.old = new sw(t), this.reuseWalker = {
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
    let s = uw(this.old), r = this.openMarks;
    this.old.advance(e, n ? 1 : -1, {
      skip: (o, l, a) => {
        if (o.isWidget())
          if (this.openWidget)
            this.builder.continueWidget(a - l);
          else {
            let h = a > 0 || l < o.length ? Qs.of(o.widget, this.view, a - l, o.flags & 496, this.cache.maybeReuse(o)) : this.cache.reuse(o);
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
        else if (o instanceof Zl)
          this.cache.add(o);
        else if (o instanceof Ut)
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
        o.isLine() ? this.builder.addLineStart(o.attrs, this.cache.maybeReuse(o)) : (this.cache.add(o), o instanceof Ut && s.unshift(o.mark)), this.openWidget = !1;
      },
      leave: (o) => {
        o.isLine() ? s.length && (s.length = r = 0) : o instanceof Ut && (s.shift(), r = Math.min(r, s.length));
      },
      break: () => {
        this.builder.addBreak(), this.openWidget = !1;
      }
    }), this.text.skip(e);
  }
  emit(e, t) {
    let n = null, s = this.builder, r = -1, o = Ye.spans(this.decorations, e, t, {
      point: (l, a, h, c, f, u) => {
        if (h instanceof Ss) {
          if (this.disallowBlockEffectsFor[u]) {
            if (h.block)
              throw new RangeError("Block decorations may not be specified via plugins");
            if (a > this.view.state.doc.lineAt(l).to)
              throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
          }
          if (r = c.length, f > c.length)
            s.continueWidget(a - l);
          else {
            let p = h.widget || (h.block ? pr.block : pr.inline), O = cw(h), g = this.cache.findWidget(p, a - l, O) || Qs.of(p, this.view, a - l, O);
            h.block ? (h.startSide > 0 && s.addLineStartIfNotCovered(n), s.addBlockWidget(g)) : (s.ensureLine(n), s.addInlineWidget(g, c, f));
          }
          n = null;
        } else
          n = fw(n, h);
        a > l && this.text.skip(a - l);
      },
      span: (l, a, h, c) => {
        for (let f = l; f < a; ) {
          let u = this.text.next(Math.min(512, a - f));
          u == null ? (s.addLineStartIfNotCovered(n), s.addBreak(), f++) : (s.ensureLine(n), s.addText(u, h, f == l ? c : h.length), f += u.length), n = null;
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
      let r = ut.get(s);
      if (s == this.view.contentDOM)
        break;
      r instanceof Ut ? t.push(r) : r != null && r.isLine() ? n = r : r instanceof xn || (s.nodeName == "DIV" && !n && s != this.view.contentDOM ? n = new dr(s, BO) : n || t.push(Ut.of(new To({ tagName: s.nodeName.toLowerCase(), attributes: jy(s) }), s)));
    }
    return { line: n, marks: t };
  }
}
function Su(i, e) {
  let t = (n) => {
    for (let s of n.children)
      if ((e ? s.isText() : s.length) || t(s))
        return !0;
    return !1;
  };
  return t(i);
}
function cw(i) {
  let e = i.isReplace ? (i.startSide < 0 ? 64 : 0) | (i.endSide > 0 ? 128 : 0) : i.startSide > 0 ? 32 : 16;
  return i.block && (e |= 256), e;
}
const BO = { class: "cm-line" };
function fw(i, e) {
  let t = e.spec.attributes, n = e.spec.class;
  return !t && !n || (i || (i = { class: "cm-line" }), t && Uc(t, i), n && (i.class += " " + n)), i;
}
function uw(i) {
  let e = [];
  for (let t = i.parents.length; t > 1; t--) {
    let n = t == i.parents.length ? i.tile : i.parents[t].tile;
    n instanceof Ut && e.push(n.mark);
  }
  return e;
}
function Wa(i) {
  let e = ut.get(i);
  return e && e.setDOM(i.cloneNode()), i;
}
class pr extends Sr {
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
pr.inline = /* @__PURE__ */ new pr("span");
pr.block = /* @__PURE__ */ new pr("div");
const qa = /* @__PURE__ */ new class extends Sr {
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
class ku {
  constructor(e) {
    this.view = e, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = Ge.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new ua(e, e.contentDOM), this.updateInner([new mi(0, 0, 0, e.state.doc.length)], null);
  }
  // Update the document view to a given state.
  update(e) {
    var t;
    let n = e.changedRanges;
    this.minWidth > 0 && n.length && (n.every(({ fromA: c, toA: f }) => f < this.minWidthFrom || c > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
    let s = -1;
    this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((t = this.domChanged) === null || t === void 0) && t.newSel ? s = this.domChanged.newSel.head : !ww(e.changes, this.hasComposition) && !e.selectionSet && (s = e.state.selection.main.head));
    let r = s > -1 ? pw(this.view, e.changes, s) : null;
    if (this.domChanged = null, this.hasComposition) {
      let { from: c, to: f } = this.hasComposition;
      n = new mi(c, f, e.changes.mapPos(c, -1), e.changes.mapPos(f, 1)).addToSet(n.slice());
    }
    this.hasComposition = r ? { from: r.range.fromB, to: r.range.toB } : null, (re.ie || re.chrome) && !r && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
    let o = this.decorations, l = this.blockWrappers;
    this.updateDeco();
    let a = mw(o, this.decorations, e.changes);
    a.length && (n = mi.extendWithRanges(n, a));
    let h = bw(l, this.blockWrappers, e.changes);
    return h.length && (n = mi.extendWithRanges(n, h)), r && !n.some((c) => c.fromA <= r.range.fromA && c.toA >= r.range.toA) && (n = r.range.addToSet(n.slice())), this.tile.flags & 2 && n.length == 0 ? !1 : (this.updateInner(n, r), e.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(e, t) {
    this.view.viewState.mustMeasureContent = !0;
    let { observer: n } = this.view;
    n.ignore(() => {
      if (t || e.length) {
        let o = this.tile, l = new hw(this.view, o, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
        t && ut.get(t.text) && l.cache.reused.set(
          ut.get(t.text),
          2
          /* Reused.DOM */
        ), this.tile = l.run(e, t), tc(o, l.cache.reused);
      }
      this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let r = re.chrome || re.ios ? { node: n.selectionRange.focusNode, written: !1 } : void 0;
      this.tile.sync(r), r && (r.written || n.selectionRange.focusNode != r.node || !this.tile.dom.contains(r.node)) && (this.forceSelection = !0), this.tile.dom.style.height = "";
    });
    let s = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let r of this.tile.children)
        r.isWidget() && r.widget instanceof Va && s.push(r.dom);
    n.updateGaps(s);
  }
  updateEditContextFormatting(e) {
    this.editContextFormatting = this.editContextFormatting.map(e.changes);
    for (let t of e.transactions)
      for (let n of t.effects)
        n.is(NO) && (this.editContextFormatting = n.value);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(e = !1, t = !1) {
    (e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let { dom: n } = this.tile, s = this.view.root.activeElement, r = s == n, o = !r && !(this.view.state.facet(vn) || n.tabIndex > -1) && Hr(n, this.view.observer.selectionRange) && !(s && n.contains(s));
    if (!(r || t || o))
      return;
    let l = this.forceSelection;
    this.forceSelection = !1;
    let a = this.view.state.selection.main, h, c;
    if (a.empty ? c = h = this.inlineDOMNearPos(a.anchor, a.assoc || 1) : (c = this.inlineDOMNearPos(a.head, a.head == a.from ? 1 : -1), h = this.inlineDOMNearPos(a.anchor, a.anchor == a.from ? 1 : -1)), re.gecko && a.empty && !this.hasComposition && dw(h)) {
      let u = document.createTextNode("");
      this.view.observer.ignore(() => h.node.insertBefore(u, h.node.childNodes[h.offset] || null)), h = c = new Mi(u, 0), l = !0;
    }
    let f = this.view.observer.selectionRange;
    (l || !f.focusNode || (!Jr(h.node, h.offset, f.anchorNode, f.anchorOffset) || !Jr(c.node, c.offset, f.focusNode, f.focusOffset)) && !this.suppressWidgetCursorChange(f, a)) && (this.view.observer.ignore(() => {
      re.android && re.chrome && n.contains(f.focusNode) && yw(f.focusNode, n) && (n.blur(), n.focus({ preventScroll: !0 }));
      let u = co(this.view.root);
      if (u) if (a.empty) {
        if (re.gecko) {
          let p = Ow(h.node, h.offset);
          if (p && p != 3) {
            let O = (p == 1 ? _O : PO)(h.node, h.offset);
            O && (h = new Mi(O.node, O.offset));
          }
        }
        u.collapse(h.node, h.offset), a.bidiLevel != null && u.caretBidiLevel !== void 0 && (u.caretBidiLevel = a.bidiLevel);
      } else if (u.extend) {
        u.collapse(h.node, h.offset);
        try {
          u.extend(c.node, c.offset);
        } catch {
        }
      } else {
        let p = document.createRange();
        a.anchor > a.head && ([h, c] = [c, h]), p.setEnd(c.node, c.offset), p.setStart(h.node, h.offset), u.removeAllRanges(), u.addRange(p);
      }
      o && this.view.root.activeElement == n && (n.blur(), s && s.focus());
    }), this.view.observer.setSelectionRange(h, c)), this.impreciseAnchor = h.precise ? null : new Mi(f.anchorNode, f.anchorOffset), this.impreciseHead = c.precise ? null : new Mi(f.focusNode, f.focusOffset);
  }
  // If a zero-length widget is inserted next to the cursor during
  // composition, avoid moving it across it and disrupting the
  // composition.
  suppressWidgetCursorChange(e, t) {
    return this.hasComposition && t.empty && Jr(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: e } = this, t = e.state.selection.main, n = co(e.root), { anchorNode: s, anchorOffset: r } = e.observer.selectionRange;
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
        let o = kn(e) == 0 ? 0 : t == 0 ? -1 : 1;
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
      for (; r && !ut.get(r); )
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
    return s.isWidget() ? s.widget instanceof Va ? null : s.coordsInWidget(r, t, !0) : s.coordsIn(r, t, n);
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
        let l = Rt(r.text, o);
        if (l == o)
          return null;
        let a = uo(r.dom, o, l).getClientRects();
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
    let t = [], { from: n, to: s } = e, r = this.view.contentDOM.clientWidth, o = r > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, l = -1, a = this.view.textDirection == ft.LTR, h = 0, c = (f, u, p) => {
      for (let O = 0; O < f.children.length && !(u > s); O++) {
        let g = f.children[O], m = u + g.length, v = g.dom.getBoundingClientRect(), { height: S } = v;
        if (p && !O && (h += v.top - p.top), g instanceof xn)
          m > n && c(g, u, v);
        else if (u >= n && (h > 0 && t.push(-h), t.push(S + h), h = 0, o)) {
          let x = g.dom.lastChild, P = x ? Kr(x) : [];
          if (P.length) {
            let E = P[P.length - 1], R = a ? E.right - v.left : v.right - E.left;
            R > l && (l = R, this.minWidth = r, this.minWidthFrom = u, this.minWidthTo = m);
          }
        }
        p && O == f.children.length - 1 && (h += p.bottom - v.bottom), u = m + g.breakAfter;
      }
    };
    return c(this.tile, 0, null), t;
  }
  textDirectionAt(e) {
    let { tile: t } = this.tile.resolveBlock(e, 1);
    return getComputedStyle(t.dom).direction == "rtl" ? ft.RTL : ft.LTR;
  }
  measureTextSize() {
    let e = this.tile.blockTiles((o) => {
      if (o.isLine() && o.children.length && o.length <= 20) {
        let l = 0, a;
        for (let h of o.children) {
          if (!h.isText() || /[^ -~]/.test(h.text))
            return;
          let c = Kr(h.dom);
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
      let o = Kr(t.firstChild)[0];
      n = t.getBoundingClientRect().height, s = o && o.width ? o.width / 27 : 7, r = o && o.height ? o.height : n, t.remove();
    }), { lineHeight: n, charWidth: s, textHeight: r };
  }
  computeBlockGapDeco() {
    let e = [], t = this.view.viewState;
    for (let n = 0, s = 0; ; s++) {
      let r = s == t.viewports.length ? null : t.viewports[s], o = r ? r.from - 1 : this.view.state.doc.length;
      if (o > n) {
        let l = (t.lineBlockAt(o).bottom - t.lineBlockAt(n).top) / this.view.scaleY;
        e.push(Ge.replace({
          widget: new Va(l),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(n, o));
      }
      if (!r)
        break;
      n = r.to + 1;
    }
    return Ge.set(e);
  }
  updateDeco() {
    let e = 1, t = this.view.state.facet(ca).map((r) => (this.dynamicDecorationMap[e++] = typeof r == "function") ? r(this.view) : r), n = !1, s = this.view.state.facet(tf).map((r, o) => {
      let l = typeof r == "function";
      return l && (n = !0), l ? r(this.view) : r;
    });
    for (s.length && (this.dynamicDecorationMap[e++] = n, t.push(Ye.join(s))), this.decorations = [
      this.editContextFormatting,
      ...t,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ]; e < this.decorations.length; )
      this.dynamicDecorationMap[e++] = !1;
    this.blockWrappers = this.view.state.facet(WO).map((r) => typeof r == "function" ? r(this.view) : r);
  }
  scrollIntoView(e) {
    if (e.isSnapshot) {
      let h = this.view.viewState.lineBlockAt(e.range.head);
      this.view.scrollDOM.scrollTop = h.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
      return;
    }
    for (let h of this.view.state.facet(zO))
      try {
        if (h(this.view, e.range, e))
          return !0;
      } catch (c) {
        ai(this.view.state, c, "scroll handler");
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
    let r = nf(this.view), o = {
      left: n.left - r.left,
      top: n.top - r.top,
      right: n.right + r.right,
      bottom: n.bottom + r.bottom
    }, { offsetWidth: l, offsetHeight: a } = this.view.scrollDOM;
    if (Dy(this.view.scrollDOM, o, t.head < t.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, l), -l), Math.max(Math.min(e.yMargin, a), -a), this.view.textDirection == ft.LTR), window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (n.top > window.pageYOffset + window.visualViewport.offsetTop + window.visualViewport.height || n.bottom < window.pageYOffset + window.visualViewport.offsetTop)) {
      let h = this.view.docView.lineAt(t.head, 1);
      h && h.dom.scrollIntoView({ block: "nearest" });
    }
  }
  lineHasWidget(e) {
    let t = (n) => n.isWidget() || n.children.some(t);
    return t(this.tile.resolveBlock(e, 1).tile);
  }
  destroy() {
    tc(this.tile);
  }
}
function tc(i, e) {
  let t = e == null ? void 0 : e.get(i);
  if (t != 1) {
    t == null && i.destroy();
    for (let n of i.children)
      tc(n, e);
  }
}
function dw(i) {
  return i.node.nodeType == 1 && i.node.firstChild && (i.offset == 0 || i.node.childNodes[i.offset - 1].contentEditable == "false") && (i.offset == i.node.childNodes.length || i.node.childNodes[i.offset].contentEditable == "false");
}
function GO(i, e) {
  let t = i.observer.selectionRange;
  if (!t.focusNode)
    return null;
  let n = _O(t.focusNode, t.focusOffset), s = PO(t.focusNode, t.focusOffset), r = n || s;
  if (s && n && s.node != n.node) {
    let l = ut.get(s.node);
    if (!l || l.isText() && l.text != s.node.nodeValue)
      r = s;
    else if (i.docView.lastCompositionAfterCursor) {
      let a = ut.get(n.node);
      !a || a.isText() && a.text != n.node.nodeValue || (r = s);
    }
  }
  if (i.docView.lastCompositionAfterCursor = r != n, !r)
    return null;
  let o = e - r.offset;
  return { from: o, to: o + r.node.nodeValue.length, node: r.node };
}
function pw(i, e, t) {
  let n = GO(i, t);
  if (!n)
    return null;
  let { node: s, from: r, to: o } = n, l = s.nodeValue;
  if (/[\n\r]/.test(l) || i.state.doc.sliceString(n.from, n.to) != l)
    return null;
  let a = e.invertedDesc;
  return { range: new mi(a.mapPos(r), a.mapPos(o), r, o), text: s };
}
function Ow(i, e) {
  return i.nodeType != 1 ? 0 : (e && i.childNodes[e - 1].contentEditable == "false" ? 1 : 0) | (e < i.childNodes.length && i.childNodes[e].contentEditable == "false" ? 2 : 0);
}
let gw = class {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    qs(e, t, this.changes);
  }
  comparePoint(e, t) {
    qs(e, t, this.changes);
  }
  boundChange(e) {
    qs(e, e, this.changes);
  }
};
function mw(i, e, t) {
  let n = new gw();
  return Ye.compare(i, e, t, n), n.changes;
}
class vw {
  constructor() {
    this.changes = [];
  }
  compareRange(e, t) {
    qs(e, t, this.changes);
  }
  comparePoint() {
  }
  boundChange(e) {
    qs(e, e, this.changes);
  }
}
function bw(i, e, t) {
  let n = new vw();
  return Ye.compare(i, e, t, n), n.changes;
}
function yw(i, e) {
  for (let t = i; t && t != e; t = t.assignedSlot || t.parentNode)
    if (t.nodeType == 1 && t.contentEditable == "false")
      return !0;
  return !1;
}
function ww(i, e) {
  let t = !1;
  return e && i.iterChangedRanges((n, s) => {
    n < e.to && s > e.from && (t = !0);
  }), t;
}
class Va extends Sr {
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
function xw(i, e, t = 1) {
  let n = i.charCategorizer(e), s = i.doc.lineAt(e), r = e - s.from;
  if (s.length == 0)
    return B.cursor(e);
  r == 0 ? t = 1 : r == s.length && (t = -1);
  let o = r, l = r;
  t < 0 ? o = Rt(s.text, r, !1) : l = Rt(s.text, r);
  let a = n(s.text.slice(o, l));
  for (; o > 0; ) {
    let h = Rt(s.text, o, !1);
    if (n(s.text.slice(h, o)) != a)
      break;
    o = h;
  }
  for (; l < s.length; ) {
    let h = Rt(s.text, l);
    if (n(s.text.slice(l, h)) != a)
      break;
    l = h;
  }
  return B.undirectionalRange(o + s.from, l + s.from);
}
function Sw(i, e, t, n, s) {
  let r = Math.round((n - e.left) * i.defaultCharacterWidth);
  if (i.lineWrapping && t.height > i.defaultLineHeight * 1.5) {
    let l = i.viewState.heightOracle.textHeight, a = Math.floor((s - t.top - (i.defaultLineHeight - l) * 0.5) / l);
    r += a * i.viewState.heightOracle.lineLength;
  }
  let o = i.state.sliceDoc(t.from, t.to);
  return t.from + Zy(o, r, i.state.tabSize);
}
function kw(i, e, t) {
  let n = i.lineBlockAt(e);
  if (Array.isArray(n.type)) {
    let s;
    for (let r of n.type) {
      if (r.from > e)
        break;
      if (!(r.to < e)) {
        if (r.from < e && r.to > e)
          return r;
        (!s || r.type == Si.Text && (s.type != r.type || (t < 0 ? r.from < e : r.to > e))) && (s = r);
      }
    }
    return s || n;
  }
  return n;
}
function Qw(i, e, t, n) {
  let s = kw(i, e.head, e.assoc || -1), r = !n || s.type != Si.Text || !(i.lineWrapping || s.widgetLineBreaks) ? null : i.coordsAtPos(e.assoc < 0 && e.head > s.from ? e.head - 1 : e.head);
  if (r) {
    let o = i.dom.getBoundingClientRect(), l = i.textDirectionAt(s.from), a = i.posAtCoords({
      x: t == (l == ft.LTR) ? o.right - 1 : o.left + 1,
      y: (r.top + r.bottom) / 2
    });
    if (a != null)
      return B.cursor(a, t ? -1 : 1);
  }
  return B.cursor(t ? s.to : s.from, t ? -1 : 1);
}
function Qu(i, e, t, n) {
  let s = i.state.doc.lineAt(e.head), r = i.bidiSpans(s), o = i.textDirectionAt(s.from);
  for (let l = e, a = null; ; ) {
    let h = Hy(s, r, o, l, t), c = AO;
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
function $w(i, e, t) {
  let n = i.state.charCategorizer(e), s = n(t);
  return (r) => {
    let o = n(r);
    return s == bn.Space && (s = o), s == o;
  };
}
function _w(i, e, t, n) {
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
  let f = a.left + o, u = i.viewState.heightOracle.textHeight >> 1, p = n ?? u;
  for (let O = 0; ; O += u) {
    let g = l + (p + O) * r, m = ic(i, { x: f, y: g }, !1, r);
    if (t ? g > a.bottom : g < a.top)
      return B.cursor(m.pos, m.assoc);
    let v = i.coordsAtPos(m.pos, m.assoc), S = v ? (v.top + v.bottom) / 2 : 0;
    if (!v || (t ? S > l : S < l))
      return B.cursor(m.pos, m.assoc, void 0, o);
  }
}
function eo(i, e, t) {
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
function UO(i, e) {
  let t = null;
  for (let n = 0; n < e.ranges.length; n++) {
    let s = e.ranges[n], r = null;
    if (s.empty) {
      let o = eo(i, s.from, 0);
      o != s.from && (r = B.cursor(o, -1));
    } else {
      let o = eo(i, s.from, -1), l = eo(i, s.to, 1);
      (o != s.from || l != s.to) && (s.undirectional ? r = B.undirectionalRange(s.from, s.to) : r = B.range(s.from == s.anchor ? o : l, s.from == s.head ? o : l));
    }
    r && (t || (t = e.ranges.slice()), t[n] = r);
  }
  return t ? B.create(t, e.mainIndex) : e;
}
function Ba(i, e, t) {
  let n = eo(i.state.facet(Zo).map((s) => s(i)), t.from, e.head > t.from ? -1 : 1);
  return n == t.from ? t : B.cursor(n, n < t.from ? 1 : -1);
}
class Ki {
  constructor(e, t) {
    this.pos = e, this.assoc = t;
  }
}
function ic(i, e, t, n) {
  let s = i.contentDOM.getBoundingClientRect(), r = s.top + i.viewState.paddingTop, { x: o, y: l } = e, a = l - r, h;
  for (; ; ) {
    if (a < 0)
      return new Ki(0, 1);
    if (a > i.viewState.docHeight)
      return new Ki(i.state.doc.length, -1);
    if (h = i.elementAtHeight(a), n == null)
      break;
    if (h.type == Si.Text) {
      if (n < 0 ? h.to < i.viewport.from : h.from > i.viewport.to)
        break;
      let u = i.docView.coordsAt(n < 0 ? h.from : h.to, n > 0 ? -1 : 1);
      if (u && (n < 0 ? u.top <= a + r : u.bottom >= a + r))
        break;
    }
    let f = i.viewState.heightOracle.textHeight / 2;
    a = n > 0 ? h.bottom + f : h.top - f;
  }
  if (i.viewport.from >= h.to || i.viewport.to <= h.from) {
    if (t)
      return null;
    if (h.type == Si.Text) {
      let f = Sw(i, s, h, o, l);
      return new Ki(f, f == h.from ? 1 : -1);
    }
  }
  if (h.type != Si.Text)
    return a < (h.top + h.bottom) / 2 ? new Ki(h.from, 1) : new Ki(h.to, -1);
  let c = i.docView.lineAt(h.from, 2);
  return (!c || c.length != h.length) && (c = i.docView.lineAt(h.from, -2)), new Pw(i, o, l, i.textDirectionAt(h.from)).scanTile(c, h.from);
}
class Pw {
  constructor(e, t, n, s) {
    this.view = e, this.x = t, this.y = n, this.baseDir = s, this.line = null, this.spans = null;
  }
  bidiSpansAt(e) {
    return (!this.line || this.line.from > e || this.line.to < e) && (this.line = this.view.state.doc.lineAt(e), this.spans = this.view.bidiSpans(this.line)), this;
  }
  baseDirAt(e, t) {
    let { line: n, spans: s } = this.bidiSpansAt(e);
    return s[tn.find(s, e - n.from, -1, t)].level == this.baseDir;
  }
  dirAt(e, t) {
    let { line: n, spans: s } = this.bidiSpansAt(e);
    return s[tn.find(s, e - n.from, -1, t)].dir;
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
    let s = 0, r = e.length - 1, o = /* @__PURE__ */ new Set(), l = this.bidiIn(e[0], e[r]), a, h, c = -1, f = 1e9, u;
    e: for (; s < r; ) {
      let O = r - s, g = s + r >> 1;
      t: if (o.has(g)) {
        let v = s + Math.floor(Math.random() * O);
        for (let S = 0; S < O; S++) {
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
          let S = m[v], x = 0;
          if (!(S.width == 0 && m.length > 1)) {
            if (S.bottom < this.y)
              (!a || a.bottom < S.bottom) && (a = S), x = 1;
            else if (S.top > this.y)
              (!h || h.top > S.top) && (h = S), x = -1;
            else {
              let P = S.left > this.x ? this.x - S.left : S.right < this.x ? this.x - S.right : 0, E = Math.abs(P);
              E < f && (c = g, f = E, u = S), P && (x = P < 0 == (this.baseDir == ft.LTR) ? -1 : 1);
            }
            x == -1 && (!l || this.baseDirAt(e[g], 1)) ? r = g : x == 1 && (!l || this.baseDirAt(e[g + 1], -1)) && (s = g + 1);
          }
        }
    }
    if (!u) {
      if (!h && !a)
        return { i: e[0], after: !1 };
      let O = a && (!h || this.y - a.bottom < h.top - this.y) ? a : h;
      return this.y = (O.top + O.bottom) / 2, this.scan(e, t, !0);
    }
    if (f && !n) {
      let { top: O, bottom: g } = u;
      if (a && a.bottom > (O + O + g) / 3)
        return this.y = a.bottom - 1, this.scan(e, t, !0);
      if (h && h.top < (O + g + g) / 3)
        return this.y = h.top + 1, this.scan(e, t, !0);
    }
    let p = (l ? this.dirAt(e[c], 1) : this.baseDir) == ft.LTR;
    return {
      i: c,
      // Test whether x is closes to the start or end of this element
      after: this.x > (u.left + u.right) / 2 == p
    };
  }
  scanText(e, t) {
    let n = [];
    for (let r = 0; r < e.length; r = Rt(e.text, r))
      n.push(t + r);
    n.push(t + e.length);
    let s = this.scan(n, (r) => {
      let o = n[r] - t, l = n[r + 1] - t;
      return uo(e.dom, o, l).getClientRects();
    });
    return s.after ? new Ki(n[s.i + 1], -1) : new Ki(n[s.i], 1);
  }
  scanTile(e, t) {
    if (!e.length)
      return new Ki(t, 1);
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
      return a.flags & 48 ? null : (a.dom.nodeType == 1 ? a.dom : uo(a.dom, 0, a.length)).getClientRects();
    }), r = e.children[s.i], o = n[s.i];
    return r.isText() ? this.scanText(r, o) : r.isComposite() ? this.scanTile(r, o) : s.after ? new Ki(n[s.i + 1], -1) : new Ki(o, 1);
  }
}
const Ms = "￿";
class Tw {
  constructor(e, t) {
    this.points = e, this.view = t, this.text = "", this.lineSeparator = t.state.facet(ze.lineSeparator);
  }
  append(e) {
    this.text += e;
  }
  lineBreak() {
    this.text += Ms;
  }
  readRange(e, t) {
    if (!e)
      return this;
    let n = e.parentNode;
    for (let s = e; ; ) {
      this.findPointBefore(n, s);
      let r = this.text.length;
      this.readNode(s);
      let o = ut.get(s), l = s.nextSibling;
      if (l == t) {
        o != null && o.breakAfter && !l && n != this.view.contentDOM && this.lineBreak();
        break;
      }
      let a = ut.get(l);
      (o && a ? o.breakAfter : (o ? o.breakAfter : Tl(s)) || Tl(l) && (s.nodeName != "BR" || o != null && o.isWidget()) && this.text.length > r) && !Zw(l, t) && this.lineBreak(), s = l;
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
    let t = ut.get(e), n = t && t.overrideDOMText;
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
      (e.nodeType == 3 ? n.node == e : e.contains(n.node)) && (n.pos = this.text.length + (Cw(e, n.node, n.offset) ? t : 0));
  }
}
function Cw(i, e, t) {
  for (; ; ) {
    if (!e || t < kn(e))
      return !1;
    if (e == i)
      return !0;
    t = Bn(e) + 1, e = e.parentNode;
  }
}
function Zw(i, e) {
  let t;
  for (; !(i == e || !i); i = i.nextSibling) {
    let n = ut.get(i);
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
class $u {
  constructor(e, t) {
    this.node = e, this.offset = t, this.pos = -1;
  }
}
class Ew {
  constructor(e, t, n, s) {
    this.typeOver = s, this.bounds = null, this.text = "", this.domChanged = t > -1;
    let { impreciseHead: r, impreciseAnchor: o } = e.docView, l = e.state.selection;
    if (e.state.readOnly && t > -1)
      this.newSel = null;
    else if (t > -1 && (this.bounds = FO(e.docView.tile, t, n, 0))) {
      let a = r || o ? [] : Rw(e), h = new Tw(a, e);
      h.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = h.text, this.newSel = Mw(a, this.bounds.from);
    } else {
      let a = e.observer.selectionRange, h = r && r.node == a.focusNode && r.offset == a.focusOffset || !Fh(e.contentDOM, a.focusNode) ? l.main.head : e.docView.posFromDOM(a.focusNode, a.focusOffset), c = o && o.node == a.anchorNode && o.offset == a.anchorOffset || !Fh(e.contentDOM, a.anchorNode) ? l.main.anchor : e.docView.posFromDOM(a.anchorNode, a.anchorOffset), f = e.viewport;
      if ((re.ios || re.chrome) && h != c && Math.min(h, c) <= l.main.from && Math.max(h, c) >= l.main.to && (f.from > 0 || f.to < e.state.doc.length)) {
        let u = Math.min(h, c), p = Math.max(h, c), O = f.from - u, g = f.to - p;
        (O == 0 || O == 1 || u == 0) && (g == 0 || g == -1 || p == e.state.doc.length) && (h = 0, c = e.state.doc.length);
      }
      if (e.inputState.composing > -1 && l.ranges.length > 1)
        this.newSel = l.replaceRange(B.range(c, h));
      else if (e.lineWrapping && c == h && !(l.main.empty && l.main.head == h) && e.inputState.lastTouchTime > Date.now() - 100) {
        let u = e.coordsAtPos(h, -1), p = 0;
        u && (p = e.inputState.lastTouchY <= u.bottom ? -1 : 1), this.newSel = B.create([B.cursor(h, p)]);
      } else
        this.newSel = B.single(c, h);
    }
  }
}
function FO(i, e, t, n) {
  if (i.isComposite()) {
    let s = -1, r = -1, o = -1, l = -1;
    for (let a = 0, h = n, c = n; a < i.children.length; a++) {
      let f = i.children[a], u = h + f.length;
      if (h < e && u > t)
        return FO(f, e, t, h);
      if (u >= e && s == -1 && (s = a, r = h), h > t && f.dom.parentNode == i.dom) {
        o = a, l = c;
        break;
      }
      c = u, h = u + f.breakAfter;
    }
    return {
      from: r,
      to: l < 0 ? n + i.length : l,
      startDOM: (s ? i.children[s - 1].dom.nextSibling : null) || i.dom.firstChild,
      endDOM: o < i.children.length && o >= 0 ? i.children[o].dom : null
    };
  } else return i.isText() ? { from: n, to: n + i.length, startDOM: i.dom, endDOM: i.dom.nextSibling } : null;
}
function HO(i, e) {
  let t, { newSel: n } = e, { state: s } = i, r = s.selection.main, o = i.inputState.lastKeyTime > Date.now() - 100 ? i.inputState.lastKeyCode : -1;
  if (e.bounds) {
    let { from: l, to: a } = e.bounds, h = r.from, c = null;
    (o === 8 || re.android && e.text.length < a - l) && (h = r.to, c = "end");
    let f = s.doc.sliceString(l, a, Ms), u, p;
    !r.empty && r.from >= l && r.to <= a && (e.typeOver || f != e.text) && f.slice(0, r.from - l) == e.text.slice(0, r.from - l) && f.slice(r.to - l) == e.text.slice(u = e.text.length - (f.length - (r.to - l))) ? t = {
      from: r.from,
      to: r.to,
      insert: je.of(e.text.slice(r.from - l, u).split(Ms))
    } : (p = KO(f, e.text, h - l, c)) && (re.chrome && o == 13 && p.toB == p.from + 2 && e.text.slice(p.from, p.toB) == Ms + Ms && p.toB--, t = {
      from: l + p.from,
      to: l + p.toA,
      insert: je.of(e.text.slice(p.from, p.toB).split(Ms))
    });
  } else n && (!i.hasFocus && s.facet(vn) || Al(n, r)) && (n = null);
  if (!t && !n)
    return !1;
  if ((re.mac || re.android) && t && t.from == t.to && t.from == r.head - 1 && /^\. ?$/.test(t.insert.toString()) && i.contentDOM.getAttribute("autocorrect") == "off" ? (n && t.insert.length == 2 && (n = B.single(n.main.anchor - 1, n.main.head - 1)), t = { from: t.from, to: t.to, insert: je.of([t.insert.toString().replace(".", " ")]) }) : s.doc.lineAt(r.from).to < r.to && i.docView.lineHasWidget(r.to) && i.inputState.insertingTextAt > Date.now() - 50 ? t = {
    from: r.from,
    to: r.to,
    insert: s.toText(i.inputState.insertingText)
  } : re.chrome && t && t.from == t.to && t.from == r.head && t.insert.toString() == `
 ` && i.lineWrapping && (n && (n = B.single(n.main.anchor - 1, n.main.head - 1)), t = { from: r.from, to: r.to, insert: je.of([" "]) }), t)
    return sf(i, t, n, o);
  if (n && !Al(n, r)) {
    let l = !1, a = "select";
    return i.inputState.lastSelectionTime > Date.now() - 50 && (i.inputState.lastSelectionOrigin == "select" && (l = !0), a = i.inputState.lastSelectionOrigin, a == "select.pointer" && (n = UO(s.facet(Zo).map((h) => h(i)), n))), i.dispatch({ selection: n, scrollIntoView: l, userEvent: a }), !0;
  } else
    return !1;
}
function sf(i, e, t, n = -1) {
  if (re.ios && i.inputState.flushIOSKey(e))
    return !0;
  let s = i.state.selection.main;
  if (re.android && (e.to == s.to && // GBoard will sometimes remove a space it just inserted
  // after a completion when you press enter
  (e.from == s.from || e.from == s.from - 1 && i.state.sliceDoc(e.from, s.from) == " ") && e.insert.length == 1 && e.insert.lines == 2 && Vs(i.contentDOM, "Enter", 13) || (e.from == s.from - 1 && e.to == s.to && e.insert.length == 0 || n == 8 && e.insert.length < e.to - e.from && e.to > s.head) && Vs(i.contentDOM, "Backspace", 8) || e.from == s.from && e.to == s.to + 1 && e.insert.length == 0 && Vs(i.contentDOM, "Delete", 46)))
    return !0;
  let r = e.insert.toString();
  i.inputState.composing >= 0 && i.inputState.composing++;
  let o, l = () => o || (o = Aw(i, e, t));
  return i.state.facet(LO).some((a) => a(i, e.from, e.to, r, l)) || i.dispatch(l()), !0;
}
function Aw(i, e, t) {
  let n, s = i.state, r = s.selection.main, o = -1;
  if (e.from == e.to && e.from < r.from || e.from > r.to) {
    let a = e.from < r.from ? -1 : 1, h = a < 0 ? r.from : r.to, c = eo(s.facet(Zo).map((f) => f(i)), h, a);
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
      let c = i.state.sliceDoc(e.from, e.to), f, u = t && GO(i, t.main.head);
      if (u) {
        let O = e.insert.length - (e.to - e.from);
        f = { from: u.from, to: u.to - O };
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
        let v = s.changes({ from: m, to: g, insert: e.insert }), S = O.to - r.to;
        return {
          changes: v,
          range: h ? B.range(Math.max(0, h.anchor + S), Math.max(0, h.head + S)) : O.map(v)
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
function KO(i, e, t, n) {
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
function Rw(i) {
  let e = [];
  if (i.root.activeElement != i.contentDOM)
    return e;
  let { anchorNode: t, anchorOffset: n, focusNode: s, focusOffset: r } = i.observer.selectionRange;
  return t && (e.push(new $u(t, n)), (s != t || r != n) && e.push(new $u(s, r))), e;
}
function Mw(i, e) {
  if (i.length == 0)
    return null;
  let t = i[0].pos, n = i.length == 2 ? i[1].pos : t;
  return t > -1 && n > -1 ? B.single(t + e, n + e) : null;
}
function Al(i, e) {
  return e.head == i.main.head && e.anchor == i.main.anchor;
}
class Xw {
  setSelectionOrigin(e) {
    this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
  }
  constructor(e) {
    this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.touchActive = !1, this.lastTouchTime = 0, this.lastTouchX = 0, this.lastTouchY = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.lastWheelEvent = 0, this.pendingIOSKey = void 0, this.lastIOSMomentumScroll = 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, re.safari && e.contentDOM.addEventListener("input", () => null), re.gecko && Kw(e.contentDOM.ownerDocument);
  }
  handleEvent(e) {
    !qw(this.view, e) || this.ignoreDuringComposition(e) || e.type == "keydown" && this.keydown(e) || (this.view.updateState != 0 ? Promise.resolve().then(() => this.runHandlers(e.type, e)) : this.runHandlers(e.type, e));
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
    let t = Lw(e), n = this.handlers, s = this.view.contentDOM;
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
    if (this.tabFocusMode > 0 && e.keyCode != 27 && eg.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), re.android && re.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8))
      return this.view.observer.delayAndroidKey(e.key, e.keyCode), !0;
    if (re.ios && !e.synthetic && !e.altKey && !e.metaKey && (JO.some((t) => t.keyCode == e.keyCode) && !e.ctrlKey || Iw.indexOf(e.key) > -1 && e.ctrlKey)) {
      let t = { ctrlKey: e.ctrlKey, altKey: e.altKey, metaKey: e.metaKey, shiftKey: e.shiftKey };
      return t.shiftKey && re.ios && !/^(off|none)$/.test(this.view.contentDOM.autocapitalize) && jw(this.view.win) && (t.shiftKey = !1), this.pendingIOSKey = { key: e.key, keyCode: e.keyCode, mods: t }, setTimeout(() => this.flushIOSKey(), 250), !0;
    }
    return e.keyCode != 229 && this.view.observer.forceFlush(), !1;
  }
  flushIOSKey(e) {
    let t = this.pendingIOSKey;
    return !t || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, Vs(this.view.contentDOM, t.key, t.keyCode, t.mods));
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
function jw(i) {
  return i.visualViewport ? i.visualViewport.height * i.visualViewport.scale / i.document.documentElement.clientHeight < 0.85 : !1;
}
function _u(i, e) {
  return (t, n) => {
    try {
      return e.call(i, n, t);
    } catch (s) {
      ai(t.state, s);
    }
  };
}
function Lw(i) {
  let e = /* @__PURE__ */ Object.create(null);
  function t(n) {
    return e[n] || (e[n] = { observers: [], handlers: [] });
  }
  for (let n of i) {
    let s = n.spec, r = s && s.plugin.domEventHandlers, o = s && s.plugin.domEventObservers;
    if (r)
      for (let l in r) {
        let a = r[l];
        a && t(l).handlers.push(_u(n.value, a));
      }
    if (o)
      for (let l in o) {
        let a = o[l];
        a && t(l).observers.push(_u(n.value, a));
      }
  }
  for (let n in Li)
    t(n).handlers.push(Li[n]);
  for (let n in zt)
    t(n).observers.push(zt[n]);
  return e;
}
const JO = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], Iw = "dthko", eg = [16, 17, 18, 20, 91, 92, 224, 225], Wo = 6;
function qo(i) {
  return Math.max(0, i) * 0.7 + 8;
}
function Dw(i, e) {
  return Math.max(Math.abs(i.clientX - e.clientX), Math.abs(i.clientY - e.clientY));
}
class zw {
  constructor(e, t, n, s) {
    this.view = e, this.startEvent = t, this.style = n, this.mustSelect = s, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = t, this.scrollParents = kO(e.contentDOM), this.atoms = e.state.facet(Zo).map((o) => o(e));
    let r = e.contentDOM.ownerDocument;
    r.addEventListener("mousemove", this.move = this.move.bind(this)), r.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(ze.allowMultipleSelections) && Nw(e, t), this.dragging = Ww(e, t) && ng(t) == 1 ? null : !1;
  }
  start(e) {
    this.dragging === !1 && this.select(e);
  }
  move(e) {
    if (e.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && Dw(this.startEvent, e) < 10)
      return;
    this.select(this.lastEvent = e);
    let t = 0, n = 0, s = 0, r = 0, o = this.view.win.innerWidth, l = this.view.win.innerHeight;
    this.scrollParents.x && ({ left: s, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: r, bottom: l } = this.scrollParents.y.getBoundingClientRect());
    let a = nf(this.view);
    e.clientX - a.left <= s + Wo ? t = -qo(s - e.clientX) : e.clientX + a.right >= o - Wo && (t = qo(e.clientX - o)), e.clientY - a.top <= r + Wo ? n = -qo(r - e.clientY) : e.clientY + a.bottom >= l - Wo && (n = qo(e.clientY - l)), this.setScrollSpeed(t, n);
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
    let { view: t } = this, n = UO(this.atoms, this.style.get(e, this.extend, this.multiple));
    (this.mustSelect || !n.eq(t.state.selection, this.dragging === !1)) && this.view.dispatch({
      selection: n,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(e) {
    e.transactions.some((t) => t.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function Nw(i, e) {
  let t = i.state.facet(RO);
  return t.length ? t[0](e) : re.mac ? e.metaKey : e.ctrlKey;
}
function Yw(i, e) {
  let t = i.state.facet(MO);
  return t.length ? t[0](e) : re.mac ? !e.altKey : !e.ctrlKey;
}
function Ww(i, e) {
  let { main: t } = i.state.selection;
  if (t.empty)
    return !1;
  let n = co(i.root);
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
function qw(i, e) {
  if (!e.bubbles)
    return !0;
  if (e.defaultPrevented)
    return !1;
  for (let t = e.target, n; t != i.contentDOM; t = t.parentNode)
    if (!t || t.nodeType == 11 || (n = ut.get(t)) && n.isWidget() && !n.isHidden && n.widget.ignoreEvent(e))
      return !1;
  return !0;
}
const Li = /* @__PURE__ */ Object.create(null), zt = /* @__PURE__ */ Object.create(null), tg = re.ie && re.ie_version < 15 || re.ios && re.webkit_version < 604;
function Vw(i) {
  let e = i.dom.parentNode;
  if (!e)
    return;
  let t = e.appendChild(document.createElement("textarea"));
  t.style.cssText = "position: fixed; left: -10000px; top: 10px", t.focus(), setTimeout(() => {
    i.focus(), t.remove(), ig(i, t.value);
  }, 50);
}
function da(i, e, t) {
  for (let n of i.facet(e))
    t = n(t, i);
  return t;
}
function ig(i, e) {
  e = da(i.state, Kc, e);
  let { state: t } = i, n, s = 1, r = t.toText(e), o = r.lines == t.selection.ranges.length;
  if (nc != null && t.selection.ranges.every((a) => a.empty) && nc == r.toString()) {
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
zt.scroll = (i) => {
  let e = i.inputState;
  e.lastScrollTop = i.scrollDOM.scrollTop, e.lastScrollLeft = i.scrollDOM.scrollLeft, re.ios && !e.touchActive && (e.lastIOSMomentumScroll = Date.now());
};
zt.wheel = zt.mousewheel = (i) => {
  i.inputState.lastWheelEvent = Date.now();
};
Li.keydown = (i, e) => (i.inputState.setSelectionOrigin("select"), e.keyCode == 27 && i.inputState.tabFocusMode != 0 && (i.inputState.tabFocusMode = Date.now() + 2e3), !1);
zt.touchstart = (i, e) => {
  let t = i.inputState, n = e.targetTouches[0];
  t.touchActive = !0, t.lastTouchTime = Date.now(), n && (t.lastTouchX = n.clientX, t.lastTouchY = n.clientY), t.setSelectionOrigin("select.pointer");
};
zt.touchmove = (i) => {
  i.inputState.setSelectionOrigin("select.pointer");
};
zt.touchend = (i, e) => {
  i.inputState.touchActive = !1;
};
Li.mousedown = (i, e) => {
  if (i.observer.flush(), i.inputState.lastTouchTime > Date.now() - 2e3)
    return !1;
  let t = null;
  for (let n of i.state.facet(XO))
    if (t = n(i, e), t)
      break;
  if (!t && e.button == 0 && (t = Gw(i, e)), t) {
    let n = !i.hasFocus;
    i.inputState.startMouseSelection(new zw(i, e, t, n)), n && i.observer.ignore(() => {
      QO(i.contentDOM);
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
function Pu(i, e, t, n) {
  if (n == 1)
    return B.cursor(e, t);
  if (n == 2)
    return xw(i.state, e, t);
  {
    let s = i.docView.lineAt(e, t), r = i.state.doc.lineAt(s ? s.posAtEnd : e), o = s ? s.posAtStart : r.from, l = s ? s.posAtEnd : r.to;
    return l < i.state.doc.length && l == r.to && l++, B.undirectionalRange(o, l);
  }
}
const Bw = re.ie && re.ie_version <= 11;
let Tu = null, Cu = 0, Zu = 0;
function ng(i) {
  if (!Bw)
    return i.detail;
  let e = Tu, t = Zu;
  return Tu = i, Zu = Date.now(), Cu = !e || t > Date.now() - 400 && Math.abs(e.clientX - i.clientX) < 2 && Math.abs(e.clientY - i.clientY) < 2 ? (Cu + 1) % 3 : 1;
}
function Gw(i, e) {
  let t = i.posAndSideAtCoords({ x: e.clientX, y: e.clientY }, !1), n = ng(e), s = i.state.selection;
  return {
    update(r) {
      r.docChanged && (t.pos = r.changes.mapPos(t.pos), s = s.map(r.changes));
    },
    get(r, o, l) {
      let a = i.posAndSideAtCoords({ x: r.clientX, y: r.clientY }, !1), h, c = Pu(i, a.pos, a.assoc, n);
      if (t.pos != a.pos && !o) {
        let f = Pu(i, t.pos, t.assoc, n), u = Math.min(f.from, c.from), p = Math.max(f.to, c.to);
        c = u < c.from ? B.range(u, p, c.assoc) : B.range(p, u, c.assoc);
      }
      return o ? s.replaceRange(s.main.extend(c.from, c.to, c.assoc)) : l && n == 1 && s.ranges.length > 1 && (h = Uw(s, a.pos)) ? h : l ? s.addRange(c) : B.create([c]);
    }
  };
}
function Uw(i, e) {
  for (let t = 0; t < i.ranges.length; t++) {
    let { from: n, to: s } = i.ranges[t];
    if (n <= e && s >= e)
      return B.create(i.ranges.slice(0, t).concat(i.ranges.slice(t + 1)), i.mainIndex == t ? 0 : i.mainIndex - (i.mainIndex > t ? 1 : 0));
  }
  return null;
}
Li.dragstart = (i, e) => {
  let { selection: { main: t } } = i.state;
  if (e.target.draggable) {
    let s = i.docView.tile.nearest(e.target);
    if (s && s.isWidget()) {
      let r = s.posAtStart, o = r + s.length;
      (r >= t.to || o <= t.from) && (t = B.undirectionalRange(r, o));
    }
  }
  let { inputState: n } = i;
  return n.mouseSelection && (n.mouseSelection.dragging = !0), n.draggedContent = t, e.dataTransfer && (e.dataTransfer.setData("Text", da(i.state, Jc, i.state.sliceDoc(t.from, t.to))), e.dataTransfer.effectAllowed = "copyMove"), !1;
};
Li.dragend = (i) => (i.inputState.draggedContent = null, !1);
function Eu(i, e, t, n) {
  if (t = da(i.state, Kc, t), !t)
    return;
  let s = i.posAtCoords({ x: e.clientX, y: e.clientY }, !1), { draggedContent: r } = i.inputState, o = n && r && Yw(i, e) ? { from: r.from, to: r.to } : null, l = { from: s, insert: t }, a = i.state.changes(o ? [o, l] : l);
  i.focus(), i.dispatch({
    changes: a,
    selection: { anchor: a.mapPos(s, -1), head: a.mapPos(s, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  }), i.inputState.draggedContent = null;
}
Li.drop = (i, e) => {
  if (!e.dataTransfer)
    return !1;
  if (i.state.readOnly)
    return !0;
  let t = e.dataTransfer.files;
  if (t && t.length) {
    let n = Array(t.length), s = 0, r = () => {
      ++s == t.length && Eu(i, e, n.filter((o) => o != null).join(i.state.lineBreak), !1);
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
      return Eu(i, e, n, !0), !0;
  }
  return !1;
};
Li.paste = (i, e) => {
  if (i.state.readOnly)
    return !0;
  i.observer.flush();
  let t = tg ? null : e.clipboardData;
  return t ? (ig(i, t.getData("text/plain") || t.getData("text/uri-list")), !0) : (Vw(i), !1);
};
function Fw(i, e) {
  let t = i.dom.parentNode;
  if (!t)
    return;
  let n = t.appendChild(document.createElement("textarea"));
  n.style.cssText = "position: fixed; left: -10000px; top: 10px", n.value = e, n.focus(), n.selectionEnd = e.length, n.selectionStart = 0, setTimeout(() => {
    n.remove(), i.focus();
  }, 50);
}
function Hw(i) {
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
  return { text: da(i, Jc, e.join(i.lineBreak)), ranges: t, linewise: n };
}
let nc = null;
Li.copy = Li.cut = (i, e) => {
  if (!Hr(i.contentDOM, i.observer.selectionRange))
    return !1;
  let { text: t, ranges: n, linewise: s } = Hw(i.state);
  if (!t && !s)
    return !1;
  nc = s ? t : null, e.type == "cut" && !i.state.readOnly && i.dispatch({
    changes: n,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
  let r = tg ? null : e.clipboardData;
  return r ? (r.clearData(), r.setData("text/plain", t), !0) : (Fw(i, t), !1);
};
const sg = /* @__PURE__ */ _n.define();
function rg(i, e) {
  let t = [];
  for (let n of i.facet(IO)) {
    let s = n(i, e);
    s && t.push(s);
  }
  return t.length ? i.update({ effects: t, annotations: sg.of(!0) }) : null;
}
function og(i) {
  setTimeout(() => {
    let e = i.hasFocus;
    if (e != i.inputState.notifiedFocused) {
      let t = rg(i.state, e);
      t ? i.dispatch(t) : i.update([]);
    }
  }, 10);
}
zt.focus = (i) => {
  i.inputState.lastFocusTime = Date.now(), !i.scrollDOM.scrollTop && (i.inputState.lastScrollTop || i.inputState.lastScrollLeft) && (i.scrollDOM.scrollTop = i.inputState.lastScrollTop, i.scrollDOM.scrollLeft = i.inputState.lastScrollLeft), og(i);
};
zt.blur = (i) => {
  i.observer.clearSelectionRange(), og(i);
};
zt.compositionstart = zt.compositionupdate = (i) => {
  i.observer.editContext || (i.inputState.compositionFirstChange == null && (i.inputState.compositionFirstChange = !0), i.inputState.composing < 0 && (i.inputState.composing = 0));
};
zt.compositionend = (i) => {
  i.observer.editContext || (i.inputState.composing = -1, i.inputState.compositionEndedAt = Date.now(), i.inputState.compositionPendingKey = !0, i.inputState.compositionPendingChange = i.observer.pendingRecords().length > 0, i.inputState.compositionFirstChange = null, re.chrome && re.android ? i.observer.flushSoon() : i.inputState.compositionPendingChange ? Promise.resolve().then(() => i.observer.flush()) : setTimeout(() => {
    i.inputState.composing < 0 && i.docView.hasComposition && i.update([]);
  }, 50));
};
zt.contextmenu = (i) => {
  i.inputState.lastContextMenu = Date.now();
};
Li.beforeinput = (i, e) => {
  var t, n;
  if ((e.inputType == "insertText" || e.inputType == "insertCompositionText") && (i.inputState.insertingText = e.data, i.inputState.insertingTextAt = Date.now()), e.inputType == "insertReplacementText" && i.observer.editContext) {
    let r = (t = e.dataTransfer) === null || t === void 0 ? void 0 : t.getData("text/plain"), o = e.getTargetRanges();
    if (r && o.length) {
      let l = o[0], a = i.posAtDOM(l.startContainer, l.startOffset), h = i.posAtDOM(l.endContainer, l.endOffset);
      return sf(i, { from: a, to: h, insert: i.state.toText(r) }, null), !0;
    }
  }
  let s;
  if (re.chrome && re.android && (s = JO.find((r) => r.inputType == e.inputType)) && (i.observer.delayAndroidKey(s.key, s.keyCode), s.key == "Backspace" || s.key == "Delete")) {
    let r = ((n = window.visualViewport) === null || n === void 0 ? void 0 : n.height) || 0;
    setTimeout(() => {
      var o;
      (((o = window.visualViewport) === null || o === void 0 ? void 0 : o.height) || 0) > r + 10 && i.hasFocus && (i.contentDOM.blur(), i.focus());
    }, 100);
  }
  return re.ios && e.inputType == "deleteContentForward" && i.observer.flushSoon(), re.safari && e.inputType == "insertText" && i.inputState.composing >= 0 && setTimeout(() => zt.compositionend(i, e), 20), !1;
};
const Au = /* @__PURE__ */ new Set();
function Kw(i) {
  Au.has(i) || (Au.add(i), i.addEventListener("copy", () => {
  }), i.addEventListener("cut", () => {
  }));
}
const Ru = ["pre-wrap", "normal", "pre-line", "break-spaces"];
let Or = !1;
function Mu() {
  Or = !1;
}
class Jw {
  constructor(e) {
    this.lineWrapping = e, this.doc = je.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
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
    return Ru.indexOf(e) > -1 != this.lineWrapping;
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
    let l = Ru.indexOf(e) > -1, a = Math.abs(t - this.lineHeight) > 0.3 || this.lineWrapping != l;
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
class ex {
  constructor(e, t) {
    this.from = e, this.heights = t, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class Ei {
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
    return typeof this._content == "number" ? Si.Text : Array.isArray(this._content) ? this._content : this._content.type;
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
    return this._content instanceof Ss ? this._content.widget : null;
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
    return new Ei(this.from, this.length + e.length, this.top, this.height + e.height, t);
  }
}
var Ke = /* @__PURE__ */ (function(i) {
  return i[i.ByPos = 0] = "ByPos", i[i.ByHeight = 1] = "ByHeight", i[i.ByPosNoHeight = 2] = "ByPosNoHeight", i;
})(Ke || (Ke = {}));
const pl = 1e-3;
class Dt {
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
    this.height != e && (Math.abs(this.height - e) > pl && (Or = !0), this.height = e);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(e, t, n) {
    return Dt.of(n);
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
      let { fromA: a, toA: h, fromB: c, toB: f } = s[l], u = r.lineAt(a, Ke.ByPosNoHeight, n.setDoc(t), 0, 0), p = u.to >= h ? u : r.lineAt(h, Ke.ByPosNoHeight, n, 0, 0);
      for (f += p.to - h, h = p.to; l > 0 && u.from <= s[l - 1].toA; )
        a = s[l - 1].fromA, c = s[l - 1].fromB, l--, a < u.from && (u = r.lineAt(a, Ke.ByPosNoHeight, n, 0, 0));
      c += u.from - a, a = u.from;
      let O = rf.build(n.setDoc(o), e, c, f);
      r = Rl(r, r.replace(a, h, O));
    }
    return r.updateHeight(n, 0);
  }
  static empty() {
    return new li(0, 0, 0);
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
    return e[t - 1] == null ? (o = 1, t--) : e[t] == null && (o = 1, n++), new ix(Dt.of(e.slice(0, t)), o, Dt.of(e.slice(n)));
  }
}
function Rl(i, e) {
  return i == e ? i : (i.constructor != e.constructor && (Or = !0), e);
}
Dt.prototype.size = 1;
const tx = /* @__PURE__ */ Ge.replace({});
class lg extends Dt {
  constructor(e, t, n) {
    super(e, t), this.deco = n, this.spaceAbove = 0;
  }
  mainBlock(e, t) {
    return new Ei(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
  }
  blockAt(e, t, n, s) {
    return this.spaceAbove && e < n + this.spaceAbove ? new Ei(s, 0, n, this.spaceAbove, tx) : this.mainBlock(n, s);
  }
  lineAt(e, t, n, s, r) {
    let o = this.mainBlock(s, r);
    return this.spaceAbove ? this.blockAt(0, n, s, r).join(o) : o;
  }
  forEachLine(e, t, n, s, r, o) {
    e <= r + this.length && t >= r && o(this.lineAt(0, Ke.ByPos, n, s, r));
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
class li extends lg {
  constructor(e, t, n) {
    super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = n;
  }
  mainBlock(e, t) {
    return new Ei(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
  }
  replace(e, t, n) {
    let s = n[0];
    return n.length == 1 && (s instanceof li || s instanceof Pt && s.flags & 4) && Math.abs(this.length - s.length) < 10 ? (s instanceof Pt ? s = new li(s.length, this.height, this.spaceAbove) : s.height = this.height, this.outdated || (s.outdated = !1), s) : Dt.of(n);
  }
  updateHeight(e, t = 0, n = !1, s) {
    return s && s.from <= t && s.more ? this.setMeasuredHeight(s) : (n || this.outdated) && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight)), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class Pt extends Dt {
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
      let h = s + (e < t.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (e - n) / this.height)) * this.length)), c = t.doc.lineAt(h), f = l + c.length * a, u = Math.max(n, e - f / 2);
      return new Ei(c.from, c.length, u, f, 0);
    } else {
      let h = Math.max(0, Math.min(o - r, Math.floor((e - n) / l))), { from: c, length: f } = t.doc.line(r + h);
      return new Ei(c, f, n + l * h, l, 0);
    }
  }
  lineAt(e, t, n, s, r) {
    if (t == Ke.ByHeight)
      return this.blockAt(e, n, s, r);
    if (t == Ke.ByPosNoHeight) {
      let { from: p, to: O } = n.doc.lineAt(e);
      return new Ei(p, O - p, 0, 0, 0);
    }
    let { firstLine: o, perLine: l, perChar: a } = this.heightMetrics(n, r), h = n.doc.lineAt(e), c = l + h.length * a, f = h.number - o, u = s + l * f + a * (h.from - r - f);
    return new Ei(h.from, h.length, Math.max(s, Math.min(u, s + this.height - c)), c, 0);
  }
  forEachLine(e, t, n, s, r, o) {
    e = Math.max(e, r), t = Math.min(t, r + this.length);
    let { firstLine: l, perLine: a, perChar: h } = this.heightMetrics(n, r);
    for (let c = e, f = s; c <= t; ) {
      let u = n.doc.lineAt(c);
      if (c == e) {
        let O = u.number - l;
        f += a * O + h * (e - r - O);
      }
      let p = a + h * u.length;
      o(new Ei(u.from, u.length, f, p, 0)), f += p, c = u.to + 1;
    }
  }
  replace(e, t, n) {
    let s = this.length - t;
    if (s > 0) {
      let r = n[n.length - 1];
      r instanceof Pt ? n[n.length - 1] = new Pt(r.length + s) : n.push(null, new Pt(s - 1));
    }
    if (e > 0) {
      let r = n[0];
      r instanceof Pt ? n[0] = new Pt(e + r.length) : n.unshift(new Pt(e - 1), null);
    }
    return Dt.of(n);
  }
  decomposeLeft(e, t) {
    t.push(new Pt(e - 1), null);
  }
  decomposeRight(e, t) {
    t.push(null, new Pt(this.length - e - 1));
  }
  updateHeight(e, t = 0, n = !1, s) {
    let r = t + this.length;
    if (s && s.from <= t + this.length && s.more) {
      let o = [], l = Math.max(t, s.from), a = -1;
      for (s.from > t && o.push(new Pt(s.from - t - 1).updateHeight(e, t)); l <= r && s.more; ) {
        let c = e.doc.lineAt(l).length;
        o.length && o.push(null);
        let f = s.heights[s.index++], u = 0;
        f < 0 && (u = -f, f = s.heights[s.index++]), a == -1 ? a = f : Math.abs(f - a) >= pl && (a = -2);
        let p = new li(c, f, u);
        p.outdated = !1, o.push(p), l += c + 1;
      }
      l <= r && o.push(null, new Pt(r - l).updateHeight(e, l));
      let h = Dt.of(o);
      return (a < 0 || Math.abs(h.height - this.height) >= pl || Math.abs(a - this.heightMetrics(e, t).perLine) >= pl) && (Or = !0), Rl(this, h);
    } else (n || this.outdated) && (this.setHeight(e.heightForGap(t, t + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class ix extends Dt {
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
    let o = s + this.left.height, l = r + this.left.length + this.break, a = t == Ke.ByHeight ? e < o : e < l, h = a ? this.left.lineAt(e, t, n, s, r) : this.right.lineAt(e, t, n, o, l);
    if (this.break || (a ? h.to < l : h.from > l))
      return h;
    let c = t == Ke.ByPosNoHeight ? Ke.ByPosNoHeight : Ke.ByPos;
    return a ? h.join(this.right.lineAt(l, c, n, o, l)) : this.left.lineAt(l, c, n, s, r).join(h);
  }
  forEachLine(e, t, n, s, r, o) {
    let l = s + this.left.height, a = r + this.left.length + this.break;
    if (this.break)
      e < a && this.left.forEachLine(e, t, n, s, r, o), t >= a && this.right.forEachLine(e, t, n, l, a, o);
    else {
      let h = this.lineAt(a, Ke.ByPos, n, s, r);
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
    if (e > 0 && Xu(r, o - 1), t < this.length) {
      let l = r.length;
      this.decomposeRight(t, r), Xu(r, l);
    }
    return Dt.of(r);
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
    return e.size > 2 * t.size || t.size > 2 * e.size ? Dt.of(this.break ? [e, null, t] : [e, t]) : (this.left = Rl(this.left, e), this.right = Rl(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
  }
  updateHeight(e, t = 0, n = !1, s) {
    let { left: r, right: o } = this, l = t + r.length + this.break, a = null;
    return s && s.from <= t + r.length && s.more ? a = r = r.updateHeight(e, t, n, s) : r.updateHeight(e, t, n), s && s.from <= l + o.length && s.more ? a = o = o.updateHeight(e, l, n, s) : o.updateHeight(e, l, n), a ? this.balanced(r, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function Xu(i, e) {
  let t, n;
  i[e] == null && (t = i[e - 1]) instanceof Pt && (n = i[e + 1]) instanceof Pt && i.splice(e - 1, 3, new Pt(t.length + 1 + n.length));
}
const nx = 5;
class rf {
  constructor(e, t) {
    this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(e, t) {
    if (this.lineStart > -1) {
      let n = Math.min(t, this.lineEnd), s = this.nodes[this.nodes.length - 1];
      s instanceof li ? s.length += n - this.pos : (n > this.pos || !this.isCovered) && this.nodes.push(new li(n - this.pos, -1, 0)), this.writtenTo = n, t > n && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = t;
  }
  point(e, t, n) {
    if (e < t || n.heightRelevant) {
      let s = n.widget ? n.widget.estimatedHeight : 0, r = n.widget ? n.widget.lineBreaks : 0;
      s < 0 && (s = this.oracle.lineHeight);
      let o = t - e;
      n.block ? this.addBlock(new lg(o, s, n)) : (o || r || s >= nx) && this.addLineDeco(s, r, o);
    } else t > e && this.span(e, t);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new li(this.pos - e, -1, 0)), this.writtenTo = this.pos;
  }
  blankContent(e, t) {
    let n = new Pt(t - e);
    return this.oracle.doc.lineAt(e).to == t && (n.flags |= 4), n;
  }
  ensureLine() {
    this.enterLine();
    let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (e instanceof li)
      return e;
    let t = new li(0, -1, 0);
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
    this.lineStart > -1 && !(t instanceof li) && !this.isCovered ? this.nodes.push(new li(0, -1, 0)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let n = e;
    for (let s of this.nodes)
      s instanceof li && s.updateHeight(this.oracle, n), n += s ? s.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(e, t, n, s) {
    let r = new rf(n, e);
    return Ye.spans(t, n, s, r, 0), r.finish(n);
  }
}
function sx(i, e, t) {
  let n = new rx();
  return Ye.compare(i, e, t, n, 0), n.changes;
}
class rx {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(e, t, n, s) {
    (e < t || n && n.heightRelevant || s && s.heightRelevant) && qs(e, t, this.changes, 5);
  }
}
function ox(i, e) {
  let t = i.getBoundingClientRect(), n = i.ownerDocument, s = n.defaultView || window, r = Math.max(0, t.left), o = Math.min(s.innerWidth, t.right), l = Math.max(0, t.top), a = Math.min(s.innerHeight, t.bottom);
  for (let h = i.parentNode; h && h != n.body; )
    if (h.nodeType == 1) {
      let c = h, f = window.getComputedStyle(c);
      if ((c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth) && f.overflow != "visible") {
        let u = c.getBoundingClientRect();
        r = Math.max(r, u.left), o = Math.min(o, u.right), l = Math.max(l, u.top), a = Math.min(h == i.parentNode ? s.innerHeight : a, u.bottom);
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
function lx(i) {
  let e = i.getBoundingClientRect(), t = i.ownerDocument.defaultView || window;
  return e.left < t.innerWidth && e.right > 0 && e.top < t.innerHeight && e.bottom > 0;
}
function ax(i, e) {
  let t = i.getBoundingClientRect();
  return {
    left: 0,
    right: t.right - t.left,
    top: e,
    bottom: t.bottom - (t.top + e)
  };
}
class Ga {
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
    return Ge.replace({
      widget: new hx(this.displaySize * (t ? e.scaleY : e.scaleX), t)
    }).range(this.from, this.to);
  }
}
class hx extends Sr {
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
class ju {
  constructor(e, t) {
    this.view = e, this.state = t, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scaleX = 1, this.scaleY = 1, this.scrollOffset = 0, this.scrolledToBottom = !1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = Lu, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = ft.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let n = t.facet(ef).some((s) => typeof s != "function" && s.class == "cm-lineWrapping");
    this.heightOracle = new Jw(n), this.stateDeco = Iu(t), this.heightMap = Dt.empty().applyChanges(this.stateDeco, je.empty, this.heightOracle.setDoc(t.doc), [new mi(0, 0, 0, t.doc.length)]);
    for (let s = 0; s < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); s++)
      ;
    this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = Ge.set(this.lineGaps.map((s) => s.draw(this, !1))), this.scrollParent = e.scrollDOM, this.computeVisibleRanges();
  }
  updateForViewport() {
    let e = [this.viewport], { main: t } = this.state.selection;
    for (let n = 0; n <= 1; n++) {
      let s = n ? t.head : t.anchor;
      if (!e.some(({ from: r, to: o }) => s >= r && s <= o)) {
        let { from: r, to: o } = this.lineBlockAt(s);
        e.push(new Vo(r, o));
      }
    }
    return this.viewports = e.sort((n, s) => n.from - s.from), this.updateScaler();
  }
  updateScaler() {
    let e = this.scaler;
    return this.scaler = this.heightMap.height <= 7e6 ? Lu : new of(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
      this.viewportLines.push(zr(e, this.scaler));
    });
  }
  update(e, t = null) {
    this.state = e.state;
    let n = this.stateDeco;
    this.stateDeco = Iu(this.state);
    let s = e.changedRanges, r = mi.extendWithRanges(s, sx(n, this.stateDeco, e ? e.changes : xt.empty(this.state.doc.length))), o = this.heightMap.height, l = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollOffset);
    Mu(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), r), (this.heightMap.height != o || Or) && (e.flags |= 2), l ? (this.scrollAnchorPos = e.changes.mapPos(l.from, -1), this.scrollAnchorHeight = l.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = o);
    let a = r.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
    (t && (t.range.head < a.from || t.range.head > a.to) || !this.viewportIsAppropriate(a)) && (a = this.getViewport(0, t));
    let h = a.from != this.viewport.from || a.to != this.viewport.to;
    this.viewport = a, e.flags |= this.updateForViewport(), (h || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && (e.selectionSet || e.focusChanged) && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(Jy) && (this.mustEnforceCursorAssoc = !0);
  }
  measure() {
    let { view: e } = this, t = e.contentDOM, n = window.getComputedStyle(t), s = this.heightOracle, r = n.whiteSpace;
    this.defaultTextDirection = n.direction == "rtl" ? ft.RTL : ft.LTR;
    let o = this.heightOracle.mustRefreshForWrapping(r) || this.mustMeasureContent === "refresh", l = t.getBoundingClientRect(), a = o || this.mustMeasureContent || this.contentDOMHeight != l.height;
    this.contentDOMHeight = l.height, this.mustMeasureContent = !1;
    let h = 0, c = 0;
    if (l.width && l.height) {
      let { scaleX: E, scaleY: R } = SO(t, l);
      (E > 5e-3 && Math.abs(this.scaleX - E) > 5e-3 || R > 5e-3 && Math.abs(this.scaleY - R) > 5e-3) && (this.scaleX = E, this.scaleY = R, h |= 16, o = a = !0);
    }
    let f = (parseInt(n.paddingTop) || 0) * this.scaleY, u = (parseInt(n.paddingBottom) || 0) * this.scaleY;
    (this.paddingTop != f || this.paddingBottom != u) && (this.paddingTop = f, this.paddingBottom = u, h |= 18), this.editorWidth != e.scrollDOM.clientWidth && (s.lineWrapping && (a = !0), this.editorWidth = e.scrollDOM.clientWidth, h |= 16);
    let p = kO(this.view.contentDOM, !1).y;
    p != this.scrollParent && (this.scrollParent = p, this.scrollAnchorHeight = -1, this.scrollOffset = 0);
    let O = this.getScrollOffset();
    this.scrollOffset != O && (this.scrollAnchorHeight = -1, this.scrollOffset = O), this.scrolledToBottom = $O(this.scrollParent || e.win);
    let g = (this.printing ? ax : ox)(t, this.paddingTop), m = g.top - this.pixelViewport.top, v = g.bottom - this.pixelViewport.bottom;
    this.pixelViewport = g;
    let S = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (S != this.inView && (this.inView = S, S && (a = !0)), !this.inView && !this.scrollTarget && !lx(e.dom))
      return 0;
    let x = l.width;
    if ((this.contentDOMWidth != x || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = l.width, this.editorHeight = e.scrollDOM.clientHeight, h |= 16), a) {
      let E = e.docView.measureVisibleLineHeights(this.viewport);
      if (s.mustRefreshForHeights(E) && (o = !0), o || s.lineWrapping && Math.abs(x - this.contentDOMWidth) > s.charWidth) {
        let { lineHeight: R, charWidth: C, textHeight: Y } = e.docView.measureTextSize();
        o = R > 0 && s.refresh(r, R, C, Y, Math.max(5, x / C), E), o && (e.docView.minWidth = 0, h |= 16);
      }
      m > 0 && v > 0 ? c = Math.max(m, v) : m < 0 && v < 0 && (c = Math.min(m, v)), Mu();
      for (let R of this.viewports) {
        let C = R.from == this.viewport.from ? E : e.docView.measureVisibleLineHeights(R);
        this.heightMap = (o ? Dt.empty().applyChanges(this.stateDeco, je.empty, this.heightOracle, [new mi(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(s, 0, o, new ex(R.from, C));
      }
      Or && (h |= 2);
    }
    let P = !this.viewportIsAppropriate(this.viewport, c) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return P && (h & 2 && (h |= this.updateScaler()), this.viewport = this.getViewport(c, this.scrollTarget), h |= this.updateForViewport()), (h & 2 || P) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, e)), h |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), h;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(e, t) {
    let n = 0.5 - Math.max(-0.5, Math.min(0.5, e / 1e3 / 2)), s = this.heightMap, r = this.heightOracle, { visibleTop: o, visibleBottom: l } = this, a = new Vo(s.lineAt(o - n * 1e3, Ke.ByHeight, r, 0, 0).from, s.lineAt(l + (1 - n) * 1e3, Ke.ByHeight, r, 0, 0).to);
    if (t) {
      let { head: h } = t.range;
      if (h < a.from || h > a.to) {
        let c = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), f = s.lineAt(h, Ke.ByPos, r, 0, 0), u;
        t.y == "center" ? u = (f.top + f.bottom) / 2 - c / 2 : t.y == "start" || t.y == "nearest" && h < a.from ? u = f.top : u = f.bottom - c, a = new Vo(s.lineAt(u - 1e3 / 2, Ke.ByHeight, r, 0, 0).from, s.lineAt(u + c + 1e3 / 2, Ke.ByHeight, r, 0, 0).to);
      }
    }
    return a;
  }
  mapViewport(e, t) {
    let n = t.mapPos(e.from, -1), s = t.mapPos(e.to, 1);
    return new Vo(this.heightMap.lineAt(n, Ke.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(s, Ke.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: e, to: t }, n = 0) {
    if (!this.inView)
      return !0;
    let { top: s } = this.heightMap.lineAt(e, Ke.ByPos, this.heightOracle, 0, 0), { bottom: r } = this.heightMap.lineAt(t, Ke.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: l } = this;
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
      t.touchesRange(s.from, s.to) || n.push(new Ga(t.mapPos(s.from), t.mapPos(s.to), s.size, s.displaySize));
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
    if (this.defaultTextDirection != ft.LTR && !n)
      return [];
    let l = [], a = (c, f, u, p) => {
      if (f - c < r)
        return;
      let O = this.state.selection.main, g = [O.from];
      O.empty || g.push(O.to);
      for (let v of g)
        if (v > c && v < f) {
          a(c, v - 10, u, p), a(v + 10, f, u, p);
          return;
        }
      let m = fx(e, (v) => v.from >= u.from && v.to <= u.to && Math.abs(v.from - c) < r && Math.abs(v.to - f) < r && !g.some((S) => v.from < S && v.to > S));
      if (!m) {
        if (f < u.to && t && n && t.visibleRanges.some((x) => x.from <= f && x.to >= f)) {
          let x = t.moveToLineBoundary(B.cursor(f), !1, !0).head;
          x > c && (f = x);
        }
        let v = this.gapSize(u, c, f, p), S = n || v < 2e6 ? v : 2e6;
        m = new Ga(c, f, v, S);
      }
      l.push(m);
    }, h = (c) => {
      if (c.length < o || c.type != Si.Text)
        return;
      let f = cx(c.from, c.to, this.stateDeco);
      if (f.total < o)
        return;
      let u = this.scrollTarget ? this.scrollTarget.range.head : null, p, O;
      if (n) {
        let g = s / this.heightOracle.lineLength * this.heightOracle.lineHeight, m, v;
        if (u != null) {
          let S = Go(f, u), x = ((this.visibleBottom - this.visibleTop) / 2 + g) / c.height;
          m = S - x, v = S + x;
        } else
          m = (this.visibleTop - c.top - g) / c.height, v = (this.visibleBottom - c.top + g) / c.height;
        p = Bo(f, m), O = Bo(f, v);
      } else {
        let g = f.total * this.heightOracle.charWidth, m = s * this.heightOracle.charWidth, v = 0;
        if (g > 2e6)
          for (let R of e)
            R.from >= c.from && R.from < c.to && R.size != R.displaySize && R.from * this.heightOracle.charWidth + v < this.pixelViewport.left && (v = R.size - R.displaySize);
        let S = this.pixelViewport.left + v, x = this.pixelViewport.right + v, P, E;
        if (u != null) {
          let R = Go(f, u), C = ((x - S) / 2 + m) / g;
          P = R - C, E = R + C;
        } else
          P = (S - m) / g, E = (x + m) / g;
        p = Bo(f, P), O = Bo(f, E);
      }
      p > c.from && a(c.from, p, c, f), O < c.to && a(O, c.to, c, f);
    };
    for (let c of this.viewportLines)
      Array.isArray(c.type) ? c.type.forEach(h) : h(c);
    return l;
  }
  gapSize(e, t, n, s) {
    let r = Go(s, n) - Go(s, t);
    return this.heightOracle.lineWrapping ? e.height * r : s.total * this.heightOracle.charWidth * r;
  }
  updateLineGaps(e) {
    Ga.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = Ge.set(e.map((t) => t.draw(this, this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges(e) {
    let t = this.stateDeco;
    this.lineGaps.length && (t = t.concat(this.lineGapDeco));
    let n = [];
    Ye.spans(t, this.viewport.from, this.viewport.to, {
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
    return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || zr(this.heightMap.lineAt(e, Ke.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(e) {
    return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || zr(this.heightMap.lineAt(this.scaler.fromDOM(e), Ke.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  getScrollOffset() {
    return (this.scrollParent == this.view.scrollDOM ? this.scrollParent.scrollTop : (this.scrollParent ? this.scrollParent.getBoundingClientRect().top : 0) - this.view.contentDOM.getBoundingClientRect().top) * this.scaleY;
  }
  scrollAnchorAt(e) {
    let t = this.lineBlockAtHeight(e + 8);
    return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
  }
  elementAtHeight(e) {
    return zr(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class Vo {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
function cx(i, e, t) {
  let n = [], s = i, r = 0;
  return Ye.spans(t, i, e, {
    span() {
    },
    point(o, l) {
      o > s && (n.push({ from: s, to: o }), r += o - s), s = l;
    }
  }, 20), s < e && (n.push({ from: s, to: e }), r += e - s), { total: r, ranges: n };
}
function Bo({ total: i, ranges: e }, t) {
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
function Go(i, e) {
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
function fx(i, e) {
  for (let t of i)
    if (e(t))
      return t;
}
const Lu = {
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
function Iu(i) {
  let e = i.facet(ca).filter((n) => typeof n != "function"), t = i.facet(tf).filter((n) => typeof n != "function");
  return t.length && e.push(Ye.join(t)), e;
}
class of {
  constructor(e, t, n) {
    let s = 0, r = 0, o = 0;
    this.viewports = n.map(({ from: l, to: a }) => {
      let h = t.lineAt(l, Ke.ByPos, e, 0, 0).top, c = t.lineAt(a, Ke.ByPos, e, 0, 0).bottom;
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
    return e instanceof of ? this.scale == e.scale && this.viewports.length == e.viewports.length && this.viewports.every((t, n) => t.from == e.viewports[n].from && t.to == e.viewports[n].to) : !1;
  }
}
function zr(i, e) {
  if (e.scale == 1)
    return i;
  let t = e.toDOM(i.top), n = e.toDOM(i.bottom);
  return new Ei(i.from, i.length, t, n - t, Array.isArray(i._content) ? i._content.map((s) => zr(s, e)) : i._content);
}
const Uo = /* @__PURE__ */ ge.define({ combine: (i) => i.join(" ") }), sc = /* @__PURE__ */ ge.define({ combine: (i) => i.indexOf(!0) > -1 }), rc = /* @__PURE__ */ ur.newName(), ag = /* @__PURE__ */ ur.newName(), hg = /* @__PURE__ */ ur.newName(), cg = { "&light": "." + ag, "&dark": "." + hg };
function oc(i, e, t) {
  return new ur(e, {
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
const ux = /* @__PURE__ */ oc("." + rc, {
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
}, cg), dx = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, Ua = re.ie && re.ie_version <= 11;
class px {
  constructor(e) {
    this.view = e, this.active = !1, this.editContext = null, this.selectionRange = new zy(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
      for (let n of t)
        this.queue.push(n);
      (re.ie && re.ie_version <= 11 || re.ios && e.composing) && t.some((n) => n.type == "childList" && n.removedNodes.length || n.type == "characterData" && n.oldValue.length > n.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), window.EditContext && re.android && e.constructor.EDIT_CONTEXT !== !1 && // Chrome <126 doesn't support inverted selections in edit context (#1392)
    !(re.chrome && re.chrome_version < 126) && (this.editContext = new gx(e), e.state.facet(vn) && (e.contentDOM.editContext = this.editContext.editContext)), Ua && (this.onCharData = (t) => {
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
    if (n.state.facet(vn) ? n.root.activeElement != this.dom : !Hr(this.dom, s))
      return;
    let r = s.anchorNode && n.docView.tile.nearest(s.anchorNode);
    if (r && r.isWidget() && r.widget.ignoreEvent(e)) {
      t || (this.selectionChanged = !1);
      return;
    }
    (re.ie && re.ie_version <= 11 || re.android && re.chrome) && !n.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    s.focusNode && Jr(s.focusNode, s.focusOffset, s.anchorNode, s.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: e } = this, t = co(e.root);
    if (!t)
      return !1;
    let n = re.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && Ox(this.view, t) || t;
    if (!n || this.selectionRange.eq(n))
      return !1;
    let s = Hr(this.dom, n);
    return s && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && Yy(this.dom, n) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(n), s && (this.selectionChanged = !0), !0);
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
    this.active || (this.observer.observe(this.dom, dx), Ua && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), Ua && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
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
        r && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = r.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && r.force && Vs(this.dom, r.key, r.keyCode));
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
    let { from: e, to: t, typeOver: n } = this.processRecords(), s = this.selectionChanged && Hr(this.dom, this.selectionRange);
    if (e < 0 && !s)
      return null;
    e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
    let r = new Ew(this.view, e, t, n);
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
    let n = this.view.state, s = HO(this.view, t);
    return this.view.state == n && (t.domChanged || t.newSel && !Al(this.view.state.selection, t.newSel.main)) && this.view.update([]), s;
  }
  readMutation(e) {
    let t = this.view.docView.tile.nearest(e.target);
    if (!t || t.isWidget())
      return null;
    if (t.markDirty(e.type == "attributes"), e.type == "childList") {
      let n = Du(t, e.previousSibling || e.target.previousSibling, -1), s = Du(t, e.nextSibling || e.target.nextSibling, 1);
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
    this.editContext && (this.editContext.update(e), e.startState.facet(vn) != e.state.facet(vn) && (e.view.contentDOM.editContext = e.state.facet(vn) ? this.editContext.editContext : null));
  }
  destroy() {
    var e, t, n;
    this.stop(), (e = this.intersection) === null || e === void 0 || e.disconnect(), (t = this.gapIntersection) === null || t === void 0 || t.disconnect(), (n = this.resizeScroll) === null || n === void 0 || n.disconnect();
    for (let s of this.scrollTargets)
      s.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
  }
}
function Du(i, e, t) {
  for (; e; ) {
    let n = ut.get(e);
    if (n && n.parent == i)
      return n;
    let s = e.parentNode;
    e = s != i.dom ? s : t > 0 ? e.nextSibling : e.previousSibling;
  }
  return null;
}
function zu(i, e) {
  let t = e.startContainer, n = e.startOffset, s = e.endContainer, r = e.endOffset, o = i.docView.domAtPos(i.state.selection.main.anchor, 1);
  return Jr(o.node, o.offset, s, r) && ([t, n, s, r] = [s, r, t, n]), { anchorNode: t, anchorOffset: n, focusNode: s, focusOffset: r };
}
function Ox(i, e) {
  if (e.getComposedRanges) {
    let s = e.getComposedRanges(i.root)[0];
    if (s)
      return zu(i, s);
  }
  let t = null;
  function n(s) {
    s.preventDefault(), s.stopImmediatePropagation(), t = s.getTargetRanges()[0];
  }
  return i.contentDOM.addEventListener("beforeinput", n, !0), i.dom.ownerDocument.execCommand("indent"), i.contentDOM.removeEventListener("beforeinput", n, !0), t ? zu(i, t) : null;
}
class gx {
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
      let c = KO(e.state.sliceDoc(l, a), n.text, (h ? s.from : s.to) - l, h ? "end" : null);
      if (!c) {
        let u = B.single(this.toEditorPos(n.selectionStart), this.toEditorPos(n.selectionEnd));
        Al(u, s) || e.dispatch({ selection: u, userEvent: "select" });
        return;
      }
      let f = {
        from: c.from + l,
        to: c.toA + l,
        insert: je.of(n.text.slice(c.from, c.toB).split(`
`))
      };
      if ((re.mac || re.android) && f.from == o - 1 && /^\. ?$/.test(n.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (f = { from: l, to: a, insert: je.of([n.text.replace(".", " ")]) }), this.pendingContextChange = f, !e.state.readOnly) {
        let u = this.to - this.from + (f.to - f.from + f.insert.length);
        sf(e, f, B.single(this.toEditorPos(n.selectionStart, u), this.toEditorPos(n.selectionEnd, u)));
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
            s.push(Ge.mark({ attributes: { style: c } }).range(a, h));
          }
        }
      }
      e.dispatch({ effects: NO.of(Ge.set(s)) });
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
      let s = co(n.root);
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
class Oe {
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
    this.dispatchTransactions = e.dispatchTransactions || n && ((s) => s.forEach((r) => n(r, this))) || ((s) => this.update(s)), this.dispatch = this.dispatch.bind(this), this._root = e.root || Ny(e.parent) || document, this.viewState = new ju(this, e.state || ze.create(e)), e.scrollTo && e.scrollTo.is(Yo) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(Ls).map((s) => new Ya(s));
    for (let s of this.plugins)
      s.update(this);
    this.observer = new px(this), this.inputState = new Xw(this), this.inputState.ensureHandlers(this.plugins), this.docView = new ku(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((t = document.fonts) === null || t === void 0) && t.ready && document.fonts.ready.then(() => {
      this.viewState.mustMeasureContent = "refresh", this.requestMeasure();
    });
  }
  dispatch(...e) {
    let t = e.length == 1 && e[0] instanceof bt ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [this.state.update(...e)];
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
    for (let u of e) {
      if (u.startState != r)
        throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
      r = u.state;
    }
    if (this.destroyed) {
      this.viewState.state = r;
      return;
    }
    let o = this.hasFocus, l = 0, a = null;
    e.some((u) => u.annotation(sg)) ? (this.inputState.notifiedFocused = o, l = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, a = rg(r, o), a || (l = 1));
    let h = this.observer.delayedAndroidKey, c = null;
    if (h ? (this.observer.clearDelayedAndroidKey(), c = this.observer.readChange(), (c && !this.state.doc.eq(r.doc) || !this.state.selection.eq(r.selection)) && (c = null)) : this.observer.clear(), r.facet(ze.phrases) != this.state.facet(ze.phrases))
      return this.setState(r);
    s = Cl.create(this, r, e), s.flags |= l;
    let f = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let u of e) {
        if (f && (f = f.map(u.changes)), u.scrollIntoView) {
          let { main: p } = u.state.selection, { x: O, y: g } = this.state.facet(Oe.cursorScrollMargin);
          f = new Bs(p.empty ? p : B.cursor(p.head, p.head > p.anchor ? -1 : 1), "nearest", "nearest", g, O);
        }
        for (let p of u.effects)
          p.is(Yo) && (f = p.value.clip(this.state));
      }
      this.viewState.update(s, f), this.bidiCache = Ml.update(this.bidiCache, s.changes), s.empty || (this.updatePlugins(s), this.inputState.update(s)), t = this.docView.update(s), this.state.facet(Dr) != this.styleModules && this.mountStyles(), n = this.updateAttrs(), this.showAnnouncements(e), this.docView.updateSelection(t, e.some((u) => u.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (s.startState.facet(Uo) != s.state.facet(Uo) && (this.viewState.mustMeasureContent = !0), (t || n || f || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), t && this.docViewUpdate(), !s.empty)
      for (let u of this.state.facet(ec))
        try {
          u(s);
        } catch (p) {
          ai(this.state, p, "update listener");
        }
    (a || c) && Promise.resolve().then(() => {
      a && this.state == a.startState && this.dispatch(a), c && !HO(this, c) && h.force && Vs(this.contentDOM, h.key, h.keyCode);
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
      this.viewState = new ju(this, e), this.plugins = e.facet(Ls).map((n) => new Ya(n)), this.pluginMap.clear();
      for (let n of this.plugins)
        n.update(this);
      this.docView.destroy(), this.docView = new ku(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    t && this.focus(), this.requestMeasure();
  }
  updatePlugins(e) {
    let t = e.startState.facet(Ls), n = e.state.facet(Ls);
    if (t != n) {
      let s = [];
      for (let r of n) {
        let o = t.indexOf(r);
        if (o < 0)
          s.push(new Ya(r));
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
          ai(this.state, n, "doc view update listener");
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
          if ($O(n || this.win))
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
            return ai(this.state, O), Nu;
          }
        }), f = Cl.create(this, this.state, []), u = !1;
        f.flags |= a, t ? t.flags |= a : t = f, this.updateState = 2, f.empty || (this.updatePlugins(f), this.inputState.update(f), this.updateAttrs(), u = this.docView.update(f), u && this.docViewUpdate());
        for (let p = 0; p < h.length; p++)
          if (c[p] != Nu)
            try {
              let O = h[p];
              O.write && O.write(c[p], this);
            } catch (O) {
              ai(this.state, O);
            }
        if (u && this.docView.updateSelection(!0), !f.viewportChanged && this.measureRequests.length == 0) {
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
      for (let l of this.state.facet(ec))
        l(t);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return rc + " " + (this.state.facet(sc) ? hg : ag) + " " + this.state.facet(Uo);
  }
  updateAttrs() {
    let e = Yu(this, YO, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), t = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      writingsuggestions: "false",
      translate: "no",
      contenteditable: this.state.facet(vn) ? "true" : "false",
      class: "cm-content",
      style: `${re.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (t["aria-readonly"] = "true"), Yu(this, ef, t);
    let n = this.observer.ignore(() => {
      let s = vu(this.contentDOM, this.contentAttrs, t), r = vu(this.dom, this.editorAttrs, e);
      return s || r;
    });
    return this.editorAttrs = e, this.contentAttrs = t, n;
  }
  showAnnouncements(e) {
    let t = !0;
    for (let n of e)
      for (let s of n.effects)
        if (s.is(Oe.announce)) {
          t && (this.announceDOM.textContent = ""), t = !1;
          let r = this.announceDOM.appendChild(document.createElement("div"));
          r.textContent = s.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(Dr);
    let e = this.state.facet(Oe.cspNonce);
    ur.mount(this.root, this.styleModules.concat(ux).reverse(), e ? { nonce: e } : void 0);
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
    return Ba(this, e, Qu(this, e, t, n));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(e, t) {
    return Ba(this, e, Qu(this, e, t, (n) => $w(this, e.head, n)));
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
    return Qw(this, e, t, n);
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
    return Ba(this, e, _w(this, e, t, n));
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
    let n = ic(this, e, t);
    return n && n.pos;
  }
  posAndSideAtCoords(e, t = !0) {
    return this.readMeasured(), ic(this, e, t);
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
    let n = this.state.doc.lineAt(e), s = this.bidiSpans(n), r = s[tn.find(s, e - n.from, -1, t)];
    return this.docView.coordsAt(e, t, r.dir == ft.RTL);
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
    return !this.state.facet(DO) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
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
    if (e.length > mx)
      return EO(e.length);
    let t = this.textDirectionAt(e.from), n;
    for (let r of this.bidiCache)
      if (r.from == e.from && r.dir == t && (r.fresh || ZO(r.isolates, n = wu(this, e))))
        return r.order;
    n || (n = wu(this, e));
    let s = Fy(e.text, t, n);
    return this.bidiCache.push(new Ml(e.from, e.to, t, n, !0, s)), s;
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
      QO(this.contentDOM), this.docView.updateSelection();
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
    return Yo.of(new Bs(typeof e == "number" ? B.cursor(e) : e, (n = t.y) !== null && n !== void 0 ? n : "nearest", (s = t.x) !== null && s !== void 0 ? s : "nearest", (r = t.yMargin) !== null && r !== void 0 ? r : 5, (o = t.xMargin) !== null && o !== void 0 ? o : 5));
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
    return Yo.of(new Bs(B.cursor(n.from), "start", "start", n.top - e, t, !0));
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
    return an.define(() => ({}), { eventHandlers: e });
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
    return an.define(() => ({}), { eventObservers: e });
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
    let n = ur.newName(), s = [Uo.of(n), Dr.of(oc(`.${n}`, e))];
    return t && t.dark && s.push(sc.of(!0)), s;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(e) {
    return Po.lowest(Dr.of(oc("." + rc, e, cg)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(e) {
    var t;
    let n = e.querySelector(".cm-content"), s = n && ut.get(n) || ut.get(e);
    return ((t = s == null ? void 0 : s.root) === null || t === void 0 ? void 0 : t.view) || null;
  }
}
Oe.styleModule = Dr;
Oe.inputHandler = LO;
Oe.clipboardInputFilter = Kc;
Oe.clipboardOutputFilter = Jc;
Oe.scrollHandler = zO;
Oe.focusChangeEffect = IO;
Oe.perLineTextDirection = DO;
Oe.exceptionSink = jO;
Oe.updateListener = ec;
Oe.editable = vn;
Oe.mouseSelectionStyle = XO;
Oe.dragMovesSelection = MO;
Oe.clickAddsSelectionRange = RO;
Oe.decorations = ca;
Oe.blockWrappers = WO;
Oe.outerDecorations = tf;
Oe.atomicRanges = Zo;
Oe.bidiIsolatedRanges = qO;
Oe.cursorScrollMargin = /* @__PURE__ */ ge.define({
  combine: (i) => {
    let e = 5, t = 5;
    for (let n of i)
      typeof n == "number" ? e = t = n : { x: e, y: t } = n;
    return { x: e, y: t };
  }
});
Oe.scrollMargins = VO;
Oe.darkTheme = sc;
Oe.cspNonce = /* @__PURE__ */ ge.define({ combine: (i) => i.length ? i[0] : "" });
Oe.contentAttributes = ef;
Oe.editorAttributes = YO;
Oe.lineWrapping = /* @__PURE__ */ Oe.contentAttributes.of({ class: "cm-lineWrapping" });
Oe.announce = /* @__PURE__ */ Ve.define();
const mx = 4096, Nu = {};
class Ml {
  constructor(e, t, n, s, r, o) {
    this.from = e, this.to = t, this.dir = n, this.isolates = s, this.fresh = r, this.order = o;
  }
  static update(e, t) {
    if (t.empty && !e.some((r) => r.fresh))
      return e;
    let n = [], s = e.length ? e[e.length - 1].dir : ft.LTR;
    for (let r = Math.max(0, e.length - 10); r < e.length; r++) {
      let o = e[r];
      o.dir == s && !t.touchesRange(o.from, o.to) && n.push(new Ml(t.mapPos(o.from, 1), t.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
    }
    return n;
  }
}
function Yu(i, e, t) {
  for (let n = i.state.facet(e), s = n.length - 1; s >= 0; s--) {
    let r = n[s], o = typeof r == "function" ? r(i) : r;
    o && Uc(o, t);
  }
  return t;
}
const vx = re.mac ? "mac" : re.windows ? "win" : re.linux ? "linux" : "key";
function bx(i, e) {
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
function Fo(i, e, t) {
  return e.altKey && (i = "Alt-" + i), e.ctrlKey && (i = "Ctrl-" + i), e.metaKey && (i = "Meta-" + i), t !== !1 && e.shiftKey && (i = "Shift-" + i), i;
}
const yx = /* @__PURE__ */ Po.default(/* @__PURE__ */ Oe.domEventHandlers({
  keydown(i, e) {
    return kx(wx(e.state), i, e, "editor");
  }
})), pa = /* @__PURE__ */ ge.define({ enables: yx }), Wu = /* @__PURE__ */ new WeakMap();
function wx(i) {
  let e = i.facet(pa), t = Wu.get(e);
  return t || Wu.set(e, t = Sx(e.reduce((n, s) => n.concat(s), []))), t;
}
let Rn = null;
const xx = 4e3;
function Sx(i, e = vx) {
  let t = /* @__PURE__ */ Object.create(null), n = /* @__PURE__ */ Object.create(null), s = (o, l) => {
    let a = n[o];
    if (a == null)
      n[o] = l;
    else if (a != l)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, r = (o, l, a, h, c) => {
    var f, u;
    let p = t[o] || (t[o] = /* @__PURE__ */ Object.create(null)), O = l.split(/ (?!$)/).map((v) => bx(v, e));
    for (let v = 1; v < O.length; v++) {
      let S = O.slice(0, v).join(" ");
      s(S, !0), p[S] || (p[S] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [(x) => {
          let P = Rn = { view: x, prefix: S, scope: o };
          return setTimeout(() => {
            Rn == P && (Rn = null);
          }, xx), !0;
        }]
      });
    }
    let g = O.join(" ");
    s(g, !1);
    let m = p[g] || (p[g] = {
      preventDefault: !1,
      stopPropagation: !1,
      run: ((u = (f = p._any) === null || f === void 0 ? void 0 : f.run) === null || u === void 0 ? void 0 : u.slice()) || []
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
        for (let u in c)
          c[u].run.push((p) => f(p, lc));
      }
    let a = o[e] || o.key;
    if (a)
      for (let h of l)
        r(h, a, o.run, o.preventDefault, o.stopPropagation), o.shift && r(h, "Shift-" + a, o.shift, o.preventDefault, o.stopPropagation);
  }
  return t;
}
let lc = null;
function kx(i, e, t, n) {
  lc = e;
  let s = My(e), r = Kn(s, 0), o = Rs(r) == s.length && s != " ", l = "", a = !1, h = !1, c = !1;
  Rn && Rn.view == t && Rn.scope == n && (l = Rn.prefix + " ", eg.indexOf(e.keyCode) < 0 && (h = !0, Rn = null));
  let f = /* @__PURE__ */ new Set(), u = (m) => {
    if (m) {
      for (let v of m.run)
        if (!f.has(v) && (f.add(v), v(t)))
          return m.stopPropagation && (c = !0), !0;
      m.preventDefault && (m.stopPropagation && (c = !0), h = !0);
    }
    return !1;
  }, p = i[n], O, g;
  return p && (u(p[l + Fo(s, e, !o)]) ? a = !0 : o && (e.altKey || e.metaKey || e.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(re.windows && e.ctrlKey && e.altKey) && // Alt-combinations on macOS tend to be typed characters
  !(re.mac && e.altKey && !(e.ctrlKey || e.metaKey)) && (O = Vn[e.keyCode]) && O != s ? (u(p[l + Fo(O, e, !0)]) || e.shiftKey && (g = ao[e.keyCode]) != s && g != O && u(p[l + Fo(g, e, !1)])) && (a = !0) : o && e.shiftKey && u(p[l + Fo(s, e, !0)]) && (a = !0), !a && u(p._any) && (a = !0)), h && (a = !0), a && c && e.stopPropagation(), lc = null, a;
}
class Qx extends Sr {
  constructor(e) {
    super(), this.content = e;
  }
  toDOM(e) {
    let t = document.createElement("span");
    return t.className = "cm-placeholder", t.style.pointerEvents = "none", t.appendChild(typeof this.content == "string" ? document.createTextNode(this.content) : typeof this.content == "function" ? this.content(e) : this.content.cloneNode(!0)), t.setAttribute("aria-hidden", "true"), t;
  }
  coordsAt(e) {
    let t = e.firstChild ? Kr(e.firstChild) : [];
    if (!t.length)
      return null;
    let n = window.getComputedStyle(e.parentNode), s = fo(t[0], n.direction != "rtl"), r = parseInt(n.lineHeight);
    return s.bottom - s.top > r * 1.5 ? { left: s.left, right: s.right, top: s.top, bottom: s.top + r } : s;
  }
  ignoreEvent() {
    return !1;
  }
}
function $x(i) {
  let e = an.fromClass(class {
    constructor(t) {
      this.view = t, this.placeholder = i ? Ge.set([Ge.widget({ widget: new Qx(i), side: 1 }).range(0)]) : Ge.none;
    }
    get decorations() {
      return this.view.state.doc.length ? Ge.none : this.placeholder;
    }
  }, { decorations: (t) => t.decorations });
  return typeof i == "string" ? [
    e,
    Oe.contentAttributes.of({ "aria-placeholder": i })
  ] : e;
}
const Ho = "-10000px";
class _x {
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
          let u = this.tooltips[f];
          u && u.create == h.create && (c = f);
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
function Px(i) {
  let e = i.dom.ownerDocument.documentElement;
  return { top: 0, left: 0, bottom: e.clientHeight, right: e.clientWidth };
}
const Fa = /* @__PURE__ */ ge.define({
  combine: (i) => {
    var e, t, n;
    return {
      position: re.ios ? "absolute" : ((e = i.find((s) => s.position)) === null || e === void 0 ? void 0 : e.position) || "fixed",
      parent: ((t = i.find((s) => s.parent)) === null || t === void 0 ? void 0 : t.parent) || null,
      tooltipSpace: ((n = i.find((s) => s.tooltipSpace)) === null || n === void 0 ? void 0 : n.tooltipSpace) || Px
    };
  }
}), qu = /* @__PURE__ */ new WeakMap(), fg = /* @__PURE__ */ an.fromClass(class {
  constructor(i) {
    this.view = i, this.above = [], this.inView = !0, this.madeAbsolute = !1, this.lastTransaction = 0, this.measureTimeout = -1;
    let e = i.state.facet(Fa);
    this.position = e.position, this.parent = e.parent, this.classes = i.themeClasses, this.createContainer(), this.measureReq = { read: this.readMeasure.bind(this), write: this.writeMeasure.bind(this), key: this }, this.resizeObserver = typeof ResizeObserver == "function" ? new ResizeObserver(() => this.measureSoon()) : null, this.manager = new _x(i, ug, (t, n) => this.createTooltip(t, n), (t) => {
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
    let t = e || i.geometryChanged, n = i.state.facet(Fa);
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
    return t.dom.style.position = this.position, t.dom.style.top = Ho, t.dom.style.left = "0px", this.container.insertBefore(t.dom, n), t.mount && t.mount(this.view), this.resizeObserver && this.resizeObserver.observe(t.dom), t;
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
    let n = this.view.scrollDOM.getBoundingClientRect(), s = nf(this.view);
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
      space: this.view.state.facet(Fa).tooltipSpace(this.view),
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
      let a = this.manager.tooltips[l], h = this.manager.tooltipViews[l], { dom: c } = h, f = i.pos[l], u = i.size[l];
      if (!f || a.clip !== !1 && (f.bottom <= Math.max(t.top, n.top) || f.top >= Math.min(t.bottom, n.bottom) || f.right < Math.max(t.left, n.left) - 0.1 || f.left > Math.min(t.right, n.right) + 0.1)) {
        c.style.top = Ho;
        continue;
      }
      let p = a.arrow ? h.dom.querySelector(".cm-tooltip-arrow") : null, O = p ? 7 : 0, g = u.right - u.left, m = (e = qu.get(h)) !== null && e !== void 0 ? e : u.bottom - u.top, v = h.offset || Cx, S = this.view.textDirection == ft.LTR, x = u.width > n.right - n.left ? S ? n.left : n.right - u.width : S ? Math.max(n.left, Math.min(f.left - (p ? 14 : 0) + v.x, n.right - g)) : Math.min(Math.max(n.left, f.left - g + (p ? 14 : 0) - v.x), n.right - g), P = this.above[l];
      !a.strictSide && (P ? f.top - m - O - v.y < n.top : f.bottom + m + O + v.y > n.bottom) && P == n.bottom - f.bottom > f.top - n.top && (P = this.above[l] = !P);
      let E = (P ? f.top - n.top : n.bottom - f.bottom) - O;
      if (E < m && h.resize !== !1) {
        if (E < this.view.defaultLineHeight) {
          c.style.top = Ho;
          continue;
        }
        qu.set(h, m), c.style.height = (m = E) / r + "px";
      } else c.style.height && (c.style.height = "");
      let R = P ? f.top - m - O - v.y : f.bottom + O + v.y, C = x + g;
      if (h.overlap !== !0)
        for (let Y of o)
          Y.left < C && Y.right > x && Y.top < R + m && Y.bottom > R && (R = P ? Y.top - m - 2 - O : Y.bottom + O + 2);
      if (this.position == "absolute" ? (c.style.top = (R - i.parent.top) / r + "px", Vu(c, (x - i.parent.left) / s)) : (c.style.top = R / r + "px", Vu(c, x / s)), p) {
        let Y = f.left + (S ? v.x : -v.x) - (x + 14 - 7);
        p.style.left = Y / s + "px";
      }
      h.overlap !== !0 && o.push({ left: x, top: R, right: C, bottom: R + m }), c.classList.toggle("cm-tooltip-above", P), c.classList.toggle("cm-tooltip-below", !P), h.positioned && h.positioned(i.space);
    }
  }
  maybeMeasure() {
    if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView)))
      for (let i of this.manager.tooltipViews)
        i.dom.style.top = Ho;
  }
}, {
  eventObservers: {
    scroll() {
      this.maybeMeasure();
    }
  }
});
function Vu(i, e) {
  let t = parseInt(i.style.left, 10);
  (isNaN(t) || Math.abs(e - t) > 1) && (i.style.left = e + "px");
}
const Tx = /* @__PURE__ */ Oe.baseTheme({
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
}), Cx = { x: 0, y: 0 }, ug = /* @__PURE__ */ ge.define({
  enables: [fg, Tx]
});
function dg(i, e) {
  let t = i.plugin(fg);
  if (!t)
    return null;
  let n = t.manager.tooltips.indexOf(e);
  return n < 0 ? null : t.manager.tooltipViews[n];
}
class gr extends qn {
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
gr.prototype.elementClass = "";
gr.prototype.toDOM = void 0;
gr.prototype.mapMode = Lt.TrackBefore;
gr.prototype.startSide = gr.prototype.endSide = -1;
gr.prototype.point = !0;
const pg = 1024;
let Zx = 0;
class Ha {
  constructor(e, t) {
    this.from = e, this.to = t;
  }
}
class Ce {
  /**
  Create a new node prop type.
  */
  constructor(e = {}) {
    this.id = Zx++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
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
    return typeof e != "function" && (e = ei.match(e)), (t) => {
      let n = e(t);
      return n === void 0 ? null : [this, n];
    };
  }
}
Ce.closedBy = new Ce({ deserialize: (i) => i.split(" ") });
Ce.openedBy = new Ce({ deserialize: (i) => i.split(" ") });
Ce.group = new Ce({ deserialize: (i) => i.split(" ") });
Ce.isolate = new Ce({ deserialize: (i) => {
  if (i && i != "rtl" && i != "ltr" && i != "auto")
    throw new RangeError("Invalid value for isolate: " + i);
  return i || "auto";
} });
Ce.contextHash = new Ce({ perNode: !0 });
Ce.lookAhead = new Ce({ perNode: !0 });
Ce.mounted = new Ce({ perNode: !0 });
class to {
  constructor(e, t, n, s = !1) {
    this.tree = e, this.overlay = t, this.parser = n, this.bracketed = s;
  }
  /**
  @internal
  */
  static get(e) {
    return e && e.props && e.props[Ce.mounted.id];
  }
}
const Ex = /* @__PURE__ */ Object.create(null);
class ei {
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
    let t = e.props && e.props.length ? /* @__PURE__ */ Object.create(null) : Ex, n = (e.top ? 1 : 0) | (e.skipped ? 2 : 0) | (e.error ? 4 : 0) | (e.name == null ? 8 : 0), s = new ei(e.name || "", t, e.id, n);
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
      let t = this.prop(Ce.group);
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
      for (let s = n.prop(Ce.group), r = -1; r < (s ? s.length : 0); r++) {
        let o = t[r < 0 ? n.name : s[r]];
        if (o)
          return o;
      }
    };
  }
}
ei.none = new ei(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* NodeFlag.Anonymous */
);
class lf {
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
      t.push(s ? new ei(n.name, s, n.id, n.flags) : n);
    }
    return new lf(t);
  }
}
const Ko = /* @__PURE__ */ new WeakMap(), Bu = /* @__PURE__ */ new WeakMap();
var rt;
(function(i) {
  i[i.ExcludeBuffers = 1] = "ExcludeBuffers", i[i.IncludeAnonymous = 2] = "IncludeAnonymous", i[i.IgnoreMounts = 4] = "IgnoreMounts", i[i.IgnoreOverlays = 8] = "IgnoreOverlays", i[i.EnterBracketed = 16] = "EnterBracketed";
})(rt || (rt = {}));
class gt {
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
    let e = to.get(this);
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
    return new hc(this.topNode, e);
  }
  /**
  Get a [tree cursor](#common.TreeCursor) pointing into this tree
  at the given position and side (see
  [`moveTo`](#common.TreeCursor.moveTo).
  */
  cursorAt(e, t = 0, n = 0) {
    let s = Ko.get(this) || this.topNode, r = new hc(s);
    return r.moveTo(e, t), Ko.set(this, r._tree), r;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) object for the top of the
  tree.
  */
  get topNode() {
    return new Jt(this, 0, 0, null);
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
    let n = po(Ko.get(this) || this.topNode, e, t, !1);
    return Ko.set(this, n), n;
  }
  /**
  Like [`resolve`](#common.Tree.resolve), but will enter
  [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  pointing into the innermost overlaid tree at the given position
  (with parent links going through all parent structure, including
  the host trees).
  */
  resolveInner(e, t = 0) {
    let n = po(Bu.get(this) || this.topNode, e, t, !0);
    return Bu.set(this, n), n;
  }
  /**
  In some situations, it can be useful to iterate through all
  nodes around a position, including those in overlays that don't
  directly cover the position. This method gives you an iterator
  that will produce all nodes, from small to big, around the given
  position.
  */
  resolveStack(e, t = 0) {
    return Mx(this, e, t);
  }
  /**
  Iterate over the tree and its children, calling `enter` for any
  node that touches the `from`/`to` region (if given) before
  running over such a node's children, and `leave` (if given) when
  leaving the node. When `enter` returns `false`, that node will
  not have its children iterated over (or `leave` called).
  */
  iterate(e) {
    let { enter: t, leave: n, from: s = 0, to: r = this.length } = e, o = e.mode || 0, l = (o & rt.IncludeAnonymous) > 0;
    for (let a = this.cursor(o | rt.IncludeAnonymous); ; ) {
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
    return this.children.length <= 8 ? this : cf(ei.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, n, s) => new gt(this.type, t, n, s, this.propValues), e.makeTree || ((t, n, s) => new gt(ei.none, t, n, s)));
  }
  /**
  Build a tree from a postfix-ordered buffer of node information,
  or a cursor over such a buffer.
  */
  static build(e) {
    return Xx(e);
  }
}
gt.empty = new gt(ei.none, [], [], 0);
class af {
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
    return new af(this.buffer, this.index);
  }
}
class Gn {
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
    return ei.none;
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
    for (let a = e; a != t && !(Og(r, s, o[a + 1], o[a + 2]) && (l = a, n > 0)); a = o[a + 3])
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
    return new Gn(r, o, this.set);
  }
}
function Og(i, e, t, n) {
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
function po(i, e, t, n) {
  for (var s; i.from == i.to || (t < 1 ? i.from >= e : i.from > e) || (t > -1 ? i.to <= e : i.to < e); ) {
    let o = !n && i instanceof Jt && i.index < 0 ? null : i.parent;
    if (!o)
      return i;
    i = o;
  }
  let r = n ? 0 : rt.IgnoreOverlays;
  if (n)
    for (let o = i, l = o.parent; l; o = l, l = o.parent)
      o instanceof Jt && o.index < 0 && ((s = l.enter(e, t, r)) === null || s === void 0 ? void 0 : s.from) != o.from && (i = l);
  for (; ; ) {
    let o = i.enter(e, t, r);
    if (!o)
      return i;
    i = o;
  }
}
class gg {
  cursor(e = 0) {
    return new hc(this, e);
  }
  getChild(e, t = null, n = null) {
    let s = Gu(this, e, t, n);
    return s.length ? s[0] : null;
  }
  getChildren(e, t = null, n = null) {
    return Gu(this, e, t, n);
  }
  resolve(e, t = 0) {
    return po(this, e, t, !1);
  }
  resolveInner(e, t = 0) {
    return po(this, e, t, !0);
  }
  matchContext(e) {
    return ac(this.parent, e);
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
class Jt extends gg {
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
        let c = l[e], f = a[e] + o.from, u;
        if (!(!(r & rt.EnterBracketed && c instanceof gt && (u = to.get(c)) && !u.overlay && u.bracketed && n >= f && n <= f + c.length) && !Og(s, n, f, f + c.length))) {
          if (c instanceof Gn) {
            if (r & rt.ExcludeBuffers)
              continue;
            let p = c.findChild(0, c.buffer.length, t, n - f, s);
            if (p > -1)
              return new nn(new Ax(o, c, e, f), null, p);
          } else if (r & rt.IncludeAnonymous || !c.type.isAnonymous || hf(c)) {
            let p;
            if (!(r & rt.IgnoreMounts) && (p = to.get(c)) && !p.overlay)
              return new Jt(p.tree, f, e, o);
            let O = new Jt(c, f, e, o);
            return r & rt.IncludeAnonymous || !O.type.isAnonymous ? O : O.nextChild(t < 0 ? c.children.length - 1 : 0, t, n, s, r);
          }
        }
      }
      if (r & rt.IncludeAnonymous || !o.type.isAnonymous || (o.index >= 0 ? e = o.index + t : e = t < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o))
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
    if (!(n & rt.IgnoreOverlays) && (s = to.get(this._tree)) && s.overlay) {
      let r = e - this.from, o = n & rt.EnterBracketed && s.bracketed;
      for (let { from: l, to: a } of s.overlay)
        if ((t > 0 || o ? l <= r : l < r) && (t < 0 || o ? a >= r : a > r))
          return new Jt(s.tree, s.overlay[0].from + this.from, -1, this);
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
function Gu(i, e, t, n) {
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
function ac(i, e, t = e.length - 1) {
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
class Ax {
  constructor(e, t, n, s) {
    this.parent = e, this.buffer = t, this.index = n, this.start = s;
  }
}
class nn extends gg {
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
    return r < 0 ? null : new nn(this.context, this, r);
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
    if (n & rt.ExcludeBuffers)
      return null;
    let { buffer: s } = this.context, r = s.findChild(this.index + 4, s.buffer[this.index + 3], t > 0 ? 1 : -1, e - this.context.start, t);
    return r < 0 ? null : new nn(this.context, this, r);
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
    return t < (this._parent ? e.buffer[this._parent.index + 3] : e.buffer.length) ? new nn(this.context, this._parent, t) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: e } = this.context, t = this._parent ? this._parent.index + 4 : 0;
    return this.index == t ? this.externalSibling(-1) : new nn(this.context, this._parent, e.findChild(
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
    return new gt(this.type, e, t, this.to - this.from);
  }
  /**
  @internal
  */
  toString() {
    return this.context.buffer.childString(this.index);
  }
}
function mg(i) {
  if (!i.length)
    return null;
  let e = 0, t = i[0];
  for (let r = 1; r < i.length; r++) {
    let o = i[r];
    (o.from > t.from || o.to < t.to) && (t = o, e = r);
  }
  let n = t instanceof Jt && t.index < 0 ? null : t.parent, s = i.slice();
  return n ? s[e] = n : s.splice(e, 1), new Rx(s, t);
}
class Rx {
  constructor(e, t) {
    this.heads = e, this.node = t;
  }
  get next() {
    return mg(this.heads);
  }
}
function Mx(i, e, t) {
  let n = i.resolveInner(e, t), s = null;
  for (let r = n instanceof Jt ? n : n.context.parent; r; r = r.parent)
    if (r.index < 0) {
      let o = r.parent;
      (s || (s = [n])).push(o.resolve(e, t)), r = o;
    } else {
      let o = to.get(r.tree);
      if (o && o.overlay && o.overlay[0].from <= e && o.overlay[o.overlay.length - 1].to >= e) {
        let l = new Jt(o.tree, o.overlay[0].from + r.from, -1, r);
        (s || (s = [n])).push(po(l, e, t, !1));
      }
    }
  return s ? mg(s) : n;
}
class hc {
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
    if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~rt.EnterBracketed, e instanceof Jt)
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
    return e ? e instanceof Jt ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
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
    return this.buffer ? n & rt.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, n));
  }
  /**
  Move to the node's parent node, if this isn't the top node.
  */
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & rt.IncludeAnonymous ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let e = this.mode & rt.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
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
          if (this.mode & rt.IncludeAnonymous || l instanceof Gn || !l.type.isAnonymous || hf(l))
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
      t = new nn(this.buffer, t, this.stack[s]);
    return this.bufferNode = new nn(this.buffer, t, this.index);
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
      return ac(this.node.parent, e);
    let { buffer: t } = this.buffer, { types: n } = t.set;
    for (let s = e.length - 1, r = this.stack.length - 1; s >= 0; r--) {
      if (r < 0)
        return ac(this._tree, e, s);
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
function hf(i) {
  return i.children.some((e) => e instanceof Gn || !e.type.isAnonymous || hf(e));
}
function Xx(i) {
  var e;
  let { buffer: t, nodeSet: n, maxBufferLength: s = pg, reused: r = [], minRepeatType: o = n.types.length } = i, l = Array.isArray(t) ? new af(t, t.length) : t, a = n.types, h = 0, c = 0;
  function f(E, R, C, Y, L, X) {
    let { id: M, start: k, end: T, size: D } = l, $ = c, Z = h;
    if (D < 0)
      if (l.next(), D == -1) {
        let q = r[M];
        C.push(q), Y.push(k - E);
        return;
      } else if (D == -3) {
        h = M;
        return;
      } else if (D == -4) {
        c = M;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${D}`);
    let N = a[M], oe, se, G = k - E;
    if (T - k <= s && (se = m(l.pos - R, L))) {
      let q = new Uint16Array(se.size - se.skip), ie = l.pos - se.size, ae = q.length;
      for (; l.pos > ie; )
        ae = v(se.start, q, ae);
      oe = new Gn(q, T - se.start, n), G = se.start - E;
    } else {
      let q = l.pos - D;
      l.next();
      let ie = [], ae = [], fe = M >= o ? M : -1, ye = 0, ue = T;
      for (; l.pos > q; )
        fe >= 0 && l.id == fe && l.size >= 0 ? (l.end <= ue - s && (O(ie, ae, k, ye, l.end, ue, fe, $, Z), ye = ie.length, ue = l.end), l.next()) : X > 2500 ? u(k, q, ie, ae) : f(k, q, ie, ae, fe, X + 1);
      if (fe >= 0 && ye > 0 && ye < ie.length && O(ie, ae, k, ye, k, ue, fe, $, Z), ie.reverse(), ae.reverse(), fe > -1 && ye > 0) {
        let de = p(N, Z);
        oe = cf(N, ie, ae, 0, ie.length, 0, T - k, de, de);
      } else
        oe = g(N, ie, ae, T - k, $ - T, Z);
    }
    C.push(oe), Y.push(G);
  }
  function u(E, R, C, Y) {
    let L = [], X = 0, M = -1;
    for (; l.pos > R; ) {
      let { id: k, start: T, end: D, size: $ } = l;
      if ($ > 4)
        l.next();
      else {
        if (M > -1 && T < M)
          break;
        M < 0 && (M = D - s), L.push(k, T, D), X++, l.next();
      }
    }
    if (X) {
      let k = new Uint16Array(X * 4), T = L[L.length - 2];
      for (let D = L.length - 3, $ = 0; D >= 0; D -= 3)
        k[$++] = L[D], k[$++] = L[D + 1] - T, k[$++] = L[D + 2] - T, k[$++] = $;
      C.push(new Gn(k, L[2] - T, n)), Y.push(T - E);
    }
  }
  function p(E, R) {
    return (C, Y, L) => {
      let X = 0, M = C.length - 1, k, T;
      if (M >= 0 && (k = C[M]) instanceof gt) {
        if (!M && k.type == E && k.length == L)
          return k;
        (T = k.prop(Ce.lookAhead)) && (X = Y[M] + k.length + T);
      }
      return g(E, C, Y, L, X, R);
    };
  }
  function O(E, R, C, Y, L, X, M, k, T) {
    let D = [], $ = [];
    for (; E.length > Y; )
      D.push(E.pop()), $.push(R.pop() + C - L);
    E.push(g(n.types[M], D, $, X - L, k - X, T)), R.push(L - C);
  }
  function g(E, R, C, Y, L, X, M) {
    if (X) {
      let k = [Ce.contextHash, X];
      M = M ? [k].concat(M) : [k];
    }
    if (L > 25) {
      let k = [Ce.lookAhead, L];
      M = M ? [k].concat(M) : [k];
    }
    return new gt(E, R, C, Y, M);
  }
  function m(E, R) {
    let C = l.fork(), Y = 0, L = 0, X = 0, M = C.end - s, k = { size: 0, start: 0, skip: 0 };
    e: for (let T = C.pos - E; C.pos > T; ) {
      let D = C.size;
      if (C.id == R && D >= 0) {
        k.size = Y, k.start = L, k.skip = X, X += 4, Y += 4, C.next();
        continue;
      }
      let $ = C.pos - D;
      if (D < 0 || $ < T || C.start < M)
        break;
      let Z = C.id >= o ? 4 : 0, N = C.start;
      for (C.next(); C.pos > $; ) {
        if (C.size < 0)
          if (C.size == -3 || C.size == -4)
            Z += 4;
          else
            break e;
        else C.id >= o && (Z += 4);
        C.next();
      }
      L = N, Y += D, X += Z;
    }
    return (R < 0 || Y == E) && (k.size = Y, k.start = L, k.skip = X), k.size > 4 ? k : void 0;
  }
  function v(E, R, C) {
    let { id: Y, start: L, end: X, size: M } = l;
    if (l.next(), M >= 0 && Y < o) {
      let k = C;
      if (M > 4) {
        let T = l.pos - (M - 4);
        for (; l.pos > T; )
          C = v(E, R, C);
      }
      R[--C] = k, R[--C] = X - E, R[--C] = L - E, R[--C] = Y;
    } else M == -3 ? h = Y : M == -4 && (c = Y);
    return C;
  }
  let S = [], x = [];
  for (; l.pos > 0; )
    f(i.start || 0, i.bufferStart || 0, S, x, -1, 0);
  let P = (e = i.length) !== null && e !== void 0 ? e : S.length ? x[0] + S[0].length : 0;
  return new gt(a[i.topID], S.reverse(), x.reverse(), P);
}
const Uu = /* @__PURE__ */ new WeakMap();
function Ol(i, e) {
  if (!i.isAnonymous || e instanceof Gn || e.type != i)
    return 1;
  let t = Uu.get(e);
  if (t == null) {
    t = 1;
    for (let n of e.children) {
      if (n.type != i || !(n instanceof gt)) {
        t = 1;
        break;
      }
      t += Ol(i, n);
    }
    Uu.set(e, t);
  }
  return t;
}
function cf(i, e, t, n, s, r, o, l, a) {
  let h = 0;
  for (let O = n; O < s; O++)
    h += Ol(i, e[O]);
  let c = Math.ceil(
    h * 1.5 / 8
    /* Balance.BranchFactor */
  ), f = [], u = [];
  function p(O, g, m, v, S) {
    for (let x = m; x < v; ) {
      let P = x, E = g[x], R = Ol(i, O[x]);
      for (x++; x < v; x++) {
        let C = Ol(i, O[x]);
        if (R + C >= c)
          break;
        R += C;
      }
      if (x == P + 1) {
        if (R > c) {
          let C = O[P];
          p(C.children, C.positions, 0, C.children.length, g[P] + S);
          continue;
        }
        f.push(O[P]);
      } else {
        let C = g[x - 1] + O[x - 1].length - E;
        f.push(cf(i, O, g, P, x, E, C, null, a));
      }
      u.push(E + S - r);
    }
  }
  return p(e, t, n, s, 0), (l || a)(f, u, o);
}
class jx {
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
    e instanceof nn ? this.setBuffer(e.context.buffer, e.index, t) : e instanceof Jt && this.map.set(e.tree, t);
  }
  /**
  Retrieve value for this syntax node, if it exists in the map.
  */
  get(e) {
    return e instanceof nn ? this.getBuffer(e.context.buffer, e.index) : e instanceof Jt ? this.map.get(e.tree) : void 0;
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
class Os {
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
    let s = [new Os(0, e.length, e, 0, !1, n)];
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
          let u = o;
          if (a >= u.from || f <= u.to || h) {
            let p = Math.max(u.from, a) - h, O = Math.min(u.to, f) - h;
            u = p >= O ? null : new Os(p, O, u.tree, u.offset + h, l > 0, !!c);
          }
          if (u && s.push(u), o.to > f)
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
class vg {
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
    return typeof e == "string" && (e = new Lx(e)), n = n ? n.length ? n.map((s) => new Ha(s.from, s.to)) : [new Ha(0, 0)] : [new Ha(0, e.length)], this.createParse(e, t || [], n);
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
class Lx {
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
new Ce({ perNode: !0 });
let Ix = 0;
class gi {
  /**
  @internal
  */
  constructor(e, t, n, s) {
    this.name = e, this.set = t, this.base = n, this.modified = s, this.id = Ix++;
  }
  toString() {
    let { name: e } = this;
    for (let t of this.modified)
      t.name && (e = `${t.name}(${e})`);
    return e;
  }
  static define(e, t) {
    let n = typeof e == "string" ? e : "?";
    if (e instanceof gi && (t = e), t != null && t.base)
      throw new Error("Can not derive from a modified tag");
    let s = new gi(n, [], null, []);
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
    let t = new Xl(e);
    return (n) => n.modified.indexOf(t) > -1 ? n : Xl.get(n.base || n, n.modified.concat(t).sort((s, r) => s.id - r.id));
  }
}
let Dx = 0;
class Xl {
  constructor(e) {
    this.name = e, this.instances = [], this.id = Dx++;
  }
  static get(e, t) {
    if (!t.length)
      return e;
    let n = t[0].instances.find((l) => l.base == e && zx(t, l.modified));
    if (n)
      return n;
    let s = [], r = new gi(e.name, s, e, t);
    for (let l of t)
      l.instances.push(r);
    let o = Nx(t);
    for (let l of e.set)
      if (!l.modified.length)
        for (let a of o)
          s.push(Xl.get(l, a));
    return r;
  }
}
function zx(i, e) {
  return i.length == e.length && i.every((t, n) => t == e[n]);
}
function Nx(i) {
  let e = [[]];
  for (let t = 0; t < i.length; t++)
    for (let n = 0, s = e.length; n < s; n++)
      e.push(e[n].concat(i[t]));
  return e.sort((t, n) => n.length - t.length);
}
function bg(i) {
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
          let u = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(l);
          if (!u)
            throw new RangeError("Invalid path: " + s);
          if (r.push(u[0] == "*" ? "" : u[0][0] == '"' ? JSON.parse(u[0]) : u[0]), f += u[0].length, f == s.length)
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
        let c = new jl(n, o, a > 0 ? r.slice(0, a) : null);
        e[h] = c.sort(e[h]);
      }
  }
  return Yx.add(e);
}
const Yx = new Ce({
  combine(i, e) {
    let t, n, s;
    for (; i || e; ) {
      if (!i || e && i.depth >= e.depth ? (s = e, e = e.next) : (s = i, i = i.next), t && t.mode == s.mode && !s.context && !t.context)
        continue;
      let r = new jl(s.tags, s.mode, s.context);
      t ? t.next = r : n = r, t = r;
    }
    return n;
  }
});
class jl {
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
jl.empty = new jl([], 2, null);
function Wx(i, e) {
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
const ne = gi.define, Jo = ne(), Zn = ne(), Fu = ne(Zn), Hu = ne(Zn), En = ne(), el = ne(En), Ka = ne(En), Bi = ne(), Hn = ne(Bi), qi = ne(), Vi = ne(), cc = ne(), Zr = ne(cc), tl = ne(), W = {
  /**
  A comment.
  */
  comment: Jo,
  /**
  A line [comment](#highlight.tags.comment).
  */
  lineComment: ne(Jo),
  /**
  A block [comment](#highlight.tags.comment).
  */
  blockComment: ne(Jo),
  /**
  A documentation [comment](#highlight.tags.comment).
  */
  docComment: ne(Jo),
  /**
  Any kind of identifier.
  */
  name: Zn,
  /**
  The [name](#highlight.tags.name) of a variable.
  */
  variableName: ne(Zn),
  /**
  A type [name](#highlight.tags.name).
  */
  typeName: Fu,
  /**
  A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
  */
  tagName: ne(Fu),
  /**
  A property or field [name](#highlight.tags.name).
  */
  propertyName: Hu,
  /**
  An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
  */
  attributeName: ne(Hu),
  /**
  The [name](#highlight.tags.name) of a class.
  */
  className: ne(Zn),
  /**
  A label [name](#highlight.tags.name).
  */
  labelName: ne(Zn),
  /**
  A namespace [name](#highlight.tags.name).
  */
  namespace: ne(Zn),
  /**
  The [name](#highlight.tags.name) of a macro.
  */
  macroName: ne(Zn),
  /**
  A literal value.
  */
  literal: En,
  /**
  A string [literal](#highlight.tags.literal).
  */
  string: el,
  /**
  A documentation [string](#highlight.tags.string).
  */
  docString: ne(el),
  /**
  A character literal (subtag of [string](#highlight.tags.string)).
  */
  character: ne(el),
  /**
  An attribute value (subtag of [string](#highlight.tags.string)).
  */
  attributeValue: ne(el),
  /**
  A number [literal](#highlight.tags.literal).
  */
  number: Ka,
  /**
  An integer [number](#highlight.tags.number) literal.
  */
  integer: ne(Ka),
  /**
  A floating-point [number](#highlight.tags.number) literal.
  */
  float: ne(Ka),
  /**
  A boolean [literal](#highlight.tags.literal).
  */
  bool: ne(En),
  /**
  Regular expression [literal](#highlight.tags.literal).
  */
  regexp: ne(En),
  /**
  An escape [literal](#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: ne(En),
  /**
  A color [literal](#highlight.tags.literal).
  */
  color: ne(En),
  /**
  A URL [literal](#highlight.tags.literal).
  */
  url: ne(En),
  /**
  A language keyword.
  */
  keyword: qi,
  /**
  The [keyword](#highlight.tags.keyword) for the self or this
  object.
  */
  self: ne(qi),
  /**
  The [keyword](#highlight.tags.keyword) for null.
  */
  null: ne(qi),
  /**
  A [keyword](#highlight.tags.keyword) denoting some atomic value.
  */
  atom: ne(qi),
  /**
  A [keyword](#highlight.tags.keyword) that represents a unit.
  */
  unit: ne(qi),
  /**
  A modifier [keyword](#highlight.tags.keyword).
  */
  modifier: ne(qi),
  /**
  A [keyword](#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: ne(qi),
  /**
  A control-flow related [keyword](#highlight.tags.keyword).
  */
  controlKeyword: ne(qi),
  /**
  A [keyword](#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: ne(qi),
  /**
  A [keyword](#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: ne(qi),
  /**
  An operator.
  */
  operator: Vi,
  /**
  An [operator](#highlight.tags.operator) that dereferences something.
  */
  derefOperator: ne(Vi),
  /**
  Arithmetic-related [operator](#highlight.tags.operator).
  */
  arithmeticOperator: ne(Vi),
  /**
  Logical [operator](#highlight.tags.operator).
  */
  logicOperator: ne(Vi),
  /**
  Bit [operator](#highlight.tags.operator).
  */
  bitwiseOperator: ne(Vi),
  /**
  Comparison [operator](#highlight.tags.operator).
  */
  compareOperator: ne(Vi),
  /**
  [Operator](#highlight.tags.operator) that updates its operand.
  */
  updateOperator: ne(Vi),
  /**
  [Operator](#highlight.tags.operator) that defines something.
  */
  definitionOperator: ne(Vi),
  /**
  Type-related [operator](#highlight.tags.operator).
  */
  typeOperator: ne(Vi),
  /**
  Control-flow [operator](#highlight.tags.operator).
  */
  controlOperator: ne(Vi),
  /**
  Program or markup punctuation.
  */
  punctuation: cc,
  /**
  [Punctuation](#highlight.tags.punctuation) that separates
  things.
  */
  separator: ne(cc),
  /**
  Bracket-style [punctuation](#highlight.tags.punctuation).
  */
  bracket: Zr,
  /**
  Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: ne(Zr),
  /**
  Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: ne(Zr),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  paren: ne(Zr),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  brace: ne(Zr),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: Bi,
  /**
  [Content](#highlight.tags.content) that represents a heading.
  */
  heading: Hn,
  /**
  A level 1 [heading](#highlight.tags.heading).
  */
  heading1: ne(Hn),
  /**
  A level 2 [heading](#highlight.tags.heading).
  */
  heading2: ne(Hn),
  /**
  A level 3 [heading](#highlight.tags.heading).
  */
  heading3: ne(Hn),
  /**
  A level 4 [heading](#highlight.tags.heading).
  */
  heading4: ne(Hn),
  /**
  A level 5 [heading](#highlight.tags.heading).
  */
  heading5: ne(Hn),
  /**
  A level 6 [heading](#highlight.tags.heading).
  */
  heading6: ne(Hn),
  /**
  A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
  */
  contentSeparator: ne(Bi),
  /**
  [Content](#highlight.tags.content) that represents a list.
  */
  list: ne(Bi),
  /**
  [Content](#highlight.tags.content) that represents a quote.
  */
  quote: ne(Bi),
  /**
  [Content](#highlight.tags.content) that is emphasized.
  */
  emphasis: ne(Bi),
  /**
  [Content](#highlight.tags.content) that is styled strong.
  */
  strong: ne(Bi),
  /**
  [Content](#highlight.tags.content) that is part of a link.
  */
  link: ne(Bi),
  /**
  [Content](#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: ne(Bi),
  /**
  [Content](#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: ne(Bi),
  /**
  Inserted text in a change-tracking format.
  */
  inserted: ne(),
  /**
  Deleted text.
  */
  deleted: ne(),
  /**
  Changed text.
  */
  changed: ne(),
  /**
  An invalid or unsyntactic element.
  */
  invalid: ne(),
  /**
  Metadata or meta-instruction.
  */
  meta: tl,
  /**
  [Metadata](#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: ne(tl),
  /**
  [Metadata](#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: ne(tl),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](#highlight.tags.meta).
  */
  processingInstruction: ne(tl),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](#highlight.tags.name) tags.
  */
  definition: gi.defineModifier("definition"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](#highlight.tags.variableName).
  */
  constant: gi.defineModifier("constant"),
  /**
  [Modifier](#highlight.Tag^defineModifier) used to indicate that
  a [variable](#highlight.tags.variableName) or [property
  name](#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: gi.defineModifier("function"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that can be applied to
  [names](#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: gi.defineModifier("standard"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates a given
  [names](#highlight.tags.name) is local to some scope.
  */
  local: gi.defineModifier("local"),
  /**
  A generic variant [modifier](#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](#highlight.tags.string) and
  [variable name](#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: gi.defineModifier("special")
};
for (let i in W) {
  let e = W[i];
  e instanceof gi && (e.name = i);
}
Wx([
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
var Ja;
const Nr = /* @__PURE__ */ new Ce();
function yg(i) {
  return ge.define({
    combine: i ? (e) => e.concat(i) : void 0
  });
}
const ff = /* @__PURE__ */ new Ce();
class sn {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(e, t, n = [], s = "") {
    this.data = e, this.name = s, ze.prototype.hasOwnProperty("tree") || Object.defineProperty(ze.prototype, "tree", { get() {
      return $i(this);
    } }), this.parser = t, this.extension = [
      vr.of(this),
      ze.languageData.of((r, o, l) => {
        let a = Ku(r, o, l), h = a.type.prop(Nr);
        if (!h)
          return [];
        let c = r.facet(h), f = a.type.prop(ff);
        if (f) {
          let u = a.resolve(o - a.from, l);
          for (let p of f)
            if (p.test(u, r)) {
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
    return Ku(e, t, n).type.prop(Nr) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(e) {
    let t = e.facet(vr);
    if ((t == null ? void 0 : t.data) == this.data)
      return [{ from: 0, to: e.doc.length }];
    if (!t || !t.allowsNesting)
      return [];
    let n = [], s = (r, o) => {
      if (r.prop(Nr) == this.data) {
        n.push({ from: o, to: o + r.length });
        return;
      }
      let l = r.prop(Ce.mounted);
      if (l) {
        if (l.tree.prop(Nr) == this.data) {
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
        h instanceof gt && s(h, r.positions[a] + o);
      }
    };
    return s($i(e), 0), n;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
sn.setState = /* @__PURE__ */ Ve.define();
function Ku(i, e, t) {
  let n = i.facet(vr), s = $i(i).topNode;
  if (!n || n.allowsNesting)
    for (let r = s; r; r = r.enter(e, t, rt.ExcludeBuffers | rt.EnterBracketed))
      r.type.isTop && (s = r);
  return s;
}
class Ll extends sn {
  constructor(e, t, n) {
    super(e, t, [], n), this.parser = t;
  }
  /**
  Define a language from a parser.
  */
  static define(e) {
    let t = yg(e.languageData);
    return new Ll(t, e.parser.configure({
      props: [Nr.add((n) => n.isTop ? t : void 0)]
    }), e.name);
  }
  /**
  Create a new instance of this language with a reconfigured
  version of its parser and optionally a new name.
  */
  configure(e, t) {
    return new Ll(this.data, this.parser.configure(e), t || this.name);
  }
  get allowsNesting() {
    return this.parser.hasWrappers();
  }
}
function $i(i) {
  let e = i.field(sn.state, !1);
  return e ? e.tree : gt.empty;
}
class qx {
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
let Er = null;
class Il {
  constructor(e, t, n = [], s, r, o, l, a) {
    this.parser = e, this.state = t, this.fragments = n, this.tree = s, this.treeLen = r, this.viewport = o, this.skipped = l, this.scheduleOn = a, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(e, t, n) {
    return new Il(e, t, [], gt.empty, 0, n, [], null);
  }
  startParse() {
    return this.parser.startParse(new qx(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(e, t) {
    return t != null && t >= this.state.doc.length && (t = void 0), this.tree != gt.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var n;
      if (typeof e == "number") {
        let s = Date.now() + e;
        e = () => Date.now() > s;
      }
      for (this.parse || (this.parse = this.startParse()), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t); ; ) {
        let s = this.parse.advance();
        if (s)
          if (this.fragments = this.withoutTempSkipped(Os.addTree(s, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (n = this.parse.stoppedAt) !== null && n !== void 0 ? n : this.state.doc.length, this.tree = s, this.parse = null, this.treeLen < (t ?? this.state.doc.length))
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
    }), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(Os.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(e) {
    let t = Er;
    Er = this;
    try {
      return e();
    } finally {
      Er = t;
    }
  }
  withoutTempSkipped(e) {
    for (let t; t = this.tempSkipped.pop(); )
      e = Ju(e, t.from, t.to);
    return e;
  }
  /**
  @internal
  */
  changes(e, t) {
    let { fragments: n, tree: s, treeLen: r, viewport: o, skipped: l } = this;
    if (this.takeTree(), !e.empty) {
      let a = [];
      if (e.iterChangedRanges((h, c, f, u) => a.push({ fromA: h, toA: c, fromB: f, toB: u })), n = Os.applyChanges(n, a), s = gt.empty, r = 0, o = { from: e.mapPos(o.from, -1), to: e.mapPos(o.to, 1) }, this.skipped.length) {
        l = [];
        for (let h of this.skipped) {
          let c = e.mapPos(h.from, 1), f = e.mapPos(h.to, -1);
          c < f && l.push({ from: c, to: f });
        }
      }
    }
    return new Il(this.parser, t, n, s, r, o, l, this.scheduleOn);
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
      s < e.to && r > e.from && (this.fragments = Ju(this.fragments, s, r), this.skipped.splice(n--, 1));
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
    return new class extends vg {
      createParse(t, n, s) {
        let r = s[0].from, o = s[s.length - 1].to;
        return {
          parsedPos: r,
          advance() {
            let a = Er;
            if (a) {
              for (let h of s)
                a.tempSkipped.push(h);
              e && (a.scheduleOn = a.scheduleOn ? Promise.all([a.scheduleOn, e]) : e);
            }
            return this.parsedPos = o, new gt(ei.none, [], [], o - r);
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
    return Er;
  }
}
function Ju(i, e, t) {
  return Os.applyChanges(i, [{ fromA: e, toA: t, fromB: e, toB: t }]);
}
class mr {
  constructor(e) {
    this.context = e, this.tree = e.tree;
  }
  apply(e) {
    if (!e.docChanged && this.tree == this.context.tree)
      return this;
    let t = this.context.changes(e.changes, e.state), n = this.context.treeLen == e.startState.doc.length ? void 0 : Math.max(e.changes.mapPos(this.context.treeLen), t.viewport.to);
    return t.work(20, n) || t.takeTree(), new mr(t);
  }
  static init(e) {
    let t = Math.min(3e3, e.doc.length), n = Il.create(e.facet(vr).parser, e, { from: 0, to: t });
    return n.work(20, t) || n.takeTree(), new mr(n);
  }
}
sn.state = /* @__PURE__ */ cn.define({
  create: mr.init,
  update(i, e) {
    for (let t of e.effects)
      if (t.is(sn.setState))
        return t.value;
    return e.startState.facet(vr) != e.state.facet(vr) ? mr.init(e.state) : i.apply(e);
  }
});
let wg = (i) => {
  let e = setTimeout(
    () => i(),
    500
    /* Work.MaxPause */
  );
  return () => clearTimeout(e);
};
typeof requestIdleCallback < "u" && (wg = (i) => {
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
const eh = typeof navigator < "u" && (!((Ja = navigator.scheduling) === null || Ja === void 0) && Ja.isInputPending) ? () => navigator.scheduling.isInputPending() : null, Vx = /* @__PURE__ */ an.fromClass(class {
  constructor(e) {
    this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(e) {
    let t = this.view.state.field(sn.state).context;
    (t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: e } = this.view, t = e.field(sn.state);
    (t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = wg(this.work));
  }
  work(e) {
    this.working = null;
    let t = Date.now();
    if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: n, viewport: { to: s } } = this.view, r = n.field(sn.state);
    if (r.tree == r.context.tree && r.context.isDone(
      s + 1e5
      /* Work.MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, e && !eh ? Math.max(25, e.timeRemaining() - 5) : 1e9), l = r.context.treeLen < s && n.doc.length > s + 1e3, a = r.context.work(() => eh && eh() || Date.now() > o, s + (l ? 0 : 1e5));
    this.chunkBudget -= Date.now() - t, (a || this.chunkBudget <= 0) && (r.context.takeTree(), this.view.dispatch({ effects: sn.setState.of(new mr(r.context)) })), this.chunkBudget > 0 && !(a && !l) && this.scheduleWork(), this.checkAsyncSchedule(r.context);
  }
  checkAsyncSchedule(e) {
    e.scheduleOn && (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((t) => ai(this.view.state, t)).then(() => this.workScheduled--), e.scheduleOn = null);
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
}), vr = /* @__PURE__ */ ge.define({
  combine(i) {
    return i.length ? i[0] : null;
  },
  enables: (i) => [
    sn.state,
    Vx,
    Oe.contentAttributes.compute([i], (e) => {
      let t = e.facet(i);
      return t && t.name ? { "data-language": t.name } : {};
    })
  ]
});
class Bx {
  /**
  Create a language support object.
  */
  constructor(e, t = []) {
    this.language = e, this.support = t, this.extension = [e, t];
  }
}
const Gx = /* @__PURE__ */ ge.define(), Oa = /* @__PURE__ */ ge.define({
  combine: (i) => {
    if (!i.length)
      return "  ";
    let e = i[0];
    if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(i[0]));
    return e;
  }
});
function Dl(i) {
  let e = i.facet(Oa);
  return e.charCodeAt(0) == 9 ? i.tabSize * e.length : e.length;
}
function zl(i, e) {
  let t = "", n = i.tabSize, s = i.facet(Oa)[0];
  if (s == "	") {
    for (; e >= n; )
      t += "	", e -= n;
    s = " ";
  }
  for (let r = 0; r < e; r++)
    t += s;
  return t;
}
function xg(i, e) {
  i instanceof ze && (i = new ga(i));
  for (let n of i.state.facet(Gx)) {
    let s = n(i, e);
    if (s !== void 0)
      return s;
  }
  let t = $i(i.state);
  return t.length >= e ? Ux(i, t, e) : null;
}
class ga {
  /**
  Create an indent context.
  */
  constructor(e, t = {}) {
    this.state = e, this.options = t, this.unit = Dl(e);
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
    return aa(e, this.state.tabSize, t);
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
const Sg = /* @__PURE__ */ new Ce();
function Ux(i, e, t) {
  let n = e.resolveStack(t), s = e.resolveInner(t, -1).resolve(t, 0).enterUnfinishedNodesBefore(t);
  if (s != n.node) {
    let r = [];
    for (let o = s; o && !(o.from < n.node.from || o.to > n.node.to || o.from == n.node.from && o.type == n.node.type); o = o.parent)
      r.push(o);
    for (let o = r.length - 1; o >= 0; o--)
      n = { node: r[o], next: n };
  }
  return kg(n, i, t);
}
function kg(i, e, t) {
  for (let n = i; n; n = n.next) {
    let s = Hx(n.node);
    if (s)
      return s(uf.create(e, t, n));
  }
  return 0;
}
function Fx(i) {
  return i.pos == i.options.simulateBreak && i.options.simulateDoubleBreak;
}
function Hx(i) {
  let e = i.type.prop(Sg);
  if (e)
    return e;
  let t = i.firstChild, n;
  if (t && (n = t.type.prop(Ce.closedBy))) {
    let s = i.lastChild, r = s && n.indexOf(s.name) > -1;
    return (o) => Qg(o, !0, 1, void 0, r && !Fx(o) ? s.from : void 0);
  }
  return i.parent == null ? Kx : null;
}
function Kx() {
  return 0;
}
class uf extends ga {
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
    return new uf(e, t, n);
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
      if (Jx(n, e))
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
    return kg(this.context.next, this.base, this.pos);
  }
}
function Jx(i, e) {
  for (let t = e; t; t = t.parent)
    if (i == t)
      return !0;
  return !1;
}
function eS(i) {
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
function tS({ closing: i, align: e = !0, units: t = 1 }) {
  return (n) => Qg(n, e, t, i);
}
function Qg(i, e, t, n, s) {
  let r = i.textAfter, o = r.match(/^\s*/)[0].length, l = n && r.slice(o, o + n.length) == n || s == i.pos + o, a = e ? eS(i) : null;
  return a ? l ? i.column(a.from) : i.column(a.to) : i.baseIndent + (l ? 0 : i.unit * t);
}
const iS = (i) => i.baseIndent;
function th({ except: i, units: e = 1 } = {}) {
  return (t) => {
    let n = i && i.test(t.textAfter);
    return t.baseIndent + (n ? 0 : e * t.unit);
  };
}
const nS = /* @__PURE__ */ new Ce();
function sS(i) {
  let e = i.firstChild, t = i.lastChild;
  return e && e.to < t.from ? { from: e.to, to: t.type.isError ? i.to : t.from } : null;
}
const rS = /* @__PURE__ */ Oe.baseTheme({
  "&.cm-focused .cm-matchingBracket": { backgroundColor: "#328c8252" },
  "&.cm-focused .cm-nonmatchingBracket": { backgroundColor: "#bb555544" }
}), $g = 1e4, _g = "()[]{}", Pg = /* @__PURE__ */ ge.define({
  combine(i) {
    return Vc(i, {
      afterCursor: !0,
      brackets: _g,
      maxScanDistance: $g,
      renderMatch: aS
    });
  }
}), oS = /* @__PURE__ */ Ge.mark({ class: "cm-matchingBracket" }), lS = /* @__PURE__ */ Ge.mark({ class: "cm-nonmatchingBracket" });
function aS(i) {
  let e = [], t = i.matched ? oS : lS;
  return e.push(t.range(i.start.from, i.start.to)), i.end && e.push(t.range(i.end.from, i.end.to)), e;
}
function ed(i) {
  let e = [], t = i.facet(Pg);
  for (let n of i.selection.ranges) {
    if (!n.empty)
      continue;
    let s = rn(i, n.head, -1, t) || n.head > 0 && rn(i, n.head - 1, 1, t) || t.afterCursor && (rn(i, n.head, 1, t) || n.head < i.doc.length && rn(i, n.head + 1, -1, t));
    s && (e = e.concat(t.renderMatch(s, i)));
  }
  return Ge.set(e, !0);
}
const hS = /* @__PURE__ */ an.fromClass(class {
  constructor(i) {
    this.paused = !1, this.decorations = ed(i.state);
  }
  update(i) {
    (i.docChanged || i.selectionSet || this.paused) && (i.view.composing ? (this.decorations = this.decorations.map(i.changes), this.paused = !0) : (this.decorations = ed(i.state), this.paused = !1));
  }
}, {
  decorations: (i) => i.decorations
}), cS = [
  hS,
  rS
];
function fS(i = {}) {
  return [Pg.of(i), cS];
}
const uS = /* @__PURE__ */ new Ce();
function fc(i, e, t) {
  let n = i.prop(e < 0 ? Ce.openedBy : Ce.closedBy);
  if (n)
    return n;
  if (i.name.length == 1) {
    let s = t.indexOf(i.name);
    if (s > -1 && s % 2 == (e < 0 ? 1 : 0))
      return [t[s + e]];
  }
  return null;
}
function uc(i) {
  let e = i.type.prop(uS);
  return e ? e(i.node) : i;
}
function rn(i, e, t, n = {}) {
  let s = n.maxScanDistance || $g, r = n.brackets || _g, o = $i(i), l = o.resolveInner(e, t);
  for (let a = l; a; a = a.parent) {
    let h = fc(a.type, t, r);
    if (h && a.from < a.to) {
      let c = uc(a);
      if (c && (t > 0 ? e >= c.from && e < c.to : e > c.from && e <= c.to))
        return dS(i, e, t, a, c, h, r);
    }
  }
  return pS(i, e, t, o, l.type, s, r);
}
function dS(i, e, t, n, s, r, o) {
  let l = n.parent, a = { from: s.from, to: s.to }, h = 0, c = l == null ? void 0 : l.cursor();
  if (c && (t < 0 ? c.childBefore(n.from) : c.childAfter(n.to)))
    do
      if (t < 0 ? c.to <= n.from : c.from >= n.to) {
        if (h == 0 && r.indexOf(c.type.name) > -1 && c.from < c.to) {
          let f = uc(c);
          return { start: a, end: f ? { from: f.from, to: f.to } : void 0, matched: !0 };
        } else if (fc(c.type, t, o))
          h++;
        else if (fc(c.type, -t, o)) {
          if (h == 0) {
            let f = uc(c);
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
function pS(i, e, t, n, s, r, o) {
  if (t < 0 ? !e : e == i.doc.length)
    return null;
  let l = t < 0 ? i.sliceDoc(e - 1, e) : i.sliceDoc(e, e + 1), a = o.indexOf(l);
  if (a < 0 || a % 2 == 0 != t > 0)
    return null;
  let h = { from: t < 0 ? e - 1 : e, to: t > 0 ? e + 1 : e }, c = i.doc.iterRange(e, t > 0 ? i.doc.length : 0), f = 0;
  for (let u = 0; !c.next().done && u <= r; ) {
    let p = c.value;
    t < 0 && (u += p.length);
    let O = e + u * t;
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
    t > 0 && (u += p.length);
  }
  return c.done ? { start: h, matched: !1 } : null;
}
const OS = /* @__PURE__ */ Object.create(null), td = [ei.none], id = [], nd = /* @__PURE__ */ Object.create(null), gS = /* @__PURE__ */ Object.create(null);
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
  gS[i] = /* @__PURE__ */ mS(OS, e);
function ih(i, e) {
  id.indexOf(i) > -1 || (id.push(i), console.warn(e));
}
function mS(i, e) {
  let t = [];
  for (let l of e.split(" ")) {
    let a = [];
    for (let h of l.split(".")) {
      let c = i[h] || W[h];
      c ? typeof c == "function" ? a.length ? a = a.map(c) : ih(h, `Modifier ${h} used at start of tag`) : a.length ? ih(h, `Tag ${h} used as modifier`) : a = Array.isArray(c) ? c : [c] : ih(h, `Unknown highlighting tag ${h}`);
    }
    for (let h of a)
      t.push(h);
  }
  if (!t.length)
    return 0;
  let n = e.replace(/ /g, "_"), s = n + " " + t.map((l) => l.id), r = nd[s];
  if (r)
    return r.id;
  let o = nd[s] = ei.define({
    id: td.length,
    name: n,
    props: [bg({ [n]: t })]
  });
  return td.push(o), o.id;
}
ft.RTL, ft.LTR;
const vS = (i) => {
  let { state: e } = i, t = e.doc.lineAt(e.selection.main.from), n = pf(i.state, t.from);
  return n.line ? bS(i) : n.block ? wS(i) : !1;
};
function df(i, e) {
  return ({ state: t, dispatch: n }) => {
    if (t.readOnly)
      return !1;
    let s = i(e, t);
    return s ? (n(t.update(s)), !0) : !1;
  };
}
const bS = /* @__PURE__ */ df(
  kS,
  0
  /* CommentOption.Toggle */
), yS = /* @__PURE__ */ df(
  Tg,
  0
  /* CommentOption.Toggle */
), wS = /* @__PURE__ */ df(
  (i, e) => Tg(i, e, SS(e)),
  0
  /* CommentOption.Toggle */
);
function pf(i, e) {
  let t = i.languageDataAt("commentTokens", e, 1);
  return t.length ? t[0] : {};
}
const Ar = 50;
function xS(i, { open: e, close: t }, n, s) {
  let r = i.sliceDoc(n - Ar, n), o = i.sliceDoc(s, s + Ar), l = /\s*$/.exec(r)[0].length, a = /^\s*/.exec(o)[0].length, h = r.length - l;
  if (r.slice(h - e.length, h) == e && o.slice(a, a + t.length) == t)
    return {
      open: { pos: n - l, margin: l && 1 },
      close: { pos: s + a, margin: a && 1 }
    };
  let c, f;
  s - n <= 2 * Ar ? c = f = i.sliceDoc(n, s) : (c = i.sliceDoc(n, n + Ar), f = i.sliceDoc(s - Ar, s));
  let u = /^\s*/.exec(c)[0].length, p = /\s*$/.exec(f)[0].length, O = f.length - p - t.length;
  return c.slice(u, u + e.length) == e && f.slice(O, O + t.length) == t ? {
    open: {
      pos: n + u + e.length,
      margin: /\s/.test(c.charAt(u + e.length)) ? 1 : 0
    },
    close: {
      pos: s - p - t.length,
      margin: /\s/.test(f.charAt(O - 1)) ? 1 : 0
    }
  } : null;
}
function SS(i) {
  let e = [];
  for (let t of i.selection.ranges) {
    let n = i.doc.lineAt(t.from), s = t.to <= n.to ? n : i.doc.lineAt(t.to);
    s.from > n.from && s.from == t.to && (s = t.to == n.to + 1 ? n : i.doc.lineAt(t.to - 1));
    let r = e.length - 1;
    r >= 0 && e[r].to > n.from ? e[r].to = s.to : e.push({ from: n.from + /^\s*/.exec(n.text)[0].length, to: s.to });
  }
  return e;
}
function Tg(i, e, t = e.selection.ranges) {
  let n = t.map((r) => pf(e, r.from).block);
  if (!n.every((r) => r))
    return null;
  let s = t.map((r, o) => xS(e, n[o], r.from, r.to));
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
function kS(i, e, t = e.selection.ranges) {
  let n = [], s = -1;
  e: for (let { from: r, to: o } of t) {
    let l = n.length, a = 1e9, h;
    for (let c = r; c <= o; ) {
      let f = e.doc.lineAt(c);
      if (h == null && (h = pf(e, f.from).line, !h))
        continue e;
      if (f.from > s && (r == o || o > f.from)) {
        s = f.from;
        let u = /^\s*/.exec(f.text)[0].length, p = u == f.length, O = f.text.slice(u, u + h.length) == h ? u : -1;
        u < f.text.length && u < a && (a = u), n.push({ line: f, comment: O, token: h, indent: u, empty: p, single: !1 });
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
const dc = /* @__PURE__ */ _n.define(), QS = /* @__PURE__ */ _n.define(), $S = /* @__PURE__ */ ge.define(), Cg = /* @__PURE__ */ ge.define({
  combine(i) {
    return Vc(i, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (e, t) => t
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (e, t) => (n, s) => e(n, s) || t(n, s)
    });
  }
}), Zg = /* @__PURE__ */ cn.define({
  create() {
    return on.empty;
  },
  update(i, e) {
    let t = e.state.facet(Cg), n = e.annotation(dc);
    if (n) {
      let a = Ht.fromTransaction(e, n.selection), h = n.side, c = h == 0 ? i.undone : i.done;
      return a ? c = Nl(c, c.length, t.minDepth, a) : c = Rg(c, e.startState.selection), new on(h == 0 ? n.rest : c, h == 0 ? c : n.rest);
    }
    let s = e.annotation(QS);
    if ((s == "full" || s == "before") && (i = i.isolate()), e.annotation(bt.addToHistory) === !1)
      return e.changes.empty ? i : i.addMapping(e.changes.desc);
    let r = Ht.fromTransaction(e), o = e.annotation(bt.time), l = e.annotation(bt.userEvent);
    return r ? i = i.addChanges(r, o, l, t, e) : e.selection && (i = i.addSelection(e.startState.selection, o, l, t.newGroupDelay)), (s == "full" || s == "after") && (i = i.isolate()), i;
  },
  toJSON(i) {
    return { done: i.done.map((e) => e.toJSON()), undone: i.undone.map((e) => e.toJSON()) };
  },
  fromJSON(i) {
    return new on(i.done.map(Ht.fromJSON), i.undone.map(Ht.fromJSON));
  }
});
function _S(i = {}) {
  return [
    Zg,
    Cg.of(i),
    Oe.domEventHandlers({
      beforeinput(e, t) {
        let n = e.inputType == "historyUndo" ? Eg : e.inputType == "historyRedo" ? pc : null;
        return n ? (e.preventDefault(), n(t)) : !1;
      }
    })
  ];
}
function ma(i, e) {
  return function({ state: t, dispatch: n }) {
    if (!e && t.readOnly)
      return !1;
    let s = t.field(Zg, !1);
    if (!s)
      return !1;
    let r = s.pop(i, t, e);
    return r ? (n(r), !0) : !1;
  };
}
const Eg = /* @__PURE__ */ ma(0, !1), pc = /* @__PURE__ */ ma(1, !1), PS = /* @__PURE__ */ ma(0, !0), TS = /* @__PURE__ */ ma(1, !0);
class Ht {
  constructor(e, t, n, s, r) {
    this.changes = e, this.effects = t, this.mapped = n, this.startSelection = s, this.selectionsAfter = r;
  }
  setSelAfter(e) {
    return new Ht(this.changes, this.effects, this.mapped, this.startSelection, e);
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
    return new Ht(e.changes && xt.fromJSON(e.changes), [], e.mapped && ln.fromJSON(e.mapped), e.startSelection && B.fromJSON(e.startSelection), e.selectionsAfter.map(B.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(e, t) {
    let n = vi;
    for (let s of e.startState.facet($S)) {
      let r = s(e);
      r.length && (n = n.concat(r));
    }
    return !n.length && e.changes.empty ? null : new Ht(e.changes.invert(e.startState.doc), n, void 0, t || e.startState.selection, vi);
  }
  static selection(e) {
    return new Ht(void 0, vi, void 0, void 0, e);
  }
}
function Nl(i, e, t, n) {
  let s = e + 1 > t + 20 ? e - t - 1 : 0, r = i.slice(s, e);
  return r.push(n), r;
}
function CS(i, e) {
  let t = [], n = !1;
  return i.iterChangedRanges((s, r) => t.push(s, r)), e.iterChangedRanges((s, r, o, l) => {
    for (let a = 0; a < t.length; ) {
      let h = t[a++], c = t[a++];
      l >= h && o <= c && (n = !0);
    }
  }), n;
}
function ZS(i, e) {
  return i.ranges.length == e.ranges.length && i.ranges.filter((t, n) => t.empty != e.ranges[n].empty).length === 0;
}
function Ag(i, e) {
  return i.length ? e.length ? i.concat(e) : i : e;
}
const vi = [], ES = 200;
function Rg(i, e) {
  if (i.length) {
    let t = i[i.length - 1], n = t.selectionsAfter.slice(Math.max(0, t.selectionsAfter.length - ES));
    return n.length && n[n.length - 1].eq(e) ? i : (n.push(e), Nl(i, i.length - 1, 1e9, t.setSelAfter(n)));
  } else
    return [Ht.selection([e])];
}
function AS(i) {
  let e = i[i.length - 1], t = i.slice();
  return t[i.length - 1] = e.setSelAfter(e.selectionsAfter.slice(0, e.selectionsAfter.length - 1)), t;
}
function nh(i, e) {
  if (!i.length)
    return i;
  let t = i.length, n = vi;
  for (; t; ) {
    let s = RS(i[t - 1], e, n);
    if (s.changes && !s.changes.empty || s.effects.length) {
      let r = i.slice(0, t);
      return r[t - 1] = s, r;
    } else
      e = s.mapped, t--, n = s.selectionsAfter;
  }
  return n.length ? [Ht.selection(n)] : vi;
}
function RS(i, e, t) {
  let n = Ag(i.selectionsAfter.length ? i.selectionsAfter.map((l) => l.map(e)) : vi, t);
  if (!i.changes)
    return Ht.selection(n);
  let s = i.changes.map(e), r = e.mapDesc(i.changes, !0), o = i.mapped ? i.mapped.composeDesc(r) : r;
  return new Ht(s, Ve.mapEffects(i.effects, e), o, i.startSelection.map(r), n);
}
const MS = /^(input\.type|delete)($|\.)/;
class on {
  constructor(e, t, n = 0, s = void 0) {
    this.done = e, this.undone = t, this.prevTime = n, this.prevUserEvent = s;
  }
  isolate() {
    return this.prevTime ? new on(this.done, this.undone) : this;
  }
  addChanges(e, t, n, s, r) {
    let o = this.done, l = o[o.length - 1];
    return l && l.changes && !l.changes.empty && e.changes && (!n || MS.test(n)) && (!l.selectionsAfter.length && t - this.prevTime < s.newGroupDelay && s.joinToEvent(r, CS(l.changes, e.changes)) || // For compose (but not compose.start) events, always join with previous event
    n == "input.type.compose") ? o = Nl(o, o.length - 1, s.minDepth, new Ht(e.changes.compose(l.changes), Ag(Ve.mapEffects(e.effects, l.changes), l.effects), l.mapped, l.startSelection, vi)) : o = Nl(o, o.length, s.minDepth, e), new on(o, vi, t, n);
  }
  addSelection(e, t, n, s) {
    let r = this.done.length ? this.done[this.done.length - 1].selectionsAfter : vi;
    return r.length > 0 && t - this.prevTime < s && n == this.prevUserEvent && n && /^select($|\.)/.test(n) && ZS(r[r.length - 1], e) ? this : new on(Rg(this.done, e), this.undone, t, n);
  }
  addMapping(e) {
    return new on(nh(this.done, e), nh(this.undone, e), this.prevTime, this.prevUserEvent);
  }
  pop(e, t, n) {
    let s = e == 0 ? this.done : this.undone;
    if (s.length == 0)
      return null;
    let r = s[s.length - 1], o = r.selectionsAfter[0] || (r.startSelection ? r.startSelection.map(r.changes.invertedDesc, 1) : t.selection);
    if (n && r.selectionsAfter.length)
      return t.update({
        selection: r.selectionsAfter[r.selectionsAfter.length - 1],
        annotations: dc.of({ side: e, rest: AS(s), selection: o }),
        userEvent: e == 0 ? "select.undo" : "select.redo",
        scrollIntoView: !0
      });
    if (r.changes) {
      let l = s.length == 1 ? vi : s.slice(0, s.length - 1);
      return r.mapped && (l = nh(l, r.mapped)), t.update({
        changes: r.changes,
        selection: r.startSelection,
        effects: r.effects,
        annotations: dc.of({ side: e, rest: l, selection: o }),
        filter: !1,
        userEvent: e == 0 ? "undo" : "redo",
        scrollIntoView: !0
      });
    } else
      return null;
  }
}
on.empty = /* @__PURE__ */ new on(vi, vi);
const XS = [
  { key: "Mod-z", run: Eg, preventDefault: !0 },
  { key: "Mod-y", mac: "Mod-Shift-z", run: pc, preventDefault: !0 },
  { linux: "Ctrl-Shift-z", run: pc, preventDefault: !0 },
  { key: "Mod-u", run: PS, preventDefault: !0 },
  { key: "Alt-u", mac: "Mod-Shift-u", run: TS, preventDefault: !0 }
];
function kr(i, e) {
  return B.create(i.ranges.map(e), i.mainIndex);
}
function Di(i, e) {
  return i.update({ selection: e, scrollIntoView: !0, userEvent: "select" });
}
function zi({ state: i, dispatch: e }, t) {
  let n = kr(i.selection, t);
  return n.eq(i.selection, !0) ? !1 : (e(Di(i, n)), !0);
}
function va(i, e) {
  return B.cursor(e ? i.to : i.from);
}
function Mg(i, e) {
  return zi(i, (t) => t.empty ? i.moveByChar(t, e) : va(t, e));
}
function Mt(i) {
  return i.textDirectionAt(i.state.selection.main.head) == ft.LTR;
}
const Xg = (i) => Mg(i, !Mt(i)), jg = (i) => Mg(i, Mt(i));
function Lg(i, e) {
  return zi(i, (t) => t.empty ? i.moveByGroup(t, e) : va(t, e));
}
const jS = (i) => Lg(i, !Mt(i)), LS = (i) => Lg(i, Mt(i));
function IS(i, e, t) {
  if (e.type.prop(t))
    return !0;
  let n = e.to - e.from;
  return n && (n > 2 || /[^\s,.;:]/.test(i.sliceDoc(e.from, e.to))) || e.firstChild;
}
function ba(i, e, t) {
  let n = $i(i).resolveInner(e.head), s = t ? Ce.closedBy : Ce.openedBy;
  for (let a = e.head; ; ) {
    let h = t ? n.childAfter(a) : n.childBefore(a);
    if (!h)
      break;
    IS(i, h, s) ? n = h : a = t ? h.to : h.from;
  }
  let r = n.type.prop(s), o, l;
  return r && (o = t ? rn(i, n.from, 1) : rn(i, n.to, -1)) && o.matched ? l = t ? o.end.to : o.end.from : l = t ? n.to : n.from, B.cursor(l, t ? -1 : 1);
}
const DS = (i) => zi(i, (e) => ba(i.state, e, !Mt(i))), zS = (i) => zi(i, (e) => ba(i.state, e, Mt(i)));
function Ig(i, e) {
  return zi(i, (t) => {
    if (!t.empty)
      return va(t, e);
    let n = i.moveVertically(t, e);
    return n.head != t.head ? n : i.moveToLineBoundary(t, e);
  });
}
const Dg = (i) => Ig(i, !1), zg = (i) => Ig(i, !0);
function Ng(i) {
  let e = i.scrollDOM.clientHeight < i.scrollDOM.scrollHeight - 2, t = 0, n = 0, s;
  if (e) {
    for (let r of i.state.facet(Oe.scrollMargins)) {
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
function Yg(i, e) {
  let t = Ng(i), { state: n } = i, s = kr(n.selection, (o) => o.empty ? i.moveVertically(o, e, t.height) : va(o, e));
  if (s.eq(n.selection))
    return !1;
  let r;
  if (t.selfScroll) {
    let o = i.coordsAtPos(n.selection.main.head), l = i.scrollDOM.getBoundingClientRect(), a = l.top + t.marginTop, h = l.bottom - t.marginBottom;
    o && o.top > a && o.bottom < h && (r = Oe.scrollIntoView(s.main.head, { y: "start", yMargin: o.top - a }));
  }
  return i.dispatch(Di(n, s), { effects: r }), !0;
}
const sd = (i) => Yg(i, !1), Oc = (i) => Yg(i, !0);
function Un(i, e, t) {
  let n = i.lineBlockAt(e.head), s = i.moveToLineBoundary(e, t);
  if (s.head == e.head && s.head != (t ? n.to : n.from) && (s = i.moveToLineBoundary(e, t, !1)), !t && s.head == n.from && n.length) {
    let r = /^\s*/.exec(i.state.sliceDoc(n.from, Math.min(n.from + 100, n.to)))[0].length;
    r && e.head != n.from + r && (s = B.cursor(n.from + r));
  }
  return s;
}
const NS = (i) => zi(i, (e) => Un(i, e, !0)), YS = (i) => zi(i, (e) => Un(i, e, !1)), WS = (i) => zi(i, (e) => Un(i, e, !Mt(i))), qS = (i) => zi(i, (e) => Un(i, e, Mt(i))), VS = (i) => zi(i, (e) => B.cursor(i.lineBlockAt(e.head).from, 1)), BS = (i) => zi(i, (e) => B.cursor(i.lineBlockAt(e.head).to, -1));
function GS(i, e, t) {
  let n = !1, s = kr(i.selection, (r) => {
    let o = rn(i, r.head, -1) || rn(i, r.head, 1) || r.head > 0 && rn(i, r.head - 1, 1) || r.head < i.doc.length && rn(i, r.head + 1, -1);
    if (!o || !o.end)
      return r;
    n = !0;
    let l = o.start.from == r.head ? o.end.to : o.end.from;
    return B.cursor(l);
  });
  return n ? (e(Di(i, s)), !0) : !1;
}
const US = ({ state: i, dispatch: e }) => GS(i, e);
function Pi(i, e, t) {
  let n = kr(i.state.selection, (s) => {
    s.undirectional && s.head >= s.anchor != e && (s = B.range(s.head, s.anchor));
    let r = t(s);
    return B.range(s.anchor, r.head, r.goalColumn, r.bidiLevel || void 0, r.assoc);
  });
  return n.eq(i.state.selection) ? !1 : (i.dispatch(Di(i.state, n)), !0);
}
function Wg(i, e) {
  return Pi(i, e, (t) => i.moveByChar(t, e));
}
const qg = (i) => Wg(i, !Mt(i)), Vg = (i) => Wg(i, Mt(i));
function Bg(i, e) {
  return Pi(i, e, (t) => i.moveByGroup(t, e));
}
const FS = (i) => Bg(i, !Mt(i)), HS = (i) => Bg(i, Mt(i)), KS = (i) => {
  let e = !Mt(i);
  return Pi(i, e, (t) => ba(i.state, t, e));
}, JS = (i) => {
  let e = Mt(i);
  return Pi(i, e, (t) => ba(i.state, t, e));
};
function Gg(i, e) {
  return Pi(i, e, (t) => i.moveVertically(t, e));
}
const Ug = (i) => Gg(i, !1), Fg = (i) => Gg(i, !0);
function Hg(i, e) {
  return Pi(i, e, (t) => i.moveVertically(t, e, Ng(i).height));
}
const rd = (i) => Hg(i, !1), od = (i) => Hg(i, !0), ek = (i) => Pi(i, !0, (e) => Un(i, e, !0)), tk = (i) => Pi(i, !1, (e) => Un(i, e, !1)), ik = (i) => {
  let e = !Mt(i);
  return Pi(i, e, (t) => Un(i, t, e));
}, nk = (i) => {
  let e = Mt(i);
  return Pi(i, e, (t) => Un(i, t, e));
}, sk = (i) => Pi(i, !1, (e) => B.cursor(i.lineBlockAt(e.head).from)), rk = (i) => Pi(i, !0, (e) => B.cursor(i.lineBlockAt(e.head).to)), ld = ({ state: i, dispatch: e }) => (e(Di(i, { anchor: 0 })), !0), ad = ({ state: i, dispatch: e }) => (e(Di(i, { anchor: i.doc.length })), !0), hd = ({ state: i, dispatch: e }) => (e(Di(i, { anchor: i.selection.main.anchor, head: 0 })), !0), cd = ({ state: i, dispatch: e }) => (e(Di(i, { anchor: i.selection.main.anchor, head: i.doc.length })), !0), ok = ({ state: i, dispatch: e }) => (e(i.update({ selection: { anchor: 0, head: i.doc.length }, userEvent: "select" })), !0), lk = ({ state: i, dispatch: e }) => {
  let t = ya(i).map(({ from: n, to: s }) => B.range(n, Math.min(s + 1, i.doc.length)));
  return e(i.update({ selection: B.create(t), userEvent: "select" })), !0;
}, ak = ({ state: i, dispatch: e }) => {
  let t = kr(i.selection, (n) => {
    let s = $i(i), r = s.resolveStack(n.from, 1);
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
  return t.eq(i.selection) ? !1 : (e(Di(i, t)), !0);
};
function Kg(i, e) {
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
  return s.length == n.ranges.length ? !1 : (i.dispatch(Di(t, B.create(s, s.length - 1))), !0);
}
const hk = (i) => Kg(i, !1), ck = (i) => Kg(i, !0), fk = ({ state: i, dispatch: e }) => {
  let t = i.selection, n = null;
  return t.ranges.length > 1 ? n = B.create([t.main]) : t.main.empty || (n = B.create([B.cursor(t.main.head)])), n ? (e(Di(i, n)), !0) : !1;
};
function Eo(i, e) {
  if (i.state.readOnly)
    return !1;
  let t = "delete.selection", { state: n } = i, s = n.changeByRange((r) => {
    let { from: o, to: l } = r;
    if (o == l) {
      let a = e(r);
      a < o ? (t = "delete.backward", a = il(i, a, !1)) : a > o && (t = "delete.forward", a = il(i, a, !0)), o = Math.min(o, a), l = Math.max(l, a);
    } else
      o = il(i, o, !1), l = il(i, l, !0);
    return o == l ? { range: r } : { changes: { from: o, to: l }, range: B.cursor(o, o < r.head ? -1 : 1) };
  });
  return s.changes.empty ? !1 : (i.dispatch(n.update(s, {
    scrollIntoView: !0,
    userEvent: t,
    effects: t == "delete.selection" ? Oe.announce.of(n.phrase("Selection deleted")) : void 0
  })), !0);
}
function il(i, e, t) {
  if (i instanceof Oe)
    for (let n of i.state.facet(Oe.atomicRanges).map((s) => s(i)))
      n.between(e, e, (s, r) => {
        s < e && r > e && (e = t ? r : s);
      });
  return e;
}
const Jg = (i, e, t) => Eo(i, (n) => {
  let s = n.from, { state: r } = i, o = r.doc.lineAt(s), l, a;
  if (t && !e && s > o.from && s < o.from + 200 && !/[^ \t]/.test(l = o.text.slice(0, s - o.from))) {
    if (l[l.length - 1] == "	")
      return s - 1;
    let h = aa(l, r.tabSize), c = h % Dl(r) || Dl(r);
    for (let f = 0; f < c && l[l.length - 1 - f] == " "; f++)
      s--;
    a = s;
  } else
    a = Rt(o.text, s - o.from, e, e) + o.from, a == s && o.number != (e ? r.doc.lines : 1) ? a += e ? 1 : -1 : !e && /[\ufe00-\ufe0f]/.test(o.text.slice(a - o.from, s - o.from)) && (a = Rt(o.text, a - o.from, !1, !1) + o.from);
  return a;
}), gc = (i) => Jg(i, !1, !0), em = (i) => Jg(i, !0, !1), tm = (i, e) => Eo(i, (t) => {
  let n = t.head, { state: s } = i, r = s.doc.lineAt(n), o = s.charCategorizer(n);
  for (let l = null; ; ) {
    if (n == (e ? r.to : r.from)) {
      n == t.head && r.number != (e ? s.doc.lines : 1) && (n += e ? 1 : -1);
      break;
    }
    let a = Rt(r.text, n - r.from, e) + r.from, h = r.text.slice(Math.min(n, a) - r.from, Math.max(n, a) - r.from), c = o(h);
    if (l != null && c != l)
      break;
    (h != " " || n != t.head) && (l = c), n = a;
  }
  return n;
}), im = (i) => tm(i, !1), uk = (i) => tm(i, !0), dk = (i) => Eo(i, (e) => {
  let t = i.lineBlockAt(e.head).to;
  return e.head < t ? t : Math.min(i.state.doc.length, e.head + 1);
}), pk = (i) => Eo(i, (e) => {
  let t = i.moveToLineBoundary(e, !1).head;
  return e.head > t ? t : Math.max(0, e.head - 1);
}), Ok = (i) => Eo(i, (e) => {
  let t = i.moveToLineBoundary(e, !0).head;
  return e.head < t ? t : Math.min(i.state.doc.length, e.head + 1);
}), gk = ({ state: i, dispatch: e }) => {
  if (i.readOnly)
    return !1;
  let t = i.changeByRange((n) => ({
    changes: { from: n.from, to: n.to, insert: je.of(["", ""]) },
    range: B.cursor(n.from)
  }));
  return e(i.update(t, { scrollIntoView: !0, userEvent: "input" })), !0;
}, mk = ({ state: i, dispatch: e }) => {
  if (i.readOnly)
    return !1;
  let t = i.changeByRange((n) => {
    if (!n.empty || n.from == 0 || n.from == i.doc.length)
      return { range: n };
    let s = n.from, r = i.doc.lineAt(s), o = s == r.from ? s - 1 : Rt(r.text, s - r.from, !1) + r.from, l = s == r.to ? s + 1 : Rt(r.text, s - r.from, !0) + r.from;
    return {
      changes: { from: o, to: l, insert: i.doc.slice(s, l).append(i.doc.slice(o, s)) },
      range: B.cursor(l)
    };
  });
  return t.changes.empty ? !1 : (e(i.update(t, { scrollIntoView: !0, userEvent: "move.character" })), !0);
};
function ya(i) {
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
function nm(i, e, t) {
  if (i.readOnly)
    return !1;
  let n = [], s = [];
  for (let r of ya(i)) {
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
const vk = ({ state: i, dispatch: e }) => nm(i, e, !1), bk = ({ state: i, dispatch: e }) => nm(i, e, !0);
function sm(i, e, t) {
  if (i.readOnly)
    return !1;
  let n = [];
  for (let r of ya(i))
    t ? n.push({ from: r.from, insert: i.doc.slice(r.from, r.to) + i.lineBreak }) : n.push({ from: r.to, insert: i.lineBreak + i.doc.slice(r.from, r.to) });
  let s = i.changes(n);
  return e(i.update({
    changes: s,
    selection: i.selection.map(s, t ? 1 : -1),
    scrollIntoView: !0,
    userEvent: "input.copyline"
  })), !0;
}
const yk = ({ state: i, dispatch: e }) => sm(i, e, !1), wk = ({ state: i, dispatch: e }) => sm(i, e, !0), xk = (i) => {
  if (i.state.readOnly)
    return !1;
  let { state: e } = i, t = e.changes(ya(e).map(({ from: s, to: r }) => (s > 0 ? s-- : r < e.doc.length && r++, { from: s, to: r }))), n = kr(e.selection, (s) => {
    let r;
    if (i.lineWrapping) {
      let o = i.lineBlockAt(s.head), l = i.coordsAtPos(s.head, s.assoc || 1);
      l && (r = o.bottom + i.documentTop - l.bottom + i.defaultLineHeight / 2);
    }
    return i.moveVertically(s, !0, r);
  }).map(t);
  return i.dispatch({ changes: t, selection: n, scrollIntoView: !0, userEvent: "delete.line" }), !0;
};
function Sk(i, e) {
  if (/\(\)|\[\]|\{\}/.test(i.sliceDoc(e - 1, e + 1)))
    return { from: e, to: e };
  let t = $i(i).resolveInner(e), n = t.childBefore(e), s = t.childAfter(e), r;
  return n && s && n.to <= e && s.from >= e && (r = n.type.prop(Ce.closedBy)) && r.indexOf(s.name) > -1 && i.doc.lineAt(n.to).from == i.doc.lineAt(s.from).from && !/\S/.test(i.sliceDoc(n.to, s.from)) ? { from: n.to, to: s.from } : null;
}
const fd = /* @__PURE__ */ rm(!1), kk = /* @__PURE__ */ rm(!0);
function rm(i) {
  return ({ state: e, dispatch: t }) => {
    if (e.readOnly)
      return !1;
    let n = e.changeByRange((s) => {
      let { from: r, to: o } = s, l = e.doc.lineAt(r), a = !i && r == o && Sk(e, r);
      i && (r = o = (o <= l.to ? l : e.doc.lineAt(o)).to);
      let h = new ga(e, { simulateBreak: r, simulateDoubleBreak: !!a }), c = xg(h, r);
      for (c == null && (c = aa(/^\s*/.exec(e.doc.lineAt(r).text)[0], e.tabSize)); o < l.to && /\s/.test(l.text[o - l.from]); )
        o++;
      a ? { from: r, to: o } = a : r > l.from && r < l.from + 100 && !/\S/.test(l.text.slice(0, r)) && (r = l.from);
      let f = ["", zl(e, c)];
      return a && f.push(zl(e, h.lineIndent(l.from, -1))), {
        changes: { from: r, to: o, insert: je.of(f) },
        range: B.cursor(r + 1 + f[1].length)
      };
    });
    return t(e.update(n, { scrollIntoView: !0, userEvent: "input" })), !0;
  };
}
function Of(i, e) {
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
const Qk = ({ state: i, dispatch: e }) => {
  if (i.readOnly)
    return !1;
  let t = /* @__PURE__ */ Object.create(null), n = new ga(i, { overrideIndentation: (r) => {
    let o = t[r];
    return o ?? -1;
  } }), s = Of(i, (r, o, l) => {
    let a = xg(n, r.from);
    if (a == null)
      return;
    /\S/.test(r.text) || (a = 0);
    let h = /^\s*/.exec(r.text)[0], c = zl(i, a);
    (h != c || l.from < r.from + h.length) && (t[r.from] = a, o.push({ from: r.from, to: r.from + h.length, insert: c }));
  });
  return s.changes.empty || e(i.update(s, { userEvent: "indent" })), !0;
}, $k = ({ state: i, dispatch: e }) => i.readOnly ? !1 : (e(i.update(Of(i, (t, n) => {
  n.push({ from: t.from, insert: i.facet(Oa) });
}), { userEvent: "input.indent" })), !0), _k = ({ state: i, dispatch: e }) => i.readOnly ? !1 : (e(i.update(Of(i, (t, n) => {
  let s = /^\s*/.exec(t.text)[0];
  if (!s)
    return;
  let r = aa(s, i.tabSize), o = 0, l = zl(i, Math.max(0, r - Dl(i)));
  for (; o < s.length && o < l.length && s.charCodeAt(o) == l.charCodeAt(o); )
    o++;
  n.push({ from: t.from + o, to: t.from + s.length, insert: l.slice(o) });
}), { userEvent: "delete.dedent" })), !0), Pk = (i) => (i.setTabFocusMode(), !0), Tk = [
  { key: "Ctrl-b", run: Xg, shift: qg, preventDefault: !0 },
  { key: "Ctrl-f", run: jg, shift: Vg },
  { key: "Ctrl-p", run: Dg, shift: Ug },
  { key: "Ctrl-n", run: zg, shift: Fg },
  { key: "Ctrl-a", run: VS, shift: sk },
  { key: "Ctrl-e", run: BS, shift: rk },
  { key: "Ctrl-d", run: em },
  { key: "Ctrl-h", run: gc },
  { key: "Ctrl-k", run: dk },
  { key: "Ctrl-Alt-h", run: im },
  { key: "Ctrl-o", run: gk },
  { key: "Ctrl-t", run: mk },
  { key: "Ctrl-v", run: Oc }
], Ck = /* @__PURE__ */ [
  { key: "ArrowLeft", run: Xg, shift: qg, preventDefault: !0 },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: jS, shift: FS, preventDefault: !0 },
  { mac: "Cmd-ArrowLeft", run: WS, shift: ik, preventDefault: !0 },
  { key: "ArrowRight", run: jg, shift: Vg, preventDefault: !0 },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: LS, shift: HS, preventDefault: !0 },
  { mac: "Cmd-ArrowRight", run: qS, shift: nk, preventDefault: !0 },
  { key: "ArrowUp", run: Dg, shift: Ug, preventDefault: !0 },
  { mac: "Cmd-ArrowUp", run: ld, shift: hd },
  { mac: "Ctrl-ArrowUp", run: sd, shift: rd },
  { key: "ArrowDown", run: zg, shift: Fg, preventDefault: !0 },
  { mac: "Cmd-ArrowDown", run: ad, shift: cd },
  { mac: "Ctrl-ArrowDown", run: Oc, shift: od },
  { key: "PageUp", run: sd, shift: rd },
  { key: "PageDown", run: Oc, shift: od },
  { key: "Home", run: YS, shift: tk, preventDefault: !0 },
  { key: "Mod-Home", run: ld, shift: hd },
  { key: "End", run: NS, shift: ek, preventDefault: !0 },
  { key: "Mod-End", run: ad, shift: cd },
  { key: "Enter", run: fd, shift: fd },
  { key: "Mod-a", run: ok },
  { key: "Backspace", run: gc, shift: gc, preventDefault: !0 },
  { key: "Delete", run: em, preventDefault: !0 },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: im, preventDefault: !0 },
  { key: "Mod-Delete", mac: "Alt-Delete", run: uk, preventDefault: !0 },
  { mac: "Mod-Backspace", run: pk, preventDefault: !0 },
  { mac: "Mod-Delete", run: Ok, preventDefault: !0 }
].concat(/* @__PURE__ */ Tk.map((i) => ({ mac: i.key, run: i.run, shift: i.shift }))), Zk = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: DS, shift: KS },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: zS, shift: JS },
  { key: "Alt-ArrowUp", run: vk },
  { key: "Shift-Alt-ArrowUp", run: yk },
  { key: "Alt-ArrowDown", run: bk },
  { key: "Shift-Alt-ArrowDown", run: wk },
  { key: "Mod-Alt-ArrowUp", run: hk },
  { key: "Mod-Alt-ArrowDown", run: ck },
  { key: "Escape", run: fk },
  { key: "Mod-Enter", run: kk },
  { key: "Alt-l", mac: "Ctrl-l", run: lk },
  { key: "Mod-i", run: ak, preventDefault: !0 },
  { key: "Mod-[", run: _k },
  { key: "Mod-]", run: $k },
  { key: "Mod-Alt-\\", run: Qk },
  { key: "Shift-Mod-k", run: xk },
  { key: "Shift-Mod-\\", run: US },
  { key: "Mod-/", run: vS },
  { key: "Alt-A", run: yS },
  { key: "Ctrl-m", mac: "Shift-Alt-m", run: Pk }
].concat(Ck);
class Yl {
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
    return new Yl(e, [], t, n, n, 0, [], 0, s ? new ud(s, s.start) : null, 0, null);
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
    let f = a ? this.stack[a - 1] : 0, u = this.bufferBase + this.buffer.length - f;
    if (s < r.minRepeatTerm || e & 131072) {
      let p = r.stateFlag(
        this.state,
        1
        /* StateFlag.Skipped */
      ) ? this.pos : this.reducePos;
      this.storeNode(s, h, p, u + 4, !0);
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
    return new Yl(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, n, s, this.curContext, this.lookAhead, e);
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
    for (let t = new Ek(this); ; ) {
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
      let t = new ud(this.curContext.tracker, e);
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
class ud {
  constructor(e, t) {
    this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
  }
}
class Ek {
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
class Wl {
  constructor(e, t, n) {
    this.stack = e, this.pos = t, this.index = n, this.buffer = e.buffer, this.index == 0 && this.maybeNext();
  }
  static create(e, t = e.bufferBase + e.buffer.length) {
    return new Wl(e, t, t - e.bufferBase);
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
    return new Wl(this.stack, this.pos, this.index);
  }
}
function Yr(i, e = Uint16Array) {
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
class gl {
  constructor() {
    this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
  }
}
const dd = new gl();
class Ak {
  /**
  @internal
  */
  constructor(e, t) {
    this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = dd, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
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
    if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = dd, this.pos != e) {
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
class Gs {
  constructor(e, t) {
    this.data = e, this.id = t;
  }
  token(e, t) {
    let { parser: n } = t.p;
    om(this.data, e, t, this.id, n.data, n.tokenPrecTable);
  }
}
Gs.prototype.contextual = Gs.prototype.fallback = Gs.prototype.extend = !1;
class mc {
  constructor(e, t, n) {
    this.precTable = t, this.elseToken = n, this.data = typeof e == "string" ? Yr(e) : e;
  }
  token(e, t) {
    let n = e.pos, s = 0;
    for (; ; ) {
      let r = e.next < 0, o = e.resolveOffset(1, 1);
      if (om(this.data, e, t, 0, this.data, this.precTable), e.token.value > -1)
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
mc.prototype.contextual = Gs.prototype.fallback = Gs.prototype.extend = !1;
class Ao {
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
function om(i, e, t, n, s, r) {
  let o = 0, l = 1 << n, { dialect: a } = t.p.parser;
  e: for (; (l & i[o]) != 0; ) {
    let h = i[o + 1];
    for (let p = o + 3; p < h; p += 2)
      if ((i[p + 1] & l) > 0) {
        let O = i[p];
        if (a.allows(O) && (e.token.value == -1 || e.token.value == O || Rk(O, e.token.value, s, r))) {
          e.acceptToken(O);
          break;
        }
      }
    let c = e.next, f = 0, u = i[o + 2];
    if (e.next < 0 && u > f && i[h + u * 3 - 3] == 65535) {
      o = i[h + u * 3 - 1];
      continue e;
    }
    for (; f < u; ) {
      let p = f + u >> 1, O = h + p + (p << 1), g = i[O], m = i[O + 1] || 65536;
      if (c < g)
        u = p;
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
function pd(i, e, t) {
  for (let n = e, s; (s = i[n]) != 65535; n++)
    if (s == t)
      return n - e;
  return -1;
}
function Rk(i, e, t, n) {
  let s = pd(t, n, e);
  return s < 0 || pd(t, n, i) < s;
}
const ti = typeof process < "u" && process.env && /\bparse\b/.test(process.env.LOG);
let sh = null;
function Od(i, e, t) {
  let n = i.cursor(rt.IncludeAnonymous);
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
class Mk {
  constructor(e, t) {
    this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
  }
  nextFragment() {
    let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
    if (e) {
      for (this.safeFrom = e.openStart ? Od(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? Od(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length; )
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
      if (r instanceof gt) {
        if (o == e) {
          if (o < this.safeFrom)
            return null;
          let l = o + r.length;
          if (l <= this.safeTo) {
            let a = r.prop(Ce.lookAhead);
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
class Xk {
  constructor(e, t) {
    this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((n) => new gl());
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
        let u = t;
        if (f.extended > -1 && (t = this.addActions(e, f.extended, f.end, t)), t = this.addActions(e, f.value, f.end, t), !c.extend && (n = f, t > u))
          break;
      }
    }
    for (; this.actions.length > t; )
      this.actions.pop();
    return a && e.setLookAhead(a), !n && e.pos == this.stream.end && (n = new gl(), n.value = e.p.parser.eofTerm, n.start = n.end = e.pos, t = this.addActions(e, n.value, n.end, t)), this.mainToken = n, this.actions;
  }
  getMainToken(e) {
    if (this.mainToken)
      return this.mainToken;
    let t = new gl(), { pos: n, p: s } = e;
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
            h = dn(l, h + 2);
          else {
            s == 0 && l[h + 1] == 2 && (s = this.putAction(dn(l, h + 2), t, n, s));
            break;
          }
        l[h] == t && (s = this.putAction(dn(l, h + 1), t, n, s));
      }
    return s;
  }
}
class jk {
  constructor(e, t, n, s) {
    this.parser = e, this.input = t, this.ranges = s, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.lastBigReductionStart = -1, this.lastBigReductionSize = 0, this.bigReductionCount = 0, this.stream = new Ak(t, s), this.tokens = new Xk(e, this.stream), this.topTerm = e.top[1];
    let { from: r } = s[0];
    this.stacks = [Yl.start(this, e.top[0], r)], this.fragments = n.length && this.stream.end - r > e.bufferLength * 4 ? new Mk(n, e.nodeSet) : null;
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
      let o = s && Dk(s);
      if (o)
        return ti && console.log("Finish with " + this.stackID(o)), this.stackToTree(o);
      if (this.parser.strict)
        throw ti && s && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), new SyntaxError("No parse at " + t);
      this.recovering || (this.recovering = 5);
    }
    if (this.recovering && s) {
      let o = this.stoppedAt != null && s[0].pos > this.stoppedAt ? s[0] : this.runRecovery(s, r, n);
      if (o)
        return ti && console.log("Force-finish " + this.stackID(o)), this.stackToTree(o.forceAll());
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
    let s = e.pos, { parser: r } = this, o = ti ? this.stackID(e) + " -> " : "";
    if (this.stoppedAt != null && s > this.stoppedAt)
      return e.forceReduce() ? e : null;
    if (this.fragments) {
      let h = e.curContext && e.curContext.tracker.strict, c = h ? e.curContext.hash : 0;
      for (let f = this.fragments.nodeAt(s); f; ) {
        let u = this.parser.nodeSet.types[f.type.id] == f.type ? r.getGoto(e.state, f.type.id) : -1;
        if (u > -1 && f.length && (!h || (f.prop(Ce.contextHash) || 0) == c))
          return e.useNode(f, u), ti && console.log(o + this.stackID(e) + ` (via reuse of ${r.getName(f.type.id)})`), !0;
        if (!(f instanceof gt) || f.children.length == 0 || f.positions[0] > 0)
          break;
        let p = f.children[0];
        if (p instanceof gt && f.positions[0] == 0)
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
      return e.reduce(l), ti && console.log(o + this.stackID(e) + ` (via always-reduce ${r.getName(
        l & 65535
        /* Action.ValueMask */
      )})`), !0;
    if (e.stack.length >= 8400)
      for (; e.stack.length > 6e3 && e.forceReduce(); )
        ;
    let a = this.tokens.getActions(e);
    for (let h = 0; h < a.length; ) {
      let c = a[h++], f = a[h++], u = a[h++], p = h == a.length || !n, O = p ? e : e.split(), g = this.tokens.mainToken;
      if (O.apply(c, f, g ? g.start : O.pos, u), ti && console.log(o + this.stackID(O) + ` (via ${(c & 65536) == 0 ? "shift" : `reduce of ${r.getName(
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
        return gd(e, t), !0;
    }
  }
  runRecovery(e, t, n) {
    let s = null, r = !1;
    for (let o = 0; o < e.length; o++) {
      let l = e[o], a = t[o << 1], h = t[(o << 1) + 1], c = ti ? this.stackID(l) + " -> " : "";
      if (l.deadEnd && (r || (r = !0, l.restart(), ti && console.log(c + this.stackID(l) + " (restarted)"), this.advanceFully(l, n))))
        continue;
      let f = l.split(), u = c;
      for (let p = 0; p < 10 && f.forceReduce() && (ti && console.log(u + this.stackID(f) + " (via force-reduce)"), !this.advanceFully(f, n)); p++)
        ti && (u = this.stackID(f) + " -> ");
      for (let p of l.recoverByInsert(a))
        ti && console.log(c + this.stackID(p) + " (via recover-insert)"), this.advanceFully(p, n);
      this.stream.end > l.pos ? (h == l.pos && (h++, a = 0), l.recoverByDelete(a, h), ti && console.log(c + this.stackID(l) + ` (via recover-delete ${this.parser.getName(a)})`), gd(l, n)) : (!s || s.score < f.score) && (s = f);
    }
    return s;
  }
  // Convert the stack's buffer to a syntax tree.
  stackToTree(e) {
    return e.close(), gt.build({
      buffer: Wl.create(e),
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
    let t = (sh || (sh = /* @__PURE__ */ new WeakMap())).get(e);
    return t || sh.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
  }
}
function gd(i, e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (n.pos == i.pos && n.sameState(i)) {
      e[t].score < i.score && (e[t] = i);
      return;
    }
  }
  e.push(i);
}
class Lk {
  constructor(e, t, n) {
    this.source = e, this.flags = t, this.disabled = n;
  }
  allows(e) {
    return !this.disabled || this.disabled[e] == 0;
  }
}
const rh = (i) => i;
class Ik {
  /**
  Define a context tracker.
  */
  constructor(e) {
    this.start = e.start, this.shift = e.shift || rh, this.reduce = e.reduce || rh, this.reuse = e.reuse || rh, this.hash = e.hash || (() => 0), this.strict = e.strict !== !1;
  }
}
class ql extends vg {
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
        typeof a == "string" && (a = Ce[a]);
        for (let h = 1; h < l.length; ) {
          let c = l[h++];
          if (c >= 0)
            r(c, a, l[h++]);
          else {
            let f = l[h + -c];
            for (let u = -c; u > 0; u--)
              r(l[h++], a, f);
            h++;
          }
        }
      }
    this.nodeSet = new lf(t.map((l, a) => ei.define({
      name: a >= this.minRepeatTerm ? void 0 : l,
      id: a,
      props: s[a],
      top: n.indexOf(a) > -1,
      error: a == 0,
      skipped: e.skippedNodes && e.skippedNodes.indexOf(a) > -1
    }))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = !1, this.bufferLength = pg;
    let o = Yr(e.tokenData);
    this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
    for (let l = 0; l < this.specializerSpecs.length; l++)
      this.specialized[l] = this.specializerSpecs[l].term;
    this.specializers = this.specializerSpecs.map(md), this.states = Yr(e.states, Uint32Array), this.data = Yr(e.stateData), this.goto = Yr(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((l) => typeof l == "number" ? new Gs(o, l) : l), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
  }
  createParse(e, t, n) {
    let s = new jk(this, e, t, n);
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
            o = n[r = dn(n, r + 2)];
          else {
            if (n[r + 1] == 2)
              return dn(n, r + 2);
            break;
          }
        if (o == t || o == 0)
          return dn(n, r + 1);
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
          r = dn(this.data, r + 2);
        else
          break;
      s = t(dn(this.data, r + 1));
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
          n = dn(this.data, n + 2);
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
    let t = Object.assign(Object.create(ql.prototype), this);
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
      return t.specializers[s] = md(o), o;
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
    return new Lk(e, n, s);
  }
  /**
  Used by the output of the parser generator. Not available to
  user code. @hide
  */
  static deserialize(e) {
    return new ql(e);
  }
}
function dn(i, e) {
  return i[e] | i[e + 1] << 16;
}
function Dk(i) {
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
function md(i) {
  if (i.external) {
    let e = i.extend ? 1 : 0;
    return (t, n) => i.external(t, n) << 1 | e;
  }
  return i.get;
}
const zk = 316, Nk = 317, vd = 1, Yk = 2, Wk = 3, qk = 4, Vk = 318, Bk = 320, Gk = 321, Uk = 5, Fk = 6, Hk = 0, vc = [
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
], lm = 125, Kk = 59, bc = 47, Jk = 42, eQ = 43, tQ = 45, iQ = 60, nQ = 44, sQ = 63, rQ = 46, oQ = 91, lQ = new Ik({
  start: !1,
  shift(i, e) {
    return e == Uk || e == Fk || e == Bk ? i : e == Gk;
  },
  strict: !1
}), aQ = new Ao((i, e) => {
  let { next: t } = i;
  (t == lm || t == -1 || e.context) && i.acceptToken(Vk);
}, { contextual: !0, fallback: !0 }), hQ = new Ao((i, e) => {
  let { next: t } = i, n;
  vc.indexOf(t) > -1 || t == bc && ((n = i.peek(1)) == bc || n == Jk) || t != lm && t != Kk && t != -1 && !e.context && i.acceptToken(zk);
}, { contextual: !0 }), cQ = new Ao((i, e) => {
  i.next == oQ && !e.context && i.acceptToken(Nk);
}, { contextual: !0 }), fQ = new Ao((i, e) => {
  let { next: t } = i;
  if (t == eQ || t == tQ) {
    if (i.advance(), t == i.next) {
      i.advance();
      let n = !e.context && e.canShift(vd);
      i.acceptToken(n ? vd : Yk);
    }
  } else t == sQ && i.peek(1) == rQ && (i.advance(), i.advance(), (i.next < 48 || i.next > 57) && i.acceptToken(Wk));
}, { contextual: !0 });
function oh(i, e) {
  return i >= 65 && i <= 90 || i >= 97 && i <= 122 || i == 95 || i >= 192 || !e && i >= 48 && i <= 57;
}
const uQ = new Ao((i, e) => {
  if (i.next != iQ || !e.dialectEnabled(Hk) || (i.advance(), i.next == bc)) return;
  let t = 0;
  for (; vc.indexOf(i.next) > -1; )
    i.advance(), t++;
  if (oh(i.next, !0)) {
    for (i.advance(), t++; oh(i.next, !1); )
      i.advance(), t++;
    for (; vc.indexOf(i.next) > -1; )
      i.advance(), t++;
    if (i.next == nQ) return;
    for (let n = 0; ; n++) {
      if (n == 7) {
        if (!oh(i.next, !0)) return;
        break;
      }
      if (i.next != "extends".charCodeAt(n)) break;
      i.advance(), t++;
    }
  }
  i.acceptToken(qk, -t);
}), dQ = bg({
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
}), pQ = { __proto__: null, export: 20, as: 25, from: 33, default: 36, async: 41, function: 42, in: 52, out: 55, const: 56, extends: 60, this: 64, true: 72, false: 72, null: 84, void: 88, typeof: 92, super: 108, new: 142, delete: 154, yield: 163, await: 167, class: 172, public: 235, private: 235, protected: 235, readonly: 237, instanceof: 256, satisfies: 259, import: 292, keyof: 349, unique: 353, infer: 359, asserts: 395, is: 397, abstract: 417, implements: 419, type: 421, let: 424, var: 426, using: 429, interface: 435, enum: 439, namespace: 445, module: 447, declare: 451, global: 455, defer: 471, for: 476, of: 485, while: 488, with: 492, do: 496, if: 500, else: 502, switch: 506, case: 512, try: 518, catch: 522, finally: 526, return: 530, throw: 534, break: 538, continue: 542, debugger: 546 }, OQ = { __proto__: null, async: 129, get: 131, set: 133, declare: 195, public: 197, private: 197, protected: 197, static: 199, abstract: 201, override: 203, readonly: 209, accessor: 211, new: 401 }, gQ = { __proto__: null, "<": 193 }, mQ = ql.deserialize({
  version: 14,
  states: "$F|Q%TQlOOO%[QlOOO'_QpOOP(lO`OOO*zQ!0MxO'#CiO+RO#tO'#CjO+aO&jO'#CjO+oO#@ItO'#DaO.QQlO'#DgO.bQlO'#DrO%[QlO'#DzO0fQlO'#ESOOQ!0Lf'#E['#E[O1PQ`O'#EXOOQO'#Ep'#EpOOQO'#Il'#IlO1XQ`O'#GsO1dQ`O'#EoO1iQ`O'#EoO3hQ!0MxO'#JrO6[Q!0MxO'#JsO6uQ`O'#F]O6zQ,UO'#FtOOQ!0Lf'#Ff'#FfO7VO7dO'#FfO9XQMhO'#F|O9`Q`O'#F{OOQ!0Lf'#Js'#JsOOQ!0Lb'#Jr'#JrO9eQ`O'#GwOOQ['#K_'#K_O9pQ`O'#IYO9uQ!0LrO'#IZOOQ['#J`'#J`OOQ['#I_'#I_Q`QlOOQ`QlOOO9}Q!L^O'#DvO:UQlO'#EOO:]QlO'#EQO9kQ`O'#GsO:dQMhO'#CoO:rQ`O'#EnO:}Q`O'#EyO;hQMhO'#FeO;xQ`O'#GsOOQO'#K`'#K`O;}Q`O'#K`O<]Q`O'#G{O<]Q`O'#G|O<]Q`O'#HOO9kQ`O'#HRO=SQ`O'#HUO>kQ`O'#CeO>{Q`O'#HcO?TQ`O'#HiO?TQ`O'#HkO`QlO'#HmO?TQ`O'#HoO?TQ`O'#HrO?YQ`O'#HxO?_Q!0LsO'#IOO%[QlO'#IQO?jQ!0LsO'#ISO?uQ!0LsO'#IUO9uQ!0LrO'#IWO@QQ!0MxO'#CiOASQpO'#DlQOQ`OOO%[QlO'#EQOAjQ`O'#ETO:dQMhO'#EnOAuQ`O'#EnOBQQ!bO'#FeOOQ['#Cg'#CgOOQ!0Lb'#Dq'#DqOOQ!0Lb'#Jv'#JvO%[QlO'#JvOOQO'#Jy'#JyOOQO'#Ih'#IhOCQQpO'#EgOOQ!0Lb'#Ef'#EfOOQ!0Lb'#J}'#J}OC|Q!0MSO'#EgODWQpO'#EWOOQO'#Jx'#JxODlQpO'#JyOEyQpO'#EWODWQpO'#EgPFWO&2DjO'#CbPOOO)CD})CD}OOOO'#I`'#I`OFcO#tO,59UOOQ!0Lh,59U,59UOOOO'#Ia'#IaOFqO&jO,59UOGPQ!L^O'#DcOOOO'#Ic'#IcOGWO#@ItO,59{OOQ!0Lf,59{,59{OGfQlO'#IdOGyQ`O'#JtOIxQ!fO'#JtO+}QlO'#JtOJPQ`O,5:ROJgQ`O'#EpOJtQ`O'#KTOKPQ`O'#KSOKPQ`O'#KSOKXQ`O,5;^OK^Q`O'#KROOQ!0Ln,5:^,5:^OKeQlO,5:^OMcQ!0MxO,5:fONSQ`O,5:nONmQ!0LrO'#KQONtQ`O'#KPO9eQ`O'#KPO! YQ`O'#KPO! bQ`O,5;]O! gQ`O'#KPO!#lQ!fO'#JsOOQ!0Lh'#Ci'#CiO%[QlO'#ESO!$[Q!fO,5:sOOQS'#Jz'#JzOOQO-E<j-E<jO9kQ`O,5=_O!$rQ`O,5=_O!$wQlO,5;ZO!&zQMhO'#EkO!(eQ`O,5;ZO!(jQlO'#DyO!(tQpO,5;dO!(|QpO,5;dO%[QlO,5;dOOQ['#FT'#FTOOQ['#FV'#FVO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eO%[QlO,5;eOOQ['#FZ'#FZO!)[QlO,5;tOOQ!0Lf,5;y,5;yOOQ!0Lf,5;z,5;zOOQ!0Lf,5;|,5;|O%[QlO'#IpO!+_Q!0LrO,5<iO%[QlO,5;eO!&zQMhO,5;eO!+|QMhO,5;eO!-nQMhO'#E^O%[QlO,5;wOOQ!0Lf,5;{,5;{O!-uQ,UO'#FjO!.rQ,UO'#KXO!.^Q,UO'#KXO!.yQ,UO'#KXOOQO'#KX'#KXO!/_Q,UO,5<SOOOW,5<`,5<`O!/pQlO'#FvOOOW'#Io'#IoO7VO7dO,5<QO!/wQ,UO'#FxOOQ!0Lf,5<Q,5<QO!0hQ$IUO'#CyOOQ!0Lh'#C}'#C}O!0{O#@ItO'#DRO!1iQMjO,5<eO!1pQ`O,5<hO!3YQ(CWO'#GXO!3jQ`O'#GYO!3oQ`O'#GYO!5_Q(CWO'#G^O!6dQpO'#GbOOQO'#Gn'#GnO!,TQMhO'#GmOOQO'#Gp'#GpO!,TQMhO'#GoO!7VQ$IUO'#JlOOQ!0Lh'#Jl'#JlO!7aQ`O'#JkO!7oQ`O'#JjO!7wQ`O'#CuOOQ!0Lh'#C{'#C{O!8YQ`O'#C}OOQ!0Lh'#DV'#DVOOQ!0Lh'#DX'#DXO!8_Q`O,5<eO1SQ`O'#DZO!,TQMhO'#GPO!,TQMhO'#GRO!8gQ`O'#GTO!8lQ`O'#GUO!3oQ`O'#G[O!,TQMhO'#GaO<]Q`O'#JkO!8qQ`O'#EqO!9`Q`O,5<gOOQ!0Lb'#Cr'#CrO!9hQ`O'#ErO!:bQpO'#EsOOQ!0Lb'#KR'#KRO!:iQ!0LrO'#KaO9uQ!0LrO,5=cO`QlO,5>tOOQ['#Jh'#JhOOQ[,5>u,5>uOOQ[-E<]-E<]O!<hQ!0MxO,5:bO!:]QpO,5:`O!?RQ!0MxO,5:jO%[QlO,5:jO!AiQ!0MxO,5:lOOQO,5@z,5@zO!BYQMhO,5=_O!BhQ!0LrO'#JiO9`Q`O'#JiO!ByQ!0LrO,59ZO!CUQpO,59ZO!C^QMhO,59ZO:dQMhO,59ZO!CiQ`O,5;ZO!CqQ`O'#HbO!DVQ`O'#KdO%[QlO,5;}O!:]QpO,5<PO!D_Q`O,5=zO!DdQ`O,5=zO!DiQ`O,5=zO!DwQ`O,5=zO9uQ!0LrO,5=zO<]Q`O,5=jOOQO'#Cy'#CyO!EOQpO,5=gO!EWQMhO,5=hO!EcQ`O,5=jO!EhQ!bO,5=mO!EpQ`O'#K`O?YQ`O'#HWO9kQ`O'#HYO!EuQ`O'#HYO:dQMhO'#H[O!EzQ`O'#H[OOQ[,5=p,5=pO!FPQ`O'#H]O!FbQ`O'#CoO!FgQ`O,59PO!FqQ`O,59PO!HvQlO,59POOQ[,59P,59PO!IWQ!0LrO,59PO%[QlO,59PO!KcQlO'#HeOOQ['#Hf'#HfOOQ['#Hg'#HgO`QlO,5=}O!KyQ`O,5=}O`QlO,5>TO`QlO,5>VO!LOQ`O,5>XO`QlO,5>ZO!LTQ`O,5>^O!LYQlO,5>dOOQ[,5>j,5>jO%[QlO,5>jO9uQ!0LrO,5>lOOQ[,5>n,5>nO#!dQ`O,5>nOOQ[,5>p,5>pO#!dQ`O,5>pOOQ[,5>r,5>rO##QQpO'#D_O%[QlO'#JvO##sQpO'#JvO##}QpO'#DmO#$`QpO'#DmO#&qQlO'#DmO#&xQ`O'#JuO#'QQ`O,5:WO#'VQ`O'#EtO#'eQ`O'#KUO#'mQ`O,5;_O#'rQpO'#DmO#(PQpO'#EVOOQ!0Lf,5:o,5:oO%[QlO,5:oO#(WQ`O,5:oO?YQ`O,5;YO!CUQpO,5;YO!C^QMhO,5;YO:dQMhO,5;YO#(`Q`O,5@bO#(eQ07dO,5:sOOQO-E<f-E<fO#)kQ!0MSO,5;RODWQpO,5:rO#)uQpO,5:rODWQpO,5;RO!ByQ!0LrO,5:rOOQ!0Lb'#Ej'#EjOOQO,5;R,5;RO%[QlO,5;RO#*SQ!0LrO,5;RO#*_Q!0LrO,5;RO!CUQpO,5:rOOQO,5;X,5;XO#*mQ!0LrO,5;RPOOO'#I^'#I^P#+RO&2DjO,58|POOO,58|,58|OOOO-E<^-E<^OOQ!0Lh1G.p1G.pOOOO-E<_-E<_OOOO,59},59}O#+^Q!bO,59}OOOO-E<a-E<aOOQ!0Lf1G/g1G/gO#+cQ!fO,5?OO+}QlO,5?OOOQO,5?U,5?UO#+mQlO'#IdOOQO-E<b-E<bO#+zQ`O,5@`O#,SQ!fO,5@`O#,ZQ`O,5@nOOQ!0Lf1G/m1G/mO%[QlO,5@oO#,cQ`O'#IjOOQO-E<h-E<hO#,ZQ`O,5@nOOQ!0Lb1G0x1G0xOOQ!0Ln1G/x1G/xOOQ!0Ln1G0Y1G0YO%[QlO,5@lO#,wQ!0LrO,5@lO#-YQ!0LrO,5@lO#-aQ`O,5@kO9eQ`O,5@kO#-iQ`O,5@kO#-wQ`O'#ImO#-aQ`O,5@kOOQ!0Lb1G0w1G0wO!(tQpO,5:uO!)PQpO,5:uOOQS,5:w,5:wO#.iQdO,5:wO#.qQMhO1G2yO9kQ`O1G2yOOQ!0Lf1G0u1G0uO#/PQ!0MxO1G0uO#0UQ!0MvO,5;VOOQ!0Lh'#GW'#GWO#0rQ!0MzO'#JlO!$wQlO1G0uO#2}Q!fO'#JwO%[QlO'#JwO#3XQ`O,5:eOOQ!0Lh'#D_'#D_OOQ!0Lf1G1O1G1OO%[QlO1G1OOOQ!0Lf1G1f1G1fO#3^Q`O1G1OO#5rQ!0MxO1G1PO#5yQ!0MxO1G1PO#8aQ!0MxO1G1PO#8hQ!0MxO1G1PO#;OQ!0MxO1G1PO#=fQ!0MxO1G1PO#=mQ!0MxO1G1PO#=tQ!0MxO1G1PO#@[Q!0MxO1G1PO#@cQ!0MxO1G1PO#BpQ?MtO'#CiO#DkQ?MtO1G1`O#DrQ?MtO'#JsO#EVQ!0MxO,5?[OOQ!0Lb-E<n-E<nO#GdQ!0MxO1G1PO#HaQ!0MzO1G1POOQ!0Lf1G1P1G1PO#IdQMjO'#J|O#InQ`O,5:xO#IsQ!0MxO1G1cO#JgQ,UO,5<WO#JoQ,UO,5<XO#JwQ,UO'#FoO#K`Q`O'#FnOOQO'#KY'#KYOOQO'#In'#InO#KeQ,UO1G1nOOQ!0Lf1G1n1G1nOOOW1G1y1G1yO#KvQ?MtO'#JrO#LQQ`O,5<bO!)[QlO,5<bOOOW-E<m-E<mOOQ!0Lf1G1l1G1lO#LVQpO'#KXOOQ!0Lf,5<d,5<dO#L_QpO,5<dO#LdQMhO'#DTOOOO'#Ib'#IbO#LkO#@ItO,59mOOQ!0Lh,59m,59mO%[QlO1G2PO!8lQ`O'#IrO#LvQ`O,5<zOOQ!0Lh,5<w,5<wO!,TQMhO'#IuO#MdQMjO,5=XO!,TQMhO'#IwO#NVQMjO,5=ZO!&zQMhO,5=]OOQO1G2S1G2SO#NaQ!dO'#CrO#NtQ(CWO'#ErO$ |QpO'#GbO$!dQ!dO,5<sO$!kQ`O'#K[O9eQ`O'#K[O$!yQ`O,5<uO$#aQ!dO'#C{O!,TQMhO,5<tO$#kQ`O'#GZO$$PQ`O,5<tO$$UQ!dO'#GWO$$cQ!dO'#K]O$$mQ`O'#K]O!&zQMhO'#K]O$$rQ`O,5<xO$$wQlO'#JvO$%RQpO'#GcO#$`QpO'#GcO$%dQ`O'#GgO!3oQ`O'#GkO$%iQ!0LrO'#ItO$%tQpO,5<|OOQ!0Lp,5<|,5<|O$%{QpO'#GcO$&YQpO'#GdO$&kQpO'#GdO$&pQMjO,5=XO$'QQMjO,5=ZOOQ!0Lh,5=^,5=^O!,TQMhO,5@VO!,TQMhO,5@VO$'bQ`O'#IyO$'vQ`O,5@UO$(OQ`O,59aOOQ!0Lh,59i,59iO$(TQ`O,5@VO$)TQ$IYO,59uOOQ!0Lh'#Jp'#JpO$)vQMjO,5<kO$*iQMjO,5<mO@zQ`O,5<oOOQ!0Lh,5<p,5<pO$*sQ`O,5<vO$*xQMjO,5<{O$+YQ`O'#KPO!$wQlO1G2RO$+_Q`O1G2RO9eQ`O'#KSO9eQ`O'#EtO%[QlO'#EtO9eQ`O'#I{O$+dQ!0LrO,5@{OOQ[1G2}1G2}OOQ[1G4`1G4`OOQ!0Lf1G/|1G/|OOQ!0Lf1G/z1G/zO$-fQ!0MxO1G0UOOQ[1G2y1G2yO!&zQMhO1G2yO%[QlO1G2yO#.tQ`O1G2yO$/jQMhO'#EkOOQ!0Lb,5@T,5@TO$/wQ!0LrO,5@TOOQ[1G.u1G.uO!ByQ!0LrO1G.uO!CUQpO1G.uO!C^QMhO1G.uO$0YQ`O1G0uO$0_Q`O'#CiO$0jQ`O'#KeO$0rQ`O,5=|O$0wQ`O'#KeO$0|Q`O'#KeO$1[Q`O'#JRO$1jQ`O,5AOO$1rQ!fO1G1iOOQ!0Lf1G1k1G1kO9kQ`O1G3fO@zQ`O1G3fO$1yQ`O1G3fO$2OQ`O1G3fO!DiQ`O1G3fO9uQ!0LrO1G3fOOQ[1G3f1G3fO!EcQ`O1G3UO!&zQMhO1G3RO$2TQ`O1G3ROOQ[1G3S1G3SO!&zQMhO1G3SO$2YQ`O1G3SO$2bQpO'#HQOOQ[1G3U1G3UO!6_QpO'#I}O!EhQ!bO1G3XOOQ[1G3X1G3XOOQ[,5=r,5=rO$2jQMhO,5=tO9kQ`O,5=tO$%dQ`O,5=vO9`Q`O,5=vO!CUQpO,5=vO!C^QMhO,5=vO:dQMhO,5=vO$2xQ`O'#KcO$3TQ`O,5=wOOQ[1G.k1G.kO$3YQ!0LrO1G.kO@zQ`O1G.kO$3eQ`O1G.kO9uQ!0LrO1G.kO$5mQ!fO,5AQO$5zQ`O,5AQO9eQ`O,5AQO$6VQlO,5>PO$6^Q`O,5>POOQ[1G3i1G3iO`QlO1G3iOOQ[1G3o1G3oOOQ[1G3q1G3qO?TQ`O1G3sO$6cQlO1G3uO$:gQlO'#HtOOQ[1G3x1G3xO$:tQ`O'#HzO?YQ`O'#H|OOQ[1G4O1G4OO$:|QlO1G4OO9uQ!0LrO1G4UOOQ[1G4W1G4WOOQ!0Lb'#G_'#G_O9uQ!0LrO1G4YO9uQ!0LrO1G4[O$?TQ`O,5@bO!)[QlO,5;`O9eQ`O,5;`O?YQ`O,5:XO!)[QlO,5:XO!CUQpO,5:XO$?YQ?MtO,5:XOOQO,5;`,5;`O$?dQpO'#IeO$?zQ`O,5@aOOQ!0Lf1G/r1G/rO$@SQpO'#IkO$@^Q`O,5@pOOQ!0Lb1G0y1G0yO#$`QpO,5:XOOQO'#Ig'#IgO$@fQpO,5:qOOQ!0Ln,5:q,5:qO#(ZQ`O1G0ZOOQ!0Lf1G0Z1G0ZO%[QlO1G0ZOOQ!0Lf1G0t1G0tO?YQ`O1G0tO!CUQpO1G0tO!C^QMhO1G0tOOQ!0Lb1G5|1G5|O!ByQ!0LrO1G0^OOQO1G0m1G0mO%[QlO1G0mO$@mQ!0LrO1G0mO$@xQ!0LrO1G0mO!CUQpO1G0^ODWQpO1G0^O$AWQ!0LrO1G0mOOQO1G0^1G0^O$AlQ!0MxO1G0mPOOO-E<[-E<[POOO1G.h1G.hOOOO1G/i1G/iO$AvQ!bO,5<iO$BOQ!fO1G4jOOQO1G4p1G4pO%[QlO,5?OO$BYQ`O1G5zO$BbQ`O1G6YO$BjQ!fO1G6ZO9eQ`O,5?UO$BtQ!0MxO1G6WO%[QlO1G6WO$CUQ!0LrO1G6WO$CgQ`O1G6VO$CgQ`O1G6VO9eQ`O1G6VO$CoQ`O,5?XO9eQ`O,5?XOOQO,5?X,5?XO$DTQ`O,5?XO$+YQ`O,5?XOOQO-E<k-E<kOOQS1G0a1G0aOOQS1G0c1G0cO#.lQ`O1G0cOOQ[7+(e7+(eO!&zQMhO7+(eO%[QlO7+(eO$DcQ`O7+(eO$DnQMhO7+(eO$D|Q!0MzO,5=XO$GXQ!0MzO,5=ZO$IdQ!0MzO,5=XO$KuQ!0MzO,5=ZO$NWQ!0MzO,59uO%!]Q!0MzO,5<kO%$hQ!0MzO,5<mO%&sQ!0MzO,5<{OOQ!0Lf7+&a7+&aO%)UQ!0MxO7+&aO%)xQlO'#IfO%*VQ`O,5@cO%*_Q!fO,5@cOOQ!0Lf1G0P1G0PO%*iQ`O7+&jOOQ!0Lf7+&j7+&jO%*nQ?MtO,5:fO%[QlO7+&zO%*xQ?MtO,5:bO%+VQ?MtO,5:jO%+aQ?MtO,5:lO%+kQMhO'#IiO%+uQ`O,5@hOOQ!0Lh1G0d1G0dOOQO1G1r1G1rOOQO1G1s1G1sO%+}Q!jO,5<ZO!)[QlO,5<YOOQO-E<l-E<lOOQ!0Lf7+'Y7+'YOOOW7+'e7+'eOOOW1G1|1G1|O%,YQ`O1G1|OOQ!0Lf1G2O1G2OOOOO,59o,59oO%,_Q!dO,59oOOOO-E<`-E<`OOQ!0Lh1G/X1G/XO%,fQ!0MxO7+'kOOQ!0Lh,5?^,5?^O%-YQMhO1G2fP%-aQ`O'#IrPOQ!0Lh-E<p-E<pO%-}QMjO,5?aOOQ!0Lh-E<s-E<sO%.pQMjO,5?cOOQ!0Lh-E<u-E<uO%.zQ!dO1G2wO%/RQ!dO'#CrO%/iQMhO'#KSO$$wQlO'#JvOOQ!0Lh1G2_1G2_O%/sQ`O'#IqO%0[Q`O,5@vO%0[Q`O,5@vO%0dQ`O,5@vO%0oQ`O,5@vOOQO1G2a1G2aO%0}QMjO1G2`O$+YQ`O'#K[O!,TQMhO1G2`O%1_Q(CWO'#IsO%1lQ`O,5@wO!&zQMhO,5@wO%1tQ!dO,5@wOOQ!0Lh1G2d1G2dO%4UQ!fO'#CiO%4`Q`O,5=POOQ!0Lb,5<},5<}O%4hQpO,5<}OOQ!0Lb,5=O,5=OOCwQ`O,5<}O%4sQpO,5<}OOQ!0Lb,5=R,5=RO$+YQ`O,5=VOOQO,5?`,5?`OOQO-E<r-E<rOOQ!0Lp1G2h1G2hO#$`QpO,5<}O$$wQlO,5=PO%5RQ`O,5=OO%5^QpO,5=OO!,TQMhO'#IuO%6WQMjO1G2sO!,TQMhO'#IwO%6yQMjO1G2uO%7TQMjO1G5qO%7_QMjO1G5qOOQO,5?e,5?eOOQO-E<w-E<wOOQO1G.{1G.{O!,TQMhO1G5qO!,TQMhO1G5qO!:]QpO,59wO%[QlO,59wOOQ!0Lh,5<j,5<jO%7lQ`O1G2ZO!,TQMhO1G2bO%7qQ!0MxO7+'mOOQ!0Lf7+'m7+'mO!$wQlO7+'mO%8eQ`O,5;`OOQ!0Lb,5?g,5?gOOQ!0Lb-E<y-E<yO%8jQ!dO'#K^O#(ZQ`O7+(eO4UQ!fO7+(eO$DfQ`O7+(eO%8tQ!0MvO'#CiO%9XQ!0MvO,5=SO%9lQ`O,5=SO%9tQ`O,5=SOOQ!0Lb1G5o1G5oOOQ[7+$a7+$aO!ByQ!0LrO7+$aO!CUQpO7+$aO!$wQlO7+&aO%9yQ`O'#JQO%:bQ`O,5APOOQO1G3h1G3hO9kQ`O,5APO%:bQ`O,5APO%:jQ`O,5APOOQO,5?m,5?mOOQO-E=P-E=POOQ!0Lf7+'T7+'TO%:oQ`O7+)QO9uQ!0LrO7+)QO9kQ`O7+)QO@zQ`O7+)QO%:tQ`O7+)QOOQ[7+)Q7+)QOOQ[7+(p7+(pO%:yQ!0MvO7+(mO!&zQMhO7+(mO!E^Q`O7+(nOOQ[7+(n7+(nO!&zQMhO7+(nO%;TQ`O'#KbO%;`Q`O,5=lOOQO,5?i,5?iOOQO-E<{-E<{OOQ[7+(s7+(sO%<rQpO'#HZOOQ[1G3`1G3`O!&zQMhO1G3`O%[QlO1G3`O%<yQ`O1G3`O%=UQMhO1G3`O9uQ!0LrO1G3bO$%dQ`O1G3bO9`Q`O1G3bO!CUQpO1G3bO!C^QMhO1G3bO%=dQ`O'#JPO%=xQ`O,5@}O%>QQpO,5@}OOQ!0Lb1G3c1G3cOOQ[7+$V7+$VO@zQ`O7+$VO9uQ!0LrO7+$VO%>]Q`O7+$VO%[QlO1G6lO%[QlO1G6mO%>bQ!0LrO1G6lO%>lQlO1G3kO%>sQ`O1G3kO%>xQlO1G3kOOQ[7+)T7+)TO9uQ!0LrO7+)_O`QlO7+)aOOQ['#Kh'#KhOOQ['#JS'#JSO%?PQlO,5>`OOQ[,5>`,5>`O%[QlO'#HuO%?^Q`O'#HwOOQ[,5>f,5>fO9eQ`O,5>fOOQ[,5>h,5>hOOQ[7+)j7+)jOOQ[7+)p7+)pOOQ[7+)t7+)tOOQ[7+)v7+)vO%?cQpO1G5|O%?}Q?MtO1G0zO%@XQ`O1G0zOOQO1G/s1G/sO%@dQ?MtO1G/sO?YQ`O1G/sO!)[QlO'#DmOOQO,5?P,5?POOQO-E<c-E<cOOQO,5?V,5?VOOQO-E<i-E<iO!CUQpO1G/sOOQO-E<e-E<eOOQ!0Ln1G0]1G0]OOQ!0Lf7+%u7+%uO#(ZQ`O7+%uOOQ!0Lf7+&`7+&`O?YQ`O7+&`O!CUQpO7+&`OOQO7+%x7+%xO$AlQ!0MxO7+&XOOQO7+&X7+&XO%[QlO7+&XO%@nQ!0LrO7+&XO!ByQ!0LrO7+%xO!CUQpO7+%xO%@yQ!0LrO7+&XO%AXQ!0MxO7++rO%[QlO7++rO%AiQ`O7++qO%AiQ`O7++qOOQO1G4s1G4sO9eQ`O1G4sO%AqQ`O1G4sOOQS7+%}7+%}O#(ZQ`O<<LPO4UQ!fO<<LPO%BPQ`O<<LPOOQ[<<LP<<LPO!&zQMhO<<LPO%[QlO<<LPO%BXQ`O<<LPO%BdQ!0MzO,5?aO%DoQ!0MzO,5?cO%FzQ!0MzO1G2`O%I]Q!0MzO1G2sO%KhQ!0MzO1G2uO%MsQ!fO,5?QO%[QlO,5?QOOQO-E<d-E<dO%M}Q`O1G5}OOQ!0Lf<<JU<<JUO%NVQ?MtO1G0uO&!^Q?MtO1G1PO&!eQ?MtO1G1PO&$fQ?MtO1G1PO&$mQ?MtO1G1PO&&nQ?MtO1G1PO&(oQ?MtO1G1PO&(vQ?MtO1G1PO&(}Q?MtO1G1PO&+OQ?MtO1G1PO&+VQ?MtO1G1PO&+^Q!0MxO<<JfO&-UQ?MtO1G1PO&.RQ?MvO1G1PO&/UQ?MvO'#JlO&1[Q?MtO1G1cO&1iQ?MtO1G0UO&1sQMjO,5?TOOQO-E<g-E<gO!)[QlO'#FqOOQO'#KZ'#KZOOQO1G1u1G1uO&1}Q`O1G1tO&2SQ?MtO,5?[OOOW7+'h7+'hOOOO1G/Z1G/ZO&2^Q!dO1G4xOOQ!0Lh7+(Q7+(QP!&zQMhO,5?^O!,TQMhO7+(cO&2eQ`O,5?]O9eQ`O,5?]O$+YQ`O,5?]OOQO-E<o-E<oO&2sQ`O1G6bO&2sQ`O1G6bO&2{Q`O1G6bO&3WQMjO7+'zO&3hQ!dO,5?_O&3rQ`O,5?_O!&zQMhO,5?_OOQO-E<q-E<qO&3wQ!dO1G6cO&4RQ`O1G6cO&4ZQ`O1G2kO!&zQMhO1G2kOOQ!0Lb1G2i1G2iOOQ!0Lb1G2j1G2jO%4hQpO1G2iO!CUQpO1G2iOCwQ`O1G2iOOQ!0Lb1G2q1G2qO&4`QpO1G2iO&4nQ`O1G2kO$+YQ`O1G2jOCwQ`O1G2jO$$wQlO1G2kO&4vQ`O1G2jO&5jQMjO,5?aOOQ!0Lh-E<t-E<tO&6]QMjO,5?cOOQ!0Lh-E<v-E<vO!,TQMhO7++]O&6gQMjO7++]O&6qQMjO7++]OOQ!0Lh1G/c1G/cO&7OQ`O1G/cOOQ!0Lh7+'u7+'uO&7TQMjO7+'|O&7eQ!0MxO<<KXOOQ!0Lf<<KX<<KXO&8XQ`O1G0zO!&zQMhO'#IzO&8^Q`O,5@xO&:`Q!fO<<LPO!&zQMhO1G2nO&:gQ!0LrO1G2nOOQ[<<G{<<G{O!ByQ!0LrO<<G{O&:xQ!0MxO<<I{OOQ!0Lf<<I{<<I{OOQO,5?l,5?lO&;lQ`O,5?lO&;qQ`O,5?lOOQO-E=O-E=OO&<PQ`O1G6kO&<PQ`O1G6kO9kQ`O1G6kO@zQ`O<<LlOOQ[<<Ll<<LlO&<XQ`O<<LlO9uQ!0LrO<<LlO9kQ`O<<LlOOQ[<<LX<<LXO%:yQ!0MvO<<LXOOQ[<<LY<<LYO!E^Q`O<<LYO&<^QpO'#I|O&<iQ`O,5@|O!)[QlO,5@|OOQ[1G3W1G3WOOQO'#JO'#JOO9uQ!0LrO'#JOO&<qQpO,5=uOOQ[,5=u,5=uO&<xQpO'#EgO&=PQpO'#GeO&=UQ`O7+(zO&=ZQ`O7+(zOOQ[7+(z7+(zO!&zQMhO7+(zO%[QlO7+(zO&=cQ`O7+(zOOQ[7+(|7+(|O9uQ!0LrO7+(|O$%dQ`O7+(|O9`Q`O7+(|O!CUQpO7+(|O&=nQ`O,5?kOOQO-E<}-E<}OOQO'#H^'#H^O&=yQ`O1G6iO9uQ!0LrO<<GqOOQ[<<Gq<<GqO@zQ`O<<GqO&>RQ`O7+,WO&>WQ`O7+,XO%[QlO7+,WO%[QlO7+,XOOQ[7+)V7+)VO&>]Q`O7+)VO&>bQlO7+)VO&>iQ`O7+)VOOQ[<<Ly<<LyOOQ[<<L{<<L{OOQ[-E=Q-E=QOOQ[1G3z1G3zO&>nQ`O,5>aOOQ[,5>c,5>cO&>sQ`O1G4QO9eQ`O7+&fO!)[QlO7+&fOOQO7+%_7+%_O&>xQ?MtO1G6ZO?YQ`O7+%_OOQ!0Lf<<Ia<<IaOOQ!0Lf<<Iz<<IzO?YQ`O<<IzOOQO<<Is<<IsO$AlQ!0MxO<<IsO%[QlO<<IsOOQO<<Id<<IdO!ByQ!0LrO<<IdO&?SQ!0LrO<<IsO&?_Q!0MxO<= ^O&?oQ`O<= ]OOQO7+*_7+*_O9eQ`O7+*_OOQ[ANAkANAkO&?wQ!fOANAkO!&zQMhOANAkO#(ZQ`OANAkO4UQ!fOANAkO&@OQ`OANAkO%[QlOANAkO&@WQ!0MzO7+'zO&BiQ!0MzO,5?aO&DtQ!0MzO,5?cO&GPQ!0MzO7+'|O&IbQ!fO1G4lO&IlQ?MtO7+&aO&KpQ?MvO,5=XO&MwQ?MvO,5=ZO&NXQ?MvO,5=XO&NiQ?MvO,5=ZO&NyQ?MvO,59uO'#PQ?MvO,5<kO'%SQ?MvO,5<mO''hQ?MvO,5<{O')^Q?MtO7+'kO')kQ?MtO7+'mO')xQ`O,5<]OOQO7+'`7+'`OOQ!0Lh7+*d7+*dO')}QMjO<<K}OOQO1G4w1G4wO'*UQ`O1G4wO'*aQ`O1G4wO'*oQ`O7++|O'*oQ`O7++|O!&zQMhO1G4yO'*wQ!dO1G4yO'+RQ`O7++}O'+ZQ`O7+(VO'+fQ!dO7+(VOOQ!0Lb7+(T7+(TOOQ!0Lb7+(U7+(UO!CUQpO7+(TOCwQ`O7+(TO'+pQ`O7+(VO!&zQMhO7+(VO$+YQ`O7+(UO'+uQ`O7+(VOCwQ`O7+(UO'+}QMjO<<NwO!,TQMhO<<NwOOQ!0Lh7+$}7+$}O',XQ!dO,5?fOOQO-E<x-E<xO',cQ!0MvO7+(YO!&zQMhO7+(YOOQ[AN=gAN=gO9kQ`O1G5WOOQO1G5W1G5WO',sQ`O1G5WO',xQ`O7+,VO',xQ`O7+,VO9uQ!0LrOANBWO@zQ`OANBWOOQ[ANBWANBWO'-QQ`OANBWOOQ[ANAsANAsOOQ[ANAtANAtO'-VQ`O,5?hOOQO-E<z-E<zO'-bQ?MtO1G6hOOQO,5?j,5?jOOQO-E<|-E<|OOQ[1G3a1G3aO'-lQ`O,5=POOQ[<<Lf<<LfO!&zQMhO<<LfO&=UQ`O<<LfO'-qQ`O<<LfO%[QlO<<LfOOQ[<<Lh<<LhO9uQ!0LrO<<LhO$%dQ`O<<LhO9`Q`O<<LhO'-yQpO1G5VO'.UQ`O7+,TOOQ[AN=]AN=]O9uQ!0LrOAN=]OOQ[<= r<= rOOQ[<= s<= sO'.^Q`O<= rO'.cQ`O<= sOOQ[<<Lq<<LqO'.hQ`O<<LqO'.mQlO<<LqOOQ[1G3{1G3{O?YQ`O7+)lO'.tQ`O<<JQO'/PQ?MtO<<JQOOQO<<Hy<<HyOOQ!0LfAN?fAN?fOOQOAN?_AN?_O$AlQ!0MxOAN?_OOQOAN?OAN?OO%[QlOAN?_OOQO<<My<<MyOOQ[G27VG27VO!&zQMhOG27VO#(ZQ`OG27VO'/ZQ!fOG27VO4UQ!fOG27VO'/bQ`OG27VO'/jQ?MtO<<JfO'/wQ?MvO1G2`O'1mQ?MvO,5?aO'3pQ?MvO,5?cO'5sQ?MvO1G2sO'7vQ?MvO1G2uO'9yQ?MtO<<KXO':WQ?MtO<<I{OOQO1G1w1G1wO!,TQMhOANAiOOQO7+*c7+*cO':eQ`O7+*cO':pQ`O<= hO':xQ!dO7+*eOOQ!0Lb<<Kq<<KqO$+YQ`O<<KqOCwQ`O<<KqO';SQ`O<<KqO!&zQMhO<<KqOOQ!0Lb<<Ko<<KoO!CUQpO<<KoO';_Q!dO<<KqOOQ!0Lb<<Kp<<KpO';iQ`O<<KqO!&zQMhO<<KqO$+YQ`O<<KpO';nQMjOANDcO';xQ!0MvO<<KtOOQO7+*r7+*rO9kQ`O7+*rO'<YQ`O<= qOOQ[G27rG27rO9uQ!0LrOG27rO@zQ`OG27rO!)[QlO1G5SO'<bQ`O7+,SO'<jQ`O1G2kO&=UQ`OANBQOOQ[ANBQANBQO!&zQMhOANBQO'<oQ`OANBQOOQ[ANBSANBSO9uQ!0LrOANBSO$%dQ`OANBSOOQO'#H_'#H_OOQO7+*q7+*qOOQ[G22wG22wOOQ[ANE^ANE^OOQ[ANE_ANE_OOQ[ANB]ANB]O'<wQ`OANB]OOQ[<<MW<<MWO!)[QlOAN?lOOQOG24yG24yO$AlQ!0MxOG24yO#(ZQ`OLD,qOOQ[LD,qLD,qO!&zQMhOLD,qO'<|Q!fOLD,qO'=TQ?MvO7+'zO'>yQ?MvO,5?aO'@|Q?MvO,5?cO'CPQ?MvO7+'|O'DuQMjOG27TOOQO<<M}<<M}OOQ!0LbANA]ANA]O$+YQ`OANA]OCwQ`OANA]O'EVQ!dOANA]OOQ!0LbANAZANAZO'E^Q`OANA]O!&zQMhOANA]O'EiQ!dOANA]OOQ!0LbANA[ANA[OOQO<<N^<<N^OOQ[LD-^LD-^O9uQ!0LrOLD-^O'EsQ?MtO7+*nOOQO'#Gf'#GfOOQ[G27lG27lO&=UQ`OG27lO!&zQMhOG27lOOQ[G27nG27nO9uQ!0LrOG27nOOQ[G27wG27wO'E}Q?MtOG25WOOQOLD*eLD*eOOQ[!$(!]!$(!]O#(ZQ`O!$(!]O!&zQMhO!$(!]O'FXQ!0MzOG27TOOQ!0LbG26wG26wO$+YQ`OG26wO'HjQ`OG26wOCwQ`OG26wO'HuQ!dOG26wO!&zQMhOG26wOOQ[!$(!x!$(!xOOQ[LD-WLD-WO&=UQ`OLD-WOOQ[LD-YLD-YOOQ[!)9Ew!)9EwO#(ZQ`O!)9EwOOQ!0LbLD,cLD,cO$+YQ`OLD,cOCwQ`OLD,cO'H|Q`OLD,cO'IXQ!dOLD,cOOQ[!$(!r!$(!rOOQ[!.K;c!.K;cO'I`Q?MvOG27TOOQ!0Lb!$( }!$( }O$+YQ`O!$( }OCwQ`O!$( }O'KUQ`O!$( }OOQ!0Lb!)9Ei!)9EiO$+YQ`O!)9EiOCwQ`O!)9EiOOQ!0Lb!.K;T!.K;TO$+YQ`O!.K;TOOQ!0Lb!4/0o!4/0oO!)[QlO'#DzO1PQ`O'#EXO'KaQ!fO'#JrO'KhQ!L^O'#DvO'KoQlO'#EOO'KvQ!fO'#CiO'N^Q!fO'#CiO!)[QlO'#EQO'NnQlO,5;ZO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO,5;eO!)[QlO'#IpO(!qQ`O,5<iO!)[QlO,5;eO(!yQMhO,5;eO($dQMhO,5;eO!)[QlO,5;wO!&zQMhO'#GmO(!yQMhO'#GmO!&zQMhO'#GoO(!yQMhO'#GoO1SQ`O'#DZO1SQ`O'#DZO!&zQMhO'#GPO(!yQMhO'#GPO!&zQMhO'#GRO(!yQMhO'#GRO!&zQMhO'#GaO(!yQMhO'#GaO!)[QlO,5:jO($kQpO'#D_O($uQpO'#JvO!)[QlO,5@oO'NnQlO1G0uO(%PQ?MtO'#CiO!)[QlO1G2PO!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO(%ZQ!dO'#CrO!&zQMhO,5<tO(!yQMhO,5<tO'NnQlO1G2RO!)[QlO7+&zO!&zQMhO1G2`O(!yQMhO1G2`O!&zQMhO'#IuO(!yQMhO'#IuO!&zQMhO'#IwO(!yQMhO'#IwO!&zQMhO1G2bO(!yQMhO1G2bO'NnQlO7+'mO'NnQlO7+&aO!&zQMhOANAiO(!yQMhOANAiO(%nQ`O'#EoO(%sQ`O'#EoO(%{Q`O'#F]O(&QQ`O'#EyO(&VQ`O'#KTO(&bQ`O'#KRO(&mQ`O,5;ZO(&rQMjO,5<eO(&yQ`O'#GYO('OQ`O'#GYO('TQ`O,5<eO(']Q`O,5<gO('eQ`O,5;ZO('mQ?MtO1G1`O('tQ`O,5<tO('yQ`O,5<tO((OQ`O,5<vO((TQ`O,5<vO((YQ`O1G2RO((_Q`O1G0uO((dQMjO<<K}O((kQMjO<<K}O((rQMhO'#F|O9`Q`O'#F{OAuQ`O'#EnO!)[QlO,5;tO!3oQ`O'#GYO!3oQ`O'#GYO!3oQ`O'#G[O!3oQ`O'#G[O!,TQMhO7+(cO!,TQMhO7+(cO%.zQ!dO1G2wO%.zQ!dO1G2wO!&zQMhO,5=]O!&zQMhO,5=]",
  stateData: "()x~O'|OS'}OSTOS(ORQ~OPYOQYOSfOY!VOaqOdzOeyOl!POpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!uwO!xxO!|]O$W|O$niO%h}O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO&W!WO&^!XO&`!YO&b!ZO&d![O&g!]O&m!^O&s!_O&u!`O&w!aO&y!bO&{!cO(TSO(VTO(YUO(aVO(o[O~OWtO~P`OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa!wOs!nO!S!oO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!xO#W!pO#X!pO#[!zO#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O(O!{O~OP]XR]X[]Xa]Xj]Xr]X!Q]X!S]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X'z]X(a]X(r]X(y]X(z]X~O!g%RX~P(qO_!}O(V#PO(W!}O(X#PO~O_#QO(X#PO(Y#PO(Z#QO~Ox#SO!U#TO(b#TO(c#VO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T<ZO(VTO(YUO(aVO(o[O~O![#ZO!]#WO!Y(hP!Y(vP~P+}O!^#cO~P`OPYOQYOSfOd!jOe!iOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(VTO(YUO(aVO(o[O~Op#mO![#iO!|]O#i#lO#j#iO(T<[O!k(sP~P.iO!l#oO(T#nO~O!x#sO!|]O%h#tO~O#k#uO~O!g#vO#k#uO~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!]$_O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa(fX'z(fX'w(fX!k(fX!Y(fX!_(fX%i(fX!g(fX~P1qO#S$dO#`$eO$Q$eOP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX!_(gX%i(gX~Oa(gX'z(gX'w(gX!Y(gX!k(gXv(gX!g(gX~P4UO#`$eO~O$]$hO$_$gO$f$mO~OSfO!_$nO$i$oO$k$qO~Oh%VOj%dOk%dOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T$sO(VTO(YUO(a$uO(y$}O(z%POg(^P~Ol%[O~P7eO!l%eO~O!S%hO!_%iO(T%gO~O!g%mO~Oa%nO'z%nO~O!Q%rO~P%[O(U!lO~P%[O%n%vO~P%[Oh%VO!l%eO(T%gO(U!lO~Oe%}O!l%eO(T%gO~Oj$RO~O!_&PO(T%gO(U!lO(VTO(YUO`)WP~O!Q&SO!l&RO%j&VO&T&WO~P;SO!x#sO~O%s&YO!S)SX!_)SX(T)SX~O(T&ZO~Ol!PO!u&`O%j!QO%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO~Od&eOe&dO!x&bO%h&cO%{&aO~P<bOd&hOeyOl!PO!_&gO!u&`O!xxO!|]O%h}O%l!OO%m!OO%n!OO%q!RO%s!SO%v!TO%w!TO%y!UO~Ob&kO#`&nO%j&iO(U!lO~P=gO!l&oO!u&sO~O!l#oO~O!_XO~Oa%nO'x&{O'z%nO~Oa%nO'x'OO'z%nO~Oa%nO'x'QO'z%nO~O'w]X!Y]Xv]X!k]X&[]X!_]X%i]X!g]X~P(qO!b'_O!c'WO!d'WO(U!lO(VTO(YUO~Os'UO!S'TO!['XO(e'SO!^(iP!^(xP~P@nOn'bO!_'`O(T%gO~Oe'gO!l%eO(T%gO~O!Q&SO!l&RO~Os!nO!S!oO!|<VO#T!pO#U!pO#W!pO#X!pO(U!lO(VTO(YUO(e!mO(o!sO~O!b'mO!c'lO!d'lO#V!pO#['nO#]'nO~PBYOa%nOh%VO!g#vO!l%eO'z%nO(r'pO~O!p'tO#`'rO~PChOs!nO!S!oO(VTO(YUO(e!mO(o!sO~O!_XOs(mX!S(mX!b(mX!c(mX!d(mX!|(mX#T(mX#U(mX#V(mX#W(mX#X(mX#[(mX#](mX(U(mX(V(mX(Y(mX(e(mX(o(mX~O!c'lO!d'lO(U!lO~PDWO(P'xO(Q'xO(R'zO~O_!}O(V'|O(W!}O(X'|O~O_#QO(X'|O(Y'|O(Z#QO~Ov(OO~P%[Ox#SO!U#TO(b#TO(c(RO~O![(TO!Y'WX!Y'^X!]'WX!]'^X~P+}O!](VO!Y(hX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!](VO!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~O!Y(hX~PHRO!Y([O~O!Y(uX!](uX!g(uX!k(uX(r(uX~O#`(uX#k#dX!^(uX~PJUO#`(]O!Y(wX!](wX~O!](^O!Y(vX~O!Y(aO~O#`$eO~PJUO!^(bO~P`OR#zO!Q#yO!S#{O!l#xO(aVOP!na[!naj!nar!na!]!na!p!na#R!na#n!na#o!na#p!na#q!na#r!na#s!na#t!na#u!na#v!na#x!na#z!na#{!na(r!na(y!na(z!na~Oa!na'z!na'w!na!Y!na!k!nav!na!_!na%i!na!g!na~PKlO!k(cO~O!g#vO#`(dO(r'pO!](tXa(tX'z(tX~O!k(tX~PNXO!S%hO!_%iO!|]O#i(iO#j(hO(T%gO~O!](jO!k(sX~O!k(lO~O!S%hO!_%iO#j(hO(T%gO~OP(gXR(gX[(gXj(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~O!g#vO!k(gX~P! uOR(nO!Q(mO!l#xO#S$dO!|!{a!S!{a~O!x!{a%h!{a!_!{a#i!{a#j!{a(T!{a~P!#vO!x(rO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~O#k(xO~O![(zO!k(kP~P%[O(e(|O(o[O~O!S)OO!l#xO(e(|O(o[O~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]$_Oa$qa'z$qa'w$qa!k$qa!Y$qa!_$qa%i$qa!g$qa~Ol)dO~P!&zOh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#j%cO$W%`O$t%^O$v%_O$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Og(pP~P!,TO!Q)iO!g)hO!_$^X$Z$^X$]$^X$_$^X$f$^X~O!g)hO!_({X$Z({X$]({X$_({X$f({X~O!Q)iO~P!.^O!Q)iO!_({X$Z({X$]({X$_({X$f({X~O!_)kO$Z)oO$])jO$_)jO$f)pO~O![)sO~P!)[O$]$hO$_$gO$f)wO~On$zX!Q$zX#S$zX'y$zX(y$zX(z$zX~OgmXg$zXnmX!]mX#`mX~P!0SOx)yO(b)zO(c)|O~On*VO!Q*OO'y*PO(y$}O(z%PO~Og)}O~P!1WOg*WO~Oh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S*YO!_*ZO!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op*`O![*^O(T*XO!k)OP~P!1uO#k*aO~O!l*bO~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(T*dO(VTO(YUO(a$uO(y$}O(z%PO~O![*gO!Y)PP~P!3tOr*sOs!nO!S*iO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO(e!mO~O!^*pO~P!5iO#S$dOn(`X!Q(`X'y(`X(y(`X(z(`X!](`X#`(`X~Og(`X$O(`X~P!6kOn*xO#`*wOg(_X!](_X~O!]*yOg(^X~Oj%dOk%dOl%dO(T&ZOg(^P~Os*|O~Og)}O(T&ZO~O!l+SO~O(T(vO~Op+WO!S%hO![#iO!_%iO!|]O#i#lO#j#iO(T%gO!k(sP~O!g#vO#k+XO~O!S%hO![+ZO!](^O!_%iO(T%gO!Y(vP~Os'[O!S+]O![+[O(VTO(YUO(e(|O~O!^(xP~P!9|O!]+^Oa)TX'z)TX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO#z$WO#{$XO(aVO(r$YO(y#|O(z#}O~Oa!ja!]!ja'z!ja'w!ja!Y!ja!k!jav!ja!_!ja%i!ja!g!ja~P!:tOR#zO!Q#yO!S#{O!l#xO(aVOP!ra[!raj!rar!ra!]!ra!p!ra#R!ra#n!ra#o!ra#p!ra#q!ra#r!ra#s!ra#t!ra#u!ra#v!ra#x!ra#z!ra#{!ra(r!ra(y!ra(z!ra~Oa!ra'z!ra'w!ra!Y!ra!k!rav!ra!_!ra%i!ra!g!ra~P!=[OR#zO!Q#yO!S#{O!l#xO(aVOP!ta[!taj!tar!ta!]!ta!p!ta#R!ta#n!ta#o!ta#p!ta#q!ta#r!ta#s!ta#t!ta#u!ta#v!ta#x!ta#z!ta#{!ta(r!ta(y!ta(z!ta~Oa!ta'z!ta'w!ta!Y!ta!k!tav!ta!_!ta%i!ta!g!ta~P!?rOh%VOn+gO!_'`O%i+fO~O!g+iOa(]X!_(]X'z(]X!](]X~Oa%nO!_XO'z%nO~Oh%VO!l%eO~Oh%VO!l%eO(T%gO~O!g#vO#k(xO~Ob+tO%j+uO(T+qO(VTO(YUO!^)XP~O!]+vO`)WX~O[+zO~O`+{O~O!_&PO(T%gO(U!lO`)WP~O%j,OO~P;SOh%VO#`,SO~Oh%VOn,VO!_$|O~O!_,XO~O!Q,ZO!_XO~O%n%vO~O!x,`O~Oe,eO~Ob,fO(T#nO(VTO(YUO!^)VP~Oe%}O~O%j!QO(T&ZO~P=gO[,kO`,jO~OPYOQYOSfOdzOeyOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!iuO!lZO!oYO!pYO!qYO!svO!xxO!|]O$niO%h}O(VTO(YUO(aVO(o[O~O!_!eO!u!gO$W!kO(T!dO~P!FyO`,jOa%nO'z%nO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!x!hO$W!kO$niO(T!dO(VTO(YUO(aVO(o[O~Oa,pOl!OO!uwO%l!OO%m!OO%n!OO~P!IcO!l&oO~O&^,vO~O!_,xO~O&o,zO&q,{OP&laQ&laS&laY&laa&lad&lae&lal&lap&lar&las&lat&laz&la|&la!O&la!S&la!W&la!X&la!_&la!i&la!l&la!o&la!p&la!q&la!s&la!u&la!x&la!|&la$W&la$n&la%h&la%j&la%l&la%m&la%n&la%q&la%s&la%v&la%w&la%y&la&W&la&^&la&`&la&b&la&d&la&g&la&m&la&s&la&u&la&w&la&y&la&{&la'w&la(T&la(V&la(Y&la(a&la(o&la!^&la&e&lab&la&j&la~O(T-QO~Oh!eX!]!RX!^!RX!g!RX!g!eX!l!eX#`!RX~O!]!eX!^!eX~P#!iO!g-VO#`-UOh(jX!]#hX!^#hX!g(jX!l(jX~O!](jX!^(jX~P##[Oh%VO!g-XO!l%eO!]!aX!^!aX~Os!nO!S!oO(VTO(YUO(e!mO~OP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_!eO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(VTO(YUO(aVO(o[O~O(T=QO~P#$qO!]-]O!^(iX~O!^-_O~O!g-VO#`-UO!]#hX!^#hX~O!]-`O!^(xX~O!^-bO~O!c-cO!d-cO(U!lO~P#$`O!^-fO~P'_On-iO!_'`O~O!Y-nO~Os!{a!b!{a!c!{a!d!{a#T!{a#U!{a#V!{a#W!{a#X!{a#[!{a#]!{a(U!{a(V!{a(Y!{a(e!{a(o!{a~P!#vO!p-sO#`-qO~PChO!c-uO!d-uO(U!lO~PDWOa%nO#`-qO'z%nO~Oa%nO!g#vO#`-qO'z%nO~Oa%nO!g#vO!p-sO#`-qO'z%nO(r'pO~O(P'xO(Q'xO(R-zO~Ov-{O~O!Y'Wa!]'Wa~P!:tO![.PO!Y'WX!]'WX~P%[O!](VO!Y(ha~O!Y(ha~PHRO!](^O!Y(va~O!S%hO![.TO!_%iO(T%gO!Y'^X!]'^X~O#`.VO!](ta!k(taa(ta'z(ta~O!g#vO~P#,wO!](jO!k(sa~O!S%hO!_%iO#j.ZO(T%gO~Op.`O!S%hO![.]O!_%iO!|]O#i._O#j.]O(T%gO!]'aX!k'aX~OR.dO!l#xO~Oh%VOn.gO!_'`O%i.fO~Oa#ci!]#ci'z#ci'w#ci!Y#ci!k#civ#ci!_#ci%i#ci!g#ci~P!:tOn>]O!Q*OO'y*PO(y$}O(z%PO~O#k#_aa#_a#`#_a'z#_a!]#_a!k#_a!_#_a!Y#_a~P#/sO#k(`XP(`XR(`X[(`Xa(`Xj(`Xr(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X'z(`X(a(`X(r(`X!k(`X!Y(`X'w(`Xv(`X!_(`X%i(`X!g(`X~P!6kO!].tO!k(kX~P!:tO!k.wO~O!Y.yO~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mia#mij#mir#mi!]#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#n#mi~P#3cO#n$OO~P#3cOP$[OR#zOr$aO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO[#mia#mij#mi!]#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#r#mi~P#6QO#r$QO~P#6QOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO(aVOa#mi!]#mi#x#mi#z#mi#{#mi'z#mi(r#mi(y#mi(z#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#v#mi~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO(aVO(z#}Oa#mi!]#mi#z#mi#{#mi'z#mi(r#mi(y#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#x$UO~P#;VO#x#mi~P#;VO#v$SO~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#n$OO#o$PO#p$PO#q$PO#r$QO#s$RO#t$RO#u$bO#v$SO#x$UO(aVO(y#|O(z#}Oa#mi!]#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~O#z#mi~P#={O#z$WO~P#={OP]XR]X[]Xj]Xr]X!Q]X!S]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X!]]X!^]X~O$O]X~P#@jOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO#z<gO#{<hO(aVO(r$YO(y#|O(z#}O~O$O.{O~P#BwO#S$dO#`<nO$Q<nO$O(gX!^(gX~P! uOa'da!]'da'z'da'w'da!k'da!Y'dav'da!_'da%i'da!g'da~P!:tO[#mia#mij#mir#mi!]#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi'z#mi(r#mi'w#mi!Y#mi!k#miv#mi!_#mi%i#mi!g#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n$OO#o$PO#p$PO#q$PO(aVO(y#mi(z#mi~P#EyOn>]O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P#EyO!]/POg(pX~P!1WOg/RO~Oa$Pi!]$Pi'z$Pi'w$Pi!Y$Pi!k$Piv$Pi!_$Pi%i$Pi!g$Pi~P!:tO$]/SO$_/SO~O$]/TO$_/TO~O!g)hO#`/UO!_$cX$Z$cX$]$cX$_$cX$f$cX~O![/VO~O!_)kO$Z/XO$])jO$_)jO$f/YO~O!]<iO!^(fX~P#BwO!^/ZO~O!g)hO$f({X~O$f/]O~Ov/^O~P!&zOx)yO(b)zO(c/aO~O!S/dO~O(y$}On%aa!Q%aa'y%aa(z%aa!]%aa#`%aa~Og%aa$O%aa~P#L{O(z%POn%ca!Q%ca'y%ca(y%ca!]%ca#`%ca~Og%ca$O%ca~P#MnO!]fX!gfX!kfX!k$zX(rfX~P!0SOp%WO![/mO!](^O(T/lO!Y(vP!Y)PP~P!1uOr*sO!b*qO!c*kO!d*kO!l*bO#[*rO%`*mO(U!lO(VTO(YUO~Os<}O!S/nO![+[O!^*pO(e<|O!^(xP~P$ [O!k/oO~P#/sO!]/pO!g#vO(r'pO!k)OX~O!k/uO~OnoX!QoX'yoX(yoX(zoX~O!g#vO!koX~P$#OOp/wO!S%hO![*^O!_%iO(T%gO!k)OP~O#k/xO~O!Y$zX!]$zX!g%RX~P!0SO!]/yO!Y)PX~P#/sO!g/{O~O!Y/}O~OpkO(T0OO~P.iOh%VOr0TO!g#vO!l%eO(r'pO~O!g+iO~Oa%nO!]0XO'z%nO~O!^0ZO~P!5iO!c0[O!d0[O(U!lO~P#$`Os!nO!S0]O(VTO(YUO(e!mO~O#[0_O~Og%aa!]%aa#`%aa$O%aa~P!1WOg%ca!]%ca#`%ca$O%ca~P!1WOj%dOk%dOl%dO(T&ZOg'mX!]'mX~O!]*yOg(^a~Og0hO~On0jO#`0iOg(_a!](_a~OR0kO!Q0kO!S0lO#S$dOn}a'y}a(y}a(z}a!]}a#`}a~Og}a$O}a~P$(cO!Q*OO'y*POn$sa(y$sa(z$sa!]$sa#`$sa~Og$sa$O$sa~P$)_O!Q*OO'y*POn$ua(y$ua(z$ua!]$ua#`$ua~Og$ua$O$ua~P$*QO#k0oO~Og%Ta!]%Ta#`%Ta$O%Ta~P!1WO!g#vO~O#k0rO~O!]+^Oa)Ta'z)Ta~OR#zO!Q#yO!S#{O!l#xO(aVOP!ri[!rij!rir!ri!]!ri!p!ri#R!ri#n!ri#o!ri#p!ri#q!ri#r!ri#s!ri#t!ri#u!ri#v!ri#x!ri#z!ri#{!ri(r!ri(y!ri(z!ri~Oa!ri'z!ri'w!ri!Y!ri!k!riv!ri!_!ri%i!ri!g!ri~P$+oOh%VOr%XOs$tOt$tOz%YO|%ZO!O<sO!S${O!_$|O!i>VO!l$xO#j<yO$W%`O$t<uO$v<wO$y%aO(VTO(YUO(a$uO(y$}O(z%PO~Op0{O%]0|O(T0zO~P$.VO!g+iOa(]a!_(]a'z(]a!](]a~O#k1SO~O[]X!]fX!^fX~O!]1TO!^)XX~O!^1VO~O[1WO~Ob1YO(T+qO(VTO(YUO~O!_&PO(T%gO`'uX!]'uX~O!]+vO`)Wa~O!k1]O~P!:tO[1`O~O`1aO~O#`1fO~On1iO!_$|O~O(e(|O!^)UP~Oh%VOn1rO!_1oO%i1qO~O[1|O!]1zO!^)VX~O!^1}O~O`2POa%nO'z%nO~O(T#nO(VTO(YUO~O#S$dO#`$eO$Q$eOP(gXR(gX[(gXr(gX!Q(gX!S(gX!](gX!l(gX!p(gX#R(gX#n(gX#o(gX#p(gX#q(gX#r(gX#s(gX#t(gX#u(gX#v(gX#x(gX#z(gX#{(gX(a(gX(r(gX(y(gX(z(gX~Oj2SO&[2TOa(gX~P$3pOj2SO#`$eO&[2TO~Oa2VO~P%[Oa2XO~O&e2[OP&ciQ&ciS&ciY&cia&cid&cie&cil&cip&cir&cis&cit&ciz&ci|&ci!O&ci!S&ci!W&ci!X&ci!_&ci!i&ci!l&ci!o&ci!p&ci!q&ci!s&ci!u&ci!x&ci!|&ci$W&ci$n&ci%h&ci%j&ci%l&ci%m&ci%n&ci%q&ci%s&ci%v&ci%w&ci%y&ci&W&ci&^&ci&`&ci&b&ci&d&ci&g&ci&m&ci&s&ci&u&ci&w&ci&y&ci&{&ci'w&ci(T&ci(V&ci(Y&ci(a&ci(o&ci!^&cib&ci&j&ci~Ob2bO!^2`O&j2aO~P`O!_XO!l2dO~O&q,{OP&liQ&liS&liY&lia&lid&lie&lil&lip&lir&lis&lit&liz&li|&li!O&li!S&li!W&li!X&li!_&li!i&li!l&li!o&li!p&li!q&li!s&li!u&li!x&li!|&li$W&li$n&li%h&li%j&li%l&li%m&li%n&li%q&li%s&li%v&li%w&li%y&li&W&li&^&li&`&li&b&li&d&li&g&li&m&li&s&li&u&li&w&li&y&li&{&li'w&li(T&li(V&li(Y&li(a&li(o&li!^&li&e&lib&li&j&li~O!Y2jO~O!]!aa!^!aa~P#BwOs!nO!S!oO![2pO(e!mO!]'XX!^'XX~P@nO!]-]O!^(ia~O!]'_X!^'_X~P!9|O!]-`O!^(xa~O!^2wO~P'_Oa%nO#`3QO'z%nO~Oa%nO!g#vO#`3QO'z%nO~Oa%nO!g#vO!p3UO#`3QO'z%nO(r'pO~Oa%nO'z%nO~P!:tO!]$_Ov$qa~O!Y'Wi!]'Wi~P!:tO!](VO!Y(hi~O!](^O!Y(vi~O!Y(wi!](wi~P!:tO!](ti!k(tia(ti'z(ti~P!:tO#`3WO!](ti!k(tia(ti'z(ti~O!](jO!k(si~O!S%hO!_%iO!|]O#i3]O#j3[O(T%gO~O!S%hO!_%iO#j3[O(T%gO~On3dO!_'`O%i3cO~Oh%VOn3dO!_'`O%i3cO~O#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aav%aa!_%aa%i%aa!g%aa~P#L{O#k%caP%caR%ca[%caa%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%cav%ca!_%ca%i%ca!g%ca~P#MnO#k%aaP%aaR%aa[%aaa%aaj%aar%aa!S%aa!]%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa'z%aa(a%aa(r%aa!k%aa!Y%aa'w%aa#`%aav%aa!_%aa%i%aa!g%aa~P#/sO#k%caP%caR%ca[%caa%caj%car%ca!S%ca!]%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca'z%ca(a%ca(r%ca!k%ca!Y%ca'w%ca#`%cav%ca!_%ca%i%ca!g%ca~P#/sO#k}aP}a[}aa}aj}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a'z}a(a}a(r}a!k}a!Y}a'w}av}a!_}a%i}a!g}a~P$(cO#k$saP$saR$sa[$saa$saj$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa'z$sa(a$sa(r$sa!k$sa!Y$sa'w$sav$sa!_$sa%i$sa!g$sa~P$)_O#k$uaP$uaR$ua[$uaa$uaj$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua'z$ua(a$ua(r$ua!k$ua!Y$ua'w$uav$ua!_$ua%i$ua!g$ua~P$*QO#k%TaP%TaR%Ta[%Taa%Taj%Tar%Ta!S%Ta!]%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta'z%Ta(a%Ta(r%Ta!k%Ta!Y%Ta'w%Ta#`%Tav%Ta!_%Ta%i%Ta!g%Ta~P#/sOa#cq!]#cq'z#cq'w#cq!Y#cq!k#cqv#cq!_#cq%i#cq!g#cq~P!:tO![3lO!]'YX!k'YX~P%[O!].tO!k(ka~O!].tO!k(ka~P!:tO!Y3oO~O$O!na!^!na~PKlO$O!ja!]!ja!^!ja~P#BwO$O!ra!^!ra~P!=[O$O!ta!^!ta~P!?rOg']X!]']X~P!,TO!]/POg(pa~OSfO!_4TO$d4UO~O!^4YO~Ov4ZO~P#/sOa$mq!]$mq'z$mq'w$mq!Y$mq!k$mqv$mq!_$mq%i$mq!g$mq~P!:tO!Y4]O~P!&zO!S4^O~O!Q*OO'y*PO(z%POn'ia(y'ia!]'ia#`'ia~Og'ia$O'ia~P%-fO!Q*OO'y*POn'ka(y'ka(z'ka!]'ka#`'ka~Og'ka$O'ka~P%.XO(r$YO~P#/sO!YfX!Y$zX!]fX!]$zX!g%RX#`fX~P!0SOp%WO(T=WO~P!1uOp4bO!S%hO![4aO!_%iO(T%gO!]'eX!k'eX~O!]/pO!k)Oa~O!]/pO!g#vO!k)Oa~O!]/pO!g#vO(r'pO!k)Oa~Og$|i!]$|i#`$|i$O$|i~P!1WO![4jO!Y'gX!]'gX~P!3tO!]/yO!Y)Pa~O!]/yO!Y)Pa~P#/sOP]XR]X[]Xj]Xr]X!Q]X!S]X!Y]X!]]X!l]X!p]X#R]X#S]X#`]X#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~Oj%YX!g%YX~P%2OOj4oO!g#vO~Oh%VO!g#vO!l%eO~Oh%VOr4tO!l%eO(r'pO~Or4yO!g#vO(r'pO~Os!nO!S4zO(VTO(YUO(e!mO~O(y$}On%ai!Q%ai'y%ai(z%ai!]%ai#`%ai~Og%ai$O%ai~P%5oO(z%POn%ci!Q%ci'y%ci(y%ci!]%ci#`%ci~Og%ci$O%ci~P%6bOg(_i!](_i~P!1WO#`5QOg(_i!](_i~P!1WO!k5VO~Oa$oq!]$oq'z$oq'w$oq!Y$oq!k$oqv$oq!_$oq%i$oq!g$oq~P!:tO!Y5ZO~O!]5[O!_)QX~P#/sOa$zX!_$zX%^]X'z$zX!]$zX~P!0SO%^5_OaoX!_oX'zoX!]oX~P$#OOp5`O(T#nO~O%^5_O~Ob5fO%j5gO(T+qO(VTO(YUO!]'tX!^'tX~O!]1TO!^)Xa~O[5kO~O`5lO~O[5pO~Oa%nO'z%nO~P#/sO!]5uO#`5wO!^)UX~O!^5xO~Or6OOs!nO!S*iO!b!yO!c!vO!d!vO!|<VO#T!pO#U!pO#V!pO#W!pO#X!pO#[5}O#]!zO(U!lO(VTO(YUO(e!mO(o!sO~O!^5|O~P%;eOn6TO!_1oO%i6SO~Oh%VOn6TO!_1oO%i6SO~Ob6[O(T#nO(VTO(YUO!]'sX!^'sX~O!]1zO!^)Va~O(VTO(YUO(e6^O~O`6bO~Oj6eO&[6fO~PNXO!k6gO~P%[Oa6iO~Oa6iO~P%[Ob2bO!^6nO&j2aO~P`O!g6pO~O!g6rOh(ji!](ji!^(ji!g(ji!l(jir(ji(r(ji~O!]#hi!^#hi~P#BwO#`6sO!]#hi!^#hi~O!]!ai!^!ai~P#BwOa%nO#`6|O'z%nO~Oa%nO!g#vO#`6|O'z%nO~O!](tq!k(tqa(tq'z(tq~P!:tO!](jO!k(sq~O!S%hO!_%iO#j7TO(T%gO~O!_'`O%i7WO~On7[O!_'`O%i7WO~O#k'iaP'iaR'ia['iaa'iaj'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia'z'ia(a'ia(r'ia!k'ia!Y'ia'w'iav'ia!_'ia%i'ia!g'ia~P%-fO#k'kaP'kaR'ka['kaa'kaj'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka'z'ka(a'ka(r'ka!k'ka!Y'ka'w'kav'ka!_'ka%i'ka!g'ka~P%.XO#k$|iP$|iR$|i[$|ia$|ij$|ir$|i!S$|i!]$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i'z$|i(a$|i(r$|i!k$|i!Y$|i'w$|i#`$|iv$|i!_$|i%i$|i!g$|i~P#/sO#k%aiP%aiR%ai[%aia%aij%air%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai'z%ai(a%ai(r%ai!k%ai!Y%ai'w%aiv%ai!_%ai%i%ai!g%ai~P%5oO#k%ciP%ciR%ci[%cia%cij%cir%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci'z%ci(a%ci(r%ci!k%ci!Y%ci'w%civ%ci!_%ci%i%ci!g%ci~P%6bO!]'Ya!k'Ya~P!:tO!].tO!k(ki~O$O#ci!]#ci!^#ci~P#BwOP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(aVO[#mij#mir#mi#R#mi#o#mi#p#mi#q#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#n#mi~P%NdO#n<_O~P%NdOP$[OR#zOr<kO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO[#mij#mi#R#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#r#mi~P&!lO#r<aO~P&!lOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO(aVO#x#mi#z#mi#{#mi$O#mi(r#mi(y#mi(z#mi!]#mi!^#mi~O#v#mi~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO(aVO(z#}O#z#mi#{#mi$O#mi(r#mi(y#mi!]#mi!^#mi~O#x<eO~P&&uO#x#mi~P&&uO#v<cO~P&$tOP$[OR#zO[<mOj<bOr<kO!Q#yO!S#{O!l#xO!p$[O#R<bO#n<_O#o<`O#p<`O#q<`O#r<aO#s<bO#t<bO#u<lO#v<cO#x<eO(aVO(y#|O(z#}O#{#mi$O#mi(r#mi!]#mi!^#mi~O#z#mi~P&)UO#z<gO~P&)UOa#|y!]#|y'z#|y'w#|y!Y#|y!k#|yv#|y!_#|y%i#|y!g#|y~P!:tO[#mij#mir#mi#R#mi#r#mi#s#mi#t#mi#u#mi#v#mi#x#mi#z#mi#{#mi$O#mi(r#mi!]#mi!^#mi~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#n<_O#o<`O#p<`O#q<`O(aVO(y#mi(z#mi~P&,QOn>^O!Q*OO'y*PO(y$}O(z%POP#miR#mi!S#mi!l#mi!p#mi#n#mi#o#mi#p#mi#q#mi(a#mi~P&,QO#S$dOP(`XR(`X[(`Xj(`Xn(`Xr(`X!Q(`X!S(`X!l(`X!p(`X#R(`X#n(`X#o(`X#p(`X#q(`X#r(`X#s(`X#t(`X#u(`X#v(`X#x(`X#z(`X#{(`X$O(`X'y(`X(a(`X(r(`X(y(`X(z(`X!](`X!^(`X~O$O$Pi!]$Pi!^$Pi~P#BwO$O!ri!^!ri~P$+oOg']a!]']a~P!1WO!^7nO~O!]'da!^'da~P#BwO!Y7oO~P#/sO!g#vO(r'pO!]'ea!k'ea~O!]/pO!k)Oi~O!]/pO!g#vO!k)Oi~Og$|q!]$|q#`$|q$O$|q~P!1WO!Y'ga!]'ga~P#/sO!g7vO~O!]/yO!Y)Pi~P#/sO!]/yO!Y)Pi~O!Y7yO~Oh%VOr8OO!l%eO(r'pO~Oj8QO!g#vO~Or8TO!g#vO(r'pO~O!Q*OO'y*PO(z%POn'ja(y'ja!]'ja#`'ja~Og'ja$O'ja~P&5RO!Q*OO'y*POn'la(y'la(z'la!]'la#`'la~Og'la$O'la~P&5tOg(_q!](_q~P!1WO#`8VOg(_q!](_q~P!1WO!Y8WO~Og%Oq!]%Oq#`%Oq$O%Oq~P!1WOa$oy!]$oy'z$oy'w$oy!Y$oy!k$oyv$oy!_$oy%i$oy!g$oy~P!:tO!g6rO~O!]5[O!_)Qa~O!_'`OP$TaR$Ta[$Taj$Tar$Ta!Q$Ta!S$Ta!]$Ta!l$Ta!p$Ta#R$Ta#n$Ta#o$Ta#p$Ta#q$Ta#r$Ta#s$Ta#t$Ta#u$Ta#v$Ta#x$Ta#z$Ta#{$Ta(a$Ta(r$Ta(y$Ta(z$Ta~O%i7WO~P&8fO%^8[Oa%[i!_%[i'z%[i!]%[i~Oa#cy!]#cy'z#cy'w#cy!Y#cy!k#cyv#cy!_#cy%i#cy!g#cy~P!:tO[8^O~Ob8`O(T+qO(VTO(YUO~O!]1TO!^)Xi~O`8dO~O(e(|O!]'pX!^'pX~O!]5uO!^)Ua~O!^8nO~P%;eO(o!sO~P$&YO#[8oO~O!_1oO~O!_1oO%i8qO~On8tO!_1oO%i8qO~O[8yO!]'sa!^'sa~O!]1zO!^)Vi~O!k8}O~O!k9OO~O!k9RO~O!k9RO~P%[Oa9TO~O!g9UO~O!k9VO~O!](wi!^(wi~P#BwOa%nO#`9_O'z%nO~O!](ty!k(tya(ty'z(ty~P!:tO!](jO!k(sy~O%i9bO~P&8fO!_'`O%i9bO~O#k$|qP$|qR$|q[$|qa$|qj$|qr$|q!S$|q!]$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q'z$|q(a$|q(r$|q!k$|q!Y$|q'w$|q#`$|qv$|q!_$|q%i$|q!g$|q~P#/sO#k'jaP'jaR'ja['jaa'jaj'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja'z'ja(a'ja(r'ja!k'ja!Y'ja'w'jav'ja!_'ja%i'ja!g'ja~P&5RO#k'laP'laR'la['laa'laj'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la'z'la(a'la(r'la!k'la!Y'la'w'lav'la!_'la%i'la!g'la~P&5tO#k%OqP%OqR%Oq[%Oqa%Oqj%Oqr%Oq!S%Oq!]%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq'z%Oq(a%Oq(r%Oq!k%Oq!Y%Oq'w%Oq#`%Oqv%Oq!_%Oq%i%Oq!g%Oq~P#/sO!]'Yi!k'Yi~P!:tO$O#cq!]#cq!^#cq~P#BwO(y$}OP%aaR%aa[%aaj%aar%aa!S%aa!l%aa!p%aa#R%aa#n%aa#o%aa#p%aa#q%aa#r%aa#s%aa#t%aa#u%aa#v%aa#x%aa#z%aa#{%aa$O%aa(a%aa(r%aa!]%aa!^%aa~On%aa!Q%aa'y%aa(z%aa~P&IyO(z%POP%caR%ca[%caj%car%ca!S%ca!l%ca!p%ca#R%ca#n%ca#o%ca#p%ca#q%ca#r%ca#s%ca#t%ca#u%ca#v%ca#x%ca#z%ca#{%ca$O%ca(a%ca(r%ca!]%ca!^%ca~On%ca!Q%ca'y%ca(y%ca~P&LQOn>^O!Q*OO'y*PO(z%PO~P&IyOn>^O!Q*OO'y*PO(y$}O~P&LQOR0kO!Q0kO!S0lO#S$dOP}a[}aj}an}ar}a!l}a!p}a#R}a#n}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#x}a#z}a#{}a$O}a'y}a(a}a(r}a(y}a(z}a!]}a!^}a~O!Q*OO'y*POP$saR$sa[$saj$san$sar$sa!S$sa!l$sa!p$sa#R$sa#n$sa#o$sa#p$sa#q$sa#r$sa#s$sa#t$sa#u$sa#v$sa#x$sa#z$sa#{$sa$O$sa(a$sa(r$sa(y$sa(z$sa!]$sa!^$sa~O!Q*OO'y*POP$uaR$ua[$uaj$uan$uar$ua!S$ua!l$ua!p$ua#R$ua#n$ua#o$ua#p$ua#q$ua#r$ua#s$ua#t$ua#u$ua#v$ua#x$ua#z$ua#{$ua$O$ua(a$ua(r$ua(y$ua(z$ua!]$ua!^$ua~On>^O!Q*OO'y*PO(y$}O(z%PO~OP%TaR%Ta[%Taj%Tar%Ta!S%Ta!l%Ta!p%Ta#R%Ta#n%Ta#o%Ta#p%Ta#q%Ta#r%Ta#s%Ta#t%Ta#u%Ta#v%Ta#x%Ta#z%Ta#{%Ta$O%Ta(a%Ta(r%Ta!]%Ta!^%Ta~P''VO$O$mq!]$mq!^$mq~P#BwO$O$oq!]$oq!^$oq~P#BwO!^9oO~O$O9pO~P!1WO!g#vO!]'ei!k'ei~O!g#vO(r'pO!]'ei!k'ei~O!]/pO!k)Oq~O!Y'gi!]'gi~P#/sO!]/yO!Y)Pq~Or9wO!g#vO(r'pO~O[9yO!Y9xO~P#/sO!Y9xO~Oj:PO!g#vO~Og(_y!](_y~P!1WO!]'na!_'na~P#/sOa%[q!_%[q'z%[q!]%[q~P#/sO[:UO~O!]1TO!^)Xq~O`:YO~O#`:ZO!]'pa!^'pa~O!]5uO!^)Ui~P#BwO!S:]O~O!_1oO%i:`O~O(VTO(YUO(e:eO~O!]1zO!^)Vq~O!k:hO~O!k:iO~O!k:jO~O!k:jO~P%[O#`:mO!]#hy!^#hy~O!]#hy!^#hy~P#BwO%i:rO~P&8fO!_'`O%i:rO~O$O#|y!]#|y!^#|y~P#BwOP$|iR$|i[$|ij$|ir$|i!S$|i!l$|i!p$|i#R$|i#n$|i#o$|i#p$|i#q$|i#r$|i#s$|i#t$|i#u$|i#v$|i#x$|i#z$|i#{$|i$O$|i(a$|i(r$|i!]$|i!^$|i~P''VO!Q*OO'y*PO(z%POP'iaR'ia['iaj'ian'iar'ia!S'ia!l'ia!p'ia#R'ia#n'ia#o'ia#p'ia#q'ia#r'ia#s'ia#t'ia#u'ia#v'ia#x'ia#z'ia#{'ia$O'ia(a'ia(r'ia(y'ia!]'ia!^'ia~O!Q*OO'y*POP'kaR'ka['kaj'kan'kar'ka!S'ka!l'ka!p'ka#R'ka#n'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#x'ka#z'ka#{'ka$O'ka(a'ka(r'ka(y'ka(z'ka!]'ka!^'ka~O(y$}OP%aiR%ai[%aij%ain%air%ai!Q%ai!S%ai!l%ai!p%ai#R%ai#n%ai#o%ai#p%ai#q%ai#r%ai#s%ai#t%ai#u%ai#v%ai#x%ai#z%ai#{%ai$O%ai'y%ai(a%ai(r%ai(z%ai!]%ai!^%ai~O(z%POP%ciR%ci[%cij%cin%cir%ci!Q%ci!S%ci!l%ci!p%ci#R%ci#n%ci#o%ci#p%ci#q%ci#r%ci#s%ci#t%ci#u%ci#v%ci#x%ci#z%ci#{%ci$O%ci'y%ci(a%ci(r%ci(y%ci!]%ci!^%ci~O$O$oy!]$oy!^$oy~P#BwO$O#cy!]#cy!^#cy~P#BwO!g#vO!]'eq!k'eq~O!]/pO!k)Oy~O!Y'gq!]'gq~P#/sOr:|O!g#vO(r'pO~O[;QO!Y;PO~P#/sO!Y;PO~Og(_!R!](_!R~P!1WOa%[y!_%[y'z%[y!]%[y~P#/sO!]1TO!^)Xy~O!]5uO!^)Uq~O(T;XO~O!_1oO%i;[O~O!k;_O~O%i;dO~P&8fOP$|qR$|q[$|qj$|qr$|q!S$|q!l$|q!p$|q#R$|q#n$|q#o$|q#p$|q#q$|q#r$|q#s$|q#t$|q#u$|q#v$|q#x$|q#z$|q#{$|q$O$|q(a$|q(r$|q!]$|q!^$|q~P''VO!Q*OO'y*PO(z%POP'jaR'ja['jaj'jan'jar'ja!S'ja!l'ja!p'ja#R'ja#n'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#x'ja#z'ja#{'ja$O'ja(a'ja(r'ja(y'ja!]'ja!^'ja~O!Q*OO'y*POP'laR'la['laj'lan'lar'la!S'la!l'la!p'la#R'la#n'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#x'la#z'la#{'la$O'la(a'la(r'la(y'la(z'la!]'la!^'la~OP%OqR%Oq[%Oqj%Oqr%Oq!S%Oq!l%Oq!p%Oq#R%Oq#n%Oq#o%Oq#p%Oq#q%Oq#r%Oq#s%Oq#t%Oq#u%Oq#v%Oq#x%Oq#z%Oq#{%Oq$O%Oq(a%Oq(r%Oq!]%Oq!^%Oq~P''VOg%e!Z!]%e!Z#`%e!Z$O%e!Z~P!1WO!Y;hO~P#/sOr;iO!g#vO(r'pO~O[;kO!Y;hO~P#/sO!]'pq!^'pq~P#BwO!]#h!Z!^#h!Z~P#BwO#k%e!ZP%e!ZR%e!Z[%e!Za%e!Zj%e!Zr%e!Z!S%e!Z!]%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z'z%e!Z(a%e!Z(r%e!Z!k%e!Z!Y%e!Z'w%e!Z#`%e!Zv%e!Z!_%e!Z%i%e!Z!g%e!Z~P#/sOr;tO!g#vO(r'pO~O!Y;uO~P#/sOr;|O!g#vO(r'pO~O!Y;}O~P#/sOP%e!ZR%e!Z[%e!Zj%e!Zr%e!Z!S%e!Z!l%e!Z!p%e!Z#R%e!Z#n%e!Z#o%e!Z#p%e!Z#q%e!Z#r%e!Z#s%e!Z#t%e!Z#u%e!Z#v%e!Z#x%e!Z#z%e!Z#{%e!Z$O%e!Z(a%e!Z(r%e!Z!]%e!Z!^%e!Z~P''VOr<QO!g#vO(r'pO~Ov(fX~P1qO!Q%rO~P!)[O(U!lO~P!)[O!YfX!]fX#`fX~P%2OOP]XR]X[]Xj]Xr]X!Q]X!S]X!]]X!]fX!l]X!p]X#R]X#S]X#`]X#`fX#kfX#n]X#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#x]X#z]X#{]X$Q]X(a]X(r]X(y]X(z]X~O!gfX!k]X!kfX(rfX~P'LTOP<UOQ<UOSfOd>ROe!iOpkOr<UOskOtkOzkO|<UO!O<UO!SWO!WkO!XkO!_XO!i<XO!lZO!o<UO!p<UO!q<UO!s<YO!u<]O!x!hO$W!kO$n>PO(T)]O(VTO(YUO(aVO(o[O~O!]<iO!^$qa~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<tO!S${O!_$|O!i>WO!l$xO#j<zO$W%`O$t<vO$v<xO$y%aO(T(vO(VTO(YUO(a$uO(y$}O(z%PO~Ol)dO~P(!yOr!eX(r!eX~P#!iOr(jX(r(jX~P##[O!^]X!^fX~P'LTO!YfX!Y$zX!]fX!]$zX#`fX~P!0SO#k<^O~O!g#vO#k<^O~O#`<nO~Oj<bO~O#`=OO!](wX!^(wX~O#`<nO!](uX!^(uX~O#k=PO~Og=RO~P!1WO#k=XO~O#k=YO~Og=RO(T&ZO~O!g#vO#k=ZO~O!g#vO#k=PO~O$O=[O~P#BwO#k=]O~O#k=^O~O#k=cO~O#k=dO~O#k=eO~O#k=fO~O$O=gO~P!1WO$O=hO~P!1WOl=sO~P7eOk#S#T#U#W#X#[#i#j#u$n$t$v$y%]%^%h%i%j%q%s%v%w%y%{~(OT#o!X'|(U#ps#n#qr!Q'}$]'}(T$_(e~",
  goto: "$9Y)]PPPPPP)^PP)aP)rP+W/]PPPP6mPP7TPP=QPPP@tPA^PA^PPPA^PCfPA^PA^PA^PCjPCoPD^PIWPPPI[PPPPI[L_PPPLeMVPI[PI[PP! eI[PPPI[PI[P!#lI[P!'S!(X!(bP!)U!)Y!)U!,gPPPPPPP!-W!(XPP!-h!/YP!2iI[I[!2n!5z!:h!:h!>gPPP!>oI[PPPPPPPPP!BOP!C]PPI[!DnPI[PI[I[I[I[I[PI[!FQP!I[P!LbP!Lf!Lp!Lt!LtP!IXP!Lx!LxP#!OP#!SI[PI[#!Y#%_CjA^PA^PA^A^P#&lA^A^#)OA^#+vA^#.SA^A^#.r#1W#1W#1]#1f#1W#1qPP#1WPA^#2ZA^#6YA^A^6mPPP#:_PPP#:x#:xP#:xP#;`#:xPP#;fP#;]P#;]#;y#;]#<e#<k#<n)aP#<q)aP#<z#<z#<zP)aP)aP)aP)aPP)aP#=Q#=TP#=T)aP#=XP#=[P)aP)aP)aP)aP)aP)a)aPP#=b#=h#=s#=y#>P#>V#>]#>k#>q#>{#?R#?]#?c#?s#?y#@k#@}#AT#AZ#Ai#BO#Cs#DR#DY#Et#FS#Gt#HS#HY#H`#Hf#Hp#Hv#H|#IW#Ij#IpPPPPPPPPPPP#IvPPPPPPP#Jk#Mx$ b$ i$ qPPP$']P$'f$*_$0x$0{$1O$1}$2Q$2X$2aP$2g$2jP$3W$3[$4S$5b$5g$5}PP$6S$6Y$6^$6a$6e$6i$7e$7|$8e$8i$8l$8o$8y$8|$9Q$9UR!|RoqOXst!Z#d%m&r&t&u&w,s,x2[2_Y!vQ'`-e1o5{Q%tvQ%|yQ&T|Q&j!VS'W!e-]Q'f!iS'l!r!yU*k$|*Z*oQ+o%}S+|&V&WQ,d&dQ-c'_Q-m'gQ-u'mQ0[*qQ1b,OQ1y,eR<{<Y%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_S#q]<V!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU+P%]<s<tQ+t&PQ,f&gQ,m&oQ0x+gQ0}+iQ1Y+uQ2R,kQ3`.gQ5`0|Q5f1TQ6[1zQ7Y3dQ8`5gR9e7['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S!S!nQ!r!v!y!z$|'W'_'`'l'm'n*k*o*q*r-]-c-e-u0[0_1o5{5}%[$ti#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q&X|Q'U!eS'[%i-`Q+t&PQ,P&WQ,f&gQ0n+SQ1Y+uQ1_+{Q2Q,jQ2R,kQ5f1TQ5o1aQ6[1zQ6_1|Q6`2PQ8`5gQ8c5lQ8|6bQ:X8dQ:f8yQ;V:YR<}*ZrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R,h&k&z^OPXYstuvwz!Z!`!g!j!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'b'r(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>R>S[#]WZ#W#Z'X(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ%wxQ%{yW&Q|&V&W,OQ&_!TQ'c!hQ'e!iQ(q#sS+n%|%}Q+r&PQ,_&bQ,c&dS-l'f'gQ.i(rQ1R+oQ1X+uQ1Z+vQ1^+zQ1t,`S1x,d,eQ2|-mQ5e1TQ5i1WQ5n1`Q6Z1yQ8_5gQ8b5kQ8f5pQ:T8^R;T:U!U$zi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y!^%yy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{Q+h%wQ,T&[Q,W&]Q,b&dQ.h(qQ1s,_U1w,c,d,eQ3e.iQ6U1tS6Y1x1yQ8x6Z#f>T#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o>U<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hW%Ti%V*y>PS&[!Q&iQ&]!RQ&^!SU*}%[%d=sR,R&Y%]%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^T)z$u){V+P%]<s<tW'[!e%i*Z-`S(}#y#zQ+c%rQ+y&SS.b(m(nQ1j,XQ5T0kR8i5u'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S$i$^c#Y#e%q%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.|.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vT#TV#U'RkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ'Y!eR2q-]!W!nQ!e!r!v!y!z$|'W'_'`'l'm'n*Z*k*o*q*r-]-c-e-u0[0_1o5{5}R1l,ZnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&y!^Q'v!xS(s#u<^Q+l%zQ,]&_Q,^&aQ-j'dQ-w'oS.r(x=PS0q+X=ZQ1P+mQ1n,[Q2c,zQ2e,{Q2m-WQ2z-kQ2}-oS5Y0r=eQ5a1QS5d1S=fQ6t2oQ6x2{Q6}3SQ8]5bQ9Y6vQ9Z6yQ9^7OR:l9V$d$]c#Y#e%s%u(S(Y(t(y)R)S)T)U)V)W)X)Y)Z)[)^)`)b)g)q+d+x-Z-x-}.S.U.s.v.z.}/O/b0p2k2n3O3V3k3p3q3r3s3t3u3v3w3x3y3z3{3|4P4Q4X5X5c6u6{7Q7a7b7k7l8k9X9]9g9m9n:o;W;`<W=vS(o#p'iQ)P#zS+b%q.|S.c(n(pR3^.d'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS#q]<VQ&t!XQ&u!YQ&w![Q&x!]R2Z,vQ'a!hQ+e%wQ-h'cS.e(q+hQ2x-gW3b.h.i0w0yQ6w2yW7U3_3a3e5^U9a7V7X7ZU:q9c9d9fS;b:p:sQ;p;cR;x;qU!wQ'`-eT5y1o5{!Q_OXZ`st!V!Z#d#h%e%m&i&k&r&t&u&w(j,s,x.[2[2_]!pQ!r'`-e1o5{T#q]<V%^{OPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S(}#y#zS.b(m(n!s=l$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SU$fd)_,mS(p#p'iU*v%R(w4OU0m+O.n7gQ5^0xQ7V3`Q9d7YR:s9em!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}Q't!uS(f#g2US-s'k'wQ/s*]Q0R*jQ3U-vQ4f/tQ4r0TQ4s0UQ4x0^Q7r4`S7}4t4vS8R4y4{Q9r7sQ9v7yQ9{8OQ:Q8TS:{9w9xS;g:|;PS;s;h;iS;{;t;uS<P;|;}R<S<QQ#wbQ's!uS(e#g2US(g#m+WQ+Y%fQ+j%xQ+p&OU-r'k't'wQ.W(fU/r*]*`/wQ0S*jQ0V*lQ1O+kQ1u,aS3R-s-vQ3Z.`S4e/s/tQ4n0PS4q0R0^Q4u0WQ6W1vQ7P3US7q4`4bQ7u4fU7|4r4x4{Q8P4wQ8v6XS9q7r7sQ9u7yQ9}8RQ:O8SQ:c8wQ:y9rS:z9v9xQ;S:QQ;^:dS;f:{;PS;r;g;hS;z;s;uS<O;{;}Q<R<PQ<T<SQ=o=jQ={=tR=|=uV!wQ'`-e%^aOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_S#wz!j!r=i$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=o>R%^bOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Q%fj!^%xy!i!u%{%|%}'V'e'f'g'k'u*j+n+o-Y-l-m-t0R0U1R2u2|3T4r4s4v7}9{S&Oz!jQ+k%yQ,a&dW1v,b,c,d,eU6X1w1x1yS8w6Y6ZQ:d8x!r=j$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ=t>QR=u>R%QeOPXYstuvw!Z!`!g!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_Y#bWZ#W#Z(T!b%jm#h#i#l$x%e%h(^(h(i(j*Y*^*b+Z+[+^,o-V.T.Z.[.]._/m/p2d3[3]4a6r7TQ,n&o!p=k$Z$n)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SR=n'XU']!e%i*ZR2s-`%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+],p,s,x-i-q.P.V.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3l4z6T6e6f6i6|8t9T9_!r)_$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SQ,m&oQ0x+gQ3`.gQ7Y3dR9e7[!b$Tc#Y%q(S(Y(t(y)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!P<d)^)q-Z.|2k2n3p3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!f$Vc#Y%q(S(Y(t(y)W)X)Z)[)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<W!T<f)^)q-Z.|2k2n3p3v3w3y3z4P4X6u7b7k7l8k9X9g9m9n;W;`=v!^$Zc#Y%q(S(Y(t(y)`)g+x-x-}.S.U.s.v/b0p3O3V3k3{5X5c6{7Q7a9]:o<WQ4_/kz>S)^)q-Z.|2k2n3p4P4X6u7b7k7l8k9X9g9m9n;W;`=vQ>X>ZR>Y>['QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>SS$oh$pR4U/U'XgOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$kf$qQ$ifS)j$l)nR)v$qT$jf$qT)l$l)n'XhOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'b'r(T(V(](d(x(z)O)s)}*i+X+]+g,p,s,x-U-X-i-q.P.V.g.t.{/U/V/n0]0l0r1S1r2S2T2V2X2[2_2a2p3Q3W3d3l4T4z5w6T6e6f6i6s6|7[8t9T9_:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>ST$oh$pQ$rhR)u$p%^jOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'b'r(T(V(](d(x(z)O)}*i+X+]+g,p,s,x-i-q.P.V.g.t.{/n0]0l0r1S1r2S2T2V2X2[2_2a3Q3W3d3l4z6T6e6f6i6|7[8t9T9_!s>Q$Z$n'X)s-U-X/V2p4T5w6s:Z:m<U<X<Y<]<^<_<`<a<b<c<d<e<f<g<h<i<k<n<{=O=P=R=Z=[=e=f>S#glOPXZst!Z!`!o#S#d#o#{$n%m&k&n&o&r&t&u&w&{'T'b)O)s*i+]+g,p,s,x-i.g/V/n0]0l1r2S2T2V2X2[2_2a3d4T4z6T6e6f6i7[8t9T!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^Q+T%aQ/c*Oo4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!U$yi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>YQ*c$zU*l$|*Z*oQ+U%bQ0W*m#f=q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n=r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hQ=w>TQ=x>UQ=y>VR=z>W!U%Ri$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y#f(w#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^o4O<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=hnoOXst!Z#d%m&r&t&u&w,s,x2[2_S*f${*YQ-R'OQ-S'QR4i/y%[%Si#v$b$c$d$x${%O%Q%^%_%c)y*R*T*V*Y*a*g*w*x+f+i,S,V.f/P/d/m/x/y/{0`0b0i0j0o1f1i1q3c4^4_4j4o5Q5[5_6S7W7v8Q8V8[8q9b9p9y:P:`:r;Q;[;d;k<l<m<o<p<q<r<u<v<w<x<y<z=S=T=U=V=X=Y=]=^=_=`=a=b=c=d=g=h>P>X>Y>]>^Q,U&]Q1h,WQ5s1gR8h5tV*n$|*Z*oU*n$|*Z*oT5z1o5{S0P*i/nQ4w0]T8S4z:]Q+j%xQ0V*lQ1O+kQ1u,aQ6W1vQ8v6XQ:c8wR;^:d!U%Oi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Yx*R$v)e*S*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>OS0`*t0a#f<o#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<p<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!d=S(u)c*[*e.j.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[`=T3}7c7f7j9h:t:w;yS=_.l3iT=`7e9k!U%Qi$d%O%Q%^%_%c*R*T*a*w*x/P/x0`0b0i0j0o4_5Q8V9p>P>X>Y|*T$v)e*U*t+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>OS0b*u0c#f<q#v$b$c$x${)y*V*Y*g+f+i,S,V.f/d/m/y/{1f1i1q3c4^4j4o5[5_6S7W7v8Q8[8q9b9y:P:`:r;Q;[;d;k<o<q<u<w<y=S=U=X=]=_=a=c=g>]>^n<r<l<m<p<r<v<x<z=T=V=Y=^=`=b=d=h!h=U(u)c*[*e.k.l.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[d=V3}7d7e7j9h9i:t:u:w;yS=a.m3jT=b7f9lrnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q&f!UR,p&ornOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_R&f!UQ,Y&^R1d,RsnOXst!V!Z#d%m&i&r&t&u&w,s,x2[2_Q1p,_S6R1s1tU8p6P6Q6US:_8r8sS;Y:^:aQ;m;ZR;w;nQ&m!VR,i&iR6_1|R:f8yW&Q|&V&W,OR1Z+vQ&r!WR,s&sR,y&xT2],x2_R,}&yQ,|&yR2f,}Q'y!{R-y'ySsOtQ#dXT%ps#dQ#OTR'{#OQ#RUR'}#RQ){$uR/`){Q#UVR(Q#UQ#XWU(W#X(X.QQ(X#YR.Q(YQ-^'YR2r-^Q.u(yS3m.u3nR3n.vQ-e'`R2v-eY!rQ'`-e1o5{R'j!rQ/Q)eR4S/QU#_W%h*YU(_#_(`.RQ(`#`R.R(ZQ-a']R2t-at`OXst!V!Z#d%m&i&k&r&t&u&w,s,x2[2_S#hZ%eU#r`#h.[R.[(jQ(k#jQ.X(gW.a(k.X3X7RQ3X.YR7R3YQ)n$lR/W)nQ$phR)t$pQ$`cU)a$`-|<jQ-|<WR<j)qQ/q*]W4c/q4d7t9sU4d/r/s/tS7t4e4fR9s7u$e*Q$v(u)c)e*[*e*t*u+Q+R+V.l.m.o.p.q/_/g/i/k/v/|0d0e0v1e3f3g3h3}4R4[4g4h4l4|5O5R5S5W5r7]7^7_7`7e7f7h7i7j7p7w7z8U8X8Z9h9i9j9t9|:R:S:t:u:v:w:x:};R;e;j;v;y=p=}>O>Z>[Q/z*eU4k/z4m7xQ4m/|R7x4lS*o$|*ZR0Y*ox*S$v)e*t*u+V/v0d0e4R4g5R5S5W7p8U:R:x=p=}>O!d.j(u)c*[*e.l.m.q/_/k/|0v1e3h4[4h4l5r7]7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/h*S.j7ca7c3}7e7f7j9h:t:w;yQ0a*tQ3i.lU4}0a3i9kR9k7e|*U$v)e*t*u+V/g/v0d0e4R4g4|5R5S5W7p8U:R:x=p=}>O!h.k(u)c*[*e.l.m.q/_/k/|0v1e3f3h4[4h4l5r7]7^7`7w7z8X8Z9t9|:S:};R;e;j;v>Z>[U/j*U.k7de7d3}7e7f7j9h9i:t:u:w;yQ0c*uQ3j.mU5P0c3j9lR9l7fQ*z%UR0g*zQ5]0vR8Y5]Q+_%kR0u+_Q5v1jS8j5v:[R:[8kQ,[&_R1m,[Q5{1oR8m5{Q1{,fS6]1{8zR8z6_Q1U+rW5h1U5j8a:VQ5j1XQ8a5iR:V8bQ+w&QR1[+wQ2_,xR6m2_YrOXst#dQ&v!ZQ+a%mQ,r&rQ,t&tQ,u&uQ,w&wQ2Y,sS2],x2_R6l2[Q%opQ&z!_Q&}!aQ'P!bQ'R!cQ'q!uQ+`%lQ+l%zQ,Q&XQ,h&mQ-P&|W-p'k's't'wQ-w'oQ0X*nQ1P+mQ1c,PS2O,i,lQ2g-OQ2h-RQ2i-SQ2}-oW3P-r-s-v-xQ5a1QQ5m1_Q5q1eQ6V1uQ6a2QQ6k2ZU6z3O3R3UQ6}3SQ8]5bQ8e5oQ8g5rQ8l5zQ8u6WQ8{6`S9[6{7PQ9^7OQ:W8cQ:b8vQ:g8|Q:n9]Q;U:XQ;]:cQ;a:oQ;l;VR;o;^Q%zyQ'd!iQ'o!uU+m%{%|%}Q-W'VU-k'e'f'gS-o'k'uQ0Q*jS1Q+n+oQ2o-YS2{-l-mQ3S-tS4p0R0UQ5b1RQ6v2uQ6y2|Q7O3TU7{4r4s4vQ9z7}R;O9{S$wi>PR*{%VU%Ui%V>PR0f*yQ$viS(u#v+iS)c$b$cQ)e$dQ*[$xS*e${*YQ*t%OQ*u%QQ+Q%^Q+R%_Q+V%cQ.l<oQ.m<qQ.o<uQ.p<wQ.q<yQ/_)yQ/g*RQ/i*TQ/k*VQ/v*aS/|*g/mQ0d*wQ0e*xl0v+f,V.f1i1q3c6S7W8q9b:`:r;[;dQ1e,SQ3f=SQ3g=UQ3h=XS3}<l<mQ4R/PS4[/d4^Q4g/xQ4h/yQ4l/{Q4|0`Q5O0bQ5R0iQ5S0jQ5W0oQ5r1fQ7]=]Q7^=_Q7_=aQ7`=cQ7e<pQ7f<rQ7h<vQ7i<xQ7j<zQ7p4_Q7w4jQ7z4oQ8U5QQ8X5[Q8Z5_Q9h=YQ9i=TQ9j=VQ9t7vQ9|8QQ:R8VQ:S8[Q:t=^Q:u=`Q:v=bQ:w=dQ:x9pQ:}9yQ;R:PQ;e=gQ;j;QQ;v;kQ;y=hQ=p>PQ=}>XQ>O>YQ>Z>]R>[>^Q+O%]Q.n<sR7g<tnpOXst!Z#d%m&r&t&u&w,s,x2[2_Q!fPS#fZ#oQ&|!`W'h!o*i0]4zQ(P#SQ)Q#{Q)r$nS,l&k&nQ,q&oQ-O&{S-T'T/nQ-g'bQ.x)OQ/[)sQ0s+]Q0y+gQ2W,pQ2y-iQ3a.gQ4W/VQ5U0lQ6Q1rQ6c2SQ6d2TQ6h2VQ6j2XQ6o2aQ7Z3dQ7m4TQ8s6TQ9P6eQ9Q6fQ9S6iQ9f7[Q:a8tR:k9T#[cOPXZst!Z!`!o#d#o#{%m&k&n&o&r&t&u&w&{'T'b)O*i+]+g,p,s,x-i.g/n0]0l1r2S2T2V2X2[2_2a3d4z6T6e6f6i7[8t9TQ#YWQ#eYQ%quQ%svS%uw!gS(S#W(VQ(Y#ZQ(t#uQ(y#xQ)R$OQ)S$PQ)T$QQ)U$RQ)V$SQ)W$TQ)X$UQ)Y$VQ)Z$WQ)[$XQ)^$ZQ)`$_Q)b$aQ)g$eW)q$n)s/V4TQ+d%tQ+x&RS-Z'X2pQ-x'rS-}(T.PQ.S(]Q.U(dQ.s(xQ.v(zQ.z<UQ.|<XQ.}<YQ/O<]Q/b)}Q0p+XQ2k-UQ2n-XQ3O-qQ3V.VQ3k.tQ3p<^Q3q<_Q3r<`Q3s<aQ3t<bQ3u<cQ3v<dQ3w<eQ3x<fQ3y<gQ3z<hQ3{.{Q3|<kQ4P<nQ4Q<{Q4X<iQ5X0rQ5c1SQ6u=OQ6{3QQ7Q3WQ7a3lQ7b=PQ7k=RQ7l=ZQ8k5wQ9X6sQ9]6|Q9g=[Q9m=eQ9n=fQ:o9_Q;W:ZQ;`:mQ<W#SR=v>SR#[WR'Z!el!tQ!r!v!y!z'`'l'm'n-e-u1o5{5}S'V!e-]U*j$|*Z*oS-Y'W'_S0U*k*qQ0^*rQ2u-cQ4v0[R4{0_R({#xQ!fQT-d'`-e]!qQ!r'`-e1o5{Q#p]R'i<VR)f$dY!uQ'`-e1o5{Q'k!rS'u!v!yS'w!z5}S-t'l'mQ-v'nR3T-uT#kZ%eS#jZ%eS%km,oU(g#h#i#lS.Y(h(iQ.^(jQ0t+^Q3Y.ZU3Z.[.]._S7S3[3]R9`7Td#^W#W#Z%h(T(^*Y+Z.T/mr#gZm#h#i#l%e(h(i(j+^.Z.[.]._3[3]7TS*]$x*bQ/t*^Q2U,oQ2l-VQ4`/pQ6q2dQ7s4aQ9W6rT=m'X+[V#aW%h*YU#`W%h*YS(U#W(^U(Z#Z+Z/mS-['X+[T.O(T.TV'^!e%i*ZQ$lfR)x$qT)m$l)nR4V/UT*_$x*bT*h${*YQ0w+fQ1g,VQ3_.fQ5t1iQ6P1qQ7X3cQ8r6SQ9c7WQ:^8qQ:p9bQ;Z:`Q;c:rQ;n;[R;q;dnqOXst!Z#d%m&r&t&u&w,s,x2[2_Q&l!VR,h&itmOXst!U!V!Z#d%m&i&r&t&u&w,s,x2[2_R,o&oT%lm,oR1k,XR,g&gQ&U|S+}&V&WR1^,OR+s&PT&p!W&sT&q!W&sT2^,x2_",
  nodeNames: "⚠ ArithOp ArithOp ?. JSXStartTag LineComment BlockComment Script Hashbang ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > < TypeParamList in out const TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewTarget new NewExpression ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression TypeArgList CompareOp < declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression InstantiationExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast < ArrowFunction TypeParamList SequenceExpression InstantiationExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate asserts is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration defer ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem",
  maxTerm: 380,
  context: lQ,
  nodeProps: [
    ["isolate", -8, 5, 6, 14, 37, 39, 51, 53, 55, ""],
    ["group", -26, 9, 17, 19, 68, 207, 211, 215, 216, 218, 221, 224, 234, 237, 243, 245, 247, 249, 252, 258, 264, 266, 268, 270, 272, 274, 275, "Statement", -34, 13, 14, 32, 35, 36, 42, 51, 54, 55, 57, 62, 70, 72, 76, 80, 82, 84, 85, 110, 111, 120, 121, 136, 139, 141, 142, 143, 144, 145, 147, 148, 167, 169, 171, "Expression", -23, 31, 33, 37, 41, 43, 45, 173, 175, 177, 178, 180, 181, 182, 184, 185, 186, 188, 189, 190, 201, 203, 205, 206, "Type", -3, 88, 103, 109, "ClassItem"],
    ["openedBy", 23, "<", 38, "InterpolationStart", 56, "[", 60, "{", 73, "(", 160, "JSXStartCloseTag"],
    ["closedBy", -2, 24, 168, ">", 40, "InterpolationEnd", 50, "]", 61, "}", 74, ")", 165, "JSXEndTag"]
  ],
  propSources: [dQ],
  skippedNodes: [0, 5, 6, 278],
  repeatNodeCount: 37,
  tokenData: "$Fq07[R!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tuEruvJSvwLkwx! Yxy!'iyz!(sz{!)}{|!,q|}!.O}!O!,q!O!P!/Y!P!Q!9j!Q!R#:O!R![#<_![!]#I_!]!^#Jk!^!_#Ku!_!`$![!`!a$$v!a!b$*T!b!c$,r!c!}Er!}#O$-|#O#P$/W#P#Q$4o#Q#R$5y#R#SEr#S#T$7W#T#o$8b#o#p$<r#p#q$=h#q#r$>x#r#s$@U#s$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$I|Er$I|$I}$Dk$I}$JO$Dk$JO$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr(n%d_$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z07[+rq$i&j(Wp(Z!b'|0/lOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z07[.ST(X#S$i&j'}0/lO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c07[.n_$i&j(Wp(Z!b'}0/lOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)3p/x`$i&j!p),Q(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW1V`#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW2d_#v(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At3l_(V':f$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k(^4r_$i&j(Z!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k&z5vX$i&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q&z6jT$d`$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c`6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y`7bO$d``7eP;=`<%l6y&z7kP;=`<%l5q(^7w]$d`$i&j(Z!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!r8uZ(Z!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p!r9oU$d`(Z!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!r:UP;=`<%l8p(^:[P;=`<%l4k%9[:hh$i&j(Wp(Z!bOY%ZYZ&cZq%Zqr<Srs&}st%ZtuCruw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr(r<__WS$i&j(Wp(Z!bOY<SYZ&cZr<Srs=^sw<Swx@nx!^<S!^!_Bm!_#O<S#O#P>`#P#o<S#o#pBm#p;'S<S;'S;=`Cl<%lO<S(Q=g]WS$i&j(Z!bOY=^YZ&cZw=^wx>`x!^=^!^!_?q!_#O=^#O#P>`#P#o=^#o#p?q#p;'S=^;'S;=`@h<%lO=^&n>gXWS$i&jOY>`YZ&cZ!^>`!^!_?S!_#o>`#o#p?S#p;'S>`;'S;=`?k<%lO>`S?XSWSOY?SZ;'S?S;'S;=`?e<%lO?SS?hP;=`<%l?S&n?nP;=`<%l>`!f?xWWS(Z!bOY?qZw?qwx?Sx#O?q#O#P?S#P;'S?q;'S;=`@b<%lO?q!f@eP;=`<%l?q(Q@kP;=`<%l=^'`@w]WS$i&j(WpOY@nYZ&cZr@nrs>`s!^@n!^!_Ap!_#O@n#O#P>`#P#o@n#o#pAp#p;'S@n;'S;=`Bg<%lO@ntAwWWS(WpOYApZrAprs?Ss#OAp#O#P?S#P;'SAp;'S;=`Ba<%lOAptBdP;=`<%lAp'`BjP;=`<%l@n#WBvYWS(Wp(Z!bOYBmZrBmrs?qswBmwxApx#OBm#O#P?S#P;'SBm;'S;=`Cf<%lOBm#WCiP;=`<%lBm(rCoP;=`<%l<S%9[C}i$i&j(o%1l(Wp(Z!bOY%ZYZ&cZr%Zrs&}st%ZtuCruw%Zwx(rx!Q%Z!Q![Cr![!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr%9[EoP;=`<%lCr07[FRk$i&j(Wp(Z!b$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr+dHRk$i&j(Wp(Z!b$]#tOY%ZYZ&cZr%Zrs&}st%ZtuGvuw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Gv![!^%Z!^!_*g!_!c%Z!c!}Gv!}#O%Z#O#P&c#P#R%Z#R#SGv#S#T%Z#T#oGv#o#p*g#p$g%Z$g;'SGv;'S;=`Iv<%lOGv+dIyP;=`<%lGv07[JPP;=`<%lEr(KWJ_`$i&j(Wp(Z!b#p(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWKl_$i&j$Q(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,#xLva(z+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sv%ZvwM{wx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWNW`$i&j#z(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At! c_(Y';W$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b'l!!i_$i&j(WpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b&z!#mX$i&jOw!#hwx6cx!^!#h!^!_!$Y!_#o!#h#o#p!$Y#p;'S!#h;'S;=`!$r<%lO!#h`!$]TOw!$Ywx7]x;'S!$Y;'S;=`!$l<%lO!$Y`!$oP;=`<%l!$Y&z!$uP;=`<%l!#h'l!%R]$d`$i&j(WpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r!Q!&PZ(WpOY!%zYZ!$YZr!%zrs!$Ysw!%zwx!&rx#O!%z#O#P!$Y#P;'S!%z;'S;=`!']<%lO!%z!Q!&yU$d`(WpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r!Q!'`P;=`<%l!%z'l!'fP;=`<%l!!b/5|!'t_!l/.^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&U!)O_!k!Lf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z-!n!*[b$i&j(Wp(Z!b(U%&f#q(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!+d{!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW!+o`$i&j(Wp(Z!b#n(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;x!,|`$i&j(Wp(Z!br+4YOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,$U!.Z_!]+Jf$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!/ec$i&j(Wp(Z!b!Q.2^OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!0p!P!Q%Z!Q![!3Y![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!0ya$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!2O!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!2Z_![!L^$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!3eg$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!3Y![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S!3Y#S#X%Z#X#Y!4|#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!5Vg$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!6n|}%Z}!O!6n!O!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!6wc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!8_c$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!9uf$i&j(Wp(Z!b#o(ChOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcxz!;Zz{#-}{!P!;Z!P!Q#/d!Q!^!;Z!^!_#(i!_!`#7S!`!a#8i!a!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z?O!;fb$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z>^!<w`$i&j(Z!b!X7`OY!<nYZ&cZw!<nwx!=yx!P!<n!P!Q!Eq!Q!^!<n!^!_!Gr!_!}!<n!}#O!KS#O#P!Dy#P#o!<n#o#p!Gr#p;'S!<n;'S;=`!L]<%lO!<n<z!>Q^$i&j!X7`OY!=yYZ&cZ!P!=y!P!Q!>|!Q!^!=y!^!_!@c!_!}!=y!}#O!CW#O#P!Dy#P#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!?Td$i&j!X7`O!^&c!_#W&c#W#X!>|#X#Z&c#Z#[!>|#[#]&c#]#^!>|#^#a&c#a#b!>|#b#g&c#g#h!>|#h#i&c#i#j!>|#j#k!>|#k#m&c#m#n!>|#n#o&c#p;'S&c;'S;=`&w<%lO&c7`!@hX!X7`OY!@cZ!P!@c!P!Q!AT!Q!}!@c!}#O!Ar#O#P!Bq#P;'S!@c;'S;=`!CQ<%lO!@c7`!AYW!X7`#W#X!AT#Z#[!AT#]#^!AT#a#b!AT#g#h!AT#i#j!AT#j#k!AT#m#n!AT7`!AuVOY!ArZ#O!Ar#O#P!B[#P#Q!@c#Q;'S!Ar;'S;=`!Bk<%lO!Ar7`!B_SOY!ArZ;'S!Ar;'S;=`!Bk<%lO!Ar7`!BnP;=`<%l!Ar7`!BtSOY!@cZ;'S!@c;'S;=`!CQ<%lO!@c7`!CTP;=`<%l!@c<z!C][$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#O!CW#O#P!DR#P#Q!=y#Q#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DWX$i&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DvP;=`<%l!CW<z!EOX$i&jOY!=yYZ&cZ!^!=y!^!_!@c!_#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!EnP;=`<%l!=y>^!Ezl$i&j(Z!b!X7`OY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#W&}#W#X!Eq#X#Z&}#Z#[!Eq#[#]&}#]#^!Eq#^#a&}#a#b!Eq#b#g&}#g#h!Eq#h#i&}#i#j!Eq#j#k!Eq#k#m&}#m#n!Eq#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}8r!GyZ(Z!b!X7`OY!GrZw!Grwx!@cx!P!Gr!P!Q!Hl!Q!}!Gr!}#O!JU#O#P!Bq#P;'S!Gr;'S;=`!J|<%lO!Gr8r!Hse(Z!b!X7`OY'}Zw'}x#O'}#P#W'}#W#X!Hl#X#Z'}#Z#[!Hl#[#]'}#]#^!Hl#^#a'}#a#b!Hl#b#g'}#g#h!Hl#h#i'}#i#j!Hl#j#k!Hl#k#m'}#m#n!Hl#n;'S'};'S;=`(f<%lO'}8r!JZX(Z!bOY!JUZw!JUwx!Arx#O!JU#O#P!B[#P#Q!Gr#Q;'S!JU;'S;=`!Jv<%lO!JU8r!JyP;=`<%l!JU8r!KPP;=`<%l!Gr>^!KZ^$i&j(Z!bOY!KSYZ&cZw!KSwx!CWx!^!KS!^!_!JU!_#O!KS#O#P!DR#P#Q!<n#Q#o!KS#o#p!JU#p;'S!KS;'S;=`!LV<%lO!KS>^!LYP;=`<%l!KS>^!L`P;=`<%l!<n=l!Ll`$i&j(Wp!X7`OY!LcYZ&cZr!Lcrs!=ys!P!Lc!P!Q!Mn!Q!^!Lc!^!_# o!_!}!Lc!}#O#%P#O#P!Dy#P#o!Lc#o#p# o#p;'S!Lc;'S;=`#&Y<%lO!Lc=l!Mwl$i&j(Wp!X7`OY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#W(r#W#X!Mn#X#Z(r#Z#[!Mn#[#](r#]#^!Mn#^#a(r#a#b!Mn#b#g(r#g#h!Mn#h#i(r#i#j!Mn#j#k!Mn#k#m(r#m#n!Mn#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r8Q# vZ(Wp!X7`OY# oZr# ors!@cs!P# o!P!Q#!i!Q!}# o!}#O#$R#O#P!Bq#P;'S# o;'S;=`#$y<%lO# o8Q#!pe(Wp!X7`OY)rZr)rs#O)r#P#W)r#W#X#!i#X#Z)r#Z#[#!i#[#])r#]#^#!i#^#a)r#a#b#!i#b#g)r#g#h#!i#h#i)r#i#j#!i#j#k#!i#k#m)r#m#n#!i#n;'S)r;'S;=`*Z<%lO)r8Q#$WX(WpOY#$RZr#$Rrs!Ars#O#$R#O#P!B[#P#Q# o#Q;'S#$R;'S;=`#$s<%lO#$R8Q#$vP;=`<%l#$R8Q#$|P;=`<%l# o=l#%W^$i&j(WpOY#%PYZ&cZr#%Prs!CWs!^#%P!^!_#$R!_#O#%P#O#P!DR#P#Q!Lc#Q#o#%P#o#p#$R#p;'S#%P;'S;=`#&S<%lO#%P=l#&VP;=`<%l#%P=l#&]P;=`<%l!Lc?O#&kn$i&j(Wp(Z!b!X7`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#W%Z#W#X#&`#X#Z%Z#Z#[#&`#[#]%Z#]#^#&`#^#a%Z#a#b#&`#b#g%Z#g#h#&`#h#i%Z#i#j#&`#j#k#&`#k#m%Z#m#n#&`#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z9d#(r](Wp(Z!b!X7`OY#(iZr#(irs!Grsw#(iwx# ox!P#(i!P!Q#)k!Q!}#(i!}#O#+`#O#P!Bq#P;'S#(i;'S;=`#,`<%lO#(i9d#)th(Wp(Z!b!X7`OY*gZr*grs'}sw*gwx)rx#O*g#P#W*g#W#X#)k#X#Z*g#Z#[#)k#[#]*g#]#^#)k#^#a*g#a#b#)k#b#g*g#g#h#)k#h#i*g#i#j#)k#j#k#)k#k#m*g#m#n#)k#n;'S*g;'S;=`+Z<%lO*g9d#+gZ(Wp(Z!bOY#+`Zr#+`rs!JUsw#+`wx#$Rx#O#+`#O#P!B[#P#Q#(i#Q;'S#+`;'S;=`#,Y<%lO#+`9d#,]P;=`<%l#+`9d#,cP;=`<%l#(i?O#,o`$i&j(Wp(Z!bOY#,fYZ&cZr#,frs!KSsw#,fwx#%Px!^#,f!^!_#+`!_#O#,f#O#P!DR#P#Q!;Z#Q#o#,f#o#p#+`#p;'S#,f;'S;=`#-q<%lO#,f?O#-tP;=`<%l#,f?O#-zP;=`<%l!;Z07[#.[b$i&j(Wp(Z!b(O0/l!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z07[#/o_$i&j(Wp(Z!bT0/lOY#/dYZ&cZr#/drs#0nsw#/dwx#4Ox!^#/d!^!_#5}!_#O#/d#O#P#1p#P#o#/d#o#p#5}#p;'S#/d;'S;=`#6|<%lO#/d06j#0w]$i&j(Z!bT0/lOY#0nYZ&cZw#0nwx#1px!^#0n!^!_#3R!_#O#0n#O#P#1p#P#o#0n#o#p#3R#p;'S#0n;'S;=`#3x<%lO#0n05W#1wX$i&jT0/lOY#1pYZ&cZ!^#1p!^!_#2d!_#o#1p#o#p#2d#p;'S#1p;'S;=`#2{<%lO#1p0/l#2iST0/lOY#2dZ;'S#2d;'S;=`#2u<%lO#2d0/l#2xP;=`<%l#2d05W#3OP;=`<%l#1p01O#3YW(Z!bT0/lOY#3RZw#3Rwx#2dx#O#3R#O#P#2d#P;'S#3R;'S;=`#3r<%lO#3R01O#3uP;=`<%l#3R06j#3{P;=`<%l#0n05x#4X]$i&j(WpT0/lOY#4OYZ&cZr#4Ors#1ps!^#4O!^!_#5Q!_#O#4O#O#P#1p#P#o#4O#o#p#5Q#p;'S#4O;'S;=`#5w<%lO#4O00^#5XW(WpT0/lOY#5QZr#5Qrs#2ds#O#5Q#O#P#2d#P;'S#5Q;'S;=`#5q<%lO#5Q00^#5tP;=`<%l#5Q05x#5zP;=`<%l#4O01p#6WY(Wp(Z!bT0/lOY#5}Zr#5}rs#3Rsw#5}wx#5Qx#O#5}#O#P#2d#P;'S#5};'S;=`#6v<%lO#5}01p#6yP;=`<%l#5}07[#7PP;=`<%l#/d)3h#7ab$i&j$Q(Ch(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;ZAt#8vb$Z#t$i&j(Wp(Z!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z'Ad#:Zp$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#U%Z#U#V#?i#V#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#d#Bq#d#l%Z#l#m#Es#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#<jk$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#>j_$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#?rd$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#A]f$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Bzc$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Dbe$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#E|g$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Gpi$i&j(Wp(Z!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x#Il_!g$b$i&j$O)Lv(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Jv_al$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f#LS^h#)`#R-<U(Wp(Z!b$n7`OY*gZr*grs'}sw*gwx)rx!P*g!P!Q#MO!Q!^*g!^!_#Mt!_!`$ f!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#MXX$k&j(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El#M}Z#r(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Np!`#O*g#P;'S*g;'S;=`+Z<%lO*g(El#NyX$Q(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El$ oX#s(Ch(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g*)x$!ga#`*!Y$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a$#l!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(K[$#w_#k(Cl$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x$%Vag!*r#s(Ch$f#|$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`$&[!`!a$'f!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$&g_#s(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$'qa#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`!a$(v!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$)R`#r(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(Kd$*`a(r(Ct$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!a%Z!a!b$+e!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$+p`$i&j#{(Ch(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`$,}_!|$Ip$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f$.X_!S0,v$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$/]Z$i&jO!^$0O!^!_$0f!_#i$0O#i#j$0k#j#l$0O#l#m$2^#m#o$0O#o#p$0f#p;'S$0O;'S;=`$4i<%lO$0O(n$0VT_#S$i&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$0kO_#S(n$0p[$i&jO!Q&c!Q![$1f![!^&c!_!c&c!c!i$1f!i#T&c#T#Z$1f#Z#o&c#o#p$3|#p;'S&c;'S;=`&w<%lO&c(n$1kZ$i&jO!Q&c!Q![$2^![!^&c!_!c&c!c!i$2^!i#T&c#T#Z$2^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$2cZ$i&jO!Q&c!Q![$3U![!^&c!_!c&c!c!i$3U!i#T&c#T#Z$3U#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$3ZZ$i&jO!Q&c!Q![$0O![!^&c!_!c&c!c!i$0O!i#T&c#T#Z$0O#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$4PR!Q![$4Y!c!i$4Y#T#Z$4Y#S$4]S!Q![$4Y!c!i$4Y#T#Z$4Y#q#r$0f(n$4lP;=`<%l$0O#1[$4z_!Y#)l$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$6U`#x(Ch$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;p$7c_$i&j(Wp(Z!b(a+4QOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$8qk$i&j(Wp(Z!b(T,2j$_#t(e$I[OY%ZYZ&cZr%Zrs&}st%Ztu$8buw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$8b![!^%Z!^!_*g!_!c%Z!c!}$8b!}#O%Z#O#P&c#P#R%Z#R#S$8b#S#T%Z#T#o$8b#o#p*g#p$g%Z$g;'S$8b;'S;=`$<l<%lO$8b+d$:qk$i&j(Wp(Z!b$_#tOY%ZYZ&cZr%Zrs&}st%Ztu$:fuw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$:f![!^%Z!^!_*g!_!c%Z!c!}$:f!}#O%Z#O#P&c#P#R%Z#R#S$:f#S#T%Z#T#o$:f#o#p*g#p$g%Z$g;'S$:f;'S;=`$<f<%lO$:f+d$<iP;=`<%l$:f07[$<oP;=`<%l$8b#Jf$<{X!_#Hb(Wp(Z!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g,#x$=sa(y+JY$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$+e#q;'S%Z;'S;=`+a<%lO%Z)>v$?V_!^(CdvBr$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z?O$@a_!q7`$i&j(Wp(Z!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$Aq|$i&j(Wp(Z!b'|0/l$]#t(T,2j(e$I[OX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr07[$D|k$i&j(Wp(Z!b'}0/l$]#t(T,2j(e$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr",
  tokenizers: [hQ, cQ, fQ, uQ, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, aQ, new mc("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOx~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!U~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(c~~", 141, 340), new mc("j~RQYZXz{^~^O(Q~~aP!P!Qd~iO(R~~", 25, 323)],
  topRules: { Script: [0, 7], SingleExpression: [1, 276], SingleClassItem: [2, 277] },
  dialects: { jsx: 0, ts: 15175 },
  dynamicPrecedences: { 80: 1, 82: 1, 94: 1, 169: 1, 199: 1 },
  specialized: [{ term: 327, get: (i) => pQ[i] || -1 }, { term: 343, get: (i) => OQ[i] || -1 }, { term: 95, get: (i) => gQ[i] || -1 }],
  tokenPrec: 15201
});
class am {
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
    let t = $i(this.state).resolveInner(this.pos, -1);
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
    let t = this.state.doc.lineAt(this.pos), n = Math.max(t.from, this.pos - 250), s = t.text.slice(n - t.from, this.pos - t.from), r = s.search(hm(e, !1));
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
function bd(i) {
  let e = Object.keys(i).join(""), t = /\w/.test(e);
  return t && (e = e.replace(/\w/g, "")), `[${t ? "\\w" : ""}${e.replace(/[^\w\s]/g, "\\$&")}]`;
}
function vQ(i) {
  let e = /* @__PURE__ */ Object.create(null), t = /* @__PURE__ */ Object.create(null);
  for (let { label: s } of i) {
    e[s[0]] = !0;
    for (let r = 1; r < s.length; r++)
      t[s[r]] = !0;
  }
  let n = bd(e) + bd(t) + "*$";
  return [new RegExp("^" + n), new RegExp(n)];
}
function gf(i) {
  let e = i.map((s) => typeof s == "string" ? { label: s } : s), [t, n] = e.every((s) => /^\w+$/.test(s.label)) ? [/\w*$/, /\w+$/] : vQ(e);
  return (s) => {
    let r = s.matchBefore(n);
    return r || s.explicit ? { from: r ? r.from : s.pos, options: e, validFor: t } : null;
  };
}
function bQ(i, e) {
  return (t) => {
    for (let n = $i(t.state).resolveInner(t.pos, -1); n; n = n.parent) {
      if (i.indexOf(n.name) > -1)
        return null;
      if (n.type.isTop)
        break;
    }
    return e(t);
  };
}
class yd {
  constructor(e, t, n, s) {
    this.completion = e, this.source = t, this.match = n, this.score = s;
  }
}
function gs(i) {
  return i.selection.main.from;
}
function hm(i, e) {
  var t;
  let { source: n } = i, s = e && n[0] != "^", r = n[n.length - 1] != "$";
  return !s && !r ? i : new RegExp(`${s ? "^" : ""}(?:${n})${r ? "$" : ""}`, (t = i.flags) !== null && t !== void 0 ? t : i.ignoreCase ? "i" : "");
}
const mf = /* @__PURE__ */ _n.define();
function yQ(i, e, t, n) {
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
const wd = /* @__PURE__ */ new WeakMap();
function wQ(i) {
  if (!Array.isArray(i))
    return i;
  let e = wd.get(i);
  return e || wd.set(i, e = gf(i)), e;
}
const Vl = /* @__PURE__ */ Ve.define(), Oo = /* @__PURE__ */ Ve.define();
class xQ {
  constructor(e) {
    this.pattern = e, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [], this.score = 0, this.matched = [];
    for (let t = 0; t < e.length; ) {
      let n = Kn(e, t), s = Rs(n);
      this.chars.push(n);
      let r = e.slice(t, t + s), o = r.toUpperCase();
      this.folded.push(Kn(o == r ? r.toLowerCase() : o, 0)), t += s;
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
      let S = Kn(e, 0), x = Rs(S), P = x == e.length ? 0 : -100;
      if (S != t[0]) if (S == n[0])
        P += -200;
      else
        return null;
      return this.ret(P, [0, x]);
    }
    let l = e.indexOf(this.pattern);
    if (l == 0)
      return this.ret(e.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
    let a = t.length, h = 0;
    if (l < 0) {
      for (let S = 0, x = Math.min(e.length, 200); S < x && h < a; ) {
        let P = Kn(e, S);
        (P == t[h] || P == n[h]) && (s[h++] = S), S += Rs(P);
      }
      if (h < a)
        return null;
    }
    let c = 0, f = 0, u = !1, p = 0, O = -1, g = -1, m = /[a-z]/.test(e), v = !0;
    for (let S = 0, x = Math.min(e.length, 200), P = 0; S < x && f < a; ) {
      let E = Kn(e, S);
      l < 0 && (c < a && E == t[c] && (r[c++] = S), p < a && (E == t[p] || E == n[p] ? (p == 0 && (O = S), g = S + 1, p++) : p = 0));
      let R, C = E < 255 ? E >= 48 && E <= 57 || E >= 97 && E <= 122 ? 2 : E >= 65 && E <= 90 ? 1 : 0 : (R = vy(E)) != R.toLowerCase() ? 1 : R != R.toUpperCase() ? 2 : 0;
      (!S || C == 1 && m || P == 0 && C != 0) && (t[f] == E || n[f] == E && (u = !0) ? o[f++] = S : o.length && (v = !1)), P = C, S += Rs(E);
    }
    return f == a && o[0] == 0 && v ? this.result(-100 + (u ? -200 : 0), o, e) : p == a && O == 0 ? this.ret(-200 - e.length + (g == e.length ? 0 : -100), [0, g]) : l > -1 ? this.ret(-700 - e.length, [l, l + this.pattern.length]) : p == a ? this.ret(-900 - e.length, [O, g]) : f == a ? this.result(-100 + (u ? -200 : 0) + -700 + (v ? 0 : -1100), o, e) : t.length == 2 ? null : this.result((s[0] ? -700 : 0) + -200 + -1100, s, e);
  }
  result(e, t, n) {
    let s = [], r = 0;
    for (let o of t) {
      let l = o + (this.astral ? Rs(Kn(n, o)) : 1);
      r && s[r - 1] == o ? s[r - 1] = l : (s[r++] = o, s[r++] = l);
    }
    return this.ret(e - n.length, s);
  }
}
class SQ {
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
const kt = /* @__PURE__ */ ge.define({
  combine(i) {
    return Vc(i, {
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
      positionInfo: kQ,
      filterStrict: !1,
      compareCompletions: (e, t) => (e.sortText || e.label).localeCompare(t.sortText || t.label),
      interactionDelay: 75,
      updateSyncTime: 100
    }, {
      defaultKeymap: (e, t) => e && t,
      closeOnBlur: (e, t) => e && t,
      icons: (e, t) => e && t,
      tooltipClass: (e, t) => (n) => xd(e(n), t(n)),
      optionClass: (e, t) => (n) => xd(e(n), t(n)),
      addToOptions: (e, t) => e.concat(t),
      filterStrict: (e, t) => e || t
    });
  }
});
function xd(i, e) {
  return i ? e ? i + " " + e : i : e;
}
function kQ(i, e, t, n, s, r) {
  let o = i.textDirection == ft.RTL, l = o, a = !1, h = "top", c, f, u = e.left - s.left, p = s.right - e.right, O = n.right - n.left, g = n.bottom - n.top;
  if (l && u < Math.min(O, p) ? l = !1 : !l && p < Math.min(O, u) && (l = !0), O <= (l ? u : p))
    c = Math.max(s.top, Math.min(t.top, s.bottom - g)) - e.top, f = Math.min(400, l ? u : p);
  else {
    a = !0, f = Math.min(
      400,
      (o ? e.right : s.right - e.left) - 30
      /* Info.Margin */
    );
    let S = s.bottom - e.bottom;
    S >= g || S > e.top ? c = t.bottom - e.top : (h = "bottom", c = e.bottom - t.top);
  }
  let m = (e.bottom - e.top) / r.offsetHeight, v = (e.right - e.left) / r.offsetWidth;
  return {
    style: `${h}: ${c / m}px; max-width: ${f / v}px`,
    class: "cm-completionInfo-" + (a ? o ? "left-narrow" : "right-narrow" : l ? "left" : "right")
  };
}
const vf = /* @__PURE__ */ Ve.define();
function QQ(i) {
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
        let u = o.appendChild(document.createElement("span"));
        u.appendChild(document.createTextNode(l.slice(c, f))), u.className = "cm-completionMatchedText", a = f;
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
function lh(i, e, t) {
  if (i <= t)
    return { from: 0, to: i };
  if (e < 0 && (e = 0), e <= i >> 1) {
    let s = Math.floor(e / t);
    return { from: s * t, to: (s + 1) * t };
  }
  let n = Math.ceil((i - e) / t);
  return { from: i - n * t, to: i - (n - 1) * t };
}
class $Q {
  constructor(e, t, n) {
    this.view = e, this.stateField = t, this.applyCompletion = n, this.info = null, this.infoDestroy = null, this.placeInfoReq = {
      read: () => this.measureInfo(),
      write: (a) => this.placeInfo(a),
      key: this
    }, this.space = null, this.currentClass = "";
    let s = e.state.field(t), { options: r, selected: o } = s.open, l = e.state.facet(kt);
    this.optionContent = QQ(l), this.optionClass = l.optionClass, this.tooltipClass = l.tooltipClass, this.range = lh(r.length, o, l.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.updateTooltipClass(e.state), this.dom.addEventListener("mousedown", (a) => {
      let { options: h } = e.state.field(t).open;
      for (let c = a.target, f; c && c != this.dom; c = c.parentNode)
        if (c.nodeName == "LI" && (f = /-(\d+)$/.exec(c.id)) && +f[1] < h.length) {
          this.applyCompletion(e, h[+f[1]]), a.preventDefault();
          return;
        }
      if (a.target == this.list) {
        let c = this.list.classList.contains("cm-completionListIncompleteTop") && a.clientY < this.list.firstChild.getBoundingClientRect().top ? this.range.from - 1 : this.list.classList.contains("cm-completionListIncompleteBottom") && a.clientY > this.list.lastChild.getBoundingClientRect().bottom ? this.range.to : null;
        c != null && (e.dispatch({ effects: vf.of(c) }), a.preventDefault());
      }
    }), this.dom.addEventListener("focusout", (a) => {
      let h = e.state.field(this.stateField, !1);
      h && h.tooltip && e.state.facet(kt).closeOnBlur && a.relatedTarget != e.contentDOM && e.dispatch({ effects: Oo.of(null) });
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
      (!s.open || s.open.options != r) && (this.range = lh(r.length, o, e.state.facet(kt).maxRenderedOptions), this.showOptions(r, n.id)), this.updateSel(), l != ((t = s.open) === null || t === void 0 ? void 0 : t.disabled) && this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!l);
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
    (t.selected > -1 && t.selected < this.range.from || t.selected >= this.range.to) && (this.range = lh(t.options.length, t.selected, this.view.state.facet(kt).maxRenderedOptions), this.showOptions(t.options, e.id));
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
      }).catch((l) => ai(this.view.state, l, "completion info")) : (this.addInfoPane(o, s), n.setAttribute("aria-describedby", this.info.id));
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
    return t && PQ(this.list, t), t;
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
    return s.top > Math.min(r.bottom, t.bottom) - 10 || s.bottom < Math.max(r.top, t.top) + 10 ? null : this.view.state.facet(kt).positionInfo(this.view, t, s, n, r, this.dom);
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
        let u = typeof h == "string" ? h : h.name;
        if (u != r && (o > n.from || n.from == 0))
          if (r = u, typeof h != "string" && h.header)
            s.appendChild(h.header(h));
          else {
            let p = s.appendChild(document.createElement("completion-section"));
            p.textContent = u;
          }
      }
      const c = s.appendChild(document.createElement("li"));
      c.id = t + "-" + o, c.setAttribute("role", "option");
      let f = this.optionClass(l);
      f && (c.className = f);
      for (let u of this.optionContent) {
        let p = u(l, this.view.state, this.view, a);
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
function _Q(i, e) {
  return (t) => new $Q(t, i, e);
}
function PQ(i, e) {
  let t = i.getBoundingClientRect(), n = e.getBoundingClientRect(), s = t.height / i.offsetHeight;
  n.top < t.top ? i.scrollTop -= (t.top - n.top) / s : n.bottom > t.bottom && (i.scrollTop += (n.bottom - t.bottom) / s);
}
function Sd(i) {
  return (i.boost || 0) * 100 + (i.apply ? 10 : 0) + (i.info ? 5 : 0) + (i.type ? 1 : 0);
}
function TQ(i, e) {
  let t = [], n = null, s = null, r = (c) => {
    t.push(c);
    let { section: f } = c.completion;
    if (f) {
      n || (n = []);
      let u = typeof f == "string" ? f : f.name;
      n.some((p) => p.name == u) || n.push(typeof f == "string" ? { name: u } : f);
    }
  }, o = e.facet(kt);
  for (let c of i)
    if (c.hasResult()) {
      let f = c.result.getMatch;
      if (c.result.filter === !1)
        for (let u of c.result.options)
          r(new yd(u, c.source, f ? f(u) : [], 1e9 - t.length));
      else {
        let u = e.sliceDoc(c.from, c.to), p, O = o.filterStrict ? new SQ(u) : new xQ(u);
        for (let g of c.result.options)
          if (p = O.match(g.label)) {
            let m = g.displayLabel ? f ? f(g, p.matched) : [] : p.matched, v = p.score + (g.boost || 0);
            if (r(new yd(g, c.source, m, v)), typeof g.section == "object" && g.section.rank === "dynamic") {
              let { name: S } = g.section;
              s || (s = /* @__PURE__ */ Object.create(null)), s[S] = Math.max(v, s[S] || -1e9);
            }
          }
      }
    }
  if (n) {
    let c = /* @__PURE__ */ Object.create(null), f = 0, u = (p, O) => (p.rank === "dynamic" && O.rank === "dynamic" ? s[O.name] - s[p.name] : 0) || (typeof p.rank == "number" ? p.rank : 1e9) - (typeof O.rank == "number" ? O.rank : 1e9) || (p.name < O.name ? -1 : 1);
    for (let p of n.sort(u))
      f -= 1e5, c[p.name] = f;
    for (let p of t) {
      let { section: O } = p.completion;
      O && (p.score += c[typeof O == "string" ? O : O.name]);
    }
  }
  let l = [], a = null, h = o.compareCompletions;
  for (let c of t.sort((f, u) => u.score - f.score || h(f.completion, u.completion))) {
    let f = c.completion;
    !a || a.label != f.label || a.detail != f.detail || a.type != null && f.type != null && a.type != f.type || a.apply != f.apply || a.boost != f.boost ? l.push(c) : Sd(c.completion) > Sd(a) && (l[l.length - 1] = c), a = c.completion;
  }
  return l;
}
class Is {
  constructor(e, t, n, s, r, o) {
    this.options = e, this.attrs = t, this.tooltip = n, this.timestamp = s, this.selected = r, this.disabled = o;
  }
  setSelected(e, t) {
    return e == this.selected || e >= this.options.length ? this : new Is(this.options, kd(t, e), this.tooltip, this.timestamp, e, this.disabled);
  }
  static build(e, t, n, s, r, o) {
    if (s && !o && e.some((h) => h.isPending))
      return s.setDisabled();
    let l = TQ(e, t);
    if (!l.length)
      return s && e.some((h) => h.isPending) ? s.setDisabled() : null;
    let a = t.facet(kt).selectOnOpen ? 0 : -1;
    if (s && s.selected != a && s.selected != -1) {
      let h = s.options[s.selected].completion;
      for (let c = 0; c < l.length; c++)
        if (l[c].completion == h) {
          a = c;
          break;
        }
    }
    return new Is(l, kd(n, a), {
      pos: e.reduce((h, c) => c.hasResult() ? Math.min(h, c.from) : h, 1e8),
      create: MQ,
      above: r.aboveCursor
    }, s ? s.timestamp : Date.now(), a, !1);
  }
  map(e) {
    return new Is(this.options, this.attrs, { ...this.tooltip, pos: e.mapPos(this.tooltip.pos) }, this.timestamp, this.selected, this.disabled);
  }
  setDisabled() {
    return new Is(this.options, this.attrs, this.tooltip, this.timestamp, this.selected, !0);
  }
}
class Bl {
  constructor(e, t, n) {
    this.active = e, this.id = t, this.open = n;
  }
  static start() {
    return new Bl(AQ, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
  }
  update(e) {
    let { state: t } = e, n = t.facet(kt), r = (n.override || t.languageDataAt("autocomplete", gs(t)).map(wQ)).map((a) => (this.active.find((c) => c.source == a) || new bi(
      a,
      this.active.some(
        (c) => c.state != 0
        /* State.Inactive */
      ) ? 1 : 0
      /* State.Inactive */
    )).update(e, n));
    r.length == this.active.length && r.every((a, h) => a == this.active[h]) && (r = this.active);
    let o = this.open, l = e.effects.some((a) => a.is(bf));
    o && e.docChanged && (o = o.map(e.changes)), e.selection || r.some((a) => a.hasResult() && e.changes.touchesRange(a.from, a.to)) || !CQ(r, this.active) || l ? o = Is.build(r, t, this.id, o, n, l) : o && o.disabled && !r.some((a) => a.isPending) && (o = null), !o && r.every((a) => !a.isPending) && r.some((a) => a.hasResult()) && (r = r.map((a) => a.hasResult() ? new bi(
      a.source,
      0
      /* State.Inactive */
    ) : a));
    for (let a of e.effects)
      a.is(vf) && (o = o && o.setSelected(a.value, this.id));
    return r == this.active && o == this.open ? this : new Bl(r, this.id, o);
  }
  get tooltip() {
    return this.open ? this.open.tooltip : null;
  }
  get attrs() {
    return this.open ? this.open.attrs : this.active.length ? ZQ : EQ;
  }
}
function CQ(i, e) {
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
const ZQ = {
  "aria-autocomplete": "list"
}, EQ = {};
function kd(i, e) {
  let t = {
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    "aria-controls": i
  };
  return e > -1 && (t["aria-activedescendant"] = i + "-" + e), t;
}
const AQ = [];
function cm(i, e) {
  if (i.isUserEvent("input.complete")) {
    let n = i.annotation(mf);
    if (n && e.activateOnCompletion(n))
      return 12;
  }
  let t = i.isUserEvent("input.type");
  return t && e.activateOnTyping ? 5 : t ? 1 : i.isUserEvent("delete.backward") ? 2 : i.selection ? 8 : i.docChanged ? 16 : 0;
}
class bi {
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
    let n = cm(e, t), s = this;
    (n & 8 || n & 16 && this.touches(e)) && (s = new bi(
      s.source,
      0
      /* State.Inactive */
    )), n & 4 && s.state == 0 && (s = new bi(
      this.source,
      1
      /* State.Pending */
    )), s = s.updateFor(e, n);
    for (let r of e.effects)
      if (r.is(Vl))
        s = new bi(s.source, 1, r.value);
      else if (r.is(Oo))
        s = new bi(
          s.source,
          0
          /* State.Inactive */
        );
      else if (r.is(bf))
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
    return e.changes.touchesRange(gs(e.state));
  }
}
class Us extends bi {
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
    let r = e.changes.mapPos(this.from), o = e.changes.mapPos(this.to, 1), l = gs(e.state);
    if (l > o || !s || t & 2 && (gs(e.startState) == this.from || l < this.limit))
      return new bi(
        this.source,
        t & 4 ? 1 : 0
        /* State.Inactive */
      );
    let a = e.changes.mapPos(this.limit);
    return RQ(s.validFor, e.state, r, o) ? new Us(this.source, this.explicit, a, s, r, o) : s.update && (s = s.update(s, r, o, new am(e.state, l, !1))) ? new Us(this.source, this.explicit, a, s, s.from, (n = s.to) !== null && n !== void 0 ? n : gs(e.state)) : new bi(this.source, 1, this.explicit);
  }
  map(e) {
    if (e.empty)
      return this;
    let t = this.result.map ? this.result.map(this.result, e) : this.result;
    return t ? new Us(this.source, this.explicit, e.mapPos(this.limit), t, e.mapPos(this.from), e.mapPos(this.to, 1)) : new bi(
      this.source,
      0
      /* State.Inactive */
    );
  }
  touches(e) {
    return e.changes.touchesRange(this.from, this.to);
  }
}
function RQ(i, e, t, n) {
  if (!i)
    return !1;
  let s = e.sliceDoc(t, n);
  return typeof i == "function" ? i(s, t, n, e) : hm(i, !0).test(s);
}
const bf = /* @__PURE__ */ Ve.define({
  map(i, e) {
    return i.map((t) => t.map(e));
  }
}), Bt = /* @__PURE__ */ cn.define({
  create() {
    return Bl.start();
  },
  update(i, e) {
    return i.update(e);
  },
  provide: (i) => [
    ug.from(i, (e) => e.tooltip),
    Oe.contentAttributes.from(i, (e) => e.attrs)
  ]
});
function yf(i, e) {
  const t = e.completion.apply || e.completion.label;
  let n = i.state.field(Bt).active.find((s) => s.source == e.source);
  return n instanceof Us ? (typeof t == "string" ? i.dispatch({
    ...yQ(i.state, t, n.from, n.to),
    annotations: mf.of(e.completion)
  }) : t(i, e.completion, n.from, n.to), !0) : !1;
}
const MQ = /* @__PURE__ */ _Q(Bt, yf);
function nl(i, e = "option") {
  return (t) => {
    let n = t.state.field(Bt, !1);
    if (!n || !n.open || n.open.disabled || Date.now() - n.open.timestamp < t.state.facet(kt).interactionDelay)
      return !1;
    let s = 1, r;
    e == "page" && (r = dg(t, n.open.tooltip)) && (s = Math.max(2, Math.floor(r.dom.offsetHeight / r.dom.querySelector("li").offsetHeight) - 1));
    let { length: o } = n.open.options, l = n.open.selected > -1 ? n.open.selected + s * (i ? 1 : -1) : i ? 0 : o - 1;
    return l < 0 ? l = e == "page" ? 0 : o - 1 : l >= o && (l = e == "page" ? o - 1 : 0), t.dispatch({ effects: vf.of(l) }), !0;
  };
}
const XQ = (i) => {
  let e = i.state.field(Bt, !1);
  return i.state.readOnly || !e || !e.open || e.open.selected < 0 || e.open.disabled || Date.now() - e.open.timestamp < i.state.facet(kt).interactionDelay ? !1 : yf(i, e.open.options[e.open.selected]);
}, ah = (i) => i.state.field(Bt, !1) ? (i.dispatch({ effects: Vl.of(!0) }), !0) : !1, jQ = (i) => {
  let e = i.state.field(Bt, !1);
  return !e || !e.active.some(
    (t) => t.state != 0
    /* State.Inactive */
  ) ? !1 : (i.dispatch({ effects: Oo.of(null) }), !0);
};
class LQ {
  constructor(e, t) {
    this.active = e, this.context = t, this.time = Date.now(), this.updates = [], this.done = void 0;
  }
}
const IQ = 50, DQ = 1e3, zQ = /* @__PURE__ */ an.fromClass(class {
  constructor(i) {
    this.view = i, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.pendingStart = !1, this.composing = 0;
    for (let e of i.state.field(Bt).active)
      e.isPending && this.startQuery(e);
  }
  update(i) {
    let e = i.state.field(Bt), t = i.state.facet(kt);
    if (!i.selectionSet && !i.docChanged && i.startState.field(Bt) == e)
      return;
    let n = i.transactions.some((r) => {
      let o = cm(r, t);
      return o & 8 || (r.selection || r.docChanged) && !(o & 3);
    });
    for (let r = 0; r < this.running.length; r++) {
      let o = this.running[r];
      if (n || o.context.abortOnDocChange && i.docChanged || o.updates.length + i.transactions.length > IQ && Date.now() - o.time > DQ) {
        for (let l of o.context.abortListeners)
          try {
            l();
          } catch (a) {
            ai(this.view.state, a);
          }
        o.context.abortListeners = null, this.running.splice(r--, 1);
      } else
        o.updates.push(...i.transactions);
    }
    this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), i.transactions.some((r) => r.effects.some((o) => o.is(Vl))) && (this.pendingStart = !0);
    let s = this.pendingStart ? 50 : t.activateOnTypingDelay;
    if (this.debounceUpdate = e.active.some((r) => r.isPending && !this.running.some((o) => o.active.source == r.source)) ? setTimeout(() => this.startUpdate(), s) : -1, this.composing != 0)
      for (let r of i.transactions)
        r.isUserEvent("input.type") ? this.composing = 2 : this.composing == 2 && r.selection && (this.composing = 3);
  }
  startUpdate() {
    this.debounceUpdate = -1, this.pendingStart = !1;
    let { state: i } = this.view, e = i.field(Bt);
    for (let t of e.active)
      t.isPending && !this.running.some((n) => n.active.source == t.source) && this.startQuery(t);
    this.running.length && e.open && e.open.disabled && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(kt).updateSyncTime));
  }
  startQuery(i) {
    let { state: e } = this.view, t = gs(e), n = new am(e, t, i.explicit, this.view), s = new LQ(i, n);
    this.running.push(s), Promise.resolve(i.source(n)).then((r) => {
      s.context.aborted || (s.done = r || null, this.scheduleAccept());
    }, (r) => {
      this.view.dispatch({ effects: Oo.of(null) }), ai(this.view.state, r);
    });
  }
  scheduleAccept() {
    this.running.every((i) => i.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(kt).updateSyncTime));
  }
  // For each finished query in this.running, try to create a result
  // or, if appropriate, restart the query.
  accept() {
    var i;
    this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
    let e = [], t = this.view.state.facet(kt), n = this.view.state.field(Bt);
    for (let s = 0; s < this.running.length; s++) {
      let r = this.running[s];
      if (r.done === void 0)
        continue;
      if (this.running.splice(s--, 1), r.done) {
        let l = gs(r.updates.length ? r.updates[0].startState : this.view.state), a = Math.min(l, r.done.from + (r.active.explicit ? 0 : 1)), h = new Us(r.active.source, r.active.explicit, a, r.done, r.done.from, (i = r.done.to) !== null && i !== void 0 ? i : l);
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
          let l = new bi(
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
    (e.length || n.open && n.open.disabled) && this.view.dispatch({ effects: bf.of(e) });
  }
}, {
  eventHandlers: {
    blur(i) {
      let e = this.view.state.field(Bt, !1);
      if (e && e.tooltip && this.view.state.facet(kt).closeOnBlur) {
        let t = e.open && dg(this.view, e.open.tooltip);
        (!t || !t.dom.contains(i.relatedTarget)) && setTimeout(() => this.view.dispatch({ effects: Oo.of(null) }), 10);
      }
    },
    compositionstart() {
      this.composing = 1;
    },
    compositionend() {
      this.composing == 3 && setTimeout(() => this.view.dispatch({ effects: Vl.of(!1) }), 20), this.composing = 0;
    }
  }
}), NQ = typeof navigator == "object" && /* @__PURE__ */ /Win/.test(navigator.platform), YQ = /* @__PURE__ */ Po.highest(/* @__PURE__ */ Oe.domEventHandlers({
  keydown(i, e) {
    let t = e.state.field(Bt, !1);
    if (!t || !t.open || t.open.disabled || t.open.selected < 0 || i.key.length > 1 || i.ctrlKey && !(NQ && i.altKey) || i.metaKey)
      return !1;
    let n = t.open.options[t.open.selected], s = t.active.find((o) => o.source == n.source), r = n.completion.commitCharacters || s.result.commitCharacters;
    return r && r.indexOf(i.key) > -1 && yf(e, n), !1;
  }
})), fm = /* @__PURE__ */ Oe.baseTheme({
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
class WQ {
  constructor(e, t, n, s) {
    this.field = e, this.line = t, this.from = n, this.to = s;
  }
}
class wf {
  constructor(e, t, n) {
    this.field = e, this.from = t, this.to = n;
  }
  map(e) {
    let t = e.mapPos(this.from, -1, Lt.TrackDel), n = e.mapPos(this.to, 1, Lt.TrackDel);
    return t == null || n == null ? null : new wf(this.field, t, n);
  }
}
class xf {
  constructor(e, t) {
    this.lines = e, this.fieldPositions = t;
  }
  instantiate(e, t) {
    let n = [], s = [t], r = e.doc.lineAt(t), o = /^\s*/.exec(r.text)[0];
    for (let a of this.lines) {
      if (n.length) {
        let h = o, c = /^\t*/.exec(a)[0].length;
        for (let f = 0; f < c; f++)
          h += e.facet(Oa);
        s.push(t + h.length - c), a = h + a.slice(c);
      }
      n.push(a), t += a.length + 1;
    }
    let l = this.fieldPositions.map((a) => new wf(a.field, s[a.line] + a.from, s[a.line] + a.to));
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
          for (let u of s)
            u.field >= h && u.field++;
        }
        for (let f of s)
          if (f.line == n.length && f.from > r.index) {
            let u = r[2] ? 3 + (r[1] || "").length : 2;
            f.from -= u, f.to -= u;
          }
        s.push(new WQ(h, n.length, r.index, r.index + c.length)), o = o.slice(0, r.index) + a + o.slice(r.index + r[0].length);
      }
      o = o.replace(/\\([{}])/g, (l, a, h) => {
        for (let c of s)
          c.line == n.length && c.from > h && (c.from--, c.to--);
        return a;
      }), n.push(o);
    }
    return new xf(n, s);
  }
}
let qQ = /* @__PURE__ */ Ge.widget({ widget: /* @__PURE__ */ new class extends Sr {
  toDOM() {
    let i = document.createElement("span");
    return i.className = "cm-snippetFieldPosition", i;
  }
  ignoreEvent() {
    return !1;
  }
}() }), VQ = /* @__PURE__ */ Ge.mark({ class: "cm-snippetField" });
class Qr {
  constructor(e, t) {
    this.ranges = e, this.active = t, this.deco = Ge.set(e.map((n) => (n.from == n.to ? qQ : VQ).range(n.from, n.to)), !0);
  }
  map(e) {
    let t = [];
    for (let n of this.ranges) {
      let s = n.map(e);
      if (!s)
        return null;
      t.push(s);
    }
    return new Qr(t, this.active);
  }
  selectionInsideField(e) {
    return e.ranges.every((t) => this.ranges.some((n) => n.field == this.active && n.from <= t.from && n.to >= t.to));
  }
}
const Ro = /* @__PURE__ */ Ve.define({
  map(i, e) {
    return i && i.map(e);
  }
}), BQ = /* @__PURE__ */ Ve.define(), go = /* @__PURE__ */ cn.define({
  create() {
    return null;
  },
  update(i, e) {
    for (let t of e.effects) {
      if (t.is(Ro))
        return t.value;
      if (t.is(BQ) && i)
        return new Qr(i.ranges, t.value);
    }
    return i && e.docChanged && (i = i.map(e.changes)), i && e.selection && !i.selectionInsideField(e.selection) && (i = null), i;
  },
  provide: (i) => Oe.decorations.from(i, (e) => e ? e.deco : Ge.none)
});
function Sf(i, e) {
  return B.create(i.filter((t) => t.field == e).map((t) => B.range(t.from, t.to)));
}
function GQ(i) {
  let e = xf.parse(i);
  return (t, n, s, r) => {
    let { text: o, ranges: l } = e.instantiate(t.state, s), { main: a } = t.state.selection, h = {
      changes: { from: s, to: r == a.from ? a.to : r, insert: je.of(o) },
      scrollIntoView: !0,
      annotations: n ? [mf.of(n), bt.userEvent.of("input.complete")] : void 0
    };
    if (l.length && (h.selection = Sf(l, 0)), l.some((c) => c.field > 0)) {
      let c = new Qr(l, 0), f = h.effects = [Ro.of(c)];
      t.state.field(go, !1) === void 0 && f.push(Ve.appendConfig.of([go, JQ, e$, fm]));
    }
    t.dispatch(t.state.update(h));
  };
}
function um(i) {
  return ({ state: e, dispatch: t }) => {
    let n = e.field(go, !1);
    if (!n || i < 0 && n.active == 0)
      return !1;
    let s = n.active + i, r = i > 0 && !n.ranges.some((o) => o.field == s + i);
    return t(e.update({
      selection: Sf(n.ranges, s),
      effects: Ro.of(r ? null : new Qr(n.ranges, s)),
      scrollIntoView: !0
    })), !0;
  };
}
const UQ = ({ state: i, dispatch: e }) => i.field(go, !1) ? (e(i.update({ effects: Ro.of(null) })), !0) : !1, FQ = /* @__PURE__ */ um(1), HQ = /* @__PURE__ */ um(-1), KQ = [
  { key: "Tab", run: FQ, shift: HQ },
  { key: "Escape", run: UQ }
], Qd = /* @__PURE__ */ ge.define({
  combine(i) {
    return i.length ? i[0] : KQ;
  }
}), JQ = /* @__PURE__ */ Po.highest(/* @__PURE__ */ pa.compute([Qd], (i) => i.facet(Qd)));
function Wt(i, e) {
  return { ...e, apply: GQ(i) };
}
const e$ = /* @__PURE__ */ Oe.domEventHandlers({
  mousedown(i, e) {
    let t = e.state.field(go, !1), n;
    if (!t || (n = e.posAtCoords({ x: i.clientX, y: i.clientY })) == null)
      return !1;
    let s = t.ranges.find((r) => r.from <= n && r.to >= n);
    return !s || s.field == t.active ? !1 : (e.dispatch({
      selection: Sf(t.ranges, s.field),
      effects: Ro.of(t.ranges.some((r) => r.field > s.field) ? new Qr(t.ranges, s.field) : null),
      scrollIntoView: !0
    }), !0);
  }
}), dm = /* @__PURE__ */ new class extends qn {
}();
dm.startSide = 1;
dm.endSide = -1;
function t$(i = {}) {
  return [
    YQ,
    Bt,
    kt.of(i),
    zQ,
    n$,
    fm
  ];
}
const i$ = [
  { key: "Ctrl-Space", run: ah },
  { mac: "Alt-`", run: ah },
  { mac: "Alt-i", run: ah },
  { key: "Escape", run: jQ },
  { key: "ArrowDown", run: /* @__PURE__ */ nl(!0) },
  { key: "ArrowUp", run: /* @__PURE__ */ nl(!1) },
  { key: "PageDown", run: /* @__PURE__ */ nl(!0, "page") },
  { key: "PageUp", run: /* @__PURE__ */ nl(!1, "page") },
  { key: "Enter", run: XQ }
], n$ = /* @__PURE__ */ Po.highest(/* @__PURE__ */ pa.computeN([kt], (i) => i.facet(kt).defaultKeymap ? [i$] : [])), pm = [
  /* @__PURE__ */ Wt("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ Wt("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ Wt("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  /* @__PURE__ */ Wt("do {\n	${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ Wt("while (${}) {\n	${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ Wt(`try {
	\${}
} catch (\${error}) {
	\${}
}`, {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  /* @__PURE__ */ Wt("if (${}) {\n	${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ Wt(`if (\${}) {
	\${}
} else {
	\${}
}`, {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ Wt(`class \${name} {
	constructor(\${params}) {
		\${}
	}
}`, {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ Wt('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  /* @__PURE__ */ Wt('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
], s$ = /* @__PURE__ */ pm.concat([
  /* @__PURE__ */ Wt("interface ${name} {\n	${}\n}", {
    label: "interface",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ Wt("type ${name} = ${type}", {
    label: "type",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ Wt("enum ${name} {\n	${}\n}", {
    label: "enum",
    detail: "definition",
    type: "keyword"
  })
]), $d = /* @__PURE__ */ new jx(), Om = /* @__PURE__ */ new Set([
  "Script",
  "Block",
  "FunctionExpression",
  "FunctionDeclaration",
  "ArrowFunction",
  "MethodDeclaration",
  "ForStatement"
]);
function Rr(i) {
  return (e, t) => {
    let n = e.node.getChild("VariableDefinition");
    return n && t(n, i), !0;
  };
}
const r$ = ["FunctionDeclaration"], o$ = {
  FunctionDeclaration: /* @__PURE__ */ Rr("function"),
  ClassDeclaration: /* @__PURE__ */ Rr("class"),
  ClassExpression: () => !0,
  EnumDeclaration: /* @__PURE__ */ Rr("constant"),
  TypeAliasDeclaration: /* @__PURE__ */ Rr("type"),
  NamespaceDeclaration: /* @__PURE__ */ Rr("namespace"),
  VariableDefinition(i, e) {
    i.matchContext(r$) || e(i, "variable");
  },
  TypeDefinition(i, e) {
    e(i, "type");
  },
  __proto__: null
};
function gm(i, e) {
  let t = $d.get(e);
  if (t)
    return t;
  let n = [], s = !0;
  function r(o, l) {
    let a = i.sliceString(o.from, o.to);
    n.push({ label: a, type: l });
  }
  return e.cursor(rt.IncludeAnonymous).iterate((o) => {
    if (s)
      s = !1;
    else if (o.name) {
      let l = o$[o.name];
      if (l && l(o, r) || Om.has(o.name))
        return !1;
    } else if (o.to - o.from > 8192) {
      for (let l of gm(i, o.node))
        n.push(l);
      return !1;
    }
  }), $d.set(e, n), n;
}
const _d = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, mm = [
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
function l$(i) {
  let e = $i(i.state).resolveInner(i.pos, -1);
  if (mm.indexOf(e.name) > -1)
    return null;
  let t = e.name == "VariableName" || e.to - e.from < 20 && _d.test(i.state.sliceDoc(e.from, e.to));
  if (!t && !i.explicit)
    return null;
  let n = [];
  for (let s = e; s; s = s.parent)
    Om.has(s.name) && (n = n.concat(gm(i.state.doc, s)));
  return {
    options: n,
    from: t ? e.from : i.pos,
    validFor: _d
  };
}
const ms = /* @__PURE__ */ Ll.define({
  name: "javascript",
  parser: /* @__PURE__ */ mQ.configure({
    props: [
      /* @__PURE__ */ Sg.add({
        IfStatement: /* @__PURE__ */ th({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ th({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: iS,
        SwitchBody: (i) => {
          let e = i.textAfter, t = /^\s*\}/.test(e), n = /^\s*(case|default)\b/.test(e);
          return i.baseIndent + (t ? 0 : n ? 1 : 2) * i.unit;
        },
        Block: /* @__PURE__ */ tS({ closing: "}" }),
        ArrowFunction: (i) => i.baseIndent + i.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": /* @__PURE__ */ th({ except: /^\s*{/ }),
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
      /* @__PURE__ */ nS.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": sS,
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
}), vm = {
  test: (i) => /^JSX/.test(i.name),
  facet: /* @__PURE__ */ yg({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
}, a$ = /* @__PURE__ */ ms.configure({ dialect: "ts" }, "typescript"), h$ = /* @__PURE__ */ ms.configure({
  dialect: "jsx",
  props: [/* @__PURE__ */ ff.add((i) => i.isTop ? [vm] : void 0)]
}), c$ = /* @__PURE__ */ ms.configure({
  dialect: "jsx ts",
  props: [/* @__PURE__ */ ff.add((i) => i.isTop ? [vm] : void 0)]
}, "typescript");
let bm = (i) => ({ label: i, type: "keyword" });
const ym = /* @__PURE__ */ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(bm), f$ = /* @__PURE__ */ ym.concat(/* @__PURE__ */ ["declare", "implements", "private", "protected", "public"].map(bm));
function u$(i = {}) {
  let e = i.jsx ? i.typescript ? c$ : h$ : i.typescript ? a$ : ms, t = i.typescript ? s$.concat(f$) : pm.concat(ym);
  return new Bx(e, [
    ms.data.of({
      autocomplete: bQ(mm, gf(t))
    }),
    ms.data.of({
      autocomplete: l$
    }),
    i.jsx ? O$ : []
  ]);
}
function d$(i) {
  for (; ; ) {
    if (i.name == "JSXOpenTag" || i.name == "JSXSelfClosingTag" || i.name == "JSXFragmentTag")
      return i;
    if (i.name == "JSXEscape" || !i.parent)
      return null;
    i = i.parent;
  }
}
function Pd(i, e, t = i.length) {
  for (let n = e == null ? void 0 : e.firstChild; n; n = n.nextSibling)
    if (n.name == "JSXIdentifier" || n.name == "JSXBuiltin" || n.name == "JSXNamespacedName" || n.name == "JSXMemberExpression")
      return i.sliceString(n.from, Math.min(n.to, t));
  return "";
}
const p$ = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), O$ = /* @__PURE__ */ Oe.inputHandler.of((i, e, t, n, s) => {
  if ((p$ ? i.composing : i.compositionStarted) || i.state.readOnly || e != t || n != ">" && n != "/" || !ms.isActiveAt(i.state, e, -1))
    return !1;
  let r = s(), { state: o } = r, l = o.changeByRange((a) => {
    var h;
    let { head: c } = a, f = $i(o).resolveInner(c - 1, -1), u;
    if (f.name == "JSXStartTag" && (f = f.parent), !(o.doc.sliceString(c - 1, c) != n || f.name == "JSXAttributeValue" && f.to > c)) {
      if (n == ">" && f.name == "JSXFragmentTag")
        return { range: a, changes: { from: c, insert: "</>" } };
      if (n == "/" && f.name == "JSXStartCloseTag") {
        let p = f.parent, O = p.parent;
        if (O && p.from == c - 2 && ((u = Pd(o.doc, O.firstChild, c)) || ((h = O.firstChild) === null || h === void 0 ? void 0 : h.name) == "JSXFragmentTag")) {
          let g = `${u}>`;
          return { range: B.cursor(c + g.length, -1), changes: { from: c, insert: g } };
        }
      } else if (n == ">") {
        let p = d$(f);
        if (p && p.name == "JSXOpenTag" && !/^\/?>|^<\//.test(o.doc.sliceString(c, c + 2)) && (u = Pd(o.doc, p, c)))
          return { range: a, changes: { from: c, insert: `</${u}>` } };
      }
    }
    return { range: a };
  });
  return l.changes.empty ? !1 : (i.dispatch([
    r,
    o.update(l, { userEvent: "input.complete", scrollIntoView: !0 })
  ]), !0);
});
var g$ = /* @__PURE__ */ I('<div class="expr-editor svelte-c939oi"><div class="expr-cm svelte-c939oi"></div> <div class="expr-actions svelte-c939oi"><span class="expr-hint svelte-c939oi">JSONata</span> <button class="eval-btn svelte-c939oi" title="Evaluate against last run context">▶ Evaluate</button></div></div>');
function m$(i, e) {
  $t(e, !1);
  let t = et(e, "value", 12, ""), n = et(e, "placeholder", 8, "JSONata expression..."), s = et(e, "fieldName", 8, ""), r = et(e, "contextKeys", 24, () => []);
  const o = Rc(), l = [
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
  let a = /* @__PURE__ */ F(), h = /* @__PURE__ */ F();
  function c() {
    const v = [
      ...l.map((S) => ({ label: S, type: "function" })),
      ...r().map((S) => ({ label: S, type: "variable" }))
    ];
    return gf(v);
  }
  function f() {
    return [
      _S(),
      pa.of([...Zk, ...XS]),
      fS(),
      u$(),
      t$({ override: [c()] }),
      $x(n()),
      Oe.lineWrapping,
      Oe.updateListener.of((v) => {
        v.docChanged && (t(v.state.doc.toString()), o("change", t()));
      }),
      Oe.theme({
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
  Ps(() => {
    Q(h, new Oe({
      state: ze.create({ doc: t(), extensions: f() }),
      parent: d(a)
    }));
  }), Sp(() => {
    var v;
    (v = d(h)) == null || v.destroy();
  });
  function u() {
    o("evaluate", t());
  }
  lt(() => (d(h), De(t())), () => {
    d(h) && t() !== d(h).state.doc.toString() && d(h).dispatch({
      changes: { from: 0, to: d(h).state.doc.length, insert: t() }
    });
  }), Ii(), Et();
  var p = g$(), O = w(p);
  jc(O, (v) => Q(a, v), () => d(a));
  var g = y(O, 2), m = y(w(g), 2);
  U(() => He(O, "data-field", s())), te("click", m, u), A(i, p), _t();
}
var v$ = /* @__PURE__ */ I('<input type="text" placeholder="connection ID" class="svelte-awrrrl"/>'), b$ = /* @__PURE__ */ I("<option> </option>"), y$ = /* @__PURE__ */ I('<div class="hint svelte-awrrrl"> </div>'), w$ = /* @__PURE__ */ I('<select class="svelte-awrrrl"><option>— select a connection —</option><!></select> <!>', 1);
function x$(i, e) {
  $t(e, !1);
  let t = et(e, "value", 8, ""), n = et(e, "service", 8, void 0), s = et(e, "onChange", 8), r = /* @__PURE__ */ F([]), o = /* @__PURE__ */ F(!1);
  Ps(async () => {
    try {
      const f = await fetch("/api/integrations/connections");
      if (!f.ok) throw new Error(String(f.status));
      const u = await f.json();
      Q(r, n() ? u.filter((p) => p.service === n()) : u);
    } catch {
      Q(o, !0);
    }
  }), Et();
  var l = Yn(), a = Je(l);
  {
    var h = (f) => {
      var u = v$();
      U(() => Lr(u, t())), te("input", u, (p) => s()(p.target.value)), A(f, u);
    }, c = (f) => {
      var u = w$(), p = Je(u), O = w(p);
      O.value = O.__value = "";
      var g = y(O);
      nt(g, 1, () => d(r), it, (x, P) => {
        var E = b$(), R = w(E), C = {};
        U(() => {
          V(R, `${d(P), b(() => d(P).displayName) ?? ""} (${d(P), b(() => d(P).service) ?? ""}${d(P), b(() => d(P).status !== "active" ? ` — ${d(P).status}` : "") ?? ""})`), C !== (C = (d(P), b(() => d(P).id))) && (E.value = (E.__value = (d(P), b(() => d(P).id))) ?? "");
        }), A(x, E);
      });
      var m;
      Qp(p);
      var v = y(p, 2);
      {
        var S = (x) => {
          var P = y$(), E = w(P);
          U(() => V(E, `No ${n() ?? "integration" ?? ""} connections. Create one in Admin → Integration Connections.`)), A(x, P);
        };
        J(v, (x) => {
          d(r), b(() => d(r).length === 0) && x(S);
        });
      }
      U(() => {
        m !== (m = t()) && (p.value = (p.__value = t()) ?? "", Mc(p, t()));
      }), te("change", p, (x) => s()(x.target.value)), A(f, u);
    };
    J(a, (f) => {
      d(o) ? f(h) : f(c, -1);
    });
  }
  A(i, l), _t();
}
var S$ = /* @__PURE__ */ I('<textarea rows="4" class="svelte-b5q3h1"></textarea>'), k$ = /* @__PURE__ */ I('<input type="text" placeholder="comma-separated values" class="svelte-b5q3h1"/>'), Q$ = /* @__PURE__ */ I('<input type="checkbox" style="width:auto" class="svelte-b5q3h1"/>'), $$ = /* @__PURE__ */ I('<div class="eval-result svelte-b5q3h1"> </div>'), _$ = /* @__PURE__ */ I('<!> <!> <button class="mode-toggle-btn svelte-b5q3h1">← Value Picker mode</button>', 1), P$ = /* @__PURE__ */ I('<button class="picker-btn svelte-b5q3h1" title="Reference upstream node output">↗</button>'), T$ = /* @__PURE__ */ I('<button class="picker-option svelte-b5q3h1"><span class="picker-node svelte-b5q3h1"> </span> <span class="picker-ref svelte-b5q3h1"> </span></button>'), C$ = /* @__PURE__ */ I('<div class="picker-dropdown svelte-b5q3h1"><div class="picker-label svelte-b5q3h1">Insert reference to:</div> <!></div>'), Z$ = /* @__PURE__ */ I('<div class="field-with-picker svelte-b5q3h1"><input type="text" class="svelte-b5q3h1"/> <!> <button class="expr-toggle-btn svelte-b5q3h1" title="Switch to JSONata expression editor">ƒ</button></div> <!>', 1), E$ = /* @__PURE__ */ I('<div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1"> </label> <!></div>'), A$ = /* @__PURE__ */ I('<div class="panel-section svelte-b5q3h1"><div class="panel-header svelte-b5q3h1"><span> </span> <button class="close-btn svelte-b5q3h1">✕</button></div> <div class="form-group svelte-b5q3h1"><label class="svelte-b5q3h1">Label</label> <input type="text" class="svelte-b5q3h1"/></div> <!> <button class="btn-danger svelte-b5q3h1">Remove node</button></div>');
function R$(i, e) {
  $t(e, !1);
  const t = () => at(Gr, "$nodeTypes", s), n = () => at(ht, "$graph", s), [s, r] = $n(), o = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(), a = /* @__PURE__ */ F();
  let h = et(e, "node", 8), c = /* @__PURE__ */ F(null), f = /* @__PURE__ */ F(
    null
    // field currently in expression editor mode
  ), u = /* @__PURE__ */ F(
    {}
    // fieldKey → eval result
  );
  function p(T) {
    var Z, N;
    const D = t().find((oe) => oe.type === T.type), $ = (N = (Z = D == null ? void 0 : D.schema) == null ? void 0 : Z.output) == null ? void 0 : N.properties;
    return $ && Object.keys($).length > 0 ? Object.keys($) : ["output"];
  }
  async function O(T, D) {
    try {
      const Z = await (await fetch("/studio/evaluate-expression", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression: D })
      })).json();
      Q(u, {
        ...d(u),
        [T]: Z.error ? `Error: ${Z.error}` : JSON.stringify(Z.result)
      });
    } catch {
      Q(u, { ...d(u), [T]: "Request failed" });
    }
  }
  function g(T, D) {
    ht.update(($) => ({
      ...$,
      nodes: {
        ...$.nodes,
        [h().id]: { ...h(), config: { ...h().config, [T]: D } }
      }
    }));
  }
  function m(T) {
    ht.update((D) => ({
      ...D,
      nodes: { ...D.nodes, [h().id]: { ...h(), label: T } }
    }));
  }
  function v() {
    ht.update((T) => {
      const D = { ...T.nodes };
      return delete D[h().id], {
        ...T,
        nodes: D,
        edges: T.edges.filter(($) => $.from !== h().id && $.to !== h().id)
      };
    }), Wn.set(null);
  }
  function S(T) {
    return h().config[T] ?? void 0;
  }
  function x(T, D, $) {
    g(T, `$.${$}`), Q(c, null);
  }
  lt(() => (t(), De(h())), () => {
    Q(o, t().find((T) => T.type === h().type));
  }), lt(() => d(o), () => {
    var T, D, $;
    Q(l, (($ = (D = (T = d(o)) == null ? void 0 : T.schema) == null ? void 0 : D.config) == null ? void 0 : $.properties) ?? {});
  }), lt(() => (n(), De(h())), () => {
    Q(a, Object.values(n().nodes).filter((T) => n().edges.some((D) => D.to === h().id && D.from === T.id)));
  }), lt(() => De(h()), () => {
    var T;
    (T = h()) != null && T.id && (Q(f, null), Q(u, {}), Q(c, null));
  }), Ii(), Et();
  var P = A$(), E = w(P), R = w(E), C = w(R), Y = y(R, 2), L = y(E, 2), X = y(w(L), 2), M = y(L, 2);
  nt(
    M,
    1,
    () => (d(l), b(() => Object.entries(d(l)))),
    it,
    (T, D) => {
      var $ = /* @__PURE__ */ ys(() => Wm(d(D), 2));
      let Z = () => d($)[0], N = () => d($)[1];
      var oe = E$(), se = w(oe), G = w(se), q = y(se, 2);
      {
        var ie = (de) => {
          {
            let ve = /* @__PURE__ */ St(() => (Z(), b(() => String(S(Z()) ?? ""))));
            x$(de, {
              get value() {
                return d(ve);
              },
              get service() {
                return N(), b(() => N().service);
              },
              onChange: (ee) => g(Z(), ee)
            });
          }
        }, ae = (de) => {
          var ve = S$();
          U((ee) => Lr(ve, ee), [
            () => (Z(), b(() => JSON.stringify(S(Z()) ?? {}, null, 2)))
          ]), te("blur", ve, (ee) => {
            try {
              g(Z(), JSON.parse(ee.target.value));
            } catch {
            }
          }), A(de, ve);
        }, fe = (de) => {
          var ve = k$();
          U((ee) => Lr(ve, ee), [
            () => (Z(), b(() => Array.isArray(S(Z())) ? S(Z()).join(", ") : String(S(Z()) ?? "")))
          ]), te("input", ve, (ee) => g(Z(), ee.target.value.split(",").map((he) => he.trim()).filter(Boolean))), A(de, ve);
        }, ye = (de) => {
          var ve = Q$();
          U((ee) => f0(ve, ee), [() => (Z(), b(() => !!S(Z())))]), te("change", ve, (ee) => g(Z(), ee.target.checked)), A(de, ve);
        }, ue = (de) => {
          var ve = Yn(), ee = Je(ve);
          {
            var he = (we) => {
              var $e = _$(), We = Je($e);
              {
                let Ne = /* @__PURE__ */ St(() => (Z(), b(() => String(S(Z()) ?? "")))), Re = /* @__PURE__ */ St(() => (d(a), b(() => d(a).flatMap(p))));
                m$(We, {
                  get value() {
                    return d(Ne);
                  },
                  get fieldName() {
                    return Z();
                  },
                  get contextKeys() {
                    return d(Re);
                  },
                  $$events: {
                    change: (z) => g(Z(), z.detail),
                    evaluate: (z) => O(Z(), z.detail)
                  }
                });
              }
              var st = y(We, 2);
              {
                var Le = (Ne) => {
                  var Re = $$(), z = w(Re);
                  U((j) => V(z, j), [
                    () => (d(u), Z(), b(() => String(d(u)[Z()])))
                  ]), A(Ne, Re);
                };
                J(st, (Ne) => {
                  d(u), Z(), b(() => d(u)[Z()]) && Ne(Le);
                });
              }
              var ct = y(st, 2);
              te("click", ct, () => {
                Q(f, null), Q(u, { ...d(u), [Z()]: void 0 });
              }), A(we, $e);
            }, be = (we) => {
              var $e = Z$(), We = Je($e), st = w(We), Le = y(st, 2);
              {
                var ct = (j) => {
                  var K = P$();
                  te("click", K, () => {
                    Q(c, d(c) === Z() ? null : Z());
                  }), A(j, K);
                };
                J(Le, (j) => {
                  d(a), b(() => d(a).length > 0) && j(ct);
                });
              }
              var Ne = y(Le, 2), Re = y(We, 2);
              {
                var z = (j) => {
                  var K = C$(), le = y(w(K), 2);
                  nt(le, 1, () => d(a), it, (xe, qe) => {
                    var Ze = Yn(), H = Je(Ze);
                    nt(
                      H,
                      1,
                      () => (d(qe), b(() => p(d(qe)))),
                      it,
                      (ce, me) => {
                        var Me = T$(), Ue = w(Me), _e = w(Ue), Ee = y(Ue, 2), pt = w(Ee);
                        U(() => {
                          V(_e, (d(qe), b(() => d(qe).label ?? d(qe).id))), V(pt, `$.${d(me) ?? ""}`);
                        }), te("click", Me, () => x(Z(), d(qe).id, d(me))), A(ce, Me);
                      }
                    ), A(xe, Ze);
                  }), A(j, K);
                };
                J(Re, (j) => {
                  d(c), Z(), d(a), b(() => d(c) === Z() && d(a).length > 0) && j(z);
                });
              }
              U((j) => Lr(st, j), [
                () => (Z(), b(() => String(S(Z()) ?? "")))
              ]), te("input", st, (j) => g(Z(), j.target.value)), te("click", Ne, () => {
                Q(f, Z()), Q(c, null);
              }), A(we, $e);
            };
            J(ee, (we) => {
              d(f) === Z() ? we(he) : we(be, -1);
            });
          }
          A(de, ve);
        };
        J(q, (de) => {
          N(), b(() => N().format === "connection") ? de(ie) : (N(), b(() => N().type === "object") ? de(ae, 1) : (N(), b(() => N().type === "array") ? de(fe, 2) : (N(), b(() => N().type === "boolean") ? de(ye, 3) : de(ue, -1))));
        });
      }
      U(() => V(G, (N(), Z(), b(() => N().description ?? Z())))), A(T, oe);
    }
  );
  var k = y(M, 2);
  U(() => {
    V(C, `Node: ${De(h()), b(() => h().type) ?? ""}`), Lr(X, (De(h()), b(() => h().label ?? "")));
  }), te("click", Y, () => Wn.set(null)), te("input", X, (T) => m(T.target.value)), te("click", k, v), A(i, P), _t(), r();
}
var M$ = /* @__PURE__ */ I('<div class="agent-name svelte-5tjmbm"> </div> <div> </div>', 1), X$ = /* @__PURE__ */ I('<div class="status-msg svelte-5tjmbm"> </div>'), j$ = /* @__PURE__ */ I('<div class="status-msg svelte-5tjmbm"> </div>'), L$ = /* @__PURE__ */ I('<div class="status-msg svelte-5tjmbm"> </div>'), I$ = /* @__PURE__ */ I('<button class="btn-revert svelte-5tjmbm"> </button> <!>', 1), D$ = /* @__PURE__ */ I('<span class="trigger-filter svelte-5tjmbm"> </span>'), z$ = /* @__PURE__ */ I('<div class="trigger-row svelte-5tjmbm"><div class="trigger-info svelte-5tjmbm"><span class="trigger-service svelte-5tjmbm"> </span> <!> <code class="trigger-url svelte-5tjmbm"> </code></div> <button class="trigger-remove svelte-5tjmbm" title="Remove trigger">✕</button></div>'), N$ = /* @__PURE__ */ I('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Registered Triggers</label> <!></div>'), Y$ = /* @__PURE__ */ I("<option> </option>"), W$ = /* @__PURE__ */ I('<div class="status-msg svelte-5tjmbm"> </div>'), q$ = /* @__PURE__ */ I(`<!> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Service</label> <select class="svelte-5tjmbm"><option>— select a service —</option><!></select></div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Event Filter (optional)</label> <input type="text" placeholder="e.g. app_mention — blank for all events" class="svelte-5tjmbm"/></div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Signing Secret</label> <input type="password" placeholder="the service's webhook signing secret" class="svelte-5tjmbm"/> <div class="field-hint svelte-5tjmbm">Used to verify inbound event signatures. Never displayed after registration.</div></div> <button class="btn-save svelte-5tjmbm"> </button> <!>`, 1), V$ = /* @__PURE__ */ I('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Cron Expression</label> <input type="text" placeholder="0 * * * * (every hour)" class="svelte-5tjmbm"/> <div class="field-hint svelte-5tjmbm">Standard cron format: minute hour day month weekday</div></div>'), B$ = /* @__PURE__ */ I('<div class="webhook-url svelte-5tjmbm"><code class="svelte-5tjmbm"> </code> <div class="field-hint svelte-5tjmbm">POST your payload to this URL. No auth headers required.</div></div>'), G$ = /* @__PURE__ */ I('<div class="field-hint svelte-5tjmbm">Publish the agent to generate the webhook URL.</div>'), U$ = /* @__PURE__ */ I('<div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Webhook URL</label> <!></div>'), F$ = /* @__PURE__ */ I('<div class="status-msg svelte-5tjmbm"> </div>'), H$ = /* @__PURE__ */ I('<div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Agent</div> <!> <div class="btn-row svelte-5tjmbm"><button class="btn-draft svelte-5tjmbm"> </button> <button class="btn-publish svelte-5tjmbm"> </button></div> <!> <!> <!></div> <div class="panel-section svelte-5tjmbm"><div class="panel-header svelte-5tjmbm">Trigger Config</div> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Trigger Type</label> <select class="svelte-5tjmbm"><option>REST API</option><option>Scheduled (Cron)</option><option>Webhook</option><option>Integration Event</option></select></div> <!> <!> <!> <div class="form-group svelte-5tjmbm"><label class="svelte-5tjmbm">Description</label> <input type="text" placeholder="What does this agent do?" class="svelte-5tjmbm"/></div> <button class="btn-save svelte-5tjmbm"> </button> <!></div>', 1);
function K$(i, e) {
  $t(e, !1);
  const t = () => at(ht, "$graph", r), n = () => at(As, "$agentConfig", r), s = () => at(fl, "$agent", r), [r, o] = $n();
  let l = et(e, "agentId", 8), a = /* @__PURE__ */ F(!1), h = /* @__PURE__ */ F(""), c = /* @__PURE__ */ F(!1), f = /* @__PURE__ */ F(""), u = /* @__PURE__ */ F(!1), p = /* @__PURE__ */ F(""), O = /* @__PURE__ */ F(!1), g = /* @__PURE__ */ F(""), m = /* @__PURE__ */ F([]), v = /* @__PURE__ */ F([]), S = /* @__PURE__ */ F(""), x = /* @__PURE__ */ F(""), P = /* @__PURE__ */ F(""), E = /* @__PURE__ */ F(""), R = /* @__PURE__ */ F(!1);
  Ps(async () => {
    try {
      const [H, ce] = await Promise.all([
        fetch("/api/integrations"),
        fetch("/api/integrations/triggers")
      ]);
      if (H.ok) {
        const me = await H.json();
        Q(m, me.filter((Me) => Me.hasTrigger));
      }
      if (ce.ok) {
        const me = await ce.json();
        Q(v, me.filter((Me) => Me.agentId === l()));
      }
    } catch {
    }
  });
  async function C() {
    Q(R, !0), Q(E, "");
    try {
      const H = await fetch("/api/integrations/triggers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: d(S),
          agentId: l(),
          eventFilter: d(x) || void 0,
          secret: d(P)
        })
      });
      if (!H.ok) throw new Error("Registration failed");
      const ce = await H.json();
      Q(v, [...d(v), ce]), Q(P, ""), Q(x, ""), Q(E, "✓ Trigger registered");
    } catch (H) {
      Q(E, "✗ " + (H instanceof Error ? H.message : "Error"));
    } finally {
      Q(R, !1);
    }
  }
  async function Y(H) {
    try {
      const ce = await fetch(`/api/integrations/triggers/${H}`, { method: "DELETE" });
      (ce.ok || ce.status === 204) && Q(v, d(v).filter((me) => me.id !== H));
    } catch {
    }
  }
  async function L() {
    Q(a, !0), Q(h, "");
    try {
      const H = JSON.stringify(t());
      if (!(await fetch(`/api/agents/${l()}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ graphJson: H })
      })).ok) throw new Error("Publish failed");
      Q(h, "✓ Published");
      const me = await fetch(`/api/agents/${l()}`);
      me.ok && fl.set(await me.json());
    } catch (H) {
      Q(h, "✗ " + (H instanceof Error ? H.message : "Error"));
    } finally {
      Q(a, !1);
    }
  }
  async function X() {
    Q(u, !0), Q(p, "");
    try {
      if (!(await fetch(`/api/agents/${l()}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftGraphJson: JSON.stringify(t()) })
      })).ok) throw new Error("Save failed");
      Q(p, "✓ Draft saved");
    } catch (H) {
      Q(p, "✗ " + (H instanceof Error ? H.message : "Error"));
    } finally {
      Q(u, !1);
    }
  }
  async function M() {
    Q(O, !0), Q(g, "");
    try {
      const H = await fetch(`/api/agents/${l()}/draft`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (!H.ok) throw new Error("Revert failed");
      fl.set(await H.json()), Q(g, "✓ Reverted to draft");
    } catch (H) {
      Q(g, "✗ " + (H instanceof Error ? H.message : "Error"));
    } finally {
      Q(O, !1);
    }
  }
  async function k() {
    Q(c, !0), Q(f, "");
    try {
      const H = { type: n().triggerType };
      if (n().triggerType === "cron" && (H.expression = n().cronExpression), !(await fetch(`/api/agents/${l()}/config`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ triggerConfig: H })
      })).ok) throw new Error("Save failed");
      if (Q(f, "✓ Saved"), n().triggerType === "webhook") {
        const me = await fetch(`/api/agents/${l()}/config`);
        if (me.ok) {
          const Me = await me.json();
          As.update((Ue) => {
            var _e;
            return { ...Ue, webhookUrl: ((_e = Me.triggerConfig) == null ? void 0 : _e.webhookUrl) ?? "" };
          });
        }
      }
    } catch (H) {
      Q(f, "✗ " + (H instanceof Error ? H.message : "Error"));
    } finally {
      Q(c, !1);
    }
  }
  Et();
  var T = H$(), D = Je(T), $ = y(w(D), 2);
  {
    var Z = (H) => {
      var ce = M$(), me = Je(ce), Me = w(me), Ue = y(me, 2), _e = w(Ue);
      U(() => {
        V(Me, (s(), b(() => s().name))), Ft(Ue, 1, `agent-status status-${s(), b(() => s().status) ?? ""}`, "svelte-5tjmbm"), V(_e, (s(), b(() => s().status)));
      }), A(H, ce);
    };
    J($, (H) => {
      s() && H(Z);
    });
  }
  var N = y($, 2), oe = w(N), se = w(oe), G = y(oe, 2), q = w(G), ie = y(N, 2);
  {
    var ae = (H) => {
      var ce = X$(), me = w(ce);
      U(() => V(me, d(p))), A(H, ce);
    };
    J(ie, (H) => {
      d(p) && H(ae);
    });
  }
  var fe = y(ie, 2);
  {
    var ye = (H) => {
      var ce = j$(), me = w(ce);
      U(() => V(me, d(h))), A(H, ce);
    };
    J(fe, (H) => {
      d(h) && H(ye);
    });
  }
  var ue = y(fe, 2);
  {
    var de = (H) => {
      var ce = I$(), me = Je(ce), Me = w(me), Ue = y(me, 2);
      {
        var _e = (Ee) => {
          var pt = L$(), Se = w(pt);
          U(() => V(Se, d(g))), A(Ee, pt);
        };
        J(Ue, (Ee) => {
          d(g) && Ee(_e);
        });
      }
      U(() => {
        me.disabled = d(O), V(Me, d(O) ? "Reverting…" : "Revert to Draft");
      }), te("click", me, M), A(H, ce);
    };
    J(ue, (H) => {
      s(), b(() => {
        var ce;
        return ((ce = s()) == null ? void 0 : ce.status) === "active";
      }) && H(de);
    });
  }
  var ve = y(D, 2), ee = y(w(ve), 2), he = y(w(ee), 2), be = w(he);
  be.value = be.__value = "rest";
  var we = y(be);
  we.value = we.__value = "cron";
  var $e = y(we);
  $e.value = $e.__value = "webhook";
  var We = y($e);
  We.value = We.__value = "integration";
  var st = y(ee, 2);
  {
    var Le = (H) => {
      var ce = q$(), me = Je(ce);
      {
        var Me = (yt) => {
          var mt = N$(), Ti = y(w(mt), 2);
          nt(Ti, 1, () => d(v), it, ($r, Nt) => {
            var Mo = z$(), fn = w(Mo), un = w(fn), _r = w(un), kf = y(un, 2);
            {
              var wm = (wa) => {
                var Qf = D$(), Qm = w(Qf);
                U(() => V(Qm, (d(Nt), b(() => d(Nt).eventFilter)))), A(wa, Qf);
              };
              J(kf, (wa) => {
                d(Nt), b(() => d(Nt).eventFilter) && wa(wm);
              });
            }
            var xm = y(kf, 2), Sm = w(xm), km = y(fn, 2);
            U(() => {
              V(_r, (d(Nt), b(() => d(Nt).service))), V(Sm, (d(Nt), b(() => d(Nt).url)));
            }), te("click", km, () => Y(d(Nt).id)), A($r, Mo);
          }), A(yt, mt);
        };
        J(me, (yt) => {
          d(v), b(() => d(v).length > 0) && yt(Me);
        });
      }
      var Ue = y(me, 2), _e = y(w(Ue), 2), Ee = w(_e);
      Ee.value = Ee.__value = "";
      var pt = y(Ee);
      nt(pt, 1, () => d(m), it, (yt, mt) => {
        var Ti = Y$(), $r = w(Ti), Nt = {};
        U(() => {
          V($r, (d(mt), b(() => d(mt).displayName))), Nt !== (Nt = (d(mt), b(() => d(mt).service))) && (Ti.value = (Ti.__value = (d(mt), b(() => d(mt).service))) ?? "");
        }), A(yt, Ti);
      });
      var Se = y(Ue, 2), Xe = y(w(Se), 2), Fe = y(Se, 2), Ni = y(w(Fe), 2), Yi = y(Fe, 2), hi = w(Yi), ci = y(Yi, 2);
      {
        var Fn = (yt) => {
          var mt = W$(), Ti = w(mt);
          U(() => V(Ti, d(E))), A(yt, mt);
        };
        J(ci, (yt) => {
          d(E) && yt(Fn);
        });
      }
      U(() => {
        Yi.disabled = d(R) || !d(S) || !d(P), V(hi, d(R) ? "Registering…" : "Register Trigger");
      }), Th(_e, () => d(S), (yt) => Q(S, yt)), Gt(Xe, () => d(x), (yt) => Q(x, yt)), Gt(Ni, () => d(P), (yt) => Q(P, yt)), te("click", Yi, C), A(H, ce);
    };
    J(st, (H) => {
      n(), b(() => n().triggerType === "integration") && H(Le);
    });
  }
  var ct = y(st, 2);
  {
    var Ne = (H) => {
      var ce = V$(), me = y(w(ce), 2);
      Gt(me, () => n().cronExpression, (Me) => Sa(As, b(n).cronExpression = Me, b(n))), A(H, ce);
    };
    J(ct, (H) => {
      n(), b(() => n().triggerType === "cron") && H(Ne);
    });
  }
  var Re = y(ct, 2);
  {
    var z = (H) => {
      var ce = U$(), me = y(w(ce), 2);
      {
        var Me = (_e) => {
          var Ee = B$(), pt = w(Ee), Se = w(pt);
          U(() => V(Se, (n(), b(() => n().webhookUrl)))), A(_e, Ee);
        }, Ue = (_e) => {
          var Ee = G$();
          A(_e, Ee);
        };
        J(me, (_e) => {
          n(), b(() => n().webhookUrl) ? _e(Me) : _e(Ue, -1);
        });
      }
      A(H, ce);
    };
    J(Re, (H) => {
      n(), b(() => n().triggerType === "webhook") && H(z);
    });
  }
  var j = y(Re, 2), K = y(w(j), 2), le = y(j, 2), xe = w(le), qe = y(le, 2);
  {
    var Ze = (H) => {
      var ce = F$(), me = w(ce);
      U(() => V(me, d(f))), A(H, ce);
    };
    J(qe, (H) => {
      d(f) && H(Ze);
    });
  }
  U(() => {
    oe.disabled = d(u), V(se, d(u) ? "Saving…" : "Save Draft"), G.disabled = d(a), V(q, d(a) ? "Publishing…" : "Publish"), le.disabled = d(c), V(xe, d(c) ? "Saving…" : "Save");
  }), te("click", oe, X), te("click", G, L), Th(he, () => n().triggerType, (H) => Sa(As, b(n).triggerType = H, b(n))), Gt(K, () => n().description, (H) => Sa(As, b(n).description = H, b(n))), te("click", le, k), A(i, T), _t(), o();
}
const ii = Qn({
  runId: null,
  status: "idle",
  output: null,
  error: null,
  steps: []
});
var J$ = /* @__PURE__ */ I('<button class="btn-stop svelte-gqobos">■ Stop</button>'), e_ = /* @__PURE__ */ I('<pre class="result-json svelte-gqobos"> </pre>'), t_ = /* @__PURE__ */ I('<div class="result-error svelte-gqobos"> </div>'), i_ = /* @__PURE__ */ I('<button class="traj-toggle svelte-gqobos"> </button>'), n_ = /* @__PURE__ */ I('<div class="traj-thought svelte-gqobos"><span class="traj-label svelte-gqobos">Thought</span> </div>'), s_ = /* @__PURE__ */ I('<div class="traj-action svelte-gqobos"><span class="traj-label svelte-gqobos">Action</span> </div>'), r_ = /* @__PURE__ */ I('<div class="traj-obs svelte-gqobos"><span class="traj-label svelte-gqobos">Obs</span> </div>'), o_ = /* @__PURE__ */ I('<div class="traj-step svelte-gqobos"><span class="traj-iter svelte-gqobos"> </span> <!> <!> <!></div>'), l_ = /* @__PURE__ */ I('<div class="trajectory-block svelte-gqobos"></div>'), a_ = /* @__PURE__ */ I('<div><span class="step-type svelte-gqobos"> </span> <span> </span> <!></div> <!>', 1), h_ = /* @__PURE__ */ I('<div class="steps-header svelte-gqobos"> </div> <!>', 1), c_ = /* @__PURE__ */ I('<div><div class="result-status svelte-gqobos"> </div> <!> <!></div> <!>', 1), f_ = /* @__PURE__ */ I('<div class="panel-section svelte-gqobos"><div class="panel-header svelte-gqobos">Test Run</div> <div class="form-group svelte-gqobos"><label class="svelte-gqobos">Input (JSON)</label> <textarea rows="4" class="svelte-gqobos"></textarea></div> <div class="run-controls svelte-gqobos"><button class="btn-run svelte-gqobos"> </button> <!></div> <!></div>');
function u_(i, e) {
  $t(e, !1);
  const t = () => at(ii, "$runState", n), [n, s] = $n();
  let r = et(e, "agentId", 8), o = /* @__PURE__ */ F("{}"), l = /* @__PURE__ */ F(!1), a = null;
  const h = /* @__PURE__ */ new Set(["core:react", "core:planner"]);
  let c = /* @__PURE__ */ F([]), f = /* @__PURE__ */ F(
    null
    // nodeId
  );
  async function u(L) {
    try {
      const X = await fetch(`/api/telemetry/trajectory/${L}`);
      if (!X.ok) return;
      const M = await X.json();
      Q(c, M.trajectories ?? []);
    } catch {
    }
  }
  function p() {
    a && (a.close(), a = null), Q(l, !1);
  }
  async function O() {
    var M;
    p(), Q(l, !0), ii.set({
      runId: null,
      status: "running",
      output: null,
      error: null,
      steps: []
    });
    let L;
    try {
      L = JSON.parse(d(o));
    } catch {
      ii.set({
        runId: null,
        status: "failed",
        output: null,
        error: "Invalid JSON input",
        steps: []
      }), Q(l, !1);
      return;
    }
    let X;
    try {
      const k = await fetch(`/api/agents/${r()}/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: L, mode: "async" })
      });
      if (!k.ok) {
        const D = await k.json();
        throw new Error(((M = D == null ? void 0 : D.error) == null ? void 0 : M.message) ?? `HTTP ${k.status}`);
      }
      X = (await k.json()).runId;
    } catch (k) {
      ii.set({
        runId: null,
        status: "failed",
        output: null,
        error: String(k),
        steps: []
      }), Q(l, !1);
      return;
    }
    ii.update((k) => ({ ...k, runId: X })), a = new EventSource(`/api/agents/${r()}/runs/${X}/stream`), a.addEventListener("node.started", (k) => {
      const T = JSON.parse(k.data);
      ii.update((D) => ({
        ...D,
        steps: [
          ...D.steps.filter(($) => $.nodeId !== T.nodeId),
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
    }), a.addEventListener("node.completed", (k) => {
      const T = JSON.parse(k.data);
      ii.update((D) => ({
        ...D,
        steps: D.steps.map(($) => $.nodeId === T.nodeId ? {
          ...$,
          status: "complete",
          completedAt: (/* @__PURE__ */ new Date()).toISOString(),
          output: T.outputs
        } : $)
      }));
    }), a.addEventListener("node.failed", (k) => {
      const T = JSON.parse(k.data);
      ii.update((D) => ({
        ...D,
        steps: D.steps.map(($) => $.nodeId === T.nodeId ? {
          ...$,
          status: "failed",
          completedAt: (/* @__PURE__ */ new Date()).toISOString(),
          error: T.error
        } : $)
      }));
    }), a.addEventListener("run.completed", (k) => {
      const T = JSON.parse(k.data);
      ii.update((D) => ({ ...D, status: "completed", output: T.output })), p(), u(X);
    }), a.addEventListener("run.failed", (k) => {
      const T = JSON.parse(k.data);
      ii.update((D) => ({ ...D, status: "failed", error: T.error.message })), p();
    }), a.addEventListener("run.suspended", () => {
      ii.update((k) => ({
        ...k,
        status: "failed",
        error: "Run suspended — awaiting human review"
      })), p();
    }), a.onerror = () => {
      d(l) && (ii.update((k) => ({
        ...k,
        status: k.status === "running" ? "failed" : k.status,
        error: k.error ?? "Stream connection lost"
      })), p());
    };
  }
  Et();
  var g = f_(), m = y(w(g), 2), v = y(w(m), 2), S = y(m, 2), x = w(S), P = w(x), E = y(x, 2);
  {
    var R = (L) => {
      var X = J$();
      te("click", X, p), A(L, X);
    };
    J(E, (L) => {
      d(l) && L(R);
    });
  }
  var C = y(S, 2);
  {
    var Y = (L) => {
      var X = c_(), M = Je(X), k = w(M), T = w(k), D = y(k, 2);
      {
        var $ = (G) => {
          var q = e_(), ie = w(q);
          U((ae) => V(ie, ae), [
            () => (t(), b(() => JSON.stringify(t().output, null, 2)))
          ]), A(G, q);
        };
        J(D, (G) => {
          t(), b(() => t().output) && G($);
        });
      }
      var Z = y(D, 2);
      {
        var N = (G) => {
          var q = t_(), ie = w(q);
          U(() => V(ie, (t(), b(() => t().error)))), A(G, q);
        };
        J(Z, (G) => {
          t(), b(() => t().error) && G(N);
        });
      }
      var oe = y(M, 2);
      {
        var se = (G) => {
          var q = h_(), ie = Je(q), ae = w(ie), fe = y(ie, 2);
          nt(fe, 1, () => (t(), b(() => t().steps)), it, (ye, ue) => {
            var de = a_(), ve = Je(de), ee = w(ve), he = w(ee), be = y(ee, 2), we = w(be), $e = y(be, 2);
            {
              var We = (Ne) => {
                const Re = /* @__PURE__ */ St(() => (d(c), d(ue), b(() => d(c).filter((le) => le.stepId === d(ue).stepId))));
                var z = Yn(), j = Je(z);
                {
                  var K = (le) => {
                    var xe = i_(), qe = w(xe);
                    U(() => V(qe, `▶ Trajectory (${De(d(Re)), b(() => d(Re).length) ?? ""} steps)`)), te("click", xe, () => Q(f, d(f) === d(ue).nodeId ? null : d(ue).nodeId)), A(le, xe);
                  };
                  J(j, (le) => {
                    De(d(Re)), b(() => d(Re).length > 0) && le(K);
                  });
                }
                A(Ne, z);
              }, st = /* @__PURE__ */ ys(() => (d(ue), t(), b(() => h.has(d(ue).nodeType) && t().status !== "running")));
              J($e, (Ne) => {
                d(st) && Ne(We);
              });
            }
            var Le = y(ve, 2);
            {
              var ct = (Ne) => {
                const Re = /* @__PURE__ */ St(() => (d(c), d(ue), b(() => d(c).filter((j) => j.stepId === d(ue).stepId))));
                var z = l_();
                nt(z, 5, () => d(Re), it, (j, K) => {
                  var le = o_(), xe = w(le), qe = w(xe), Ze = y(xe, 2);
                  {
                    var H = (_e) => {
                      var Ee = n_(), pt = y(w(Ee));
                      U(() => V(pt, ` ${d(K), b(() => d(K).thought) ?? ""}`)), A(_e, Ee);
                    };
                    J(Ze, (_e) => {
                      d(K), b(() => d(K).thought) && _e(H);
                    });
                  }
                  var ce = y(Ze, 2);
                  {
                    var me = (_e) => {
                      var Ee = s_(), pt = y(w(Ee));
                      U(() => V(pt, ` ${d(K), b(() => d(K).action) ?? ""}`)), A(_e, Ee);
                    };
                    J(ce, (_e) => {
                      d(K), b(() => d(K).action) && _e(me);
                    });
                  }
                  var Me = y(ce, 2);
                  {
                    var Ue = (_e) => {
                      var Ee = r_(), pt = y(w(Ee));
                      U(() => V(pt, ` ${d(K), b(() => d(K).observation) ?? ""}`)), A(_e, Ee);
                    };
                    J(Me, (_e) => {
                      d(K), b(() => d(K).observation) && _e(Ue);
                    });
                  }
                  U(() => V(qe, `Iter ${d(K), b(() => d(K).iteration) ?? ""}`)), A(j, le);
                }), A(Ne, z);
              };
              J(Le, (Ne) => {
                d(f), d(ue), b(() => d(f) === d(ue).nodeId) && Ne(ct);
              });
            }
            U(() => {
              Ft(ve, 1, `step step-${d(ue), b(() => d(ue).status) ?? ""}`, "svelte-gqobos"), V(he, (d(ue), b(() => d(ue).nodeType))), Ft(be, 1, `step-badge badge-${d(ue), b(() => d(ue).status) ?? ""}`, "svelte-gqobos"), V(we, (d(ue), b(() => d(ue).status)));
            }), A(ye, de);
          }), U(() => V(ae, `Steps (${t(), b(() => t().steps.length) ?? ""})`)), A(G, q);
        };
        J(oe, (G) => {
          t(), b(() => t().steps.length > 0) && G(se);
        });
      }
      U(
        (G) => {
          Ft(M, 1, `run-result status-${t(), b(() => t().status) ?? ""}`, "svelte-gqobos"), V(T, G);
        },
        [
          () => (t(), b(() => t().status.toUpperCase()))
        ]
      ), A(L, X);
    };
    J(C, (L) => {
      t(), b(() => t().status !== "idle") && L(Y);
    });
  }
  U(() => {
    x.disabled = d(l), V(P, d(l) ? "Running…" : "▶ Run");
  }), Gt(v, () => d(o), (L) => Q(o, L)), te("click", x, O), A(i, g), _t(), s();
}
var d_ = /* @__PURE__ */ I('<span class="badge badge-error svelte-do6mn6"> </span>'), p_ = /* @__PURE__ */ I('<span class="badge badge-warn svelte-do6mn6"> </span>'), O_ = /* @__PURE__ */ I('<div class="issue issue-error svelte-do6mn6" role="button" tabindex="0"><span class="issue-icon svelte-do6mn6">✗</span> <span class="issue-msg svelte-do6mn6"> </span></div>'), g_ = /* @__PURE__ */ I('<div class="issue issue-warning svelte-do6mn6" role="button" tabindex="0"><span class="issue-icon svelte-do6mn6">⚠</span> <span class="issue-msg svelte-do6mn6"> </span></div>'), m_ = /* @__PURE__ */ I('<label class="ack-label svelte-do6mn6"><input type="checkbox" class="svelte-do6mn6"/> Acknowledge warnings and allow publish</label>'), v_ = /* @__PURE__ */ I('<div class="lint-panel svelte-do6mn6"><div class="lint-header svelte-do6mn6"><span class="lint-title svelte-do6mn6">Graph Issues</span> <!> <!></div> <div class="issue-list svelte-do6mn6"><!> <!></div> <!></div>');
function b_(i, e) {
  $t(e, !1);
  const t = () => at(ht, "$graph", r), n = () => at(Gr, "$nodeTypes", r), s = () => at(Yc, "$connections", r), [r, o] = $n(), l = /* @__PURE__ */ F(), a = /* @__PURE__ */ F(), h = /* @__PURE__ */ F(), c = /* @__PURE__ */ F();
  let f = /* @__PURE__ */ F(!1);
  Ps(() => {
    eO();
  });
  function u(x) {
    const P = [], E = /* @__PURE__ */ new Map();
    for (const L of x.edges) {
      const X = E.get(L.from) ?? [];
      X.push(L.to), E.set(L.from, X);
    }
    const R = /* @__PURE__ */ new Map();
    function C(L) {
      var X;
      R.set(L, "visiting");
      for (const M of E.get(L) ?? [])
        if (R.get(M) === "visiting") {
          const k = x.nodes[L];
          (k == null ? void 0 : k.type) !== "core:loop" && P.push({
            severity: "error",
            message: `Cycle edge from "${(k == null ? void 0 : k.label) ?? L}" to "${((X = x.nodes[M]) == null ? void 0 : X.label) ?? M}" is only legal when the source is a core:loop node — the engine silently skips it otherwise`,
            nodeId: L
          });
        } else R.has(M) || C(M);
      R.set(L, "done");
    }
    const Y = x.entry ?? Object.keys(x.nodes)[0];
    return Y && x.nodes[Y] && C(Y), P;
  }
  function p(x, P, E) {
    var Y, L;
    const R = [], C = new Set(E.map((X) => X.id));
    for (const X of Object.values(x.nodes)) {
      const M = P.find((T) => T.type === X.type), k = (L = (Y = M == null ? void 0 : M.schema) == null ? void 0 : Y.config) == null ? void 0 : L.properties;
      if (k)
        for (const [T, D] of Object.entries(k)) {
          if (D.format !== "connection") continue;
          const $ = X.config[T];
          (!$ || !C.has(String($))) && R.push({
            severity: "error",
            message: `Node "${X.label ?? X.id}" is missing a valid ${D.service ?? "integration"} connection for "${T}"`,
            nodeId: X.id
          });
        }
    }
    return R;
  }
  function O(x, P, E) {
    const R = [], C = Object.values(x.nodes), Y = x.edges, L = new Set(P.map(($) => $.type));
    if (C.length === 0)
      return R.push({
        severity: "error",
        message: "Graph is empty — add at least a Start and End node"
      }), R;
    for (const $ of C)
      L.size > 0 && !L.has($.type) && R.push({
        severity: "error",
        message: `Node "${$.label ?? $.id}" has unknown type "${$.type}"`,
        nodeId: $.id
      });
    const X = x.entry ?? Object.keys(x.nodes)[0];
    x.nodes[X] || R.push({ severity: "error", message: "No entry node defined" });
    const M = /* @__PURE__ */ new Set(), k = [X];
    for (; k.length > 0; ) {
      const $ = k.shift();
      if (!M.has($)) {
        M.add($);
        for (const Z of Y)
          Z.from === $ && !M.has(Z.to) && k.push(Z.to);
      }
    }
    for (const $ of C)
      M.has($.id) || R.push({
        severity: "warning",
        message: `Node "${$.label ?? $.id}" is unreachable from the entry node`,
        nodeId: $.id
      });
    for (const $ of C) {
      const Z = Y.filter((se) => se.from === $.id);
      if (Z.length === 0) continue;
      const N = Z.some((se) => se.type === "conditional"), oe = Z.some((se) => se.type === "fallback" || se.type === "unconditional");
      N && !oe && R.push({
        severity: "warning",
        message: `Node "${$.label ?? $.id}" has conditional edges but no fallback — some inputs may go unhandled`,
        nodeId: $.id
      });
    }
    const T = /* @__PURE__ */ new Set(["core:end", "core:stop"]);
    for (const $ of C) {
      if (T.has($.type)) continue;
      Y.filter((N) => N.from === $.id).length === 0 && R.push({
        severity: "warning",
        message: `Node "${$.label ?? $.id}" has no outbound edges and is not a terminal node`,
        nodeId: $.id
      });
    }
    const D = x.toolEdges ?? [];
    for (const $ of C) {
      if ($.type === "core:tool") {
        const Z = Y.filter((oe) => oe.from === $.id);
        Z.length !== 1 && R.push({
          severity: "error",
          message: `Tool node "${$.label ?? $.id}" must have exactly one outbound flow edge (has ${Z.length})`,
          nodeId: $.id
        }), D.filter((oe) => oe.from === $.id).length === 0 && R.push({
          severity: "error",
          message: `Tool node "${$.label ?? $.id}" must be connected to an agent node via a tool edge`,
          nodeId: $.id
        });
      }
      ($.type === "core:tool-call" || $.type === "core:react") && D.filter((N) => N.to === $.id).length === 0 && R.push({
        severity: "warning",
        message: `Agent node "${$.label ?? $.id}" (${$.type}) has no tools connected — it will only be able to generate text without tool invocations`,
        nodeId: $.id
      });
    }
    return R.push(...u(x)), R.push(...p(x, P, E)), R;
  }
  function g(x) {
    if (!x) return;
    const P = t().nodes[x];
    P && Wn.set(P);
  }
  lt(() => (t(), n(), s()), () => {
    Q(l, O(t(), n(), s()));
  }), lt(() => d(l), () => {
    Q(a, d(l).filter((x) => x.severity === "error"));
  }), lt(() => d(l), () => {
    Q(h, d(l).filter((x) => x.severity === "warning"));
  }), lt(() => (d(a), d(h), d(f)), () => {
    Q(c, d(a).length === 0 && (d(h).length === 0 || d(f)));
  }), Ii(), Et();
  var m = Yn(), v = Je(m);
  {
    var S = (x) => {
      var P = v_(), E = w(P), R = y(w(E), 2);
      {
        var C = ($) => {
          var Z = d_(), N = w(Z);
          U(() => V(N, `${d(a), b(() => d(a).length) ?? ""} error${d(a), b(() => d(a).length !== 1 ? "s" : "") ?? ""}`)), A($, Z);
        };
        J(R, ($) => {
          d(a), b(() => d(a).length > 0) && $(C);
        });
      }
      var Y = y(R, 2);
      {
        var L = ($) => {
          var Z = p_(), N = w(Z);
          U(() => V(N, `${d(h), b(() => d(h).length) ?? ""} warning${d(h), b(() => d(h).length !== 1 ? "s" : "") ?? ""}`)), A($, Z);
        };
        J(Y, ($) => {
          d(h), b(() => d(h).length > 0) && $(L);
        });
      }
      var X = y(E, 2), M = w(X);
      nt(M, 1, () => d(a), it, ($, Z) => {
        var N = O_(), oe = y(w(N), 2), se = w(oe);
        U(() => V(se, (d(Z), b(() => d(Z).message)))), te("click", N, () => g(d(Z).nodeId)), te("keydown", N, (G) => G.key === "Enter" && g(d(Z).nodeId)), A($, N);
      });
      var k = y(M, 2);
      nt(k, 1, () => d(h), it, ($, Z) => {
        var N = g_(), oe = y(w(N), 2), se = w(oe);
        U(() => V(se, (d(Z), b(() => d(Z).message)))), te("click", N, () => g(d(Z).nodeId)), te("keydown", N, (G) => G.key === "Enter" && g(d(Z).nodeId)), A($, N);
      });
      var T = y(X, 2);
      {
        var D = ($) => {
          var Z = m_(), N = w(Z);
          $p(N, () => d(f), (oe) => Q(f, oe)), A($, Z);
        };
        J(T, ($) => {
          d(a), d(h), b(() => d(a).length === 0 && d(h).length > 0) && $(D);
        });
      }
      A(x, P);
    };
    J(v, (x) => {
      d(l), b(() => d(l).length > 0) && x(S);
    });
  }
  A(i, m), _t(), o();
}
var y_ = /* @__PURE__ */ I('<p class="empty-state svelte-28mxb5">No tools connected.<br/>Connect <code class="svelte-28mxb5">core:tool</code> or <code class="svelte-28mxb5">core:mcp-client</code> nodes via tool edges.</p>'), w_ = /* @__PURE__ */ I('<span class="tool-desc svelte-28mxb5"> </span>'), x_ = /* @__PURE__ */ I('<li class="tool-item svelte-28mxb5"><span class="tool-name svelte-28mxb5"> </span> <span class="tool-source svelte-28mxb5"> </span> <!></li>'), S_ = /* @__PURE__ */ I('<ul class="tool-list svelte-28mxb5"></ul>'), k_ = /* @__PURE__ */ I('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Name</span><code class="svelte-28mxb5"> </code></div>'), Q_ = /* @__PURE__ */ I('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Description</span><span class="svelte-28mxb5"> </span></div>'), $_ = /* @__PURE__ */ I('<div class="detail-row svelte-28mxb5"><span class="detail-label svelte-28mxb5">Connected to</span> <span class="svelte-28mxb5"> </span></div>'), __ = /* @__PURE__ */ I('<div class="tool-detail svelte-28mxb5"><!> <!> <!></div>'), P_ = /* @__PURE__ */ I('<p class="empty-state svelte-28mxb5">Select an agent node (<code class="svelte-28mxb5">core:tool-call</code>, <code class="svelte-28mxb5">core:react</code>) or a tool node to inspect its tools.</p>'), T_ = /* @__PURE__ */ I('<div class="tool-panel svelte-28mxb5"><div class="panel-header svelte-28mxb5">TOOLS</div> <!></div>');
function C_(i, e) {
  $t(e, !1);
  const t = () => at(Wn, "$selectedNode", s), n = () => at(ht, "$graph", s), [s, r] = $n(), o = /* @__PURE__ */ F(), l = /* @__PURE__ */ F(), a = /* @__PURE__ */ F(), h = /* @__PURE__ */ F(), c = /* @__PURE__ */ F(), f = /* @__PURE__ */ new Set(["core:tool", "core:mcp-client"]), u = /* @__PURE__ */ new Set(["core:tool-call", "core:react"]);
  lt(() => t(), () => {
    var P;
    Q(o, ((P = t()) == null ? void 0 : P.id) ?? null);
  }), lt(() => t(), () => {
    var P;
    Q(l, ((P = t()) == null ? void 0 : P.type) ?? null);
  }), lt(() => (d(o), d(l), n()), () => {
    Q(a, d(o) && u.has(d(l) ?? "") ? (n().toolEdges ?? []).filter((P) => P.to === d(o)).map((P) => ({ edge: P, node: n().nodes[P.from] })).filter((P) => P.node !== void 0) : []);
  }), lt(() => (d(o), d(l), t()), () => {
    var P;
    Q(h, d(o) && f.has(d(l) ?? "") ? (P = t()) == null ? void 0 : P.config : null);
  }), lt(() => (d(o), d(l), n()), () => {
    Q(c, d(o) && f.has(d(l) ?? "") ? (n().toolEdges ?? []).filter((P) => P.from === d(o)).map((P) => n().nodes[P.to]).filter(Boolean) : []);
  }), Ii(), Et();
  var p = T_(), O = y(w(p), 2);
  {
    var g = (P) => {
      var E = Yn(), R = Je(E);
      {
        var C = (L) => {
          var X = y_();
          A(L, X);
        }, Y = (L) => {
          var X = S_();
          nt(X, 5, () => d(a), it, (M, k) => {
            let T = () => d(k).node;
            var D = x_(), $ = w(D), Z = w($), N = y($, 2), oe = w(N), se = y(N, 2);
            {
              var G = (q) => {
                var ie = w_(), ae = w(ie);
                U((fe) => V(ae, fe), [
                  () => (T(), b(() => String(T().config.description)))
                ]), A(q, ie);
              };
              J(se, (q) => {
                T(), b(() => {
                  var ie;
                  return (ie = T().config) == null ? void 0 : ie.description;
                }) && q(G);
              });
            }
            U(
              (q) => {
                V(Z, q), V(oe, (T(), b(() => T().type === "core:mcp-client" ? "MCP" : "Graph")));
              },
              [
                () => (T(), b(() => {
                  var q;
                  return String(((q = T().config) == null ? void 0 : q.name) ?? T().type);
                }))
              ]
            ), A(M, D);
          }), A(L, X);
        };
        J(R, (L) => {
          d(a), b(() => d(a).length === 0) ? L(C) : L(Y, -1);
        });
      }
      A(P, E);
    }, m = /* @__PURE__ */ ys(() => (d(l), b(() => u.has(d(l) ?? "")))), v = (P) => {
      var E = __(), R = w(E);
      {
        var C = (k) => {
          var T = k_(), D = y(w(T)), $ = w(D);
          U((Z) => V($, Z), [
            () => (d(h), b(() => String(d(h).name)))
          ]), A(k, T);
        };
        J(R, (k) => {
          d(h), b(() => d(h).name) && k(C);
        });
      }
      var Y = y(R, 2);
      {
        var L = (k) => {
          var T = Q_(), D = y(w(T)), $ = w(D);
          U((Z) => V($, Z), [
            () => (d(h), b(() => String(d(h).description)))
          ]), A(k, T);
        };
        J(Y, (k) => {
          d(h), b(() => d(h).description) && k(L);
        });
      }
      var X = y(Y, 2);
      {
        var M = (k) => {
          var T = $_(), D = y(w(T), 2), $ = w(D);
          U((Z) => V($, Z), [
            () => (d(c), b(() => d(c).map((Z) => (Z == null ? void 0 : Z.label) ?? (Z == null ? void 0 : Z.id)).join(", ")))
          ]), A(k, T);
        };
        J(X, (k) => {
          d(c), b(() => d(c).length > 0) && k(M);
        });
      }
      A(P, E);
    }, S = /* @__PURE__ */ ys(() => (d(l), d(h), b(() => f.has(d(l) ?? "") && d(h)))), x = (P) => {
      var E = P_();
      A(P, E);
    };
    J(O, (P) => {
      d(m) ? P(g) : d(S) ? P(v, 1) : P(x, -1);
    });
  }
  A(i, p), _t(), r();
}
var Z_ = /* @__PURE__ */ I('<div class="rationale svelte-1grl4xd"> </div>'), E_ = /* @__PURE__ */ I('<code class="target svelte-1grl4xd"> </code>'), A_ = /* @__PURE__ */ I('<span class="data-preview svelte-1grl4xd"> </span>'), R_ = /* @__PURE__ */ I('<label class="patch-row svelte-1grl4xd"><input type="checkbox"/> <span class="op-label svelte-1grl4xd"> </span> <!> <!></label>'), M_ = /* @__PURE__ */ I('<div class="proposal-card svelte-1grl4xd"><div class="proposal-header svelte-1grl4xd"><span class="complexity-badge svelte-1grl4xd"> </span> <span class="proposal-desc svelte-1grl4xd"> </span></div> <!> <div class="patches-list svelte-1grl4xd"></div> <div class="proposal-actions svelte-1grl4xd"><button class="btn-text svelte-1grl4xd">Accept All</button> <button class="btn-text svelte-1grl4xd">Reject All</button> <span class="spacer svelte-1grl4xd"></span> <button class="btn-secondary svelte-1grl4xd">Dismiss</button> <button class="btn-primary svelte-1grl4xd">Apply</button></div></div>');
function X_(i, e) {
  $t(e, !1);
  let t = et(e, "proposal", 8);
  const n = Rc();
  let s = /* @__PURE__ */ F({});
  function r() {
    Q(s, Object.fromEntries(t().patches.map((L, X) => [X, !0])));
  }
  function o() {
    Q(s, Object.fromEntries(t().patches.map((L, X) => [X, !1])));
  }
  function l() {
    const L = t().patches.filter((X, M) => d(s)[M]);
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
  lt(() => De(t()), () => {
    Q(s, Object.fromEntries(t().patches.map((L, X) => [X, !0])));
  }), Ii(), Et();
  var f = M_(), u = w(f), p = w(u), O = w(p), g = y(p, 2), m = w(g), v = y(u, 2);
  {
    var S = (L) => {
      var X = Z_(), M = w(X);
      U(() => V(M, (De(t()), b(() => t().rationale)))), A(L, X);
    };
    J(v, (L) => {
      De(t()), b(() => t().rationale) && L(S);
    });
  }
  var x = y(v, 2);
  nt(
    x,
    5,
    () => (De(t()), b(() => t().patches)),
    it,
    (L, X, M) => {
      var k = R_(), T = w(k), D = y(T, 2), $ = w(D), Z = y(D, 2);
      {
        var N = (q) => {
          var ie = E_(), ae = w(ie);
          U(() => V(ae, (d(X), b(() => d(X).target)))), A(q, ie);
        };
        J(Z, (q) => {
          d(X), b(() => d(X).target) && q(N);
        });
      }
      var oe = y(Z, 2);
      {
        var se = (q) => {
          var ie = A_(), ae = w(ie);
          U((fe) => V(ae, `${fe ?? ""}…`), [
            () => (d(X), b(() => JSON.stringify(d(X).data).slice(0, 60)))
          ]), A(q, ie);
        }, G = /* @__PURE__ */ ys(() => (d(X), b(() => d(X).data && Object.keys(d(X).data).length > 0)));
        J(oe, (q) => {
          d(G) && q(se);
        });
      }
      U((q) => V($, q), [
        () => (d(X), b(() => c(d(X).op)))
      ]), $p(T, () => d(s)[M], (q) => Cn(s, d(s)[M] = q)), A(L, k);
    }
  );
  var P = y(x, 2), E = w(P), R = y(E, 2), C = y(R, 4), Y = y(C, 2);
  U(() => {
    kp(p, `color: ${De(t()), b(() => h[t().complexity]) ?? ""}`), V(O, (De(t()), b(() => t().complexity))), V(m, (De(t()), b(() => t().description)));
  }), te("click", E, r), te("click", R, o), te("click", C, a), te("click", Y, l), A(i, f), _t();
}
var j_ = /* @__PURE__ */ I('<button class="icon-btn undo-btn svelte-vtqea" title="Undo last Caal change">↺ Undo</button>'), L_ = /* @__PURE__ */ I('<button class="icon-btn svelte-vtqea" title="History">⏱</button>'), I_ = /* @__PURE__ */ I('<div><span class="msg-content svelte-vtqea"> </span></div>'), D_ = /* @__PURE__ */ I('<div class="history-view svelte-vtqea"><div class="history-header svelte-vtqea"><span class="svelte-vtqea">Conversation History</span> <button class="icon-btn svelte-vtqea">✕</button></div> <div class="messages-list svelte-vtqea"></div></div>'), z_ = /* @__PURE__ */ I('<div class="empty-state svelte-vtqea"><!></div>'), N_ = /* @__PURE__ */ I('<button class="node-chip svelte-vtqea"> </button>'), Y_ = /* @__PURE__ */ I('<span class="svelte-vtqea"> </span>'), W_ = /* @__PURE__ */ I('<div class="msg-content svelte-vtqea"></div>'), q_ = /* @__PURE__ */ I('<span class="msg-content svelte-vtqea"> </span>'), V_ = /* @__PURE__ */ I("<div><!></div>"), B_ = /* @__PURE__ */ I('<div class="message assistant thinking svelte-vtqea"><span class="dot svelte-vtqea"></span><span class="dot svelte-vtqea"></span><span class="dot svelte-vtqea"></span></div>'), G_ = /* @__PURE__ */ I('<button class="quick-btn svelte-vtqea"> </button>'), U_ = /* @__PURE__ */ I('<div class="messages-list svelte-vtqea"><!> <!> <!></div> <!> <div class="quick-actions svelte-vtqea"></div> <div class="input-area svelte-vtqea"><textarea class="caal-input svelte-vtqea" placeholder="Ask Caal… (Enter to send, Shift+Enter for newline)"></textarea> <button class="send-btn svelte-vtqea">➤</button></div>', 1), F_ = /* @__PURE__ */ I('<div class="context-bar svelte-vtqea"><span class="svelte-vtqea"> </span> <span class="sep svelte-vtqea">·</span> <span class="svelte-vtqea"> </span> <span class="sep svelte-vtqea">·</span> <span> </span></div> <!>', 1), H_ = /* @__PURE__ */ I('<div><div class="caal-header svelte-vtqea"><span class="caal-title svelte-vtqea"><span class="caal-dot svelte-vtqea"></span> Caal AI</span> <div class="header-actions svelte-vtqea"><!> <!> <button class="icon-btn svelte-vtqea"> </button></div></div> <!></div>');
function K_(i, e) {
  $t(e, !1);
  const t = () => at(ht, "$graph", o), n = () => at(Wn, "$selectedNode", o), s = () => at(ii, "$runState", o), r = () => at(_o, "$canUndoCaalChange", o), [o, l] = $n(), a = /* @__PURE__ */ F();
  let h = et(e, "agentId", 8), c = et(e, "readonly", 8, !1), f = /* @__PURE__ */ F([]), u = /* @__PURE__ */ F(""), p = /* @__PURE__ */ F(!1), O = /* @__PURE__ */ F(null), g = /* @__PURE__ */ F(null), m = /* @__PURE__ */ F(!0), v = /* @__PURE__ */ F(!1), S = /* @__PURE__ */ F([]), x = /* @__PURE__ */ F();
  const P = [
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
  async function E(ee, he) {
    if (!ee.trim() || d(p)) return;
    const be = { role: "user", content: ee, timestamp: Date.now() };
    Q(f, [...d(f), be]), Q(u, ""), Q(p, !0), M();
    try {
      const we = {
        ...t(),
        authoringMode: t().authoringMode ?? "studio"
      }, $e = {
        message: ee,
        graphState: we,
        selectedNodeIds: n() ? [n().id] : [],
        sessionId: d(g) ?? void 0,
        // Without this, invokeCaal's session-ID suffix falls back to
        // 'global', and every agent a user edits shares one Caal session
        // bucket instead of one per agent — also needed for loadHistory()'s
        // agentId-keyed lookup below to match the session that was actually
        // written (ISS-069).
        agentId: h(),
        intent: he ?? R(ee),
        lastRunResult: s().status === "idle" ? null : {
          status: s().status,
          output: s().output,
          error: s().error
        }
      }, We = await fetch("/api/v1/caal/invoke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify($e)
      }), st = await We.json();
      if (st.sessionId && Q(g, st.sessionId), st.code === "CAAL_STILL_RUNNING") {
        Q(f, [
          ...d(f),
          {
            role: "assistant",
            content: "Caal is taking longer than usual — your message may still be processed. Check History shortly.",
            timestamp: Date.now()
          }
        ]);
        return;
      }
      if (!We.ok) throw new Error(`Caal invoke failed: ${We.status}`);
      const Le = st.output ?? {}, ct = {
        role: "assistant",
        content: Le.content ?? "",
        nodeReferences: Le.nodeReferences ?? [],
        proposal: Le.proposal,
        canvasHighlight: Le.canvasHighlight,
        canvasFocus: Le.canvasFocus,
        timestamp: Date.now()
      };
      Q(f, [...d(f), ct]), Le.proposal && Q(O, Le.proposal), Le.canvasHighlight && C(Le.canvasHighlight), Le.canvasFocus && Y(Le.canvasFocus);
    } catch (we) {
      const $e = {
        role: "assistant",
        content: `Error: ${we.message}`,
        timestamp: Date.now()
      };
      Q(f, [...d(f), $e]);
    } finally {
      Q(p, !1), M();
    }
  }
  function R(ee) {
    const he = ee.toLowerCase();
    return /\b(add|create|remove|delete|update|change|modify|rename|move|connect|disconnect)\b/.test(he) ? "modify" : /\b(suggest|improve|optimize|better|recommend|enhance)\b/.test(he) ? "suggest" : "question";
  }
  function C(ee) {
    window.dispatchEvent(new CustomEvent("caal:canvas-highlight", { detail: ee }));
  }
  function Y(ee) {
    window.dispatchEvent(new CustomEvent("caal:canvas-focus", { detail: ee }));
  }
  function L(ee) {
    window.dispatchEvent(new CustomEvent("caal:canvas-focus", { detail: { nodeId: ee, zoom: 1.5 } })), window.dispatchEvent(new CustomEvent("caal:canvas-highlight", {
      detail: { nodeIds: [ee], color: "#F59E0B", durationMs: 2e3 }
    }));
  }
  function X(ee) {
    const he = [], be = /\[\[([^\]]+)\]\]/g;
    let we = 0, $e;
    for (; ($e = be.exec(ee)) !== null; )
      $e.index > we && he.push({ type: "text", value: ee.slice(we, $e.index) }), he.push({ type: "chip", value: $e[1] }), we = $e.index + $e[0].length;
    return we < ee.length && he.push({ type: "text", value: ee.slice(we) }), he;
  }
  function M() {
    requestAnimationFrame(() => {
      d(x) && Cn(x, d(x).scrollTop = d(x).scrollHeight);
    });
  }
  function k(ee) {
    ee.key === "Enter" && !ee.shiftKey && (ee.preventDefault(), E(d(u)));
  }
  async function T() {
    var ee;
    if (d(g))
      try {
        const he = await fetch(`/api/v1/caal/sessions/${encodeURIComponent(h())}`);
        if (he.ok) {
          const be = await he.json();
          Q(S, ((ee = be.contextEntries) == null ? void 0 : ee.messages) ?? []), Q(v, !0);
        }
      } catch {
      }
  }
  function D(ee) {
    const he = ee.detail;
    window.dispatchEvent(new CustomEvent("caal:apply-proposal", { detail: he })), Q(O, null), Q(f, [
      ...d(f),
      {
        role: "assistant",
        content: `Proposal "${he.description}" accepted and applied to graph.`,
        timestamp: Date.now()
      }
    ]);
  }
  function $() {
    const ee = Jp();
    ee && Q(f, [
      ...d(f),
      {
        role: "assistant",
        content: `Undid: ${ee}`,
        timestamp: Date.now()
      }
    ]);
  }
  function Z() {
    Q(O, null);
  }
  lt(() => De(c()), () => {
    Q(a, c() ? P.filter((ee) => ee.intent !== "modify") : P);
  }), Ii(), Et();
  var N = H_();
  let oe;
  var se = w(N), G = y(w(se), 2), q = w(G);
  {
    var ie = (ee) => {
      var he = j_();
      te("click", he, $), A(ee, he);
    };
    J(q, (ee) => {
      r() && ee(ie);
    });
  }
  var ae = y(q, 2);
  {
    var fe = (ee) => {
      var he = L_();
      te("click", he, T), A(ee, he);
    };
    J(ae, (ee) => {
      d(g) && ee(fe);
    });
  }
  var ye = y(ae, 2), ue = w(ye), de = y(se, 2);
  {
    var ve = (ee) => {
      var he = F_(), be = Je(he), we = w(be), $e = w(we), We = y(we, 4), st = w(We), Le = y(We, 4), ct = w(Le), Ne = y(be, 2);
      {
        var Re = (j) => {
          var K = D_(), le = w(K), xe = y(w(le), 2), qe = y(le, 2);
          nt(qe, 5, () => d(S), it, (Ze, H) => {
            var ce = I_(), me = w(ce), Me = w(me);
            U(() => {
              Ft(ce, 1, `message ${d(H), b(() => d(H).role) ?? ""}`, "svelte-vtqea"), V(Me, (d(H), b(() => d(H).content)));
            }), A(Ze, ce);
          }), te("click", xe, () => Q(v, !1)), A(j, K);
        }, z = (j) => {
          var K = U_(), le = Je(K), xe = w(le);
          {
            var qe = (Se) => {
              var Xe = z_(), Fe = w(Xe);
              {
                var Ni = (hi) => {
                  var ci = _h("Ask Caal to explain this agent. Modification isn't supported for code-defined agents yet — edit the source file directly.");
                  A(hi, ci);
                }, Yi = (hi) => {
                  var ci = _h("Ask Caal to explain, improve, or modify this agent graph.");
                  A(hi, ci);
                };
                J(Fe, (hi) => {
                  c() ? hi(Ni) : hi(Yi, -1);
                });
              }
              A(Se, Xe);
            };
            J(xe, (Se) => {
              d(f), b(() => d(f).length === 0) && Se(qe);
            });
          }
          var Ze = y(xe, 2);
          nt(Ze, 1, () => d(f), it, (Se, Xe) => {
            var Fe = V_(), Ni = w(Fe);
            {
              var Yi = (ci) => {
                var Fn = W_();
                nt(
                  Fn,
                  5,
                  () => (d(Xe), b(() => X(d(Xe).content))),
                  it,
                  (yt, mt) => {
                    var Ti = Yn(), $r = Je(Ti);
                    {
                      var Nt = (fn) => {
                        var un = N_(), _r = w(un);
                        U(() => V(_r, (d(mt), b(() => d(mt).value)))), te("click", un, () => L(d(mt).value)), A(fn, un);
                      }, Mo = (fn) => {
                        var un = Y_(), _r = w(un);
                        U(() => V(_r, (d(mt), b(() => d(mt).value)))), A(fn, un);
                      };
                      J($r, (fn) => {
                        d(mt), b(() => d(mt).type === "chip") ? fn(Nt) : fn(Mo, -1);
                      });
                    }
                    A(yt, Ti);
                  }
                ), A(ci, Fn);
              }, hi = (ci) => {
                var Fn = q_(), yt = w(Fn);
                U(() => V(yt, (d(Xe), b(() => d(Xe).content)))), A(ci, Fn);
              };
              J(Ni, (ci) => {
                d(Xe), b(() => d(Xe).role === "assistant") ? ci(Yi) : ci(hi, -1);
              });
            }
            U(() => Ft(Fe, 1, `message ${d(Xe), b(() => d(Xe).role) ?? ""}`, "svelte-vtqea")), A(Se, Fe);
          });
          var H = y(Ze, 2);
          {
            var ce = (Se) => {
              var Xe = B_();
              A(Se, Xe);
            };
            J(H, (Se) => {
              d(p) && Se(ce);
            });
          }
          jc(le, (Se) => Q(x, Se), () => d(x));
          var me = y(le, 2);
          {
            var Me = (Se) => {
              X_(Se, {
                get proposal() {
                  return d(O);
                },
                $$events: { apply: D, reject: Z }
              });
            };
            J(me, (Se) => {
              d(O) && Se(Me);
            });
          }
          var Ue = y(me, 2);
          nt(Ue, 5, () => d(a), it, (Se, Xe) => {
            var Fe = G_(), Ni = w(Fe);
            U(() => {
              Fe.disabled = d(p), V(Ni, (d(Xe), b(() => d(Xe).label)));
            }), te("click", Fe, () => E(d(Xe).prompt, d(Xe).intent)), A(Se, Fe);
          });
          var _e = y(Ue, 2), Ee = w(_e);
          He(Ee, "rows", 2);
          var pt = y(Ee, 2);
          U(
            (Se) => {
              Ee.disabled = d(p), pt.disabled = Se;
            },
            [
              () => (d(p), d(u), b(() => d(p) || !d(u).trim()))
            ]
          ), Gt(Ee, () => d(u), (Se) => Q(u, Se)), te("keydown", Ee, k), te("click", pt, () => E(d(u))), A(j, K);
        };
        J(Ne, (j) => {
          d(v) ? j(Re) : j(z, -1);
        });
      }
      U(
        (j, K) => {
          V($e, `${j ?? ""} node${K ?? ""}`), V(st, (n(), b(() => n() ? n().label || n().type : "no selection"))), Ft(Le, 1, `run-status run-status-${s(), b(() => s().status) ?? ""}`, "svelte-vtqea"), V(ct, `last run: ${s(), b(() => s().status) ?? ""}`);
        },
        [
          () => (t(), b(() => Object.keys(t().nodes ?? {}).length)),
          () => (t(), b(() => Object.keys(t().nodes ?? {}).length === 1 ? "" : "s"))
        ]
      ), A(ee, he);
    };
    J(de, (ee) => {
      d(m) && ee(ve);
    });
  }
  U(() => {
    oe = Ft(N, 1, "caal-panel svelte-vtqea", null, oe, { collapsed: !d(m) }), V(ue, d(m) ? "▼" : "▲");
  }), te("click", ye, () => Q(m, !d(m))), A(i, N), _t(), l();
}
var J_ = /* @__PURE__ */ I('<span class="sync-time svelte-ra0acr"> </span>'), eP = /* @__PURE__ */ I('<div class="code-banner svelte-ra0acr"><span class="icon svelte-ra0acr">⟨/⟩</span> <div class="text svelte-ra0acr"><span class="label svelte-ra0acr">Code-defined agent</span> <span class="handle svelte-ra0acr"> </span></div> <!> <a class="sync-link svelte-ra0acr" href="/admin/system/sync">Sync log</a></div>');
function tP(i, e) {
  $t(e, !1);
  let t = et(e, "handle", 8), n = et(e, "lastSyncAt", 8, null);
  Et();
  var s = eP(), r = y(w(s), 2), o = y(w(r), 2), l = w(o), a = y(r, 2);
  {
    var h = (c) => {
      var f = J_(), u = w(f);
      U((p) => V(u, `Synced ${p ?? ""}`), [
        () => (De(n()), b(() => new Date(n()).toLocaleTimeString()))
      ]), A(c, f);
    };
    J(a, (c) => {
      n() && c(h);
    });
  }
  U(() => V(l, t())), A(i, s), _t();
}
var iP = /* @__PURE__ */ I('<div class="loading svelte-1pzk804">Loading…</div>'), nP = /* @__PURE__ */ I('<div class="error svelte-1pzk804"> </div>'), sP = /* @__PURE__ */ I('<div class="empty svelte-1pzk804">No context entries yet.</div>'), rP = /* @__PURE__ */ I('<span class="count svelte-1pzk804"> </span>'), oP = /* @__PURE__ */ I('<div class="entry svelte-1pzk804"><div class="entry-header svelte-1pzk804"><code class="entry-key svelte-1pzk804"> </code> <span class="acc-type svelte-1pzk804"> </span> <!> <span class="tokens svelte-1pzk804"> </span></div> <pre class="entry-value svelte-1pzk804"> </pre></div>'), lP = /* @__PURE__ */ I('<div class="entries svelte-1pzk804"></div>'), aP = /* @__PURE__ */ I('<div class="panel-body svelte-1pzk804"><div class="session-id-row svelte-1pzk804"><span class="label svelte-1pzk804">Session</span> <code class="sid svelte-1pzk804"> </code> <button class="refresh-btn svelte-1pzk804">↻</button></div> <!></div>'), hP = /* @__PURE__ */ I('<div class="session-panel svelte-1pzk804"><button class="panel-header svelte-1pzk804"><span>Session Context</span> <span class="toggle svelte-1pzk804"> </span></button> <!></div>');
function cP(i, e) {
  $t(e, !1);
  let t = et(e, "agentId", 8), n = et(e, "sessionId", 8, null), s = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F([]), l = /* @__PURE__ */ F(null);
  async function a() {
    if (!(!t() || !n())) {
      Q(r, !0), Q(l, null);
      try {
        const O = await fetch(`/api/v1/agents/${t()}/sessions/${encodeURIComponent(n())}`);
        if (!O.ok) throw new Error(`${O.status}`);
        const g = await O.json();
        Q(o, Object.entries(g.contextEntries ?? {}).map(([m, v]) => ({
          key: m,
          value: v.value,
          accumulationType: v.accumulationType,
          count: Array.isArray(v.value) ? v.value.length : void 0
        })));
      } catch (O) {
        Q(l, O.message);
      } finally {
        Q(r, !1);
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
  lt(() => (De(n()), d(s)), () => {
    n() && d(s) && a();
  }), Ii(), Et();
  var f = Yn(), u = Je(f);
  {
    var p = (O) => {
      var g = hP(), m = w(g), v = y(w(m), 2), S = w(v), x = y(m, 2);
      {
        var P = (E) => {
          var R = aP(), C = w(R), Y = y(w(C), 2), L = w(Y), X = y(Y, 2), M = y(C, 2);
          {
            var k = (Z) => {
              var N = iP();
              A(Z, N);
            }, T = (Z) => {
              var N = nP(), oe = w(N);
              U(() => V(oe, d(l))), A(Z, N);
            }, D = (Z) => {
              var N = sP();
              A(Z, N);
            }, $ = (Z) => {
              var N = lP();
              nt(N, 5, () => d(o), it, (oe, se) => {
                var G = oP(), q = w(G), ie = w(q), ae = w(ie), fe = y(ie, 2), ye = w(fe), ue = y(fe, 2);
                {
                  var de = (we) => {
                    var $e = rP(), We = w($e);
                    U(() => V(We, `${d(se), b(() => d(se).count) ?? ""} items`)), A(we, $e);
                  };
                  J(ue, (we) => {
                    d(se), b(() => d(se).count !== void 0) && we(de);
                  });
                }
                var ve = y(ue, 2), ee = w(ve), he = y(q, 2), be = w(he);
                U(
                  (we, $e) => {
                    V(ae, (d(se), b(() => d(se).key))), V(ye, (d(se), b(() => d(se).accumulationType))), V(ee, `~${we ?? ""}t`), V(be, $e);
                  },
                  [
                    () => (d(se), b(() => h(d(se).value))),
                    () => (d(se), b(() => c(d(se).value)))
                  ]
                ), A(oe, G);
              }), A(Z, N);
            };
            J(M, (Z) => {
              d(r) ? Z(k) : d(l) ? Z(T, 1) : (d(o), b(() => d(o).length === 0) ? Z(D, 2) : Z($, -1));
            });
          }
          U(() => {
            V(L, n()), X.disabled = d(r);
          }), te("click", X, a), A(E, R);
        };
        J(x, (E) => {
          d(s) && E(P);
        });
      }
      U(() => V(S, d(s) ? "▼" : "▶")), te("click", m, () => {
        Q(s, !d(s));
      }), A(O, g);
    };
    J(u, (O) => {
      n() && O(p);
    });
  }
  A(i, f), _t();
}
var fP = /* @__PURE__ */ I('<div class="loading svelte-ojvpsl">Loading…</div>'), uP = /* @__PURE__ */ I('<div class="error svelte-ojvpsl"> </div>'), dP = /* @__PURE__ */ I('<div class="empty svelte-ojvpsl">No prompts defined.</div>'), pP = /* @__PURE__ */ I('<span class="active-label svelte-ojvpsl">active</span>'), OP = /* @__PURE__ */ I('<button class="promote-btn svelte-ojvpsl">Promote</button>'), gP = /* @__PURE__ */ I('<button class="diff-btn svelte-ojvpsl">Diff</button>'), mP = /* @__PURE__ */ I('<div><span class="vnum svelte-ojvpsl"> </span> <!> <!> <span class="version-date svelte-ojvpsl"> </span></div> <pre class="version-preview svelte-ojvpsl"> </pre>', 1), vP = /* @__PURE__ */ I('<div class="versions-list svelte-ojvpsl"></div>'), bP = /* @__PURE__ */ I('<div class="prompt-item svelte-ojvpsl"><button class="prompt-name svelte-ojvpsl"><span></span> <span> </span> <span class="version-count svelte-ojvpsl"> </span> <span class="chevron svelte-ojvpsl"> </span></button> <!></div>'), yP = /* @__PURE__ */ I('<div class="prompts-list svelte-ojvpsl"></div>'), wP = /* @__PURE__ */ I('<div class="panel-body svelte-ojvpsl"><!> <button class="new-btn svelte-ojvpsl">+ New Version</button></div>'), xP = /* @__PURE__ */ I('<div class="modal-overlay svelte-ojvpsl"><div class="modal svelte-ojvpsl"><h3 class="svelte-ojvpsl">New Prompt Version</h3> <label class="svelte-ojvpsl">Prompt Name <input placeholder="e.g. system-prompt" class="svelte-ojvpsl"/></label> <label class="svelte-ojvpsl">Content <textarea placeholder="Prompt content…" class="svelte-ojvpsl"></textarea></label> <div class="modal-actions svelte-ojvpsl"><button class="btn-secondary svelte-ojvpsl">Cancel</button> <button class="btn-primary svelte-ojvpsl">Create</button></div></div></div>'), SP = /* @__PURE__ */ I('<div class="modal-overlay svelte-ojvpsl"><div class="modal diff-modal svelte-ojvpsl"><h3 class="svelte-ojvpsl"> </h3> <div class="diff-grid svelte-ojvpsl"><div class="diff-col svelte-ojvpsl"><div class="diff-label svelte-ojvpsl"> </div> <pre class="svelte-ojvpsl"> </pre></div> <div class="diff-col svelte-ojvpsl"><div class="diff-label svelte-ojvpsl"> </div> <pre class="svelte-ojvpsl"> </pre></div></div> <div class="modal-actions svelte-ojvpsl"><button class="btn-secondary svelte-ojvpsl">Close</button> <button class="btn-primary svelte-ojvpsl"> </button></div></div></div>'), kP = /* @__PURE__ */ I('<div class="prompt-panel svelte-ojvpsl"><button class="panel-header svelte-ojvpsl"><span>Prompt Versions</span> <span class="toggle svelte-ojvpsl"> </span></button> <!></div> <!> <!>', 1);
function QP(i, e) {
  $t(e, !1), et(e, "agentId", 8);
  let t = /* @__PURE__ */ F(!1), n = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F([]), r = /* @__PURE__ */ F(/* @__PURE__ */ new Set()), o = /* @__PURE__ */ F(""), l = /* @__PURE__ */ F(""), a = /* @__PURE__ */ F(!1), h = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null);
  async function f() {
    Q(n, !0), Q(c, null);
    try {
      const k = await fetch("/api/v1/prompts");
      if (!k.ok) throw new Error(`${k.status}`);
      const T = await k.json();
      Q(s, T.map((D) => ({ name: D.name, activeVersion: D, versions: [] })));
    } catch (k) {
      Q(c, k.message);
    } finally {
      Q(n, !1);
    }
  }
  async function u(k) {
    const T = await fetch(`/api/v1/prompts/${encodeURIComponent(k)}/versions`);
    if (!T.ok) throw new Error(`${T.status}`);
    const D = await T.json();
    Q(s, d(s).map(($) => $.name === k ? { ...$, versions: D } : $));
  }
  async function p(k, T) {
    try {
      const D = await fetch(`/api/v1/prompts/${encodeURIComponent(k)}/versions/${T}/promote`, { method: "POST" });
      if (!D.ok) throw new Error(`${D.status}`);
      await f(), d(r).has(k) && await u(k);
    } catch (D) {
      Q(c, D.message);
    }
  }
  async function O() {
    if (!(!d(o) || !d(l)))
      try {
        const k = await fetch("/api/v1/prompts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: d(o),
            content: d(l)
          })
        });
        if (!k.ok) throw new Error(`${k.status}`);
        const T = d(o);
        Q(a, !1), Q(o, ""), Q(l, ""), await f(), d(r).has(T) && await u(T);
      } catch (k) {
        Q(c, k.message);
      }
  }
  async function g(k) {
    if (d(r).has(k)) {
      d(r).delete(k), Q(r, new Set(d(r)));
      return;
    }
    d(r).add(k), Q(r, new Set(d(r)));
    try {
      await u(k);
    } catch (T) {
      Q(c, T.message);
    }
  }
  function m(k, T, D) {
    Q(h, { name: k, v1: T, v2: D });
  }
  lt(() => (d(t), d(s)), () => {
    d(t) && d(s).length === 0 && f();
  }), Ii(), Et();
  var v = kP(), S = Je(v), x = w(S), P = y(w(x), 2), E = w(P), R = y(x, 2);
  {
    var C = (k) => {
      var T = wP(), D = w(T);
      {
        var $ = (G) => {
          var q = fP();
          A(G, q);
        }, Z = (G) => {
          var q = uP(), ie = w(q);
          U(() => V(ie, d(c))), A(G, q);
        }, N = (G) => {
          var q = dP();
          A(G, q);
        }, oe = (G) => {
          var q = yP();
          nt(q, 5, () => d(s), it, (ie, ae) => {
            var fe = bP(), ye = w(fe), ue = w(ye);
            let de;
            var ve = y(ue, 2), ee = w(ve), he = y(ve, 2), be = w(he), we = y(he, 2), $e = w(we), We = y(ye, 2);
            {
              var st = (ct) => {
                var Ne = vP();
                nt(Ne, 5, () => (d(ae), b(() => d(ae).versions ?? [])), it, (Re, z) => {
                  var j = mP(), K = Je(j);
                  let le;
                  var xe = w(K), qe = w(xe), Ze = y(xe, 2);
                  {
                    var H = (Se) => {
                      var Xe = pP();
                      A(Se, Xe);
                    }, ce = (Se) => {
                      var Xe = OP();
                      te("click", Xe, () => p(d(ae).name, d(z).id)), A(Se, Xe);
                    };
                    J(Ze, (Se) => {
                      d(z), b(() => d(z).isActive) ? Se(H) : Se(ce, -1);
                    });
                  }
                  var me = y(Ze, 2);
                  {
                    var Me = (Se) => {
                      var Xe = gP();
                      te("click", Xe, () => m(d(ae).name, d(ae).activeVersion, d(z))), A(Se, Xe);
                    };
                    J(me, (Se) => {
                      d(ae), d(z), b(() => d(ae).activeVersion && !d(z).isActive) && Se(Me);
                    });
                  }
                  var Ue = y(me, 2), _e = w(Ue), Ee = y(K, 2), pt = w(Ee);
                  U(
                    (Se, Xe) => {
                      le = Ft(K, 1, "version-row svelte-ojvpsl", null, le, { active: d(z).isActive }), V(qe, `v${d(z), b(() => d(z).versionNumber) ?? ""}`), V(_e, Se), V(pt, `${Xe ?? ""}${d(z), b(() => d(z).content.length > 120 ? "…" : "") ?? ""}`);
                    },
                    [
                      () => (d(z), b(() => new Date(d(z).createdAt).toLocaleDateString())),
                      () => (d(z), b(() => d(z).content.slice(0, 120)))
                    ]
                  ), A(Re, j);
                }), A(ct, Ne);
              }, Le = /* @__PURE__ */ ys(() => (d(r), d(ae), b(() => d(r).has(d(ae).name))));
              J(We, (ct) => {
                d(Le) && ct(st);
              });
            }
            U(
              (ct) => {
                de = Ft(ue, 1, "active-dot svelte-ojvpsl", null, de, { active: d(ae).activeVersion !== null }), V(ee, (d(ae), b(() => d(ae).name))), V(be, `v${d(ae), b(() => {
                  var Ne;
                  return ((Ne = d(ae).activeVersion) == null ? void 0 : Ne.versionNumber) ?? "—";
                }) ?? ""}`), V($e, ct);
              },
              [
                () => (d(r), d(ae), b(() => d(r).has(d(ae).name) ? "▼" : "▶"))
              ]
            ), te("click", ye, () => g(d(ae).name)), A(ie, fe);
          }), A(G, q);
        };
        J(D, (G) => {
          d(n) ? G($) : d(c) ? G(Z, 1) : (d(s), b(() => d(s).length === 0) ? G(N, 2) : G(oe, -1));
        });
      }
      var se = y(D, 2);
      te("click", se, () => Q(a, !0)), A(k, T);
    };
    J(R, (k) => {
      d(t) && k(C);
    });
  }
  var Y = y(S, 2);
  {
    var L = (k) => {
      var T = xP(), D = w(T), $ = y(w(D), 2), Z = y(w($)), N = y($, 2), oe = y(w(N));
      He(oe, "rows", 6);
      var se = y(N, 2), G = w(se), q = y(G, 2);
      Gt(Z, () => d(o), (ie) => Q(o, ie)), Gt(oe, () => d(l), (ie) => Q(l, ie)), te("click", G, () => Q(a, !1)), te("click", q, O), te("click", T, Ch(() => Q(a, !1))), A(k, T);
    };
    J(Y, (k) => {
      d(a) && k(L);
    });
  }
  var X = y(Y, 2);
  {
    var M = (k) => {
      var T = SP(), D = w(T), $ = w(D), Z = w($), N = y($, 2), oe = w(N), se = w(oe), G = w(se), q = y(se, 2), ie = w(q), ae = y(oe, 2), fe = w(ae), ye = w(fe), ue = y(fe, 2), de = w(ue), ve = y(N, 2), ee = w(ve), he = y(ee, 2), be = w(he);
      U(() => {
        V(Z, `Diff: ${d(h), b(() => d(h).name) ?? ""}`), V(G, `Active (v${d(h), b(() => d(h).v1.versionNumber) ?? ""})`), V(ie, (d(h), b(() => d(h).v1.content))), V(ye, `v${d(h), b(() => d(h).v2.versionNumber) ?? ""}`), V(de, (d(h), b(() => d(h).v2.content))), V(be, `Promote v${d(h), b(() => d(h).v2.versionNumber) ?? ""}`);
      }), te("click", ee, () => Q(h, null)), te("click", he, () => {
        p(d(h).name, d(h).v2.id), Q(h, null);
      }), te("click", T, Ch(() => Q(h, null))), A(k, T);
    };
    J(X, (k) => {
      d(h) && k(M);
    });
  }
  U(() => V(E, d(t) ? "▼" : "▶")), te("click", x, () => {
    Q(t, !d(t));
  }), A(i, v), _t();
}
var $P = /* @__PURE__ */ I('<span class="badge svelte-1bw2oss"> </span>'), _P = /* @__PURE__ */ I("<div> <!></div>"), PP = /* @__PURE__ */ I('<div class="loading svelte-1bw2oss">Loading…</div>'), TP = /* @__PURE__ */ I('<div class="error svelte-1bw2oss"> </div>'), CP = /* @__PURE__ */ I('<div class="empty svelte-1bw2oss">No test cases yet.</div>'), ZP = /* @__PURE__ */ I('<span class="running-indicator svelte-1bw2oss">⟳</span>'), EP = /* @__PURE__ */ I('<div class="case-row svelte-1bw2oss"><span></span> <span class="case-name svelte-1bw2oss"> </span> <span class="assertion-count svelte-1bw2oss"> </span> <!> <button class="delete-btn svelte-1bw2oss">✕</button></div>'), AP = /* @__PURE__ */ I('<div class="cases-list svelte-1bw2oss"></div>'), RP = /* @__PURE__ */ I('<div class="panel-body svelte-1bw2oss"><!> <!> <div class="panel-actions svelte-1bw2oss"><button class="new-btn svelte-1bw2oss">+ New Test</button> <button class="run-btn svelte-1bw2oss"> </button></div></div>'), MP = /* @__PURE__ */ I('<input placeholder="Expected value (JSON or string)" class="svelte-1bw2oss"/>'), XP = /* @__PURE__ */ I('<label class="inline svelte-1bw2oss">Threshold <input type="number" min="0" max="1" step="0.05" style="width: 70px;" class="svelte-1bw2oss"/></label>'), jP = /* @__PURE__ */ I('<div class="modal-overlay svelte-1bw2oss"><div class="modal svelte-1bw2oss"><h3 class="svelte-1bw2oss">New Test Case</h3> <label class="svelte-1bw2oss">Name <input placeholder="Test case name" class="svelte-1bw2oss"/></label> <label class="svelte-1bw2oss">Input JSON <textarea class="mono svelte-1bw2oss"></textarea></label> <div class="assertion-builder svelte-1bw2oss"><div class="assertion-header svelte-1bw2oss">Assertion</div> <div class="assertion-row svelte-1bw2oss"><select class="svelte-1bw2oss"><option>Exact Match</option><option>Schema</option><option>Score Threshold</option></select> <input placeholder="Output key, e.g. output.text" class="svelte-1bw2oss"/></div> <!></div> <div class="modal-actions svelte-1bw2oss"><button class="btn-secondary svelte-1bw2oss">Cancel</button> <button class="btn-primary svelte-1bw2oss">Create</button></div></div></div>'), LP = /* @__PURE__ */ I('<div class="test-panel svelte-1bw2oss"><button class="panel-header svelte-1bw2oss"><span>Test Cases</span> <!> <span class="toggle svelte-1bw2oss"> </span></button> <!></div> <!>', 1);
function IP(i, e) {
  $t(e, !1);
  let t = et(e, "agentId", 8), n = /* @__PURE__ */ F(!1), s = /* @__PURE__ */ F(!1), r = /* @__PURE__ */ F(!1), o = /* @__PURE__ */ F([]), l = /* @__PURE__ */ F(null), a = /* @__PURE__ */ F(!1), h = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F({
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
      Q(s, !0), Q(h, null);
      try {
        const M = await fetch(`/api/v1/agents/${t()}/test-cases`);
        if (!M.ok) throw new Error(`${M.status}`);
        const k = await M.json();
        Q(o, k.testCases ?? []);
      } catch (M) {
        Q(h, M.message);
      } finally {
        Q(s, !1);
      }
    }
  }
  async function u() {
    Q(r, !0), Q(l, null), Q(h, null);
    try {
      const M = await fetch(`/api/v1/agents/${t()}/test-cases/run`, { method: "POST" });
      if (!M.ok) throw new Error(`${M.status}`);
      Q(l, await M.json()), await f();
    } catch (M) {
      Q(h, M.message);
    } finally {
      Q(r, !1);
    }
  }
  async function p() {
    try {
      const M = {
        type: d(c).assertionType,
        key: d(c).assertionKey
      };
      if (d(c).assertionType === "exact_match")
        try {
          M.expected = JSON.parse(d(c).assertionExpected);
        } catch {
          M.expected = d(c).assertionExpected;
        }
      else d(c).assertionType === "evaluate_score" && (M.threshold = d(c).assertionThreshold);
      const k = await fetch(`/api/v1/agents/${t()}/test-cases`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: d(c).name,
          inputJson: d(c).inputJson,
          assertionsJson: JSON.stringify([M])
        })
      });
      if (!k.ok) throw new Error(`${k.status}`);
      Q(a, !1), Q(c, {
        name: "",
        inputJson: `{
  
}`,
        assertionType: "exact_match",
        assertionKey: "",
        assertionExpected: "",
        assertionThreshold: 0.8
      }), await f();
    } catch (M) {
      Q(h, M.message);
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
  lt(() => (d(n), d(o), d(s)), () => {
    d(n) && d(o).length === 0 && !d(s) && f();
  }), Ii(), Et();
  var m = LP(), v = Je(m), S = w(v), x = y(w(S), 2);
  {
    var P = (M) => {
      var k = $P(), T = w(k);
      U(() => V(T, (d(o), b(() => d(o).length)))), A(M, k);
    };
    J(x, (M) => {
      d(o), b(() => d(o).length > 0) && M(P);
    });
  }
  var E = y(x, 2), R = w(E), C = y(S, 2);
  {
    var Y = (M) => {
      var k = RP(), T = w(k);
      {
        var D = (fe) => {
          var ye = _P();
          let ue;
          var de = w(ye), ve = y(de);
          {
            var ee = (he) => {
              var be = _h();
              U(() => V(be, `— ${d(l), b(() => d(l).failed) ?? ""} failed`)), A(he, be);
            };
            J(ve, (he) => {
              d(l), b(() => d(l).failed > 0) && he(ee);
            });
          }
          U(
            (he) => {
              ue = Ft(ye, 1, "suite-summary svelte-1bw2oss", null, ue, {
                passed: d(l).failed === 0,
                failed: d(l).failed > 0
              }), V(de, `Suite: ${he ?? ""} passed `);
            },
            [
              () => (d(l), b(() => g(d(l))))
            ]
          ), A(fe, ye);
        };
        J(T, (fe) => {
          d(l) && fe(D);
        });
      }
      var $ = y(T, 2);
      {
        var Z = (fe) => {
          var ye = PP();
          A(fe, ye);
        }, N = (fe) => {
          var ye = TP(), ue = w(ye);
          U(() => V(ue, d(h))), A(fe, ye);
        }, oe = (fe) => {
          var ye = CP();
          A(fe, ye);
        }, se = (fe) => {
          var ye = AP();
          nt(ye, 5, () => d(o), it, (ue, de) => {
            const ve = /* @__PURE__ */ St(() => (d(l), d(de), b(() => {
              var Re, z;
              return (z = (Re = d(l)) == null ? void 0 : Re.results) == null ? void 0 : z.find((j) => j.id === d(de).id);
            })));
            var ee = EP(), he = w(ee);
            let be;
            var we = y(he, 2), $e = w(we), We = y(we, 2), st = w(We), Le = y(We, 2);
            {
              var ct = (Re) => {
                var z = ZP();
                A(Re, z);
              };
              J(Le, (Re) => {
                d(r) && Re(ct);
              });
            }
            var Ne = y(Le, 2);
            U(() => {
              var Re, z, j, K;
              be = Ft(he, 1, "status-dot svelte-1bw2oss", null, be, {
                pass: ((Re = d(ve)) == null ? void 0 : Re.passed) === !0 || ((z = d(de).lastResult) == null ? void 0 : z.passed) === !0,
                fail: ((j = d(ve)) == null ? void 0 : j.passed) === !1 || ((K = d(de).lastResult) == null ? void 0 : K.passed) === !1
              }), V($e, (d(de), b(() => d(de).name))), V(st, `${d(de), b(() => (d(de).assertions ?? []).length) ?? ""} assertions`);
            }), te("click", Ne, () => O(d(de).id)), A(ue, ee);
          }), A(fe, ye);
        };
        J($, (fe) => {
          d(s) ? fe(Z) : d(h) ? fe(N, 1) : (d(o), b(() => d(o).length === 0) ? fe(oe, 2) : fe(se, -1));
        });
      }
      var G = y($, 2), q = w(G), ie = y(q, 2), ae = w(ie);
      U(() => {
        ie.disabled = (d(r), d(o), b(() => d(r) || d(o).length === 0)), V(ae, d(r) ? "Running…" : "Run Suite");
      }), te("click", q, () => Q(a, !0)), te("click", ie, u), A(M, k);
    };
    J(C, (M) => {
      d(n) && M(Y);
    });
  }
  var L = y(v, 2);
  {
    var X = (M) => {
      var k = jP(), T = w(k), D = y(w(T), 2), $ = y(w(D)), Z = y(D, 2), N = y(w(Z));
      He(N, "rows", 5);
      var oe = y(Z, 2), se = y(w(oe), 2), G = w(se), q = w(G);
      q.value = q.__value = "exact_match";
      var ie = y(q);
      ie.value = ie.__value = "schema";
      var ae = y(ie);
      ae.value = ae.__value = "evaluate_score";
      var fe = y(G, 2), ye = y(se, 2);
      {
        var ue = (be) => {
          var we = MP();
          Gt(we, () => d(c).assertionExpected, ($e) => Cn(c, d(c).assertionExpected = $e)), A(be, we);
        }, de = (be) => {
          var we = XP(), $e = y(w(we));
          Gt($e, () => d(c).assertionThreshold, (We) => Cn(c, d(c).assertionThreshold = We)), A(be, we);
        };
        J(ye, (be) => {
          d(c), b(() => d(c).assertionType === "exact_match") ? be(ue) : (d(c), b(() => d(c).assertionType === "evaluate_score") && be(de, 1));
        });
      }
      var ve = y(oe, 2), ee = w(ve), he = y(ee, 2);
      U(() => he.disabled = (d(c), b(() => !d(c).name))), Gt($, () => d(c).name, (be) => Cn(c, d(c).name = be)), Gt(N, () => d(c).inputJson, (be) => Cn(c, d(c).inputJson = be)), Th(G, () => d(c).assertionType, (be) => Cn(c, d(c).assertionType = be)), Gt(fe, () => d(c).assertionKey, (be) => Cn(c, d(c).assertionKey = be)), te("click", ee, () => Q(a, !1)), te("click", he, p), te("click", k, Ch(() => Q(a, !1))), A(M, k);
    };
    J(L, (M) => {
      d(a) && M(X);
    });
  }
  U(() => V(R, d(n) ? "▼" : "▶")), te("click", S, () => {
    Q(n, !d(n));
  }), A(i, m), _t();
}
var DP = /* @__PURE__ */ I('<div class="studio svelte-13r820j"><aside><!></aside> <main class="canvas-area svelte-13r820j"><!> <!></main> <aside class="panel svelte-13r820j"><!> <!> <!> <!> <!> <!> <!> <!></aside></div>');
function zP(i, e) {
  $t(e, !1);
  const t = () => at(ht, "$graph", s), n = () => at(Wn, "$selectedNode", s), [s, r] = $n();
  let o = et(e, "agentId", 8), l = /* @__PURE__ */ F(!1), a = /* @__PURE__ */ F(""), h = /* @__PURE__ */ F(null), c = /* @__PURE__ */ F(null);
  Ps(async () => {
    if (o()) {
      try {
        const [N, oe, se] = await Promise.all([
          fetch(`/api/agents/${o()}`),
          fetch(`/api/agents/${o()}/versions`),
          fetch(`/api/agents/${o()}/config`)
        ]);
        let G = null;
        if (N.ok && (G = await N.json(), fl.set(G), Q(l, (G == null ? void 0 : G.authoringMode) === "code-defined"), Q(a, (G == null ? void 0 : G.handle) ?? ""), d(l) && Q(h, (G == null ? void 0 : G.updatedAt) ?? null)), G != null && G.draftGraphJson)
          ht.set(JSON.parse(G.draftGraphJson));
        else if (oe.ok) {
          const q = await oe.json();
          if (q.length > 0) {
            const ie = q[q.length - 1];
            ht.set(JSON.parse(ie.graphJson ?? "{}"));
          }
        }
        if (se.ok) {
          const ie = (await se.json()).triggerConfig ?? {};
          As.set({
            triggerType: ie.type ?? "rest",
            description: "",
            cronExpression: ie.expression ?? "",
            webhookUrl: ie.webhookUrl ?? ""
          });
        }
      } catch {
      }
      window.addEventListener("caal:canvas-highlight", f), window.addEventListener("caal:canvas-focus", u), window.addEventListener("caal:apply-proposal", p);
    }
  });
  function f(N) {
    const oe = N.detail;
    window.dispatchEvent(new CustomEvent("canvas:highlight", { detail: oe }));
  }
  function u(N) {
    const oe = N.detail;
    window.dispatchEvent(new CustomEvent("canvas:focus", { detail: oe }));
  }
  function p(N) {
    const oe = N.detail;
    W1(structuredClone(t()), oe.description, () => {
      ht.update((se) => {
        const G = structuredClone(se);
        for (const q of oe.patches)
          if (q.op === "add_node" && q.data) {
            const ie = q.data;
            G.nodes[ie.id] = ie;
          } else if (q.op === "update_node" && q.target && q.data) {
            const ie = G.nodes[q.target];
            ie && (G.nodes[q.target] = { ...ie, ...q.data });
          } else if (q.op === "delete_node" && q.target)
            delete G.nodes[q.target];
          else if (q.op === "add_edge" && q.data)
            G.edges = [...G.edges ?? [], q.data];
          else if (q.op === "delete_edge" && q.data) {
            const { from: ie, to: ae } = q.data;
            G.edges = (G.edges ?? []).filter((fe) => {
              const ye = fe;
              return !(ye.from === ie && ye.to === ae);
            });
          } else q.op === "add_tool_edge" && q.data && (G.toolEdges = [...G.toolEdges ?? [], q.data]);
        return G;
      });
    });
  }
  Et();
  var O = DP(), g = w(O);
  let m;
  var v = w(g);
  cy(v, {
    get readonly() {
      return d(l);
    }
  });
  var S = y(g, 2), x = w(S);
  {
    var P = (N) => {
      tP(N, {
        get handle() {
          return d(a);
        },
        get lastSyncAt() {
          return d(h);
        }
      });
    };
    J(x, (N) => {
      d(l) && N(P);
    });
  }
  var E = y(x, 2);
  sy(E, {
    get agentId() {
      return o();
    },
    get readonly() {
      return d(l);
    }
  });
  var R = y(S, 2), C = w(R);
  {
    var Y = (N) => {
      R$(N, {
        get node() {
          return n();
        },
        get readonly() {
          return d(l);
        }
      });
    }, L = (N) => {
      K$(N, {
        get agentId() {
          return o();
        },
        get readonly() {
          return d(l);
        }
      });
    };
    J(C, (N) => {
      n() ? N(Y) : N(L, -1);
    });
  }
  var X = y(C, 2);
  b_(X, {});
  var M = y(X, 2);
  C_(M, {});
  var k = y(M, 2);
  u_(k, {
    get agentId() {
      return o();
    },
    $$events: { sessionId: (N) => Q(c, N.detail) }
  });
  var T = y(k, 2);
  cP(T, {
    get agentId() {
      return o();
    },
    get sessionId() {
      return d(c);
    }
  });
  var D = y(T, 2);
  QP(D, {
    get agentId() {
      return o();
    }
  });
  var $ = y(D, 2);
  IP($, {
    get agentId() {
      return o();
    }
  });
  var Z = y($, 2);
  K_(Z, {
    get agentId() {
      return o();
    },
    get readonly() {
      return d(l);
    }
  }), U(() => m = Ft(g, 1, "palette svelte-13r820j", null, m, { readonly: d(l) })), A(i, O), _t(), r();
}
const hh = document.getElementById("canvas-mount");
if (hh) {
  const i = hh.getAttribute("data-agent-id") ?? "";
  Fv(zP, { target: hh, props: { agentId: i } });
}
