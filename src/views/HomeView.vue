<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Wpisz nazwę miejscowości"
        class="py-2 px-1 w-full rounded bg-transparent border-b focus:border-meteo-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#00000]"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";

const searchQuery = ref("");
const queryTimeout = ref(null);

const getSearchResults = () => {
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      const result = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=&count=10&language=pl&format=json`)
    }
  }, 300);
};
</script>
