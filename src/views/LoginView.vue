<template>
  <div class="login-wrapper">
    <div class="container" :class="{ active: isRegister }">
      <div class="form-box login">
        <form @submit.prevent="HandleLogin">
          <h1>Login</h1>

          <div class="input-box">
            <input type="text" v-model="loginData.username" placeholder="Username" required />
            <i class="bx bxs-user"></i>
          </div>

          <div class="input-box">
            <input type="password" v-model="loginData.password" placeholder="Password" required />
            <i class="bx bxs-lock-alt"></i>
          </div>

          <div class="forgot-link">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" class="btn">Login</button>

          <p>or login with social platforms</p>
          <div class="social-icons">
            <a href="#"><i class="bx bxl-google"></i></a>
            <a href="#"><i class="bx bxl-facebook"></i></a>
            <a href="#"><i class="bx bxl-github"></i></a>
            <a href="#"><i class="bx bxl-linkedin"></i></a>
          </div>
        </form>
      </div>

      <div class="form-box register">
        <form @submit.prevent="HandleRegister">
          <h1>Registration</h1>
          <div class="input-box">
            <input type="text" placeholder="Username" required />
            <i class="bx bxs-user"></i>
          </div>
          <div class="input-box">
            <input type="email" placeholder="Email" required />
            <i class="bx bxs-envelope"></i>
          </div>
          <div class="input-box">
            <input type="password" placeholder="Password" required />
            <i class="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" class="btn">Register</button>
          <p>or register with social platforms</p>
          <div class="social-icons">
            <a href="#"><i class="bx bxl-google"></i></a>
            <a href="#"><i class="bx bxl-facebook"></i></a>
            <a href="#"><i class="bx bxl-github"></i></a>
            <a href="#"><i class="bx bxl-linkedin"></i></a>
          </div>
        </form>
      </div>

      <div class="toggle-box">
        <div class="toggle-panel toggle-left">
          <h1>Hello, Welcome!</h1>
          <p>Don't have an account?</p>
          <button class="btn" @click="isRegister = true">Register</button>
        </div>
        <div class="toggle-panel toggle-right">
          <h1>Welcome Back!</h1>
          <p>Already have an account?</p>
          <button class="btn" @click="isRegister = false">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isRegister = ref(false)

// PHẦN 1: Khai báo biến loginData để hứng dữ liệu từ v-model
const loginData = ref({
  username: '',
  password: '',
})

// PHẦN 1: Logic kiểm tra quyền và chuyển hướng
const HandleLogin = () => {
  const { username, password } = loginData.value // Phân tách biến cho gọn

  // 1. Kiểm tra tài khoản ADMIN
  if (username === 'ad' && password === '123') {
    alert('Đăng nhập ADMIN thành công!')
    router.push('/admin/dashboard')
  }

  // 2. Kiểm tra tài khoản USER cụ thể (ní mới thêm ở đây)
  else if (username === 'user' && password === '123') {
    alert('Chào mừng User quay trở lại!')
    router.push('/')
  }

  // 3. Kiểm tra Khách hàng khác (Chỉ cần không để trống)
  else if (username !== '' && password !== '') {
    alert('Đăng nhập thành công với quyền Khách hàng!')
    router.push('/')
  }

  // 4. Trường hợp để trống một trong hai ô
  else {
    alert('Vui lòng nhập đầy đủ thông tin!')
  }
}

const HandleRegister = () => {
  alert('Đăng ký thành công! Hãy đăng nhập.')
  isRegister.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
@import url('https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css');

/* THAY BODY = WRAPPER */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(90deg, #e2e2e2, #c9d6ff);
  font-family: 'Poppins', sans-serif;
}

/* --- PHONG CÁCH RYS FASHION - PHIÊN BẢN BO GÓC --- */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
  text-decoration: none;
  list-style: none;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f4f4f4;
}

