<template>
  <div class="employee-management">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="search-box w-25">
        <div class="input-group">
          <span class="input-group-text bg-white border-end-0 rounded-0"
            ><i class="bi bi-search"></i
          ></span>
          <input
            type="text"
            class="form-control border-start-0 rounded-0 small"
            v-model="searchQuery"
            placeholder="Tìm tên hoặc mã nhân viên..."
          />
        </div>
      </div>
      <button class="btn btn-dark rounded-0 px-4 py-2 text-uppercase tracking-widest small">
        <i class="bi bi-person-plus-fill me-2"></i> Thêm nhân viên
      </button>
    </div>

    <div class="card border-0 shadow-sm rounded-0">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
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
            <tr v-for="emp in filteredEmployees" :key="emp.id">
              <td class="ps-4">
                <div class="d-flex align-items-center">
                  <div
                    class="emp-avatar me-3 bg-secondary-subtle d-flex align-items-center justify-content-center"
                  >
                    <i class="bi bi-person-fill text-secondary"></i>
                  </div>
                  <div>
                    <p class="mb-0 fw-bold small text-uppercase">{{ emp.name }}</p>
                    <small class="text-muted">Mã NV: #{{ emp.empId }}</small>
                  </div>
                </div>
              </td>
              <td>
                <span class="small fw-bold text-dark text-uppercase" style="font-size: 11px">{{
                  emp.role
                }}</span>
              </td>
              <td>
                <p class="mb-0 small">{{ emp.phone }}</p>
                <small class="text-muted text-lowercase" style="font-size: 11px">{{
                  emp.email
                }}</small>
              </td>
              <td>
                <span class="small text-muted">{{ emp.startDate }}</span>
              </td>
              <td>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input custom-switch"
                    type="checkbox"
                    :checked="emp.active"
                  />
                  <span class="small ms-2">{{ emp.active ? 'Hoạt động' : 'Đã khóa' }}</span>
                </div>
              </td>
              <td class="text-end pe-4">
                <button class="btn btn-sm btn-link text-dark p-0 me-3" title="Phân quyền">
                  <i class="bi bi-shield-lock fs-6"></i>
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

const employees = ref([
  {
    id: 1,
    ma: 'NV01',
    name: 'Đặng Quốc Huy',
    role: 'Quản lý',
    phone: '0901234567',
    email: 'huydq@rys.vn',
    startDate: '01/01/2023',
    active: true,
  },
  {
    id: 2,
    empId: 'NV05',
    name: 'Lê Thị Thu Thảo',
    role: 'Bán hàng',
    phone: '0988776655',
    email: 'thaoltt@rys.vn',
    startDate: '15/06/2023',
    active: true,
  },
  {
    id: 3,
    empId: 'NV012',
    name: 'Phạm Minh Nhật',
    role: 'Kho quỹ',
    phone: '0355443322',
    email: 'nhatpm@rys.vn',
    startDate: '10/12/2023',
    active: false,
  },
])

const filteredEmployees = computed(() => {
  return employees.value.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      e.empId.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
</script>

<style scoped>
.tracking-widest {
  letter-spacing: 0.15em;
  font-size: 0.75rem;
}

.emp-avatar {
  width: 40px;
  height: 40px;
  border-radius: 4px;
}

.table tbody td {
  padding: 15px 10px;
  border-bottom: 1px solid #f8f9fa;
}

.custom-switch {
  cursor: pointer;
}

.custom-switch:checked {
  background-color: #000;
  border-color: #000;
}

.form-control:focus {
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
