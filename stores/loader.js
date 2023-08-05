import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader', () => {
  const isLoading = ref(true)

  function endLoader() {
    isLoading.value = false
  }

  return { isLoading, endLoader }
})
