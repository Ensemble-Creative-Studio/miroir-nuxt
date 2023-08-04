<script setup>
import anime from 'animejs/lib/anime.es.js'
import ColorThief from 'colorthief'
const { $initLenis, $destroyLenis } = useNuxtApp()

// definePageMeta({
//   pageTransition: {
//     name: 'custom',
//     css: false,
//     onBeforeEnter: (el) => {},
//     onEnter: (el, done) => {
//       done()
//     },
//     onLeave: (el, done) => {
//       /* Animate out */
//       anime({
//         targets: '.brand__curtain',
//         translateY: ['101%', '0%'],
//         duration: 1500,
//         easing: 'easeOutExpo',
//       })

//       anime({
//         targets: '.wrapper',
//         opacity: [1, 0],
//         duration: 1500,
//         easing: 'easeOutExpo',
//       })

//       setTimeout(() => {
//         done()
//       }, 1500)
//     },
//   },
// })

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
  return data?.value?.selectedBrands
})

/* Group brands */
// Refactor this later
const itemsPerWrapper = 3
const brandGroups = computed(() => {
  const groupedBrands = []
  let tempArray = []

  for (let i = 0; i < brands?.value?.length; i++) {
    const brand = brands?.value?.[i]
    tempArray.push(brand)

    if (
      tempArray.length === itemsPerWrapper ||
      i === brands?.value?.length - 1
    ) {
      groupedBrands.push(tempArray)
      tempArray = []
    }
  }

  return groupedBrands
})

const $curtain = ref([])
const $image = ref([])

onMounted(() => {
  $initLenis()
  animateIn()

  /* Get color palettes */
  $image.value.forEach((image, index) => {
    const src = image.src

    getPalette(src).then((palette) => {
      const [dark, light] = palette
      const [r, g, b] = light

      $curtain.value[index].style.background = `rgb(${r}, ${g}, ${b})`
    })
  })
})

// Refactor this as a plugin
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

onBeforeUnmount(() => {
  $destroyLenis()
})

/* Animation */
const animateIn = () => {
  anime({
    targets: '.brand',
    opacity: {
      value: [0, 1],
      duration: 500,
      easing: 'easeOutExpo',
      delay: 500,
    },
    scale: {
      value: [0.75, 1],
      duration: 750,
      delay: 1500,
      easing: 'easeOutExpo',
    },
    translateY: {
      value: [50, 0],
      duration: 1000,
      easing: 'easeOutExpo',
      // delay: anime.stagger(300), // Add initial delay?
      delay: 500,
    },
  })

  anime({
    targets: '.brand__curtain',
    translateY: ['0%', '101%'],
    duration: 1500,
    delay: 1500,
    easing: 'easeOutExpo',
  })
}
</script>

<template>
  <main class="brands">
    <div
      class="wrapper"
      v-for="(brandGroup, index) in brandGroups"
      :key="index"
    >
      <NuxtLink
        :to="{
          name: 'slug',
          params: { slug: brand?.slug?.current },
        }"
        v-for="brand in brandGroup"
        :key="brand._id"
        class="brand"
      >
        <div class="brand__curtain" ref="$curtain"></div>
        <div class="brand__overlay"></div>
        <img
          class="brand__image"
          :src="$urlFor(brand?.thumbnailImage?.asset?._ref).url()"
          ref="$image"
        />
        <h2 class="brand__title">{{ brand?.title }}</h2>
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped lang="scss">
.brands {
  margin-top: 20rem;
  padding-bottom: 5rem;

  .wrapper {
    @include grid(18, 1fr, 1.5, 0);
    margin-bottom: 18rem;

    &:last-child {
      margin-bottom: 0;
    }

    .brand {
      position: relative;
      aspect-ratio: 3 / 4.25;
      overflow: hidden;

      &__curtain {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 20;
        height: 100%;
        width: 100%;
      }

      &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        inset: 0;
        background-color: $white;
        opacity: 0;
        transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
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
      }

      &__image {
        height: 100%;
        z-index: 10;

        img {
          object-fit: cover;
        }
      }

      &:first-child {
        grid-column: 1 / span 4;
      }

      &:nth-child(2) {
        grid-column: 8 / span 4;
      }

      &:nth-child(3) {
        grid-column: 15 / span 4;
      }

      &:hover .brand__overlay {
        opacity: 0.5;
      }

      &:hover .brand__title {
        opacity: 1;
      }
    }
  }
}
</style>
