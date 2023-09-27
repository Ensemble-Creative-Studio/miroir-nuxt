<script setup>
import { useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints({
  mobile: 480,
  tablet: 768,
})

const isMobile = breakpoints.smallerOrEqual('tablet')

/* Sanity data */
const query = groq`*[_type == "brandsPage"][0]
{
  ...,
}
`
const { data } = useSanityQuery(query)
const brands = computed(() => {
  return data?.value
})
</script>

<template>
  <Title>Miroir</Title>
  <Transition name="fade" mode="in-out">
    <Loader
      :images="
        isMobile ? brands?.mobileLoaderImages : brands?.desktopLoaderImages
      "
    />
  </Transition>
</template>

<style lang="scss" scoped>
// ...
</style>
