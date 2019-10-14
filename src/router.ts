import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/account' },
    {
      path: '/account', component: () => import('./pages/Account.vue'),
      children: [
        { path: '', component: () => import('./components/account/HPersonInfoBody.vue') },
        { path: 'introduction', component: () => import('./components/account/HIntroduction.vue') },
        { path: 'personinfo', component: () => import('./components/account/HPersonInfoBody.vue') },
        { path: 'update/name', component: () => import('./components/account/update/Name.vue') },
        { path: 'update/birthday', component: () => import('./components/account/update/Birthday.vue') },
        { path: 'update/password', component: () => import('./components/account/update/Password.vue') },
        { path: 'update/sorry', component: () => import('./components/account/update/Sorry.vue') },
        { path: 'update/gender', component: () => import('./components/account/update/Gender.vue') },
        { path: 'update/phone', component: () => import('./components/account/update/Phone.vue') },
        { path: 'update/email', component: () => import('./components/account/update/Email.vue') },
      ],
    },
    {
      path: '/signin', component: () => import('./pages/SignIn.vue'),
      children: [
        { path: '', component: () => import('./components/signin/SignIn.vue') },
        { path: 'sorry', component: () => import('./components/signin/Sorry.vue') },
      ],
    },
    {
      path: '/signup', component: () => import('./pages/SignUp.vue'),
      children: [
        { path: '', component: () => import('./components/signup/SignUp.vue') },
        { path: 'phone', component: () => import('./components/signup/Phone.vue') },
        { path: 'verifyemail', component: () => import('./components/signup/VerifyEmail.vue') },
        { path: 'privacy', component: () => import('./components/signup/Privacy.vue') },
        { path: 'sorry', component: () => import('./components/signup/Sorry.vue') },
      ],
    },
  ],
});
