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
	const navLinks = document.querySelectorAll(".nav-links a");
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
	}

	window.addEventListener("scroll", updateProgress, { passive: true });
	updateProgress();
}
