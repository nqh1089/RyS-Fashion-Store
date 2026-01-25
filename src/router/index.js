import { createRouter, createWebHistory } from 'vue-router'
import adminRoutes from './Admin.js'
import clientRoutes from './Client.js'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  ...clientRoutes,
  ...adminRoutes,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { // Luôn cuộn về đầu trang khi chuyển trang
    return { top: 0 }
  },
})

export default router
