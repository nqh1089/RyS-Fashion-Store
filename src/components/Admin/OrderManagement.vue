<template>
  <div class="order-management">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex gap-2">
        <button
          v-for="tab in ['Tất cả', 'CHỜ XÁC NHẬN', 'ĐANG GIAO', 'HOÀN THÀNH']"
          :key="tab"
          @click="currentFilter = tab"
          :class="[
            'btn rounded-0 px-4 py-2 small tracking-widest text-uppercase transition-all',
            currentFilter === tab ? 'btn-dark' : 'btn-outline-dark',
          ]"
        >
          {{ tab }}
        </button>
      </div>
      <div class="search-box w-25">
        <input
          type="text"
          class="form-control rounded-0 small"
          v-model="searchQuery"
          placeholder="Tìm mã đơn, tên khách..."
        />
      </div>
    </div>

    <div class="card border-0 shadow-sm rounded-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0 custom-table">
          <thead>
            <tr class="text-uppercase tracking-widest small text-secondary bg-light border-bottom">
              <th class="text-center py-3" style="width: 80px">Mã đơn</th>
              <th class="text-center py-3" style="width: 90px">Ngày đặt</th>
              <th class="ps-4 py-3" style="width: 120px">Khách hàng</th>
              <th class="text-center py-3" style="width: 100px">Tổng tiền</th>
              <th class="text-center py-3" style="width: 120px">Thanh toán</th>
              <th class="text-center py-3" style="width: 120px">Trạng thái</th>
              <th class="text-center py-3" style="width: 100px">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id">
              <td class="text-center fw-bold small">#{{ order.id }}</td>
              <td class="text-center">
                <span class="small text-muted">{{ order.date }}</span>
              </td>
              <td class="ps-4">
                <p class="mb-0 small fw-bold">{{ order.customer }}</p>
                <small class="text-muted" style="font-size: 11px">{{ order.phone }}</small>
              </td>
              <td class="text-center">
                <span class="fw-bold small">{{ order.total }}</span>
              </td>
              <td class="text-center">
                <span :class="order.payClass" class="small">{{ order.payment }}</span>
              </td>
              <td class="text-center">
                <span :class="['badge rounded-0 fw-normal p-2 status-badge', order.statusClass]">
                  {{ order.status }}
                </span>
              </td>
              <td class="text-center pe-4">
                <button
                  class="btn btn-sm btn-rys-dark"
                  @click="viewDetail(order)"
                  title="Xem chi tiết"
                >
                  <i class="bi bi-eye"></i>
                </button>
              </td>
            </tr>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="7" class="text-center py-5 text-muted small">
                Không tìm thấy đơn hàng nào.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="orderDetailModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content rounded-0 border-0 shadow" v-if="selectedOrder">
          <div class="modal-header bg-light border-bottom-0">
            <h5 class="modal-title fw-bold text-uppercase small tracking-widest">
              Chi tiết đơn hàng #{{ selectedOrder.id }}
            </h5>
            <button
              type="button"
              class="btn-close small"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body p-4">
            <div class="row mb-4">
              <div class="col-md-6 border-end">
                <h6 class="fw-bold small text-uppercase mb-3">Thông tin khách hàng</h6>
                <p class="small mb-1"><strong>Họ tên:</strong> {{ selectedOrder.customer }}</p>
                <p class="small mb-1"><strong>Số điện thoại:</strong> {{ selectedOrder.phone }}</p>
                <p class="small mb-1"><strong>Địa chỉ:</strong> {{ selectedOrder.address }}</p>
              </div>
              <div class="col-md-6 ps-md-4">
                <h6 class="fw-bold small text-uppercase mb-3">Thông tin thanh toán</h6>
                <p class="small mb-1"><strong>Hình thức:</strong> {{ selectedOrder.payment }}</p>
                <p class="small mb-1">
                  <strong>Trạng thái:</strong>
                  <span :class="['badge rounded-0 fw-normal ms-2', selectedOrder.statusClass]">{{
                    selectedOrder.status
                  }}</span>
                </p>
                <p class="small mb-1"><strong>Ngày đặt:</strong> {{ selectedOrder.date }}</p>
              </div>
            </div>

            <br />
            <h6 class="fw-bold small text-uppercase mb-3">Sản phẩm đã mua</h6>
            <div class="table-responsive border">
              <table class="table table-sm align-middle mb-0">
                <thead class="bg-light">
                  <tr class="small text-muted">
                    <th class="ps-3 py-2">Sản phẩm</th>
                    <th class="text-center py-2">Số lượng</th>
                    <th class="text-center py-2">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in selectedOrder.items" :key="index">
                    <td class="ps-3 py-3">
                      <div class="d-flex align-items-center">
                        <img
                          :src="item.imgMain"
                          class="me-3 border shadow-sm"
                          style="width: 50px; height: 70px; object-fit: cover"
                        />
                        <div>
                          <p class="small fw-bold mb-0 text-uppercase">{{ item.name }}</p>
                          <small class="text-muted"
                            >Size: {{ item.size }} / Màu: {{ item.color }}</small
                          >
                        </div>
                      </div>
                    </td>
                    <td class="text-center small">{{ item.quantity }}</td>
                    <td class="text-center pe-3 small fw-bold">{{ item.price }}</td>
                  </tr>
                </tbody>
                <tfoot class="bg-light">
                  <tr>
                    <td colspan="2" class="text-center py-2 small fw-bold">Tổng cộng:</td>
                    <td class="text-center pe-3 py-2 fw-bold text-danger">
                      {{ selectedOrder.total }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Modal } from 'bootstrap'

