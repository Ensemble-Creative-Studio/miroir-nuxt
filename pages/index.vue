<script setup>
import anime from 'animejs/lib/anime.es.js'
import { useBreakpoints } from '@vueuse/core'
import { wait } from '@/utils/async';

/* Sanity data */
const query = groq`*[_type == "brandsPage"][0] { ..., }`
const { data } = useSanityQuery(query)
const brands = computed(() => data.value)

const isReady = ref(false)
const currentIndex = ref(0)
const SPEED = 2000

let interval = null

const breakpoints = useBreakpoints({
  mobile: 480,
  tablet: 768,
})

const $loader = ref(null)

const isMobile = breakpoints.smallerOrEqual('tablet')

const onClick = async () => {
  clearInterval(interval)
  await wait(500)
  startInterval(SPEED)
}

const goForward = async () => {
  const images = isMobile.value ? brands.value.mobileLoaderImages : brands.value.desktopLoaderImages
  currentIndex.value = (currentIndex.value + 1) % images.length
}

const startInterval = (speed) => {
  if (interval) clearInterval(interval)  // Clear any existing interval before starting a new one
  interval = setInterval(() => {
    goForward()
  }, speed)
}

onMounted(() => {
  isReady.value = true
  startInterval(SPEED)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})

onBeforeRouteLeave((to, from, next) => {
  anime({
    targets: '.wrapper',
    opacity: [1, 0],
    duration: 1500,
    complete: () => {
      next()
    },
  })
})
</script>

<template>
  <Title>Miroir</Title>
    <div class="Loader" @click="onClick" v-if="isReady">
    <div class="wrapper">
      <div
      v-for="(n, index) in isMobile ? brands.mobileLoaderImages : brands.desktopLoaderImages"
      class="image"
      :class="{ 'image--hidden': index > currentIndex }"
      ref="$image"
      :key="index"
    >
      <SanityImage
        :asset-id="n.asset._ref"
        alt="Loader Visual"
        auto="format"
      />
    </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Loader {
  position: fixed;
  overflow: hidden;
  inset: 0;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  animation: fade-in 0.5s 0.5s ease-in-out both;
  user-select: none;

  .image {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;

    &--hidden {
      opacity: 0;
      visibility: hidden;
    }

    img {
      object-position: center;
    }
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
