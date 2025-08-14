// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/image', '@nuxtjs/tailwindcss', '@nuxt/icon', '@pinia/nuxt',],
  css: ['@/assets/css/app.scss'],
  ssr: false,
    nitro: {
    preset: 'static'
  },
  app: {
    baseURL:'/gfc/'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/css/variables.scss" as *; @use "@/assets/css/mixin.scss" as *;`,
        },
      },
    },
  },
  pinia:{
    storesDirs:['./store/**'],
  },
})