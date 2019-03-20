import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Project from './views/Project.vue';
import About from './views/About.vue';
import Hobby from './views/Hobby.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/project',
      name: 'project',
      component: Project,
    },
    {
      path: '/hobby',
      name: 'hobby',
      component: Hobby,
    },
  ],
});
