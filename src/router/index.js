import { createRouter, createWebHistory } from 'vue-router'
import EmployeView from '@/views/employes/EmployeView.vue'
import HomeView from '@/views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"",
      component:HomeView
    },
    {
      path:"/employes",
      component:EmployeView
    }
  ]
})

export default router
