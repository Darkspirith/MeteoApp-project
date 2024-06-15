<template>
  <!-- Bug report -->

  <div class="text-white bg-meteo-primary flex flex-col items-center">
    <h2 class="text-2xl mt-5 p-6">Zgłoś błąd</h2>
    <form @submit.prevent="submitIssue" class="lg:w-1/2 md:w-2/3 sm:w-4/5 xs:w-5/6">
      <div>
        <label for="issue" class="block py-3"
          >Opisz problem z działaniem aplikacji:</label
        >
        <textarea
          id="issue"
          v-model="form.issue"
          class="text-black border rounded p-4 w-full lg:h-40 md:h-40 sm:h-20 xs:h-20"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="email" class="block py-3"
          >Twój e-mail:
          <span class="text-xs pl-2">(opcjonalnie)</span>
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="text-black rounded p-4 lg:w-2/3 md:w-2/3 sm:w-2/3 xs:w-full"
        />
      </div>
   
      <div class="flex lg:justify-end md:justify-end sm:justify-center xs:justify-center">
        <button
          type="submit"
          class="rounded-lg bg-emerald-700 py-3 px-7 mt-6 mb-10 text-white hover:bg-meteo-tertiary duration-300"
        >
          Wyślij
        </button>
      </div>
    </form>
      <p
        v-if="submitted"
      class="lg:text-lg md:text-lg sm:text-lg xs:text-md text-center lg:py-6 md:py-6 sm:py-6 xs:py-0 px-20 mb-20 text-meteo-secondary"
      >
        Błąd został zgłoszony. Wkrótce zajmiemy się nim!
      </p>
    
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  issue: "",
  email: "",
});

const submitted = ref(false);

// Here I would have to send the data to the backend.

const submitIssue = () => {
  console.log(form);
  submitted.value = true;
};
</script>

<style scoped></style>
