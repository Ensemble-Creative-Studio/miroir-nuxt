<script setup>
/* Sanity data */
const query = groq`*[_type == "legal"][0]`
const { data: legal, refresh } = useSanityQuery(query)

/* SEO */
useHead({
  title: 'Miroir | Legal',
})
</script>

<template>
  <div class="legal-page">
    <Annex :data="legal" />
  </div>
</template>

<style lang="scss">
.legal-page {
}
</style>
