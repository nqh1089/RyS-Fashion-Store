<template>
  <div class="cart-container py-5 bg-white">
    <div class="container">
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb small text-uppercase mb-0">
          <li class="breadcrumb-item">
            <router-link to="/" class="text-decoration-none text-dark">Trang chủ</router-link>
          </li>
          <li class="breadcrumb-item active text-muted" aria-current="page">
            Giỏ hàng của bạn - RyS FASHION
          </li>
        </ol>
      </nav>

      <h2 class="fw-bold mb-5 text-uppercase title-cart">Giỏ hàng</h2>

      <div class="table-responsive">
        <table class="table align-middle border-top cart-table">
          <thead>
            <tr class="text-uppercase small fw-semibold text-secondary">
              <th scope="col" class="border-0 py-3" style="width: 45%">Sản phẩm</th>
              <th scope="col" class="border-0 py-3 text-center">Giá</th>
              <th scope="col" class="border-0 py-3 text-center">Số lượng</th>
              <th scope="col" class="border-0 py-3 text-end">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-bottom item-row">
              <td class="py-4">
                <div class="d-flex align-items-center">
                  <img
                    src="https://nemshop.vn/media/catalog/product/z/0/z05902.jpg"
                    alt="CHÂN VÁY DA"
                    class="img-product me-4 shadow-sm"
                  />
                  <div class="info-product">
                    <h6 class="fw-bold mb-1 text-uppercase mb-2">CHÂN VÁY DA Z05902</h6>
                    <p class="small text-muted mb-1">Phiên bản: Size 6 / Đen</p>
                    <p class="small text-muted mb-1">Thương hiệu: RyS</p>
                    <a
                      href="javascript:void(0)"
                      class="text-dark small text-decoration-underline mt-2 d-inline-block"
                      >Xóa</a
                    >
                  </div>
                </div>
              </td>
              <td class="text-center">
                <div class="fw-bold">399,500đ</div>
                <div class="text-muted text-decoration-line-through x-small">799,000đ</div>
                <span class="badge bg-black mt-1">-50%</span>
              </td>
              <td class="text-center">
                <div class="qty-wrapper d-inline-flex border">
                  <button class="btn btn-sm border-0 px-2 py-1">
                    <i class="bi bi-chevron-left x-small"></i>
                  </button>
                  <input
                    type="text"
                    value="1"
                    class="border-0 text-center qty-input shadow-none"
                    readonly
                  />
                  <button class="btn btn-sm border-0 px-2 py-1">
                    <i class="bi bi-chevron-right x-small"></i>
                  </button>
                </div>
              </td>
              <td class="text-end fw-bold">399,500đ</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="row mt-5 pt-3">
        <div class="col-lg-7">
          <div class="note-box">
            <label class="small fw-bold mb-2 text-uppercase">Chú thích</label>
            <textarea
              class="form-control rounded-0 bg-light border-0"
              rows="4"
              placeholder="Ví dụ: Giao hàng giờ hành chính..."
            ></textarea>
          </div>
        </div>
        <div class="col-lg-5 text-end mt-4 mt-lg-0">
          <div class="mb-4 total-summary">
            <span class="text-secondary me-3">Tổng tiền</span>
            <span class="fs-3 fw-bold">399,500đ</span>
          </div>
          <div class="d-flex justify-content-end gap-2 action-btns">
            <button
              class="btn btn-outline-dark rounded-0 px-4 py-3 text-uppercase fw-bold small transition-all"
            >
              Cập nhật
            </button>
            <button
              class="btn btn-dark rounded-0 px-5 py-3 text-uppercase fw-bold small shadow-sm transition-all"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-cart {
  letter-spacing: 2px;
}
.img-product {
  width: 130px;
  height: 180px;
  object-fit: cover;
}
.breadcrumb-item + .breadcrumb-item::before {
  content: '/';
  font-size: 10px;
}
.x-small {
  font-size: 11px;
}

.cart-table th {
  letter-spacing: 1px;
  color: #666;
}
.qty-input {
  width: 45px;
  font-size: 14px;
  background: transparent;
  font-weight: 500;
}
.qty-wrapper button:hover {
  background-color: #f8f9fa;
}

.transition-all {
  transition: all 0.3s ease;
}
.transition-all:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

/* Đưa màu badge về đen đúng chất NEM */
.bg-black {
  background-color: #000 !important;
}

@media (max-width: 768px) {
  .img-product {
    width: 80px;
    height: 110px;
  }
  .action-btns button {
    padding: 10px 15px !important;
    flex: 1;
  }
}
</style>
