/*
  LeForum Frontend Entry Point
*/

//Import The Vue
import Vue from 'vue'

//this.$http and this.$router
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

//WYSIWYG editor
import VueQuillEditor from 'vue-quill-editor'

//fancy wrap around Bootstrap for Vue
import BootstrapVue from 'bootstrap-vue'

//Time
import moment from 'moment'

//LeForum Views
import App from './App.vue'

import HomeView from './views/Home.vue'
import InstallView from './views/Install.vue'
import RegisterView from './views/Register.vue'
import LoginView from './views/Login.vue'
import StaffView from './views/Staff.vue'
import ProfileView from './views/Profile.vue'
import AdminView from './views/Admin.vue'
import RulesView from './views/Rules.vue'
import CategoryView from './views/Category.vue'
import NewTopicView from './views/NewTopic.vue'
import TopicView from './views/Topic.vue'
import NotificationsView from './views/Notifications.vue'

//Client Services
import InfoService from './services/info'
import Session from './services/session'
import Utils from './services/utils'


//Include Quill styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//Font Awesome icons
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(solid)

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

//Clipboard
import ClipboardJS from 'clipboard'

new ClipboardJS('.shareButton');

//Scroll to
import VueScrollTo from 'vue-scrollto';
Vue.use(VueScrollTo)

//Setup all Vue plugins
Vue.use(VueScrollTo)
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.use(VueQuillEditor);
Vue.component('font-awesome-icon', FontAwesomeIcon);
//

const routes = [
  { path: '/home', component: HomeView },
  { path: '/install', component: InstallView },
  { path: '/register', component: RegisterView },
  { path: '/staff', component: StaffView },
  { path: '/login', component: LoginView },
  { path: '/profile/:id', component: ProfileView },
  { path: '/profile', component: ProfileView },
  { path: '/admincp', component: AdminView },
  { path: '/rules', component: RulesView },
  { path: '/category/:c', component: CategoryView },
  { path: '/category/:c/new', component: NewTopicView },
  { path: '/topic/:id', component: TopicView },
  { path: '/topic/:id/:post', component: TopicView },
  { path: '/notifications', component: NotificationsView },
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

function registerFilters() {
  Vue.filter('formatDate', Utils.formatDate);
  Vue.filter('formatDateTime', Utils.formatDateTime);
  Vue.filter('formatGroupTitle', InfoService.getGroupTitle);
}

function registerDirectives() {
  Vue.directive('title', (el, binding) => {
      document.title = binding.value+' - '+InfoService.get().name;
  });
}

let services = 0;
const SERVICES_COUNT = 2;

//Initialize all services and then run
function serviceCallback() {
  services++;
  console.log('Registered service #'+services);

  if (services == SERVICES_COUNT) {
    console.log('Services registered, launching application...');
    registerDirectives();
    registerFilters();
    runApp();
  }
}

InfoService.init(serviceCallback);
Session.init(serviceCallback);
