<template>
  <div class="dashboard-container">
    <div class="row g-4 mb-5">
      <div class="col-md-3" v-for="(SoLieu, index) in ThongKe" :key="index">
        <div class="stat-card p-4 shadow-sm border-0 h-100 bg-white">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div class="stat-icon p-3 bg-light text-dark">
              <i :class="SoLieu.icon"></i>
            </div>
          </div>
          <h6 class="text-secondary text-uppercase small tracking-widest mb-2">
            {{ SoLieu.label }}
          </h6>
          <h3 class="fw-bold m-0">{{ SoLieu.value }}</h3>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-8">
        <div class="chart-card p-4 bg-white shadow-sm h-100">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h6 class="text-uppercase tracking-widest m-0 fw-bold">Doanh thu</h6>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="recent-orders p-4 bg-white shadow-sm h-100">
          <h6 class="text-uppercase tracking-widest mb-4 fw-bold">Đơn hàng mới nhất</h6>
          <div class="order-list">
            <div
              v-for="order in DonHangMoiNhat"
              :key="order.id"
              class="order-item d-flex align-items-center mb-3 pb-3 border-bottom border-light"
            >
              <div
                class="order-avatar me-3 bg-light d-flex align-items-center justify-content-center"
                style="width: 45px; height: 45px"
              >
                <i class="bi bi-bag-check small"></i>
              </div>
              <div class="flex-grow-1">
                <p class="mb-0 small fw-bold">{{ order.TenNguoiMua }}</p>
                <small class="text-time">{{ order.ThoiGianDatHang }}</small>
              </div>
              <div class="text-end">
                <p class="mb-0 small fw-bold">{{ order.TongTien }}</p>
                <span class="badge bg-dark rounded-0" style="font-size: 10px">{{
                  order.TrangThai
                }}</span>
              </div>
            </div>
          </div>
          <button
            class="btn btn-outline-dark btn-sm w-100 rounded-0 mt-2 text-uppercase small py-2"
          >
            Xem tất cả đơn hàng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const ThongKe = [
  {
    label: 'Doanh thu hôm nay',
    value: '12.345.678 VNĐ',
    icon: 'bi bi-currency-dollar',
  },
  {
    label: 'Đơn hàng mới',
    value: '68',
    icon: 'bi bi-cart3',
  },
  {
    label: 'Khách hàng mới',
    value: '10',
    icon: 'bi bi-person-plus',
  },
  {
    label: 'Tổng số sản phẩm',
    value: '89',
    icon: 'bi bi-box-seam',
  },
]

const DonHangMoiNhat = [
  {
    id: 1,
    TenNguoiMua: 'Pato Miss',
    ThoiGianDatHang: '5 phút trước',
    TongTien: '520.000đ',
    TrangThai: 'Chờ xử lý',
  },
  {
    id: 2,
    TenNguoiMua: 'Trần Ngọc B',
    ThoiGianDatHang: '20 phút trước',
    TongTien: '890.000đ',
    TrangThai: 'Đã thanh toán',
  },
  {
    id: 3,
    TenNguoiMua: 'Đào Yến Vi',
    ThoiGianDatHang: '1 giờ trước',
    TongTien: '2.100.000đ',
    TrangThai: 'Đang giao',
  },
  {
    id: 4,
    TenNguoiMua: 'Nguyễn Trần Diệu Nhi',
    ThoiGianDatHang: '2 giờ trước',
    TongTien: '550.000đ',
    TrangThai: 'Hoàn thành',
  },
]
</script>

<style scoped>
.dashboard-container {
  animation: fadeIn 0.5s ease-in;
}

.tracking-widest {
  letter-spacing: 0.15em;
  font-size: 0.7rem;
}

.stat-card {
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bar {
  transition: height 1s ease;
  opacity: 0.8;
}

.bar:hover {
  opacity: 1;
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
