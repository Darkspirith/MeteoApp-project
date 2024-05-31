 <template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="fixed inset-0 flex items-center justify-center bg-black/80 mt-1"
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="rounded-lg p-5 bg-neutral-700 self-start max-w-screen-md mx-3 lg:mt-32 md:mt-32 sm:mt-5 overflow-auto"
          >
            <slot />
            <button
              class="mt-8 text-md rounded-lg bg-emerald-700 py-3 px-8 text-white hover:bg-meteo-tertiary duration-300"
              @click="$emit('close-modal')"
            >
              Zamknij
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.35s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.35s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.16s;
}

.modal-inner-leave-active {
  transition: all 0.35s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.7);
}

.modal-inner-leave-to {
  transform: scale(1);
}
</style>
