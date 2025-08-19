<script setup>
import anime from 'animejs/lib/anime.es.js'
import { useBreakpoints } from '@vueuse/core'
import { wait } from '@/utils/async';

/* Sanity data */
const query = groq`*[_type == "brandsPage"][0] { ..., }`
const { data } = useSanityQuery(query)
const brands = computed(() => data.value)

const SPEED = 2000
let isPaused = false
let interval = null
let timeout = null

const breakpoints = useBreakpoints({
  mobile: 480,
  tablet: 768,
})

const isMobile = breakpoints.smallerOrEqual('tablet')
const isReady = ref(false)
const currentIndex = ref(0)

const totalImages = computed(() => {
  return isMobile.value
    ? brands.value.mobileLoaderImages.length
    : brands.value.desktopLoaderImages.length
})

onMounted(() => {
  isReady.value = true;

  interval = setInterval(() => {
    if (isPaused) return
    goNext()
  }, SPEED)
});

onBeforeUnmount(() => {
  clearInterval(interval)
  clearTimeout(timeout)
})

onBeforeRouteLeave((to, from, next) => {
  anime({
    targets: '.wrapper',
    opacity: [1, 0],
    duration: 1000,
    complete: () => {
      next()
    },
  })
})

async function goNext() {
  currentIndex.value = (currentIndex.value + 1) % totalImages.value
  isPaused = true

  timeout = setTimeout(() => {
    isPaused = false
  }, SPEED)
}
</script>

<template>
  <Title>Miroir</Title>
    <div class="index" @click="goNext" v-if="isReady">
    <div class="wrapper">
      <div
        class="image-wrapper"
        :class="{ 'active' : index === currentIndex }"
        v-for="(n, index) in isMobile ? brands.mobileLoaderImages : brands.desktopLoaderImages"
        :style="{ zIndex: totalImages - 1 - index }"
        :key="index"
      >
          <NuxtImg
            v-if="n?.asset?._ref"
            :src="$urlFor(n)
              .width(isMobile ? 900 : 1920)
              .auto('format')
              .quality(75)
              .url()"
            alt="Loader Image"
            sizes="100vw"
            loading="eager"
          />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index {
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

  .image-wrapper {
    height: 100%;
    width: 100%;
    position: absolute;
    opacity: 0;
    transition: opacity 0.35s ease-out;
    will-change: opacity;

    // &:nth-child(odd) {
    //   background-color: red;
    // }

    // &:nth-child(even) {
    //   background-color: blue;
    // }

    &.active {
      opacity: 1;
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
