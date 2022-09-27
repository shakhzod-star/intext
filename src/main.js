import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './app.scss'
import VueMask from 'v-mask'
import i18n from  './i18n';
import AOS from 'aos'
import '@/assets/style/aos.css'





Vue.config.productionTip = false
Vue.use(VueMask);
Vue.use(AOS.init())
new Vue({
  i18n,
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
