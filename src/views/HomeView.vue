<template>
  <div>
    <Slider />
    <PromoBanners />
    <ProductCarousel/>
  </div>
</template>

<script>
// Thêm một dấu chấm nữa (../) để lùi ra ngoài thư mục views trước khi vào components
import Slider from '../components/Client/Home/Slider.vue'
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
