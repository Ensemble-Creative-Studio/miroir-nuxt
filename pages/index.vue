<script setup>
const query = groq`*[_type == "brand"]`
const { data: brands, refresh } = useSanityQuery(query)
</script>

<template>
  <div>
    <h1>Brands</h1>
    <div>
      <div v-for="brand in brands">{{ brand }}</div>
    </div>
  </div>
</template>
