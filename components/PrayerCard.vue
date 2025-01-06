<template>
  <div
      class="flex justify-between bg-white shadow-md rounded-lg p-4 mb-4 hover:cursor-pointer"
      @click="toggleCheck"
  >
    <h2 class="text-lg font-semibold">{{ name }}</h2>
    <div class="flex min-w-24 justify-between items-center">
      <p class="text-lg font-semibold text-gray-600 p-0 m-0">{{ time }}</p>
      <!-- Hidden checkbox -->
      <input
          type="checkbox"
          v-model="isChecked"
          class="hidden"
      />
      <!-- Conditional icons -->
      <Icon v-if="isChecked" size="30px" name="ix:alarm-bell-filled" style="color: black" />
      <Icon v-else size="30px" name="ix:alarm-bell-cancelled-filled" style="color: black" />
    </div>
  </div>
</template>

<script setup lang="ts">
// const props = defineProps({
//   name: String,
//   time: String,
//   isChecked: Boolean,
// });

const props = defineProps(["name", "time", "checked"]);
const emit = defineEmits(["update:checked"]);

const isChecked = ref(props.checked);

const toggleCheck = () => {
  isChecked.value = !isChecked.value;
  emit("update:checked", isChecked.value);
}

</script>

<style scoped></style>
