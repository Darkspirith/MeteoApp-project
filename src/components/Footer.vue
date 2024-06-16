<template>
  <footer
    class="text-white bg-meteo-primary"
    style="box-shadow: 0 3px 9px 0 rgba(233, 233, 233, 1)"
  >
    <div
      class="flex justify-center text-center lg:text-base md:text-sm sm:text-xs xs:text-xs p-3"
    >
      <p class="lg:pr-20 md:pr-12 sm:pr-7 xs:pr-3">
        Made with
        <i
          class="fa-solid fa-heart aria-hidden:true title='love' text-meteo-secondary hover:text-red-700 duration-700 px-1"
        >
          <span class="sr-only">love</span>
        </i>
        in Bytom
      </p>
      <p class="lg:pr-20 md:pr-12 sm:pr-7 xs:pr-3">
        Dane pogodowe dostarcza
        <a class="font-bold" href="https://openweathermap.org/" target="_blank"
          >OpenWeatherMap</a
        >
      </p>
      <p class="lg:pr-20 md:pr-12 sm:pr-7 xs:pr-3">
        Geokodowanie napędza
        <a class="font-bold" href="http://mapbox.com/about/maps" target="_blank"
          >Mapbox</a
        >
      </p>
      <p>
        <a
          class="hover:text-orange-400 duration-300 cursor-pointer"
          :class="{ 'text-orange-400': $route.name === 'BugReportView' }"
          @click="router.push({ name: 'BugReportView' })"
        >
          Zgłoś błąd
          <i
            class="fa-solid fa-bug aria-hidden:true title='Czy chcesz zgłosić błąd? Ikona - bug' px-1"
          ></i>
        </a>
      </p>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
