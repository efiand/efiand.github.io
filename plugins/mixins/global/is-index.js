import Vue from 'vue';

// Главная ли страница
Vue.use({
  install() {
    Vue.mixin({
      methods: {
        isIndex() {
          return this.$route.name === `index`;
        }
      }
    });
  }
});
