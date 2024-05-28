<template>
  <header class="sticky top-0 bg-meteo-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-9"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-4 flex-1">
          <i class="fa-solid fa-cloud-sun aria-hidden='true' fa-2xl"></i>
          <span class="text-4xl text-meteo-secondary">MeteoApp</span>
          <i class="fa-solid fa-temperature-half aria-hidden='true' fa-2xl"></i>
        </div>
      </RouterLink>

      <div class="flex gap-5 flex-1 justify-end">
        <i
          class="fa-solid fa-question aria-hidden='true' title='Jak korzystać z aplikacji?' fa-2xl text-gray-300 hover:text-yellow-500 hover:scale-110 duration-300 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-square-plus aria-hidden='true' title='Zapisać tą miejscowość?' fa-2xl text-white hover:text-meteo-secondary hover: duration-300 cursor-pointer"
        ></i>
      </div>

      <ModalWindow :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-white">
          <h1 class="text-xl mt-2 mb-7">
            <span class="text-meteo-secondary">MeteoApp</span> pozwala na
            śledzenie obecniej i prognozowanej pogody dla wybranych
            miejscowości.
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
              ikonkę <i class="fa-solid fa-square-plus aria-hidden:'true' title:'Na ikonie widnieje znak plus' fa-lg px-1"></i> w prawym górnym rogu. Dane pogodowe dla wybranego
              miejsca będą teraz zawsze na wyciągnięcie ręki. Znajdziesz je na
              stronie głównej.
            </li>
          </ol>

          <h3 class="text-xl mt-5 mb-2">Jak usunąć zapisaną miejscowość?</h3>
          <p>
            Kliknij na wybraną zapisaną miejscowość. Na dole strony znajdziesz
            przycisk "Usuń".
          </p>
        </div>
      </ModalWindow>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import ModalWindow from "./ModalWindow.vue";

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
