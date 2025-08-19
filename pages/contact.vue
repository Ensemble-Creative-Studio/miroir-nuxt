<script setup>
import anime from 'animejs/lib/anime.es.js'

onMounted(() => {
  anime({
    targets: '.contact-page .wrapper',
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeInOutExpo',
  })
})

onBeforeRouteLeave((to, from, next) => {
  anime({
    targets: '.contact-page .wrapper',
    opacity: [1, 0],
    duration: 250,
    easing: 'spring(1, 100, 50, 8)',
    complete: () => {
      next()
    },
  })
})

/* Sanity data */
const query = groq`*[_type == "contact"][0]`
const { data, refresh } = useSanityQuery(query)

const contact = computed(() => {
  return data?.value
})
</script>

<template>
  <Title>Miroir | Contact</Title>
  <main class="contact-page">
    <div class="wrapper">
      <div class="text">
        <h1 class="text__title mr-big-title">{{ contact?.title }}</h1>
        <div class="text__address">
          <p>{{ contact?.address.streetName }}</p>
          <p>{{ contact?.address.city }}</p>
        </div>
        <div class="text__details">
          <a :href="`mailto:${contact?.details.email}`">{{
            contact?.details.email
          }}</a>
          <p>{{ contact?.details.phone }}</p>
          <a :href="contact?.details.socialMedia.url" target="_blank">{{
            contact?.details.socialMedia.name
          }}</a>
        </div>
      </div>
      <div class="visual">
        <!-- <NuxtImg
          v-if="contact?.image?.asset?._ref"
          :src="$urlFor(contact?.image)
            .width(1200)
            .auto('format')
            .quality(75)
            .url()"
          alt="Contact Image"
          sizes="(max-width: 768px) 100vw, 1200px"
          loading="lazy"
        /> -->
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.contact-page {
  .wrapper {
    @include grid(18, 1fr, 1.5, 0);
    height: calc(100vh - 5.5rem);

    @include mq($until: tablet) {
      @include grid(12, 1fr, 0.6, 0);
    }

    .text {
      grid-column: 1 / span 8;
      align-self: flex-end;
      padding: 0 0 2.5rem 2.5rem;

      @include mq($until: wide) {
        grid-column: 1 / span 12;
        order: 2;
      }

      &__title {
        margin-left: -0.15rem;
      }

      &__address {
        margin-top: 1.5rem;
      }

      &__details {
        margin-top: 1rem;
      }
    }

    .visual {
      margin-top: 10rem;
      grid-column: 10 / span 9;

      @include mq($until: wide) {
        order: 1;
      }

      @include mq($until: tablet) {
        grid-column: 3 / span 11;
      }

      img {
        aspect-ratio: 7.9 / 5.5;
      }
    }
  }
}
</style>
