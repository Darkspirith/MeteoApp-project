<template>
  <div
    class="flex py-6 px-3 mt-2 bg-meteo-tertiary rounded-xl shadow-md cursor-pointer"
  >  
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">
        {{ Math.round(city.weather.main.temp) }} &degC
      </p>
      <div class="flex gap-2">
        <span class="text-xs">
          Od:
          {{ Math.round(city.weather.main.temp_min) }} &degC
        </span>
        <span class="text-xs">
          do:
          {{ Math.round(city.weather.main.temp_max) }} &degC
        </span>
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