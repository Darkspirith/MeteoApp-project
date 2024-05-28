<template>
  <div>
    <Suspense>
      <AsyncLocalityView />
      <template #fallback>
        <p class="text-white text-center text-md py-4">Wczytywanie...</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncLocalityView from "../components/AsyncLocalityView.vue";
</script>


