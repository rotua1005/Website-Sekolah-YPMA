const Dashboard_Profile = {
    async render() {
        return `
        <div class="dashboard-container bg-gray-100 min-h-screen flex">
            <div class="dashboard-sidebar bg-green-700 text-white p-6 shadow-lg w-64">
                <h1 class="text-2xl font-bold mb-4">Admin Sekolah</h1>
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

            <div class="dashboard-main flex-1 p-8">
                <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                    <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                </header>

                <main class="bg-white shadow-lg rounded-lg p-6">
                    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Upload Profile</h1>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <form id="upload-kepala-form" class="space-y-6 bg-gray-50 p-6 rounded-lg shadow">
                            <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Upload Kepala Sekolah</h2>
                            <div>
                                <label class="block font-semibold text-lg text-gray-700">Nama Kepala Sekolah</label>
                                <input type="text" id="nama-kepala" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" required>
                            </div>
                            <div>
                                <label class="block font-semibold text-lg text-gray-700">Deskripsi</label>
                                <textarea id="deskripsi-kepala" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" rows="4" required></textarea>
                            </div>
                            <div>
                                <label class="block font-semibold text-lg text-gray-700">Upload Gambar</label>
                                <input type="file" id="gambar-kepala" accept="image/*" class="w-full p-3 border rounded-lg" required>
                                <img id="preview-kepala" class="mt-4 hidden w-full h-48 object-cover rounded-lg shadow-md" alt="Preview Image">
                            </div>
                            <button type="submit" id="submit-kepala-button" class="w-full bg-green-600 text-white p-3 rounded-lg text-xl font-semibold hover:bg-green-700 transition-all shadow">Upload Kepala Sekolah</button>
                            <button type="button" id="cancel-kepala-edit" class="hidden w-full bg-gray-500 text-white p-3 rounded-lg text-xl font-semibold hover:bg-gray-600 transition-all shadow">Batal</button>
                        </form>

                        <form id="upload-guru-form" class="space-y-6 bg-gray-50 p-6 rounded-lg shadow">
                            <h2 class="text-2xl font-bold text-center text-gray-800 mb-4">Upload Guru</h2>
                            <div>
                                <label class="block font-semibold text-lg text-gray-700">Nama Guru</label>
                                <input type="text" id="nama-guru" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" required>
                            </div>
                            <div>
                                <label class="block font-semibold text-lg text-gray-700">Deskripsi</label>
                                <textarea id="deskripsi-guru" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" rows="4" required></textarea>
                            </div>
                            <div>
                                <label class="block font-semibold text-lg text-gray-700">Upload Gambar</label>
                                <input type="file" id="gambar-guru" accept="image/*" class="w-full p-3 border rounded-lg" required>
                                <img id="preview-guru" class="mt-4 hidden w-full h-48 object-cover rounded-lg shadow-md" alt="Preview Image">
                            </div>
                            <button type="submit" id="submit-guru-button" class="w-full bg-green-600 text-white p-3 rounded-lg text-xl font-semibold hover:bg-green-700 transition-all shadow">Upload Guru</button>
                            <button type="button" id="cancel-guru-edit" class="hidden w-full bg-gray-500 text-white p-3 rounded-lg text-xl font-semibold hover:bg-gray-600 transition-all shadow">Batal</button>
                        </form>
                    </div>
                    <div id="kepala-list" class="mt-6"></div>
                    <div id="guru-list" class="mt-6"></div>
                </main>
            </div>
        </div>
        `;
    },

    async afterRender() {
        const kepalaForm = document.getElementById("upload-kepala-form");
        const kepalaPreview = document.getElementById("preview-kepala");
        const kepalaSubmitButton = document.getElementById("submit-kepala-button");
        const kepalaCancelEditButton = document.getElementById("cancel-kepala-edit");
        let kepalaList = JSON.parse(localStorage.getItem("kepala")) || [];
        let kepalaEditIndex = null;

        const guruForm = document.getElementById("upload-guru-form");
        const guruPreview = document.getElementById("preview-guru");
        const guruSubmitButton = document.getElementById("submit-guru-button");
        const guruCancelEditButton = document.getElementById("cancel-guru-edit");
        let guruList = JSON.parse(localStorage.getItem("guru")) || [];
        let guruEditIndex = null;

        const dataSekolahBtn = document.getElementById('toggleDataSekolah');
        const dataSekolahMenu = document.getElementById('dataSekolahMenu');
        const dataAkademikBtn = document.getElementById('toggleDataAkademik');
        const dataAkademikMenu = document.getElementById('dataAkademikMenu');

        function toggleMenu(button, menu, storageKey) {
            menu.classList.toggle('hidden');
            button.querySelector('span').classList.toggle('rotate-180');
            localStorage.setItem(storageKey, menu.classList.contains('hidden') ? 'closed' : 'open');
        }

        dataSekolahBtn.addEventListener('click', function () {
            toggleMenu(this, dataSekolahMenu, 'dataSekolahMenuStatus');
        });

        dataAkademikBtn.addEventListener('click', function () {
            toggleMenu(this, dataAkademikMenu, 'dataAkademikMenuStatus');
        });

        if (localStorage.getItem('dataSekolahMenuStatus') === 'open') {
            dataSekolahMenu.classList.remove('hidden');
            dataSekolahBtn.querySelector('span').classList.add('rotate-180');
        }

        if (localStorage.getItem('dataAkademikMenuStatus') === 'open') {
            dataAkademikMenu.classList.remove('hidden');
            dataAkademikBtn.querySelector('span').classList.add('rotate-180');
        }

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

        document.getElementById("deskripsi-kepala").addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                this.value += "\n";
            }
        });

        document.getElementById("deskripsi-guru").addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                this.value += "\n";
            }
        });

        kepalaForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const nama = document.getElementById("nama-kepala").value;
            const deskripsi = document.getElementById("deskripsi-kepala").value;
            const tanggal = new Date().toLocaleDateString();
            const gambar = document.getElementById("gambar-kepala").files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const gambarSrc = e.target.result;
                if (kepalaEditIndex === null) {
                    if (!kepalaList.some(kepala => kepala.nama === nama && kepala.tanggal === tanggal)) {
                        kepalaList.push({ nama, deskripsi, tanggal, gambar: gambarSrc });
                        try {
                            localStorage.setItem("kepala", JSON.stringify(kepalaList));
                        } catch (e) {
                            if (e.name === 'QuotaExceededError') {
                                showAlert('Storage limit exceeded. Please delete some items.', 'danger');
                            }
                        }
                        kepalaForm.reset();
                        kepalaPreview.classList.add("hidden");
                        tampilkanKepala();
                        showAlert('Kepala Sekolah berhasil diupload.', 'success');
                    } else {
                        showAlert('Kepala Sekolah sudah ada.', 'warning');
                    }
                } else {
                    kepalaList[kepalaEditIndex] = { nama, deskripsi, tanggal, gambar: gambarSrc };
                    localStorage.setItem("kepala", JSON.stringify(kepalaList));
                    kepalaForm.reset();
                    kepalaPreview.classList.add("hidden");
                    tampilkanKepala();
                    showAlert('Kepala Sekolah berhasil diedit.', 'success');
                    kepalaEditIndex = null;
                    kepalaSubmitButton.textContent = "Upload Kepala Sekolah";
                    kepalaCancelEditButton.classList.add("hidden");
                }
            };
            reader.readAsDataURL(gambar);
        });

        guruForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const nama = document.getElementById("nama-guru").value;
            const deskripsi = document.getElementById("deskripsi-guru").value;
            const tanggal = new Date().toLocaleDateString();
            const gambar = document.getElementById("gambar-guru").files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const gambarSrc = e.target.result;
                if (guruEditIndex === null) {
                    if (!guruList.some(guru => guru.nama === nama && guru.tanggal === tanggal)) {
                        guruList.push({ nama, deskripsi, tanggal, gambar: gambarSrc });
                        try {
                            localStorage.setItem("guru", JSON.stringify(guruList));
                        } catch (e) {
                            if (e.name === 'QuotaExceededError') {
                                showAlert('Storage limit exceeded. Please delete some items.', 'danger');
                            }
                        }
                        guruForm.reset();
                        guruPreview.classList.add("hidden");
                        tampilkanGuru();
                        showAlert('Guru berhasil diupload.', 'success');
                    } else {
                        showAlert('Guru sudah ada.', 'warning');
                    }
                } else {
                    guruList[guruEditIndex] = { nama, deskripsi, tanggal, gambar: gambarSrc };
                    localStorage.setItem("guru", JSON.stringify(guruList));
                    guruForm.reset();
                    guruPreview.classList.add("hidden");
                    tampilkanGuru();
                    showAlert('Guru berhasil diedit.', 'success');
                    guruEditIndex = null;
                    guruSubmitButton.textContent = "Upload Guru";
                    guruCancelEditButton.classList.add("hidden");
                }
            };
            reader.readAsDataURL(gambar);
        });

        document.getElementById("gambar-kepala").addEventListener("change", function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    kepalaPreview.src = e.target.result;
                    kepalaPreview.classList.remove("hidden");
                };
                reader.readAsDataURL(file);
            }
        });

        document.getElementById("gambar-guru").addEventListener("change", function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    guruPreview.src = e.target.result;
                    guruPreview.classList.remove("hidden");
                };
                reader.readAsDataURL(file);
            }
        });

        kepalaCancelEditButton.addEventListener("click", function() {
            kepalaForm.reset();
            kepalaPreview.classList.add("hidden");
            kepalaEditIndex = null;
            kepalaSubmitButton.textContent = "Upload Kepala Sekolah";
            kepalaCancelEditButton.classList.add("hidden");
        });

        guruCancelEditButton.addEventListener("click", function() {
            guruForm.reset();
            guruPreview.classList.add("hidden");
            guruEditIndex = null;
            guruSubmitButton.textContent = "Upload Guru";
            guruCancelEditButton.classList.add("hidden");
        });

        function tampilkanKepala() {
            const kepalaListContainer = document.getElementById("kepala-list");
            kepalaListContainer.innerHTML = kepalaList.map((kepala, index) => `
                <div class="bg-gray-50 p-4 rounded-lg shadow mb-4">
                    <h3 class="text-xl font-bold">${kepala.nama}</h3>
                    <p>${kepala.deskripsi}</p>
                    <img src="${kepala.gambar}" class="w-full h-48 object-cover rounded-lg shadow-md mt-4" alt="${kepala.nama}">
                    <div class="flex justify-end mt-4">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded mr-2" onclick="editKepala(${index})">Edit</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded" onclick="hapusKepala(${index})">Hapus</button>
                    </div>
                </div>
            `).join('');
        }

        function tampilkanGuru() {
            const guruListContainer = document.getElementById("guru-list");
            guruListContainer.innerHTML = guruList.map((guru, index) => `
                <div class="bg-gray-50 p-4 rounded-lg shadow mb-4">
                    <h3 class="text-xl font-bold">${guru.nama}</h3>
                    <p>${guru.deskripsi}</p>
                    <img src="${guru.gambar}" class="w-full h-48 object-cover rounded-lg shadow-md mt-4" alt="${guru.nama}">
                    <div class="flex justify-end mt-4">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded mr-2" onclick="editGuru(${index})">Edit</button>
                        <button class="bg-red-500 text-white px-4 py-2 rounded" onclick="hapusGuru(${index})">Hapus</button>
                    </div>
                </div>
            `).join('');
        }

        function editKepala(index) {
            const kepala = kepalaList[index];
            document.getElementById("nama-kepala").value = kepala.nama;
            document.getElementById("deskripsi-kepala").value = kepala.deskripsi;
            kepalaPreview.src = kepala.gambar;
            kepalaPreview.classList.remove("hidden");
            kepalaEditIndex = index;
            kepalaSubmitButton.textContent = "Edit Kepala Sekolah";
            kepalaCancelEditButton.classList.remove("hidden");
        }

        window.hapusKepala = function(index) {
            kepalaList.splice(index, 1);
            localStorage.setItem("kepala", JSON.stringify(kepalaList));
            tampilkanKepala();
            showAlert('Kepala Sekolah berhasil dihapus.', 'success');
        }

        window.editGuru = function(index) {
            const guru = guruList[index];
            document.getElementById("nama-guru").value = guru.nama;
            document.getElementById("deskripsi-guru").value = guru.deskripsi;
            guruPreview.src = guru.gambar;
            guruPreview.classList.remove("hidden");
            guruEditIndex = index;
            guruSubmitButton.textContent = "Edit Guru";
            guruCancelEditButton.classList.remove("hidden");
        }

        window.hapusGuru = function(index) {
            guruList.splice(index, 1);
            localStorage.setItem("guru", JSON.stringify(guruList));
            tampilkanGuru();
            showAlert('Guru berhasil dihapus.', 'success');
        }

        function showAlert(message, type) {
            const alertBox = document.createElement("div");
            alertBox.className = `alert alert-${type} alert-dismissible fade show fixed-top m-3 small-alert`;
            alertBox.role = "alert";
            alertBox.innerHTML = `${message}`;
            document.body.appendChild(alertBox);
            setTimeout(() => {
                alertBox.classList.remove("show");
                setTimeout(() => alertBox.remove(), 150);
            }, 1000);
        }

        tampilkanKepala();
        tampilkanGuru();
    }
};

export default Dashboard_Profile;