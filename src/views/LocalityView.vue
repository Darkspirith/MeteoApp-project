<template>
  <div>
    <Suspense>
      <AsyncLocalityView />
      <template #fallback>
        <p>Wczytywanie...</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncLocalityView from "../components/AsyncLocalityView.vue";
</script>


