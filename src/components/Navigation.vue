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
          <i class="fa-solid fa-temperature-half fa-2xl"></i>
        </div>
      </RouterLink>

      <div class="flex gap-5 flex-1 justify-end">
        <!-- zrobic accesibility -->
        <i
          class="fa-solid fa-lightbulb fa-xl text-gray-300 hover:text-yellow-500 duration-150 cursor-pointer"
        ></i>
        <i
          class="fa-solid fa-square-plus fa-2xl text-white hover:text-meteo-secondary duration-150 cursor-pointer"
        ></i>
      </div>

      <ModalWindow>
        <div class="text-white">
          <h1 class="text-xl mt-2 mb-7">
            <span class="text-meteo-secondary">MeteoApp</span> pozwala na śledzenie obecniej i prognozowanej pogody dla
            wybranych miejscowości.
        </h1>
          <h2 class="text-2xl mb-3">Jak to działa?</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Znajdź wybraną miejscowość, wpisując jej nazwę w pasek
              wyszukiwania.
            </li>
            <li>
              Po wybraniu miejscowości otrzymasz dane pogodowe dla tej
              lokalizacji.
            </li>
            <li>
              Możesz zapisać wybrane miejscowości. Wystarczy, że klikniesz
              iknonę "+" w prawym górnym rogu. Dane pogodowe dla wybranego miejsca
              będzą od teraz na wyciągnięcie ręki. Znajdziesz je na stronie główn
            </li>
          </ol>

          <h2 class="text-2xl">Jak usunąć zapisaną miejscowość?</h2>
          <p></p>
        </div>
      </ModalWindow>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import ModalWindow from "./ModalWindow.vue";
</script>
