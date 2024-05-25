<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults.value"
        placeholder="Wpisz nazwę miejscowości..."
        class="py-2 px-5 w-full rounded-lg bg-transparent border focus:border-meteo-secondary focus:outline "
      />
      <ul
        class="absolute bg-emerald-900 text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <li
          v-for="searchResult in geocodingResults"
          :key="searchResult.id"
          class="py-2 cursor-pointer"
        ></li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const searchQuery = ref("");
const queryTimeout = ref(null);
const geocodingResults = ref(null);

const getSearchResults = () => {
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      const result = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery.value}&count=20&language=en&format=json`
      );
      geocodingResults.value = result.data.features;
      console.log(geocodingResults.value);
      return;
    }
    geocodingResults.value = null;
  }, 300);
};
</script>
