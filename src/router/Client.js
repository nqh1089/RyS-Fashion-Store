import ClientLayout from '../layouts/ClientLayout.vue'
import HomeView from '../views/HomeView.vue'
import Shop from '../components/Client/Shop/ClientShop.vue'
import ViewProduct from '../components/Client/Shop/ViewProduct.vue'

const clientRoutes = [
  {
    path: '/',
    component: ClientLayout,
    children: [
      { path: '', name: 'Home', component: HomeView },
      { path: 'shop', name: 'Shop', component: Shop },
      { path: 'product/:id', name: 'ViewProduct', component: ViewProduct }
    ]
  }
]

export default clientRoutes
