<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Wpisz nazwę miejscowości..."
        class="py-2 px-5 w-full rounded-lg bg-transparent border focus:border-meteo-secondary focus:outline"
      />
      <ul
        class="absolute rounded-md bg-emerald-900 text-white w-full shadow-md py-2 px-1 top-[72px]"
        v-if="geocodingResults"
      >
        <p v-if="searchError">
          Brak wyników. Hmm... Coś poszło nie tak. Spróbuj ponownie.
        </p>
        <p v-if="!serverError && geocodingResults.length === 0">
          Niestety, nie znaleziono rezultatów dla podanej lokalizacji. Spróbuj
          podać inną.
        </p>
        <template v-else>
          <li
            v-for="searchResult in geocodingResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewLocality(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const previewLocality = (searchResult) => {
  const [locality, region] = searchResult.place_name.split(",");
  router.push({
    name: "LocalityView",
    params: { state: region.replaceAll(" ", ""), city: locality },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

// Space for API token.
const mapboxAPIKey = "";

const searchQuery = ref("");
const queryTimeout = ref(null);
const geocodingResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&limit=10&types=place&language=pl`
        );
        geocodingResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }

      return;
    }
    geocodingResults.value = null;
  }, 320);
};
</script>

<style lang="scss" scoped></style>
