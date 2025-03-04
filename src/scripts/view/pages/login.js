const Login = {
  async render() {
    return `
      <div class="login-wrapper">
        <img src="./Mask-group.png" alt="Logo" class="login-logo"></img>
        <div class="login-container">
          <div class="login-form">
            <h2 class="log">Masuk</h2>
            <form id="login-form">
              <div class="form-group">
                <input type="text" id="username" name="username" required placeholder="Username" />
              </div>
              <div class="form-group">
                <input type="password" id="password" name="password" required placeholder="Password" />
              </div>
              <button type="submit" class="log">Masuk</button>
            </form>
            <div class="register-link">
              <p>Belum punya akun? <a href="#/register">DAFTAR DISINI</a></p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Ambil data dari form
      let username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Hapus simbol "@" jika ada dalam username
      username = username.replace('@', '');

      // Kirim request POST ke backend API untuk login
      try {
        const response = await fetch('http://localhost:3000/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // Jika login berhasil, simpan token dan arahkan ke halaman beranda
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('accessToken', data.accessToken); // Menyimpan token akses
          window.location.href = '#/beranda';
        } else {
          // Jika login gagal, tampilkan pesan error
          alert(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Something went wrong. Please try again later.');
      }
    });
  },
};

export default Login;
