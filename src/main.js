import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

import { firestorePlugin } from 'vuefire'
import vuetify from './plugins/vuetify'
import router from './router'
Vue.use(firestorePlugin);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
