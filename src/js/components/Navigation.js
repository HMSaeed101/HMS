/* ── NAVIGATION COMPONENT ────────────────────────────────────────── */

import { initBackToTop } from "./BackToTop.js";

/**
 * Injects the navigation bar and mobile menu.
 * @param {Object} options
 * @param {string} options.pathPrefix - Prefix for links (e.g. '../')
 */
export function initNavigation({ pathPrefix = "" } = {}) {
	const navHTML = `
    <nav aria-label="Main">
        <div class="container nav-inner">
            <a href="${pathPrefix}index.html" class="nav-logo">HMS.</a>

            <div class="nav-links">
                <a href="${pathPrefix}index.html#about">About</a>
                <a href="${pathPrefix}projects/index.html">Projects</a>
                <a href="${pathPrefix}index.html#academic">Academic</a>
                <a href="${pathPrefix}index.html#hobbies">Hobbies</a>
                <a href="${pathPrefix}index.html#skills">Skills</a>
                <a href="${pathPrefix}index.html#contact">Contact</a>

                <a class="theme-toggle" id="themeToggle">
                    <svg class="icon" id="themeIcon"><use href="#icon-moon"/></svg>
                </a>
            </div>

            <button class="nav-toggle" id="menuToggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileMenu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <div class="mobile-menu" id="mobileMenu" role="navigation" aria-label="Mobile Navigation">
        <a href="${pathPrefix}index.html#about" class="mobile-link">
            <svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path fill="#c3d59cb3" d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
            About
        </a>
        <a href="${pathPrefix}projects/index.html" class="mobile-link">
            <svg class="icon" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            Projects
        </a>
        <a href="${pathPrefix}index.html#academic" class="mobile-link">
            <svg class="icon" viewBox="0 0 24 24"><path fill="#c3d59cb3" d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            Academic
        </a>
        <a href="${pathPrefix}photography/index.html" class="mobile-link">
            <svg class="icon" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
            Photography
        </a>
        <a href="${pathPrefix}index.html#contact" class="mobile-link">
            <svg class="icon" viewBox="0 0 24 24"><path fill="#c3d59cb3" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Contact
        </a>
        <a class="mobile-link theme-toggle">
            <svg class="icon" id="themeIcon"><use href="#icon-moon"/></svg>
            Theme
        </a>
    </div>
    `;

	// Injects before the first section or hero
	document.body.insertAdjacentHTML("afterbegin", navHTML);

	// ── Intelligent Active Link Detection ────────────────────
	const currentURL = window.location.href.split("#")[0].split("?")[0];
	const allLinks = document.querySelectorAll(".nav-links a, .mobile-link");

	allLinks.forEach((link) => {
		if (!link.href) return;
		const linkURL = link.href.split("#")[0].split("?")[0];

		// If the page URL matches, set active.
		// For Home page fragments, we only activate the primary '#about' link initially.
		if (linkURL === currentURL && (!link.hash || link.hash === "#about")) {
			link.classList.add("active");
			if (!link.hash) link.setAttribute("aria-current", "page");
		}
	});

	// ── Scroll Behavior (Hide on Scroll Down) ────────────────
	const nav = document.querySelector("nav");
	const mobileMenu = document.getElementById("mobileMenu");
	let lastScrollY = window.scrollY;

	window.addEventListener(
		"scroll",
		() => {
			const currentScrollY = window.scrollY;
			const isMenuOpen = mobileMenu?.classList.contains("open");

			// 1. Avoid jitter: only trigger if scrolled more than 10px
			if (Math.abs(currentScrollY - lastScrollY) < 10) return;

			// 2. Hide on scroll down, show on scroll up
			// We don't hide if the user is at the very top (threshold 100px) or if mobile menu is open
			if (
				currentScrollY > lastScrollY &&
				currentScrollY > 100 &&
				!isMenuOpen
			) {
				nav.classList.add("nav-hidden");
			} else {
				nav.classList.remove("nav-hidden");
			}

			lastScrollY = Math.max(0, currentScrollY); // Prevent issues with elastic scrolling on iOS
		},
		{ passive: true },
	);

	// Automate: Every page with navigation now gets the Back to Top button
	initBackToTop();
}
