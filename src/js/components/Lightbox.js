/* ── LIGHTBOX COMPONENT ────────────────────────────────────────── */

export function initLightbox() {
	const lightbox = document.getElementById("lightbox");
	const lightboxImg = document.getElementById("lightboxImg");
	const prevBtn = document.getElementById("lightboxPrev");
	const nextBtn = document.getElementById("lightboxNext");
	const counter = document.getElementById("lightboxCounter");
	const loader = document.getElementById("lightboxLoader");
	const lbTitle = document.getElementById("pgLbTitle");

	if (!lightbox || !lightboxImg) return null;

	let currentIndex = 0;
	let items = [];
	const TRANSITION_SPEED = 200; // Match this with CSS transition duration

	// Swipe detection variables
	let touchStartX = 0;
	let touchEndX = 0;
	const SWIPE_THRESHOLD = 50;

	// Centralized logic to update the title from various data sources
	function updateTitle(item) {
		if (!item) {
			console.warn("Lightbox: No item provided to updateTitle");
			return;
		}

		const title =
			item.caption || item.dataset?.caption || item.alt || "Untitled";
		if (lbTitle) lbTitle.textContent = title;
	}

	// Helper to hide loader once image is ready
	lightboxImg.onload = () => {
		if (loader) loader.style.display = "none";
		lightboxImg.classList.remove("switching");
	};

	function openLightbox(src, alt, index, allItems) {
		items = allItems || [];
		currentIndex = index ?? 0;

		// Show loader before setting src
		if (loader) loader.style.display = "block";

		// Reset image state
		lightboxImg.style.opacity = "0";

		// Use the centralized handler for everything
		updateTitle(items[currentIndex] || { src, alt });
		lightboxImg.src = src;

		lightbox.classList.add("open");
		setTimeout(() => {
			lightboxImg.style.opacity = "1";
		}, 50);

		document.body.style.overflow = "hidden";
		updateControls();
	}

	function closeLightbox() {
		lightbox.classList.remove("open");
		document.body.style.overflow = "";
	}

	function navigate(dir) {
		currentIndex = (currentIndex + dir + items.length) % items.length;
		const item = items[currentIndex];

		// Show loader for the next image
		if (loader) loader.style.display = "block";

		lightboxImg.classList.add("switching");

		setTimeout(() => {
			lightboxImg.src = item.src || item.dataset?.src;
			updateTitle(item);
		}, TRANSITION_SPEED);
		updateControls();
	}

	function updateControls() {
		if (items.length <= 1) {
			if (prevBtn) prevBtn.style.display = "none";
			if (nextBtn) nextBtn.style.display = "none";
			if (counter) counter.style.display = "none";
		} else {
			if (prevBtn) prevBtn.style.display = "";
			if (nextBtn) nextBtn.style.display = "";
			if (counter) {
				counter.style.display = "";
				counter.textContent = `${currentIndex + 1} / ${items.length}`;
			}
		}
	}

	// ── SWIPE GESTURES ──────────────────────────────────────
	function handleSwipe() {
		const swipeDist = touchEndX - touchStartX;
		if (Math.abs(swipeDist) > SWIPE_THRESHOLD) {
			if (swipeDist > 0) {
				navigate(-1); // Swipe Right -> Prev
			} else {
				navigate(1);  // Swipe Left -> Next
			}
		}
	}

	lightbox.addEventListener("touchstart", (e) => {
		touchStartX = e.changedTouches[0].screenX;
	}, { passive: true });

	lightbox.addEventListener("touchend", (e) => {
		touchEndX = e.changedTouches[0].screenX;
		handleSwipe();
	}, { passive: true });

	// ── EVENT LISTENERS ─────────────────────────────────────
	const closeBtn = document.getElementById("lightboxClose");
	if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

	lightbox.addEventListener("click", (e) => {
		if (e.target === lightbox || e.target.classList.contains("pg-lb-inner")) closeLightbox();
	});

	if (prevBtn) {
		prevBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			navigate(-1);
		});
	}
	if (nextBtn) {
		nextBtn.addEventListener("click", (e) => {
			e.stopPropagation();
			navigate(1);
		});
	}

	document.addEventListener("keydown", (e) => {
		if (!lightbox.classList.contains("open")) return;
		if (e.key === "Escape") closeLightbox();
		if (e.key === "ArrowLeft") navigate(-1);
		if (e.key === "ArrowRight") navigate(1);
	});

	return openLightbox;
}
