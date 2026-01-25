<template>
  <div class="employee-management">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="search-box w-25">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0 rounded-0">
            <i class="bi bi-search"></i>
          </span>
          <input
            type="text"
            class="form-control border-start-0 rounded-0 small shadow-none"
            v-model="searchQuery"
            placeholder="Tìm theo tên, ID hoặc Account..."
          />
        </div>
      </div>
      <button
        class="btn btn-dark rounded-0 px-4 py-2 text-uppercase tracking-widest small"
        @click="openModal()"
      >
        <i class="bi bi-person-plus-fill me-2"></i> Thêm nhân viên
      </button>
    </div>

    <div class="card border-0 shadow-sm rounded-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0 custom-table">
          <thead>
            <tr class="text-uppercase tracking-widest small text-secondary bg-light">
              <th class="ps-4 py-3">Nhân viên</th>
              <th>Chức vụ</th>
              <th>Liên hệ</th>
              <th>Ngày vào làm</th>
              <th>Trạng thái</th>
              <th class="text-end pe-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emp in filteredEmployees" :key="emp.id" class="align-middle border-bottom">
              <td class="ps-4 py-3">
                <div class="d-flex align-items-center">
                  <div class="emp-avatar-v2 me-3 d-flex align-items-center justify-content-center">
                    <i class="bi bi-person text-secondary"></i>
                  </div>
                  <div>
                    <p class="mb-0 text-dark-emphasis name-text">{{ emp.name }}</p>
                    <small class="text-muted-custom">
                      NV{{ emp.id }} &nbsp; | &nbsp; Account: <span>{{ emp.account }}</span>
                      <!-- "&emsp;": là khoảng trắng đơn | "&ensp;": Khoảng trắng bằng 2 dấu cách | "&emsp;": Khoảng trắng bằng 4 dấu cách-->
                    </small>
                  </div>
                </div>
              </td>
              <td>
                <span class="role-badge">{{ emp.role }}</span>
              </td>
              <td>
                <div class="contact-info">
                  <p class="mb-0 text-dark-emphasis contact-primary">{{ emp.phone }}</p>
                  <p class="mb-0 text-muted opacity-75 contact-secondary">{{ emp.email }}</p>
                </div>
              </td>
              <td>
                <span class="text-secondary-emphasis date-text">{{ emp.startDate }}</span>
              </td>
              <td>
                <div class="form-check form-switch d-flex align-items-center">
                  <input
                    class="form-check-input custom-switch-v2 shadow-none"
                    type="checkbox"
                    :checked="emp.active"
                    @change="toggleStatus(emp)"
                  />
                  <span
                    class="status-text ms-2"
                    :class="emp.active ? 'active-status' : 'inactive-status'"
                  >
                    {{ emp.active ? 'Hoạt động' : 'Ngừng hoạt động' }}
                  </span>
                </div>
              </td>
              <td class="text-end pe-4">
                <div class="action-buttons">
                  <button class="btn-action me-2" title="Chỉnh sửa" @click="openModal(emp)">
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    class="btn-action btn-delete"
                    title="Ngừng hoạt động"
                    @click="softDelete(emp.id)"
                    :disabled="!emp.active"
                  >
                    <i class="bi bi-person-x fs-5"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="showModal"
      class="modal fade show d-block"
      tabindex="-1"
      style="background: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-0 border-0 shadow">
          <div class="modal-header border-0 pb-0">
            <h6 class="text-uppercase tracking-widest fw-bold">
              {{ isEdit ? 'Cập nhật' : 'Thêm' }} nhân viên
            </h6>
            <button type="button" class="btn-close shadow-none" @click="showModal = false"></button>
          </div>
          <form @submit.prevent="saveEmployee">
            <div class="modal-body py-4">
              <div class="mb-3">
                <label class="small text-uppercase tracking-widest text-secondary mb-2"
                  >ID Hệ thống</label
                >
                <input
                  type="text"
                  :value="isEdit ? form.id : '(Tự động sinh)'"
                  class="form-control rounded-0 border bg-light text-muted fw-bold shadow-none"
                  disabled
                />
              </div>

              <div class="mb-3">
                <label class="small text-uppercase tracking-widest text-secondary mb-2"
                  >Account đăng nhập</label
                >
                <input
                  type="text"
                  v-model="form.account"
                  class="form-control rounded-0 border text-lowercase shadow-none"
                  :class="{ 'bg-light text-muted': isEdit }"
                  :disabled="isEdit"
                  placeholder="ví dụ: nqh1089"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="small text-uppercase tracking-widest text-secondary mb-2"
                  >Họ và tên</label
                >
                <input
                  type="text"
                  v-model="form.name"
                  class="form-control rounded-0 shadow-none border"
                  required
                />
              </div>

              <div class="row">
                <div class="col-12 mb-3">
                  <label class="small text-uppercase tracking-widest text-secondary mb-2"
                    >Chức vụ</label
                  >
                  <select v-model="form.role" class="form-select rounded-0 shadow-none border">
                    <option value="Quản lý">Quản lý</option>
                    <option value="Nhân viên">Nhân viên</option>
                  </select>
                </div>
              </div>

              <div class="mb-3">
                <label class="small text-uppercase tracking-widest text-secondary mb-2"
                  >Số điện thoại</label
                >
                <input
                  type="text"
                  v-model="form.phone"
                  class="form-control rounded-0 shadow-none border"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="small text-uppercase tracking-widest text-secondary mb-2"
                  >Email</label
                >
                <input
                  type="email"
                  v-model="form.email"
                  class="form-control rounded-0 shadow-none border"
                  required
                />
              </div>
            </div>
            <div class="modal-footer border-0">
              <button
                type="button"
                class="btn btn-outline-dark rounded-0 px-4 small"
                @click="showModal = false"
              >
                Hủy
              </button>
              <button type="submit" class="btn btn-dark rounded-0 px-4 small">Lưu thông tin</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const API_URL = 'http://localhost:3000/employees'
