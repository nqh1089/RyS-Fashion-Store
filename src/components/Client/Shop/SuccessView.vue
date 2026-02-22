<template>
  <div class="container py-5 text-center">
    <div class="success-icon mb-4">
      <i class="bi bi-check-circle-fill text-success" style="font-size: 5rem"></i>
    </div>
    <h2 class="fw-bold text-uppercase mb-3">Thanh toán thành công!</h2>
    <p class="text-muted mb-5">
      Cảm ơn bạn đã tin tưởng và lựa chọn RyS Fashion. Đơn hàng của bạn đang được xử lý.
    </p>

    <router-link to="/shop" class="btn btn-dark rounded-0 px-5 py-3 text-uppercase fw-bold">
      Xem thêm sản phẩm khác
    </router-link>
  </div>
</template>

<script setup>
// Trang này chỉ hiển thị giao diện thông báo
</script>

<style scoped>
.success-icon {
  animation: scaleUp 0.5s ease-out;
}
@keyframes scaleUp {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
