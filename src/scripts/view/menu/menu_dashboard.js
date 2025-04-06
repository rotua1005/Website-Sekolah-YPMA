const MenuDashboard = {
    render() {
        return `
        <div class="dashboard-sidebar bg-green-700 text-white p-6 shadow-lg w-72 min-h-screen flex flex-col">
            <div class="mb-8 flex items-center justify-center border-b border-green-600 pb-4">
                <h1 class="text-2xl font-bold">Admin Sekolah</h1>
            </div>
            <nav class="flex-grow">
                <a href="#/dashboard" class="dashboard-link block py-3 px-4 rounded hover:bg-green-600 transition duration-200 ease-in-out">Dashboard</a>

                <div class="dashboard-menu mt-2">
                    <button class="dashboard-menu-btn w-full text-left py-3 px-4 rounded hover:bg-green-600 transition duration-200 ease-in-out flex items-center justify-between" data-menu="dataSekolahMenu">
                        <span class="font-semibold">Upload Data</span>
                        <span class="arrow transform transition-transform duration-300">▼</span>
                    </button>
                    <div id="dataSekolahMenu" class="dashboard-submenu mt-1 space-y-1 hidden">
                        <a href="#/dashboard_berita" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Berita</a>
                        <a href="#/dashboard_kurikuler" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Ekstrakurikuler</a>
                        <a href="#/dashboard_prestasi" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Prestasi</a>
                        <a href="#/dashboard_profile" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Profile Sekolah</a>
                    </div>
                </div>

                <div class="dashboard-menu mt-2">
                    <button class="dashboard-menu-btn w-full text-left py-3 px-4 rounded hover:bg-green-600 transition duration-200 ease-in-out flex items-center justify-between" data-menu="dataBiodataMenu">
                        <span class="font-semibold">Biodata</span>
                        <span class="arrow transform transition-transform duration-300">▼</span>
                    </button>
                    <div id="dataBiodataMenu" class="dashboard-submenu mt-1 space-y-1 hidden">
                        <a href="#/data_akun" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Data Akun</a>
                        <a href="#/data_siswa" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Data Siswa</a>
                        <a href="#/data_walikelas" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Data Wali Kelas</a>
                        <a href="#/data_guru" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Data Guru</a>
                        <a href="#/data_admin" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Data Admin</a>
                    </div>
                </div>

                <div class="dashboard-menu mt-2">
                    <button class="dashboard-menu-btn w-full text-left py-3 px-4 rounded hover:bg-green-600 transition duration-200 ease-in-out flex items-center justify-between" data-menu="dataAkademikMenu">
                        <span class="font-semibold">Data Akademik</span>
                        <span class="arrow transform transition-transform duration-300">▼</span>
                    </button>
                    <div id="dataAkademikMenu" class="dashboard-submenu mt-1 space-y-1 hidden">
                        <a href="#/data_kelas" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Data Kelas</a>
                        <a href="#/data_mapel" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Data Mapel</a>
                        <a href="#/data_sekolah" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Data Sekolah</a>
                        <a href="#/tahun_akademik" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Tahun Akademik</a>
                    </div>
                </div>

                <div class="dashboard-menu mt-2">
                    <button class="dashboard-menu-btn w-full text-left py-3 px-4 rounded hover:bg-green-600 transition duration-200 ease-in-out flex items-center justify-between" data-menu="dataAbsensiMenu">
                        <span class="font-semibold">Data Absensi</span>
                        <span class="arrow transform transition-transform duration-300">▼</span>
                    </button>
                    <div id="dataAbsensiMenu" class="dashboard-submenu mt-1 space-y-1 hidden">
                        <a href="#/absensi1" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Absensi</a>
                        <a href="#/rekap_absensi" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Rekap Absensi</a>
                    </div>
                </div>

                <div class="dashboard-menu mt-2">
                    <button class="dashboard-menu-btn w-full text-left py-3 px-4 rounded hover:bg-green-600 transition duration-200 ease-in-out flex items-center justify-between" data-menu="dataNilaiMenu">
                        <span class="font-semibold">Data Nilai</span>
                        <span class="arrow transform transition-transform duration-300">▼</span>
                    </button>
                    <div id="dataNilaiMenu" class="dashboard-submenu mt-1 space-y-1 hidden">
                        <a href="#/input_nilai" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Input Nilai</a>
                        <a href="#/nilai_akhir" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Nilai Akhir</a>
                        <a href="#/rekap_nilai" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Rekap Nilai</a>
                        <a href="#/perbaikan_nilai" class="dashboard-submenu-link block py-2 px-6 rounded hover:bg-green-500 transition duration-200 ease-in-out">Perbaikan Nilai</a>
                    </div>
                </div>

                <a href="#/dashboard_akun" class="dashboard-link block mt-2 py-3 px-4 rounded hover:bg-green-600 transition duration-200 ease-in-out">Profile</a>
            </nav>
            <div class="mt-8 p-4 border-t border-green-600">
                <p class="text-sm text-green-300">Medan, Indonesia</p>
                <p class="text-sm text-green-300">${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p class="text-sm text-green-300">${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
            </div>
        </div>`;
    },

    afterRender() {
        console.log("MenuDashboard afterRender is running");
        const menuButtons = document.querySelectorAll(".dashboard-menu-btn");
        const menus = document.querySelectorAll(".dashboard-submenu");
        const arrows = document.querySelectorAll(".dashboard-menu-btn .arrow");
        const submenuLinks = document.querySelectorAll(".dashboard-submenu-link");
        const dashboardLinks = document.querySelectorAll(".dashboard-link");

        // Function to close all menus and reset arrows
        const closeAllMenus = () => {
            menus.forEach(menu => menu.classList.add("hidden"));
            arrows.forEach(arrow => arrow.classList.remove("rotate-180"));
            localStorage.removeItem("openMenu");
        };

        menuButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                const menuId = button.getAttribute("data-menu");
                const menu = document.getElementById(menuId);
                const arrow = button.querySelector(".arrow");
                const isOpen = !menu.classList.contains("hidden");

                // Close all other menus
                menus.forEach(m => {
                    if (m.id !== menuId) m.classList.add("hidden");
                });

                // Reset all other arrows
                arrows.forEach(a => {
                    if (a !== arrow) a.classList.remove("rotate-180");
                });

                // Toggle the current menu and arrow
                if (!isOpen) {
                    menu.classList.remove("hidden");
                    arrow.classList.add("rotate-180");
                    localStorage.setItem("openMenu", menuId);
                } else {
                    menu.classList.add("hidden");
                    arrow.classList.remove("rotate-180");
                    localStorage.removeItem("openMenu");
                }
            });
        });

        submenuLinks.forEach(link => {
            link.addEventListener("click", (event) => {
                event.stopPropagation();
                localStorage.setItem("activeSubmenu", event.target.getAttribute("href"));

                // Remove active class from all links
                submenuLinks.forEach(el => el.classList.remove("active"));
                dashboardLinks.forEach(el => el.classList.remove("active")); // Also remove from top-level links

                // Add active class to the clicked link
                event.target.classList.add("active");

                // Keep the parent menu open and arrow rotated
                const parentMenu = event.target.closest(".dashboard-submenu");
                if (parentMenu) {
                    parentMenu.classList.remove("hidden");
                    const parentButton = document.querySelector(`[data-menu="${parentMenu.id}"]`);
                    if (parentButton) {
                        parentButton.querySelector(".arrow").classList.add("rotate-180");
                        localStorage.setItem("openMenu", parentMenu.id);
                    }
                }
            });
        });

        dashboardLinks.forEach(link => {
            link.addEventListener("click", () => {
                // Remove active class from all submenu links
                submenuLinks.forEach(el => el.classList.remove("active"));
                dashboardLinks.forEach(el => el.classList.remove("active"));
                link.classList.add("active");
                closeAllMenus(); // Close all submenus when a top-level link is clicked
                localStorage.removeItem("activeSubmenu");
            });
        });

        // Restore menu state on load
        const openMenuId = localStorage.getItem("openMenu");
        if (openMenuId) {
            const openMenu = document.getElementById(openMenuId);
            const button = document.querySelector(`[data-menu="${openMenuId}"]`);
            if (openMenu && button) {
                openMenu.classList.remove("hidden");
                button.querySelector(".arrow").classList.add("rotate-180");
            }
        }

        const activeSubmenuLink = localStorage.getItem("activeSubmenu");
        if (activeSubmenuLink) {
            const activeElement = document.querySelector(`.dashboard-submenu-link[href="${activeSubmenuLink}"]`);
            if (activeElement) {
                activeElement.classList.add("active");
                const parentMenu = activeElement.closest(".dashboard-submenu");
                if (parentMenu) {
                    parentMenu.classList.remove("hidden");
                    const parentButton = document.querySelector(`[data-menu="${parentMenu.id}"]`);
                    if (parentButton) {
                        parentButton.querySelector(".arrow").classList.add("rotate-180");
                    }
                }
            }
        } else if (window.location.hash === "#/dashboard") {
            const dashboardLink = document.querySelector('a[href="#/dashboard"]');
            if (dashboardLink) {
                dashboardLink.classList.add("active");
            }
        }

        // Close all menus when clicking outside the sidebar
        document.addEventListener("click", (event) => {
            if (!event.target.closest(".dashboard-sidebar")) {
                closeAllMenus();
                submenuLinks.forEach(el => el.classList.remove("active"));
                dashboardLinks.forEach(el => {
                    if (el.getAttribute('href') === window.location.hash) {
                        el.classList.add('active');
                    } else {
                        el.classList.remove('active');
                    }
                });
                localStorage.removeItem("activeSubmenu");
            }
        });
    }
};

export default MenuDashboard;