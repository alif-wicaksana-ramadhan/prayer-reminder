<template>
  <div>
    <main class="mt-16 p-4">
      <PrayerCard name="Fajr" :time="prayers.fajr.time" v-model:checked="prayers.isha.reminder" />
      <PrayerCard name="Dhuhr" :time="prayers.dhuhr.time" v-model:checked="prayers.isha.reminder" />
      <PrayerCard name="Asr" :time="prayers.asr.time" v-model:checked="prayers.isha.reminder" />
      <PrayerCard name="Maghrib" :time="prayers.maghrib.time" v-model:checked="prayers.isha.reminder" />
      <PrayerCard name="Isha" :time="prayers.isha.time" v-model:checked="prayers.isha.reminder" />
    </main>
    <ClientOnly>
      <div v-if="isSupported && isSuccess">
        Latitude: {{ coords.latitude }}
        Longitude: {{ coords.longitude }}
      </div>
      <div v-else>
        Geolocation is not supported or not permitted by your browser.
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const { coords, isSupported, isSuccess } = useGeolocation()

const prayers = ref({
  fajr: {
    time: "5:00 PM",
    reminder: false,
  },
  dhuhr: {
    time: "12:30 PM",
    reminder: false,
  },
  asr: {
    time: "15:30 PM",
    reminder: false,
  },
  maghrib: {
    time: "15:30 PM",
    reminder: false,
  },
  isha: {
    time: "15:30 PM",
    reminder: false,
  }
})
</script>

<style scoped></style>
