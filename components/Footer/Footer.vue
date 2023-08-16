<script setup>
import anime from 'animejs/lib/anime.es.js'

onMounted(() => {
  /* Animate in */
  anime({
    targets: ['.Footer'],
    opacity: 1,
    duration: 1000,
    easing: 'easeInOutExpo',
    delay: 1000,
  })
})
</script>

<template>
  <footer class="Footer">
    <ul>
      <li>
        <NuxtLink to="/mentions-legales" name="Legal" title="Legal">Mentions légales</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/cookies" title="Cookies">Cookies</NuxtLink>
      </li>
    </ul>
  </footer>
</template>

<style lang="scss">
.Footer {
  margin-top: 15rem;
  padding-bottom: 1.5rem;
  text-transform: uppercase;
  font-size: 1.4rem;
  opacity: 0;

  ul {
    display: flex;
    justify-content: center;

    li:not(:last-child) {
      margin-right: 2rem;
    }
  }
}
</style>
