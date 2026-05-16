import { photos } from "../data/photos.js";
import { getVisibleItems } from "./utils.js";

export function initLightbox(grid) {
	const lb = document.getElementById("pgLightbox");
	const lbImg = document.getElementById("pgLbImg");
	const lbCat = document.getElementById("pgLbCat");
	const lbTitle = document.getElementById("pgLbTitle");
	const lbDesc = document.getElementById("pgLbDesc");
	const lbCounter = document.getElementById("pgLbCounter");
	const lbCaption = document.getElementById("pgLbCaption");

	let currentIdx = 0;
	let visibleItems = [];

	function showLbPhoto() {
		const item = visibleItems[currentIdx];
		const photo = photos[parseInt(item.dataset.index)];
		lbImg.classList.add("switching");
		setTimeout(() => {
			lbImg.src = photo.src;
			lbImg.alt = photo.caption;
			lbCat.textContent = photo.category || "";
			lbTitle.textContent = photo.caption;
			lbDesc.textContent = photo.desc || "";
			lbDesc.style.display = photo.desc ? "" : "none";
			lbCounter.textContent = `${currentIdx + 1} / ${visibleItems.length}`;
			lbImg.classList.remove("switching");
		}, 180);
	}

	function openLb(idx) {
		visibleItems = getVisibleItems(grid);
		currentIdx = idx;
		showLbPhoto();
		lb.classList.add("open");
		document.body.style.overflow = "hidden";
		setTimeout(() => lbCaption.classList.add("show"), 400);
	}

	function closeLb() {
		lb.classList.remove("open");
		document.body.style.overflow = "";
		lbCaption.classList.remove("show");
	}

	function navigate(dir) {
		currentIdx =
			(currentIdx + dir + visibleItems.length) % visibleItems.length;
		showLbPhoto();
	}

	// Events
	grid.addEventListener("click", (e) => {
		const item = e.target.closest(".pg-item");
		if (!item) return;
		const visible = getVisibleItems(grid);
		const idx = visible.indexOf(item);
		if (idx !== -1) openLb(idx);
	});

	document.getElementById("pgLbClose")?.addEventListener("click", closeLb);
	lb?.addEventListener("click", (e) => {
		if (e.target === lb || e.target.classList.contains("pg-lb-inner"))
			closeLb();
	});
	document.getElementById("pgLbPrev")?.addEventListener("click", (e) => {
		e.stopPropagation();
		navigate(-1);
	});
	document.getElementById("pgLbNext")?.addEventListener("click", (e) => {
		e.stopPropagation();
		navigate(1);
	});

	document.addEventListener("keydown", (e) => {
		if (!lb.classList.contains("open")) return;
		if (e.key === "Escape") closeLb();
		if (e.key === "ArrowLeft") navigate(-1);
		if (e.key === "ArrowRight") navigate(1);
	});

	// Touch
	let touchStartX = 0;
	lb?.addEventListener(
		"touchstart",
		(e) => {
			touchStartX = e.touches[0].clientX;
		},
		{ passive: true },
	);
	lb?.addEventListener("touchend", (e) => {
		const diff = touchStartX - e.changedTouches[0].clientX;
		if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
	});
}
