// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/sanity', '@pinia/nuxt', '@vueuse/nuxt', "@nuxt/image"],
  ssr: true,
  sanity: {
    projectId: 'psy845lh',
  },
  css: ['@/assets/scss/index.scss', '@/assets/fonts/ABCRepro/style.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import '@/assets/scss/tools/mq';\n
            @import '@/assets/scss/tools/variables';\n
            @import '@/assets/scss/tools/mixins';\n
          `,
        },
      },
    },
  },
  components: [
    '~/components/Header',
    '~/components/Pagination',
    '~/components/Annex',
    '~/components/Footer',
  ],
})