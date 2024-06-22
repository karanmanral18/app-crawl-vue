import {createRouter, createWebHistory} from 'vue-router'
import List from '../pages/client/List.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'clients',
      component: List,
    },
  ]
})

export default router
