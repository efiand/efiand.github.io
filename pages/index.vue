<template>
  <main>
    <component
      :is="component.name"
      v-for="(component, i) in components"
      :key="i"
      :params="component.params"
    />
  </main>
</template>

<script>
export default {
  data() {
    return {
      ...require(`@/assets/data/pages/${this.$route.name}.json`)
    };
  },

  head() {
    const siteName = this.$store.state.layout.siteName;

    return {
      title: siteName,
      meta: [
        {
          name: `description`,
          content: this.$store.state.layout.pageDescription
        },
        {
          property: `og:title`,
          content: siteName
        },
        {
          property: `og:site_name`,
          content: siteName
        }
      ]
    };
  }
};
</script>
