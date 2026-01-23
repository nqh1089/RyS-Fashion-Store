<template>
  <div>
    <div class="py-2 bg-dark text-white text-center small tracking-widest">
      MIỄN PHÍ VẬN CHUYỂN ĐƠN HÀNG TỪ 500K
    </div>

    <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#">DevS</a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto text-uppercase fw-semibold small">
            <li class="nav-item"><a class="nav-link px-3" href="#">Sản phẩm mới</a></li>
            <li class="nav-item"><a class="nav-link px-3" href="#">Bộ sưu tập</a></li>
            <li class="nav-item"><a class="nav-link px-3" href="#">Áo sơ mi</a></li>
            <li class="nav-item"><a class="nav-link px-3" href="#">Đầm thiết kế</a></li>
            <li class="nav-item text-danger">
              <a class="nav-link px-3 text-danger" href="#">Sale Off</a>
            </li>
          </ul>
          <div class="d-flex align-items-center gap-3">
            <a href="#" class="text-dark"><i class="bi bi-search"></i></a>
            <a href="#" class="text-dark"><i class="bi bi-person"></i></a>
            <a href="#" class="text-dark position-relative">
              <i class="bi bi-bag"></i>
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                style="font-size: 0.6rem"
                >0</span
              >
            </a>
          </div>
        </div>
      </div>
    </nav>

    <Slider />
    <PromoBanners />

    <ProductCarousel sectionTitle="NEM ZEN" />
    <ProductCarousel sectionTitle="PAHU" />

    <PreFooter />
    <FooterContent />
  </div>
</template>

<script>
import Slider from './components/Client/Home/Slider.vue'
import PromoBanners from './components/Client/Home/PromoBanners.vue'
import ProductCarousel from './components/Client/Home/ProductCarousel.vue'
import PreFooter from './components/Client/Home/PreFooter.vue'
import FooterContent from './components/Client/Home/FooterContent.vue'

export default {
  components: {
    Slider,
    PromoBanners,
    ProductCarousel,
    PreFooter,
    FooterContent,
  },
}
</script>

<style>
/* Thiết lập chung */
body {
  font-family: 'Montserrat', sans-serif;
  color: #333;
  overflow-x: hidden;
}

.tracking-widest {
  letter-spacing: 0.15em;
  font-size: 0.75rem;
}

/* Navbar */
.nav-link {
  position: relative;
  transition: color 0.3s;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: 5px;
  left: 15%;
  background-color: #000;
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 70%;
}

/* Hero Section */
.hero-img {
  height: 80vh;
  object-fit: cover;
  filter: brightness(0.9);
}

/* Category Card */
.category-card img {
  transition: transform 0.6s ease;
}

.category-card:hover img {
  transform: scale(1.05);
}

.category-overlay {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  text-align: center;
}

/* Product Card */
.product-card {
  transition: all 0.3s ease;
}

.product-action {
  position: absolute;
  bottom: -50px;
  left: 0;
  right: 0;
  transition: bottom 0.3s ease;
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
