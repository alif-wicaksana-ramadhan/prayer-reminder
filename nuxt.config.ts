// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt',
    '@nuxt/icon',
    // 'nuxt-snackbar'
  ],
  // snackbar: {
  //   bottom: true,
  //   right: true,
  //   duration: 5000
  // }
  runtimeConfig: {
    hereApiKey: "123",
    hereHost: "127.0.0.1",
    aladhanHost: "127.0.0.1",
  }
})