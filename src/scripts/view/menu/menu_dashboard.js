const MenuDashboard = {
    render() {
        return `
        <div class="dashboard-sidebar bg-green-700 text-white p-6 shadow-lg w-64">
            <h1 class="text-2xl font-bold mb-4">Admin Sekolah</h1>
            <nav>
                <a href="#/dashboard" class="dashboard-link">Dashboard</a>

                <div class="dashboard-menu">
                    <button class="dashboard-menu-btn" data-menu="dataSekolahMenu">
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
                    <button class="dashboard-menu-btn" data-menu="dataBiodataMenu">
                        Biodata <span class="arrow">▼</span>
                    </button>
                    <div id="dataBiodataMenu" class="dashboard-submenu hidden">
                        <a href="#/data_akun" class="dashboard-submenu-link">Data Akun</a>
                        <a href="#/data_siswa" class="dashboard-submenu-link">Data Siswa</a>
                        <a href="#/data_walikelas" class="dashboard-submenu-link">Data Wali Kelas</a>
                        <a href="#/data_guru" class="dashboard-submenu-link">Data Guru</a>
                        <a href="#/data_admin" class="dashboard-submenu-link">Data Admin</a>
                    </div>
                </div>

                <div class="dashboard-menu">
                    <button class="dashboard-menu-btn" data-menu="dataAkademikMenu">
                        Data Akademik <span class="arrow">▼</span>
                    </button>
                    <div id="dataAkademikMenu" class="dashboard-submenu hidden">
                        <a href="#/data_kelas" class="dashboard-submenu-link">Data Kelas</a>
                        <a href="#/data_mapel" class="dashboard-submenu-link">Data Mapel</a>
                        <a href="#/data_sekolah" class="dashboard-submenu-link">Data Sekolah</a>
                        <a href="#/tahun_akademik" class="dashboard-submenu-link">Tahun Akademik</a>
                    </div>
                </div>

                <div class="dashboard-menu">
                    <button class="dashboard-menu-btn" data-menu="dataAbsensiMenu">
                        Data Absensi <span class="arrow">▼</span>
                    </button>
                    <div id="dataAbsensiMenu" class="dashboard-submenu hidden">
                        <a href="#/absensi1" class="dashboard-submenu-link">Absensi</a>
                        <a href="#/rekap_absensi" class="dashboard-submenu-link">Rekap Absensi</a>
                    </div>
                </div>

                <div class="dashboard-menu">
                    <button class="dashboard-menu-btn" data-menu="dataNilaiMenu">
                        Data Nilai <span class="arrow">▼</span>
                    </button>
                    <div id="dataNilaiMenu" class="dashboard-submenu hidden">
                        <a href="#/input_nilai" class="dashboard-submenu-link">Input Nilai</a>
                        <a href="#/nilai_akhir" class="dashboard-submenu-link">Nilai Akhir</a>
                        <a href="#/rekap_nilai" class="dashboard-submenu-link">Rekap Nilai</a>
                        <a href="#/perbaikan_nilai" class="dashboard-submenu-link">Perbaikan Nilai</a>
                    </div>
                </div>

                <a href="#/dashboard_settings" class="dashboard-link">Settings</a>
            </nav>
        </div>`;
    },

    afterRender() {
        console.log("MenuDashboard afterRender is running");
        const menuButtons = document.querySelectorAll(".dashboard-menu-btn");
        const menus = document.querySelectorAll(".dashboard-submenu");

        menuButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                event.stopPropagation(); // Prevent closing on click
                const menuId = button.getAttribute("data-menu");
                const menu = document.getElementById(menuId);
                const isOpen = !menu.classList.contains("hidden");

                // Close all other menus except the current one
                menus.forEach(m => {
                    if (m.id !== menuId) m.classList.add("hidden");
                });

                menuButtons.forEach(b => {
                    if (b !== button) b.querySelector(".arrow").classList.remove("rotate-180");
                });

                // Toggle the clicked menu
                if (!isOpen) {
                    menu.classList.remove("hidden");
                    button.querySelector(".arrow").classList.add("rotate-180");
                }
            });
        });

        // Pastikan menu tetap terbuka saat submenu diklik
        document.querySelectorAll(".dashboard-submenu-link").forEach(link => {
            link.addEventListener("click", (event) => {
                event.stopPropagation();
                localStorage.setItem("activeSubmenu", event.target.getAttribute("href"));

                // Simpan menu yang tetap terbuka
                const parentMenu = event.target.closest(".dashboard-submenu");
                localStorage.setItem("openMenu", parentMenu.id);

                // Pastikan menu yang sedang aktif tetap terbuka
                menus.forEach(m => {
                    if (m.id === parentMenu.id) {
                        m.classList.remove("hidden");
                        const button = document.querySelector(`[data-menu="${m.id}"]`);
                        if (button) button.querySelector(".arrow").classList.add("rotate-180");
                    }
                });

                // Hapus aktif dari semua dan tambahkan ke yang diklik
                document.querySelectorAll(".dashboard-submenu-link").forEach(el => el.classList.remove("active"));
                event.target.classList.add("active");
            });
        });

        // Restore menu yang sebelumnya terbuka
        const openMenuId = localStorage.getItem("openMenu");
        if (openMenuId) {
            const openMenu = document.getElementById(openMenuId);
            if (openMenu) {
                openMenu.classList.remove("hidden");
                const button = document.querySelector(`[data-menu="${openMenuId}"]`);
                if (button) button.querySelector(".arrow").classList.add("rotate-180");
            }
        }

        // Restore submenu yang aktif
        const activeSubmenuLink = localStorage.getItem("activeSubmenu");
        if (activeSubmenuLink) {
            const activeElement = document.querySelector(`.dashboard-submenu-link[href="${activeSubmenuLink}"]`);
            if (activeElement) {
                activeElement.classList.add("active");
            }
        }

        // Klik di luar untuk menutup semua menu, kecuali yang sedang terbuka
        document.addEventListener("click", (event) => {
            if (!event.target.closest(".dashboard-menu")) {
                menus.forEach(menu => menu.classList.add("hidden"));
                menuButtons.forEach(button => button.querySelector(".arrow").classList.remove("rotate-180"));
                localStorage.removeItem("openMenu");
            }
        });
    }
};

export default MenuDashboard;
