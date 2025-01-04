<template>
  <div class="flex flex-col justify-between max-w-2xl mx-auto h-screen bg-green-100">
    <div class="bg-green-900 text-white p-4 w-full">
      <h1 class="text-2xl font-bold">Prayer Alif Top</h1>
    </div>

    <slot />

    <div class="bg-green-900 text-white p-4 w-full">
      <p class="text-center">&copy; 2025 Prayer Reminder</p>
    </div>
<!--    <NuxtSnackbar />-->
  </div>
</template>
<script setup lang="ts">
</script>