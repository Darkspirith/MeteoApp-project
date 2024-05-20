<template>
  <header class="sticky top-0 bg-meteo-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-9"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-4 flex-1"> 
          <!-- zrobic accesibility -->
          <i class="fa-solid fa-cloud-sun fa-2xl"></i>
          <p class="text-4xl text-meteo-secondary">MeteoApp</p>
          <i class="fa-solid fa-temperature-half fa-2xl "></i>
        </div>
      </RouterLink>

      <div class="flex gap-5 flex-1 justify-end">
            <!-- zrobic accesibility -->
        <i class="fa-solid fa-lightbulb fa-xl text-gray-300 hover:text-yellow-500 duration-150 cursor-pointer" ></i>
        <i class="fa-solid fa-square-plus fa-2xl text-white hover:text-meteo-secondary duration-150 cursor-pointer"></i>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
