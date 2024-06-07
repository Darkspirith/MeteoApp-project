<template>
  <div
    class="flex flex-col p-4 bg-meteo-tertiary rounded-xl hover:bg-emerald-700 lg:w-screen-lg md:w-screen-md sm:w-screen-sm xs:w-screen-xs cursor-pointer"
  >
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-col">
        <h2 class="text-3xl py-1">{{ city.city }}</h2>
        <h3 class="py-1">{{ city.state }}</h3>
      </div>
      <div class="flex flex-col items-end">
        <p class="text-3xl py-2">
          {{ Math.round(city.weather.main.temp) }} &degC
        </p>
        <p class="text-sm text-right py-1">
          {{ Math.round(city.weather.main.temp_min) }} &degC
         <span class="mx-1">-</span>
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
