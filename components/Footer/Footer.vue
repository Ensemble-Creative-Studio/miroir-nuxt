<template>
  <footer class="Footer">
    <ul>
      <li>
        <NuxtLink to="/legal">Legal</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/cookies">Cookies</NuxtLink>
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

  ul {
    display: flex;
    justify-content: center;

    li:not(:last-child) {
      margin-right: 2rem;
    }
  }
}
</style>
