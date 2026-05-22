/* ── SCROLL UTILITIES ────────────────────────────────────────── */

export function initScrollReveal() {
	const revealElements = document.querySelectorAll(".reveal");
	if (revealElements.length === 0) return;

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

	revealElements.forEach((el) => observer.observe(el));
}

export function initScrollSpy() {
	const sections = document.querySelectorAll("section[id]");
	const navLinks = document.querySelectorAll(
		".nav-links a:not(.theme-toggle)",
	);
	const progressBar = document.getElementById("scrollProgress");

	if (sections.length === 0 && !progressBar) return;

	function updateProgress() {
		const scrollTop = window.scrollY;
		const docHeight =
			document.documentElement.scrollHeight - window.innerHeight;
		const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
		if (progressBar) progressBar.style.width = progress + "%";
	}

	if (sections.length > 0) {
		const spy = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					// We only want to update if the section is occupying a significant part of the screen
					if (!entry.isIntersecting || entry.intersectionRatio < 0.5)
						return;

					const id = entry.target.getAttribute("id");
					navLinks.forEach((link) => {
						const href = link.getAttribute("href");
						// Check if the link ends with the current section ID
						if (href.endsWith(`#${id}`)) {
							link.classList.add("active");
							link.setAttribute("aria-current", "location");
						} else if (href.includes("#")) {
							link.classList.remove("active");
							link.removeAttribute("aria-current");
						}
					});
				});
			},
			{ threshold: [0.1, 0.5, 0.8], rootMargin: "-20% 0px -20% 0px" },
		);

		sections.forEach((s) => spy.observe(s));
	}

	window.addEventListener("scroll", updateProgress, { passive: true });
	window.addEventListener("resize", updateProgress, { passive: true });
	window.addEventListener("load", updateProgress); // Recalculate once images are fully loaded
	updateProgress();
}
