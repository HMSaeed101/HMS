/* ── RENDER ───────────────────────────────────────────────── */

import { renderList, cloneTemplate } from "./utils.js";

export function renderProjects(projects) {
  renderList('projects-grid', projects, (p, i) => {
    const card = cloneTemplate('tpl-project-card');
    card.style.setProperty('--delay', (i * 0.08) + 's');

    card.querySelector('img').src                    = p.img;
    card.querySelector('img').alt                    = p.title;
    card.querySelector('.project-tag').textContent   = p.tag;
    card.querySelector('.project-title').textContent = p.title;
    card.querySelector('.project-desc').textContent  = p.desc;
    card.querySelector('.demo-link').href            = p.demo;
    card.querySelector('.code-link').href            = p.code;

    return card;
  });
}

// export function renderPhotos(photos) {
//   renderList('photo-grid', photos, (ph) => {
//     const item = cloneTemplate('tpl-photo-item');

//     item.dataset.src                                  = ph.src;
//     item.dataset.caption                              = ph.caption;
//     item.dataset.category                             = ph.category || '';
//     item.querySelector('img').src                     = ph.src;
//     item.querySelector('img').alt                     = ph.caption;
//     item.querySelector('.photo-caption').textContent  = ph.caption;

//     return item;
//   });
// }

export function renderAcademics(academics) {
  renderList('academic-list', academics, (a) => {
    const item = cloneTemplate('tpl-academic-item');

    item.querySelector('.academic-year').textContent   = a.year;
    item.querySelector('.academic-degree').textContent = a.degree;
    item.querySelector('.academic-school').textContent = a.school;
    item.querySelector('.academic-desc').textContent   = a.desc;
    item.querySelector('.academic-badge').textContent  = a.badge;

    return item;
  });
}

export function renderSkills(skills) {
  renderList('skills-grid', skills, (cat) => {
    const section = cloneTemplate('tpl-skills-category');
    section.querySelector('.skills-category-title').textContent = cat.category;
    section.dataset.color = cat.colorKey;

    const pills = section.querySelector('.skills-pills');

    cat.items.forEach(name => {
      const pill = cloneTemplate('tpl-skill-pill');
      pill.append(document.createTextNode(name));
      pills.appendChild(pill);
    });

    return section;
  });
}
