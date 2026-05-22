/* ── NAVIGATION COMPONENT ────────────────────────────────────────── */

import { initBackToTop } from "./BackToTop.js";

/**
 * Injects the navigation bar and mobile menu.
 * @param {Object} options
 * @param {string} options.pathPrefix - Prefix for links (e.g. '../')
 * @param {string} options.activePage - Identifier for the active page
 */
export function initNavigation({ pathPrefix = "", activePage = "home" } = {}) {
	const navHTML = `
    <nav>
        <div class="container nav-inner">
            <a href="${pathPrefix}index.html" class="nav-logo">HMS.</a>

            <div class="nav-links">
                <a href="${pathPrefix}index.html#about" class="${activePage === "home" ? "active" : ""}">About</a>
                <a href="${pathPrefix}projects/index.html" class="${activePage === "projects" ? "active" : ""}">Projects</a>
                <a href="${pathPrefix}index.html#academic" class="${activePage === "home" ? "active" : ""}">Academic</a>
                <a href="${pathPrefix}index.html#hobbies" class="${activePage === "home" ? "active" : ""}">Hobbies</a>
                <a href="${pathPrefix}index.html#skills" class="${activePage === "home" ? "active" : ""}">Skills</a>
                <a href="${pathPrefix}index.html#contact" class="${activePage === "home" ? "active" : ""}">Contact</a>

                <a class="theme-toggle" id="themeToggle">
                    <svg class="icon" id="themeIcon"><use href="#icon-moon"/></svg>
                </a>
            </div>

            <button class="nav-toggle" id="menuToggle" aria-label="Toggle menu">
                <span></span><span></span><span></span>
            </button>
        </div>
    </nav>

    <div class="mobile-menu" id="mobileMenu">
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

	// Automate: Every page with navigation now gets the Back to Top button
	initBackToTop();
}
