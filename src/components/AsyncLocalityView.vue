<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Info banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-emerald-700 w-full text-center"
    >
      <p>Kliknij "+", aby zacząć śledzić pogodę dla tej miejscowości.</p>
    </div>

    <!-- Weather panel -->
    <div class="flex flex-col items-center text-white py-12">
      
      <h1 class="text-4xl mb-2">
        <!-- Location name. Also for location name with multiple parts -->
        {{ route.params.city }}
      </h1>
      
      <!-- Date -->
      <p class="text-sm mb-12">
        {{
          new Date(meteoData.currentTime)
            .toLocaleDateString("pl-PL", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
            .replace(/^[a-z]/, function (firstLetter) {
              return firstLetter.toUpperCase();
            })
        }}
        <span>r.</span>
        <span class="mx-1"></span>
        <!-- Time -->
        {{
          new Date(meteoData.currentTime).toLocaleTimeString("pl-PL", {
            hour: "2-digit",
            minute: "2-digit",
          })
        }}
      </p>

      <!-- Current temperature -->
      <p class="text-8xl mb-8">
        {{ Math.round(meteoData.current.temp) }} &degC
      </p>
      <p>
        Temperatura odczuwalna:
        {{ Math.round(meteoData.current.feels_like) }} &degC
      </p>
      <p class="first-letter:capitalize">
        {{ meteoData.current.weather[0].description }}
      </p>
      <img
        class="w-[150px] h-auto"
        :src="`http://openweathermap.org/img/wn/${meteoData.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Prognoza godzinowa:</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in meteoData.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleTimeString("pl-PL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="text-md">{{ Math.round(hourData.temp) }} &degC</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weather for the coming 7 days -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Prognoza 7-dniowa:</h2>
        <div
          v-for="(day, index) in meteoData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              index === 0
                ? "Dzisiaj"
                : index === 1
                ? "Jutro"
                : new Date(day.dt * 1000).toLocaleDateString("pl-PL", {
                    weekday: "long",
                  })
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />

          <div class="flex gap-2 flex-1 justify-end">
            <p>{{ Math.round(day.temp.min) }} &degC</p>
            <span>-</span>
            <p>{{ Math.round(day.temp.max) }} &degC</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

// Space for API token.
const openweathermapAPIKey = "";
const route = useRoute();
const getMeteoData = async () => {
  try {
    const meteoData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${openweathermapAPIKey}&units=metric&lang=pl`
    );

    // Current date and time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = meteoData.data.current.dt * 1000 + localOffset;
    meteoData.data.currentTime = utc + 1000 * meteoData.data.timezone_offset;

    // Hourly weather
    meteoData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * meteoData.data.timezone_offset;
    });
    return meteoData.data;
  } catch (err) {
    console.log(err);
  }
};
const meteoData = await getMeteoData();
const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  router.push({
    name: "home",
  });
};
</script>
