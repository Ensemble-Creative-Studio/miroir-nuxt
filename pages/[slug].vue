<script setup>
import anime from 'animejs/lib/anime.es.js'

const route = useRoute()

/* Sanity data */
const query = groq`*[_type == "brands" && slug.current == "${route.params.slug}"][0]`
const { data: brand, refresh } = useSanityQuery(query)

onMounted(() => {
  /* Animate in */
  anime({
    targets: ['.visuals', '.text'],
    opacity: 1,
    duration: 1000,
    easing: 'easeInOutExpo',
  })
})
</script>

<template>
  <Title>Miroir | {{ brand?.title }}</Title>
  <main class="brand-page">
    <h1 class="title title--mobile mr-big-title">{{ brand?.title }}</h1>
    <div class="visual visual--mobile" v-if="brand?.thumbnailImage">
      <SanityImage
        :asset-id="brand?.thumbnailImage?.asset?._ref"
        alt="Brand Thumbnail"
      />
    </div>
    <div class="visuals">
      <div class="visual visual--thumbnail" v-if="brand?.thumbnailImage">
        <SanityImage
          :asset-id="brand?.thumbnailImage?.asset?._ref"
          alt="Brand Thumbnail"
        />
      </div>
      <div class="visual" v-for="image in brand?.images">
        <SanityImage :asset-id="image.asset._ref" alt="Brand Visual" />
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

  @include mq($until: tablet) {
    @include grid(12, 1fr, 0.6, 0);
    padding-bottom: 9.35rem;
  }

  .visuals {
    grid-column: auto / span 9;
    opacity: 0;

    @include mq($until: tablet) {
      grid-column: 1 / span 12;
      order: 2;
    }

    .visual {
      img {
        object-fit: cover;
      }

      &:not(:first-child) {
        margin-top: 1.5rem;
      }
    }
  }

  .text {
    grid-column: 11 / span 7;
    margin-top: 40rem;
    padding: 10rem 0;
    position: sticky;
    top: 0;
    opacity: 0;

    @include mq($until: tablet) {
      grid-column: 2 / span 10;
      margin-top: 4rem;
      padding: 0;
      order: 1;
      position: relative;
      padding-bottom: 4rem;
    }

    .title {
      margin-bottom: 3rem;

      @include mq($until: tablet) {
        display: none;
      }
    }

    .en-description,
    .contact {
      margin-top: 3rem;

      p:first-of-type {
        text-transform: uppercase;
      }
    }
  }

  .title {
    &--mobile {
      width: 100%;
      padding: 0 1.5rem;
      text-align: center;
      display: none;
      grid-column: 1 / span 12;

      @include mq($until: tablet) {
        display: block;
      }
    }
  }

  .visual {
    &--thumbnail {
      @include mq($until: tablet) {
        display: none;
      }
    }

    &--mobile {
      display: none;

      @include mq($until: tablet) {
        display: block;
        grid-column: 2 / span 10;
        margin-top: 4rem;
      }
    }
  }
}
</style>
