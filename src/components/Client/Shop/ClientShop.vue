<template>
  <div class="shop-page">
    <div class="breadcrumb-wrapper border-bottom">
      <div class="container-fluid px-md-5"> <nav aria-label="breadcrumb" class="py-3"> <ol class="breadcrumb mb-0 bg-transparent p-0">
            <li class="breadcrumb-item">
              <router-link to="/" class="text-decoration-none text-dark opacity-75">TRANG CHỦ</router-link>
            </li>
            <li class="breadcrumb-item active text-dark fw-bold" aria-current="page">ÁO DÀI</li>
          </ol>
        </nav>
      </div>
    </div>

    <section class="collection-banner">
      <div class="container-fluid px-0">
        <img
          src="https://file.hstatic.net/200000182297/file/bw2_b9e6b447b92c47288ccb745919f2780b.jpg"
          class="img-fluid w-100"
          alt="BST Áo Dài"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.breadcrumb-wrapper {
  background-color: #fff;
  padding: 0 355px;
}

/* Kiểu chữ cho Breadcrumb */
.breadcrumb-item {
  font-size: 11px;
  letter-spacing: 0.1em; /* Khoảng cách chữ thưa ra cho sang */

}

.breadcrumb-item + .breadcrumb-item::before {
  content: "/"; /* Dấu gạch chéo phân cách */
  color: #333;
  padding: 0 10px;
}

.breadcrumb-item.active {
  color: #000 !important;
}

/* Đảm bảo Banner không có khoảng cách với thanh Breadcrumb */
.collection-banner img {
  display: block;
}
</style>
