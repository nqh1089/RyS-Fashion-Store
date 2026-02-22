<template>
  <div class="pos-container">
    <div class="row g-0 h-100">
      <div class="col-md-8 border-end bg-light p-3">
        <div class="d-flex gap-2 mb-3">
          <div class="input-group shadow-sm">
            <span class="input-group-text bg-white border-0"><i class="bi bi-search"></i></span>
            <input
              type="text"
              class="form-control rounded-0 border-0 small"
              placeholder="Tìm tên sản phẩm..."
              v-model="searchQuery"
            />
          </div>
          <select
            class="form-select rounded-0 border-0 shadow-sm w-25 small"
            v-model="filterCategory"
          >
            <option value="">Tất cả danh mục</option>
            <option value="Hồng">Màu Hồng</option>
            <option value="Đỏ">Màu Đỏ</option>
          </select>
        </div>

        <div class="product-grid row g-3 overflow-auto" style="height: calc(100vh - 180px)">
          <div class="col-6 col-lg-3" v-for="p in filteredProducts" :key="p.id">
            <div
              v-if="p.status !== 'Ngừng bán'"
              class="product-item bg-white p-2 shadow-sm text-center position-relative"
              @click="addToCart(p)"
            >
              <div class="img-wrapper mb-2">
                <img :src="p.imgMain" class="img-fluid" alt="product" />
              </div>
              <p class="small fw-bold mb-1 text-uppercase text-truncate px-1">{{ p.name }}</p>
              <span class="small text-danger fw-bold">{{ p.price }}</span>
              <div class="add-overlay small text-uppercase">Thêm vào đơn</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4 d-flex flex-column bg-white shadow-lg">
        <div
          class="p-3 border-bottom d-flex justify-content-between align-items-center bg-dark text-white"
        >
          <h6 class="text-uppercase tracking-widest fw-bold mb-0 small">Đơn hàng hiện tại</h6>
          <button
            v-if="cart.length > 0"
            class="btn btn-sm btn-outline-light border-0 py-0"
            @click="clearCart"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>

        <div class="cart-items flex-grow-1 overflow-auto p-3 bg-white">
          <div v-if="cart.length === 0" class="text-center mt-5 text-muted py-5">
            <i class="bi bi-bag-x fs-1 opacity-25"></i>
            <p class="small mt-2">Chưa có sản phẩm nào</p>
          </div>

          <div
            v-for="(item, index) in cart"
            :key="item.id"
            class="cart-item d-flex gap-2 mb-3 align-items-center border-bottom pb-2"
          >
            <img
              :src="item.imgMain"
              width="45"
              height="60"
              class="object-fit-cover border shadow-sm"
            />
            <div class="flex-grow-1 overflow-hidden">
              <p class="small fw-bold mb-0 text-uppercase text-truncate">{{ item.name }}</p>
              <div class="d-flex align-items-center gap-2 mt-1">
                <button
                  class="btn btn-xs btn-outline-secondary py-0 px-1"
                  @click="updateQty(index, -1)"
                >
                  -
                </button>
                <span class="small fw-bold">{{ item.quantity }}</span>
                <button
                  class="btn btn-xs btn-outline-secondary py-0 px-1"
                  @click="updateQty(index, 1)"
                >
                  +
                </button>
                <span class="ms-auto small fw-bold">{{
                  formatCurrency(parsePrice(item.price) * item.quantity)
                }}</span>
              </div>
            </div>
            <button class="btn btn-sm text-danger" @click="removeFromCart(index)">
              <i class="bi bi-x-circle-fill"></i>
            </button>
          </div>
        </div>

        <div class="p-3 bg-light border-top shadow-sm">
          <div class="d-flex justify-content-between mb-2">
            <span class="small text-secondary">Số lượng:</span>
            <span class="small fw-bold">{{ totalItems }} món</span>
          </div>
          <div class="d-flex justify-content-between mb-3 border-top pt-2">
            <span class="fw-bold">TỔNG CỘNG:</span>
            <span class="fw-bold text-danger fs-5">{{ formatCurrency(totalPrice) }}</span>
          </div>
          <button
            class="btn btn-dark w-100 rounded-0 py-3 text-uppercase tracking-widest fw-bold shadow-sm"
            @click="handlePayment"
            :disabled="cart.length === 0"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>

    <div class="modal fade" id="paymentSuccessModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-0 border-0 shadow">
          <div class="modal-body text-center p-5">
            <div class="mb-4">
              <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem"></i>
            </div>
            <h5 class="fw-bold text-uppercase tracking-widest mb-3">Thanh toán thành công</h5>
            <p class="text-muted small mb-4">Thanh toán thành công đơn hàng!</p>

            <div class="bg-light p-3 mb-4 text-start">
              <div class="d-flex justify-content-between mb-2 small">
                <span>Tổng tiền:</span>
                <span class="fw-bold text-danger">{{ formatCurrency(lastTotal) }}</span>
              </div>
              <div class="d-flex justify-content-between small">
                <span>Hình thức:</span>
                <span class="fw-bold">Tiền mặt</span>
              </div>
            </div>

            <button
              type="button"
              class="btn btn-dark rounded-0 w-100 py-2 text-uppercase small fw-bold"
              data-bs-dismiss="modal"
            >
              Tạo đơn hàng mới
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Modal } from 'bootstrap'

