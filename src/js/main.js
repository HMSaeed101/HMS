/* ── MAIN ENTRY POINT (HOME PAGE) ────────────────────────── */

import { projects, academics, skills } from "./data/index.js";
import { initIcons } from "./components/Icons.js";
import { initNavigation } from "./components/Navigation.js";
import { initFooter } from "./components/Footer.js";

import { initThemeToggle, initMobileMenu } from "./utils/ui.js";
import { initScrollReveal, initScrollSpy } from "./utils/scroll.js";
import { renderList, cloneTemplate } from "./utils/dom.js";
import { initLightbox } from "./components/Lightbox.js";

// ── Initialization ──────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
	// 1. Inject Components
	initIcons();
	initNavigation();
	initFooter();

	// 2. UI Logic (Must run after injection)
	initThemeToggle();
	initMobileMenu();
	initScrollSpy();

	// Only initialize Lightbox if the container exists in DOM
	if (document.getElementById("lightbox")) {
		initLightbox();
	}

	// 3. Rendering Data
	// Render dynamic content first
	renderProjects(projects);
	renderAcademics(academics);
	renderSkills(skills);

	// 4. Initialize scroll reveal AFTER all content is rendered
	initScrollReveal();
});

// ── Render Functions ────────────────────────────────────────

function renderProjects(data) {
	renderList("projects-grid", data, (p, i) => {
		const card = cloneTemplate("tpl-project-card");
		if (!card) return null;

		card.style.setProperty("--delay", i * 0.08 + "s");
		card.querySelector("img").src = p.img;
		card.querySelector("img").alt = p.title;
		card.querySelector(".project-tag").textContent = p.tag;
		card.querySelector(".project-title").textContent = p.title;
		card.querySelector(".project-desc").textContent = p.desc;
		card.querySelector(".demo-link").href = p.demo;
		card.querySelector(".code-link").href = p.code;

		return card;
	});
}

function renderAcademics(data) {
	renderList("academic-list", data, (a) => {
		const item = cloneTemplate("tpl-academic-item");
		if (!item) return null;

		item.querySelector(".academic-year").textContent = a.year;
		item.querySelector(".academic-degree").textContent = a.degree;
		item.querySelector(".academic-school").textContent = a.school;
		item.querySelector(".academic-desc").textContent = a.desc;
		item.querySelector(".academic-badge").textContent = a.badge;

		return item;
	});
}

function renderSkills(data) {
	renderList("skills-grid", data, (cat) => {
		const section = cloneTemplate("tpl-skills-category");
		if (!section) return null;

		section.querySelector(".skills-category-title").textContent =
			cat.category;
		section.dataset.color = cat.colorKey;

		const pills = section.querySelector(".skills-pills");

		cat.items.forEach((name) => {
			const pill = cloneTemplate("tpl-skill-pill");
			if (pill) {
				pill.append(document.createTextNode(name));
				pills.appendChild(pill);
			}
		});

		return section;
	});
}
