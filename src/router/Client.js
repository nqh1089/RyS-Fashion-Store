import ClientLayout from '../layouts/ClientLayout.vue'
import HomeView from '../views/HomeView.vue'
import Shop from '../components/Client/Shop/ClientShop.vue'
import ViewProduct from '../components/Client/Shop/ViewProduct.vue'
import CartView from '@/components/Client/Shop/CartView.vue'

const clientRoutes = [
  {
    path: '/',
    component: ClientLayout,
    children: [
      { path: '', name: 'Home', component: HomeView },
      { path: 'shop', name: 'Shop', component: Shop },
      { path: 'product/:id', name: 'ViewProduct', component: ViewProduct },
      { path: 'cart', name: 'client.cart', component: CartView },
    ],
  },
]

export default clientRoutes
