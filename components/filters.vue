<template>
  <nav class="filters container">
    <h2 class="page__heading">
      {{ params.heading }}
    </h2>
    <ul class="filters__list">
      <li>
        <nuxt-link
          class="filters__item"
          :class="{ 'filters__item--current': !$route.query.filter }"
          :to="`/`">
          {{ params.allText }} ({{ layout.works.length }})
        </nuxt-link>
      </li>
      <li
        v-for="(item, alias, i) in layout.filters"
        :key="i">
        <nuxt-link
          v-if="numberOfWorks(alias)"
          class="filters__item"
          :class="{ 'filters__item--current': alias === $route.query.filter }"
          :to="`/?filter=${alias}`">
          {{ item }} {{ numberOfWorks(alias) }}
        </nuxt-link>
        <p
          v-else
          class="filters__item"
          :class="{ 'filters__item--current': alias === $route.query.filter }">
          {{ item }}
        </p>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      layout: this.$store.state.layout
    };
  },

  methods: {
    numberOfWorks(filter) {
      const n = this.layout.works.filter((item) => {
        return ~item.filters.indexOf(filter);
      }).length;

      return n ? `(${n})` : null;
    }
  },

  head() {
    const title = `${this.layout.siteName}${this.params.pageTitle}`;

    let filterTitle = ``;
    if (this.$route.query.filter) {
      filterTitle = ` : ${this.layout.filters[this.$route.query.filter]}`;
    }

    return {
      title: `${title}${filterTitle}`
    };
  }
};
</script>

<style lang="scss">
.filters {
  margin: 3rem auto;
}

.filters__list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 -0.375rem;
  padding: 0;
  list-style: none;
}

.filters__item {
  display: block;
  margin: 0 0.375rem 0.375rem 0;
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  border-radius: 4px;

  &--current {
    background-color: $color-back;
    box-shadow: 0 0 0 2px currentColor;
  }
}
</style>
