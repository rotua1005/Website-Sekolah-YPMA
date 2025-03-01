const Dashboard = {
    async render() {
        return `
        <div class="flex h-screen">
            <!-- Sidebar -->
            <aside id="sidebar" class="w-72 bg-gray-900 text-white p-6 space-y-6 fixed inset-y-0 left-0 transform -translate-x-full md:translate-x-0 transition duration-300 ease-in-out">
                <div class="flex justify-between items-center">
                    <img src="logo.png" alt="Logo Sekolah" class="w-16 h-16">
                    <h2 class="text-3xl font-bold tracking-wide text-right">Admin Sekolah</h2>
                </div>
                <hr class="w-full border-gray-700 my-4">
                <nav>
                    <ul class="space-y-3 text-xl font-bold">
                        <li>
                            <button data-target="submenu-dashboard" class="menu-button block w-full text-left p-4 hover:bg-gray-700 rounded">Dashboard</button>
                        </li>
                        <li>
                            <button data-target="submenu-upload" class="menu-button block w-full text-left p-4 hover:bg-gray-700 rounded">Upload Data</button>
                            <ul id="submenu-upload" class="submenu space-y-2 mt-2 hidden text-lg font-medium">
                                <li><button class="submenu-item flex items-center w-full p-3 hover:bg-gray-600 rounded"><span class="mr-2">◉</span> Berita</button></li>
                                <li><button class="submenu-item flex items-center w-full p-3 hover:bg-gray-600 rounded"><span class="mr-2">◉</span> Ekstrakurikuler</button></li>
                                <li><button class="submenu-item flex items-center w-full p-3 hover:bg-gray-600 rounded"><span class="mr-2">◉</span> Prestasi</button></li>
                                <li><button class="submenu-item flex items-center w-full p-3 hover:bg-gray-600 rounded"><span class="mr-2">◉</span> Data Sekolah</button></li>
                            </ul>
                        </li>
                        <li>
                            <button data-target="submenu-administrasi" class="menu-button block w-full text-left p-4 hover:bg-gray-700 rounded">Administrasi</button>
                            <ul id="submenu-administrasi" class="submenu space-y-2 mt-2 hidden text-lg font-medium">
                                <li><button class="submenu-item flex items-center w-full p-3 hover:bg-gray-600 rounded"><span class="mr-2">◉</span> Data Tahun Pelajaran</button></li>
                                <li><button class="submenu-item flex items-center w-full p-3 hover:bg-gray-600 rounded"><span class="mr-2">◉</span> Data Kelas</button></li>
                                <li><button class="submenu-item flex items-center w-full p-3 hover:bg-gray-600 rounded"><span class="mr-2">◉</span> Data Mapel</button></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </aside>

            <!-- Main Content -->
            <main class="flex-1 p-6 ml-0 md:ml-72">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="text-5xl font-bold border-b-2 border-gray-400">Dashboard</h1>
                    <button class="md:hidden p-3 bg-gray-800 text-white rounded" id="toggle-sidebar">☰</button>
                </div>
                <div id="content-area" class="p-6 bg-gray-100 rounded-lg text-xl">Pilih menu untuk melihat konten</div>
            </main>
        </div>`;
    },

    async afterRender() {
        document.querySelectorAll('.menu-button').forEach(button => {
            button.addEventListener('click', function () {
                const targetId = this.getAttribute('data-target');
                const submenu = document.getElementById(targetId);

                document.querySelectorAll('.submenu').forEach(menu => {
                    if (menu !== submenu) {
                        menu.classList.add('hidden');
                        localStorage.setItem(menu.id, 'hidden');
                    }
                });
                
                document.querySelectorAll('.menu-button').forEach(btn => {
                    btn.classList.remove('bg-gray-700');
                });
                
                submenu.classList.toggle('hidden');
                localStorage.setItem(targetId, submenu.classList.contains('hidden') ? 'hidden' : 'visible');

                if (!submenu.classList.contains('hidden')) {
                    this.classList.add('bg-gray-700');
                }
            });
        });

        document.querySelectorAll('.submenu-item').forEach(item => {
            item.addEventListener('click', function () {
                document.getElementById('content-area').innerText = `Anda memilih: ${this.innerText}`;
            });
        });

        document.getElementById('toggle-sidebar').addEventListener('click', function () {
            document.getElementById('sidebar').classList.toggle('-translate-x-full');
        });
    }
};

export default Dashboard;
