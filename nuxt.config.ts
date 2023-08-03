// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/sanity'],
  sanity: {
    projectId: 'psy845lh',
  },
  css: ['@/assets/scss/main/index.scss', '@/assets/fonts/ABCRepro/style.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/resources/index.scss" as *;',
        },
      },
    },
  },
  components: ['~/components/Header'],
})
