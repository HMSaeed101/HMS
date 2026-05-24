/* ── PHOTOGRAPHY PAGE JS ────────────────────────────────────────── */

import { photos } from "./data/index.js";
import { initIcons } from "./components/Icons.js";
import { initNavigation } from "./components/Navigation.js";
import { initFooter } from "./components/Footer.js";

import { initThemeToggle, initMobileMenu } from "./utils/ui.js";
import { initScrollReveal, initScrollSpy } from "./utils/scroll.js";
import { getVisibleItems } from "./utils/dom.js";
import { animateCount } from "./utils/animations.js";
import { initLightbox } from "./components/Lightbox.js";

document.addEventListener("DOMContentLoaded", () => {
	// 1. Inject Components
	initIcons();
	initNavigation({ pathPrefix: "../" });
	initFooter({ pathPrefix: "../" });

	// 2. UI Logic
	initThemeToggle();
	initMobileMenu();

	// ── Hero ──────────────────────────────────────────────────
	const heroBg = document.getElementById("heroBg");
	const heroBgPhoto = photos.find((p) => p.category === "Flora") || photos[0];
	if (heroBgPhoto && heroBg)
	{
		heroBg.style.backgroundImage = `url('${heroBgPhoto.src}')`;
		setTimeout(() => heroBg.classList.add("loaded"), 100);
	}

	animateCount(document.getElementById("statTotal"), photos.length);
	animateCount(
		document.getElementById("statCats"),
		new Set(photos.map((p) => p.category).filter(Boolean)).size,
		700,
	);

	// ── Grid & Filters ────────────────────────────────────────
	const grid = document.getElementById("pgGrid");
	const visibleCount = document.getElementById("visibleCount");
	const pgEmpty = document.getElementById("pgEmpty");

	renderFilters(photos);
	renderGrid(grid, photos);
	updateVisibleCount(grid, visibleCount, pgEmpty);

	// Filter logic
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

	// ── Initialize Lightbox ──────────────────────────────────
	const openLightbox = initLightbox();
	if (grid && openLightbox) {
		grid.addEventListener("click", (e) => {
			const item = e.target.closest(".pg-item");
			if (!item) return;

			const allItems = Array.from(
				grid.querySelectorAll(".pg-item:not(.hidden)"),
			);
			const index = allItems.indexOf(item);

			const photoData = photos[parseInt(item.dataset.index)];

			openLightbox(
				`../${photoData.src}`,
				photoData.caption,
				index,
				allItems,
			);
			updatePhotographyCaption(photoData);
		});
	}

	initScrollSpy();
	initScrollReveal();
});

function renderFilters(data) {
	const filterLeft = document.querySelector(".pg-filter-left");
	if (!filterLeft) return;

	const cats = [
		"all",
		...new Set(data.map((p) => p.category).filter(Boolean)),
	];
	filterLeft.innerHTML = '<span class="pg-filter-label">Filter by</span>';

	cats.forEach((cat) => {
		const btn = document.createElement("button");
		btn.className = "pg-filter-btn" + (cat === "all" ? " active" : "");
		btn.dataset.filter = cat;
		const label = cat === "all" ? "All" : cat;
		const count =
			cat === "all"
				? data.length
				: data.filter((p) => p.category === cat).length;
		btn.innerHTML = `${label} <span class="count">${count}</span>`;
		filterLeft.appendChild(btn);
	});
}

function renderGrid(grid, data) {
	if (!grid) return;
	grid.innerHTML = "";

	data.forEach((photo, i) => {
		const item = document.createElement("div");
		item.className = "pg-item reveal";
		item.dataset.category = photo.category || "";
		item.dataset.index = i;
		item.dataset.src = photo.src;
		item.dataset.caption = photo.caption;

		item.innerHTML = `
            <img src="${photo.src}" alt="${photo.caption}" loading="${i < 6 ? "eager" : "lazy"}" onload="this.classList.add('loaded')">
            <div class="pg-overlay">
                <div class="pg-overlay-cat">${photo.category || ""}</div>
                <div class="pg-overlay-caption">${photo.caption}</div>
                ${photo.exif ? `<div class="pg-overlay-exif">${photo.exif}</div>` : ""}
                ${photo.desc ? `<div class="pg-overlay-desc">${photo.desc}</div>` : ""}
            </div>
            <div class="pg-zoom-badge">…</div>
        `;
		grid.appendChild(item);
	});
}


function updateVisibleCount(grid, visibleCountEl, pgEmpty) {
	const visible = getVisibleItems(grid, ".pg-item").length;
	if (visibleCountEl) visibleCountEl.textContent = visible;
	if (pgEmpty) pgEmpty.classList.toggle("show", visible === 0);
}

function updatePhotographyCaption(photo) {
	const cap = document.getElementById("pgLbCaption");
	if (!cap) return;

	cap.classList.remove("show");
	setTimeout(() => {
		document.getElementById("pgLbCat").textContent = photo.category || "";
		document.getElementById("pgLbTitle").textContent = photo.caption;
		document.getElementById("pgLbExif").textContent = photo.exif || "";
		document.getElementById("pgLbDesc").textContent = photo.desc || "";
		cap.classList.add("show");
	}, 200);
}
