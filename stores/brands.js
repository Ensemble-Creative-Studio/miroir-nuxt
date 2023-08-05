import { defineStore } from 'pinia'
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'psy845lh',
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
})

export const useBrandsStore = defineStore('brands', () => {
  const brands = ref([])

  async function setBrands() {
    if (brands.value !== []) {
      const data = await client.fetch(`*[_type == "brandsPage"][0]
      {
        ...,
        selectedBrands[]->{
          ...,
        }
      }
      `)

      brands.value = data.selectedBrands
    } else {
      return
    }
  }

  return { brands, setBrands }
})
