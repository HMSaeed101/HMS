import { photos } from "./javascript/data.js";

/*
    Import your photos data from your existing data.js
    The photos array is already defined there — we just reuse it.
    If you want extended descriptions per photo, add a `desc` field to each photo object in data.js (see comment below).
 */

/*
 * ── HOW TO ADD DESCRIPTIONS ──────────────────────────────────
 * In data.js, extend each photo object like this:
 *
 * { src: "...", caption: "...", category: "Macro", desc: "Shot at f/11 near Taxila museum gardens." }
 *
 * The desc field is optional — if absent, nothing is shown.
 */

// ── Build filter categories with counts ─────────────────────
const cats = ["all", ...new Set(photos.map((p) => p.category).filter(Boolean))];
const countOf = (cat) =>
	cat === "all"
		? photos.length
		: photos.filter((p) => p.category === cat).length;

// Animate hero stats
function animateCount(el, target, duration = 900) {
	const start = performance.now();
	const update = (now) => {
		const p = Math.min((now - start) / duration, 1);
		el.textContent = Math.round(p * target);
		if (p < 1) requestAnimationFrame(update);
	};
	requestAnimationFrame(update);
}
animateCount(document.getElementById("statTotal"), photos.length);
animateCount(document.getElementById("statCats"), cats.length - 1, 700);

// Fade in hero bg
const heroBg = document.getElementById("heroBg");
// pick first flora or first photo as hero bg
const heroBgPhoto = photos.find((p) => p.category === "Flora") || photos[0];
if (heroBgPhoto) heroBg.style.backgroundImage = `url('${heroBgPhoto.src}')`;
setTimeout(() => heroBg.classList.add("loaded"), 100);

// ── Render filter buttons ────────────────────────────────────
const filterLeft = document.querySelector(".pg-filter-left");
cats.forEach((cat) => {
	const btn = document.createElement("button");
	btn.className = "pg-filter-btn" + (cat === "all" ? " active" : "");
	btn.dataset.filter = cat;
	const label = cat === "all" ? "All" : cat;
	btn.innerHTML = `${label} <span class="count">${countOf(cat)}</span>`;
	filterLeft.appendChild(btn);
});

// ── Render grid ──────────────────────────────────────────────
const grid = document.getElementById("pgGrid");
const visibleCount = document.getElementById("visibleCount");
const pgEmpty = document.getElementById("pgEmpty");

photos.forEach((photo, i) => {
	const item = document.createElement("div");
	item.className = "pg-item reveal";
	item.dataset.category = photo.category || "";
	item.dataset.index = i;
	item.innerHTML = `
      <img src="${photo.src}" alt="${photo.caption}" loading="${i < 6 ? "eager" : "lazy"}">
      <div class="pg-overlay">
        <div class="pg-overlay-cat">${photo.category || ""}</div>
        <div class="pg-overlay-caption">${photo.caption}</div>
        ${photo.desc ? `<div class="pg-overlay-desc">${photo.desc}</div>` : ""}
      </div>
      <div class="pg-zoom-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>
    `;
	grid.appendChild(item);
});

updateVisibleCount();

function updateVisibleCount() {
	const visible = grid.querySelectorAll(".pg-item:not(.hidden)").length;
	visibleCount.textContent = visible;
	pgEmpty.classList.toggle("show", visible === 0);
}

// ── Filter logic ─────────────────────────────────────────────
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
	updateVisibleCount();
});

// ── Scroll reveal ─────────────────────────────────────────────
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

// ── Lightbox ──────────────────────────────────────────────────
const lb = document.getElementById("pgLightbox");
const lbImg = document.getElementById("pgLbImg");
const lbCat = document.getElementById("pgLbCat");
const lbTitle = document.getElementById("pgLbTitle");
const lbDesc = document.getElementById("pgLbDesc");
const lbCounter = document.getElementById("pgLbCounter");
const lbCaption = document.getElementById("pgLbCaption");

let currentIdx = 0;
let visibleItems = [];

function getVisibleItems() {
	return Array.from(grid.querySelectorAll(".pg-item:not(.hidden)"));
}

function openLb(idx) {
	visibleItems = getVisibleItems();
	currentIdx = idx;
	showLbPhoto();
	lb.classList.add("open");
	document.body.style.overflow = "hidden";
	// Always show caption in lightbox
	setTimeout(() => lbCaption.classList.add("show"), 400);
}

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

function closeLb() {
	lb.classList.remove("open");
	document.body.style.overflow = "";
	lbCaption.classList.remove("show");
}

function navigate(dir) {
	currentIdx = (currentIdx + dir + visibleItems.length) % visibleItems.length;
	showLbPhoto();
}

// Click on grid item
grid.addEventListener("click", (e) => {
	const item = e.target.closest(".pg-item");
	if (!item) return;
	const visible = getVisibleItems();
	const idx = visible.indexOf(item);
	if (idx !== -1) openLb(idx);
});

document.getElementById("pgLbClose").addEventListener("click", closeLb);
lb.addEventListener("click", (e) => {
	if (e.target === lb || e.target.classList.contains("pg-lb-inner"))
		closeLb();
});
document.getElementById("pgLbPrev").addEventListener("click", (e) => {
	e.stopPropagation();
	navigate(-1);
});
document.getElementById("pgLbNext").addEventListener("click", (e) => {
	e.stopPropagation();
	navigate(1);
});

document.addEventListener("keydown", (e) => {
	if (!lb.classList.contains("open")) return;
	if (e.key === "Escape") closeLb();
	if (e.key === "ArrowLeft") navigate(-1);
	if (e.key === "ArrowRight") navigate(1);
});

// Touch swipe support
let touchStartX = 0;
lb.addEventListener(
	"touchstart",
	(e) => {
		touchStartX = e.touches[0].clientX;
	},
	{ passive: true },
);
lb.addEventListener("touchend", (e) => {
	const diff = touchStartX - e.changedTouches[0].clientX;
	if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
});
