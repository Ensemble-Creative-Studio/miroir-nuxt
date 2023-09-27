<script setup>
import anime from 'animejs/lib/anime.es.js'
import { useBreakpoints } from '@vueuse/core' 

const breakpoints = useBreakpoints({
  mobile: 480,
  tablet: 768,
})

const isMobile = breakpoints.smallerOrEqual('tablet')
console.log('isMobile', isMobile.value)

watch(isMobile, (value) => {
  console.log('isMobile', value)
})

/* Sanity data */
const query = groq`*[_type == "brandsPage"][0]
{
  ...,
  selectedBrands[]->{
    ...,
  }
}
`
const { data } = useSanityQuery(query)
const brands = computed(() => {
  return data?.value
})

onMounted(() => {
  setTimeout(() => {
    animateIn()
  }, 500)
})

const animateIn = () => {
  anime({
    targets: '.brand',
    opacity: {
      value: 1,
      delay: anime.stagger(100),
      easing: 'spring(1, 100, 50, 8)',
    },
    translateY: {
      value: [30, 0],
      easing: 'spring(1, 80, 20, 4)',
    },
  })
}

const animateOut = (next) => {
  anime({
    targets: '.brand',
    opacity: {
      value: 0,
      delay: anime.stagger(100, { start: 0 }),
      easing: 'spring(1, 100, 50, 8)',
    },
    translateY: {
      value: [0, 30],
      easing: 'spring(1, 80, 20, 4)',
    },
    complete: () => {
      next()
    }
  })
}

onBeforeRouteLeave((to, from, next) => {
  animateOut(next)
})
</script>

<template>
  <Title>Miroir | Brands</Title>
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
        title="Brand"
      >
        <div class="brand__image">
          <div
            class="brand__overlay"
            :class="{ 'brand__overlay--visible': !brand?.thumbnailImage }"
          ></div>
          <SanityImage
            :asset-id="brand?.thumbnailImage?.asset?._ref"
            v-if="brand?.thumbnailImage"
            alt="Brand Thumbnail"
            auto="format"
          >
          </SanityImage>
        </div>
        <div class="brand__title">
          <h2>{{ brand?.title }}</h2>
        </div>
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
      overflow: hidden;

      @include mq($until: tablet) {
        overflow: visible;
      }

      &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        inset: 0;
        background-color: $white;
        opacity: 0;
        transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;

        &--visible {
          opacity: 1;
          background-color: rgb(227, 227, 227);
        }
      }

      &__title {
        position: absolute;
        left: 50%;
        bottom: 6.5rem;
        transform: translate(-50%, -50%);
        text-transform: uppercase;
        font-size: 2.1rem;
        font-weight: 500;
        text-align: center;
        opacity: 0;
        transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        text-overflow: clip;
        // border: 0.1rem solid red;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        h2 {
          // border: 0.1rem solid blue;
          @include mq($from: tablet) {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }

        @include mq($until: wide) {
          font-size: 1.8rem;
        }

        @include mq($until: tablet) {
          opacity: 1;
          position: relative;
          transform: none;
          left: 0;
          bottom: 0;
          font-size: 1.8rem;
          text-align: center;
          width: 100%;
          padding: 0.6rem;
        }

        @include mq($until: medium) {
          font-size: 1.4rem;
        }

        @include mq($until: mobile) {
          font-size: 1.2rem;
        }
      }

      &__image {
        z-index: 10;
        aspect-ratio: 3 / 4.25;
        pointer-events: none;
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
