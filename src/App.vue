<template>
  <div>
    <Navbar />
    <Slider />
    <PromoBanners />
    <ProductCarousel/>
    <ProductCarousel/>
    <PreFooter />
    <FooterContent />
  </div>
</template>

<script>
import Navbar from './components/Client/Home/HomeNavBar.vue'
import Slider from './components/Client/Home/Slider.vue'
import PromoBanners from './components/Client/Home/PromoBanners.vue'
import ProductCarousel from './components/Client/Home/ProductCarousel.vue'
import PreFooter from './components/Client/Home/PreFooter.vue'
import FooterContent from './components/Client/Home/FooterContent.vue'

export default {
  components: {
    Navbar,
    Slider,
    PromoBanners,
    ProductCarousel,
    PreFooter,
    FooterContent,
  },
}
</script>

<style>
/* CSS dùng chung cho mọi trang */
body {
  font-family: 'Montserrat', sans-serif;
  color: #333;
  overflow-x: hidden;
}

.tracking-widest {
  letter-spacing: 0.15em;
  font-size: 0.75rem;
}

/* Hiệu ứng thẻ sản phẩm dùng cho cả Home Carousel và Shop Grid */
.product-card {
  transition: all 0.3s ease;
  position: relative;
}

.product-action {
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  transition: bottom 0.3s ease;
  z-index: 5;
}

.product-card:hover .product-action {
  bottom: 0;
}

.small-btn {
  font-size: 0.7rem;
  padding: 10px;
}

/* Responsive fixes */
@media (max-width: 768px) {
  .hero-img {
    height: 50vh;
  }
}
</style>
