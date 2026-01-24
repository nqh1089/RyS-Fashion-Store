<template>
  <div class="shop-page">
    <div class="breadcrumb-wrapper border-bottom">
      <div class="container-fluid px-md-5">
        <nav aria-label="breadcrumb" class="py-3">
          <ol class="breadcrumb mb-0 bg-transparent p-0">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-decoration-none text-dark opacity-75">TRANG CHỦ</router-link>
            </li>
            <li class="breadcrumb-item active text-dark fw-bold" aria-current="page">ÁO DÀI</li>
          </ol>
        </nav>
      </div>
    </div>

    <section class="collection-banner mb-5">
      <div class="container-fluid px-0">
        <img
          src="https://file.hstatic.net/200000182297/file/bw2_b9e6b447b92c47288ccb745919f2780b.jpg"
          class="img-fluid w-100"
          alt="BST Áo Dài"
        />
      </div>
    </section>

    <div class="container-fluid px-md-5 mb-5">
      <div class="row">
        <aside class="col-lg-2 d-none d-lg-block border-end pe-4">
          <h6 class="fw-bold text-uppercase small mb-3 tracking-widest">Danh mục</h6>
          <ul class="list-unstyled sidebar-menu small">
            <li class="mb-2 fw-bold active"><a href="#" class="text-decoration-none text-danger">Áo dài</a></li>
            <li class="mb-2"><a href="#" class="text-decoration-none text-dark">Đầm</a></li>
          </ul>
        </aside>

        <main class="col-lg-10 ps-lg-4">
          <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
            <h5 class="text-uppercase fw-bold fw-light m-0">Áo dài</h5>
            <div class="d-flex gap-4 small text-muted text-uppercase">
              <span class="cursor-pointer">Kích cỡ <i class="bi bi-chevron-down"></i></span>
              <span class="cursor-pointer">Màu sắc <i class="bi bi-chevron-down"></i></span>
              <span class="cursor-pointer">Giá <i class="bi bi-chevron-down"></i></span>
            </div>
          </div>

          <div class="product-grid-custom">
            <div v-for="product in products" :key="product.id" class="product-item-fixed">
              <div class="product-card border-0">
                <div class="product-img-container shadow-sm">
                  <router-link :to="`/product/${product.id}`">
                    <img :src="product.imgMain" class="img-main" />
                    <img :src="product.imgHover" class="img-hover" />
                    <div class="product-overlay">
                      <span class="btn-xem-them">XEM THÊM</span>
                    </div>
                  </router-link>
                </div>
                <div class="product-info mt-2 text-center">
                  <p class="product-name">{{ product.name }}</p>
                  <p class="product-price">{{ product.price }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="pagination-wrapper w-100 d-flex justify-content-center mt-5">
            <nav aria-label="Page navigation example">
              <ul class="pagination pagination-custom border-0">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Khởi tạo mảng sản phẩm rỗng
const products = ref([]);

// Hàm gọi API từ JSON Server (Port 3000)
const fetchProducts = async () => {
  try {
    // const response = await axios.get('http://localhost:3000/products');
    const response = await axios.get('https://my-json-server.typicode.com/nqh1089/RyS-Fashion-Store/products');
    products.value = response.data;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu từ server:", error);
  }
};

// Thực thi khi component được gắn vào giao diện
onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
/* GIỮ NGUYÊN TOÀN BỘ CSS CỦA BẠN */
.container-fluid.px-md-5 {
  padding-left: 15% !important;
  padding-right: 15% !important;
}
.breadcrumb-wrapper {
  background-color: #fff;
}
.breadcrumb-item {
  font-size: 11px;
  letter-spacing: 0.1em;
}
.breadcrumb-item + .breadcrumb-item::before {
  content: "/";
  color: #333;
}
.collection-banner img {
  display: block;
}
.product-grid-custom {
  display: grid;
  grid-template-columns: repeat(3, 320px);
  gap: 30px;
  justify-content: start;
}
.product-item-fixed {
  width: 319px;
}
.product-img-container {
  position: relative;
  width: 319px !important;
  height: 472px !important;
  overflow: hidden;
  background-color: #f7f7f7;
}
.img-main, .img-hover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
}
.img-hover { position: absolute; top: 0; left: 0; opacity: 0; z-index: 2; }
.product-card:hover .img-hover { opacity: 1; }
.product-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex; justify-content: center; align-items: center;
  z-index: 3; transform: translateX(-101%);
  transition: transform 0.4s ease;
}
.product-card:hover .product-overlay { transform: translateX(0); }

.product-name {
  font-size: 15px;
  letter-spacing: 1px; /* Tăng khoảng cách chữ giống Format */
  color: #333;
}
.product-price {
  font-size: 13px;
  font-weight: 600;
}

/* Số trang (Pagination) */
/* Tùy chỉnh thanh phân trang căn giữa */
.pagination-wrapper {
  /* Đảm bảo khoảng cách với lưới sản phẩm phía trên */
  padding-top: 20px;
}

.pagination-custom {
  gap: 5px; /* Tạo khoảng cách nhỏ giữa các ô số */
}

.pagination-custom .page-link {
  color: #333;
  background-color: #fff;
  border: 1px solid #e0e0e0; /* Viền xám nhạt tinh tế */
  padding: 8px 16px;
  font-size: 14px;
  min-width: 40px;
  text-align: center;
  transition: all 0.2s ease;
}

/* Ô đang được chọn: Nền đen, chữ trắng */
.pagination-custom .page-item.active .page-link {
  background-color: #000 !important;
  border-color: #000 !important;
  color: #fff !important;
  font-weight: bold;
}

.pagination-custom .page-link:hover {
  background-color: #f5f5f5;
  color: #000;
  border-color: #ccc;
}

/* Xóa bỏ hiệu ứng đổ bóng xanh mặc định của Bootstrap */
.pagination-custom .page-link:focus {
  box-shadow: none;
}

.product-grid-custom {
  display: grid;
  grid-template-columns: repeat(3, 319px); /* Khớp với độ rộng card */
  gap: 30px;
  justify-content: center; /* Đưa cả cụm 3 cột vào giữa */
  margin: 0 auto;
}

@media (max-width: 1200px) {
  .product-grid-custom {
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
}
</style>
