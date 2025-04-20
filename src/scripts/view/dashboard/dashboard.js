import MenuDashboard from '.././menu/menu_dashboard';

const Dashboard = {
    async render() {
        const userRole = localStorage.getItem("userRole");
        let welcomeMessage = 'Selamat Datang';
        let alertMessage = '';

        if (userRole === "admin") {
            welcomeMessage = 'Dashboard Admin';
            alertMessage = '<div id="loginAlert" class="alert alert-success" role="alert">Anda berhasil login sebagai Admin!</div>';
        } else if (userRole === "kepalasekolah") {
            welcomeMessage = 'Dashboard Kepala Sekolah';
            alertMessage = '<div id="loginAlert" class="alert alert-success" role="alert">Anda berhasil login sebagai Kepala Sekolah!</div>';
        }

        return `
            <div class="dashboard-container bg-gray-100 min-h-screen flex">
                ${MenuDashboard.render()}
                <div class="dashboard-main flex-1 p-8">
                    <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                        <h2 class="text-2xl font-bold text-gray-800">${welcomeMessage}</h2>
                        <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                    </header>

                    <main class="bg-white shadow-lg rounded-lg p-6">
                        <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Selamat Datang di ${welcomeMessage}</h1>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div class="bg-green-500 text-white rounded-lg shadow-md p-6 flex flex-col justify-between">
                                <div>
                                    <div class="text-3xl font-bold">Absensi</div>
                                    <div class="text-sm mt-1">Kehadiran Kelas</div>
                                </div>
                                <div class="flex justify-end items-center">
                                    <button id="absensiButton" class="bg-white text-green-500 px-4 py-2 rounded hover:bg-green-100 transition">Detail</button>
                                </div>
                            </div>

                            <div class="bg-yellow-500 text-white rounded-lg shadow-md p-6 flex flex-col justify-between">
                                <div>
                                    <div class="text-3xl font-bold">Nilai</div>
                                    <div class="text-sm mt-1">Penilaian Kelas</div>
                                </div>
                                <div class="flex justify-end items-center">
                                    <button id="nilaiButton" class="bg-white text-yellow-500 px-4 py-2 rounded hover:bg-yellow-100 transition">Detail</button>
                                </div>
                            </div>

                            <div class="bg-teal-500 text-white rounded-lg shadow-md p-6 flex flex-col justify-between">
                                <div>
                                    <div class="text-3xl font-bold">Profil</div>
                                    <div class="text-sm mt-1">Profil Saya</div>
                                </div>
                                <div class="flex justify-end items-center">
                                    <button id="profilButton" class="bg-white text-teal-500 px-4 py-2 rounded hover:bg-teal-100 transition">Detail</button>
                                </div>
                            </div>

                            <div class="bg-purple-500 text-white rounded-lg shadow-md p-6 flex flex-col justify-between">
                                <div>
                                    <div class="text-3xl font-bold">Feedback</div>
                                    <div class="text-sm mt-1">Kritik dan Saran</div>
                                </div>
                                <div class="flex justify-end items-center">
                                    <button id="feedbackButton" class="bg-white text-purple-500 px-4 py-2 rounded hover:bg-purple-100 transition">Detail</button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            ${alertMessage}
        `;
    },

    async afterRender() {
        MenuDashboard.afterRender();

        document.querySelector('.bg-red-500').addEventListener('click', () => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userRole");
            window.location.hash = '/';
        });

        document.getElementById('absensiButton').addEventListener('click', () => {
            window.location.hash = '/absensi1';
        });

        document.getElementById('nilaiButton').addEventListener('click', () => {
            window.location.hash = '/kelola_nilai';
        });

        document.getElementById('profilButton').addEventListener('click', () => {
            window.location.hash = '/dashboard_akun';
        });

        document.getElementById('feedbackButton').addEventListener('click', () => {
            window.location.hash = '/feedback';
        });

        const loginAlert = document.getElementById('loginAlert');
        if (loginAlert) {
            setTimeout(() => {
                loginAlert.remove();
            }, 1000);
        }
    }
};

export default Dashboard;