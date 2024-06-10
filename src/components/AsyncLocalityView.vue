<template>
  <div class="flex flex-col flex-1 items-center">

    <!-- Info banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-emerald-700 w-full text-center"
    >
      <p>
        Kliknij
        <span
          class="fa-solid fa-square-plus aria-hidden:'true' title:'Ikona - znak plus' fa-lg px-1"
        ></span
        >, aby zacząć śledzić pogodę dla tej miejscowości.
      </p>
    </div>

    <!-- Weather panel -->

    <div class="flex flex-col items-center text-white py-6 mt-4">
      <h1 class="text-4xl m-2">

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
        <span class="mr-2">r.</span>

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
        {{
          (Math.round(meteoData.current.temp * 2) / 2)
            .toFixed(1)
            .replace(".", ",")
            .replace(/,0*$/, "")
        }}
        &degC
      </p>
      <p class="text-lg mb-5">
        Temperatura odczuwalna:
        {{
          (Math.round(meteoData.current.feels_like * 2) / 2)
            .toFixed(1)
            .replace(".", ",")
            .replace(/,0*$/, "")
        }}
        &degC
      </p>

      <!-- Weather description and icon -->
      <p class="first-letter:capitalize">
        {{ meteoData.current.weather[0].description }}
      </p>
      <img
        class="w-[150px] h-auto"
        :src="`https://openweathermap.org/img/wn/${meteoData.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>

    <hr
      class="border-meteo-tertiary border-opacity-50 border-2 border-dashed w-full mt-2 mb-6"
    />

    <!-- Hourly weather -->
    <div
      class="lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm xs:w-screen-xs w-full mb-2 py-15"
    >
      <div class="mx-8 text-white">
        <h2 class=" text-lg py-4 mb-7">Prognoza godzinowa:</h2>
        <div class="flex gap-16 overflow-x-auto">
          <div
            v-for="hourData in meteoData.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-6 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleTimeString("pl-PL", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </p>

            <!-- Hourly weather icon -->
            <img
              class="w-auto h-auto max-w-[70px] object-contain"
              :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              :alt="hourData.weather[0].description"
            />

            <!-- Hourly temperature -->
            <p class="text-md mb-14">{{ Math.round(hourData.temp) }} &degC</p>
          </div>
        </div>
      </div>
    </div>

    <hr
      class="border-meteo-tertiary border-opacity-50 border-2 border-dashed w-full mt-6 mb-2"
    />

    <!-- Weather for the coming 7 days -->
    <div
      class="lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm xs:w-screen-xs w-full my-7"
    >
      <div class="mx-8 text-white">
        <h2 class="mb-3 text-lg py-4">Prognoza 7-dniowa:</h2>
        <table class="w-full">
          <tbody>
            <tr v-for="(day, index) in meteoData.daily" :key="day.dt">
              <td class="py-5">
                <p class="justify-start mr-2">

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

              <!-- Day weather description -->
              <td>
                <p class="first-letter:capitalize hidden sm:block">
                  {{ day.weather[0].description }}
                </p>
              </td>

              <!-- Day weather icon -->
              <td class="text-center">
                <img
                  :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
                  :alt="day.weather[0].description"
                  class="w-auto h-auto max-w-[60px] object-contain"
                />
              </td>
              <td>
                
                <!-- Min. and max. temperature -->
                <p class="text-end">
                  {{ Math.round(day.temp.min) }} &degC
                  <span class="px-2">-</span>
                  {{ Math.round(day.temp.max) }} &degC
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


    <!-- "Remove" / "Usuń" button -->
    <div
      class="flex items-center gap-2 p-4 mt-2 mb-10 text-white cursor-pointer duration-300 hover:text-red-400"
      @click="removeLocality"
    >
      <i
        class="fa-solid fa-minus-square fa-2xl aria-hidden='true' title='Usunąć tą miejscowość z zapisanych? Ikona - znak minus'"
      ></i>
      <p class="text-2xl">Usuń</p>
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
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=${openweathermapAPIKey}&units=metric&lang=pl`
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

// Get weather data
const meteoData = await getMeteoData();
const router = useRouter();

// Remove locality from local storage
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
