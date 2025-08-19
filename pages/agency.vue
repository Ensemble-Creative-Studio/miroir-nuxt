<script setup>
import anime from 'animejs/lib/anime.es.js'

onMounted(() => {
  anime({
    targets: '.agency-page .wrapper',
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeInOutExpo',
  })
})

onBeforeRouteLeave((to, from, next) => {
  anime({
    targets: '.agency-page .wrapper',
    opacity: [1, 0],
    duration: 250,
    easing: 'spring(1, 100, 50, 8)',
    complete: () => {
      next()
    },
  })
})

/* Sanity data */
const query = groq`*[_type == "agency"][0]`
const { data: agency, refresh } = useSanityQuery(query)
</script>

<template>
  <Title>Miroir | Agency</Title>
  <main class="agency-page">
    <div class="wrapper">
      <h1 class="title title--mobile mr-big-title">{{ agency?.title }}</h1>
      <div class="visual">
        <div class="visual__image">
          <!-- <NuxtImg
            v-if="agency?.image?.asset?._ref"
            :src="$urlFor(agency?.image)
                    .width(1200)     // largeur max desktop
                    .auto('format')  // WebP/AVIF si dispo
                    .quality(75)     // compression légère
                    .url()"
            alt="Agency Image"
            sizes="(max-width: 768px) 100vw, 1200px"
            loading="lazy"
          /> -->
          <img 
            v-if="agency?.image?.asset?._ref"
            :src="$urlFor(agency?.image)
              .width(1200)
              .auto('format')
              .quality(75)
              .url()"
            alt="Agency Image"
            sizes="(max-width: 768px) 100vw, 1200px"
            loading="lazy"
          />
        </div>
        <ul class="visual__credits">
          <li v-for="item in agency?.names" :key="item._key">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="text">
        <h1 class="title mr-big-title">{{ agency?.title }}</h1>
        <p class="description">{{ agency?.description }}</p>
        <p class="description--en">{{ agency?.descriptionEn }}</p>
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
        margin: 1.5rem 2.5rem;
        max-width: 25rem;
        width: 100%;
        line-height: 1.2;

        // @include mq($until: wide) {
        //   max-width: 100%;
        // }

        // @include mq($until: tablet) {
        //   max-width: 50%;
        // }

        @include mq($until: medium) {
          max-width: 20rem;
        }

        li:not(:last-child) {
          &::after {
            content: '\00a0';
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

      .description {
        &--en {
            margin-top: 2rem;
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
