import { createRouter, createWebHistory } from 'vue-router'
import ClientLayout from '../layouts/ClientLayout.vue'
import HomeView from '../views/HomeView.vue'
import Shop from '../components/Client/Shop/ClientShop.vue'
import ViewProduct from '../components/Client/Shop/ViewProduct.vue'

const routes = [
  {
    path: '/',
    component: ClientLayout, // Bộ khung có Navbar + Footer
    children: [
      {
        path: '', // Trang chủ mặc định
        name: 'Home',
        component: HomeView // Nội dung Slider + Carousel
      },
      {
        path: 'shop',
        name: 'Shop',
        component: Shop
      },

      // route cho chi tiết sản phẩm
      {
        path: 'product/:id', // ":id" là tham số động để lấy đúng SP từ db.json
        name: 'ViewProduct',
        component: ViewProduct
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // THÊM ĐOẠN NÀY VÀO:
  scrollBehavior() {
  // Luôn luôn cuộn lên đầu trang
  return { top: 0 }
},
})

export default router
