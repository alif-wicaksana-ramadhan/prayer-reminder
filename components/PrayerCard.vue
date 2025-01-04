<template>
  <div class="bg-white shadow-md rounded-lg p-4 mb-4">
    <h2 class="text-lg font-semibold">{{ name }}</h2>
    <p class="text-gray-600">{{ time }}</p>
    <input type="checkbox" value="Option A" v-model="isChecked" :checked="isChecked" @change="emit('update:checked', isChecked)" />
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

const updateVal = () => {
  ;
}
</script>

<style scoped></style>
