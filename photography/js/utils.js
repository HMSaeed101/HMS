export function animateCount(el, target, duration = 900) {
	const start = performance.now();
	const update = (now) => {
		const p = Math.min((now - start) / duration, 1);
		el.textContent = Math.round(p * target);
		if (p < 1) requestAnimationFrame(update);
	};
	requestAnimationFrame(update);
}

export function countOf(cat, photos) {
	return cat === "all"
		? photos.length
		: photos.filter((p) => p.category === cat).length;
}

export function getVisibleItems(grid) {
	return Array.from(grid.querySelectorAll(".pg-item:not(.hidden)"));
}
