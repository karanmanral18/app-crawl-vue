import {createRouter, createWebHistory} from 'vue-router'
import List from '../pages/client/List.vue'
import Create from '../pages/client/Create.vue'
import Edit from '../pages/client/Edit.vue'
import PageNotFoundView from '../pages/404.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'clients',
      component: List,
    },
    {
      path: '/clients/create',
      name: 'create-client',
      component: Create,
    },
    {
      path: '/clients/edit/:clientId',
      name: 'edit-client',
      component: Edit,
    },
    {
      path: "/:pathmatch(.*)*",
      component: PageNotFoundView,
      name: '404'
    },
  ]
})

export default router
