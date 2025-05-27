// dashboard_walikelas.js
import MenuWaliKelas from '../menu/menu_walikelas'; // Assuming a separate menu for Wali Kelas

const DashboardWaliKelas = {
    async render() {
        const userRole = localStorage.getItem("userRole"); // Contoh: "wali_kelas_1"
        const username = localStorage.getItem("username") || "Wali Kelas"; // Ambil username yang tersimpan
        let welcomeMessage = `Selamat Datang di Dashboard ${username}`;

        // Ekstrak nomor kelas dari userRole jika role adalah wali_kelas
        let classAssigned = '';
        if (userRole && userRole.startsWith("wali_kelas_")) {
            classAssigned = userRole.split("_")[2]; // Akan mendapatkan "1", "2", dst.
            welcomeMessage = `Selamat Datang di Dashboard Wali Kelas ${classAssigned}`;
        }

        // Tampilan alert hanya jika login berhasil
        let alertMessage = '';
        const isLoggedIn = localStorage.getItem("isLoggedIn"); // Cek status login
        if (isLoggedIn === "true" && localStorage.getItem("justLoggedIn") === "true") {
            alertMessage = `
                <div id="loginAlert" style="background-color: #d4edda; border-color: #c3e6cb; color: #155724; padding: 0.75rem 1.25rem; border: 1px solid transparent; border-radius: 0.25rem; position: fixed; bottom: 1rem; right: 1rem; z-index: 1000;" role="alert">
                    <strong style="font-weight: bold;">Berhasil!</strong>
                    <span style="display: inline;">Anda berhasil login sebagai ${username}.</span>
                </div>`;
            // Tidak menghapus justLoggedIn di sini, akan dihapus di afterRender agar alert sempat terlihat
        }

        const cardStyle = `
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        `;

        const cardTitleStyle = `
            font-size: 1.5rem;
            font-weight: bold;
            color: #374151;
            margin-bottom: 0.5rem;
        `;

        const cardSubtitleStyle = `
            font-size: 0.875rem;
            color: #6b7280;
            margin-top: 0.25rem;
        `;

        const detailButtonStyle = `
            background-color: #f9fafb;
            color: #374151;
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            transition: background-color 0.15s ease-in-out;
            cursor: pointer;
            border: 1px solid #e5e7eb;
            font-size: 0.875rem;
        `;

        const detailButtonContainerStyle = `
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 1rem;
        `;

        return `
            <div class="dashboard-container" style="background-color: #f3f4f6; min-height: 100vh; display: flex;">
                ${MenuWaliKelas.render()}
                <div class="dashboard-main" style="flex: 1; padding: 1rem;">
                    <header style="background-color: white; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); border-radius: 0.5rem; padding: 1rem; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h2 style="font-size: 1.5rem; font-weight: bold; color: #374151;">${welcomeMessage}</h2>
                        <button id="logoutButton" style="background-color: #dc2626; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; transition: background-color 0.15s ease-in-out; cursor: pointer; border: none;">Logout</button>
                    </header>

                    <main style="background-color: white; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); border-radius: 0.5rem; padding: 1rem;">
                        <h1 style="font-size: 1.875rem; font-weight: bold; text-align: center; color: #374151; margin-bottom: 1.5rem;">${welcomeMessage}</h1>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                            <div style="${cardStyle}; background-color: #f0fdf4; border-left: 4px solid #86efac;">
                                <div>
                                    <div style="${cardTitleStyle}">Absensi Siswa</div>
                                    <div style="${cardSubtitleStyle}">Kelola Kehadiran Siswa Kelas ${classAssigned}</div>
                                </div>
                                <div style="${detailButtonContainerStyle}">
                                    <button id="absensiButton" style="${detailButtonStyle}; color: #16a344; background-color: #ecfccb;">Detail</button>
                                </div>
                            </div>

                            <div style="${cardStyle}; background-color: #eff6ff; border-left: 4px solid #3b82f6;">
                                <div>
                                    <div style="${cardTitleStyle}">Data Siswa</div>
                                    <div style="${cardSubtitleStyle}">Lihat & Kelola Data Siswa Kelas ${classAssigned}</div>
                                </div>
                                <div style="${detailButtonContainerStyle}">
                                    <button id="dataSiswaButton" style="${detailButtonStyle}; color: #2563eb; background-color: #dbeafe;">Detail</button>
                                </div>
                            </div>

                            <div style="${cardStyle}; background-color: #fdf2f8; border-left: 4px solid #e879f9;">
                                <div>
                                    <div style="${cardTitleStyle}">Akun</div>
                                    <div style="${cardSubtitleStyle}">Kelola Profil Anda</div>
                                </div>
                                <div style="${detailButtonContainerStyle}">
                                    <button id="profilButton" style="${detailButtonStyle}; color: #d946ef; background-color: #fce7f3;">Detail</button>
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
        MenuWaliKelas.afterRender();

        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userRole");
                localStorage.removeItem("username");
                localStorage.removeItem("email");
                localStorage.removeItem("justLoggedIn");
                localStorage.removeItem("waliKelasLoggedIn"); // Clear wali kelas specific login
                window.location.hash = '/';
            });
        }

        const classAssigned = localStorage.getItem("userRole")?.split("_")[2] || ''; // Ambil kelas yang diampu

        const absensiButton = document.getElementById('absensiButton');
        if (absensiButton) {
            absensiButton.addEventListener('click', () => {
                // This navigation path now matches the dynamic route in your router
                window.location.hash = `/absensi_walikelas/${classAssigned}`;
            });
        }

        const dataSiswaButton = document.getElementById('dataSiswaButton');
        if (dataSiswaButton) {
            dataSiswaButton.addEventListener('click', () => {
                // This navigation path now matches the dynamic route in your router
                window.location.hash = `/data_siswa_walikelas/${classAssigned}`;
            });
        }

        const profilButton = document.getElementById('profilButton');
        if (profilButton) {
            profilButton.addEventListener('click', () => {
                window.location.hash = '/dashboard_akun_walikelas';
            });
        }

        const loginAlert = document.getElementById('loginAlert');
        if (loginAlert) {
            setTimeout(() => {
                loginAlert.remove();
                localStorage.removeItem("justLoggedIn");
            }, 3000);
        }
    }
};

export default DashboardWaliKelas;