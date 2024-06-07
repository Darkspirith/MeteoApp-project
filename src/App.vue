<template>
  <div class="bg-meteo-primary flex flex-col min-h-screen font-Lato">
    <Navigation class="sticky top-0 z-10" />
    <div class="overflow-auto flex-grow">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
</script>

<style lang="scss" scoped></style>


