<template>
  
  <!-- Bug report -->

  <div class="text-white bg-meteo-primary flex flex-col items-center">
    <h2 class="text-2xl mt-5 p-5">Zgłoś błąd</h2>
    <form @submit.prevent="submitIssue" class="max-w-lg">
      <div class="mb-4">
        <label for="issue" class="block py-3"
          >Opisz problem z działaniem aplikacji:</label
        >
        <textarea
          id="issue"
          v-model="form.issue"
          class="text-black border rounded p-4"
          cols="30"
          rows="5"
          required
        ></textarea>
      </div>

      <div class="mb-4">
        <label for="email" class="block py-3"
          >Twój e-mail:<span class="text-xs pl-2">(opcjonalnie)</span></label
        >
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="text-black rounded p-4 w-full"
          cols="30"
        />
      </div>

      <button
        type="submit"
        class="text-md rounded-lg bg-emerald-700 py-3 px-7 mt-8 mb-10 text-white hover:bg-meteo-tertiary duration-300"
      >
        Wyślij
      </button>
    </form>
    <p v-if="submitted" class="mt-10 text-meteo-secondary">
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
