<script setup>
import { useBrandsStore } from '@/stores/brands'
import { storeToRefs } from 'pinia'

const route = useRoute()

/* Setting all brands in a store */
const store = useBrandsStore()
const { brands } = storeToRefs(store)
store.setBrands()

const currentBrandIndex = computed(() => {
  return brands.value.findIndex(
    (item) => item.slug.current === route.params.slug
  )
})

const previousBrand = computed(() => {
  const previousIndex =
    (currentBrandIndex.value - 1 + brands.value.length) % brands.value.length
  return brands.value[previousIndex]
})

const nextBrand = computed(() => {
  const nextIndex = (currentBrandIndex.value + 1) % brands.value.length
  return brands.value[nextIndex]
})
</script>

<template>
  <div class="Pagination">
    <NuxtLink
      :to="{
        name: 'slug',
        params: { slug: previousBrand?.slug?.current },
      }"
      title="Previous Brand"
      >Previous</NuxtLink
    >
    <NuxtLink
      :to="{
        name: 'slug',
        params: { slug: nextBrand?.slug?.current },
      }"
      title="Next Brand"
      >Next</NuxtLink
    >
  </div>
</template>

<style lang="scss">
.Pagination {
  position: fixed;
  bottom: 3rem;
  padding: 0 3rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-transform: uppercase;
  pointer-events: none;

  @include mq($until: tablet) {
    background-color: $white;
    padding: 0.8rem 1.6rem;
    bottom: 0;
  }

  a {
    pointer-events: auto;
  }
}
</style>
