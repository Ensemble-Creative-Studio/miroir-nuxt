// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/sanity', '@pinia/nuxt', '@vueuse/nuxt'],
  ssr: true,
  sanity: {
    projectId: 'psy845lh',
    dataset: 'production',
    apiVersion: '2025-11-01',
    useCdn: true,
    perspective: 'published',
  },
  nitro: {
    preset: 'static',
    output: {
      dir: '.output'
    }
  },
  css: ['@/assets/scss/index.scss', '@/assets/fonts/ABCRepro/style.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use '@/assets/scss/tools/mq' as *;
            @use '@/assets/scss/tools/variables' as *;
            @use '@/assets/scss/tools/mixins' as *;
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
  compatibilityDate: '2025-11-01',
})