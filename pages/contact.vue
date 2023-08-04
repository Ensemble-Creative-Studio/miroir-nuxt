<script setup>
import anime from 'animejs/lib/anime.es.js'
const { $initLenis, $destroyLenis } = useNuxtApp()

onMounted(() => {
  $initLenis()

  anime({
    targets: '.contact-page .wrapper',
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeInOutExpo',
  })
})

onBeforeUnmount(() => {
  $destroyLenis()
})

/* Sanity data */
const query = groq`*[_type == "contact"][0]`
const { data, refresh } = useSanityQuery(query)

const contact = computed(() => {
  return data?.value
})
</script>

<template>
  <main class="contact-page">
    <div class="wrapper">
      <div class="text">
        <h1 class="title mr-big-title">{{ contact?.title }}</h1>
        <div class="text__address">
          <p>{{ contact?.address.streetName }}</p>
          <p>{{ contact?.address.city }}</p>
        </div>
        <div class="text__details">
          <p>{{ contact?.details.email }}</p>
          <p>{{ contact?.details.phone }}</p>
          <p>{{ contact?.details.socialMedia }}</p>
        </div>
      </div>
      <div class="visual">
        <SanityImage
          v-if="contact?.image?.asset?._ref"
          :asset-id="contact?.image?.asset?._ref"
        />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.contact-page {
  .wrapper {
    @include grid(18, 1fr, 1.5, 0);
    height: calc(100vh - 5.5rem);

    .text {
      grid-column: 1 / span 7;
      align-self: flex-end;
      padding: 0 0 2.5rem 2.5rem;

      &__address {
        margin-top: 1.5rem;
      }

      &__details {
        margin-top: 1rem;
      }
    }

    .visual {
      margin-top: 10rem;
      grid-column: 9 / span 10;

      img {
        aspect-ratio: 7.9 / 5.5;
      }
    }
  }
}
</style>
