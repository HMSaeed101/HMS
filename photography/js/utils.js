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

/**
 * Adds a 3D tilt effect to elements
 * @param {string} selector 
 */
export function initTilt(selector) {
    const items = document.querySelectorAll(selector);
    
    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });
}