// 1. DỮ LIỆU SẢN PHẨM FIX CỨNG
const SanPham = ref([
  {
    id: '1',
    name: 'ÁO DÀI 4 TÀ PHỐI HOẠ TIẾT',
    price: '1,899,000đ',
    color: 'Hồng',
    imgMain: '/src/assets/Shop/1.1_ao_dai_4_ta_phoi_hoa_tiet.jpg',
    status: 'Đang bán',
  },
  {
    id: '2',
    name: 'ÁO DÀI GẤM',
    price: '1,699,000đ',
    color: 'Hồng',
    imgMain: '/src/assets/Shop/2.1_ao_dai_gam.jpg',
    status: 'Đang bán',
  },
  {
    id: '3',
    name: 'ÁO DÀI GẤM HỒNG',
    price: '1,899,000đ',
    color: 'Hồng',
    imgMain: '/src/assets/Shop/3.1_ao_dai_gam_hong.jpg',
    status: 'Đang bán',
  },
  {
    id: '4',
    name: 'ÁO DÀI GẤM HOA ĐỎ',
    price: '1,799,000đ',
    color: 'Hồng',
    imgMain: '/src/assets/Shop/4.1_ao_dai_gam_hoa_do.jpg',
    status: 'Đang bán',
  },
  {
    id: '5',
    name: 'ÁO DÀI HỒNG THÊU',
    price: '849,500đ',
    color: 'Hồng',
    imgMain: '/src/assets/Shop/5.1_ao_dai_hong_theu.jpg',
    status: 'Đang bán',
  },
  {
    id: '6',
    name: 'ÁO DÀI ĐÍNH CƯỜM',
    price: '899,500đ',
    color: 'Đỏ',
    imgMain: '/src/assets/Shop/6.1_ao_dai_dinh_cuom.jpg',
    status: 'Đang bán',
  },
  {
    id: '7',
    name: 'ÁO DÀI ĐỎ CỔ TẾT',
    price: '799,500đ',
    color: 'Đỏ',
    imgMain: '/src/assets/Shop/7.1_ao_dai_do_co_tet.jpg',
    status: 'Đang bán',
  },
  {
    id: '8',
    name: 'ÁO DÀI THÊU HOA NỔI',
    price: '1,699,000đ',
    color: 'Đỏ',
    imgMain: '/src/assets/Shop/8.1_ao_dai_theu_hoa_noi.jpg',
    status: 'Đang bán',
  },
  {
    id: '9',
    name: 'ÁO DÀI KIM SA',
    price: '1,899,000đ',
    color: 'Đỏ',
    imgMain: '/src/assets/Shop/9.1_ao_dai_kim_sa.jpg',
    status: 'Đang bán',
  },
])

const cart = ref([])
const searchQuery = ref('')
const filterCategory = ref('')
const lastTotal = ref(0)
let successModal = null

onMounted(() => {
  successModal = new Modal(document.getElementById('paymentSuccessModal'))
})

// 2. CHỨC NĂNG TÌM KIẾM VÀ LỌC
const filteredProducts = computed(() => {
  return SanPham.value.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCate = filterCategory.value === '' || p.color === filterCategory.value
    return matchSearch && matchCate
  })
})

// 3. CHỨC NĂNG GIỎ HÀNG
const addToCart = (product) => {
  const found = cart.value.find((item) => item.id === product.id)
  if (found) {
    found.quantity++
  } else {
    cart.value.push({ ...product, quantity: 1 })
  }
}

const updateQty = (index, delta) => {
  const newQty = cart.value[index].quantity + delta
  if (newQty > 0) cart.value[index].quantity = newQty
}

const removeFromCart = (index) => cart.value.splice(index, 1)

const clearCart = () => {
  if (confirm('Xác nhận hủy đơn hàng hiện tại?')) cart.value = []
}

// 4. TIỀN TỆ
const parsePrice = (priceStr) => parseInt(priceStr.replace(/\D/g, ''))
const formatCurrency = (val) => val.toLocaleString('vi-VN') + 'đ'

const totalItems = computed(() => cart.value.reduce((sum, item) => sum + item.quantity, 0))
const totalPrice = computed(() =>
  cart.value.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0),
)

// 5. XỬ LÝ THANH TOÁN
const handlePayment = () => {
  lastTotal.value = totalPrice.value // Lưu lại giá trị để hiện modal
  successModal.show() // Hiện modal thành công
  cart.value = [] // Reset giỏ hàng
}
</script>

<style scoped>
.pos-container {
  height: calc(100vh - 80px);
  margin: -1.5rem;
}

.tracking-widest {
  letter-spacing: 0.15em;
}

.product-item {
  cursor: pointer;
  transition: 0.2s ease-in-out;
  border: 1px solid #eee;
  border-radius: 4px;
}

.product-item:hover {
  border-color: #000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

.product-item:hover .add-overlay {
  opacity: 1;
}

.add-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 10px;
  padding: 3px 0;
  opacity: 0;
  transition: 0.2s;
}

.img-wrapper {
  height: 140px;
  overflow: hidden;
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-xs {
  padding: 1px 6px;
  font-size: 12px;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
}
</style>
