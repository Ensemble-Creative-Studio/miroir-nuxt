<script setup>
import anime from 'animejs/lib/anime.es.js'
import ColorThief from 'colorthief'

import { useLoaderStore } from '@/stores/loader'
import { storeToRefs } from 'pinia'

const store = useLoaderStore()
const { isLoading } = storeToRefs(store)

/* Sanity data */
const query = groq`*[_type == "brandsPage"][0]
{
  ...,
  selectedBrands[]->{
    ...,
  }
}
`
const { data, refresh } = useSanityQuery(query)
const brands = computed(() => {
  return data?.value
})

const $brand = ref([])
const $curtain = ref([])
const $image = ref([])

onMounted(() => {
  setTimeout(() => {
    /* Get color palettes */
    $image.value.forEach((image, index) => {
      const src = image.$el.src

      getPalette(src).then((palette) => {
        const [dark, light] = palette
        const [r, g, b] = light

        $curtain.value[index].style.background = `rgb(${r}, ${g}, ${b})`
      })
    })

    /* Animate in */
    if (!isLoading.value) {
      animateIn()
    }
  }, 500)
})

watch(isLoading, (value) => {
  if (!value) {
    console.log('Loader just ended')

    setTimeout(() => {
      animateIn()
    }, 500)
  }
})

const animateIn = () => {
  anime({
    targets: '.brand',
    opacity: {
      value: 1,
      duration: 500,
      delay: 500,
      easing: 'spring(1, 100, 50, 8)',
    },
    scale: {
      value: [0.75, 1],
      duration: 750,
      delay: 1500,
      easing: 'spring(1, 100, 50, 8)',
    },
    translateY: {
      value: [100, 0],
      duration: 1000,
      delay: 500,
      easing: 'spring(1, 80, 20, 4)',
    },
  })

  anime({
    targets: '.brand__curtain',
    translateY: '101%',
    duration: 1500,
    delay: 1600,
    easing: 'spring(1, 20, 100, 4)',
  })
}

const getPalette = (url) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      let colorThief = new ColorThief()
      resolve(colorThief.getPalette(img))
    }
    img.src = url
  })
}
</script>

<template>
  <Title>Miroir | Brands</Title>
  <Transition name="fade" mode="in-out">
    <Loader v-if="isLoading" :images="brands?.loaderImages" />
  </Transition>
  <main class="brands">
    <div class="wrapper">
      <NuxtLink
        v-for="brand in brands?.selectedBrands"
        :to="{
          name: 'slug',
          params: { slug: brand?.slug?.current },
        }"
        :key="brand._id"
        class="brand"
        ref="$brand"
        title="Brand"
      >
        <div class="brand__curtain" ref="$curtain"></div>
        <div
          class="brand__overlay"
          :class="{ 'brand__overlay--visible': !brand?.thumbnailImage }"
        ></div>
        <SanityImage
          :asset-id="brand?.thumbnailImage?.asset?._ref"
          v-if="brand?.thumbnailImage"
          ref="$image"
          alt="Brand Thumbnail"
          auto="format"
        >
        </SanityImage>
        <h2 class="brand__title">{{ brand?.title }}</h2>
      </NuxtLink>
    </div>
  </main>
  <Footer />
</template>

<style scoped lang="scss">
.brands {
  margin-top: 20rem;
  padding-bottom: 5rem;

  .wrapper {
    @include grid(18, 1fr, 1.5, 18);

    @include mq($until: tablet) {
      @include grid(12, 1fr, 0.6, 18);
    }

    .brand {
      opacity: 0;
      position: relative;
      aspect-ratio: 3 / 4.25;
      overflow: hidden;

      @include mq($until: tablet) {
        overflow: visible;
      }

      &__curtain {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 20;
        height: 100%;
        width: 100%;
        transform: translateY(0%);

        @include mq($until: tablet) {
          display: none;
        }
      }

      &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        inset: 0;
        background-color: $white;
        opacity: 0;
        transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);

        &--visible {
          opacity: 1;
          background-color: rgb(227, 227, 227);
        }
      }

      &__title {
        position: absolute;
        left: 50%;
        bottom: 4.5rem;
        transform: translate(-50%, -50%);
        text-transform: uppercase;
        font-size: 2.1rem;
        font-weight: 600;
        text-align: center;
        opacity: 0;
        transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);

        @include mq($until: tablet) {
          opacity: 1;
          position: relative;
          bottom: 0;
          transform: none;
          left: 0;
          font-size: 1.6rem;
          text-align: center;
          width: 100%;
          padding: 0.6rem;
        }
      }

      &__image {
        height: 100%;
        z-index: 10;

        img {
          object-fit: cover;
        }
      }

      @include mq($from: tablet) {
        &:nth-child(3n + 1) {
          grid-column: 1 / span 4;
        }

        &:nth-child(3n + 2) {
          grid-column: 8 / span 4;
        }

        &:nth-child(3n + 3) {
          grid-column: 15 / span 4;
        }
      }

      @include mq($until: tablet) {
        &:nth-child(2n + 1) {
          grid-column: 1 / span 5;
        }

        &:nth-child(2n) {
          grid-column: 8 / span 5;
        }
      }

      @include mq($from: desktop) {
        &:hover .brand__overlay {
          opacity: 0.5;
        }

        &:hover .brand__title {
          opacity: 1;
        }
      }
    }
  }
}
</style>
