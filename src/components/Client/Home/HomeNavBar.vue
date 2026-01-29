<template>
  <div class="py-2 bg-dark text-white text-center small tracking-widest">
    MIỄN PHÍ VẬN CHUYỂN ĐƠN HÀNG TỪ 500K
  </div>

  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/Home/RyS.png" alt="RyS Fashion Store" class="main-logo" />
      </router-link>

      <button
        class="navbar-toggler border-0 shadow-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header border-bottom">
          <h5 class="offcanvas-title fw-bold" id="offcanvasNavbarLabel">MENU</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div class="offcanvas-body">
          <ul class="navbar-nav mx-auto text-uppercase fw-semibold small">
            <li class="nav-item dropdown custom-dropdown">
              <router-link
                to="/shop"
                class="nav-link px-3 dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Sản phẩm
              </router-link>
              <ul class="dropdown-menu border-0 shadow-sm rounded-0">
                <li>
                  <router-link class="dropdown-item py-2" to="/shop">Áo dài</router-link>
                </li>
                <li>
                  <router-link
                    class="dropdown-item py-2 d-flex justify-content-between align-items-center"
                    to=""
                  >
                    Quần <i class="bi bi-chevron-right small-icon"></i>
                  </router-link>
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown custom-dropdown">
              <a
                class="nav-link px-3 dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Bộ sưu tập
              </a>
              <ul class="dropdown-menu border-0 shadow-sm rounded-0">
                <li>
                  <a class="dropdown-item py-2" href="/#pink-collection"> Nàng Thơ Trong Nắng </a>
                </li>
                <li>
                  <a class="dropdown-item py-2" href="/#red-collection"> Sắc Đỏ Uy Nghi </a>
                </li>
              </ul>
            </li>

            <li class="nav-item"><a class="nav-link px-3" href="#">Xuân 2026</a></li>
            <li class="nav-item"><a class="nav-link px-3" href="#">Tết 2026</a></li>
            <li class="nav-item">
              <a class="nav-link px-3 text-danger" href="#">Sale Off</a>
            </li>
          </ul>

          <div class="d-flex align-items-center mt-4 mt-lg-0 icon-group">
            <div class="nav-search px-3" @mouseenter="clearSearch" @mouseleave="clearSearch">
              <a href="#" class="text-dark d-flex align-items-center text-decoration-none">
                <i class="bi bi-search fs-5"></i>
              </a>

              <div class="search-dropdown">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  v-model="searchQuery"
                  @keyup.enter="handleSearch"
                />
                <button @click="handleSearch">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>

            <div class="vr-line"></div>

            <div class="nav-account px-3 custom-dropdown">
              <router-link
                to="/login"
                class="text-dark d-flex align-items-center text-decoration-none nav-link"
              >
                <i class="bi bi-person-circle fs-4"></i>
              </router-link>

              <ul class="dropdown-menu border-0 shadow-sm rounded-0">
                <li>
                  <router-link to="/login" class="dropdown-item py-2">Đăng nhập</router-link>
                </li>
                <li>
                  <router-link
                    :to="{ path: '/login', query: { mode: 'register' } }"
                    class="dropdown-item py-2"
                    >Đăng ký</router-link
                  >
                </li>
              </ul>
            </div>

            <div class="vr-line"></div>

            <a href="#" class="text-dark px-3 d-flex align-items-center text-decoration-none">
              <div class="position-relative">
                <i class="bi bi-bag-fill fs-4"></i>
                <span class="cart-badge-inner">2</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Import useRouter để điều hướng

const router = useRouter()
const searchQuery = ref('')

const clearSearch = () => {
  searchQuery.value = ''
}

const handleSearch = () => {
  const keyword = searchQuery.value.trim()
  if (keyword) {
    // Điều hướng sang trang shop kèm query search
    router.push({ path: '/shop', query: { search: keyword } })
    // Xóa nội dung sau khi search thành công
    searchQuery.value = ''
  }
}
</script>

<style scoped>
.main-logo {
  height: 50px;
  width: auto;
  object-fit: contain;
  display: block;
  transition: transform 0.3s ease;
}

.main-logo:hover {
  transform: scale(1.05);
}

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

.custom-dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0;
}

.dropdown-menu {
  min-width: 200px;
  font-size: 13px;
  animation: fadeIn 0.3s ease;
}

.dropdown-item {
  color: #333;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
  color: #000;
  padding-left: 1.5rem;
}

.small-icon {
  font-size: 10px;
  opacity: 0.5;
}

.dropdown-toggle::after {
  display: none;
}

.icon-group {
  gap: 0;
}

.vr-line {
  width: 1px;
  height: 22px;
  background-color: #ddd;
}

.cart-badge-inner {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -40%);
  font-size: 10px;
  color: #fff;
  font-weight: bold;
}

.nav-search {
  position: relative;
}

.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(15px);
  transition: all 0.25s ease;
  z-index: 1050;
}

.nav-search:hover .search-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(18px);
}

.search-dropdown input {
  border: none;
  padding: 10px 15px;
  outline: none;
  width: 240px;
  font-size: 14px;
}

.search-dropdown button {
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

/* Thêm vào phần style nếu bạn không muốn icon account có đường gạch chân */
.nav-account .nav-link::after {
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
