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
      path: '/about',
      name: 'about',
      component: () => import('../views/AppAbout.vue')
    },
    {
      path: '/competence',
      name: 'competence',
      component: () => import('../views/AppCompetence.vue')
    },
    {
      path: '/project',
      name: 'project',
      component: () => import('../views/AppProject.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/AppContact.vue')
    }
  ],
})

export default router
