<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const cartItems = ref([])
const totalPrice = ref(0)

const fetchCart = async () => {
  try {
    const response = await axios.get('http://localhost:3000/cart')
    cartItems.value = response.data
    calculateTotal()
  } catch (error) {
    console.error('Lỗi tải giỏ hàng:', error)
  }
}

const calculateTotal = () => {
  totalPrice.value = cartItems.value.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/\D/g, ''))
    return sum + priceNum * item.quantity
  }, 0)
}

const updateQty = async (item, delta) => {
  const newQty = item.quantity + delta
  if (newQty > 0) {
    await axios.put(`http://localhost:3000/cart/${item.id}`, { ...item, quantity: newQty })
    fetchCart() // Load lại dữ liệu
    window.dispatchEvent(new CustomEvent('cart-updated'))
  }
}

const removeItem = async (id) => {
  await axios.delete(`http://localhost:3000/cart/${id}`)
  fetchCart()
  window.dispatchEvent(new CustomEvent('cart-updated'))
}

const formatPrice = (num) => num.toLocaleString('vi-VN') + 'đ'

onMounted(() => fetchCart())
</script>

<template>
  <div class="cart-container py-5 bg-white">
    <div class="container">
      <h2 class="fw-bold mb-5 text-uppercase title-cart">Giỏ hàng</h2>

      <div class="table-responsive" v-if="cartItems.length > 0">
        <table class="table align-middle border-top cart-table">
          <thead>
            <tr class="text-uppercase small fw-semibold text-secondary">
              <th scope="col" class="border-0 py-3" style="width: 45%">Sản phẩm</th>
              <th scope="col" class="border-0 py-3 text-center">Giá</th>
              <th scope="col" class="border-0 py-3 text-center">Số lượng</th>
              <th scope="col" class="border-0 py-3 text-end">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id" class="border-bottom item-row">
              <td class="py-4">
                <div class="d-flex align-items-center">
                  <img :src="item.imgMain" class="img-product me-4 shadow-sm" />
                  <div class="info-product">
                    <h6 class="fw-bold mb-1 text-uppercase mb-2">{{ item.name }}</h6>
                    <p class="small text-muted mb-1">
                      Phiên bản: {{ item.size }} / {{ item.color }}
                    </p>
                    <a
                      href="javascript:void(0)"
                      @click="removeItem(item.id)"
                      class="text-dark small text-decoration-underline mt-2 d-inline-block"
                      >Xóa</a
                    >
                  </div>
                </div>
              </td>
              <td class="text-center">
                <div class="fw-bold">{{ item.price }}</div>
              </td>
              <td class="text-center">
                <div class="qty-wrapper d-inline-flex border">
                  <button @click="updateQty(item, -1)" class="btn btn-sm border-0 px-2 py-1">
                    <i class="bi bi-chevron-left x-small"></i>
                  </button>
                  <input
                    type="text"
                    :value="item.quantity"
                    class="border-0 text-center qty-input shadow-none"
                    readonly
                  />
                  <button @click="updateQty(item, 1)" class="btn btn-sm border-0 px-2 py-1">
                    <i class="bi bi-chevron-right x-small"></i>
                  </button>
                </div>
              </td>
              <td class="text-end fw-bold">
                {{ formatPrice(parseInt(item.price.replace(/\D/g, '')) * item.quantity) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center py-5">
        <p class="text-muted">Giỏ hàng của bạn đang trống.</p>
        <router-link to="/shop" class="btn btn-dark rounded-0 px-4">QUAY LẠI CỬA HÀNG</router-link>
      </div>

      <div class="row mt-5 pt-3" v-if="cartItems.length > 0">
        <div class="col-lg-7"></div>
        <div class="col-lg-5 text-end mt-4 mt-lg-0">
          <div class="mb-4 total-summary">
            <span class="text-secondary me-3">Tổng tiền</span>
            <span class="fs-3 fw-bold">{{ formatPrice(totalPrice) }}</span>
          </div>
          <div class="d-flex justify-content-end gap-2 action-btns">
            <!-- <button
              class="btn btn-outline-dark rounded-0 px-4 py-3 text-uppercase fw-bold small transition-all"
            >
              Cập nhật
            </button> -->
            <button
              class="btn btn-dark rounded-0 px-5 py-3 text-uppercase fw-bold small shadow-sm transition-all"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-cart {
  letter-spacing: 2px;
}
.img-product {
  width: 130px;
  height: 180px;
  object-fit: cover;
}
.breadcrumb-item + .breadcrumb-item::before {
  content: '/';
  font-size: 10px;
}
.x-small {
  font-size: 11px;
}

.cart-table th {
  letter-spacing: 1px;
  color: #666;
}
.qty-input {
  width: 45px;
  font-size: 14px;
  background: transparent;
  font-weight: 500;
}
.qty-wrapper button:hover {
  background-color: #f8f9fa;
}

.transition-all {
  transition: all 0.3s ease;
}
.transition-all:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

/* Đưa màu badge về đen đúng chất NEM */
.bg-black {
  background-color: #000 !important;
}

@media (max-width: 768px) {
  .img-product {
    width: 80px;
    height: 110px;
  }
  .action-btns button {
    padding: 10px 15px !important;
    flex: 1;
  }
}
</style>
