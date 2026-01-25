<template>
  <div class="admin-container">
    <AdminSidebar />

    <div class="admin-main-content">
      <AdminHeader :title="currentRouteName" />

      <main class="p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from '@/components/Admin/AdminSidebar.vue'
import AdminHeader from '@/components/Admin/AdminHeader.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
// Lấy tên trang từ meta của router để hiển thị lên Header
const currentRouteName = computed(() => route.meta.title || 'QUẢN TRỊ')
</script>

<style>
.admin-main-content {
  margin-left: 280px; /* Bằng chiều rộng Sidebar */
  min-height: 100vh;
  background-color: #fff;
}
</style>
