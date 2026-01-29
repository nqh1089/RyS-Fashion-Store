<template>
  <div class="shop-page">
    <div class="breadcrumb-wrapper border-bottom">
      <div class="container-fluid px-md-5">
        <nav aria-label="breadcrumb" class="py-3">
          <ol class="breadcrumb mb-0 bg-transparent p-0">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-decoration-none text-dark opacity-75"
                >TRANG CHỦ</router-link
              >
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
            <li class="mb-2 fw-bold active">
              <a href="#" class="text-decoration-none text-danger">Áo dài</a>
            </li>
            <li class="mb-2"><a href="#" class="text-decoration-none text-dark">Đầm</a></li>
          </ul>
        </aside>

        <main class="col-lg-10 ps-lg-4">
          <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
            <h5 class="text-uppercase fw-bold fw-light m-0">
              {{ route.query.search ? `Kết quả cho: ${route.query.search}` : 'Áo dài' }}
            </h5>
            <div class="d-flex gap-4 small text-muted text-uppercase">
              <span class="cursor-pointer">Kích cỡ <i class="bi bi-chevron-down"></i></span>
              <span class="cursor-pointer">Màu sắc <i class="bi bi-chevron-down"></i></span>
              <span class="cursor-pointer">Giá <i class="bi bi-chevron-down"></i></span>
            </div>
          </div>

          <div class="product-grid-custom" v-if="filteredProducts.length > 0">
            <div v-for="product in filteredProducts" :key="product.id" class="product-item-fixed">
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

          <div v-else class="text-center py-5">
            <i class="bi bi-search fs-1 text-muted mb-3"></i>
            <p class="text-muted">
              Không tìm thấy sản phẩm nào phù hợp với từ khóa "{{ route.query.search }}"
            </p>
            <button class="btn btn-dark btn-sm mt-2" @click="resetSearch">
              Xem tất cả sản phẩm
            </button>
          </div>

          <div
            class="pagination-wrapper w-100 d-flex justify-content-center mt-5"
            v-if="filteredProducts.length > 0"
          >
            <nav aria-label="Page navigation example">
              <ul class="pagination pagination-custom border-0">
                <li class="page-item"><a class="page-link" href="#">&laquo;</a></li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
              </ul>
            </nav>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router' // Import thêm useRouter để reset
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const products = ref([])
const filteredProducts = ref([])

const fetchProducts = async () => {
  try {
    const response = await axios.get(
      'https://my-json-server.typicode.com/nqh1089/RyS-Fashion-Store/products',
    )
    products.value = response.data
    applyFilter()
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu:', error)
  }
}

const applyFilter = () => {
  const keyword = route.query.search?.toString().toLowerCase() || ''
  if (!keyword) {
    filteredProducts.value = products.value
  } else {
    // Lọc theo tên sản phẩm
    filteredProducts.value = products.value.filter((p) => p.name.toLowerCase().includes(keyword))
  }
}

const resetSearch = () => {
  router.push('/shop')
}

watch(
  () => route.query.search,
  () => {
    applyFilter()
  },
)

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
/* GIỮ NGUYÊN CSS CŨ CỦA BẠN */
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
  content: '/';
  color: #333;
}
.collection-banner img {
  display: block;
}

.product-grid-custom {
  display: grid;
  grid-template-columns: repeat(3, 319px);
  gap: 30px;
  justify-content: center;
  margin: 0 auto;
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
.img-main,
.img-hover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
}
.img-hover {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 2;
}
.product-card:hover .img-hover {
  opacity: 1;
}
.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  transform: translateX(-101%);
  transition: transform 0.4s ease;
}
.product-card:hover .product-overlay {
  transform: translateX(0);
}

.product-name {
  font-size: 15px;
  letter-spacing: 1px;
  color: #333;
}
.product-price {
  font-size: 13px;
  font-weight: 600;
}

.pagination-custom .page-link {
  color: #333;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  padding: 8px 16px;
  font-size: 14px;
  min-width: 40px;
  text-align: center;
  transition: all 0.2s ease;
}
.pagination-custom .page-item.active .page-link {
  background-color: #000 !important;
  border-color: #000 !important;
  color: #fff !important;
}

@media (max-width: 1200px) {
  .product-grid-custom {
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
}
</style>
