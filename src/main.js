import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import FlashMessage from '@smartweb/vue-flash-message'


Vue.config.productionTip = false
Vue.use(FlashMessage);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

