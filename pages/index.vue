<template>
  <div>
    <div class="flex flex-col py-8 px-4 max-w-[50%]">
      <span class="text-6xl font-bold mt-2">{{currentPrayer}}</span>
<!--      <span class="text-2xl text-center font-bold mt-2 text-gray-600">{{eta}} to {{nextPrayer}}</span>-->
      <div @click="showChangeLocationModal" class="flex mt-4 items-center hover:cursor-pointer">
        <Icon size="40px" name="ix:alarm-bell-filled" style="color: black" />
        <span class="text-xl font-bold ml-2 mt-2">{{ currentLocation.title }}</span>
      </div>
    </div>
<!--    <div class="w-l m-4 mt-[60px] bg-gray-200 rounded-full h-2">-->
<!--      <div class="bg-green-900 h-2 rounded-full" style="width: 90%;"></div>-->
<!--    </div>-->
    <div class="bg-yellow-400 mt-14 pt-2 w-full h-full rounded-t-full">
      <div class="bg-green-400 w-full h-full pt-16 rounded-t-full">
        <div class="flex flex-col w-full items-center justify-center content-center">
          <span class="text-center w-fit text-sm px-2 py-1 mt-2 rounded border bg-white">{{day}}</span>
          <div class="flex flex-col justify-center items-center my-4">
            <span class="text-center w-fit py-2 text-xl font-bold">{{formattedDate}}</span>
            <span class="text-center w-fit py-2 text-xl font-bold text-orange-500">{{formattedHijriDate}}</span>
          </div>
        </div>
<!--        <div class="p-4">-->
<!--          <div v-if="isSupported" class="text-center">-->
<!--            Latitude: {{ coords.latitude }}-->
<!--            Longitude: {{ coords.longitude }}-->
<!--          </div>-->
<!--          <div v-else class="text-center bg-white w-1/2 mx-auto p-4 rounded-xl">-->
<!--            Geolocation is not supported or not permitted by your browser.-->
<!--          </div>-->
<!--        </div>-->
        <div class="mt-2 pt-14 pb-10 px-16">
          <PrayerCard name="Fajr" :time="todayPrayers.fajr.time" v-model:checked="todayPrayers.isha.reminder" />
          <PrayerCard name="Dhuhr" :time="todayPrayers.dhuhr.time" v-model:checked="todayPrayers.isha.reminder" />
          <PrayerCard name="Asr" :time="todayPrayers.asr.time" v-model:checked="todayPrayers.isha.reminder" />
          <PrayerCard name="Maghrib" :time="todayPrayers.maghrib.time" v-model:checked="todayPrayers.isha.reminder" />
          <PrayerCard name="Isha" :time="todayPrayers.isha.time" v-model:checked="todayPrayers.isha.reminder" />
        </div>
      </div>
    </div>

    <div v-show="isLocationModalShow" @click.self="isLocationModalShow=false" class="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-10">
      <LocationSearch
          v-model:location="currentLocation"
          @update:location="isLocationModalShow=false"
          ref="locationSearchRef"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import moment from "moment-hijri";
import LocationSearch from "~/components/LocationSearch.vue";

const runtimeConfig = useRuntimeConfig()
// const { coords, isSupported } = useGeolocation();

const locationSearchRef = ref(null);
const nextPrayer = ref("Unknown");
const currentTime = ref("00:00");
const day = ref("Today");
const currentDateTime = ref("");
const currentLocation = ref({});
const isLocationModalShow = ref(false);

const todayPrayers = ref({
  fajr: {
    time: null,
    reminder: false,
  },
  dhuhr: {
    time: null,
    reminder: false,
  },
  asr: {
    time: null,
    reminder: false,
  },
  maghrib: {
    time: null,
    reminder: false,
  },
  isha: {
    time: null,
    reminder: false,
  }
})

onMounted(async () => {
  const now = new Date();
  currentDateTime.value = now.toLocaleString();

  const localPrayersData = localStorage.getItem("prayers");
  const localLocationData = localStorage.getItem("location");

  if (localPrayersData) {
    prayers.value = JSON.parse(localPrayersData);
  }

  if(localLocationData) {
    currentLocation.value = JSON.parse(localLocationData);
  }else{
    currentLocation.value = {title: "Surabaya"};
  }

  await updatePrayerTimes();

  setInterval(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    currentTime.value = `${hours}:${minutes}`
  }, 1000);
})

watch(currentLocation, (newLocation) => {
  updatePrayerTimes();
})

const currentPrayer = computed(() => {
  const prayers = Object.entries(todayPrayers.value).map(([name, details]) => ({
    name,
    time: details.time,
  }));
  console.log(prayers);

  // Sort prayers by time to ensure order
  prayers.sort((a, b) => a.time?.localeCompare(b.time));

  // Iterate to find the current prayer
  for (let i = 0; i < prayers.length; i++) {
    if (currentTime < prayers[i].time) {
      return i > 0 ? prayers[i - 1].name : prayers[prayers.length - 1].name;
    }
  }

  // If the input time is after the last prayer, return the last prayer
  return prayers[prayers.length - 1].name.charAt(0).toUpperCase() + prayers[prayers.length - 1].name.slice(1);
})

const formattedDate = computed(() => {
  const now = new Date();

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const day = dayNames[now.getDay()];
  const date = now.getDate();
  const month = monthNames[now.getMonth()];

  const suffix = date % 10 === 1 && date !== 11 ? "st" : date % 10 === 2 && date !== 12 ? "nd" : date % 10 === 3 && date !== 13 ? "rd" : "th";

  return `${day} ${date}${suffix} ${month}`;
})

const formattedHijriDate = computed(() => {
  moment.locale('en');
  return `${moment().format('iMMMM iD, iYYYY')} AH`;
})

const showChangeLocationModal = () => {
  isLocationModalShow.value = true;
  locationSearchRef.value?.focusInput();
}

const updatePrayerTimes = async () => {
  console.info("UPDATE PRAYER TIME");
  const date = currentDateTime.value.split(',')[0].replaceAll('/', '-');
  const latitude = currentLocation.value.position.lat;
  const longitude = currentLocation.value.position.lng;
  const res = await $fetch(`/api/aladhan/${date}?latitude=${latitude}&longitude=${longitude}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  todayPrayers.value.fajr.time = res.data.timings.Fajr;
  todayPrayers.value.dhuhr.time = res.data.timings.Dhuhr;
  todayPrayers.value.asr.time = res.data.timings.Asr;
  todayPrayers.value.maghrib.time = res.data.timings.Maghrib;
  todayPrayers.value.isha.time = res.data.timings.Isha;
}

</script>

<style scoped></style>
