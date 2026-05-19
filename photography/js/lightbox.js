import { photos } from "./data.js";
import { getVisibleItems } from "./utils.js";

export function initLightbox(grid) {
	const lb = document.getElementById("pgLightbox");
	const lbImg = document.getElementById("pgLbImg");
	const lbCat = document.getElementById("pgLbCat");
	const lbTitle = document.getElementById("pgLbTitle");
	const lbExif = document.getElementById("pgLbExif");
	const lbDesc = document.getElementById("pgLbDesc");
	const lbCounter = document.getElementById("pgLbCounter");
	const lbCaption = document.getElementById("pgLbCaption");

	let currentIdx = 0;
	let visibleItems = [];

	let uiTimeout;
	function showLbUI() {
		lb.classList.remove("distraction-free");
		clearTimeout(uiTimeout);
		uiTimeout = setTimeout(() => {
			if (lb.classList.contains("open")) {
				lb.classList.add("distraction-free");
			}
		}, 3000);
	}

	function showLbPhoto(dir = 0) {
		const item = visibleItems[currentIdx];
		const photo = photos[parseInt(item.dataset.index)];
		
		lbImg.classList.add("switching");
        lbCaption.classList.remove("show");

		setTimeout(() => {
			lbImg.src = photo.src;
			lbImg.alt = photo.caption;
			lbCat.textContent = photo.category || "";
			lbTitle.textContent = photo.caption;
			lbExif.textContent = photo.exif || "";
			lbExif.style.display = photo.exif ? "" : "none";
			lbDesc.textContent = photo.desc || "";
			lbDesc.style.display = photo.desc ? "" : "none";
			lbCounter.textContent = `${currentIdx + 1} / ${visibleItems.length}`;
			
            lbImg.onload = () => {
                lbImg.classList.remove("switching");
                setTimeout(() => lbCaption.classList.add("show"), 100);
            };
		}, 250);
	}

	function openLb(idx) {
		visibleItems = getVisibleItems(grid);
		currentIdx = idx;
		showLbPhoto();
		lb.classList.add("open");
		document.body.style.overflow = "hidden";
        showLbUI();
	}

	function closeLb() {
		lb.classList.remove("open");
        lb.classList.remove("distraction-free");
		document.body.style.overflow = "";
		lbCaption.classList.remove("show");
        clearTimeout(uiTimeout);
	}

	function navigate(dir) {
		currentIdx =
			(currentIdx + dir + visibleItems.length) % visibleItems.length;
		showLbPhoto(dir);
        showLbUI();
	}

	// Events
	grid.addEventListener("click", (e) => {
		const item = e.target.closest(".pg-item");
		if (!item) return;
		const visible = getVisibleItems(grid);
		const idx = visible.indexOf(item);
		if (idx !== -1) openLb(idx);
	});

    lb.addEventListener("mousemove", showLbUI);
    lb.addEventListener("touchstart", showLbUI);

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
