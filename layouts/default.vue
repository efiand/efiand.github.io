<template>
  <div class="page__body">
    <page-header :params="$store.state.layout.header" />

    <nuxt class="page__main" />

    <page-footer :params="$store.state.layout.footer" />
  </div>
</template>

<script>
import PageHeader from "~/components/page-header";
import PageFooter from "~/components/page-footer";

export default {
  components: {
    PageHeader,
    PageFooter
  },

  mounted() {
    // Переход на url без расширения (актуально для статики на github pages)
    if (window.location.pathname.indexOf(`/index`) === 0) {
      window.location.pathname = `/`;
    } else if (~window.location.pathname.indexOf(`.html`)) {
      window.location.href = window.location.href.replace(/\.html$/, ``);
    }

    // Добавление класса для контроля ширины в модальном режиме
    document.body.classList.add(`js-fullwidth`);
  },

  head() {
    const url = `${this.$store.state.layout.host}${this.$route.fullPath}`;

    return {
      link: [
        {
          rel: `canonical`,
          href: url
        }
      ],
      meta: [
        {
          name: `apple-mobile-web-app-title`,
          content: this.$store.state.layout.siteName
        },
        {
          property: `og:url`,
          content: url
        },
        {
          property: `og:image`,
          content: this.$store.state.layout.ogImage
        },
        {
          property: `og:image:alt`,
          content: this.$store.state.layout.ogImageAlt
        }
      ]
    };
  }
};
</script>
