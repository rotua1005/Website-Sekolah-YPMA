const Login = {
    async render() {
        return `
        <main class="w-full mt-8">
            <section class="d-flex align-items-center justify-content-center min-vh-100 login-page-white-bg">
                <div class="container">
                    <div class="row d-flex justify-content-center align-items-center">
                        <div class="col-md-10 col-lg-8 col-xl-6 text-center mb-4 pt-5">
                            <h1 class="fw-bold text-primary">Selamat Datang</h1>
                            <h3 class="text-success">Sekolah Yayasan Pesantren YPMA</h3>
                            <p class="text-muted mb-4">Silakan login untuk melanjutkan.</p>
                        </div>
                    </div>
                    <div class="row d-flex justify-content-center align-items-center flex-column flex-lg-row">
                        <div class="col-12 col-md-8 col-lg-6 col-xl-5 mb-4 mb-lg-0 order-lg-1 image-column">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                class="img-fluid rounded shadow-sm login-image" alt="Sample image for login page">
                        </div>
                        <div class="col-12 col-md-8 col-lg-6 col-xl-5 offset-xl-1 order-lg-0 form-column">
                            <div class="card p-4 shadow-lg border-0 login-card-wider">
                                <div class="card-body">
                                    <h2 class="fw-bold text-center mb-4 login-title" id="formTitle">Login</h2>

                                    <div id="authMessageArea" class="mb-3"></div>

                                    <form id="loginForm" class="auth-form mb-4">
                                        <div class="mb-3 d-grid gap-2">
                                            <button id="loginAdminBtn" type="button" class="btn btn-primary btn-sm mb-2 custom-btn-width">Login Sebagai Admin</button>
                                            <button id="loginKepalaSekolahBtn" type="button" class="btn btn-success btn-sm custom-btn-width">Login Sebagai Kepala Sekolah</button>
                                        </div>
                                        <hr class="my-4">
                                        <div class="form-floating mb-4">
                                            <input type="email" id="loginEmail" name="email" class="form-control form-control-lg" placeholder=" " required />
                                            <label for="loginEmail">Email</label>
                                        </div>
                                        <div class="form-floating mb-4">
                                            <input type="password" id="loginPassword" name="password" class="form-control form-control-lg" placeholder=" " required />
                                            <label for="loginPassword">Password</label>
                                        </div>
                                        <div class="d-grid">
                                            <button type="submit" class="btn btn-primary btn-lg">Login</button>
                                        </div>
                                        <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                                            <a href="#" id="linkToRegister" class="link-secondary small text-decoration-none my-1">Belum punya akun? Daftar</a>
                                            <a href="#" id="linkToForgotPassword" class="link-warning small text-decoration-none my-1">Lupa Password?</a>
                                        </div>
                                    </form>

                                    <form id="registerForm" class="auth-form" style="display:none;">
                                        <div class="form-floating mb-4">
                                            <input type="text" id="registerUsername" name="username" class="form-control form-control-lg" placeholder=" " required />
                                            <label for="registerUsername">Nama Lengkap</label>
                                        </div>
                                        <div class="form-floating mb-4">
                                            <input type="email" id="registerEmail" name="email" class="form-control form-control-lg" placeholder=" " required />
                                            <label for="registerEmail">Email</label>
                                        </div>
                                        <div class="form-floating mb-4">
                                            <input type="password" id="registerPassword" name="password" class="form-control form-control-lg" placeholder=" " required />
                                            <label for="registerPassword">Password</label>
                                        </div>
                                        <div class="form-floating mb-4">
                                            <select id="registerRole" name="role" class="form-select form-control-lg" required>
                                                <option value="">Pilih Peran</option>
                                                <option value="admin">Admin</option>
                                                <option value="kepalasekolah">Kepala Sekolah</option>
                                            </select>
                                            <label for="registerRole">Peran</label>
                                        </div>
                                        <div class="d-grid">
                                            <button type="submit" class="btn btn-secondary btn-lg">Daftar</button>
                                        </div>
                                        <p class="small fw-bold mt-3 mb-0 text-center">Sudah punya akun? <a href="#" id="linkToLoginFromRegister" class="link-primary text-decoration-none">Login di sini</a></p>
                                    </form>

                                    <form id="forgotPasswordForm" class="auth-form" style="display:none;">
                                        <p class="text-muted mb-4">Masukkan email Anda dan kami akan mengirimkan kode OTP untuk mengatur ulang password Anda.</p>
                                        <div class="form-floating mb-4">
                                            <input type="email" id="forgotPasswordEmail" name="email" class="form-control form-control-lg" placeholder=" " required />
                                            <label for="forgotPasswordEmail">Email</label>
                                        </div>
                                        <div class="d-grid mb-3">
                                            <button type="submit" class="btn btn-warning btn-lg">Kirim Kode OTP</button>
                                        </div>
                                        <div id="otpInputSection" style="display:none;">
                                            <hr class="my-4">
                                            <p class="text-muted mb-3">Masukkan kode OTP yang Anda terima dan password baru.</p>
                                            <div class="form-floating mb-4">
                                                <input type="text" id="otpCode" name="otpCode" class="form-control form-control-lg" placeholder=" " required />
                                                <label for="otpCode">Kode OTP</label>
                                            </div>
                                            <div class="form-floating mb-4">
                                                <input type="password" id="newPassword" name="newPassword" class="form-control form-control-lg" placeholder=" " required />
                                                <label for="newPassword">Password Baru</label>
                                            </div>
                                            <div class="d-grid">
                                                <button type="button" id="resetPasswordBtn" class="btn btn-danger btn-lg">Atur Ulang Password</button>
                                            </div>
                                        </div>
                                        <p class="small fw-bold mt-3 mb-0 text-center">Kembali ke <a href="#" id="linkToLoginFromForgotPassword" class="link-primary text-decoration-none">Login</a></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        <style>
            /* Custom styles for the login page */
            .login-page-white-bg {
                background-color: #ffffff; /* Pure white background */
                min-height: 100vh; /* Ensure full viewport height */
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .login-card-wider {
                border-radius: 15px; /* Rounded corners */
                background-color: rgba(255, 255, 255, 0.98); /* Slightly transparent white for a modern feel */
                backdrop-filter: blur(5px); /* Optional: subtle blur effect */
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* Lighter shadow for a clean look */
                padding: 2rem; /* Increased padding inside the card */
                width: 100%; /* Ensure card takes full available width in its column */
                max-width: 500px; /* Max width for the form card to prevent it from getting too wide */
                margin: auto; /* Center the card in its column */
            }

            .login-title {
                font-weight: 700;
                color: #333;
            }

            /* Form outline specific adjustments for MDBootstrap if used */
            .form-outline .form-control ~ .form-label {
                padding: 0.75rem 1rem; /* Adjust padding for label when using form-floating */
                font-size: 1.1rem;
            }
            .form-outline .form-control:focus ~ .form-label,
            .form-outline .form-control:not(:placeholder-shown) ~ .form-label {
                transform: translateY(-1.25rem) scale(0.85);
                opacity: 0.8;
            }

            .form-control-lg {
                padding: 0.85rem 1.25rem; /* Larger padding for input fields */
                font-size: 1.1rem;
                border-radius: 8px; /* Rounded input fields */
            }

            .btn-lg {
                padding: 0.9rem 1.5rem; /* Larger padding for buttons */
                font-size: 1.1rem;
                border-radius: 8px; /* Rounded buttons */
                font-weight: 600;
            }

            .btn-sm {
                padding: 0.6rem 1rem;
                font-size: 0.9rem;
                border-radius: 6px;
            }

            .custom-btn-width {
                width: 100%; /* Ensure buttons take full width */
            }

            .link-secondary, .link-warning, .link-primary {
                font-weight: 500;
                transition: color 0.2s ease-in-out;
            }

            .link-secondary:hover {
                color: #555 !important;
            }
            .link-warning:hover {
                color: #d89e00 !important;
            }
            .link-primary:hover {
                color: #0056b3 !important;
            }

            .login-image {
                object-fit: contain; /* Ensures the image fits within its container without cropping */
                max-height: 400px; /* Limit image height to prevent it from being too tall */
                width: 100%; /* Ensure it takes full width of its column */
            }

            /* Responsive adjustments */
            @media (max-width: 991px) { /* Adjust for medium and smaller screens (lg breakpoint) */
                .image-column {
                    order: 0 !important; /* Image on top for smaller screens */
                    margin-bottom: 2rem !important; /* Add space below image */
                }
                .form-column {
                    order: 1 !important; /* Form below image for smaller screens */
                }
                .login-card-wider {
                    padding: 1.5rem; /* Reduce padding on smaller screens */
                }
                   .login-image {
                    max-height: 300px; /* Smaller max-height for images on smaller screens */
                }
            }

            @media (min-width: 992px) { /* For large screens and up */
                .form-column {
                    /* Adjust column widths to make form wider and image fit better */
                    flex: 0 0 auto;
                    width: 45%; /* Make form column wider */
                    max-width: 500px; /* Optional: limit max width of the form */
                    margin-left: 5%; /* Add some spacing between image and form */
                    margin-right: auto;
                }
                .image-column {
                    flex: 0 0 auto;
                    width: 45%; /* Adjust image column width */
                    max-width: 500px; /* Optional: limit max width of the image */
                }
                .row.d-flex.justify-content-center.align-items-center {
                    /* Ensure containers align properly */
                    max-width: 1200px; /* Limit max width of the row for better visual balance */
                    margin: 0 auto;
                }
            }
            /* Flex-wrap for small screens on links */
            .d-flex.justify-content-between.align-items-center.mt-3 {
                flex-wrap: wrap;
            }
            .d-flex.justify-content-between.align-items-center.mt-3 a {
                margin-bottom: 0.5rem; /* Space out links when wrapped */
            }

        </style>
        `;
    },

    async afterRender() {
        // Form Elements
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const forgotPasswordForm = document.getElementById('forgotPasswordForm');
        const formTitle = document.getElementById('formTitle');
        const authMessageArea = document.getElementById('authMessageArea');
        const otpInputSection = document.getElementById('otpInputSection');

        // Login Form Inputs
        const loginEmailInput = document.getElementById('loginEmail');
        const loginPasswordInput = document.getElementById('loginPassword');

        // Register Form Inputs
        const registerUsernameInput = document.getElementById('registerUsername');
        const registerEmailInput = document.getElementById('registerEmail');
        const registerPasswordInput = document.getElementById('registerPassword');
        const registerRoleSelect = document.getElementById('registerRole');

        // Forgot Password Inputs
        const forgotPasswordEmailInput = document.getElementById('forgotPasswordEmail');
        const otpCodeInput = document.getElementById('otpCode');
        const newPasswordInput = document.getElementById('newPassword');
        const resetPasswordBtn = document.getElementById('resetPasswordBtn');


        // Demo Login Buttons
        const loginAdminBtn = document.getElementById('loginAdminBtn');
        const loginKepalaSekolahBtn = document.getElementById('loginKepalaSekolahBtn');

        // Links to switch forms
        const linkToRegister = document.getElementById('linkToRegister');
        const linkToForgotPassword = document.getElementById('linkToForgotPassword');
        const linkToLoginFromRegister = document.getElementById('linkToLoginFromRegister');
        const linkToLoginFromForgotPassword = document.getElementById('linkToLoginFromForgotPassword');

        const BASE_URL = 'http://localhost:5000/api'; // Your backend API base URL

        // --- Helper function to display a specific form ---
        const showForm = (formToShow, title) => {
            document.querySelectorAll('.auth-form').forEach(form => {
                form.style.display = 'none';
            });
            formToShow.style.display = 'block';
            formTitle.textContent = title; // Update the title based on the active form
            authMessageArea.innerHTML = ''; // Clear previous messages
            if (formToShow !== forgotPasswordForm) {
                otpInputSection.style.display = 'none'; // Hide OTP section when not on forgot password form
            }
        };

        // --- Helper function to display messages ---
        const displayMessage = (message, type = 'success') => {
            authMessageArea.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        };

        // --- Event Listeners for Switching Forms ---
        linkToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            showForm(registerForm, 'Daftar Akun Baru');
        });

        linkToForgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            showForm(forgotPasswordForm, 'Lupa Password');
        });

        linkToLoginFromRegister.addEventListener('click', (e) => {
            e.preventDefault();
            showForm(loginForm, 'Login');
        });

        linkToLoginFromForgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            showForm(loginForm, 'Login');
        });

        // --- Demo Login Buttons ---
        loginAdminBtn.addEventListener('click', () => {
            loginEmailInput.value = "admin@ypma.sch.id";
            loginPasswordInput.value = "admin123";
            displayMessage('Email dan password admin telah diisi.', 'info');
        });

        loginKepalaSekolahBtn.addEventListener('click', () => {
            loginEmailInput.value = "kepsek@ypma.sch.id";
            loginPasswordInput.value = "kepsek456";
            displayMessage('Email dan password kepala sekolah telah diisi.', 'info');
        });

        // --- Login Form Submission ---
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent page reload

            const email = loginEmailInput.value;
            const password = loginPasswordInput.value;

            try {
                const response = await fetch(`${BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    displayMessage(data.message, 'success');
                    localStorage.setItem("authToken", data.token);
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("userRole", data.user.role);
                    localStorage.setItem("username", data.user.username);
                    localStorage.setItem("email", data.user.email);

                    // Redirect based on role
                    if (data.user.role === "admin") {
                        window.location.href = "/#/dashboard";
                    } else if (data.user.role === "kepalasekolah") {
                        window.location.href = "/#/dashboard_kepsek";
                    } else {
                        window.location.href = "/#/"; // Default redirect for other roles
                    }
                } else {
                    displayMessage(data.message || "Login gagal. Silakan coba lagi.", 'danger');
                }
            } catch (error) {
                console.error("Error during login:", error);
                displayMessage("Terjadi kesalahan jaringan atau server tidak merespon.", 'danger');
            }
        });

        // --- Register Form Submission ---
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const username = registerUsernameInput.value;
            const email = registerEmailInput.value;
            const password = registerPasswordInput.value;
            const role = registerRoleSelect.value;

            try {
                const response = await fetch(`${BASE_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password, role }),
                });

                const data = await response.json();

                if (response.ok) {
                    displayMessage(data.message + "\nSilakan login dengan akun Anda.", 'success');
                    showForm(loginForm, 'Login'); // Show login form after successful registration
                    loginEmailInput.value = email; // Pre-fill email for convenience
                } else {
                    displayMessage(data.message || "Pendaftaran gagal. Silakan coba lagi.", 'danger');
                }
            } catch (error) {
                console.error("Error during registration:", error);
                displayMessage("Terjadi kesalahan jaringan atau server tidak merespon.", 'danger');
            }
        });

        // --- Forgot Password Form Submission (Step 1: Request OTP) ---
        forgotPasswordForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const email = forgotPasswordEmailInput.value;

            try {
                const response = await fetch(`${BASE_URL}/forgot-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    displayMessage(data.message, 'success');
                    otpInputSection.style.display = 'block'; // Show OTP input and new password fields
                    otpCodeInput.focus(); // Focus the OTP input field to avoid the warning
                } else {
                    displayMessage(data.message || "Gagal mengirim kode OTP. Silakan coba lagi.", 'danger');
                }
            } catch (error) {
                console.error("Error during forgot password request:", error);
                displayMessage("Terjadi kesalahan jaringan atau server tidak merespon.", 'danger');
            }
        });

        // --- Reset Password Button (Step 2: Verify OTP and Reset Password) ---
        resetPasswordBtn.addEventListener('click', async () => {
            const email = forgotPasswordEmailInput.value;
            const otp = otpCodeInput.value;
            const newPassword = newPasswordInput.value;

            if (!email || !otp || !newPassword) {
                displayMessage("Harap lengkapi semua field (Email, OTP, dan Password Baru).", 'warning');
                return;
            }

            try {
                const response = await fetch(`${BASE_URL}/reset-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, otp, newPassword }),
                });

                const data = await response.json();

                if (response.ok) {
                    displayMessage(data.message + "\nAnda dapat login sekarang.", 'success');
                    showForm(loginForm, 'Login'); // Go back to login form
                    loginEmailInput.value = email; // Pre-fill email
                } else {
                    displayMessage(data.message || "Gagal mengatur ulang password. Silakan coba lagi.", 'danger');
                }
            } catch (error) {
                console.error("Error during reset password request:", error);
                displayMessage("Terjadi kesalahan jaringan atau server tidak merespon.", 'danger');
            }
        });
    }
};

export default Login;