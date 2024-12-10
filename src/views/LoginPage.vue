<template>
    <div class="login-page">
      <div class="login-card">
        <h1>Smartmall.uz</h1>
        <p class="subtitle">Admin sahifaga o'tish uchun kirish</p>
        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label for="username">Login</label>
            <input type="text" id="username" v-model="username" placeholder="Login kiriting" required />
          </div>
          <div class="form-group">
            <label for="password">Parol</label>
            <input type="password" id="password" v-model="password" placeholder="Parol kiriting" required />
          </div>
          <button type="submit" class="login-button">Login</button>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
        error: "",
      };
    },
    methods: {
      login() {
        const validUsername = "admin";
        const validPassword = "admin"; // Replace with your own credentials
  
        if (this.username === validUsername && this.password === validPassword) {
          localStorage.setItem("isAuthenticated", "true");
          this.$router.push("/admin"); // Navigate to admin page
        } else {
          this.error = "Invalid username or password!";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* General Page Styles */
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #6db3f2, #1e69d2);
    padding: 20px;
  }
  
  /* Login Card */
  .login-card {
    background: white;
    width: 100%;
    max-width: 400px;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  .login-card h1 {
    margin-bottom: 10px;
    font-size: 24px;
    color: #333;
  }
  
  .login-card .subtitle {
    font-size: 14px;
    color: #777;
    margin-bottom: 20px;
  }
  
  /* Form Styles */
  .login-form .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  .login-form label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #555;
    margin-bottom: 5px;
  }
  
  .login-form input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease;
  }
  
  .login-form input:focus {
    outline: none;
    border-color: #086c08;
    box-shadow: 0 0 3px rgba(8, 108, 8, 0.2);
  }
  
  /* Button Styles */
  .login-button {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #086c08;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .login-button:hover {
    background-color: #065c06;
  }
  
  /* Error Message */
  .error {
    margin-top: 15px;
    font-size: 14px;
    color: red;
    font-weight: 600;
  }
  
  /* Responsive Design */
  @media (max-width: 480px) {
    .login-card {
      padding: 20px;
    }
  }
  </style>
  