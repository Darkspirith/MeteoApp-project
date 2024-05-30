<template>
  <div class="bg-meteo-primary flex flex-col min-h-screen font-Lato">
    <Navigation />
    <div class="flex-grow">
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


