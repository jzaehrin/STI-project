import Vue from 'vue';
import cookie from 'js-cookie';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

import { getUserLevel } from './utils/session';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.authRequested) {
    if (cookie.get('Authorization') === undefined) {
      next('/login');
    }
  }

  next();
});

router.beforeEach((to, from, next) => {
  if (to.meta.beAdmin) {
    if (getUserLevel() < 1) {
      next('/');
    }
  }

  next();
});

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
