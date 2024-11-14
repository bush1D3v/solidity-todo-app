<script>
import getTasks from "@/services/tasks/getList";
import RouterLink from "@/tags/RouterLink.vue";
import { useTasksStore } from "@/stores/TasksStore";

export default {
    name: "Home",
    data() {
        return {
            loading: true,
            tasks: useTasksStore().tasks,
        };
    },
    async beforeMount() {
        const tasks = await getTasks();
        useTasksStore().addTasks(tasks);
        this.loading = false;
    },
};
</script>

<template>
    <ul class="container flex flex-col justify-center gap-4">
        <p v-if="loading">Loading...</p>
        <li v-else v-for="task in tasks" :key="task.id.toString()">
            {{ task.name }}
            {{ task.description }}
        </li>
        <button>
            <RouterLink to="/tasks/create">Create Task</RouterLink>
        </button>
    </ul>
</template>
