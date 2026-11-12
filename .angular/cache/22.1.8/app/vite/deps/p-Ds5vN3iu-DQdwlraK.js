import { t as n } from "./p-D0YpjgON-DlbOmPwz.js";
import { S as r, y as w } from "./p-CUQjkOdi-BXBlPwU8.js";
//#region node_modules/@ionic/core/components/p-Ds5vN3iu.js
/*!
* (C) Ionic http://ionicframework.com - MIT License
*/
var s = (s, e, n$1, a, c) => {
	const i = s.ownerDocument.defaultView;
	let p = r(s);
	const m = (t) => p ? -t.deltaX : t.deltaX;
	return n({
		el: s,
		gestureName: "goback-swipe",
		gesturePriority: 101,
		threshold: 10,
		canStart: (t) => (p = r(s), ((t) => {
			const { startX: o } = t;
			return p ? o >= i.innerWidth - 50 : o <= 50;
		})(t) && e()),
		onStart: n$1,
		onMove: (t) => {
			a(m(t) / i.innerWidth);
		},
		onEnd: (o) => {
			const r = m(o), s = i.innerWidth, e = r / s, n = ((t) => p ? -t.velocityX : t.velocityX)(o), a = n >= 0 && (n > .2 || r > s / 2), j = (a ? 1 - e : e) * s;
			let f = 0;
			if (j > 5) {
				const t = j / Math.abs(n);
				f = Math.min(t, 540);
			}
			c(a, e <= 0 ? .01 : w(0, e, .9999), f);
		}
	});
};
//#endregion
export { s as createSwipeBackGesture };
