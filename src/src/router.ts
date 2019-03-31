import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('@/views/Home.vue');
const Project = () => import('@/views/Project.vue');
const Blogs = () => import('@/views/Blogs.vue');
const About = () => import('@/views/About.vue');

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
      path: '/blogs',
      name: 'blogs',
      component: Blogs,
    },
  ],
});
