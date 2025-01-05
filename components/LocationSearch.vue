<template>
  <div class="w-full max-w-xl p-4 bg-white rounded-lg shadow-lg">
    <div class="flex w-full">
      <input
          v-model="locationSearchQuery"
          type="text"
          placeholder="Search Location..."
          class="w-full px-4 py-2 mr-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
      <div @click="searchLocation" class="flex items-center justify-center border rounded-lg w-10 h-10 hover:cursor-pointer">
        <Icon name="line-md:search-twotone" style="color: black" />
      </div>
    </div>
    <div class="flex flex-col w-full mt-2">
      <div v-for="(location, index) in locationList" :key="index" @click="selectLocation(index)" class="px-2 py-1 mt-2 border rounded-lg hover:cursor-pointer hover:bg-green-200 active:bg-green-500">
        <span>{{location.title}}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['location']);
const emit = defineEmits(['update:location']);

const locationSearchQuery = ref("");
const locationList = ref([]);

const searchLocation = async () => {
  const res = await $fetch(`/api/here?location_query=${locationSearchQuery.value}`)
  console.log(res)
  locationList.value = res.items;
}

const selectLocation = async (key: number) => {
  console.log(locationList.value[key]);
  localStorage.setItem("location", JSON.stringify(locationList.value[key]));
  emit("update:location", locationList.value[key]);
}
</script>

<style scoped>

</style>