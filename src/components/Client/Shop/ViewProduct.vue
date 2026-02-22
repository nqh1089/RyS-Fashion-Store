<template>
  <div class="product-detail-page py-5" v-if="product">
    <div class="container px-md-5">
      <nav aria-label="breadcrumb" class="mb-4">
        <ol
          class="breadcrumb small text-uppercase fw-semibold tracking-widest border-0 bg-transparent p-0"
        >
          <li class="breadcrumb-item">
            <router-link to="/" class="text-dark text-decoration-none">TRANG CHỦ</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/shop" class="text-dark text-decoration-none">ÁO DÀI</router-link>
          </li>
          <li class="breadcrumb-item active text-dark" aria-current="page">
            {{ product.name }}
          </li>
        </ol>
      </nav>

      <div class="row g-5 align-items-start">
        <div class="col-lg-7">
          <div class="row g-2">
            <div class="col-2 d-none d-md-block">
              <div class="thumb-list d-flex flex-column gap-2">
                <img
                  :src="product.imgMain"
                  class="img-thumbnail border-0 p-0"
                  :class="{ 'active-thumb': activeImage === product.imgMain }"
                  @click="activeImage = product.imgMain"
                  alt="thumb 1"
                />
                <img
                  :src="product.imgHover"
                  class="img-thumbnail border-0 p-0"
                  :class="{ 'active-thumb': activeImage === product.imgHover }"
                  @click="activeImage = product.imgHover"
                  alt="thumb 2"
                />
              </div>
            </div>

            <div class="col-10">
              <div class="main-image-wrapper bg-light">
                <img :src="activeImage" class="img-fluid w-100 main-view-img" :alt="product.name" />
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="product-info-sticky">
            <h1 class="h4 fw-bold text-uppercase mb-2 tracking-tighter">{{ product.name }}</h1>
            <p class="text-muted small mb-3">Mã SP: {{ product.id }}</p>

            <h3 class="fw-bold mb-4">{{ product.price }}</h3>

            <div class="mb-4">
              <div class="d-flex justify-content-between mb-2">
                <span class="small fw-bold">KÍCH THƯỚC</span>
              </div>
              <div class="d-flex gap-2">
                <button
                  v-for="size in ['Size 4', 'Size 6', 'Size 8', 'Size 10']"
                  :key="size"
                  @click="selectedSize = size"
                  :class="[
                    'btn btn-outline-dark btn-sm rounded-0 px-3 py-2',
                    { 'bg-dark text-white': selectedSize === size },
                  ]"
                >
                  {{ size }}
                </button>
              </div>
              <br />
              <a href="#" class="small text-dark text-decoration-underline mt-3"
                >HƯỚNG DẪN CHỌN SIZE</a
              >
            </div>

            <div class="mb-4">
              <span class="small fw-bold d-block mb-2">MÀU SẮC</span>
              <div
                class="color-dot rounded-circle border p-1 d-inline-block"
                :style="{
                  backgroundColor: product.color === 'Đỏ' ? '#8B0000' : '#FFC0CB',
                  width: '30px',
                  height: '30px',
                }"
              ></div>
            </div>

            <div class="d-flex flex-column gap-2 mb-5">
              <div
                class="quantity-input border d-inline-flex align-items-center justify-content-between px-3 py-2 mb-2"
                style="width: 120px"
              >
                <span class="cursor-pointer" @click="quantity > 1 ? quantity-- : null">-</span>
                <span>{{ quantity }}</span>
                <span class="cursor-pointer" @click="quantity++">+</span>
              </div>

              <button
                @click="addToCart"
                class="btn btn-outline-dark rounded-0 py-3 fw-bold text-uppercase"
              >
                Thêm vào giỏ
              </button>
              <button class="btn btn-dark rounded-0 py-3 fw-bold text-uppercase">Mua ngay</button>
            </div>

            <div class="product-description small text-muted">
              <p><strong>Chất liệu:</strong> Vải gấm</p>
              <p>
                <strong>Kiểu dáng:</strong> Áo dài thiết kế dáng chiết eo giúp tôn dáng tối đa, sử
                dụng phần cổ truyền thống mang tới sự thanh lịch cho người mặc.
              </p>
              <p><strong>Sản phẩm thuộc dòng:</strong> Áo dài</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr />

  <RelatedProducts />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import RelatedProducts from './RelatedProducts.vue'

const route = useRoute()
const product = ref(null)
const activeImage = ref('')
const quantity = ref(1)
const selectedSize = ref('Size 6')

const fetchProductDetail = async () => {
  try {
    const id = route.params.id
    const response = await axios.get(`http://localhost:3000/products/${id}`)
    product.value = response.data
    activeImage.value = response.data.imgMain
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu:', error)
  }
}

const addToCart = async () => {
  try {
    // 1. Kiểm tra giỏ hàng hiện tại từ localhost:3000
    const { data: currentCart } = await axios.get('http://localhost:3000/cart')
    const existingItem = currentCart.find(
      (item) => item.productId === product.value.id && item.size === selectedSize.value,
    )

    if (existingItem) {
      // 2. Cập nhật số lượng nếu đã có
      await axios.put(`http://localhost:3000/cart/${existingItem.id}`, {
        ...existingItem,
        quantity: existingItem.quantity + quantity.value,
      })
    } else {
      // 3. Thêm mới nếu chưa có
      const newItem = {
        productId: product.value.id,
        name: product.value.name,
        price: product.value.price,
        imgMain: product.value.imgMain,
        color: product.value.color,
        size: selectedSize.value,
        quantity: quantity.value,
      }
      await axios.post('http://localhost:3000/cart', newItem)
    }

    // Phát sự kiện cập nhật Header
    window.dispatchEvent(new CustomEvent('cart-updated'))
    alert('Đã thêm sản phẩm vào giỏ hàng thành công!')
  } catch (error) {
    console.error('Lỗi khi thêm vào giỏ:', error)
  }
}

watch(
  () => route.params.id,
  (newId) => {
    if (newId) fetchProductDetail()
  },
)

onMounted(() => {
  fetchProductDetail()
})
</script>

<style scoped>
/* CSS giữ nguyên như code bạn đã cung cấp */
.breadcrumb {
  font-size: 11px;
  letter-spacing: 2px;
}
.img-thumbnail {
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: 8px !important;
  opacity: 0.7;
}
.img-thumbnail:hover {
  opacity: 1 !important;
  transform: scale(1.05);
  z-index: 1;
}
.active-thumb {
  opacity: 1 !important;
  border: 1px solid #000 !important;
  transform: scale(1);
}
.main-view-img {
  transition: opacity 0.3s ease-in-out;
  border-radius: 4px;
}
.quantity-input span {
  user-select: none;
}
.cursor-pointer {
  cursor: pointer;
  font-weight: bold;
}
.btn:hover {
  opacity: 0.9;
}
.color-dot {
  cursor: pointer;
}
.tracking-tighter {
  letter-spacing: -0.5px;
}
</style>
