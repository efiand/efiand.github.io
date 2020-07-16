import Vue from 'vue';

// Добавляет внешний объект params в любой компонент
Vue.use({
  install() {
    Vue.mixin({
      props: {
        params: {
          type: Object,
          default: () => {
            return {};
          }
        }
      }
    });
  }
});
