<script setup>
import anime from 'animejs/lib/anime.es.js'

onMounted(() => {
  /* Animate in */
  anime({
    targets: '.agency-page .wrapper',
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeInOutExpo',
  })
})

/* Sanity data */
const query = groq`*[_type == "agency"][0]`
const { data: agency, refresh } = useSanityQuery(query)

/* SEO */
useHead({
  title: 'Miroir | Agency',
})
</script>

<template>
  <main class="agency-page">
    <div class="wrapper">
      <h1 class="title title--mobile mr-big-title">{{ agency?.title }}</h1>
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
  <Footer />
</template>

<style scoped lang="scss">
.agency-page {
  .wrapper {
    @include grid(18, 1fr, 1.5, 0);
    margin-top: 20rem;
    align-items: center;
    padding-bottom: 10rem;

    @include mq($until: tablet) {
      @include grid(12, 1fr, 0.6, 0);
      margin-top: 12.5rem;
    }

    .visual {
      grid-column: 1 / span 9;

      @include mq($until: tablet) {
        grid-column: 1 / span 11;
      }

      img {
        aspect-ratio: 7.1 / 5.8;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 1.5rem 2.5rem;
        max-width: 50%;
        line-height: 1.2;

        @include mq($until: wide) {
          max-width: 100%;
        }

        @include mq($until: tablet) {
          max-width: 50%;
        }

        @include mq($until: medium) {
          max-width: 100%;
        }

        li:not(:last-child) {
          &::after {
            content: ',\00a0';
          }
        }
      }
    }

    .text {
      grid-column: 11 / span 7;

      @include mq($until: tablet) {
        grid-column: 2 / span 10;
        margin-top: 3rem;
      }

      .title {
        margin-bottom: 3rem;

        @include mq($until: tablet) {
          display: none;
        }
      }
    }

    .title {
      &--mobile {
        display: none;
        grid-column: 1 / span 12;
        text-align: center;
        margin-bottom: 3rem;

        @include mq($until: tablet) {
          display: block;
        }
      }
    }
  }
}
</style>
