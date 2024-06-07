<template>
  <div
    class="flex py-4 px-4 bg-meteo-tertiary rounded-xl hover:bg-emerald-700 lg:w-screen-lg md:w-screen-md sm:w-screen-sm xs:w-screen-xs cursor-pointer"
  >
    <div class="flex flex-col flex-1 ">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3 class="m-1">{{ city.state }}</h3>
    </div>
    <div class="flex flex-col">
      <p class="text-3xl self-end">
        {{ Math.round(city.weather.main.temp) }} &degC
      </p>
      <div class="flex lg:flex-row md:flex-row sm:flex-row xs:flex-col">
        <p class="text-sm mr-1">
          Od:
          {{ Math.round(city.weather.main.temp_min) }} &degC
        </p>
        <p class="text-sm lg:first-letter:lowercase md:first-letter:lowercase sm:first-letter:lowercase xs:first-letter:uppercase">
          do:
          {{ Math.round(city.weather.main.temp_max) }} &degC
        </p>
      </div>
    </div>
  </div>
</template>
 
<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>
