import { createApp } from 'vue'
import App from './App.vue'
import router from './router/Client' // Nhúng file router bạn đã tạo

// Nhúng Bootstrap và Icon
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Nhúng Slick Carousel CSS
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const app = createApp(App)

app.use(router) // Kích hoạt hệ thống chuyển trang
app.mount('#app')
