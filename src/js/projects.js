/* ── PROJECTS PAGE JS ────────────────────────────────────────── */

import { caseStudies } from './data/index.js';
import { initIcons } from './components/Icons.js';
import { initNavigation } from './components/Navigation.js';
import { initFooter } from './components/Footer.js';

import {
    initThemeToggle,
    initMobileMenu
} from './utils/ui.js';
import {
    initScrollReveal,
    initScrollSpy
} from './utils/scroll.js';
import {
    renderList,
    cloneTemplate
} from './utils/dom.js';
import {
    animateCount
} from './utils/animations.js';

document.addEventListener('DOMContentLoaded', () => {
    const containerId = 'case-studies-container';

    // 1. Inject Components
    initIcons();
    initNavigation({ pathPrefix: '../' });
    initFooter({ pathPrefix: '../' });

    // 2. UI Logic
    initThemeToggle();
    initMobileMenu();
    initScrollSpy();

    // 3. Render content & Filters
    renderCaseStudies(caseStudies, containerId);
    renderFilters(caseStudies);
    updateCount(containerId, 'visibleCount');

    // Filter Logic
    const filterLeft = document.querySelector('.cs-filter-left');
    if (filterLeft) {
        filterLeft.addEventListener('click', (e) => {
            const btn = e.target.closest('.cs-filter-btn');
            if (!btn) return;

            document.querySelectorAll('.cs-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            const container = document.getElementById(containerId);
            container.querySelectorAll('.case-study').forEach(el => {
                const match = filter === 'all' || el.dataset.category === filter;
                el.classList.toggle('hidden', !match);
            });

            updateCount(containerId, 'visibleCount');
        });
    }

    // Hero Stats
    const totalProjects = caseStudies.filter(s => !s.isPlaceholder).length;
    const allTech = new Set(caseStudies.flatMap(s => s.techStack || []));

    animateCount(document.getElementById('statProjects'), totalProjects, 800);
    animateCount(document.getElementById('statTech'), allTech.size, 1000);

    initScrollReveal();
});

// ── Render Functions ────────────────────────────────────────

function renderCaseStudies(data, containerId) {
    renderList(containerId, data, (study) => {
        const item = cloneTemplate('tpl-case-study');
        if (!item) return null;

        item.dataset.category = study.tag;
        item.querySelector('.cs-tag').textContent         = study.tag;
        item.querySelector('.cs-sidebar-title').textContent = study.title;
        item.querySelector('.cs-sidebar-desc').textContent  = study.shortDesc;

        const techList = item.querySelector('.cs-tech-list');
        (study.techStack || []).forEach(tech => {
            const span = document.createElement('span');
            span.className = 'tech-badge';
            span.textContent = tech;
            techList.appendChild(span);
        });

        const sourceLink = item.querySelector('.btn-source');
        if (study.links && study.links.source) {
            sourceLink.href = study.links.source;
        } else {
            sourceLink.style.display = 'none';
        }

        const content = item.querySelector('.cs-content');
        (study.sections || []).forEach(sec => {
            const div = document.createElement('div');
            div.className = 'cs-section';
            div.innerHTML = `
                <h3>${sec.heading}</h3>
                <p>${sec.content}</p>
                ${sec.diagram ? `<div class="cs-diagram">${sec.diagram}</div>` : ''}
                ${sec.code ? `<pre class="cs-code"><code>${sec.code}</code></pre>` : ''}
            `;
            content.appendChild(div);
        });

        if (study.isPlaceholder) {
            item.classList.add('is-placeholder');
            content.innerHTML = `<div class="cs-placeholder-msg">Detailed case study for <strong>${study.title}</strong> is currently being drafted.</div>`;
        }

        return item;
    });
}

function renderFilters(data) {
    const filterLeft = document.querySelector('.cs-filter-left');
    if (!filterLeft) return;

    const tags = ["all", ...new Set(data.map(s => s.tag))];
    filterLeft.innerHTML = '<span class="pg-filter-label">Filter by</span>';

    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = `cs-filter-btn ${tag === 'all' ? 'active' : ''}`;
        btn.dataset.filter = tag;
        btn.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
        filterLeft.appendChild(btn);
    });
}

function updateCount(containerId, countId) {
    const container = document.getElementById(containerId);
    const countEl = document.getElementById(countId);
    if (!container || !countEl) return;
    const count = container.querySelectorAll('.case-study:not(.hidden)').length;
    countEl.textContent = count;
}
