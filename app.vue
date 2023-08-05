<script setup>
import Lenis from '@studio-freight/lenis'

import { useLoaderStore } from '@/stores/loader'
const store = useLoaderStore()

let lenis
let raf

const initLenis = () => {
  lenis = new Lenis()

  raf = (time) => {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

onMounted(() => {
  initLenis()
})

const route = useRoute()

if (route.fullPath !== '/') {
  store.endLoader()
}

watch(
  () => route.fullPath,
  () => {
    lenis.scrollTo(0, {
      immediate: true,
    })
  }
)
</script>

<template>
  <div>
    <Header />
    <NuxtPage />
    <Footer />
  </div>
</template>
