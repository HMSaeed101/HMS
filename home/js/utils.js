/* ── UTILS ────────────────────────────────────────────────── */

/* ── LIGHTBOX (with prev/next navigation) ─────────────────── */
// export function initLightbox() {
// 	const lightbox = document.getElementById("lightbox");
// 	const lightboxImg = document.getElementById("lightboxImg");
// 	const prevBtn = document.getElementById("lightboxPrev");
// 	const nextBtn = document.getElementById("lightboxNext");
// 	const counter = document.getElementById("lightboxCounter");

// 	let currentIndex = 0;
// 	let items = [];

// 	function openLightbox(src, alt, index, allItems) {
// 		items = allItems || [];
// 		currentIndex = index ?? 0;
// 		lightboxImg.src = src;
// 		lightboxImg.alt = alt;
// 		lightbox.classList.add("open");
// 		document.body.style.overflow = "hidden";
// 		updateControls();
// 	}

// 	function closeLightbox() {
// 		lightbox.classList.remove("open");
// 		document.body.style.overflow = "";
// 	}

// 	function navigate(dir) {
// 		currentIndex = (currentIndex + dir + items.length) % items.length;
// 		const item = items[currentIndex];
// 		lightboxImg.classList.add("switching");
// 		setTimeout(() => {
// 			lightboxImg.src = item.dataset.src;
// 			lightboxImg.alt = item.dataset.caption;
// 			lightboxImg.classList.remove("switching");
// 		}, 150);
// 		updateControls();
// 	}

// 	function updateControls() {
// 		if (items.length <= 1) {
// 			prevBtn.style.display = "none";
// 			nextBtn.style.display = "none";
// 			counter.style.display = "none";
// 		} else {
// 			prevBtn.style.display = "";
// 			nextBtn.style.display = "";
// 			counter.style.display = "";
// 			counter.textContent = `${currentIndex + 1} / ${items.length}`;
// 		}
// 	}

// 	document
// 		.getElementById("lightboxClose")
// 		.addEventListener("click", closeLightbox);
// 	lightbox.addEventListener("click", (e) => {
// 		if (e.target === lightbox) closeLightbox();
// 	});
// 	prevBtn.addEventListener("click", (e) => {
// 		e.stopPropagation();
// 		navigate(-1);
// 	});
// 	nextBtn.addEventListener("click", (e) => {
// 		e.stopPropagation();
// 		navigate(1);
// 	});

// 	document.addEventListener("keydown", (e) => {
// 		if (!lightbox.classList.contains("open")) return;
// 		if (e.key === "Escape") closeLightbox();
// 		if (e.key === "ArrowLeft") navigate(-1);
// 		if (e.key === "ArrowRight") navigate(1);
// 	});

// 	return openLightbox;
// }

/* ── MOBILE MENU ──────────────────────────────────────────── */
export function initMobileMenu() {
	const menuToggle = document.getElementById("menuToggle");
	const mobileMenu = document.getElementById("mobileMenu");

	menuToggle.addEventListener("click", () =>
		mobileMenu.classList.toggle("open"),
	);

	document.querySelectorAll(".mobile-link").forEach((link) => {
		link.addEventListener("click", () =>
			mobileMenu.classList.remove("open"),
		);
	});

	// Only close on outside click when menu is actually open
	document.addEventListener("click", (e) => {
		if (!mobileMenu.classList.contains("open")) return;
		if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
			mobileMenu.classList.remove("open");
		}
	});
}

/* ── SCROLL REVEAL ────────────────────────────────────────── */
export function initScrollReveal() {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) {
					e.target.classList.add("visible");
					observer.unobserve(e.target);
				}
			});
		},
		{ threshold: 0.1 },
	);

	document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* ── SCROLL SPY + PROGRESS BAR ────────────────────────────── */
export function initScrollSpy() {
	const sections = document.querySelectorAll("section[id]");
	const navLinks = document.querySelectorAll(".nav-links a");
	const progressBar = document.getElementById("scrollProgress");

	function updateProgress() {
		const scrollTop = window.scrollY;
		const docHeight =
			document.documentElement.scrollHeight - window.innerHeight;
		const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
		if (progressBar) progressBar.style.width = progress + "%";
	}

	const spy = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				const id = entry.target.getAttribute("id");
				navLinks.forEach((link) => {
					link.classList.toggle(
						"active",
						link.getAttribute("href") === `#${id}`,
					);
				});
			});
		},
		{ rootMargin: "-40% 0px -55% 0px" },
	);

	sections.forEach((s) => spy.observe(s));
	window.addEventListener("scroll", updateProgress, { passive: true });
	updateProgress();
}

/* ── PHOTO GRID ─────────────────────────────────────────── */
// export function initPhotoGrid(openLightbox) {
// 	const grid = document.getElementById("photo-grid");

// 	grid.addEventListener("click", (e) => {
// 		const item = e.target.closest(".photo-item");
// 		if (!item) return;
// 		const all = Array.from(grid.querySelectorAll(".photo-item"));
// 		const index = all.indexOf(item);
// 		openLightbox(item.dataset.src, item.dataset.caption, index, all);
// 	});
// }

/* ── Render List ─────────────────────────────────────────── */
export function renderList(containerId, dataArray, buildElement) {
	const container = document.getElementById(containerId);
	const fragment = document.createDocumentFragment();
	dataArray.forEach((item, i) => {
		fragment.appendChild(buildElement(item, i));
	});
	container.appendChild(fragment);
}

/* ── Clone Template ─────────────────────────────────────────── */
export function cloneTemplate(id) {
	const template = document.getElementById(id);
	if (!template) {
		throw new Error(`cloneTemplate: no <template> found with id "${id}"`);
	}
	return template.content.cloneNode(true).firstElementChild;
}

/* ── Back to Top ─────────────────────────────────────────── */
export function initBackToTop() {
	const btn = document.getElementById("backToTop");
	window.addEventListener(
		"scroll",
		() => {
			btn.classList.toggle("visible", window.scrollY > 400);
		},
		{ passive: true },
	);
	btn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
}

/* ── THEME TOGGLE ─────────────────────────────────────────── */
export function initThemeToggle() {
	const html = document.documentElement;

	function setTheme(theme) {
		html.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}

	// 1. Load saved theme or use system preference
	let current = localStorage.getItem("theme");
	if (!current) {
		current = window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	}
	setTheme(current);

	// 2. Find ALL toggle elements and attach click listeners
	const toggles = document.querySelectorAll(".theme-toggle");

	toggles.forEach((toggle) => {
		toggle.addEventListener("click", (e) => {
			const currentTheme = html.getAttribute("data-theme");
			const newTheme = currentTheme === "dark" ? "light" : "dark";
			setTheme(newTheme);
		});
	});
}
