<script setup>
import Lenis from '@studio-freight/lenis'

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

watch(
  () => route.fullPath,
  () => {
    lenis.scrollTo(0, {
      immediate: true,
    })
  }
)

/* SEO */
useSeoMeta({
  description:
    'Miroir est une agence multi-marques à Paris, qui propose une sélection de marques françaises et internationales invitant au voyage. Attentif aux évolutions du marché, MIROIR découvre de nouveaux talents. Les marques avec lesquelles nous collaborons sont sélectionnées pour leur univers unique et leur capacité à répondre aux besoins du marché.',
  ogDescription:
    'Miroir est une agence multi-marques à Paris, qui propose une sélection de marques françaises et internationales invitant au voyage. Attentif aux évolutions du marché, MIROIR découvre de nouveaux talents. Les marques avec lesquelles nous collaborons sont sélectionnées pour leur univers unique et leur capacité à répondre aux besoins du marché.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <Header />
    <NuxtPage />
  </div>
</template>
