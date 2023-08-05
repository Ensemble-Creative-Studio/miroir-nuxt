<script setup>
import anime from 'animejs/lib/anime.es.js'

const props = defineProps({
  data: {
    type: Object,
  },
})

onMounted(() => {
  /* Animate in */
  anime({
    targets: '.Annex .wrapper',
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeInOutExpo',
  })
})
</script>

<template>
  <div class="Annex">
    <div class="wrapper">
      <div class="content" v-if="data?.content">
        <h1 class="title mr-big-title">{{ data?.title }}</h1>
        <SanityContent :blocks="data?.content" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.Annex {
  .content {
    width: clamp(20rem, 100%, 80rem);
    padding: 10rem 1.5rem;
    max-width: 100%;
    margin: auto;

    h2:not(:first-child) {
      margin-top: 4rem;
    }

    h2 {
      margin-bottom: -2rem;
      display: block;
      font-size: 2.1rem;
      font-weight: 500;
      line-height: 2;
      text-transform: uppercase;

      @include mq($until: tablet) {
        font-size: 1.6rem;
      }

      @include mq($until: tablet) {
        font-size: 1.4rem;
      }
    }

    p,
    ul,
    ol {
      margin-top: 2rem;
    }

    ol,
    ul {
      margin-left: 2rem;

      li {
        &::before {
          content: '•';
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>
