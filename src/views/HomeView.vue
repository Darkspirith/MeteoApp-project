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
            @click="previewLocation(searchResult)"
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


// Space for API token.

const mapboxAPIKey = "";

const router = useRouter();


//  Cleans a search query by replacing diacritical characters with their non-diacritical counterparts.
 
const cleanSearchQuery = (query) => {
  const diacriticsMapping = {
    "ą": "a",
    "ć": "c",
    "ę": "e",
    "ł": "l",
    "ń": "n",
    "ó": "o",
    "ś": "s",
    "ź": "z",
    "ż": "z",
  };

  const regex = /[ąćęłńóśźż]/g;
  return query.replace(regex, (match) => diacriticsMapping[match]);
};


const previewLocation = (searchResult) => {
  const cleanedCity = cleanSearchQuery(searchResult.place_name.split(",")[0]);
  const cleanedState = cleanSearchQuery(searchResult.place_name.split(",")[1]);

  router.push({
    name: "LocalityView",
    params: { state: cleanedState.replaceAll(" ", ""), city: cleanedCity.replaceAll(" ", "") },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};
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
