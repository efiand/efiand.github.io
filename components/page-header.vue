<template>
  <header class="header">
    <div
      class="header__inner container"
      :class="{ 'header__inner--index': isIndex() }">
      <h1 class="header__heading container">
        <nuxt-link
          class="header__link"
          to="/"
          :tag="isIndex() ? `span` : `a`">
          {{ params.heading }}
        </nuxt-link>
      </h1>

      <welcome
        v-if="isIndex()"
        class="header__welcome"
        :params="params.welcome"
      />
    </div>
  </header>
</template>

<script>
import Welcome from '@/components/welcome';

export default {
  components: {
    Welcome
  }
};
</script>

<style lang="scss">
.header {
  overflow: hidden;
  background-color: $color-sky;
}

.header__inner {
  &--index {
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-height: 412px;

    @media (min-width: 361px) {
      min-height: 504px;
    }

    @media (min-width: 480px) {
      min-height: 532px;
    }

    @media (min-width: 529px) {
      min-height: 502px;
    }

    @media (min-width: 769px) {
      min-height: 580px;
    }

    @media (min-width: 961px) {
      min-height: 733px;
    }

    @media (min-width: 1400px) {
      min-height: 748px;
    }
  }
}

.header__heading {
  margin: 0;
  padding: 2rem 0;
  font-weight: 400;
  font-size: 1rem;
  text-align: center;
  color: #ffffff;

  @media (min-width: 361px) {
    font-size: 1.5rem;
  }

  @media (min-width: 481px) {
    padding: 3rem 0;
  }
}

.header__link {
  display: inline-block;
  vertical-align: top;
  padding: 0 0.5em;

  &:not(:hover) {
    color: inherit;
  }
}

.header__welcome {
  margin: auto 0 0;
}
</style>
