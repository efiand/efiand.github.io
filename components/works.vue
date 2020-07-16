<template>
  <section class="works container">
    <h2 class="page__heading">
      {{ heading }}
    </h2>
    <p
      v-if="mainText"
      class="page__description">
      {{ mainText }}
    </p>
    <ul
      v-if="works.length"
      class="works__list">
      <li
        v-for="item in works"
        :key="item.name"
        class="works__item">
        <a
          class="works__figure"
          :href="item.deploy"
          target="_blank"
          rel="noopener nofollow">
          <img
            class="works__img"
            :src="item.img"
            :alt="item.name">
        </a>
        <div class="works__content">
          <h3 class="works__name">
            {{ item.name }}
          </h3>
          <p class="works__description">
            {{ item.description }}
          </p>
          <time class="works__time">
            {{ item.time }}
          </time>
          <ul class="works__options">
            <li
              v-for="(value, key, i) in item.options"
              :key="i">
              <a
                class="works__optlink"
                :href="value"
                target="_blank"
                rel="noopener">
                {{ params.texts[key] }}
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      layout: this.$store.state.layout
    };
  },

  computed: {
    filter() {
      return this.$route.query.filter;
    },

    works() {
      const list = this.layout.works;

      if (this.filter) {
        return list.filter((item) => {
          return ~item.filters.indexOf(this.filter);
        });
      }

      return list;
    },

    heading() {
      if (this.filter) {
        return this.params.headingWithFilters.replace(`%s`, this.layout.filters[this.filter]);
      }

      return this.params.heading;
    },

    mainText() {
      let key = `all`;

      if (this.works.length) {
        if (this.filter) {
          if (this.params.texts[this.filter]) {
            key = this.filter;
          } else {
            return null;
          }
        }
      } else {
        key = `no`;
      }

      return this.params.texts[key];
    }
  }
};
</script>

<style lang="scss">
.works__list {
  margin: 0 0 0 -40px;
  padding: 0;
  list-style: none;

  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
}

.works__item {
  box-sizing: border-box;
  margin: 0 0 40px 40px;
  background-color: #ffffff;
  border-radius: 4px;

  @media (min-width: 768px) {
    width: calc(50% - 40px);
  }

  @media (min-width: 1180px) {
    width: calc(#{(100% / 3)} - 40px);
  }

  @media (min-width: 1440px) {
    width: 440px;
  }
}

.works__figure {
  display: block;
  overflow: hidden;
  border-radius: 4px 4px 0 0;

  &[href]:hover:not(:active),
  &:focus:not(:active) {
    background-color: rgba($color-link, 0.5);
  }

  &[href]:hover,
  &:focus,
  &[href]:active {
    .works__img {
      opacity: 0.5;
    }
  }
}

.works__img {
  width: 100%;
  transition: inherit;
}

.works__content {
  padding: 2rem;
}

.works__name {
  margin: 0 0 0.75rem;
  font-weight: 700;
  font-size: 1.5rem;
}

.works__description {
  margin: 0 0 1rem;
  font-family: $serif;

  @media (min-width: 768px) {
    min-height: 3rem;
  }
}

.works__time {
  display: block;
  margin: 0 0 1rem;
  font-size: 0.75em;
  opacity: 0.75;
}

.works__options {
  margin: 0;
  padding: 0;
  list-style: none;
}

.works__optlink {
  display: inline-block;
  vertical-align: top;
  margin: 0 0 0 -0.5rem;
  padding: 0 0.5rem;
}
</style>
