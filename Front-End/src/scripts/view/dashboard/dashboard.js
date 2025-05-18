import MenuDashboard from '.././menu/menu_dashboard';

const Dashboard = {
    async render() {
        const userRole = localStorage.getItem("userRole");
        let welcomeMessage = 'Selamat Datang';
        let alertMessage = '';

        if (userRole === "admin") {
            welcomeMessage = 'Dashboard Admin';
            alertMessage = '<div id="loginAlert" style="background-color: #d4edda; border-color: #c3e6cb; color: #155724; padding: 0.75rem 1.25rem; border: 1px solid transparent; border-radius: 0.25rem; position: relative; margin-bottom: 1rem;" role="alert">' +
                                    '<strong style="font-weight: bold;">Berhasil!</strong>' +
                                    '<span style="display: inline;">Anda berhasil login sebagai Admin!</span>' +
                                '</div>';
        } else if (userRole === "kepalasekolah") {
            welcomeMessage = 'Dashboard Kepala Sekolah';
            alertMessage = '<div id="loginAlert" style="background-color: #d4edda; border-color: #c3e6cb; color: #155724; padding: 0.75rem 1.25rem; border: 1px solid transparent; border-radius: 0.25rem; position: relative; margin-bottom: 1rem;" role="alert">' +
                                    '<strong style="font-weight: bold;">Berhasil!</strong>' +
                                    '<span style="display: inline;">Anda berhasil login sebagai Kepala Sekolah!</span>' +
                                '</div>';
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
                ${MenuDashboard.render()}
                <div class="dashboard-main" style="flex: 1; padding: 1rem;">
                    <header style="background-color: white; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); border-radius: 0.5rem; padding: 1rem; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h2 style="font-size: 1.5rem; font-weight: bold; color: #374151;">${welcomeMessage}</h2>
                        <button class="bg-red-500" style="background-color: #dc2626; color: white; padding: 0.5rem 1rem; border-radius: 0.375rem; transition: background-color 0.15s ease-in-out; cursor: pointer; border: none;">Logout</button>
                    </header>

                    <main style="background-color: white; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); border-radius: 0.5rem; padding: 1rem;">
                        <h1 style="font-size: 1.875rem; font-weight: bold; text-align: center; color: #374151; margin-bottom: 1.5rem;">Selamat Datang di ${welcomeMessage}</h1>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                            <div style="${cardStyle}; background-color: #f0fdf4; border-left: 4px solid #86efac;">
                                <div>
                                    <div style="${cardTitleStyle}">Absensi</div>
                                    <div style="${cardSubtitleStyle}">Kehadiran Kelas</div>
                                </div>
                                <div style="${detailButtonContainerStyle}">
                                    <button id="absensiButton" style="${detailButtonStyle}; color: #16a34a; background-color: #ecfccb;">Detail</button>
                                </div>
                            </div>

                            <div style="${cardStyle}; background-color: #fffbeb; border-left: 4px solid #facc15;">
                                <div>
                                    <div style="${cardTitleStyle}">Nilai</div>
                                    <div style="${cardSubtitleStyle}">Penilaian Kelas</div>
                                </div>
                                <div style="${detailButtonContainerStyle}">
                                    <button id="nilaiButton" style="${detailButtonStyle}; color: #ca8a04; background-color: #fef08a;">Detail</button>
                                </div>
                            </div>

                            <div style="${cardStyle}; background-color: #f0f8ff; border-left: 4px solid #22d3ee;">
                                <div>
                                    <div style="${cardTitleStyle}">Profil</div>
                                    <div style="${cardSubtitleStyle}">Profil Saya</div>
                                </div>
                                <div style="${detailButtonContainerStyle}">
                                    <button id="profilButton" style="${detailButtonStyle}; color: #06b6d4; background-color: #ccfbf1;">Detail</button>
                                </div>
                            </div>

                            <div style="${cardStyle}; background-color: #fdf2f8; border-left: 4px solid #e879f9;">
                                <div>
                                    <div style="${cardTitleStyle}">Feedback</div>
                                    <div style="${cardSubtitleStyle}">Kritik dan Saran</div>
                                </div>
                                <div style="${detailButtonContainerStyle}">
                                    <button id="feedbackButton" style="${detailButtonStyle}; color: #d946ef; background-color: #fce7f3;">Detail</button>
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