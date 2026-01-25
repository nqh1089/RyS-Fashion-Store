<template>
  <div class="order-management">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex gap-2">
        <button class="btn btn-dark rounded-0 px-4 py-2 small tracking-widest text-uppercase">
          Tất cả
        </button>
        <button
          class="btn btn-outline-dark rounded-0 px-4 py-2 small tracking-widest text-uppercase"
        >
          Chờ xử lý
        </button>
        <button
          class="btn btn-outline-dark rounded-0 px-4 py-2 small tracking-widest text-uppercase"
        >
          Đang giao
        </button>
      </div>
      <div class="search-box w-25">
        <input
          type="text"
          class="form-control rounded-0 small"
          placeholder="Tìm mã đơn, tên khách..."
        />
      </div>
    </div>

    <div class="card border-0 shadow-sm rounded-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr class="text-uppercase tracking-widest small text-secondary bg-light">
              <th class="ps-4 py-3">Mã đơn</th>
              <th>Ngày đặt</th>
              <th>Khách hàng</th>
              <th>Tổng tiền</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th class="text-end pe-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td class="ps-4 fw-bold small">#{{ order.id }}</td>
              <td>
                <span class="small text-muted">{{ order.date }}</span>
              </td>
              <td>
                <p class="mb-0 small fw-bold">{{ order.customer }}</p>
                <small class="text-muted" style="font-size: 11px">{{ order.phone }}</small>
              </td>
              <td>
                <span class="fw-bold small">{{ order.total }}</span>
              </td>
              <td>
                <span :class="order.payClass" class="small">{{ order.payment }}</span>
              </td>
              <td>
                <span
                  :class="order.statusClass"
                  class="badge rounded-0 fw-normal p-2"
                  style="font-size: 10px"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="text-end pe-4">
                <button class="btn btn-sm btn-rys-dark" title="Xem chi tiết">
                  <i class="bi bi-eye"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orders = ref([
  {
    id: 'RY8801',
    date: '25/01/2026',
    customer: 'Nguyễn Kiều Oanh',
    phone: '0901234xxx',
    total: '1.250.000đ',
    payment: 'Chuyển khoản',
    payClass: 'text-success',
    status: 'CHỜ XÁC NHẬN',
    statusClass: 'bg-warning text-dark',
  },
  {
    id: 'RY8802',
    date: '24/01/2026',
    customer: 'Trần Minh Tâm',
    phone: '0988776xxx',
    total: '890.000đ',
    payment: 'Tiền mặt (COD)',
    payClass: 'text-secondary',
    status: 'ĐANG GIAO',
    statusClass: 'bg-info text-white',
  },
  {
    id: 'RY8803',
    date: '24/01/2026',
    customer: 'Lê Hoàng Nam',
    phone: '0355443xxx',
    total: '2.100.000đ',
    payment: 'Chuyển khoản',
    payClass: 'text-success',
    status: 'HOÀN THÀNH',
    statusClass: 'bg-dark text-white',
  },
])
</script>

<style scoped>
.tracking-widest {
  letter-spacing: 0.15em;
  font-size: 0.75rem;
}

.table thead th {
  border-bottom: 1px solid #eee;
}

.table tbody td {
  padding: 18px 10px;
  border-bottom: 1px solid #f8f9fa;
}

.btn-rys-dark {
  background-color: #000;
  color: #fff;
  border-radius: 0;
  transition: 0.3s;
}

.btn-rys-dark:hover {
  background-color: #444;
}

/* Tùy chỉnh input focus theo style RyS */
.form-control:focus {
  box-shadow: none;
  border-color: #000;
}
</style>
