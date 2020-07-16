<template>
  <section
    class="welcome"
    :class="{ 'welcome--animated': needAnimate }">
    <h2 class="visually-hidden">
      {{ params.heading }}
    </h2>

    <p class="welcome__lead">
      {{ params.lead }}
    </p>

    <img
      class="welcome__img"
      :width="params.img.width"
      :height="params.img.height"
      :src="params.img.src"
      :alt="params.img.alt">
  </section>
</template>

<script>
export default {
  data() {
    return {
      needAnimate: true
    };
  },

  mounted() {
    this.blockAnimate();
  },

  methods: {
    blockAnimate() {
      // Если блок не влезает в первый экран
      if (this.$el.offsetHeight > window.innerHeight) {
        // Отменяем стартовую анимацию
        this.needAnimate = false;
      }
    }
  }
};
</script>

<style lang="scss">
.welcome {
  position: relative;
  background-color: $color-sky;

  &--animated {
    animation: appearFromDown 1s ease-in-out;

    .welcome__lead {
      animation: sweep 1.5s ease-in-out;
    }
  }
}

.welcome__lead {
  position: relative;
  margin: 0 auto 1.5em;
  padding: 24px 32px;
  font-family: $serif;
  text-align: center;
  background-color: #ffffff;
  border-radius: 24px;
  transform-origin: 50% 100%;

  @media (min-width: 769px) {
    padding: 32px 40px;
    font-size: 1.5rem;
  }

  @media (min-width: 961px) {
    padding: 64px 72px;
    font-size: 2rem;
  }

  &::after {
    content: "";
    position: absolute;
    top: 99%;
    left: 50%;
    border-top: 1em solid #ffffff;
    border-right: 1em solid transparent;
    border-left: 1em solid transparent;
    transform: translateX(-50%);
  }
}

.welcome__img {
  position: relative;
  z-index: 1;
  width: 200px;
  margin: 0 auto;

  @media (min-width: 361px) {
    width: 300px;
  }

  @media (min-width: 1025px) {
    width: 360px;
  }

  @media (min-width: 1400px) {
    width: 429px;
  }
}
</style>
