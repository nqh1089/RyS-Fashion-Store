<template>
  <section class="shop-page-section my-5">
    <div class="container">
      <div class="text-center mb-5">
        <h2 class="fw-light tracking-widest text-uppercase" style="font-size: 2rem">ÁO DÀI</h2>
        <p class="text-muted small">Khám phá nét đẹp truyền thống trong thiết kế hiện đại</p>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div class="filter-left">
          <span class="small text-uppercase fw-bold">Bộ lọc: </span>
          <select class="form-select form-select-sm d-inline-block w-auto border-0">
            <option>Màu sắc</option>
            <option>Giá tiền</option>
            <option>Kích cỡ</option>
          </select>
        </div>
        <div class="filter-right">
          <span class="small text-muted">Hiển thị: 12 sản phẩm</span>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-6 col-lg-3">
          <div class="product-card">
            <div class="product-img-container">
              <a href="#">
                <img
                  src="https://cdn.hstatic.net/products/200000182297/ao_dai_1_main.jpg"
                  class="img-main"
                />
                <img
                  src="https://cdn.hstatic.net/products/200000182297/ao_dai_1_hover.jpg"
                  class="img-hover"
                />
                <div class="product-overlay"><span class="btn-xem-them">XEM CHI TIẾT</span></div>
              </a>
            </div>
            <div class="product-info">
              <p class="product-name text-uppercase">ÁO DÀI NHUNG ĐỎ CAO CẤP</p>
              <p class="product-price">2,599,000đ</p>
            </div>
          </div>
        </div>
      </div>

      <nav class="mt-5">
        <ul class="pagination justify-content-center">
          <li class="page-item active">
            <a class="page-link border-dark bg-dark text-white rounded-0" href="#">1</a>
          </li>
          <li class="page-item">
            <a class="page-link border-dark text-dark rounded-0" href="#">2</a>
          </li>
          <li class="page-item">
            <a class="page-link border-dark text-dark rounded-0" href="#">></a>
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script>
// Hàm để chuyển trang
function navigateTo(page) {
  if (page === 'home') {
    includeHTML('components/Client/Home/Slider.html', 'main-content')
    // Sau đó gọi tiếp các file khác như PromoBanners, ProductCarousel...
  } else if (page === 'shop') {
    // Xóa trắng nội dung cũ và nạp trang Shop
    document.getElementById('main-content').innerHTML = ''
    includeHTML('components/Client/Shop/Shop.html', 'main-content')
  }
}
</script>

<style scoped>
/* --- 9. SHOP PAGE STYLE --- */
.page-link {
  padding: 8px 16px;
  font-size: 14px;
  transition: all 0.3s;
}

.page-link:hover {
  background-color: #000;
  color: #fff !important;
}

/* Đảm bảo lưới sản phẩm trang Shop không bị trượt như Carousel */
.shop-page-section .product-card {
  margin-bottom: 20px;
  width: 100%; /* Cho phép co giãn theo cột của Bootstrap */
}

.shop-page-section .product-img-container {
  width: 100%; /* Tự động theo cột */
  height: auto;
  aspect-ratio: 2/3; /* Giữ tỷ lệ ảnh chuẩn [cite: 6] */
}
</style>
