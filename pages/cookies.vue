<script setup>
/* Sanity data */
const query = groq`*[_type == "cookies"][0]`
const { data: cookies, refresh } = useSanityQuery(query)
</script>

<template>
  <Title>Miroir | Cookies</Title>
  <main class="cookies-page">
    <Annex :data="cookies" />
  </main>
  <Footer />
</template>

<style lang="scss">
.cookies-page {
}
</style>
