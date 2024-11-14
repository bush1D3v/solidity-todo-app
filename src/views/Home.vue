<script lang="ts" setup>
import getTasks from "@/services/tasks/getList";
import { onBeforeMount, ref } from "vue";
import { useTasksStore } from "@/stores/TasksStore";

const tasks = useTasksStore().tasks;
const loading = ref(true);

onBeforeMount(async () => {
    const tasks = await getTasks();
    useTasksStore().addTasks(tasks);
    loading.value = false;
})
</script>

<template>
    <ul class="container flex flex-col gap-4">
        <p v-if="loading">Loading...</p>
        <li v-else v-for="task in tasks" :key="task.id.toString()">
            {{ task.name }}
            {{ task.description }}
        </li>
    </ul>
</template>
