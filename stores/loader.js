import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader', () => {
  const isLoading = ref(true)

  function showLoader() {
    isLoading.value = true
  }

  function endLoader() {
    isLoading.value = false
  }

  return { isLoading, showLoader, endLoader }
})
