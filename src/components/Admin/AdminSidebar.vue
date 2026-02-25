<template>
  <aside class="admin-sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-logo">
      <img src="@/assets/Home/RyS2.png" alt="RyS Logo" class="admin-main-logo" />
    </div>

    <nav class="sidebar-nav">
      <router-link to="/admin/dashboard" class="nav-item" title="Tổng quan">
        <i class="bi bi-speedometer2"></i> <span>TỔNG QUAN</span>
      </router-link>
      <router-link to="/admin/products" class="nav-item" title="Sản phẩm">
        <i class="bi bi-box-seam"></i> <span>SẢN PHẨM</span>
      </router-link>
      <router-link to="/admin/orders" class="nav-item" title="Hóa đơn">
        <i class="bi bi-receipt"></i> <span>ĐƠN HÀNG</span>
      </router-link>
      <router-link to="/admin/employees" class="nav-item" title="Nhân viên">
        <i class="bi bi-person-badge"></i> <span>NHÂN VIÊN</span>
      </router-link>
      <router-link to="/admin/customers" class="nav-item" title="Khách hàng">
        <i class="bi bi-people"></i> <span>KHÁCH HÀNG</span>
      </router-link>
      <router-link to="/admin/pos" class="nav-item" title="Bán hàng">
        <i class="bi bi-pc-display-horizontal"></i> <span>BÁN HÀNG</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isCollapsed = ref(false)

const handleResize = () => {
  isCollapsed.value = window.innerWidth <= 1200
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.admin-sidebar {
  width: 280px;
  height: 100vh;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease; /* Hiệu ứng */
  z-index: 1000;
}

/* KHI THU NHỎ */
.admin-sidebar.collapsed {
  width: 80px; /* Độ rộng khi chỉ hiện icon */
}

.sidebar-logo {
  padding: 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.admin-main-logo {
  height: 50px;
  width: auto;
  transition: 0.3s;
}

/* Thu nhỏ logo khi sidebar co lại */
.collapsed .admin-main-logo {
  height: 30px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}

.nav-item {
  padding: 15px 30px;
  color: #a0a0a0;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 14px;
  letter-spacing: 1px;
  transition: 0.3s;
  white-space: nowrap; /* Không cho chữ xuống dòng khi co lại */
}

.nav-item i {
  font-size: 20px;
  margin-right: 15px;
  transition: 0.3s;
}

/* ẨN CHỮ KHI COLLAPSED */
.collapsed .nav-item {
  padding: 20px 0;
  justify-content: center;
}

.collapsed .nav-item span {
  display: none; /* Ẩn toàn bộ text */
}

.collapsed .nav-item i {
  margin-right: 0; /* Đưa icon vào chính giữa */
  font-size: 24px;
}

/* Hover & Active */
.nav-item:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.05);
}

.router-link-active {
  color: #fff !important;
  background-color: rgba(255, 255, 255, 0.1);
  border-left: 4px solid #fff;
}

.collapsed .router-link-active {
  border-left: 4px solid #fff;
}
</style>