const searchQuery = ref('')
const employees = ref([])
const showModal = ref(false)
const isEdit = ref(false)
const form = ref({
  id: null,
  account: '',
  name: '',
  role: 'Nhân viên',
  phone: '',
  email: '',
  active: true,
  startDate: '',
})

// 1. Fetch dữ liệu
const fetchEmployees = async () => {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Fetch failed')
    employees.value = await res.json()
  } catch (err) {
    console.error('Lỗi fetch:', err)
  }
}

onMounted(fetchEmployees)

// 2. Logic lấy ID tiếp theo = Max ID + 1
const getNextId = () => {
  if (employees.value.length === 0) return 1
  return Math.max(...employees.value.map((e) => Number(e.id))) + 1
}

// 3. Mở Modal
const openModal = (emp = null) => {
  if (emp) {
    isEdit.value = true
    form.value = { ...emp }
  } else {
    isEdit.value = false
    form.value = {
      id: getNextId(),
      account: '',
      name: '',
      role: 'Nhân viên',
      phone: '',
      email: '',
      active: true,
      startDate: new Date().toLocaleDateString('en-CA'),
    }
  }
  showModal.value = true
}

// 4. Lưu dữ liệu (Dùng PATCH để bảo vệ dữ liệu)
const saveEmployee = async () => {
  const method = isEdit.value ? 'PATCH' : 'POST'
  const url = isEdit.value ? `${API_URL}/${form.value.id}` : API_URL

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()

    if (isEdit.value) {
      const idx = employees.value.findIndex((e) => Number(e.id) === Number(data.id))
      if (idx !== -1) employees.value[idx] = { ...employees.value[idx], ...data }
    } else {
      employees.value.unshift(data)
    }

    showModal.value = false
    alert('Thao tác thành công!')
  } catch (err) {
    console.error(err)
    alert('Lỗi server local!')
  }
}

