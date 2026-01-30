<template>
  <div>
    <Slider />
    <PromoBanners />
    <ProductCarousel />
  </div>
</template>

<script>
// (../) để lùi ra ngoài thư mục views trước khi vào components
import Slider from '../components/Client/Home/HomeSlider.vue'
import PromoBanners from '../components/Client/Home/PromoBanners.vue'
import ProductCarousel from '../components/Client/Home/ProductCarousel.vue'

export default {
  components: {
    Slider,
    PromoBanners,
    ProductCarousel,
  },
}
</script>
