<script>
import getDetail from "@/services/tasks/getDetail";

export default {
    name: "DetailTask",
    data() {
        return {
            name: "",
            description: "",
            task: null,
            loading: false,
            error: null,
        };
    },
    async beforeMount() {
        this.loading = true;
        this.error = null;

        const id = this.$route.params.id;

        try {
            const task = await getDetail(id);
            this.task = task;
        } catch (err) {
            this.error = "Failed to detail task";
        } finally {
            this.loading = false;
        }
    },
};
</script>

<template>
    <section class="container flex flex-col justify-center items-center">
        <p v-if="task">Task Name: {{ task.name }}</p>
        <p v-if="task">Task Description: {{ task.description }}</p>
        <p v-if="loading">Loading...</p>
        <p v-if="error" class="error-message">{{ error }}</p>
    </section>
</template>
