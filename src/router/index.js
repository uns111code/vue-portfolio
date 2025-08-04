import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/AppHome.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'acceuil',
      component: Home
    },
    {
      path: '/about',
      name: 'profil',
      component: () => import('../views/AppAbout.vue')
    },
    {
      path: '/competence',
      name: 'compétences',
      component: () => import('../views/AppCompetence.vue')
    },
    {
      path: '/project',
      name: 'portfolio',
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
