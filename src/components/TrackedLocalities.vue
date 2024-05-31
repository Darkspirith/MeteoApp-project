<template>
  <div v-for="city in savedLocalities" :key="city.id">
    <LocalityCard :city="city" @click="goToLocalityView(city)" />
  </div>

  <!-- If there are no saved localities :( -->
  <p
    v-if="savedLocalities.length === 0"
    class="text-center text-lg py-10 my-10"
  >
    Wygląda na to, że nie masz zapisanych lokalizacji. Czas to zmienić!
  </p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import LocalityCard from "./LocalityCard.vue";


// Enter OpenWeatherMap API token
const openweathermapAPIKey = "";

const savedLocalities = ref([]);

const getLocalities = async () => {
  if (localStorage.getItem("savedLocalities")) {
    savedLocalities.value = JSON.parse(localStorage.getItem("savedLocalities"));

    const requests = [];
    savedLocalities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${openweathermapAPIKey}&units=metric&lang=pl`
        )
      );
    });

    const meteoData = await Promise.all(requests);

    meteoData.forEach((value, index) => {
      savedLocalities.value[index].weather = value.data;
    });
  }
};
await getLocalities();

const router = useRouter();

const goToLocalityView = (city) => {
  router.push({
    name: "LocalityView",
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
    },
  });
};
</script>
