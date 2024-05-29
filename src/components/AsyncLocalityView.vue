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
        <!-- Locality name -->
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
            .replace(/^[pwścsn]/, function (firstLetter) {
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
        {{ (Math.round(meteoData.current.temp * 2) / 2) }} &degC
      </p>
      <p>
        Temperatura odczuwalna:
        {{ Math.round(meteoData.current.feels_like * 2) / 2 }} &degC
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

    <!-- Hourly weather -->
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
        <table class="w-full">
          <tbody>
            <tr v-for="(day, index) in meteoData.daily" :key="day.dt">
              <td>
                <p class="justify-start">

                  <!-- Week -->
                  {{
                    index === 0
                      ? "Dzisiaj"
                      : index === 1
                      ? "Jutro"
                      : new Date(day.dt * 1000)
                          .toLocaleDateString("pl-PL", {
                            weekday: "long",
                          })
                          .replace(/^[pwścsn]/, function (firstLetter) {
                            return firstLetter.toUpperCase();
                          })
                  }}
                </p>
              </td>
              <td class="p-2">
                <p class="text-sm mr-2 first-letter:capitalize">
                  {{ day.weather[0].description }}
                </p>
              </td>
              <td class="p-2">
                <img
                  class="w-[50px] h-[50px] object-cover"
                  :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
                  alt=""
                />
              </td>
              <td>

                <!-- Min. and max. temperature -->
                <p class="text-center">
                  {{ Math.round(day.temp.min) }} &degC
                  <span class="px-2">-</span
                  >{{ Math.round(day.temp.max) }} &degC
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- "Remove" button -->
    <div
      class="flex items-center gap-2 py-12 text-white cursor-pointer duration-300 hover:text-red-400"
      @click="removeLocality"
    >
      <i
        class="fa-solid fa-minus-square fa-xl aria-hidden='true' title='Usunąć tą miejscowość z zapisanych?'"
      ></i>
      <p>Usuń</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

// Enter OpenWeatherMap API token
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
const removeLocality = () => {
  const localities = JSON.parse(localStorage.getItem("savedLocalities"));
  const updatedLocalities = localities.filter(
    (city) => city.id !== route.query.id
  );
  localStorage.setItem("savedLocalities", JSON.stringify(updatedLocalities));
  router.push({
    name: "home",
  });
};
</script>

