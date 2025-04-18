import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/AppHome.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/AppContact.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AppAbout.vue')
    }
  ],
})

export default router
