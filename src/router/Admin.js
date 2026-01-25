import AdminLayout from '@/layouts/AdminLayout.vue'

const adminRoutes = [
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/components/Admin/AdminDashboard.vue'),
        meta: { title: 'TỔNG QUAN' },
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('@/components/Admin/ProductManagement.vue'),
        meta: { title: 'QUẢN LÝ SẢN PHẨM' },
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/components/Admin/OrderManagement.vue'),
        meta: { title: 'QUẢN LÝ ĐƠN HÀNG' },
      },
      {
        path: 'customers',
        name: 'AdminCustomers',
        component: () => import('@/components/Admin/CustomerManagement.vue'),
        meta: { title: 'QUẢN LÝ KHÁCH HÀNG' },
      },
      {
        path: 'employees',
        name: 'AdminEmployees',
        component: () => import('@/components/Admin/EmployeeManagement.vue'),
        meta: { title: 'QUẢN LÝ NHÂN VIÊN' },
      },
      {
        path: 'pos',
        name: 'POS',
        component: () => import('@/components/Admin/POS.vue'),
        meta: { title: 'BÁN HÀNG' },
      },
    ],
  },
]

export default adminRoutes
