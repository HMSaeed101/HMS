/* ── FOOTER COMPONENT ────────────────────────────────────────── */

/**
 * Injects the footer.
 * @param {Object} options
 * @param {string} options.pathPrefix - Prefix for links (e.g. '../')
 */
export function initFooter({ pathPrefix = '' } = {}) {
    const footerHTML = `
    <footer>
        <div class="container">
            <div class="footer-inner">
                <div>
                    <div class="footer-name">Hafiz Muhammad Saeed</div>
                    <div class="footer-tagline">Photographer · Builder · Perpetual Learner</div>
                </div>

                <div class="footer-socials">
                    <a href="https://wa.me/923219798860?text=Hi%20Saeed%2C%20I%20saw%20your%20portfolio!" class="social-btn" aria-label="Whatsapp" target="_blank" rel="noopener noreferrer">
                        <svg class="icon"><use href="#icon-whatsapp"/></svg>
                    </a>
                    <a href="https://github.com/HMSaeed101" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                        <svg class="icon"><use href="#icon-github"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/in/hmsaeed" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <svg class="icon"><use href="#icon-linkedin"/></svg>
                    </a>
                </div>
                <p class="footer-copy">© 2026 Hafiz Muhammad Saeed. Built with care.</p>
                <p class="footer-copy">© 2025 Hafiz Muhammad Saeed. Built with care.</p>
            </div>
        </div>
    </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
}
