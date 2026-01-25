<template>
  <div class="customer-management">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex gap-3 w-50">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0 rounded-0"
            ><i class="bi bi-search"></i
          ></span>
          <input
            type="text"
            class="form-control border-start-0 rounded-0 small"
            v-model="searchQuery"
            placeholder="Tìm tên, số điện thoại khách hàng..."
          />
        </div>
        <select class="form-select rounded-0 small w-50" v-model="filterRank">
          <option value="">Tất cả hạng thẻ</option>
          <option value="VIP">Hạng VIP</option>
          <option value="GOLD">Hạng GOLD</option>
          <option value="SILVER">Hạng SILVER</option>
        </select>
      </div>
      <button class="btn btn-dark rounded-0 px-4 py-2 text-uppercase tracking-widest small">
        <i class="bi bi-person-plus me-2"></i> Thêm khách hàng
      </button>
    </div>

    <div class="card border-0 shadow-sm rounded-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr class="text-uppercase tracking-widest small text-secondary bg-light">
              <th class="ps-4 py-3">Khách hàng</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Tổng chi tiêu</th>
              <th>Hạng thẻ</th>
              <th class="text-end pe-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in filteredCustomers" :key="customer.id">
              <td class="ps-4">
                <div class="d-flex align-items-center">
                  <div
                    class="avatar-circle me-3 bg-dark text-white d-flex align-items-center justify-content-center"
                  >
                    {{ getInitials(customer.name) }}
                  </div>
                  <div>
                    <p class="mb-0 fw-bold small text-uppercase">{{ customer.name }}</p>
                    <small class="text-muted">Ngày tham gia: {{ customer.joinDate }}</small>
                  </div>
                </div>
              </td>
              <td>
                <span class="small">{{ customer.phone }}</span>
              </td>
              <td>
                <span class="small text-lowercase text-muted">{{ customer.email }}</span>
              </td>
              <td>
                <span class="fw-bold small">{{ customer.totalSpent }}</span>
              </td>
              <td>
                <span
                  :class="getRankClass(customer.rank)"
                  class="badge rounded-0 fw-normal px-3 py-2"
                  style="font-size: 10px"
                >
                  {{ customer.rank }}
                </span>
              </td>
              <td class="text-end pe-4">
                <button class="btn btn-sm btn-link text-dark p-0 me-3" title="Xem lịch sử mua hàng">
                  <i class="bi bi-clock-history fs-6"></i>
                </button>
                <button class="btn btn-sm btn-link text-dark p-0" title="Chỉnh sửa">
                  <i class="bi bi-pencil-square fs-6"></i>
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
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterRank = ref('')

const customers = ref([
  {
    id: 1,
    name: 'Nguyễn Kiều Oanh',
    phone: '0901234567',
    email: 'oanhnk@gmail.com',
    totalSpent: '15.200.000đ',
    rank: 'VIP',
    joinDate: '12/05/2024',
  },
  {
    id: 2,
    name: 'Trần Minh Tâm',
    phone: '0988776655',
    email: 'tamtm@yahoo.com',
    totalSpent: '8.450.000đ',
    rank: 'GOLD',
    joinDate: '20/08/2024',
  },
  {
    id: 3,
    name: 'Lê Hoàng Nam',
    phone: '0355443322',
    email: 'namlh@hotmail.com',
    totalSpent: '2.100.000đ',
    rank: 'SILVER',
    joinDate: '05/01/2025',
  },
])

const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(-2)
    .toUpperCase()
}

const getRankClass = (rank) => {
  if (rank === 'VIP') return 'bg-dark text-white'
  if (rank === 'GOLD') return 'bg-warning text-dark'
  return 'bg-secondary text-white'
}

const filteredCustomers = computed(() => {
  return customers.value.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.phone.includes(searchQuery.value)
    const matchesRank = filterRank.value === '' || c.rank === filterRank.value
    return matchesSearch && matchesRank
  })
})
</script>

<style scoped>
.tracking-widest {
  letter-spacing: 0.15em;
  font-size: 0.75rem;
}

.avatar-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
}

.table tbody td {
  padding: 15px 10px;
  border-bottom: 1px solid #f8f9fa;
}

.form-control:focus,
.form-select:focus {
  box-shadow: none;
  border-color: #000;
}

.btn-link {
  text-decoration: none;
  transition: 0.2s;
}

.btn-link:hover {
  transform: scale(1.1);
}
</style>
