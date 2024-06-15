<template>
  <div
    class="flex flex-col py-3 px-4 bg-meteo-tertiary rounded-xl hover:bg-emerald-700 cursor-pointer"
  >
    <div class="flex flex-row justify-between items-center">
      <div class="flex flex-col">
        <h2 class="lg:text-3xl md:text-3xl sm:text-xl xs:text-xl py-1">
          {{ city.city }}
        </h2>
        <h3 class="lg:text-md md:text-md sm:text-sm xs:text-sm">
          {{ city.state }}
        </h3>
      </div>
      <div class="flex flex-col items-end">
        <p class="lg:text-3xl md:text-3xl sm:text-2xl xs:text-2xl py-2">
          {{ Math.round(city.weather.main.temp) }} &degC
        </p>
        <p class="text-sm text-right py-1 min-w-[100px]">
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
