<template>
  <div class="w-full max-w-xl p-4 bg-white rounded-lg shadow-lg">
    <div class="flex w-full">
      <input
          v-model="locationSearchQuery"
          @keyup.enter="searchLocation"
          type="text"
          ref="inputRef"
          placeholder="Search Location..."
          class="w-full px-4 py-2 mr-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
      <div @click="searchLocation" class="flex items-center justify-center border rounded-lg w-10 h-10 hover:cursor-pointer">
        <Icon v-if="isLoading" size="24px" name="eos-icons:loading" style="color: black" />
        <Icon v-else size="24px" name="material-symbols:search" style="color: black" />
      </div>
    </div>
    <div :class="locationList.length===0?'h-0':'h-fit'" class="flex flex-col w-full mt-2">
      <div v-for="(location, index) in locationList" :key="index" @click="selectLocation(index)"
           class="p-2 mt-2 border rounded-lg hover:cursor-pointer hover:bg-green-200 active:bg-green-500">
        <span>{{location.title}}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:location']);

const isLoading = ref(false);
const locationSearchQuery = ref("");
const locationList = ref([]);
const inputRef = ref(null);

const focusInput = async () => {
  await nextTick()
  inputRef.value?.focus();
}

const searchLocation = async () => {
  isLoading.value = true;
  $fetch(`/api/here?location_query=${locationSearchQuery.value}`)
      .then(res => {
        locationList.value = res.items;
      })
      .finally(() => {isLoading.value = false});
}

const selectLocation = async (key: number) => {
  console.log(locationList.value[key]);
  localStorage.setItem("location", JSON.stringify(locationList.value[key]));
  emit("update:location", locationList.value[key]);
}

defineExpose({
  focusInput
})
</script>

<style scoped>

</style>