<template>
  <div class="bg-meteo-primary flex flex-col min-h-screen font-Lato">
    <Navigation class="sticky top-0 z-10" />
    <RouterView class="content-container flex-1" />
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
</script>

<style scoped></style>


