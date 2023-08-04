<script setup>
import anime from 'animejs/lib/anime.es.js'
const { $initLenis, $destroyLenis } = useNuxtApp()

/* Sanity data */
const route = useRoute()

const query = groq`*[_type == "brands" && slug.current == "${route.params.slug}"][0]`
const { data: brand, refresh } = useSanityQuery(query)

onMounted(() => {
  $initLenis()

  anime({
    targets: ['.visuals', '.text'],
    opacity: 1,
    duration: 1000,
    easing: 'easeInOutExpo',
  })
})

onBeforeUnmount(() => {
  $destroyLenis()
})
</script>

<template>
  <main class="brand-page">
    <div class="visuals">
      <div class="visual" v-for="image in brand?.images">
        <SanityImage :asset-id="image.asset._ref" />
      </div>
    </div>
    <div class="text">
      <h1 class="title mr-big-title">{{ brand?.title }}</h1>
      <div class="fr-description">
        <SanityContent :blocks="brand?.frenchDescription" />
      </div>
      <div class="en-description">
        <SanityContent :blocks="brand?.englishDescription" />
      </div>
      <div class="contact">
        <p>{{ brand?.contact?.name }}</p>
        <a :href="`mailto:${brand?.contact?.email}`">
          {{ brand?.contact?.email }}
        </a>
        <p>{{ brand?.contact?.phone }}</p>
      </div>
    </div>
    <Pagination />
  </main>
</template>

<style scoped lang="scss">
.brand-page {
  margin-top: 9rem;
  position: relative;
  @include grid(18, 1fr, 1.5, 0);

  .visuals {
    grid-column: auto / span 9;
    opacity: 0;

    .visual {
      img {
        object-fit: cover;
      }

      &:not(:first-child) {
        margin-top: 1.6rem;
      }
    }
  }

  .text {
    grid-column: 11 / span 7;
    margin-top: 38rem;
    padding-top: 9rem;
    position: sticky;
    top: 0;
    opacity: 0;

    .fr-description,
    .en-description,
    .contact {
      margin-top: 3rem;

      p:first-of-type {
        text-transform: uppercase;
      }
    }
  }
}
</style>
