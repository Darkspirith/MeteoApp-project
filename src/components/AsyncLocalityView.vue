<template>
  <div></div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const getMeteoData = async () => {
  try {
    const MeteoData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=&units=metric`
    );

    // Current date and time
    const offset = new Date().getTimezoneOffset() * 60000;
    const utc = meteoData.data.current.dt * 1000 + offset;
    meteoData.data.currentTime =
      utc + 1000 * meteoData.data.timezone_offset;

    // Hourly weather
    meteoData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
        utc + 1000 * meteoData.data.timezone_offset;
    });




return MeteoData;
  } catch (err) {
    console.log(err);
  }
};
const meteoData = await getMeteoData();
console.log(meteoData);
</script>
