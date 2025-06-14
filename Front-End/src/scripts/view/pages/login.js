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
                            <form id="loginForm">
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
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent page reload

            const email = emailInput.value;
            const password = passwordInput.value;

            try {
                // Log request details for debugging
                console.log('Attempting login with:', { email, password });

                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                // Log the raw response status and text
                console.log('Server response status:', response.status);
                console.log('Server response status text:', response.statusText);

                // Try to parse JSON only if the response is valid JSON
                let data;
                try {
                    // Clone the response so it can be read twice (once as text, once as json) if needed
                    // Or, more simply, just read as text first to avoid JSON parsing errors
                    const responseText = await response.text();
                    console.log('Server response body (raw text):', responseText);
                    data = JSON.parse(responseText); // Manually parse the text
                } catch (jsonError) {
                    console.error('Error parsing JSON response:', jsonError);
                    alert("Terjadi kesalahan pada respons server. Silakan coba lagi.");
                    return; // Exit if response isn't valid JSON
                }

                if (response.ok) {
                    // Login successful (HTTP status 200-299)
                    console.log('Login successful. User data:', data.user);
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("userRole", data.user.role);
                    localStorage.setItem("username", data.user.nama);
                    localStorage.setItem("email", data.user.email);
                    
                    if (data.user.fotoProfil) {
                        localStorage.setItem("fotoProfil", data.user.fotoProfil);
                    } else {
                        localStorage.removeItem("fotoProfil");
                    }
                    localStorage.setItem("justLoggedIn", "true");

                    // Redirect based on role
                    switch (data.user.role) {
                        case "admin":
                            window.location.href = "/#/dashboard";
                            break;
                        case "kepala_sekolah":
                            window.location.href = "/#/dashboard_kepsek";
                            break;
                        case "wali_kelas_1":
                        case "wali_kelas_2":
                        case "wali_kelas_3":
                        case "wali_kelas_4":
                        case "wali_kelas_5":
                        case "wali_kelas_6":
                            window.location.href = "/#/dashboard_walikelas";
                            break;
                        default:
                            window.location.href = "/#/dashboard"; // Fallback
                            break;
                    }
                } else {
                    // Login failed (HTTP status 4xx, 5xx)
                    console.error('Login failed. Server message:', data.message || 'No message provided.');
                    alert(data.message || "Login gagal. Silakan periksa kredensial Anda.");
                }
            } catch (error) {
                console.error('Error during login fetch:', error);
                alert("Terjadi kesalahan saat berkomunikasi dengan server. Silakan coba lagi.");
            }
        });
    }
};

export default Login;