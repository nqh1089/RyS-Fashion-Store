<template>
  <section class="product-carousel-section my-5">
    <div class="container position-relative mb-5">
      <div class="text-center mb-5">
        <h2 class="fw-light tracking-widest text-uppercase" style="font-size: 2rem">Tone Hồng Ngọt Ngào</h2>
      </div>

      <div class="nem-slick-slider" v-if="pinkProducts.length > 0">
        <div v-for="product in pinkProducts" :key="product.id" class="product-item">
          <div class="product-card">
            <div class="product-img-container">
              <router-link :to="`/product/${product.id}`">
                <img :src="product.imgMain" class="img-main" :alt="product.name" />
                <img :src="product.imgHover" class="img-hover" :alt="product.name + ' Hover'" />
                <div class="product-overlay">
                  <span class="btn-xem-them">XEM THÊM</span>
                </div>
              </router-link>
            </div>
            <div class="product-info">
              <p class="product-name fs-7">{{ product.name }}</p>
              <p class="product-price">{{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>

      <button class="custom-nav-btn slick-prev-btn"><i class="bi bi-chevron-left"></i></button>
      <button class="custom-nav-btn slick-next-btn"><i class="bi bi-chevron-right"></i></button>
    </div>

    <div class="container position-relative">
      <div class="text-center mb-5">
        <h2 class="fw-light tracking-widest text-uppercase" style="font-size: 2rem">Tone Đỏ Quyến Rũ</h2>
      </div>

      <div class="nem-slick-slider" v-if="redProducts.length > 0">
        <div v-for="product in redProducts" :key="product.id" class="product-item">
          <div class="product-card">
            <div class="product-img-container">
              <router-link :to="`/product/${product.id}`">
                <img :src="product.imgMain" class="img-main" :alt="product.name" />
                <img :src="product.imgHover" class="img-hover" :alt="product.name + ' Hover'" />
                <div class="product-overlay">
                  <span class="btn-xem-them">XEM THÊM</span>
                </div>
              </router-link>
            </div>
            <div class="product-info mt-2 text-center">
                <p class="product-name fs-7">{{ product.name }}</p>
                <p class="product-price">{{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>

      <button class="custom-nav-btn slick-prev-btn"><i class="bi bi-chevron-left"></i></button>
      <button class="custom-nav-btn slick-next-btn"><i class="bi bi-chevron-right"></i></button>
    </div>
  </section>
</template>

<script setup>
import { onMounted, nextTick, ref, computed } from 'vue'
import axios from 'axios'
import $ from 'jquery'
import 'slick-carousel'
import 'slick-carousel/slick/slick.css'

const allProducts = ref([])

// Load dữ liệu từ JSON Server
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/products')
    allProducts.value = response.data
  } catch (error) {
    console.error("Lỗi kết nối db.json:", error)
  }
}

// Logic lọc màu
const pinkProducts = computed(() => allProducts.value.filter(p => p.color === 'Hồng'))
const redProducts = computed(() => allProducts.value.filter(p => p.color === 'Đỏ'))

onMounted(async () => {
  await fetchProducts()
  await nextTick()

  if (typeof $.type !== 'function') {
    $.type = (obj) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
  }

  $('.nem-slick-slider').each(function () {
    const $this = $(this)
    const $container = $this.closest('.container')
    const $prev = $container.find('.slick-prev-btn')
    const $next = $container.find('.slick-next-btn')

    $this.slick({
      infinite: true,
      slidesToShow: 4, // Hiển thị 4 sản phẩm/hàng
      slidesToScroll: 1,
      prevArrow: $prev.length ? $prev : undefined,
      nextArrow: $next.length ? $next : undefined,
      responsive: [
        { breakpoint: 1200, settings: { slidesToShow: 3 } },
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 768, settings: { slidesToShow: 1 } },
      ],
    })
  })
})
</script>

<style>
/* --- 1. THIẾT LẬP CHUNG --- */
* {
  box-sizing: border-box; /* Reset giúp tính toán kích thước 321px chuẩn xác */
}

/* --- 2. CẤU TRÚC CARD SẢN PHẨM --- */
.product-card {
  width: 321px; /* Cố định theo kích thước ảnh chuẩn */
  margin: 0 auto 30px; /* Căn giữa card trong cột */
  display: flex;
  flex-direction: column;
  align-items: center; /* Căn giữa tên và giá theo chiều dọc */
}

.product-img-container {
  position: relative;
  width: 321px;
  height: 475.56px; /* Kích thước */
  overflow: hidden; /* Ẩn phần overlay khi chưa trượt vào */
  background-color: #f7f7f7;
}

.product-img-container a {
  display: block;
  width: 100%;
  height: 100%;
}

.product-img-container img {
  position: absolute; /* Đè ảnh lên nhau để tạo hiệu ứng đổi ảnh */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
}

.img-main {
  opacity: 1;
  z-index: 1;
}
.img-hover {
  opacity: 0;
  z-index: 2;
}

/* --- 3. HIỆU ỨNG HOVER & OVERLAY --- */
.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* Màu lớp nền mờ */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  transform: translateX(-101%); /* Mặc định ẩn bên trái */
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.btn-xem-them {
  color: #fff;
  border: 1px solid #fff;
  padding: 8px 25px;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  background-color: transparent;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-xem-them:hover {
  background-color: #fff !important; /* Tô trắng nền khi hover vào nút */
  color: #000 !important; /* Đổi màu chữ sang đen */
}

/* Kích hoạt đổi ảnh và trượt overlay khi hover card */
.product-card:hover .img-main {
  opacity: 0;
}
.product-card:hover .img-hover {
  opacity: 1;
}
.product-card:hover .product-overlay {
  transform: translateX(0);
}

/* --- 4. TÊN & GIÁ --- */
.product-info {
  width: 100%;
  padding-top: 5px; /* Giúp chữ sát lên chân ảnh */
  text-align: center;
}

.product-name {
  font-size: 15px;
  color: #333;
  text-transform: uppercase; /* In hoa toàn bộ */
  margin-bottom: 2px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Hiện dấu ... nếu tên quá dài */
}

.product-price {
  font-size: 15px;
  font-weight: 500; /* In đậm */
  color: #000;
  margin: 0;
}

/* --- 5. CẤU HÌNH SLIDER (SLICK SLIDER) --- */

/* 1. Lớp bọc ngoài cùng: CẮT PHẦN THỪA TẠI ĐÂY LÀ QUAN TRỌNG NHẤT */
.product-carousel-section {
  overflow: hidden; /* Cắt sạch phần ảnh thừa lòi ra ở 2 bên màn hình */
  width: 100%;
  position: relative;
}

/* 2. Container chứa: Phải để overflow visible để không bị mất nút vuông */
.product-carousel-section .container {
  position: relative;
  overflow: visible !important;
}

/* 3. Khung Slider: Đảm bảo không bị vỡ layout trước khi JS chạy */
.nem-slick-slider {
  display: block !important;
  width: 100%;
}

.product-item {
  padding: 0 10px;
  outline: none !important;
}

/* 4. Nút bấm hình vuông chuẩn */
.custom-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 999 !important; /* Luôn nằm trên ảnh */

  /* 1. Trạng thái bình thường: Trong suốt mờ đen nhẹ */
  background: rgba(0, 0, 0, 0.3) !important; /* Độ mờ 30% */
  color: #ffffff !important;
  border: none;

  width: 40px;
  height: 40px;
  border-radius: 0; /* hình vuông */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  opacity: 0; /* Mặc định ẩn, hiện khi hover */
  transition: all 0.3s ease;
}

/* Hiện nút khi di chuột vào vùng carousel */
.product-carousel-section:hover .custom-nav-btn {
  opacity: 1;
}

/* 2. Trạng thái khi hover vào chính cái nút: Đen đậm */
.custom-nav-btn:hover {
  background: #000000 !important;
  color: #ffffff !important;
}

/* 5. Vị trí nút*/
.slick-prev-btn {
  left: 27px; /* Nút trái */
}

.slick-next-btn {
  right: 13px; /* Nút phải */
}

.slick-slide,
.slick-track,
.slick-list {
  margin: 0 1.9px; /* Giữ khoảng cách đều giữa các slide (Dùng để chỉnh lại lề nếu có thừa mép ảnh) */
  overflow: hidden;
}
</style>
