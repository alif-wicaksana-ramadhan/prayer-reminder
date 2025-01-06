<template>
  <div class="h-screen w-screen flex justify-center items-center bg-sky-400 transition-colors duration-1000" :class="{ 'bg-sky-900': isNight }">
    <div class="relative w-full h-full overflow-hidden">
      <!-- Sun -->
      <div
          class="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-400 rounded-full shadow-lg transition-all duration-1000"
          :class="{ 'translate-y-[200%] opacity-0': isNight, '-translate-x-1/2 -translate-y-1/2 opacity-100': !isNight }"
      ></div>

      <!-- Moon -->
      <div
          class="absolute top-1/2 left-1/2 w-24 h-24 bg-gray-300 rounded-full shadow-lg transition-all duration-1000"
          :class="{ '-translate-y-1/2 opacity-100': isNight, 'translate-y-[-200%] opacity-0': !isNight }"
      ></div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const isNight = ref(false);

onNuxtReady(() => {
// Toggle day and night every 5 seconds
setInterval(() => {
  isNight.value = !isNight.value;
}, 1000);
})
</script>


<style scoped>

</style>