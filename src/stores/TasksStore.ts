import { ref } from "vue";
import { defineStore } from "pinia";
import type { Task } from "@/types/Task";

export const useTasksStore = defineStore("tasks", () => {
	const tasks = ref<Task[]>([]);

	function addTasks(tasksArray: Task[]) {
		tasks.value.push(...tasksArray);
	}

	function removeTask(id: bigint): void {
		tasks.value = tasks.value.filter((tasks) => tasks.id !== id);
	}

	function detailTask(id: bigint): Task | null {
		const task = tasks.value.find((task) => task.id === id);
		if (!task) {
			return null;
		}
		return task;
	}

	function toggleCompletedTask(id: bigint): void {
		const task = tasks.value.find((task) => task.id === id);
		if (!task) {
			return;
		}
		task.completed = !task.completed;
	}

	return {
		tasks,
		addTasks,
		removeTask,
		detailTask,
		toggleCompletedTask,
	};
});
