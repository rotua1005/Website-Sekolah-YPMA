// components/login.js
const Login = {
    async render() {
        return `
        <main class="w-full mt-8">
            <section class="vh-100 d-flex align-items-center justify-content-center bg-light">
                <div class="container">
                    <div class="row d-flex justify-content-center align-items-center mt-4">
                        <div class="col-md-10 col-lg-8 col-xl-6 text-center mb-4">
                            <h1 class="fw-bold text-primary">Selamat Datang</h1>
                            <h3 class="text-success">Sekolah Yayasan Pesantren YPMA</h3>
                            <p class="text-muted">Silakan login untuk mengakses akun Anda</p>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center align-items-center">
                        <div class="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                 class="img-fluid" alt="Sample image">
                        </div>
                        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <div class="mb-3">
                                <button id="loginAdminBtn" class="btn btn-primary btn-lg w-100">Login Sebagai Admin</button>
                            </div>
                            <div class="mb-3">
                                <button id="loginKepalaSekolahBtn" class="btn btn-success btn-lg w-100">Login Sebagai Kepala Sekolah</button>
                            </div>
                            <hr class="my-4">
                            <form id="loginForm" style="display:none;">
                                <div class="form-outline mb-4">
                                    <input type="email" id="email" class="form-control form-control-lg" placeholder="Masukkan email" required />
                                    <label class="form-label" for="email">Email</label>
                                </div>

                                <div class="form-outline mb-3">
                                    <input type="password" id="password" class="form-control form-control-lg" placeholder="Masukkan password" required />
                                    <label class="form-label" for="password">Password</label>
                                </div>

                                <div class="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" class="btn btn-primary btn-lg w-100" style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        `;
    },

    async afterRender() {
        const loginForm = document.getElementById('loginForm');
        const loginAdminBtn = document.getElementById('loginAdminBtn');
        const loginKepalaSekolahBtn = document.getElementById('loginKepalaSekolahBtn');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        loginAdminBtn.addEventListener('click', () => {
            emailInput.value = "admin@ypma.sch.id";
            passwordInput.value = "admin123";
            loginForm.style.display = 'block';
        });

        loginKepalaSekolahBtn.addEventListener('click', () => {
            emailInput.value = "kepsek@ypma.sch.id";
            passwordInput.value = "kepsek456";
            loginForm.style.display = 'block';
        });

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah reload halaman

            const email = emailInput.value;
            const password = passwordInput.value;

            if (email === "admin@ypma.sch.id" && password === "admin123") {
                alert("Login berhasil sebagai Admin!");
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userRole", "admin"); // Simpan peran pengguna
                localStorage.setItem("username", "Administrator"); // Simpan username
                localStorage.setItem("email", email); // Simpan email
                window.location.href = "/#/dashboard";
            } else if (email === "kepsek@ypma.sch.id" && password === "kepsek456") {
                alert("Login berhasil sebagai Kepala Sekolah!");
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userRole", "kepalasekolah"); // Simpan peran pengguna
                localStorage.setItem("username", "Kepala Sekolah"); // Simpan username
                localStorage.setItem("email", email); // Simpan email
                window.location.href = "/#/dashboard";
            } else {
                alert("Email atau Password salah!");
            }
        });
    }
};

export default Login;