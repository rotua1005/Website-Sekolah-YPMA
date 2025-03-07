const Dashboard = {
    async render() {
        return `
        <div class="dashboard-container">
            <div class="dashboard-sidebar">
                <h1 class="dashboard-title">Admin Sekolah</h1>
                <nav>
                    <a href="#/dashboard" class="dashboard-link">Dashboard</a>
                    <div class="dashboard-menu">
                        <button id="toggleDataSekolah" class="dashboard-menu-btn">
                            Upload Data <span class="arrow">▼</span>
                        </button>
                        <div id="dataSekolahMenu" class="dashboard-submenu hidden">
                            <a href="#/dashboard_berita" class="dashboard-submenu-link">Berita</a>
                            <a href="#/dashboard_kurikuler" class="dashboard-submenu-link">Ekstrakurikuler</a>
                            <a href="#/dashboard_prestasi" class="dashboard-submenu-link">Prestasi</a>
                            <a href="#/dashboard_profile" class="dashboard-submenu-link">Profile Sekolah</a>
                        </div>
                    </div>
                    <div class="dashboard-menu">
                        <button id="toggleDataAkademik" class="dashboard-menu-btn">
                            Data Akademik <span class="arrow">▼</span>
                        </button>
                        <div id="dataAkademikMenu" class="dashboard-submenu hidden">
                            <a href="#/dashboard_kelas" class="dashboard-submenu-link">Data Kelas</a>
                            <a href="#/dashboard_mapel" class="dashboard-submenu-link">Data Mapel</a>
                        </div>
                    </div>
                    <a href="#/dashboard_settings" class="dashboard-link">Settings</a>
                </nav>
            </div>

            <div class="dashboard-main">
                <header class="dashboard-header">
                    <h2 class="dashboard-header-title">Dashboard Admin</h2>
                    <button class="dashboard-logout">Logout</button>
                </header>

                <main class="dashboard-content">
                    <h2 class="dashboard-section-title">Upload Data</h2>
                    <div class="dashboard-card full-height">
                        <p>Fitur untuk mengunggah data sekolah seperti berita, ekstrakurikuler, dan prestasi.</p>
                    </div>

                    <h2 class="dashboard-section-title">Data Sekolah</h2>
                    <div class="dashboard-grid full-height">
                        <div class="dashboard-card">
                            <h3>Berita</h3>
                            <p>Informasi terbaru seputar sekolah.</p>
                        </div>
                        <div class="dashboard-card">
                            <h3>Ekstrakurikuler</h3>
                            <p>Daftar kegiatan ekstrakurikuler di sekolah.</p>
                        </div>
                        <div class="dashboard-card">
                            <h3>Prestasi</h3>
                            <p>Prestasi siswa dan guru.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        `;
    },

    async afterRender() {
        document.getElementById('toggleDataSekolah').addEventListener('click', function () {
            document.getElementById('dataSekolahMenu').classList.toggle('hidden');
            this.querySelector('span').classList.toggle('rotate-180');
        });

        document.getElementById('toggleDataAkademik').addEventListener('click', function () {
            document.getElementById('dataAkademikMenu').classList.toggle('hidden');
            this.querySelector('span').classList.toggle('rotate-180');
        });

        const links = document.querySelectorAll('.dashboard-link, .dashboard-submenu-link');
        links.forEach(link => {
            link.addEventListener('click', function () {
                links.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                localStorage.setItem('activeDashboardLink', this.getAttribute('href'));
            });
        });

        const lastActive = localStorage.getItem('activeDashboardLink');
        if (lastActive) {
            const activeLink = document.querySelector(`a[href="${lastActive}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
};

export default Dashboard;
