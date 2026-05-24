export const caseStudies = [
	{
		id: "house-of-wisdom",
		tag: "Lead Project",
		title: "House of Wisdom",
		shortDesc:
			"A digital library system designed for modularity and scalability using Vanilla JavaScript.",
		techStack: [
			"ES Modules",
			"MVC Pattern",
			"Modular CSS",
			"Local Storage",
		],
		links: {
			source: "https://github.com/HMSaeed101/E-Library",
			demo: "https://hmslibrary.netlify.app/",
		},
		sections: [
			{
				heading: "The Challenge",
				content: `Standard imperative approaches often lead to tightly coupled logic, making long-term maintenance difficult. My objective was to engineer a scalable system by enforcing a strict separation of concerns.`,
			},
			{
				heading: "Architecture: The MVC Pattern",
				content: `I implemented a Model-View-Controller (MVC) architecture to ensure a robust structural foundation. The <strong>Model</strong> manages state and data persistence, the <strong>View</strong> handles dynamic UI rendering, and the <strong>Controller</strong> orchestrates the interaction between them.`,
				diagram: `
                    <strong>Model:</strong> data.js (State Management)<br>
                    <strong>View:</strong> render.js (UI Components)<br>
                    <strong>Controller:</strong> main.js (Event Listeners & Orchestration)
                `,
			},
			{
				heading: "Technical Highlight: Modular CSS",
				content: `To prevent CSS global namespace collisions and maintainability issues, I adopted a modular style architecture. Each component (Navbar, Grid, Modal) maintains its own encapsulated stylesheet, all managed through a centralized entry point.`,
				code: `/* main.css entry point */
@import './base/rules.css';
@import './components/nav.css';
@import './components/library-grid.css';`,
			},
			{
				heading: 'The "Storyteller" Insight',
				content: `Building this project taught me that code is just another language for telling a story. If the architecture is confusing, the "story" of the data gets lost. Clean code is simply a clear narrative.`,
			},
		],
	},
	{
		id: "finance-tracker",
		tag: "Productivity",
		title: "Personal Finance Tracker",
		shortDesc:
			"Case study coming soon. Focusing on Data Visualization and Offline Persistence.",
		techStack: [],
		links: {},
		isPlaceholder: true,
	},
];
