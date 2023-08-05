<script setup>
/* Sanity data */
const query = groq`*[_type == "cookies"][0]`
const { data: cookies, refresh } = useSanityQuery(query)

/* SEO */
useHead({
  title: 'Miroir | Cookies',
})
</script>

<template>
  <div class="cookies-page">
    <Annex :data="cookies" />
  </div>
  <Footer />
</template>

<style lang="scss">
.cookies-page {
}
</style>
