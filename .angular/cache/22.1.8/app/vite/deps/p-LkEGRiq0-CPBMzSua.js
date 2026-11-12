import { _ as p$1, d as d$1, f as e, l as Y, p as h$1 } from "./p-Ct2aBEue-BePt2maM.js";
import { t as d$2 } from "./p-ZjP4CjeZ-BnW-oeAv.js";
import { a as f$1 } from "./p-CUQjkOdi-BXBlPwU8.js";
//#region node_modules/@ionic/core/components/p-ChsJlFCQ.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var t$1;
var i = (e, o, i) => {
	const n = o.startsWith("animation") ? (r = e, void 0 === t$1 && (t$1 = void 0 === r.style.animationName && void 0 !== r.style.webkitAnimationName ? "-webkit-" : ""), t$1) : "";
	var r;
	e.style.setProperty(n + o, i);
};
var n = (e = [], o) => {
	if (void 0 !== o) {
		const t = Array.isArray(o) ? o : [o];
		return [...e, ...t];
	}
	return e;
};
var r$1 = (t) => {
	let r, a, s, d, f, l, c, v, m, u, p, y = [], g = [], A = [], b = !1, C = {}, E = [], h = [], S = {}, k = 0, R = !1, j = !1, w = !0, T = !1, D = !0, F = !1;
	const W = t, I = [], K = [], M = [], P = [], Z = [], x = [], B = [], q = [], z = [], G = [], H = [], J = "function" == typeof AnimationEffect || void 0 !== d$2 && "function" == typeof d$2.AnimationEffect, L = "function" == typeof Element && "function" == typeof Element.prototype.animate && J, N = () => H, O = (e, o) => {
		const t = o.findIndex(((o) => o.c === e));
		t > -1 && o.splice(t, 1);
	}, Q = (e, o) => ((o?.oneTimeCallback ? K : I).push({
		c: e,
		o
	}), p), U = () => {
		L && (H.forEach(((e) => {
			e.cancel();
		})), H.length = 0);
	}, V = () => {
		x.forEach(((e) => {
			e?.parentNode && e.parentNode.removeChild(e);
		})), x.length = 0;
	}, X = () => void 0 !== f ? f : c ? c.getFill() : "both", Y = () => void 0 !== v ? v : void 0 !== l ? l : c ? c.getDirection() : "normal", $ = () => R ? "linear" : void 0 !== s ? s : c ? c.getEasing() : "linear", _ = () => j ? 0 : void 0 !== m ? m : void 0 !== a ? a : c ? c.getDuration() : 0, ee = () => void 0 !== d ? d : c ? c.getIterations() : 1, oe = () => void 0 !== u ? u : void 0 !== r ? r : c ? c.getDelay() : 0, te = () => {
		0 !== k && (k--, 0 === k && ((() => {
			z.forEach(((e) => e())), G.forEach(((e) => e()));
			const e = w ? 1 : 0, o = E, t = h, n = S;
			P.forEach(((e) => {
				const r = e.classList;
				o.forEach(((e) => r.add(e))), t.forEach(((e) => r.remove(e)));
				for (const o in n) n.hasOwnProperty(o) && i(e, o, n[o]);
			})), m = void 0, v = void 0, u = void 0, I.forEach(((o) => o.c(e, p))), K.forEach(((o) => o.c(e, p))), K.length = 0, D = !0, w && (T = !0), w = !0;
		})(), c && c.animationFinish()));
	}, ie = () => {
		(() => {
			B.forEach(((e) => e())), q.forEach(((e) => e()));
			const e = g, o = A, t = C;
			P.forEach(((n) => {
				const r = n.classList;
				e.forEach(((e) => r.add(e))), o.forEach(((e) => r.remove(e)));
				for (const e in t) t.hasOwnProperty(e) && i(n, e, t[e]);
			}));
		})(), y.length > 0 && L && (P.forEach(((e) => {
			const o = e.animate(y, {
				id: W,
				delay: oe(),
				duration: _(),
				easing: $(),
				iterations: ee(),
				fill: X(),
				direction: Y()
			});
			o.pause(), H.push(o);
		})), H.length > 0 && (H[0].onfinish = () => {
			te();
		})), b = !0;
	}, ne = (e) => {
		e = Math.min(Math.max(e, 0), .9999), L && H.forEach(((o) => {
			o.currentTime = o.effect.getComputedTiming().delay + _() * e, o.pause();
		}));
	}, re = (e) => {
		H.forEach(((e) => {
			e.effect.updateTiming({
				delay: oe(),
				duration: _(),
				easing: $(),
				iterations: ee(),
				fill: X(),
				direction: Y()
			});
		})), void 0 !== e && ne(e);
	}, ae = (e = !1, o = !0, t) => (e && Z.forEach(((i) => {
		i.update(e, o, t);
	})), L && re(t), p), se = () => {
		b && (L ? H.forEach(((e) => {
			e.pause();
		})) : P.forEach(((e) => {
			i(e, "animation-play-state", "paused");
		})), F = !0);
	}, de = (e) => new Promise(((o) => {
		e?.sync && (j = !0, Q((() => j = !1), { oneTimeCallback: !0 })), b || ie(), T && (L && (ne(0), re()), T = !1), D && (k = Z.length + 1, D = !1);
		const t = () => {
			O(i, K), o();
		}, i = () => {
			O(t, M), o();
		};
		Q(i, { oneTimeCallback: !0 }), M.push({
			c: t,
			o: { oneTimeCallback: !0 }
		}), Z.forEach(((e) => {
			e.play();
		})), L ? (H.forEach(((e) => {
			e.play();
		})), 0 !== y.length && 0 !== P.length || te()) : te(), F = !1;
	})), fe = (e, o) => {
		const t = y[0];
		return void 0 === t || void 0 !== t.offset && 0 !== t.offset ? y = [{
			offset: 0,
			[e]: o
		}, ...y] : t[e] = o, p;
	};
	return p = {
		parentAnimation: c,
		elements: P,
		childAnimations: Z,
		id: W,
		animationFinish: te,
		from: fe,
		to: (e, o) => {
			const t = y[y.length - 1];
			return void 0 === t || void 0 !== t.offset && 1 !== t.offset ? y = [...y, {
				offset: 1,
				[e]: o
			}] : t[e] = o, p;
		},
		fromTo: (e, o, t) => fe(e, o).to(e, t),
		parent: (e) => (c = e, p),
		play: de,
		pause: () => (Z.forEach(((e) => {
			e.pause();
		})), se(), p),
		stop: () => {
			Z.forEach(((e) => {
				e.stop();
			})), b && (U(), b = !1), R = !1, j = !1, D = !0, v = void 0, m = void 0, u = void 0, k = 0, T = !1, w = !0, F = !1, M.forEach(((e) => e.c(0, p))), M.length = 0;
		},
		destroy: (e) => (Z.forEach(((o) => {
			o.destroy(e);
		})), ((e) => {
			U(), e && V();
		})(e), P.length = 0, Z.length = 0, y.length = 0, I.length = 0, K.length = 0, b = !1, D = !0, p),
		keyframes: (e) => {
			const o = y !== e;
			return y = e, o && ((e) => {
				L && N().forEach(((o) => {
					const t = o.effect;
					if (t.setKeyframes) t.setKeyframes(e);
					else o.effect = new KeyframeEffect(t.target, e, t.getTiming());
				}));
			})(y), p;
		},
		addAnimation: (e) => {
			if (null != e) if (Array.isArray(e)) for (const o of e) o.parent(p), Z.push(o);
			else e.parent(p), Z.push(e);
			return p;
		},
		addElement: (o) => {
			if (null != o) if (1 === o.nodeType) P.push(o);
			else if (o.length >= 0) for (let e = 0; e < o.length; e++) P.push(o[e]);
			else h$1("createAnimation - Invalid addElement value.");
			return p;
		},
		update: ae,
		fill: (e) => (f = e, ae(!0), p),
		direction: (e) => (l = e, ae(!0), p),
		iterations: (e) => (d = e, ae(!0), p),
		duration: (e) => (L || 0 !== e || (e = 1), a = e, ae(!0), p),
		easing: (e) => (s = e, ae(!0), p),
		delay: (e) => (r = e, ae(!0), p),
		getWebAnimations: N,
		getKeyframes: () => y,
		getFill: X,
		getDirection: Y,
		getDelay: oe,
		getIterations: ee,
		getEasing: $,
		getDuration: _,
		afterAddRead: (e) => (z.push(e), p),
		afterAddWrite: (e) => (G.push(e), p),
		afterClearStyles: (e = []) => {
			for (const o of e) S[o] = "";
			return p;
		},
		afterStyles: (e = {}) => (S = e, p),
		afterRemoveClass: (e) => (h = n(h, e), p),
		afterAddClass: (e) => (E = n(E, e), p),
		beforeAddRead: (e) => (B.push(e), p),
		beforeAddWrite: (e) => (q.push(e), p),
		beforeClearStyles: (e = []) => {
			for (const o of e) C[o] = "";
			return p;
		},
		beforeStyles: (e = {}) => (C = e, p),
		beforeRemoveClass: (e) => (A = n(A, e), p),
		beforeAddClass: (e) => (g = n(g, e), p),
		onFinish: Q,
		isRunning: () => 0 !== k && !F,
		progressStart: (e = !1, o) => (Z.forEach(((t) => {
			t.progressStart(e, o);
		})), se(), R = e, b || ie(), ae(!1, !0, o), p),
		progressStep: (e) => (Z.forEach(((o) => {
			o.progressStep(e);
		})), ne(e), p),
		progressEnd: (e, o, t) => (R = !1, Z.forEach(((i) => {
			i.progressEnd(e, o, t);
		})), void 0 !== t && (m = t), T = !1, w = !0, 0 === e ? (v = "reverse" === Y() ? "normal" : "reverse", "reverse" === v && (w = !1), L ? (ae(), ne(1 - o)) : (u = (1 - o) * _() * -1, ae(!1, !1))) : 1 === e && (L ? (ae(), ne(o)) : (u = o * _() * -1, ae(!1, !1))), void 0 === e || c || de(), p)
	};
};
//#endregion
//#region node_modules/@ionic/core/components/p-LkEGRiq0.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var t = "ionViewWillEnter";
var r = "ionViewDidEnter";
var s = "ionViewWillLeave";
var c = "ionViewDidLeave";
var l = "ionViewWillUnload";
var u = (n) => {
	n.tabIndex = -1, n.focus();
};
var d = (n) => null !== n.offsetParent;
var p = "ion-last-focus";
var f = (e$1) => {
	if (e.get("focusManagerPriority", !1)) {
		const n = document.activeElement;
		null !== n && e$1?.contains(n) && n.setAttribute(p, "true");
	}
};
var w = (i) => {
	const a = e.get("focusManagerPriority", !1);
	if (Array.isArray(a) && !i.contains(document.activeElement)) {
		const n = i.querySelector(`[${p}]`);
		if (n && d(n)) return void u(n);
		for (const n of a) switch (n) {
			case "content":
				const a = i.querySelector("main, [role=\"main\"]");
				if (a && d(a)) return void u(a);
				break;
			case "heading":
				const o = i.querySelector("h1, [role=\"heading\"][aria-level=\"1\"]");
				if (o && d(o)) return void u(o);
				break;
			case "banner":
				const t = i.querySelector("header, [role=\"banner\"]");
				if (t && d(t)) return void u(t);
				break;
			default: d$1(`Unrecognized focus manager priority value ${n}`);
		}
		u(i);
	}
};
var v = (n) => new Promise(((e, a) => {
	Y((() => {
		const i = B(n);
		m(n, i), b(n).then(((i) => {
			i.animation && i.animation.destroy(), g(n), e(i);
		}), ((e) => {
			g(n), a(e);
		})).finally((() => {
			z(i, !1);
		}));
	}));
}));
var m = (n, e) => {
	const i = n.enteringEl, a = n.leavingEl;
	f(a), x(i, a, n.direction), z(e, !0), n.showGoBack ? i.classList.add("can-go-back") : i.classList.remove("can-go-back"), M(i, !1), i.style.setProperty("pointer-events", "none"), a && (M(a, !1), a.style.setProperty("pointer-events", "none"));
};
var b = async (n) => {
	const e = await h(n);
	return e && p$1.isBrowser ? y(e, n) : P(n);
};
var g = (n) => {
	const e = n.enteringEl, i = n.leavingEl;
	e.classList.remove("ion-page-invisible"), e.style.removeProperty("pointer-events"), void 0 !== i && (i.classList.remove("ion-page-invisible"), i.style.removeProperty("pointer-events")), w(e);
};
var h = async (n) => {
	if (n.leavingEl && n.animated && 0 !== n.duration) return n.animationBuilder ? n.animationBuilder : "ios" === n.mode ? (await import("./@ionic_angular.js").then((n) => n.n)).iosTransitionAnimation : (await import("./@ionic_angular.js").then((n) => n.t)).mdTransitionAnimation;
};
var y = async (n, e) => {
	await k(e, !0);
	const i = n(e.baseEl, e);
	V(e.enteringEl, e.leavingEl);
	const a = await j(i, e);
	return e.progressCallback && e.progressCallback(void 0), a && D(e.enteringEl, e.leavingEl), {
		hasCompleted: a,
		animation: i
	};
};
var P = async (e$2) => {
	const i = e$2.enteringEl, a = e$2.leavingEl;
	return await k(e$2, e.get("focusManagerPriority", !1)), V(i, a), D(i, a), { hasCompleted: !0 };
};
var k = async (n, e) => {
	(void 0 !== n.deepWait ? n.deepWait : e) && await Promise.all([L(n.enteringEl), L(n.leavingEl)]), await C(n.viewIsReady, n.enteringEl);
};
var C = async (n, e) => {
	n && await n(e);
};
var j = (n, e) => {
	const i = e.progressCallback, a = new Promise(((e) => {
		n.onFinish(((n) => e(1 === n)));
	}));
	return i ? (n.progressStart(!0), i(n)) : n.play(), a;
};
var V = (n, e) => {
	E(e, s), E(n, t);
};
var D = (n, e) => {
	E(n, r), E(e, c);
};
var E = (n, e) => {
	if (n) {
		const i = new CustomEvent(e, {
			bubbles: !1,
			cancelable: !1
		});
		n.dispatchEvent(i);
	}
};
var U = () => new Promise(((n) => f$1((() => f$1((() => n()))))));
var L = async (n) => {
	const e = n;
	if (e) {
		if (null != e.componentOnReady) {
			if (null != await e.componentOnReady()) return;
		} else if (null != e.__registerHost) {
			await new Promise(((n) => f$1(n)));
			return;
		}
		await Promise.all(Array.from(e.children).map(L));
	}
};
var M = (n, e) => {
	e ? (n.setAttribute("aria-hidden", "true"), n.classList.add("ion-page-hidden")) : (n.hidden = !1, n.removeAttribute("aria-hidden"), n.classList.remove("ion-page-hidden"));
};
var W = (n) => (n.style.setProperty("pointer-events", "none"), () => {
	setTimeout((() => n.style.removeProperty("pointer-events")));
});
var x = (n, e, i) => {
	void 0 !== n && (n.style.zIndex = "back" === i ? "99" : "101"), void 0 !== e && (e.style.zIndex = "100");
};
var z = (n, e) => {
	if (!n) return;
	const i = "header-transitioning";
	e ? n.classList.add(i) : n.classList.remove(i);
};
var A = (n) => {
	if (n.classList.contains("ion-page")) return n;
	return n.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs") || n;
};
var B = (n) => {
	if ("ios" !== n.mode) return null;
	const e = "back" === n.direction ? n.leavingEl : n.enteringEl;
	return e ? e.querySelector("ion-header") : null;
};
//#endregion
export { U as a, l as c, t as d, v as f, M as i, r as l, E as n, W as o, r$1 as p, L as r, c as s, A as t, s as u };
