import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        authRequested: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: () => import('./views/ChangePassword.vue'),
      meta: {
        authRequested: true,
      },
    },
    {
      path: '/message/new',
      name: 'createMessage',
      component: () => import('./views/CreateMessage.vue'),
      meta: {
        authRequested: true,
      },
    },
    {
      path: '/users',
      name: 'manageUsers',
      component: () => import('./views/ManageUsers.vue'),
      meta: {
        authRequested: true,
        beAdmin: true,
      },
    },
    {
      path: '/user/:id/edit',
      name: 'manageUser',
      component: () => import('./views/ManageUser.vue'),
      meta: {
        authRequested: true,
        beAdmin: true,
      },
    },
    {
      path: '/user/new',
      name: 'createUser',
      component: () => import('./views/CreateUser.vue'),
      meta: {
        authRequested: true,
        beAdmin: true,
      },
    },
    {
      path: '/message/:id',
      name: 'message',
      component: () => import('./views/Message.vue'),
      meta: {
        authRequested: true,
      },
    },
  ],
});
