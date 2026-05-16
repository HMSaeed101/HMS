import { projects, academics, skills } from "./data.js";
import {
	renderProjects,
	// renderPhotos,
	renderAcademics,
	renderSkills,
} from "./render.js";
import {
	// initLightbox,
	initMobileMenu,
	initScrollReveal,
	initScrollSpy,
	// initPhotoGrid,
	initBackToTop,
	initThemeToggle,
} from "./utils.js";

// Controller fetches from model, passes to view
renderProjects(projects);
// renderPhotos(photos);
renderAcademics(academics);
renderSkills(skills);

// Controller wires view dependencies together
// const openLightbox = initLightbox();
// initPhotoGrid(openLightbox);
initMobileMenu();
initScrollReveal();
initScrollSpy();
initBackToTop();
initThemeToggle();

