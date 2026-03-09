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
            placeholder="Tìm tên, số điện thoại..."
          />
        </div>
        <select class="form-select rounded-0 small w-50" v-model="filterRank">
          <option value="">Tất cả hạng thẻ</option>
          <option value="VIP">Hạng VIP</option>
          <option value="GOLD">Hạng GOLD</option>
          <option value="SILVER">Hạng SILVER</option>
          <option value="LOCKED">Tài khoản bị khóa</option>
        </select>
      </div>
      <!-- <button
        @click="openEditModal()"
        class="btn btn-dark rounded-0 px-4 py-2 text-uppercase tracking-widest small"
      >
        <i class="bi bi-person-plus me-2"></i> Thêm khách hàng
      </button> -->
    </div>

    <div class="card border-0 shadow-sm rounded-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr class="text-uppercase tracking-widest small text-secondary bg-light">
              <th class="ps-4 py-3 border-0">Khách hàng</th>
              <th class="border-0 text-center py-3">Hạng thành viên</th>
              <th class="border-0 text-center py-3">Trạng thái</th>
              <th class="border-0 text-end py-3 pe-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="customer in filteredCustomers"
              :key="customer.id"
              :class="{ 'opacity-50': customer.isLocked }"
            >
              <td class="ps-4">
                <div class="d-flex align-items-center">
                  <div
                    class="avatar-circle me-3 bg-dark text-white d-flex align-items-center justify-content-center"
                  >
                    {{ getInitials(customer.name) }}
                  </div>
                  <div>
                    <p class="mb-0 fw-bold small text-uppercase">{{ customer.name }}</p>
                    <small class="text-muted">{{ customer.phone }}</small>
                  </div>
                </div>
              </td>
              <td class="text-center">
                <span
                  :class="getRankClass(customer.rank)"
                  class="badge rounded-0 fw-normal px-3 py-2"
                  style="font-size: 10px"
                >
                  {{ customer.rank }}
                </span>
              </td>
              <td class="text-center">
                <span
                  v-if="customer.isLocked"
                  class="badge bg-danger rounded-0 fw-normal px-2 py-1"
                  style="font-size: 9px"
                  >BỊ KHÓA</span
                >
                <span
                  v-else
                  class="badge bg-success rounded-0 fw-normal px-2 py-1"
                  style="font-size: 9px"
                  >HOẠT ĐỘNG</span
                >
              </td>
              <td class="text-end pe-4">
                <button
                  @click="viewDetails(customer)"
                  class="btn btn-sm btn-link text-dark p-0 me-3"
                  title="Xem chi tiết"
                >
                  <i class="bi bi-eye fs-6"></i>
                </button>
                <!-- <button
                  @click="openEditModal(customer)"
                  class="btn btn-sm btn-link text-dark p-0 me-3"
                  title="Sửa"
                >
                  <i class="bi bi-pencil-square fs-6"></i>
                </button> -->
                <button
                  @click="toggleLock(customer)"
                  class="btn btn-sm btn-link p-0"
                  :class="customer.isLocked ? 'text-success' : 'text-danger'"
                  :title="customer.isLocked ? 'Mở khóa' : 'Khóa tài khoản'"
                >
                  <i class="bi" :class="customer.isLocked ? 'bi-unlock' : 'bi-lock'"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="modal fade" id="viewDetailModal" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content rounded-0 border-0">
          <div class="modal-header bg-light border-0">
            <h6 class="modal-title tracking-widest text-uppercase fw-bold">Hồ sơ khách hàng</h6>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body p-4" v-if="selectedCustomer">
            <div class="row mb-4 border-bottom pb-4">
              <div class="col-md-6 border-end">
                <h6 class="small fw-bold text-uppercase mb-3 text-secondary">Thông tin cá nhân</h6>
                <p class="small mb-1"><strong>Họ tên:</strong> {{ selectedCustomer.name }}</p>
                <p class="small mb-1"><strong>SĐT:</strong> {{ selectedCustomer.phone }}</p>
                <p class="small mb-1"><strong>Email:</strong> {{ selectedCustomer.email }}</p>
                <p class="small mb-0">
                  <strong>Ngày tham gia:</strong> {{ selectedCustomer.joinDate }}
                </p>
              </div>
              <div class="col-md-6 ps-md-4">
                <h6 class="small fw-bold text-uppercase mb-3 text-secondary">Thống kê mua hàng</h6>
                <p class="small mb-1">
                  <strong>Hạng thành viên: </strong>
                  <span
                    :class="getRankClass(selectedCustomer.rank)"
                    class="badge rounded-0 border-warning"
                    >{{ selectedCustomer.rank }}</span
                  >
                </p>
                <p class="small mb-1">
                  <strong>Tổng chi tiêu: </strong>
                  <span class="text-danger fw-bold">{{ selectedCustomer.totalSpent }}</span>
                </p>
                <p class="small mb-0">
                  <strong>Số đơn hàng:</strong> {{ selectedCustomer.orderHistory.length }} đơn
                </p>
              </div>
            </div>
            <h6 class="small fw-bold text-uppercase mb-3 text-secondary">
              Lịch sử đơn hàng gần đây
            </h6>
            <div class="table-responsive">
              <table class="table table-sm small">
                <thead>
                  <tr class="text-muted">
                    <th>Mã đơn</th>
                    <th>Ngày mua</th>
                    <th>Sản phẩm</th>
                    <th class="text-end">Giá trị</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in selectedCustomer.orderHistory" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.date }}</td>
                    <td class="text-truncate" style="max-width: 250px">{{ order.product }}</td>
                    <td class="text-end fw-bold">{{ order.amount }}</td>
                  </tr>
                  <tr v-if="selectedCustomer.orderHistory.length === 0">
                    <td colspan="4" class="text-center py-3 text-muted">Chưa có giao dịch nào.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="editCustomerModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-0 border-0 shadow">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title fw-bold text-uppercase small tracking-widest">
              {{ isEditing ? 'Chỉnh sửa' : 'Thêm mới' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="small fw-bold mb-1">Tên khách hàng</label>
              <input type="text" class="form-control rounded-0 small" v-model="form.name" />
            </div>
            <div class="row">
              <div class="col-6 mb-3">
                <label class="small fw-bold mb-1">Số điện thoại</label>
                <input type="text" class="form-control rounded-0 small" v-model="form.phone" />
              </div>
              <div class="col-6 mb-3">
                <label class="small fw-bold mb-1">Hạng thẻ</label>
                <select class="form-select rounded-0 small" v-model="form.rank">
                  <option value="SILVER">SILVER</option>
                  <option value="GOLD">GOLD</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
            </div>
            <div class="mb-3">
              <label class="small fw-bold mb-1">Email</label>
              <input type="email" class="form-control rounded-0 small" v-model="form.email" />
            </div>
          </div>
          <div class="modal-footer border-0">
            <button
              type="button"
              class="btn btn-light rounded-0 small px-4"
              data-bs-dismiss="modal"
            >
              HỦY
            </button>
            <button @click="saveCustomer" type="button" class="btn btn-dark rounded-0 small px-4">
              LƯU LẠI
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

const searchQuery = ref('')
const filterRank = ref('')
const selectedCustomer = ref(null)
const isEditing = ref(false)
const form = ref({ id: null, name: '', phone: '', email: '', rank: 'SILVER', isLocked: false })

let editModal = null
let viewModal = null

// Dữ liệu khách hàng fix cứng kèm theo danh sách đơn hàng (orderHistory)
const customers = ref([
  {
    id: 1,
    name: 'Nguyễn Kiều Oanh',
    phone: '0901234567',
    email: 'oanhnk@gmail.com',
    totalSpent: '15.200.000đ',
    rank: 'VIP',
    joinDate: '12/05/2024',
    isLocked: false,
    orderHistory: [
      {
        id: '#RYS8888',
        date: '12/02/2025',
        product: 'Áo dài tơ tằm phối họa tiết',
        amount: '1.250.000đ',
      },
      { id: '#RYS8808', date: '20/12/2024', product: 'Váy gấm hoa nổi', amount: '2.800.000đ' },
    ],
  },
  {
    id: 2,
    name: 'Trần Minh Tâm',
    phone: '0988776655',
    email: 'tamtm@yahoo.com',
    totalSpent: '8.450.000đ',
    rank: 'GOLD',
    joinDate: '20/08/2024',
    isLocked: true,
    orderHistory: [
      { id: '#RYS8868', date: '05/01/2025', product: 'Chân váy lụa satin', amount: '850.000đ' },
    ],
  },
  {
    id: 3,
    name: 'Lê Hoàng Nam',
    phone: '0355443322',
    email: 'namlh@hotmail.com',
    totalSpent: '2.100.000đ',
    rank: 'SILVER',
    joinDate: '05/01/2025',
    isLocked: false,
    orderHistory: [],
  },
])

onMounted(() => {
  editModal = new Modal(document.getElementById('editCustomerModal'))
  viewModal = new Modal(document.getElementById('viewDetailModal'))
})

const viewDetails = (customer) => {
  selectedCustomer.value = customer
  viewModal.show()
}

// // Nếu có customer được truyền vào thì sẽ điền form để chỉnh sửa, nếu không thì sẽ reset form để thêm mới
// const openEditModal = (customer = null) => {
//   if (customer) {
//     isEditing.value = true
//     form.value = { ...customer }
//   } else {
//     isEditing.value = false
//     form.value = {
//       id: Date.now(),
//       name: '',
//       phone: '',
//       email: '',
//       rank: 'SILVER',
//       isLocked: false,
//       joinDate: new Date().toLocaleDateString('vi-VN'),
//       totalSpent: '0đ',
//       orderHistory: [],
//     }
//   }
//   editModal.show()
// }

const saveCustomer = () => {
  if (isEditing.value) {
    const idx = customers.value.findIndex((c) => c.id === form.value.id)
    customers.value[idx] = { ...form.value }
  } else {
    customers.value.unshift({ ...form.value })
  }
  editModal.hide()
}

const toggleLock = (customer) => {
  const action = customer.isLocked ? 'mở khóa' : 'khóa'
  if (confirm(`Bạn có chắc muốn ${action} tài khoản này?`)) {
    customer.isLocked = !customer.isLocked
  }
}

// Lấy tên viết tắt từ họ tên đầy đủ để làm avatar chữ cái
const getInitials = (name) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(-2)
    .toUpperCase()

const getRankClass = (rank) => {
  if (rank === 'VIP') return 'bg-dark bg-gradient text-warning'
  if (rank === 'GOLD') return 'bg-warning text-dark'
  return 'bg-secondary text-white'
}

const filteredCustomers = computed(() => {
  return customers.value.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      c.phone.includes(searchQuery.value)
    if (filterRank.value === 'LOCKED') return matchesSearch && c.isLocked
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
  font-size: 11px;
}
.opacity-50 {
  opacity: 0.5 !important;
  background-color: #f8f9fa;
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
