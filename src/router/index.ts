import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import CreateTask from "@/views/tasks/CreateTask.vue";
import DetailTask from "@/views/tasks/DetailTask.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Home",
			component: Home,
			meta: {
				title: "Home | Solidity Todo App",
				description:
					"Solidity Todo App is an solidity study project, integrated with web3 and vue.js.",
				keywords: "solidity, todo app, todo, ethereum, blockchain, web3, solidity todo app",
				robots: "index, follow",
				ogTitle: "Home | Solidity Todo App",
				ogDescription:
					"Solidity Todo App is an solidity study project, integrated with web3 and vue.js.",
				ogImage: "/logo.svg",
				ogUrl: "http://localhost:5173/",
			},
		},
		{
			path: "/tasks/:id",
			name: "Detail Task",
			component: DetailTask,
		},
		{
			path: "/tasks/create",
			name: "CreateTask",
			component: CreateTask,
			meta: {
				title: "Create Task | Solidity Todo App",
				description:
					"Solidity Todo App is an solidity study project, integrated with web3 and vue.js.",
				keywords: "solidity, todo app, todo, ethereum, blockchain, web3, solidity todo app",
				robots: "index, follow",
				ogTitle: "Create Task | Solidity Todo App",
				ogDescription:
					"Solidity Todo App is an solidity study project, integrated with web3 and vue.js.",
				ogImage: "/logo.svg",
				ogUrl: "http://localhost:5173/tasks/create",
			},
		},
	],
});

router.beforeEach((to, from, next) => {
	document.title = (to.meta.title as string) || "Solidity Todo App";

	const metaTags = [
		{ name: "description", content: to.meta.description as string },
		{ name: "keywords", content: to.meta.keywords as string },
		{ name: "robots", content: to.meta.robots as string },
		{ property: "og:title", content: to.meta.ogTitle as string },
		{ property: "og:description", content: to.meta.ogDescription as string },
		{ property: "og:image", content: to.meta.ogImage as string },
		{ property: "og:url", content: to.meta.ogUrl as string },
	];

	for (const tag of metaTags) {
		const key = tag.name ? "name" : "property";
		const value = tag.name || tag.property;
		if (!value) continue;

		let element = document.querySelector(`meta[${key}="${value}"]`);
		if (element) {
			element.setAttribute("content", tag.content);
		} else {
			element = document.createElement("meta");
			element.setAttribute(key, value);
			element.setAttribute("content", tag.content);
			document.head.appendChild(element);
		}
	}

	next();
});

export default router;