// 5. Toggle trạng thái (PATCH)
const toggleStatus = async (emp) => {
  const newStatus = !emp.active
  try {
    const res = await fetch(`${API_URL}/${emp.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: newStatus }),
    })
    if (!res.ok) throw new Error('Update failed')
    emp.active = newStatus
  } catch (err) {
    console.error(err)
    alert('Không thể cập nhật trạng thái trên server!')
  }
}

// 6. Xóa mềm (PATCH)
const softDelete = async (id) => {
  if (!confirm('Ngừng hoạt động nhân viên này?')) return
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: false }),
    })
    if (res.ok) {
      const emp = employees.value.find((e) => e.id === id)
      if (emp) emp.active = false
    }
  } catch (err) {
    console.error(err)
  }
}

// 7. Filter tìm kiếm
const filteredEmployees = computed(() => {
  return employees.value.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      String(e.id).includes(searchQuery.value) ||
      (e.account && e.account.toLowerCase().includes(searchQuery.value.toLowerCase())),
  )
})
</script>

<style scoped>
/* 1. Bố cục bảng chia đều cột, không co giãn */
.custom-table {
  table-layout: fixed;
  width: 100%;
}

.custom-table th:nth-child(1),
.custom-table td:nth-child(1) {
  width: 25%;
} /* Nhân viên */
.custom-table th:nth-child(2),
.custom-table td:nth-child(2) {
  width: 12%;
} /* Chức vụ */
.custom-table th:nth-child(3),
.custom-table td:nth-child(3) {
  width: 18%;
} /* Liên hệ */
.custom-table th:nth-child(4),
.custom-table td:nth-child(4) {
  width: 15%;
} /* Ngày vào làm */
.custom-table th:nth-child(5),
.custom-table td:nth-child(5) {
  width: 18%;
} /* Trạng thái */
.custom-table th:nth-child(6),
.custom-table td:nth-child(6) {
  width: 12%;
} /* Thao tác */

/* 2. Cấu hình Font 14px & Tối giản */
.table {
  font-family: 'Inter', sans-serif;
}

.name-text {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: #2c3e50;
}
.contact-primary {
  font-size: 14px;
  font-weight: 500;
}
.contact-secondary {
  font-size: 12px;
}
.date-text {
  font-size: 14px;
}

.text-muted-custom {
  font-size: 12px;
  color: #999;
}

/* Avatar tròn tinh tế */
.emp-avatar-v2 {
  width: 38px;
  height: 38px;
  background-color: #f8f9fa;
  border-radius: 50%;
  border: 1px solid #eee;
}

/* Badge chức vụ nhã nhặn */
.role-badge {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #666;
  background: #f1f1f1;
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 500;
}

/* Switch không viền xanh */
.custom-switch-v2 {
  width: 2.2em !important;
  height: 1.1em !important;
  cursor: pointer;
  background-color: #e9ecef;
  border: none;
}

.custom-switch-v2:checked {
  background-color: #1a1a1a !important;
}
.custom-switch-v2:focus,
.shadow-none:focus {
  box-shadow: none !important;
  border-color: rgba(0, 0, 0, 0.1);
}

/* Label trạng thái cố định */
.status-text {
  font-size: 13.5px;
  font-weight: 400;
  min-width: 120px; /* Cố định để không nhảy cột */
}
.active-status {
  color: #2ecc71;
}
.inactive-status {
  color: #999;
}

/* Nút thao tác */
.btn-action {
  background: none;
  border: none;
  color: #aaa;
  transition: 0.2s;
  padding: 5px;
}
.btn-action:hover {
  color: #000;
  transform: translateY(-1px);
}
.btn-delete:hover {
  color: #dc3545;
}

.tracking-widest {
  letter-spacing: 0.1em;
}
</style>
