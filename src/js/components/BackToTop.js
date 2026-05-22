/* ── BACK TO TOP COMPONENT ─────────────────────────────────────── */

export function initBackToTop() {
	// 1. Inject the HTML into the bottom of the body
	const btnHTML = `
        <button class="back-to-top" id="backToTop" aria-label="Back to top">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"/>
            </svg>
        </button>
    `;
	document.body.insertAdjacentHTML("beforeend", btnHTML);

	const btn = document.getElementById("backToTop");
	if (!btn) return;

	// 2. Add visibility logic
	window.addEventListener(
		"scroll",
		() => {
			btn.classList.toggle("visible", window.scrollY > 400);
		},
		{ passive: true },
	);

	// 3. Add scroll behavior
	btn.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
}
