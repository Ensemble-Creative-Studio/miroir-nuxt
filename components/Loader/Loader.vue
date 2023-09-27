<script setup>
import anime from 'animejs/lib/anime.es.js'

const props = defineProps({
  images: Array,
})

const currentIndex = ref(0)
const SPEED = 2000

let isPaused
let timeout

let interval = setInterval(() => {
  if (!isPaused) {
    goForward()
  }
}, SPEED)

const goForward = () => {
  currentIndex.value = (currentIndex.value + 1) % props?.images?.length
  isPaused = true

  timeout = setTimeout(() => {
    isPaused = false
  }, 1000)
}

onMounted(() => {
  anime({
    targets: '.Loader',
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeInOutExpo',
  })
})

onBeforeUnmount(() => {
  clearTimeout(timeout)
  clearInterval(interval)
})

onBeforeRouteLeave((to, from, next) => {
  anime({
    targets: '.Loader',
    opacity: [1, 0],
    duration: 1000,
    easing: 'easeInOutExpo',
    complete: () => {
      next()
    },
  })
})
</script>

<template>
  <div class="Loader" @click="goForward()">
    <div
      class="image"
      :class="index > currentIndex ? 'image--hidden' : ''"
      ref="$image"
      v-for="(n, index) in props.images"
    >
      <SanityImage
        :asset-id="images[index].asset._ref"
        alt="Loader Visual"
        auto="format"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.Loader {
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  height: 100svh;
  width: 100%;
  opacity: 0;
  cursor: pointer;

  .image {
    height: 100vh;
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
</style>
