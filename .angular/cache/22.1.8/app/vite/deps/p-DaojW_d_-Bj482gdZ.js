import { n as o$1 } from "./p-ZjP4CjeZ-BnW-oeAv.js";
import { x as y } from "./p-CUQjkOdi-BXBlPwU8.js";
//#region node_modules/@ionic/core/components/p-DaojW_d_.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var i = (i) => {
	if (void 0 === o$1) return;
	let s, p, u, d = 0;
	const l = i.getBoolean("animated", !0) && i.getBoolean("rippleEffect", !0), v = /* @__PURE__ */ new WeakMap(), m = () => {
		u && clearTimeout(u), u = void 0, s && (b(!1), s = void 0);
	}, j = (t, i) => {
		if (t && t === s) return;
		u && clearTimeout(u), u = void 0;
		const { x: o, y: r } = y(i);
		if (s) {
			if (v.has(s)) throw new Error("internal error");
			s.classList.contains(a) || w(s, o, r), b(!0);
		}
		if (t) {
			const e = v.get(t);
			e && (clearTimeout(e), v.delete(t)), t.classList.remove(a);
			const i = () => {
				w(t, o, r), u = void 0;
			};
			n(t) ? i() : u = setTimeout(i, c);
		}
		s = t;
	}, w = (t, e, i) => {
		if (d = Date.now(), t.classList.add(a), !l) return;
		const o = r(t);
		null !== o && (T(), p = o.addRipple(e, i));
	}, T = () => {
		void 0 !== p && (p.then(((t) => t())), p = void 0);
	}, b = (t) => {
		T();
		const e = s;
		if (!e) return;
		const i = f - Date.now() + d;
		if (t && i > 0 && !n(e)) {
			const t = setTimeout((() => {
				e.classList.remove(a), v.delete(e);
			}), f);
			v.set(e, t);
		} else e.classList.remove(a);
	};
	o$1.addEventListener("ionGestureCaptured", m), o$1.addEventListener("pointerdown", ((t) => {
		s || 2 === t.button || j(o(t), t);
	}), !0), o$1.addEventListener("pointerup", ((t) => {
		j(void 0, t);
	}), !0), o$1.addEventListener("pointercancel", m, !0);
};
var o = (t) => {
	if (void 0 === t.composedPath) return t.target.closest(".ion-activatable");
	{
		const e = t.composedPath();
		for (let t = 0; t < e.length - 2; t++) {
			const i = e[t];
			if (!(i instanceof ShadowRoot) && i.classList.contains("ion-activatable")) return i;
		}
	}
};
var n = (t) => t.classList.contains("ion-activatable-instant");
var r = (t) => {
	if (t.shadowRoot) {
		const e = t.shadowRoot.querySelector("ion-ripple-effect");
		if (e) return e;
	}
	return t.querySelector("ion-ripple-effect");
};
var a = "ion-activated";
var c = 100;
var f = 150;
//#endregion
export { i as startTapClick };
