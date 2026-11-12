import { n as o, t as d } from "./p-ZjP4CjeZ-BnW-oeAv.js";
import { S as r, d as n, i as d$1, r as c } from "./p-CUQjkOdi-BXBlPwU8.js";
import { c as l$1, o as h$1, t as a } from "./p-D5_mEbGJ-BtIxYNIX.js";
import { n as t, t as e } from "./p-BMPN55of-Bt4HbXz4.js";
//#region node_modules/@ionic/core/components/p-BWbz71uB.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var l = /* @__PURE__ */ new WeakMap();
var f = (o, t, n, i = 0, a = !1) => {
	l.has(o) !== n && (n ? w(o, t, i, a) : p(o, t));
};
var w = (o, t, n, i = !1) => {
	const a = t.parentNode, e = t.cloneNode(!1);
	e.classList.add("cloned-input"), e.tabIndex = -1, i && (e.disabled = !0);
	const r$1 = r(o);
	e.style.insetInlineStart = r$1 ? a.offsetWidth - t.offsetLeft - t.offsetWidth + "px" : `${t.offsetLeft}px`, a.appendChild(e), l.set(o, e);
	const s = r$1 ? 9999 : -9999;
	o.style.pointerEvents = "none", t.style.transform = `translate3d(${s}px,${n}px,0) scale(0)`;
};
var p = (o, t) => {
	const n = l.get(o);
	n && (l.delete(o), n.remove()), o.style.pointerEvents = "", t.style.transform = "";
};
var m = "input, textarea, [no-blur], [contenteditable]";
var b = "$ionPaddingTimer";
var h = (o, t, n) => {
	const i = o[b];
	i && clearTimeout(i), t > 0 ? o.style.setProperty("--keyboard-offset", `${t}px`) : o[b] = setTimeout((() => {
		o.style.setProperty("--keyboard-offset", "0px"), n && n();
	}), 120);
};
var y = (o, t, n) => {
	o.addEventListener("focusout", (() => {
		t && h(t, 0, n);
	}), { once: !0 });
};
var S = 0;
var D = "data-ionic-skip-scroll-assist";
var M = (o) => {
	if (document.activeElement === o) return;
	const t = o.getAttribute("id"), n = o.closest(`label[for="${t}"]`), i = document.activeElement?.closest(`label[for="${t}"]`);
	null !== n && n === i || (o.setAttribute(D, "true"), o.focus());
};
var x = async (o, t, a$1, e, r, s, d = !1, c = 0, u = !0) => {
	if (!a$1 && !e) return;
	const l = ((o, t, n, i) => ((o, t, n, i) => {
		const a = o.top, e = o.bottom, r = t.top, s = r + 15, d = Math.min(t.bottom, i - n) - 50 - e, c = s - a, u = Math.round(d < 0 ? -d : c > 0 ? -c : 0), l = Math.min(u, a - r);
		return {
			scrollAmount: l,
			scrollDuration: Math.min(400, Math.max(150, Math.abs(l) / .3)),
			scrollPadding: n,
			inputSafeY: 4 - (a - s)
		};
	})((o.closest("ion-item,[ion-item]") ?? o).getBoundingClientRect(), t.getBoundingClientRect(), n, i))(o, a$1 || e, r, c);
	if (a$1 && Math.abs(l.scrollAmount) < 4) return M(t), void (s && null !== a$1 && (h(a$1, S), y(t, a$1, (() => S = 0))));
	if (f(o, t, !0, l.inputSafeY, d), M(t), s && a$1 && (S = l.scrollPadding, h(a$1, S)), "undefined" != typeof window) {
		let e;
		const r = async () => {
			void 0 !== e && clearTimeout(e), window.removeEventListener("ionKeyboardDidShow", d), window.removeEventListener("ionKeyboardDidShow", r), a$1 && await h$1(a$1, 0, l.scrollAmount, l.scrollDuration), f(o, t, !1, l.inputSafeY), document.activeElement === t && M(t), s && y(t, a$1, (() => S = 0));
		}, d = () => {
			window.removeEventListener("ionKeyboardDidShow", d), window.addEventListener("ionKeyboardDidShow", r);
		};
		if (a$1) {
			const o = await a(a$1);
			if (u && l.scrollAmount > o.scrollHeight - o.clientHeight - o.scrollTop) return "password" === t.type ? (l.scrollAmount += 50, window.addEventListener("ionKeyboardDidShow", d)) : window.addEventListener("ionKeyboardDidShow", r), void (e = setTimeout(r, 1e3));
		}
		r();
	}
};
var K = async (n$2, i) => {
	if (void 0 === o) return;
	const u = "ios" === i, l = "android" === i, w = n$2.getNumber("keyboardHeight", 290), p = n$2.getBoolean("scrollAssist", !0), b = n$2.getBoolean("hideCaretOnScroll", u), h = n$2.getBoolean("inputBlurring", !1), y = n$2.getBoolean("scrollPadding", !0), S = Array.from(o.querySelectorAll("ion-input, ion-textarea")), M = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), j = await e.getResizeMode(), k = async (t$2) => {
		await new Promise(((o) => n(t$2, o)));
		const n$1 = t$2.shadowRoot || t$2, i = n$1.querySelector("input") || n$1.querySelector("textarea"), c$1 = l$1(t$2), u = c$1 ? null : t$2.closest("ion-footer");
		if (i) {
			if (c$1 && b && !M.has(t$2)) {
				const o = ((o, t, n) => {
					if (!n || !t) return () => {};
					const i = (n) => {
						var i;
						(i = t) === i.getRootNode().activeElement && f(o, t, n);
					}, a = () => f(o, t, !1), s = () => i(!0), d = () => i(!1);
					return d$1(n, "ionScrollStart", s), d$1(n, "ionScrollEnd", d), t.addEventListener("blur", a), () => {
						c(n, "ionScrollStart", s), c(n, "ionScrollEnd", d), t.removeEventListener("blur", a);
					};
				})(t$2, i, c$1);
				M.set(t$2, o);
			}
			if ("date" !== i.type && "datetime-local" !== i.type && (c$1 || u) && p && !K.has(t$2)) {
				const n = ((t$1, n, i, a, e, r, s, c = !1) => {
					const u = r && (void 0 === s || s.mode === t.None);
					let l = !1;
					const f = void 0 !== d ? d.innerHeight : 0, w = (o) => {
						!1 !== l ? x(t$1, n, i, a, o.detail.keyboardHeight, u, c, f, !1) : l = !0;
					}, p = () => {
						l = !1, d?.removeEventListener("ionKeyboardDidShow", w), t$1.removeEventListener("focusout", p);
					}, m = async () => {
						n.hasAttribute(D) ? n.removeAttribute(D) : (x(t$1, n, i, a, e, u, c, f), d?.addEventListener("ionKeyboardDidShow", w), t$1.addEventListener("focusout", p));
					};
					return t$1.addEventListener("focusin", m), () => {
						t$1.removeEventListener("focusin", m), d?.removeEventListener("ionKeyboardDidShow", w), t$1.removeEventListener("focusout", p);
					};
				})(t$2, i, c$1, u, w, y, j, l);
				K.set(t$2, n);
			}
		}
	};
	h && (() => {
		let o = !0, t = !1;
		const n = document;
		d$1(n, "ionScrollStart", (() => {
			t = !0;
		})), n.addEventListener("focusin", (() => {
			o = !0;
		}), !0), n.addEventListener("touchend", ((i) => {
			if (t) return void (t = !1);
			const a = n.activeElement;
			if (!a) return;
			if (a.matches(m)) return;
			const e = i.target;
			e !== a && (e.matches(m) || e.closest(m) || (o = !1, setTimeout((() => {
				o || a.blur();
			}), 50)));
		}), !1);
	})();
	for (const o of S) k(o);
	o.addEventListener("ionInputDidLoad", ((o) => {
		k(o.detail);
	})), o.addEventListener("ionInputDidUnload", ((o) => {
		((o) => {
			if (b) {
				const t = M.get(o);
				t && t(), M.delete(o);
			}
			if (p) {
				const t = K.get(o);
				t && t(), K.delete(o);
			}
		})(o.detail);
	}));
};
//#endregion
export { K as startInputShims };
