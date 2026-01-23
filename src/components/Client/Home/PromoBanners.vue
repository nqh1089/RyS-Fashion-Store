<template>
  <section class="promo-banners my-2">
    <div class="container-fluid px-1">
      <div class="row g-2">
        <div class="col-md-6">
          <div class="promo-item position-relative overflow-hidden">
            <a href="#" class="text-decoration-none">
              <img
                src="https://theme.hstatic.net/200000182297/1000887316/14/home_new_banner_1_2048x2048.jpg?v=3027"
                class="img-fluid w-100"
                alt="AO DAI"
              />
              <div
                class="promo-content d-flex justify-content-between align-items-center px-4 py-3 bg-light"
              >
                <span class="fw-bold text-uppercase tracking-widest text-dark">AO DAI</span>
                <span class="small text-muted">SHOP NOW</span>
              </div>
            </a>
          </div>
        </div>
        <div class="col-md-6">
          <div class="promo-item position-relative overflow-hidden">
            <a href="#" class="text-decoration-none">
              <img
                src="https://theme.hstatic.net/200000182297/1000887316/14/home_new_banner_2_2048x2048.jpg?v=3027"
                class="img-fluid w-100"
                alt="NEW COLLECTION"
              />
              <div
                class="promo-content d-flex justify-content-between align-items-center px-4 py-3 bg-light"
              >
                <span class="fw-bold text-uppercase tracking-widest text-dark">NEW COLLECTION</span>
                <span class="small text-muted">SHOP NOW</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.promo-item {
  transition: all 0.5s ease;
}

.promo-item img {
  transition: transform 0.8s ease;
}

.promo-item:hover img {
  transform: scale(1.03);
}

.promo-content {
  color: #333;
  transition: background 0.3s;
}

.promo-item:hover .promo-content {
  background-color: #f0f0f0 !important;
}

.promo-content span.border-bottom {
  font-size: 0.75rem;
  padding-bottom: 2px;
}

.promo-item a {
  text-decoration: none;
}
</style>
