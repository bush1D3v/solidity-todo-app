<script lang="ts" setup>
import Image from "@/tags/Image.vue";
import RouterLink from "@/tags/RouterLink.vue";
</script>

<template>
    <header class="layout flex justify-between px-8 items-center min-w-full border-b">
        <RouterLink to="/" class="hover:opacity-50 ease-in-out duration-150">
            <Image src="/logo.svg" alt="Logo" width="40" height="40" />
        </RouterLink>
    </header>
</template>
