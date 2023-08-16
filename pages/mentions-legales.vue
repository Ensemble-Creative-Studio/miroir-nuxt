<script setup>
/* Sanity data */
const query = groq`*[_type == "legal"][0]`
const { data: legal, refresh } = useSanityQuery(query)
</script>

<template>
  <Title>Miroir | Legal</Title>
  <main class="legal-page">
    <Annex :data="legal" />
  </main>
  <Footer />
</template>

<style lang="scss">
.legal-page {
}
</style>
