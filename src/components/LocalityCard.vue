<template>
  <div
    class="flex py-4 px-3 bg-meteo-tertiary rounded-xl hover:bg-emerald-700 cursor-pointer"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3 class="pt-1">{{ city.state }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">
        {{ Math.round(city.weather.main.temp) }} &degC
      </p>
      <div class="flex items-center">
        <span class="text-sm">
          Od:
          {{ Math.round(city.weather.main.temp_min) }} &degC
        </span>
        <span class="text-sm ml-2">
          do:
          {{ Math.round(city.weather.main.temp_max) }} &degC
        </span>
      </div>
    </div>
  </div>
</template>

<!-- this is used in TrackedLocalities -->
<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>
