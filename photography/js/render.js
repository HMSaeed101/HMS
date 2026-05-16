import { photos } from "../data/photos.js";
import { countOf, getVisibleItems } from "./utils.js";

const cats = ["all", ...new Set(photos.map((p) => p.category).filter(Boolean))];

export function renderFilters() {
	const filterLeft = document.querySelector(".pg-filter-left");
	filterLeft.innerHTML = ""; // clear if re-rendering

	cats.forEach((cat) => {
		const btn = document.createElement("button");
		btn.className = "pg-filter-btn" + (cat === "all" ? " active" : "");
		btn.dataset.filter = cat;
		const label = cat === "all" ? "All" : cat;
		btn.innerHTML = `${label} <span class="count">${countOf(cat, photos)}</span>`;
		filterLeft.appendChild(btn);
	});
}

export function renderGrid(grid) {
	grid.innerHTML = ""; // clear if needed

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
      <div class="pg-zoom-badge">…</div>
    `;
		grid.appendChild(item);
	});
}

export function updateVisibleCount(grid, visibleCountEl, pgEmpty) {
	const visible = getVisibleItems(grid).length;
	visibleCountEl.textContent = visible;
	pgEmpty.classList.toggle("show", visible === 0);
}
