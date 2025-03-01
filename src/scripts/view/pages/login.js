const Login = {
    async render() {
        return `
        <main class="w-full mt-8">
            <section class="vh-100 d-flex align-items-center justify-content-center bg-light">
                <div class="container">
                    <div class="row d-flex justify-content-center align-items-center">
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
                            <form id="loginForm">
                                <!-- Email input -->
                                <div class="form-outline mb-4">
                                    <input type="email" id="email" class="form-control form-control-lg" placeholder="Masukkan email" required />
                                    <label class="form-label" for="email">Email</label>
                                </div>
                                
                                <!-- Password input -->
                                <div class="form-outline mb-3">
                                    <input type="password" id="password" class="form-control form-control-lg" placeholder="Masukkan password" required />
                                    <label class="form-label" for="password">Password</label>
                                </div>
                                
                                <div class="text-center text-lg-start mt-4 pt-2">
                                    <button type="submit" class="btn btn-primary btn-lg" style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
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
        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah reload halaman

            // Contoh validasi login (bisa diganti dengan API authentication)
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email === "admin@example.com" && password === "123456") {
                alert("Login Berhasil!");

                // Simpan status login di localStorage
                localStorage.setItem("isLoggedIn", "true");

                // Arahkan ke Dashboard
                window.location.href = "/#/dashboard";
            } else {
                alert("Email atau Password salah!");
            }
        });
    }
};

export default Login;
