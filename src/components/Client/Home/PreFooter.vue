<template>
  <section class="service-commitments py-5 border-top bg-white">
    <div class="container">
      <div class="row g-4 text-center">
        <div class="col-6 col-md-3">
          <div class="service-item">
            <div class="service-icon mb-3">
              <img
                src="https://format.vn/media/wysiwyg/homepage-offer5.png"
                alt="Đặc quyền VIP"
                width="60"
              />
            </div>
            <h6 class="fw-bold text-uppercase small mb-2">Đặc quyền VIP</h6>
            <p class="text-muted small mb-0">Ưu đãi lên đến 35%</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="service-item">
            <div class="service-icon mb-3">
              <img
                src="https://format.vn/media/wysiwyg/homepage-offer6.png"
                alt="Cá nhân hóa"
                width="60"
              />
            </div>
            <h6 class="fw-bold text-uppercase small mb-2">Cá nhân hóa</h6>
            <p class="text-muted small mb-0">Dấu ấn chuẩn Format</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="service-item">
            <div class="service-icon mb-3">
              <img
                src="https://format.vn/media/wysiwyg/homepage-offer7.png"
                alt="Bảo hành"
                width="60"
              />
            </div>
            <h6 class="fw-bold text-uppercase small mb-2">Bảo hành và bảo trì</h6>
            <p class="text-muted small mb-0">Bền đẹp cùng năm tháng</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="service-item">
            <div class="service-icon mb-3">
              <img
                src="https://format.vn/media/wysiwyg/homepage-offer8.png"
                alt="May đo"
                width="60"
              />
            </div>
            <h6 class="fw-bold text-uppercase small mb-2">Chuẩn như may đo</h6>
            <p class="text-muted small mb-0">Tinh tế từng chi tiết nhỏ</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.service-commitments {
  border-bottom: 1px solid #eee;
}

.service-item {
  padding: 50px;
  transition: transform 0.3s ease;
}

.service-item:hover {
  transform: translateY(-5px); /* Hiệu ứng nổi nhẹ khi di chuột */
}

.service-icon img {
  height: auto;
  object-fit: contain;
  filter: grayscale(100%); /* Để icon màu đen trắng giống Format */
  opacity: 0.8;
  transition: all 0.3s ease;
}

.service-item:hover .service-icon img {
  filter: grayscale(0%); /* Hiện màu khi hover nếu muốn */
  opacity: 1;
}

.service-item h6 {
  letter-spacing: 1px;
  font-size: 0.85rem;
  color: #212529;
}

.service-item p {
  font-size: 0.75rem;
  color: #6c757d;
}

@media (max-width: 576px) {
  .service-icon img {
    width: 45px;
  }
  .service-item h6 {
    font-size: 0.75rem;
  }
}
</style>
