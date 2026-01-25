<template>
  <aside class="admin-sidebar">
    <div class="sidebar-logo">
      <img src="@/assets/Home/RyS2.png" alt="RyS Logo" class="admin-main-logo" />
    </div>

    <nav class="sidebar-nav">
      <router-link to="/admin/dashboard" class="nav-item">
        <i class="bi bi-speedometer2"></i> <span>TỔNG QUAN</span>
      </router-link>
      <router-link to="/admin/products" class="nav-item">
        <i class="bi bi-box-seam"></i> <span>SẢN PHẨM</span>
      </router-link>
      <router-link to="/admin/orders" class="nav-item">
        <i class="bi bi-receipt"></i> <span>HÓA ĐƠN</span>
      </router-link>
      <router-link to="/admin/employees" class="nav-item">
        <i class="bi bi-person-badge"></i> <span>NHÂN VIÊN</span>
      </router-link>
      <router-link to="/admin/customers" class="nav-item">
        <i class="bi bi-people"></i> <span>KHÁCH HÀNG</span>
      </router-link>
      <router-link to="/admin/pos" class="nav-item">
        <i class="bi bi-pc-display-horizontal"></i> <span>BÁN HÀNG</span>
      </router-link>
    </nav>
  </aside>
</template>

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
}

/* LOGO */
.sidebar-logo {
  padding: 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.admin-main-logo {
  height: 60px; /* Tăng kích thước logo cho rõ nét */
  width: auto;
  object-fit: contain;
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
}
.nav-item i {
  font-size: 20px;
  margin-right: 15px;
}
/* Style khi trang đang active */
.router-link-active {
  color: #fff !important;
  background-color: rgba(255, 255, 255, 0.1);
  border-left: 4px solid #fff;
}
</style>
