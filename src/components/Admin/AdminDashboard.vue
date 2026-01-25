<template>
  <div class="dashboard-container">
    <div class="row g-4 mb-5">
      <div class="col-md-3" v-for="(stat, index) in quickStats" :key="index">
        <div class="stat-card p-4 shadow-sm border-0 h-100 bg-white">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div class="stat-icon p-3 bg-light text-dark">
              <i :class="stat.icon"></i>
            </div>
            <span :class="stat.trendClass + ' small fw-bold'">{{ stat.trend }}</span>
          </div>
          <h6 class="text-secondary text-uppercase small tracking-widest mb-2">{{ stat.label }}</h6>
          <h3 class="fw-bold m-0">{{ stat.value }}</h3>
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
              v-for="order in recentOrders"
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
                <p class="mb-0 small fw-bold">{{ order.customer }}</p>
                <small class="text-muted">{{ order.time }}</small>
              </div>
              <div class="text-end">
                <p class="mb-0 small fw-bold">{{ order.amount }}</p>
                <span class="badge bg-dark rounded-0" style="font-size: 10px">{{
                  order.status
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
const quickStats = [
  {
    label: 'Doanh thu hôm nay',
    value: '12.500.000đ',
    icon: 'bi bi-currency-dollar',
    trend: '+15%',
    trendClass: 'text-success',
  },
  {
    label: 'Đơn hàng mới',
    value: '48',
    icon: 'bi bi-cart3',
    trend: '+5%',
    trendClass: 'text-success',
  },
  {
    label: 'Khách hàng mới',
    value: '12',
    icon: 'bi bi-person-plus',
    trend: '-2%',
    trendClass: 'text-danger',
  },
  {
    label: 'Tỉ lệ chuyển đổi',
    value: '3.2%',
    icon: 'bi bi-graph-up-arrow',
    trend: '+1%',
    trendClass: 'text-success',
  },
]

const recentOrders = [
  { id: 1, customer: 'Nguyễn Văn A', time: '5 phút trước', amount: '1.250k', status: 'Chờ xử lý' },
  { id: 2, customer: 'Trần Thị B', time: '20 phút trước', amount: '890k', status: 'Đã thanh toán' },
  { id: 3, customer: 'Lê Văn C', time: '1 giờ trước', amount: '2.100k', status: 'Đang giao' },
  { id: 4, customer: 'Phạm Minh D', time: '2 giờ trước', amount: '550k', status: 'Hoàn thành' },
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
