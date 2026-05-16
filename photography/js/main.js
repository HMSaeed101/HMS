import { photos } from "./data.js";
import { animateCount } from "./utils.js";
import { renderFilters, renderGrid, updateVisibleCount } from "./render.js";
import { initLightbox } from "./lightbox.js";

// ── Hero background & stats ────────────────────────────────
const heroBg = document.getElementById("heroBg");
const heroBgPhoto = photos.find((p) => p.category === "Flora") || photos[0];
if (heroBgPhoto) {
	heroBg.style.backgroundImage = `url('${heroBgPhoto.src}')`;
	setTimeout(() => heroBg.classList.add("loaded"), 100);
}

animateCount(document.getElementById("statTotal"), photos.length);
animateCount(
	document.getElementById("statCats"),
	new Set(photos.map((p) => p.category).filter(Boolean)).size,
	700,
);

// ── Initialize features ────────────────────────────────────
const grid = document.getElementById("pgGrid");
const visibleCount = document.getElementById("visibleCount");
const pgEmpty = document.getElementById("pgEmpty");

renderFilters();
renderGrid(grid);
updateVisibleCount(grid, visibleCount, pgEmpty);

// Filter logic (kept here because it needs to call updateVisibleCount)
document.querySelector(".pg-filter-left").addEventListener("click", (e) => {
	const btn = e.target.closest(".pg-filter-btn");
	if (!btn) return;

	document
		.querySelectorAll(".pg-filter-btn")
		.forEach((b) => b.classList.remove("active"));
	btn.classList.add("active");

	const filter = btn.dataset.filter;
	grid.querySelectorAll(".pg-item").forEach((item) => {
		const match = filter === "all" || item.dataset.category === filter;
		item.classList.toggle("hidden", !match);
	});

	updateVisibleCount(grid, visibleCount, pgEmpty);
});

// Scroll reveal
const revealObs = new IntersectionObserver(
	(entries) => {
		entries.forEach((e) => {
			if (e.isIntersecting) {
				e.target.classList.add("visible");
				revealObs.unobserve(e.target);
			}
		});
	},
	{ threshold: 0.08 },
);
document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

// Lightbox
initLightbox(grid);


// Add this temporarily in main.js
console.log("Photos loaded:", photos);
console.log("Photos count:", photos?.length || 0);
