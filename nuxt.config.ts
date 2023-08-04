// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/sanity', '@pinia/nuxt'],
  sanity: {
    projectId: 'psy845lh',
  },
  css: ['@/assets/scss/index.scss', '@/assets/fonts/ABCRepro/style.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import '@/assets/scss/resources/mq';\n
            @import '@/assets/scss/resources/variables';\n
            @import '@/assets/scss/resources/mixins';\n
            @import '@/assets/scss/resources/utils';\n
          `,
        },
      },
    },
  },
  components: [
    '~/components/Header',
    '~/components/Loader',
    '~/components/Pagination',
  ],
})
