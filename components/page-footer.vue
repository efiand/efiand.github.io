<template>
  <footer class="footer">
    <div class="container">
      <ul class="footer__links">
        <li
          v-for="link in params.links"
          :key="link.url">
          <a
            class="footer__link"
            :href="link.url"
            rel="noopener nofollow">
            {{ link.text }}
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {

};
</script>

<style lang="scss">
.footer {
  margin: auto 0 0;
  padding: 2rem 0 0;
  color: #ffffff;
  background-color: $color-text;
}

.footer__links {
  margin: 0 0 1rem;
  padding: 0;
  list-style: none;

  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.footer__link {
  display: table;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  color: inherit;

  @media (min-width: 768px) {
    margin: 0 1rem 0.5rem;
  }

  &:hover,
  &:focus {
    color: $color-link;
  }
}
</style>
