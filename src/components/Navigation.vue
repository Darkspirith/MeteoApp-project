<template>
  <header class="sticky top-0 bg-meteo-primary shadow-emerald-900 shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-9"
    >
      <RouterLink
        :to="{ name: 'home' }"
        role="link"
        aria-label="Strona główna"
        class="hover:scale-105 duration-500"
      >

      <!-- Logo -->
        <div class="flex items-center gap-3 flex-1">
          <i
            class="fa-solid fa-cloud-sun aria-hidden='true' fa-2xl"
            aria-hidden="true"
          />
          <p
            class="text-4xl text-meteo-secondary"
            aria-label="MeteoApp - aplikacja pogodowa"
          >
            MeteoApp
          </p>
          <i
            class="fa-solid fa-temperature-half aria-hidden='true' fa-2xl"
            aria-hidden="true"
          />
        </div>
      </RouterLink>

      <!-- Nav buttons -->
      <div
        class="flex flex-1 justify-end gap-7 lg:pt-0 md:pt-0 sm:pt-5 xs:pt-5 lg:pr-2 md:pr-2 sm:pr-0 xs:pr-0"
      >
        <i
          class="fa-solid fa-question aria-hidden='true' title='Jak korzystać z aplikacji? Ikona - znak zapytania'
           fa-2xl text-gray-300 hover:text-yellow-500 hover:scale-110 duration-300 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-square-plus aria-hidden='true' title='Zapisać tą miejscowość? Ikona - znak plus'
           fa-2xl text-white hover:text-meteo-secondary duration-300 cursor-pointer"
          @click="addLocality"
          v-if="route.query.preview"
        ></i>
      </div>

      <ModalWindow :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-white">
          <h1 class="text-xl mt-2 mb-7">
            <span class="text-meteo-secondary">MeteoApp</span> pozwala na
            śledzenie obecnej i prognozowanej pogody.
          </h1>
          <h2 class="text-2xl mb-3">Jak to działa?</h2>
          <ol class="list-decimal list-inside">
            <li class="mb-1">
              Znajdź wybraną miejscowość, wpisując jej nazwę w pasek
              wyszukiwania.
            </li>
            <li class="mb-1">
              Po wybraniu miejscowości otrzymasz dane pogodowe dla tej
              lokalizacji.
            </li>
            <li class="mb-1">
              Możesz zapisać wybrane miejscowości. Wystarczy, że klikniesz
              ikonkę
              <i
                class="fa-solid fa-square-plus aria-hidden:'true' title:'Ikona - znak plus' fa-lg px-1"
              ></i>
              w prawym górnym rogu. Dane pogodowe dla wybranego miejsca będą
              teraz zawsze na wyciągnięcie ręki. Znajdziesz je na stronie
              głównej. Klikając w logo
              <span class="text-meteo-secondary">MeteoApp</span> powrócisz do
              niej.
            </li>
          </ol>

          <h3 class="text-xl mt-6 mb-2">Jak usunąć zapisaną miejscowość?</h3>
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
import { RouterLink, useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { uid } from "uid";
import ModalWindow from "./ModalWindow.vue";

const savedLocalities = ref([]);
const route = useRoute();
const router = useRouter();

// Add localities to localStorage
const addLocality = () => {
  if (localStorage.getItem("savedLocalities")) {
    savedLocalities.value = JSON.parse(localStorage.getItem("savedLocalities"));
  }
  const localityObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };
  savedLocalities.value.push(localityObj);
  localStorage.setItem(
    "savedLocalities",
    JSON.stringify(savedLocalities.value)
  );
  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = localityObj.id;
  router.replace({ query });
};

const modalActive = ref(null);

// Modal window
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
