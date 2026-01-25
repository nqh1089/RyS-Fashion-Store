<template>
  <div class="product-management">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="search-wrapper w-25">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0 rounded-0"
            ><i class="bi bi-search"></i
          ></span>
          <input
            type="text"
            class="form-control border-start-0 rounded-0 small"
            v-model="searchQuery"
            placeholder="Tìm tên sản phẩm..."
          />
        </div>
      </div>
      <button class="btn btn-dark rounded-0 px-4 py-2 text-uppercase tracking-widest small">
        <i class="bi bi-plus-lg me-2"></i> Thêm sản phẩm
      </button>
    </div>

    <div class="card border-0 shadow-sm rounded-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr class="text-uppercase tracking-widest small text-secondary">
              <th class="ps-4 py-3">Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Màu sắc</th>
              <th>Giá tiền</th>
              <th>Trạng thái</th>
              <th class="text-end pe-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredProducts" :key="product.id">
              <td class="ps-4">
                <div class="product-img-bg bg-light">
                  <img :src="product.imgMain" class="img-fluid" :alt="product.name" />
                </div>
              </td>
              <td>
                <p class="mb-0 fw-bold small text-uppercase">{{ product.name }}</p>
                <small class="text-muted">ID: #{{ product.id }}</small>
              </td>
              <td>
                <span class="small">{{ product.color }}</span>
              </td>
              <td>
                <span class="fw-bold small">{{ product.price }}</span>
              </td>
              <td>
                <span class="badge bg-dark-subtle text-dark rounded-0 fw-normal small"
                  >Đang bán</span
                >
              </td>
              <td class="text-end pe-4">
                <div class="action-btns">
                  <button class="btn btn-sm btn-link text-dark p-0 me-3" title="Sửa">
                    <i class="bi bi-pencil-square fs-6"></i>
                  </button>
                  <button class="btn btn-sm btn-link text-danger p-0" title="Xóa">
                    <i class="bi bi-trash fs-6"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="loading">
              <td colspan="6" class="text-center py-5">
                <div class="spinner-border spinner-border-sm text-dark" role="status"></div>
                <span class="ms-2 small tracking-widest">ĐANG TẢI DỮ LIỆU...</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const products = ref([])
const loading = ref(true)
const searchQuery = ref('')

// Lấy dữ liệu từ API của bạn
const fetchProducts = async () => {
  try {
    const response = await axios.get(
      'https://my-json-server.typicode.com/nqh1089/RyS-Fashion-Store/products',
    )
    products.value = response.data
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu sản phẩm:', error)
  } finally {
    loading.value = false
  }
}

// Logic tìm kiếm sản phẩm
const filteredProducts = computed(() => {
  return products.value.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

onMounted(() => {
  fetchProducts()
})
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
</style>
