<script lang="ts" setup>
import { RouterView } from "vue-router";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
import Sonner from "@/components/ui/sonner/Sonner.vue";
</script>

<template>
    <Header />
    <main class="min-h-[84dvh] bg-background relative flex items-center gap-4">
        <RouterView />
        <Toaster />
        <Sonner />
    </main>
    <Footer />
</template>
