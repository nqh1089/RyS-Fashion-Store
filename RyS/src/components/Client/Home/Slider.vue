<template>
  <section id="nemHeroSlider" class="carousel slide carousel-fade" data-bs-ride="carousel">
    <div class="carousel-indicators nem-indicators">
      <button
        type="button"
        data-bs-target="#nemHeroSlider"
        data-bs-slide-to="0"
        class="active"
      ></button>
      <button type="button" data-bs-target="#nemHeroSlider" data-bs-slide-to="1"></button>
      <!-- <button
      type="button"
      data-bs-target="#nemHeroSlider"
      data-bs-slide-to="2"
    ></button> -->
    </div>

    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img2_master.jpg?v=3027"
          class="d-block w-100 nem-banner-img"
          alt="Banner 1"
        />
      </div>
      <div class="carousel-item">
        <img
          src="https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img4_master.jpg?v=3036"
          class="d-block w-100 nem-banner-img"
          alt="Banner 2"
        />
      </div>
      <!-- <div class="carousel-item">
      <img
        src="https://theme.hstatic.net/200000182297/1000887316/14/home_new_banner_2_2048x2048.jpg?v=3027"
        class="d-block w-100 nem-banner-img"
        alt="Banner 2"
      />
    </div> -->
    </div>

    <button
      class="carousel-control-prev nem-nav-btn"
      type="button"
      data-bs-target="#nemHeroSlider"
      data-bs-slide="prev"
    >
      <!-- <span class="bi bi-chevron-left" aria-hidden="true"></span> -->
      <!-- <span class="visually-hidden">Previous</span> -->
    </button>

    <button
      class="carousel-control-next nem-nav-btn"
      type="button"
      data-bs-target="#nemHeroSlider"
      data-bs-slide="next"
    >
      <!-- <span class="bi bi-chevron-right" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span> -->
    </button>
  </section>
</template>

<style scoped>
/* Tùy chỉnh chung cho nút điều hướng */
.nem-nav-btn {
  width: 5%;
  opacity: 0; /* Mặc định ẩn mũi tên */
  transition: all 0.4s ease-in-out;
}

/* Hiện mũi tên khi rê chuột vào Slider */
#nemHeroSlider:hover .nem-nav-btn {
  opacity: 1;
}

/* Định dạng Icon mũi tên */
.nem-nav-btn span {
  font-size: 2.5rem; /* Kích thước mũi tên */
  color: #333; /* Màu xám đậm sang trọng, đổi thành #fff nếu ảnh tối màu */
  font-weight: 100;
}

/* Hiệu ứng khi di chuột trực tiếp vào nút mũi tên */
.nem-nav-btn:hover {
  background: rgba(255, 255, 255, 0.1); /* Hiệu ứng bóng mờ nhẹ */
}

/* Tùy chỉnh lại Indicators (Dấu chấm) cho đồng bộ */
.nem-indicators {
  bottom: 20px;
}

.nem-indicators button {
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  margin: 0 6px !important;
  background-color: transparent !important;
  border: 1px solid #333 !important;
  opacity: 0.5;
}

.nem-indicators button.active {
  background-color: #333 !important;
  opacity: 1;
}

/* Responsive cho Mobile */
@media (max-width: 768px) {
  .nem-nav-btn {
    display: none; /* Ẩn mũi tên trên mobile để tránh vướng víu */
  }
}
</style>
