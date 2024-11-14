<script>
import insert from "@/services/tasks/insert";

export default {
    name: "CreateTask",
    data() {
        return {
            name: "",
            description: "",
            loading: false,
            error: null,
        };
    },
    methods: {
        async handleSubmit() {
            this.loading = true;
            this.error = null;

            try {
                await insert(this.name, this.description, this.$router);
                this.name = "";
                this.description = "";
            } catch (err) {
                this.error = "Failed to create task";
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<template>
    <form @submit.prevent="handleSubmit" class="task-form">
        <div class="form-group">
            <label for="name">Task Name:</label>
            <input type="text" id="name" v-model="name" required placeholder="Enter task name" />
        </div>
        <div class="form-group">
            <label for="description">Task Description:</label>
            <textarea id="description" v-model="description" required placeholder="Enter task description"></textarea>
        </div>
        <button type="submit" :disabled="loading" class="submit-button">
            {{ loading ? 'Creating...' : 'Create Task' }}
        </button>
        <p v-if="error" class="error-message">{{ error }}</p>
    </form>
</template>

<style scoped>
.task-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #000000;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    color: #000;
    border-radius: 4px;
    box-sizing: border-box;
}

.submit-button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.error-message {
    color: red;
    margin-top: 10px;
}
</style>
