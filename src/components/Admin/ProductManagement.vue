<template>
  <div class="product-management">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="search-wrapper w-25">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0 rounded-0">
            <i class="bi bi-search"></i>
          </span>
          <input
            type="text"
            class="form-control border-start-0 rounded-0 small"
            v-model="TuKhoaTimKiem"
            placeholder="Tìm tên sản phẩm..."
          />
        </div>
      </div>
      <button
        class="btn btn-dark rounded-0 px-4 py-2 text-uppercase tracking-widest small"
        @click="openModal()"
      >
        <i class="bi bi-plus-lg me-2"></i> Thêm sản phẩm
      </button>
    </div>

    <div class="card border-0 shadow-sm rounded-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr class="text-uppercase tracking-widest small text-secondary">
              <th class="ps-4 py-3">Ảnh</th>
              <th class="ps-4 py-3">Tên sản phẩm</th>
              <th class="py-3 text-center">Màu sắc</th>
              <th class="py-3 text-center">Giá tiền</th>
              <th class="py-3 text-center">Trạng thái</th>
              <th class="ps-1 py-3 text-end pe-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sp in TimKiemSanPham" :key="sp.id">
              <td class="ps-4">
                <div class="product-img-bg bg-light border">
                  <img
                    :src="sp.imgMain"
                    class="img-fluid"
                    :alt="sp.name"
                    @error="(e) => (e.target.src = 'https://placehold.co/400x600?text=%3E_%3C')"
                  />
                </div>
              </td>
              <td>
                <p class="mb-0 fw-bold small text-uppercase">{{ sp.name }}</p>
                <small class="text-muted">ID: #{{ sp.id }}</small>
              </td>
              <td class="text-center">
                <span class="small">{{ sp.color }}</span>
              </td>
              <td class="text-center">
                <span class="fw-bold small">{{ sp.price }}</span>
              </td>
              <td class="text-center">
                <span
                  :class="[
                    'badge rounded-0 fw-normal small',
                    sp.status === 'Ngừng bán'
                      ? 'bg-danger-subtle text-danger'
                      : 'bg-dark-subtle text-dark',
                  ]"
                >
                  {{ sp.status || 'Đang bán' }}
                </span>
              </td>
              <td class="text-end pe-4">
                <div class="action-btns">
                  <button
                    class="btn btn-sm btn-link text-dark p-0 me-3"
                    @click="toggleStatus(sp)"
                    :title="sp.status === 'Ngừng bán' ? 'Hiện sản phẩm' : 'Ẩn sản phẩm'"
                  >
                    <i
                      :class="['bi fs-6', sp.status === 'Ngừng bán' ? 'bi-eye-slash' : 'bi-eye']"
                    ></i>
                  </button>
                  <button
                    class="btn btn-sm btn-link text-dark p-0 me-3"
                    @click="openModal(sp)"
                    title="Sửa"
                  >
                    <i class="bi bi-pencil-square fs-6"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="productModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content rounded-0 border-0 shadow">
          <div class="modal-header border-bottom-0 pb-0">
            <h5 class="modal-title fw-bold text-uppercase small tracking-widest">
              {{ isEditing ? 'Chỉnh sửa' : 'Thêm' }} sản phẩm
            </h5>
            <button
              type="button"
              class="btn-close small"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-5 border-end">
                <div
                  v-if="currentProduct.imgMain"
                  class="image-preview border p-2 bg-light text-center h-100 d-flex flex-column justify-content-center"
                >
                  <p class="small text-muted mb-2">Xem trước hình ảnh:</p>
                  <img
                    :src="currentProduct.imgMain"
                    alt="Preview"
                    style="max-height: 300px; width: auto; object-fit: contain"
                    class="img-fluid border shadow-sm mx-auto"
                    @error="(e) => (e.target.src = 'https://placehold.co/400x600?text=%3E_%3C')"
                  />
                </div>
                <div
                  v-else
                  class="h-100 d-flex align-items-center justify-content-center bg-light border p-4 text-muted small"
                >
                  Chưa có hình ảnh
                </div>
              </div>

              <div class="col-md-7">
                <div class="mb-3">
                  <label class="small fw-bold mb-1"
                    >Tên sản phẩm <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control rounded-0 small"
                    v-model="currentProduct.name"
                    placeholder="Nhập tên sản phẩm..."
                  />
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="small fw-bold mb-1"
                      >Giá tiền <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control rounded-0 small"
                      v-model="currentProduct.price"
                      placeholder="VD: 500,000đ"
                    />
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="small fw-bold mb-1"
                      >Màu sắc <span class="text-danger">*</span></label
                    >
                    <input
                      type="text"
                      class="form-control rounded-0 small"
                      v-model="currentProduct.color"
                      placeholder="Nhập màu..."
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <label class="small fw-bold mb-1"
                    >Link ảnh chính <span class="text-danger">*</span></label
                  >
                  <textarea
                    class="form-control rounded-0 small"
                    v-model="currentProduct.imgMain"
                    rows="3"
                    placeholder="Dán link ảnh tại đây..."
                  ></textarea>
                </div>
                <div v-if="errorMessage" class="alert alert-danger py-2 rounded-0 small mb-0">
                  <i class="bi bi-exclamation-triangle me-2"></i> {{ errorMessage }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer border-top-0 pt-0">
            <button
              type="button"
              class="btn btn-light rounded-0 small text-uppercase fw-bold"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
            <button
              type="button"
              class="btn btn-dark rounded-0 small text-uppercase fw-bold px-4"
              @click="saveProduct"
            >
              Lưu lại
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

const TuKhoaTimKiem = ref('')
const isEditing = ref(false)
const errorMessage = ref('')
const currentProduct = ref({
  id: '',
  name: '',
  price: '',
  color: '',
  imgMain: '',
  status: 'Đang bán',
})
let modalInstance = null

onMounted(() => {
  modalInstance = new Modal(document.getElementById('productModal'))
})

const TimKiemSanPham = computed(() => {
  return SanPham.value.filter((p) =>
    p.name.toLowerCase().includes(TuKhoaTimKiem.value.toLowerCase()),
  )
})

const openModal = (product = null) => {
  errorMessage.value = ''
  if (product) {
    isEditing.value = true
    currentProduct.value = { ...product }
  } else {
    isEditing.value = false
    const maxId =
      SanPham.value.length > 0 ? Math.max(...SanPham.value.map((p) => parseInt(p.id))) : 0
    currentProduct.value = {
      id: (maxId + 1).toString(),
      name: '',
      price: '',
      color: '',
      imgMain: '',
      status: 'Đang bán',
    }
  }
  modalInstance.show()
}

// Validate: các trường bắt buộc
const validateForm = () => {
  if (!currentProduct.value.name.trim()) return 'Vui lòng nhập tên sản phẩm.'
  if (!currentProduct.value.price.trim()) return 'Vui lòng nhập giá tiền.'
  if (!currentProduct.value.color.trim()) return 'Vui lòng nhập màu sắc.'
  if (!currentProduct.value.imgMain.trim()) return 'Vui lòng nhập link ảnh sản phẩm.'
  return ''
}

const saveProduct = () => {
  const error = validateForm()
  if (error) {
    errorMessage.value = error
    return
  }

  if (isEditing.value) {
    const index = SanPham.value.findIndex((p) => p.id === currentProduct.value.id)
    if (index !== -1) SanPham.value[index] = { ...currentProduct.value }
  } else {
    SanPham.value.unshift({ ...currentProduct.value })
  }
  modalInstance.hide()
}

const toggleStatus = (product) => {
  product.status = product.status === 'Ngừng bán' ? 'Đang bán' : 'Ngừng bán'
}
</script>

<style scoped>
.tracking-widest {
  letter-spacing: 0.15em;
  font-size: 0.75rem;
}
.product-img-bg {
  width: 60px;
  height: 80px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-img-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.table thead th {
  background-color: #fafafa;
  border-bottom: 1px solid #eee;
  font-weight: 500;
}
.table tbody td {
  border-bottom: 1px solid #f8f9fa;
  padding: 15px 10px;
}
.action-btns .btn-link {
  text-decoration: none;
  transition: transform 0.2s;
}
.action-btns .btn-link:hover {
  transform: scale(1.2);
}
.form-control:focus {
  box-shadow: none;
  border-color: #ced4da;
}
.bg-danger-subtle {
  background-color: #f8d7da !important;
}
</style>
