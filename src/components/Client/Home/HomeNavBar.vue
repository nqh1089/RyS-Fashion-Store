<template>
  <div class="py-2 bg-dark text-white text-center small tracking-widest">
    MIỄN PHÍ VẬN CHUYỂN ĐƠN HÀNG TỪ 500K
  </div>

  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/Home/RyS.png" alt="RyS Fashion Store" class="main-logo" />
      </router-link>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto text-uppercase fw-semibold small">
          <li class="nav-item dropdown custom-dropdown">
            <router-link
              to="/shop"
              class="nav-link px-3 dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sản phẩm
            </router-link>
            <ul class="dropdown-menu border-0 shadow-sm rounded-0">
              <li><router-link class="dropdown-item py-2" to="/shop">Áo dài</router-link></li>
              <li>
                <router-link
                  class="dropdown-item py-2 d-flex justify-content-between align-items-center"
                  to=""
                >
                  Quần <i class="bi bi-chevron-right small-icon"></i
                ></router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item"><a class="nav-link px-3" href="#">Bộ sưu tập</a></li>
          <li class="nav-item"><a class="nav-link px-3" href="#">Xuân 2026</a></li>
          <li class="nav-item"><a class="nav-link px-3" href="#">Tết 2026</a></li>
          <li class="nav-item text-danger">
            <a class="nav-link px-3 text-danger" href="#">Sale Off</a>
          </li>
        </ul>

        <div class="d-flex align-items-center gap-3">
          <a href="#" class="text-dark"><i class="bi bi-search"></i></a>

          <router-link to="/login" class="text-dark">
            <i class="bi bi-person"></i>
          </router-link>

          <a href="#" class="text-dark position-relative">
            <i class="bi bi-bag"></i>
            <span
              class="badge rounded-pill bg-dark position-absolute top-0 start-100 translate-middle"
              style="font-size: 0.6rem"
              >0</span
            >
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Logo */
.main-logo {
  height: 50px; /* Điều chỉnh độ cao phù hợp với thanh menu */
  width: auto; /* Giữ tỉ lệ ảnh */
  object-fit: contain; /* Đảm bảo ảnh không bị cắt */
  display: block; /* Đặt hiển thị block để tránh khoảng trắng dưới ảnh */
  transition: transform 0.3s ease; /* Hiệu ứng chuyển đổi mượt mà */
}

.main-logo:hover {
  transform: scale(1.05); /* Hiệu ứng phóng nhẹ khi di chuột */
}

/* Hiệu ứng gạch chân */
.nav-link {
  position: relative;
  transition: color 0.3s;
}
.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: 5px;
  left: 15%;
  background-color: #000;
  transition: width 0.3s;
}
.nav-link:hover::after {
  width: 70%;
}

/* Dropdown khi Hover */
.custom-dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0; /* Loại bỏ khoảng cách để không bị mất hover */
}

.dropdown-menu {
  min-width: 200px;
  font-size: 13px;
  animation: fadeIn 0.3s ease; /* Thêm hiệu ứng hiện ra mượt mà */
}

.dropdown-item {
  color: #333;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #000;
  padding-left: 1.5rem; /* Hiệu ứng đẩy nhẹ khi hover */
}

.small-icon {
  font-size: 10px;
  opacity: 0.5;
}

/* bỏ mũi tên mặc định của Bootstrap */
.dropdown-toggle::after {
  display: none;
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

<!-- <template>
  <div class="py-2 bg-dark text-white text-center small tracking-widest">
    MIỄN PHÍ VẬN CHUYỂN ĐƠN HÀNG TỪ 500K
  </div>

  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
    <div class="container">
    <router-link to="/" class="navbar-brand fw-bold">DevS</router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto text-uppercase fw-semibold small">
          <li class="nav-item">
            <router-link to="/shop" class="nav-link px-3">Sản phẩm</router-link>
          </li>
          <li class="nav-item"><a class="nav-link px-3" href="#">Bộ sưu tập</a></li>
          <li class="nav-item"><a class="nav-link px-3" href="#">Áo sơ mi</a></li>
          <li class="nav-item"><a class="nav-link px-3" href="#">Đầm thiết kế</a></li>
          <li class="nav-item text-danger">
            <a class="nav-link px-3 text-danger" href="#">Sale Off</a>
          </li>
        </ul>
        <div class="d-flex align-items-center gap-3">
          <a href="#" class="text-dark"><i class="bi bi-search"></i></a>
          <a href="#" class="text-dark"><i class="bi bi-person"></i></a>
          <a href="#" class="text-dark position-relative">
            <i class="bi bi-bag"></i>
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
              style="font-size: 0.6rem"
              >0</span
            >
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Navbar */
.nav-link {
  position: relative;
  transition: color 0.3s;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: 5px;
  left: 15%;
  background-color: #000;
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 70%;
}

/* Hero Section */
.hero-img {
  height: 80vh;
  object-fit: cover;
  filter: brightness(0.9);
}
</style> -->
