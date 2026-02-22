<template>
  <div class="pos-container">
    <div class="row g-0 h-100">
      <div class="col-md-8 border-end bg-light p-3">
        <div class="d-flex gap-2 mb-3">
          <input
            type="text"
            class="form-control rounded-0 border-0 shadow-sm"
            placeholder="Tìm tên hoặc mã sản phẩm..."
          />
          <select class="form-select rounded-0 border-0 shadow-sm w-25">
            <option>Tất cả danh mục</option>
            <option>Áo dài</option>
            <option>Váy</option>
          </select>
        </div>

        <div class="product-grid row g-3 overflow-auto" style="height: calc(100vh - 180px)">
          <div class="col-6 col-lg-3" v-for="p in products" :key="p.id">
            <div class="product-item bg-white p-2 shadow-sm text-center" @click="addToCart(p)">
              <div class="img-wrapper mb-2">
                <img :src="p.imgMain" class="img-fluid" alt="product" />
              </div>
              <p class="small fw-bold mb-1 text-uppercase text-truncate">{{ p.name }}</p>
              <span class="small text-dark">{{ p.price }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4 d-flex flex-column bg-white">
        <div class="p-3 border-bottom">
          <h6 class="text-uppercase tracking-widest fw-bold mb-0">Đơn hàng hiện tại</h6>
        </div>

        <div class="cart-items flex-grow-1 overflow-auto p-3">
          <div v-if="cart.length === 0" class="text-center mt-5 text-muted">
            <i class="bi bi-bag-x fs-1"></i>
            <p class="small mt-2">Giỏ hàng trống</p>
          </div>
          <div
            v-for="(item, index) in cart"
            :key="index"
            class="cart-item d-flex gap-2 mb-3 align-items-center"
          >
            <img :src="item.imgMain" width="40" height="50" class="object-fit-cover" />
            <div class="flex-grow-1">
              <p class="small fw-bold mb-0 text-uppercase">{{ item.name }}</p>
              <small class="text-muted">{{ item.price }} x {{ item.quantity }}</small>
            </div>
            <button class="btn btn-sm btn-light rounded-0" @click="removeFromCart(index)">
              <i class="bi bi-x"></i>
            </button>
          </div>
        </div>

        <div class="p-3 bg-light border-top">
          <div class="d-flex justify-content-between mb-2">
            <span class="small">Tạm tính:</span>
            <span class="small fw-bold">2.500.000đ</span>
          </div>
          <div class="d-flex justify-content-between mb-3 border-top pt-2">
            <span class="fw-bold">TỔNG CỘNG:</span>
            <span class="fw-bold text-danger">2.500.000đ</span>
          </div>
          <button class="btn btn-dark w-100 rounded-0 py-3 text-uppercase tracking-widest fw-bold">
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const cart = ref([])

onMounted(async () => {
  const res = await axios.get(
    'https://my-json-server.typicode.com/nqh1089/RyS-Fashion-Store/products',
  )
  products.value = res.data
})

const addToCart = (product) => {
  cart.value.push({ ...product, quantity: 1 })
}

const removeFromCart = (index) => {
  cart.value.splice(index, 1)
}
</script>

<style scoped>
.pos-container {
  height: calc(100vh - 80px); /* Trừ đi chiều cao AdminHeader */
  margin: -1.5rem; /* Để tràn ra sát lề p-4 của Main content */
}

.tracking-widest {
  letter-spacing: 0.15em;
}

.product-item {
  cursor: pointer;
  transition: 0.2s;
  border: 1px solid transparent;
}

.product-item:hover {
  border-color: #000;
  transform: translateY(-3px);
}

.img-wrapper {
  height: 120px;
  overflow: hidden;
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
