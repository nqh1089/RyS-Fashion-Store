import { createRouter, createWebHistory } from 'vue-router'
import adminRoutes from './Admin.js' // Nhận về mảng admin
import clientRoutes from './Client.js' // Nhận về mảng client
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  ...clientRoutes, // Giải nén mảng client
  ...adminRoutes, // Giải nén mảng admin
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
