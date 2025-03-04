const Register = {
  async render() {
    return `
      <div class="register-wrapper">
        <img src="./Mask-group.png" alt="Logo" class="register-logo"></img>
        <div class="register-container">
          <div class="register-form">
            <h2 class="log">Daftar</h2>
            <form id="register-form">
              <div class="form-group">
                <input type="text" id="username" name="username" required placeholder="Username">
              </div>
              <div class="form-group">
                <input type="email" id="email" name="email" required placeholder="Email">
              </div>
              <div class="form-group">
                <input type="password" id="password" name="password" required placeholder="Password">
              </div>
              <button type="submit" class="log">Daftar</button>
            </form>
            <div class="login-link">
              <p>Sudah punya akun? <a href="#/login">MASUK DISINI</a></p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        // Kirim data ke API backend
        const response = await fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        const result = await response.json();

        if (response.ok) {
          // Jika berhasil, arahkan ke halaman login dan tampilkan alert
          localStorage.setItem('isLoggedIn', 'true');
          alert('Registrasi berhasil! Silakan login.');
          window.location.href = '#/login';
        } else {
          // Jika gagal, tampilkan pesan error dari server
          alert(result.message || 'Registrasi gagal. Silakan coba lagi.');
        }
      } catch (error) {
        console.error('Error during registration:', error);
        // Menangani error jaringan atau server
        alert('Terjadi kesalahan saat pendaftaran. Silakan coba lagi.');
      }
    });
  }
};

export default Register;
