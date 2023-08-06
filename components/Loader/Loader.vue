<script setup>
import { useLoaderStore } from '@/stores/loader'

const props = defineProps({
  images: {
    type: Array,
  },
})

const store = useLoaderStore()

const currentIndex = ref(0)
const SPEED = 1000

let interval = setInterval(() => {
  currentIndex.value++
}, SPEED)

const goForward = () => {
  currentIndex.value++
}

watch(currentIndex, (value) => {
  if (value === props.images.length) {
    clearInterval(interval)

    setTimeout(() => {
      store.endLoader()
    }, SPEED)
  }
})
</script>

<template>
  <div class="Loader" @click="goForward()">
    <div
      class="image"
      :class="index > currentIndex ? 'image--hidden' : ''"
      ref="$image"
      v-for="(n, index) in images"
    >
      <SanityImage
        :asset-id="images?.[index]?.asset?._ref"
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
  height: 100vh;
  width: 100%;
  z-index: 30;
  cursor: pointer;

  .image {
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    transition: opacity 0.5s ease-in-out;

    &--hidden {
      opacity: 0;
      visibility: hidden;
    }

    img {
      object-position: center;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
