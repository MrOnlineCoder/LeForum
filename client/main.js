import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'

import moment from 'moment'

import App from './App.vue'
import HomeView from './views/Home.vue'
import InstallView from './views/Install.vue'
import RegisterView from './views/Register.vue'
import LoginView from './views/Login.vue'

import InfoService from './services/info'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(BootstrapVue);

const routes = [
  { path: '/home', component: HomeView },
  { path: '/install', component: InstallView },
  { path: '/register', component: RegisterView },
  { path: '/login', component: LoginView },
  { path: '*', redirect: '/home' }
];

var router = new VueRouter({
  routes
});

function runApp() {
  window.document.title = InfoService.get().name;

  const app = new Vue({
    router,
    render: (h) => h(App)
  }).$mount('#app');
}

function registerDirectives() {
  Vue.directive('title', (el, binding) => {
      console.log(binding);
      document.title = binding.value+' - '+InfoService.get().name;
  });
}

let services = 0;
const SERVICES_COUNT = 1;
//Initialize all services and then run
function serviceCallback() {
  services++;

  if (services => SERVICES_COUNT) {
    registerDirectives();
    runApp();
  }
}

InfoService.init(serviceCallback);
