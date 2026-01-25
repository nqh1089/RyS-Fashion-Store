<template>
  <header class="admin-header">
    <div class="header-left">
      <h4 class="page-title">{{ title }}</h4>
    </div>

    <div class="header-right">
      <div class="dropdown custom-account-dropdown">
        <div class="account-trigger d-flex align-items-center gap-2">
          <span class="admin-name">[Tên account]</span>
          <div class="admin-avatar">
            <i class="bi bi-person-circle"></i>
          </div>
        </div>

        <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-0">
          <li>
            <router-link class="dropdown-item py-2" to="/">
              <i class="bi bi-house-door me-2"></i> Trở về giao diện
            </router-link>
          </li>
          <li>
            <router-link class="dropdown-item py-2" to="/admin/profile">
              <i class="bi bi-person me-2"></i> Tài khoản
            </router-link>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <router-link class="dropdown-item py-2 text-danger" to="/login">
              <i class="bi bi-box-arrow-right me-2"></i> Đăng xuất
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps(['title'])
</script>

<style scoped>
.admin-header {
  height: 80px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
}

.page-title {
  font-weight: 300;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0;
}

/* KHU VỰC QUYẾT ĐỊNH HIỆU ỨNG THẢ XUỐNG */
.custom-account-dropdown {
  position: relative;
}

/* Khi hover vào wrapper thì hiện menu */
.custom-account-dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0;
  animation: fadeIn 0.3s ease;
}

.account-trigger {
  cursor: pointer;
  padding: 5px 10px;
}

.admin-name {
  font-size: 13px;
  color: #888;
}

.admin-avatar {
  font-size: 28px;
  display: flex;
  align-items: center;
}

/* Style cho các item trong menu dropdown */
.dropdown-menu {
  min-width: 200px;
  font-size: 13px;
  /* Đảm bảo menu nằm ngay dưới avatar */
  top: 100%;
  right: 0;
}

.dropdown-item {
  color: #333;
  transition: 0.2s;
}

.dropdown-item:hover {
  background-color: #000;
  color: #fff;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
