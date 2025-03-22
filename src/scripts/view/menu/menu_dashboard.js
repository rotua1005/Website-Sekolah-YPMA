const MenuDashboard = {
    render() {
        return `
        <div class="dashboard-sidebar bg-green-700 text-white p-6 shadow-lg w-64">
            <h1 class="text-2xl font-bold mb-4">Admin Sekolah</h1>
            <nav>
                <a href="#/dashboard" class="dashboard-link">Dashboard</a>

                <div class="dashboard-menu">
                    <button id="toggleDataSekolah" class="dashboard-menu-btn" aria-expanded="false">
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
                    <button id="toggleDataBiodata" class="dashboard-menu-btn" aria-expanded="false">
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
                    <button id="toggleDataAkademik" class="dashboard-menu-btn" aria-expanded="false">
                        Data Akademik <span class="arrow">▼</span>
                    </button>
                    <div id="dataAkademikMenu" class="dashboard-submenu hidden">
                        <a href="#/dashboard_kelas" class="dashboard-submenu-link">Data Kelas</a>
                        <a href="#/dashboard_mapel" class="dashboard-submenu-link">Data Mapel</a>
                        <a href="#/dashboard_mapel" class="dashboard-submenu-link">Data Sekolah</a>
                        <a href="#/dashboard_mapel" class="dashboard-submenu-link">Tahun Akademik</a>
                    </div>
                </div>

                <a href="#/dashboard_settings" class="dashboard-link">Settings</a>
            </nav>
        </div>
        `;
    },

    afterRender() {
        console.log("MenuDashboard afterRender is running");

        const menus = [
            { button: 'toggleDataSekolah', menu: 'dataSekolahMenu', storageKey: 'dataSekolahMenuStatus' },
            { button: 'toggleDataBiodata', menu: 'dataBiodataMenu', storageKey: 'dataBiodataMenuStatus' },
            { button: 'toggleDataAkademik', menu: 'dataAkademikMenu', storageKey: 'dataAkademikMenuStatus' }
        ];

        function toggleMenu(button, menu, storageKey) {
            if (!menu || !button) return;
            const isCurrentlyOpen = !menu.classList.contains('hidden');
            if (!isCurrentlyOpen) {
                menu.classList.remove('hidden');
                button.querySelector('span').classList.add('rotate-180');
                button.setAttribute('aria-expanded', 'true');
                localStorage.setItem(storageKey, 'open');
            } else {
                menu.classList.add('hidden');
                button.querySelector('span').classList.remove('rotate-180');
                button.setAttribute('aria-expanded', 'false');
                localStorage.setItem(storageKey, 'closed');
            }
        }

        menus.forEach(({ button, menu, storageKey }) => {
            const buttonElement = document.getElementById(button);
            const menuElement = document.getElementById(menu);

            if (buttonElement && menuElement) {
                buttonElement.addEventListener('click', function (event) {
                    if (!event.target.classList.contains('dashboard-submenu-link')) {
                        event.stopPropagation();
                        toggleMenu(buttonElement, menuElement, storageKey);
                    }
                });

                if (localStorage.getItem(storageKey) === 'open') {
                    menuElement.classList.remove('hidden');
                    buttonElement.querySelector('span').classList.add('rotate-180');
                    buttonElement.setAttribute('aria-expanded', 'true');
                }
            }
        });

        document.addEventListener('click', (event) => {
            if (!event.target.closest('.dashboard-menu') && !event.target.classList.contains('dashboard-submenu-link')) {
                menus.forEach(({ menu, button }) => {
                    const menuElement = document.getElementById(menu);
                    const buttonElement = document.getElementById(button);
                    if (menuElement && buttonElement && !menuElement.classList.contains('hidden')) {
                        menuElement.classList.add('hidden');
                        buttonElement.querySelector('span').classList.remove('rotate-180');
                        buttonElement.setAttribute('aria-expanded', 'false');
                        localStorage.setItem(menu, 'closed');
                    }
                });
            }
        });

        document.querySelectorAll('.dashboard-submenu-link').forEach(link => {
            link.addEventListener('click', (event) => {
                document.querySelectorAll('.dashboard-submenu-link').forEach(el => el.classList.remove('active'));
                event.target.classList.add('active');
                localStorage.setItem('activeSubmenuLink', event.target.getAttribute('href')); // Save the active link
                event.stopPropagation();
            });
        });

        // Ensure submenu does not open when clicking a submenu link
        document.querySelectorAll('.dashboard-submenu-link').forEach(link => {
            link.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent triggering parent menu toggle
            });
        });

        // Restore the last active submenu link on page load
        const activeLink = localStorage.getItem('activeSubmenuLink');
        if (activeLink) {
            const activeElement = document.querySelector(`.dashboard-submenu-link[href="${activeLink}"]`);
            if (activeElement) {
                activeElement.classList.add('active');
            }
        }
    }
};

export default MenuDashboard;
