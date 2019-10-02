import Vue from 'vue';
import cookie from 'js-cookie';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.authRequested) {
    if (cookie.get('Authorization') === undefined) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