const searchQuery = ref('')
const currentFilter = ref('Tất cả')
const selectedOrder = ref(null)
let detailModal = null

// LIST DỮ LIỆU FIX CỨNG
const orders = ref([
  {
    id: 'RYS8801',
    date: '25/01/2026',
    customer: 'Nguyễn Kiều Oanh',
    phone: '0901234567',
    address: '123 Đường ABC, Quận X, TP. HCM',
    total: '3,798,000đ',
    payment: 'Chuyển khoản',
    payClass: 'text-success',
    status: 'CHỜ XÁC NHẬN',
    statusClass: 'bg-warning text-dark',
    items: [
      {
        id: '1',
        name: 'ÁO DÀI 4 TÀ PHỐI HOẠ TIẾT',
        price: '1,899,000đ',
        color: 'Hồng',
        imgMain: '/src/assets/Shop/1.1_ao_dai_4_ta_phoi_hoa_tiet.jpg',
        quantity: 1,
        size: 6,
      },
      {
        id: '9',
        name: 'ÁO DÀI KIM SA',
        price: '1,899,000đ',
        color: 'Đỏ',
        imgMain: '/src/assets/Shop/9.1_ao_dai_kim_sa.jpg',
        quantity: 1,
        size: 6,
      },
    ],
  },
  {
    id: 'RYS8802',
    date: '24/01/2026',
    customer: 'Trần Minh Tâm',
    phone: '0988776666',
    address: '456 Phố Y, Quận Hai Bà Trưng, Hà Nội',
    total: '1,899,000đ',
    payment: 'Tiền mặt (COD)',
    payClass: 'text-secondary',
    status: 'ĐANG GIAO',
    statusClass: 'bg-info text-white',
    items: [
      {
        id: '3',
        name: 'ÁO DÀI GẤM HỒNG',
        price: '1,899,000đ',
        color: 'Hồng',
        imgMain: '/src/assets/Shop/3.1_ao_dai_gam_hong.jpg',
        quantity: 1,
        size: 6,
      },
    ],
  },
  {
    id: 'RYS8803',
    date: '24/01/2026',
    customer: 'Lê Hoàng Nam',
    phone: '0355448888',
    address: '789 Đường Z, Quận Liên Chiểu, Đà Nẵng',
    total: '799,500đ',
    payment: 'Chuyển khoản',
    payClass: 'text-success',
    status: 'HOÀN THÀNH',
    statusClass: 'bg-success text-white',
    items: [
      {
        id: '7',
        name: 'ÁO DÀI ĐỎ CỔ TẾT',
        price: '799,500đ',
        color: 'Đỏ',
        imgMain: '/src/assets/Shop/7.1_ao_dai_do_co_tet.jpg',
        quantity: 1,
        size: 6,
      },
    ],
  },
])

onMounted(() => {
  detailModal = new Modal(document.getElementById('orderDetailModal'))
})

const filteredOrders = computed(() => {
  return orders.value.filter((order) => {
    const matchSearch =
      order.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchFilter = currentFilter.value === 'Tất cả' || order.status === currentFilter.value
    return matchSearch && matchFilter
  })
})

const viewDetail = (order) => {
  selectedOrder.value = order
  detailModal.show()
}
</script>

<style scoped>
.tracking-widest {
  letter-spacing: 0.15em;
  font-size: 0.75rem;
}
.custom-table {
  table-layout: fixed;
  width: 100%;
}
.custom-table th,
.custom-table td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.status-badge {
  /* border-radius: 10; */
  min-width: 110px;
  display: inline-block;
  text-align: center;
}
.btn-rys-dark {
  background-color: #000;
  color: #fff;
  border-radius: 0;
  transition: 0.3s;
  border: none;
}
.btn-rys-dark:hover {
  background-color: #444;
}
.transition-all {
  transition: all 0.2s ease;
}
.form-control:focus {
  box-shadow: none;
  border-color: #000;
}
</style>
