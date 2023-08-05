import { defineStore } from 'pinia'

export const useBrandsStore = defineStore('brands', () => {
  const brands = ref([])

  async function setBrands() {
    if (brands.value !== []) {
      
      //

      brands.value = data.selectedBrands
    } else {
      return
    }
  }

  return { brands, setBrands }
})