.container {
  position: relative;
  width: 850px;
  height: 550px;
  background: #fff;
  margin: 20px;
  /* TRẢ LẠI BO GÓC 30PX ĐÂY NÍ */
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.container h1 {
  font-size: 28px;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 600; /* Tăng độ đậm tí cho hợp với bo góc */
  margin-bottom: 20px;
}

.container p {
  font-size: 13px;
  color: #666;
  letter-spacing: 1px;
}

form {
  width: 100%;
}

.form-box {
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  color: #000;
  text-align: center;
  padding: 40px;
  z-index: 1;
  transition:
    0.6s ease-in-out 1.2s,
    visibility 0s 1s;
}

.container.active .form-box {
  right: 50%;
}

.form-box.register {
  visibility: hidden;
}
.container.active .form-box.register {
  visibility: visible;
}

.input-box {
  position: relative;
  margin: 25px 0;
}

.input-box input {
  width: 100%;
  padding: 13px 20px;
  background: #f0f0f0; /* Hơi xám nhẹ cho hiện đại */
  /* BO GÓC CHO INPUT */
  border-radius: 10px;
  border: 1px solid transparent;
  outline: none;
  font-size: 14px;
  color: #000;
  transition: 0.3s;
}

.input-box input:focus {
  border-color: #000;
  background: #fff;
}

.input-box i {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #999;
}

.forgot-link {
  margin: -15px 0 15px;
  text-align: right;
}
.forgot-link a {
  font-size: 12px;
  color: #888;
}

/* NÚT BẤM ĐEN - TRẮNG NHƯNG BO GÓC */
.btn {
  width: 100%;
  height: 50px;
  background: #000; /* Mặc định nền đen */
  border-radius: 10px; /* Giữ bo góc 10px như bạn muốn */
  border: 1px solid #000; /* Viền đen mặc định */
  cursor: pointer;
  font-size: 13px;
  color: #fff; /* Chữ trắng mặc định */
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  transition: all 0.3s ease; /* Hiệu ứng chuyển đổi mượt mà */
  margin-top: 10px;
}

/* Hiệu ứng Hover: Nền trắng, viền đen, chữ đen */
.btn:hover {
  background: #fff !important; /* Đổi sang nền trắng khi hover */
  color: #000 !important; /* Đổi sang chữ đen để nổi bật trên nền trắng */
  border: 1px solid #000 !important; /* Hiện rõ viền đen */
}

.social-icons {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.social-icons a {
  display: inline-flex;
  padding: 10px;
  border: 1px solid #eee;
  /* BO GÓC CHO ICON MẠNG XÃ HỘI */
  border-radius: 10px;
  font-size: 20px;
  color: #000;
  margin: 0 8px;
  transition: 0.3s;
}

.social-icons a:hover {
  border-color: #000;
  background: #f9f9f9;
}

.toggle-box {
  position: absolute;
  width: 100%;
  height: 100%;
}

.toggle-box::before {
  content: '';
  position: absolute;
  left: -250%;
  width: 300%;
  height: 100%;
  background: #000;
  /* TRẢ LẠI CÁI ĐƯỜNG CONG TỔNG THỂ */
  border-radius: 150px;
  z-index: 2;
  transition: 1.8s ease-in-out;
}

.container.active .toggle-box::before {
  left: 50%;
}

.toggle-panel {
  position: absolute;
  width: 50%;
  height: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transition: 0.6s ease-in-out;
}

.toggle-panel.toggle-left {
  left: 0;
  transition-delay: 1.2s;
}
.container.active .toggle-panel.toggle-left {
  left: -50%;
  transition-delay: 0.6s;
}

.toggle-panel.toggle-right {
  right: -50%;
  transition-delay: 0.6s;
}
.container.active .toggle-panel.toggle-right {
  right: 0;
  transition-delay: 1.2s;
}

.toggle-panel p {
  margin-bottom: 20px;
}

.toggle-panel .btn {
  width: 160px;
  height: 46px;
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
}

.toggle-panel .btn:hover {
  background: #fff;
  color: #000;
}
</style>
