<script setup>
import anime from 'animejs/lib/anime.es.js'

const route = useRoute()

/* Sanity data */
const query = groq`*[_type == "brands" && slug.current == "${route.params.slug}"][0]`
const { data: brand, refresh } = useSanityQuery(query)

onMounted(() => {
  anime({
    targets: ['.visuals', '.text'],
    opacity: 1,
    duration: 1000,
    easing: 'easeInOutExpo',
  })
})

onBeforeRouteLeave((to, from, next) => {
  anime({
    targets: ['.visuals', '.text'],
    opacity: 0,
    duration: 250,
    easing: 'spring(1, 100, 50, 8)',
    complete: () => {
      next()
    },
  })
})
</script>

<template>
  <Title>Miroir | {{ brand?.title }}</Title>
  <main class="brand-page">
    <h1 class="title title--mobile mr-big-title">{{ brand?.title }}</h1>
    
    <div class="visual visual--mobile" v-if="brand?.thumbnailImage">
      <!-- <NuxtImg
        :src="$urlFor(brand?.thumbnailImage)
                .width(800)      // mobile
                .auto('format')
                .quality(75)
                .url()"
        alt="Brand Thumbnail"
        sizes="(max-width: 768px) 100vw, 800px"
        loading="lazy"
      /> -->
      <img 
        v-if="brand?.thumbnailImage.asset?._ref"
        :src="$urlFor(brand?.thumbnailImage)
          .width(800)
          .auto('format')
          .quality(75)
          .url()"
        alt="Brand Thumbnail"
        sizes="(max-width: 768px) 100vw, 800px"
        loading="lazy"
      />
    </div>
    <div class="visuals">
      <div class="visual visual--thumbnail" v-if="brand?.thumbnailImage">
        <!-- <NuxtImg
          :src="$urlFor(brand?.thumbnailImage)
                  .width(1200)    // desktop thumbnail
                  .auto('format')
                  .quality(80)
                  .url()"
          alt="Brand Thumbnail"
          sizes="(max-width: 768px) 100vw, 1200px"
          loading="lazy"
        /> -->
        <img 
          v-if="brand?.thumbnailImage.asset?._ref"
          :src="$urlFor(brand?.thumbnailImage)
            .width(1200)
            .auto('format')
            .quality(80)
            .url()"
          alt="Brand Thumbnail"
          sizes="(max-width: 768px) 100vw, 1200px"
          loading="lazy"
        />
      </div>
    <div class="visual" v-for="(image, i) in brand?.images" :key="i">
      <!-- <NuxtImg
        :src="$urlFor(image)
                .width(1200)    // gallery images
                .auto('format')
                .quality(80)
                .url()"
        alt="Brand Visual"
        sizes="(max-width: 768px) 100vw, 1200px"
        loading="lazy"
      /> -->
      <img 
        v-if="image?.asset?._ref"
        :src="$urlFor(image)
          .width(1200)
          .auto('format')
          .quality(80)
          .url()"
        alt="Brand Visual"
        sizes="(max-width: 768px) 100vw, 1200px"
        loading="lazy"
      />
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

    // max-height: 80vh;
    // overflow: auto;
    // border: 0.1rem solid red;

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

    .en-description {
      margin-top: 3rem;
    }

    .contact {
      margin-top: 9rem;

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
