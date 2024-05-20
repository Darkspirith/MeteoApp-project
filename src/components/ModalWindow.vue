<template>
  <div class="absolute w-full bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
    <div class="p-4 rounded bg-neutral-700 self-start mt-32 max-w-screen-md">
        <slot />
        <button class="text-white mt-8 bg-meteo-secondary py-2 px-6">Zamknij</button>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
