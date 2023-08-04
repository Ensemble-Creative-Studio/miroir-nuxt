<script setup>
import anime from 'animejs/lib/anime.es.js'
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
//       setTimeout(() => {
//         done()
//       }, 1500)
//     },
//   },
// })

onMounted(() => {
  $initLenis()

  anime({
    targets: '.agency-page .wrapper',
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeInOutExpo',
  })
})

onBeforeUnmount(() => {
  $destroyLenis()
})

/* Sanity data */
const query = groq`*[_type == "agency"][0]`
const { data: agency, refresh } = useSanityQuery(query)
</script>

<template>
  <main class="agency-page">
    <div class="wrapper">
      <div class="visual">
        <SanityImage
          v-if="agency?.image?.asset?._ref"
          :asset-id="agency?.image?.asset?._ref"
        />
        <ul>
          <li v-for="item in agency?.names" :key="item._key">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="text">
        <h1 class="title mr-big-title">{{ agency?.title }}</h1>
        <p class="description">{{ agency?.description }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.agency-page {
  .wrapper {
    @include grid(18, 1fr, 1.5, 0);
    margin-top: 20rem;
    align-items: center;
    padding-bottom: 14rem;

    .visual {
      grid-column: 1 / span 9;

      img {
        aspect-ratio: 7.1 / 5.8;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 1.5rem 0 0 2.5rem;
        max-width: 33.33%;
        line-height: 1.2;

        li:not(:last-child) {
          &::after {
            content: ',\00a0';
          }
        }
      }
    }

    .text {
      grid-column: 11 / span 7;
    }

    .description {
      margin-top: 3rem;
    }
  }
}
</style>
