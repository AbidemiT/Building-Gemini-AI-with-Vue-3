<script setup>
import { ref } from 'vue';
import GeminiAI from './components/GeminiAI.vue';
import GeminiAITNI from './components/GeminiAITNI.vue';

const geminiOptions = ref('text');

</script>

<template>
  <header>
    <select v-model="geminiOptions">
      <option disabled value="">Please select one</option>
      <option value="text">Text</option>
      <option value="textImage">Text and Image</option>
      <option disabled>Chat (coming soon...)</option>
    </select>
  </header>
  <main>
    <KeepAlive>
      <GeminiAI v-if="geminiOptions === 'text'" />
      <GeminiAITNI v-else />
    </KeepAlive>
  </main>
</template>

<style scoped>
header,
main {
  max-width: 1280px;
  display: flex;
  justify-content: center;
  text-align: center;
}

header {
  margin-bottom: 20px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
