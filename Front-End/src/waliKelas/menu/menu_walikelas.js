// menu_walikelas.js
const MenuWaliKelas = {
    render() {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const formattedTime = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        return `
            <div class="dashboard-sidebar bg-indigo-700 text-white p-6 shadow-lg w-64 min-h-screen flex flex-col overflow-y-auto">
                <div class="mb-5 flex items-center justify-center border-b border-indigo-600 pb-3">
                    <h1 class="text-xl font-bold hidden md:block">Wali Kelas</h1>
                </div>
                <nav class="flex-grow">
                    <a href="#/dashboard_walikelas" class="dashboard-link block py-2.5 px-4 rounded hover:bg-indigo-600 transition duration-200 ease-in-out">
                        <i class="fas fa-tachometer-alt mr-2"></i> Dashboard
                    </a>

                    <div class="mt-3">
                        <p class="mb-1 text-xs font-semibold text-indigo-300 uppercase tracking-wider">MASTER DATA</p>
                        <div class="dashboard-menu mt-1">
                            <button class="dashboard-menu-btn w-full text-left py-2.5 px-4 rounded hover:bg-indigo-600 transition duration-200 ease-in-out flex items-center justify-between" data-menu="dataSiswaMenu">
                                <i class="fas fa-users mr-2"></i>
                                <span class="font-semibold">Data Siswa</span>
                                <span class="arrow transform transition-transform duration-300">▼</span>
                            </button>
                            <div id="dataSiswaMenu" class="dashboard-submenu mt-1 space-y-1 hidden">
                                <a href="#/data_siswa_walikelas" class="dashboard-submenu-link block py-1.5 px-6 rounded hover:bg-indigo-500 transition duration-200 ease-in-out text-sm">Data Siswa</a>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3">
                        <p class="mb-1 text-xs font-semibold text-indigo-300 uppercase tracking-wider">ABSENSI</p>
                        <div class="dashboard-menu mt-1">
                            <button class="dashboard-menu-btn w-full text-left py-2.5 px-4 rounded hover:bg-indigo-600 transition duration-200 ease-in-out flex items-center justify-between" data-menu="absensiMenu">
                                <i class="fas fa-clipboard-check mr-2"></i>
                                <span class="font-semibold">Absensi</span>
                                <span class="arrow transform transition-transform duration-300">▼</span>
                            </button>
                            <div id="absensiMenu" class="dashboard-submenu mt-1 space-y-1 hidden">
                                <a href="#/absensi_walikelas" class="dashboard-submenu-link block py-1.5 px-6 rounded hover:bg-indigo-500 transition duration-200 ease-in-out text-sm">Kelola Absensi</a>
                                <a href="#/rekap_absensi_walikelas" class="dashboard-submenu-link block py-1.5 px-6 rounded hover:bg-indigo-500 transition duration-200 ease-in-out text-sm">Rekap Absensi</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-3">
                        <p class="mb-1 text-xs font-semibold text-indigo-300 uppercase tracking-wider">PROFILE</p>
                        <a href="#/dashboard_akun_walikelas" class="dashboard-link block py-2.5 px-4 rounded hover:bg-indigo-600 transition duration-200 ease-in-out">
                            <i class="fas fa-user-circle mr-2"></i> Profile
                        </a>
                    </div>
                </nav>
                <div class="mt-5 p-4 border-t border-indigo-600 text-center">
                    <p class="text-xs text-indigo-300">${formattedDate}</p>
                    <p class="text-xs text-indigo-300">${formattedTime}</p>
                    <p class="text-xs text-indigo-300">Medan, Indonesia</p>
                </div>
            </div>
        `;
    },

    afterRender() {
        const menuButtons = document.querySelectorAll(".dashboard-menu-btn");
        const menus = document.querySelectorAll(".dashboard-submenu");
        const arrows = document.querySelectorAll(".dashboard-menu-btn .arrow");
        const submenuLinks = document.querySelectorAll(".dashboard-submenu-link");
        const dashboardLinks = document.querySelectorAll(".dashboard-link");

        // Fungsi untuk menutup semua menu dan reset panah
        const closeAllMenus = () => {
            menus.forEach(menu => menu.classList.add("hidden"));
            arrows.forEach(arrow => arrow.classList.remove("rotate-180"));
            localStorage.removeItem("openMenu");
        };

        // Event listener untuk tombol menu utama
        menuButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                const menuId = button.getAttribute("data-menu");
                const menu = document.getElementById(menuId);
                const arrow = button.querySelector(".arrow");
                const isOpen = !menu.classList.contains("hidden");

                // Tutup semua menu lain
                menus.forEach(m => {
                    if (m.id !== menuId) m.classList.add("hidden");
                });

                // Reset semua panah lain
                arrows.forEach(a => {
                    if (a !== arrow) a.classList.remove("rotate-180");
                });

                // Toggle menu saat ini
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

        // Event listener untuk link submenu
        submenuLinks.forEach(link => {
            link.addEventListener("click", (event) => {
                event.stopPropagation();
                const target = event.target;
                localStorage.setItem("activeSubmenu", target.getAttribute("href"));

                // Hapus kelas aktif dari semua link
                submenuLinks.forEach(el => el.classList.remove("active"));
                dashboardLinks.forEach(el => el.classList.remove("active"));

                // Tambahkan kelas aktif ke link yang diklik
                target.classList.add("active");

                // Buka menu induk dan putar panah
                const parentMenu = target.closest(".dashboard-submenu");
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

        // Event listener untuk link dashboard utama
        dashboardLinks.forEach(link => {
            link.addEventListener("click", () => {
                submenuLinks.forEach(el => el.classList.remove("active"));
                dashboardLinks.forEach(el => el.classList.remove("active"));
                link.classList.add("active");
                closeAllMenus();
                localStorage.removeItem("activeSubmenu");
            });
        });

        // Restorasi status menu dari localStorage saat halaman dimuat
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
        } else if (window.location.hash === "#/dashboard_walikelas") {
            const dashboardLink = document.querySelector('a[href="#/dashboard_walikelas"]');
            if (dashboardLink) {
                dashboardLink.classList.add("active");
            }
        }
    }
};

export default MenuWaliKelas;