import Vue from 'vue';

// Добавляет определение полосы прокрутки
Vue.use({
  install() {
    Vue.mixin({
      data() {
        return {
          scrollWidth: 0
        };
      },

      methods: {
        getScrollWidth() {
          // Создание временного элемента с прокруткой
          const div = document.createElement(`div`);

          div.style.overflowY = `scroll`;
          div.style.width = `50px`;
          div.style.height = `50px`;
          div.style.visibility = `hidden`;

          document.body.appendChild(div);

          this.scrollWidth = div.offsetWidth - div.clientWidth;

          document.body.removeChild(div);
        }
      }
    });
  }
});
