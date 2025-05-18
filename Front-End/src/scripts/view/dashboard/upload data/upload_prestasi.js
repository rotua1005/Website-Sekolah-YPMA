import MenuDashboard from '../../menu/menu_dashboard';

const UploadPrestasi = {
    async render() {
        return `
        <div class="dashboard-container bg-gray-100 min-h-screen flex">
            ${MenuDashboard.render()}
            <div class="dashboard-main flex-1 p-8">
                <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                    <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                </header>

                <main class="bg-white shadow-lg rounded-lg p-6">
                    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Upload Prestasi Baru</h1>
                    <form id="upload-form" class="space-y-6">
                        <div class="space-y-2">
                            <label for="gambar" class="block text-sm font-semibold text-gray-700">Tambah Foto</label>
                            <div class="flex items-center gap-4">
                                <input type="file" id="gambar" accept="image/*" class="hidden">
                                <label for="gambar" class="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors">
                                    Pilih File
                                </label>
                                <span id="file-name" class="text-gray-500 text-sm">No file chosen</span>
                            </div>
                            <img id="preview" class="mt-4 hidden w-48 h-48 object-cover rounded-lg shadow-md" style="max-height: 200px; max-width: 200px;" alt="Preview Image">
                        </div>
                        <div class="space-y-2">
                            <label for="nama_ekstra" class="block text-sm font-semibold text-gray-700">Nama Ekstrakurikuler</label>
                            <input type="text" id="nama_ekstra" placeholder="Masukkan nama ekstrakurikuler" class="w-2/3 px-4 py-2 border border-black rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none">
                        </div>
                        <div class="space-y-2">
                            <label for="judul" class="block text-sm font-semibold text-gray-700">Judul Prestasi</label>
                            <input type="text" id="judul" placeholder="Tambahkan judul prestasi" class="w-2/3 px-4 py-2 border border-black rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none">
                        </div>
                        <div class="space-y-2">
                            <label for="deskripsi" class="block text-sm font-semibold text-gray-700">Deskripsi Prestasi</label>
                            <textarea id="deskripsi" placeholder="Tambahkan deskripsi prestasi" class="w-2/3 px-4 py-2 border border-black rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none" rows="6"></textarea>
                        </div>
                        <div class="mt-6">
                            <button type="submit" id="submit-button" class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Tambah
                            </button>
                            <button type="button" id="cancel-edit" class="hidden bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 mt-3">
                                Batal
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
        `;
    },

    async afterRender() {
        MenuDashboard.afterRender();
        const form = document.getElementById("upload-form");
        const namaEkstraInput = document.getElementById("nama_ekstra");
        const judulInput = document.getElementById("judul");
        const deskripsiInput = document.getElementById("deskripsi");
        const gambarInput = document.getElementById("gambar");
        const gambarLabel = document.querySelector('label[for="gambar"]');
        const fileNameDisplay = document.getElementById("file-name");
        const preview = document.getElementById("preview");
        const submitButton = document.getElementById("submit-button");
        const cancelEditButton = document.getElementById("cancel-edit");

        let prestasiList = JSON.parse(localStorage.getItem("prestasi")) || [];
        let editIndexPrestasi = localStorage.getItem('editIndexPrestasi');
        let editDataPrestasi = localStorage.getItem('editPrestasi');

        // Cek apakah ada data untuk diedit
        if (editDataPrestasi) {
            editDataPrestasi = JSON.parse(editDataPrestasi);
            namaEkstraInput.value = editDataPrestasi.nama_ekstra;
            judulInput.value = editDataPrestasi.judul;
            deskripsiInput.value = editDataPrestasi.deskripsi;
            preview.src = editDataPrestasi.gambar;
            preview.classList.remove("hidden");
            fileNameDisplay.textContent = 'Gambar sebelumnya';
            submitButton.textContent = "Simpan Perubahan";
            cancelEditButton.classList.remove("hidden");
            localStorage.removeItem('editPrestasi'); // Hapus data edit setelah digunakan
        }

        // Function to handle file selection and display file name
        gambarInput.addEventListener("change", function () {
            const file = this.files[0];
            if (file) {
                fileNameDisplay.textContent = file.name;
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result;
                    preview.classList.remove("hidden");
                };
                reader.readAsDataURL(file);
            } else {
                fileNameDisplay.textContent = "No file chosen";
                preview.classList.add("hidden");
            }
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const nama_ekstra = namaEkstraInput.value.trim();
            const judul = judulInput.value.trim();
            const deskripsi = deskripsiInput.value.trim();
            const tanggal = new Date().toLocaleDateString();
            const gambarFile = gambarInput.files[0];
            let gambarSrc = preview.src; // Gunakan gambar yang sudah ada jika tidak ada file baru

            if (!nama_ekstra) {
                showAlert('Nama ekstrakurikuler wajib diisi.', 'warning');
                return;
            }

            if (!judul) {
                showAlert('Judul prestasi wajib diisi.', 'warning');
                return;
            }

            if (!deskripsi) {
                showAlert('Deskripsi prestasi wajib diisi.', 'warning');
                return;
            }

            if (gambarFile) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    gambarSrc = e.target.result;
                    prosesSimpan(nama_ekstra, judul, deskripsi, tanggal, gambarSrc);
                };
                reader.readAsDataURL(gambarFile);
            } else {
                prosesSimpan(nama_ekstra, judul, deskripsi, tanggal, gambarSrc);
            }
        });

        function prosesSimpan(nama_ekstra, judul, deskripsi, tanggal, gambarSrc) {
            if (editIndexPrestasi !== null && editIndexPrestasi !== undefined) {
                prestasiList[parseInt(editIndexPrestasi)] = { nama_ekstra, judul, deskripsi, tanggal, gambar: gambarSrc };
                localStorage.setItem("prestasi", JSON.stringify(prestasiList));
                showAlert('Prestasi berhasil diperbarui.', 'success');
                localStorage.removeItem('editIndexPrestasi');
                editIndexPrestasi = null;
                submitButton.textContent = "Tambah";
                cancelEditButton.classList.add("hidden");
                form.reset();
                fileNameDisplay.textContent = "No file chosen";
                preview.classList.add("hidden");
                window.location.hash = '#/dashboard_prestasi';
            } else {
                if (prestasiList.some(prestasi => prestasi.judul.toLowerCase() === judul.toLowerCase())) {
                    showAlert('Judul prestasi sudah ada. Gunakan judul yang berbeda.', 'warning');
                } else if (!nama_ekstra || !judul || !deskripsi) {
                    showAlert('Semua field wajib diisi.', 'warning');
                } else {
                    const newPrestasi = { nama_ekstra, judul, deskripsi, tanggal, gambar: gambarSrc };
                    prestasiList.push(newPrestasi);
                    try {
                        localStorage.setItem("prestasi", JSON.stringify(prestasiList));
                    } catch (e) {
                        if (e.name === 'QuotaExceededError') {
                            showAlert('Storage limit exceeded. Please delete some items.', 'danger');
                        }
                    }
                    form.reset();
                    fileNameDisplay.textContent = "No file chosen";
                    preview.classList.add("hidden");
                    showAlert('Prestasi berhasil diupload.', 'success');
                    window.location.hash = '#/dashboard_prestasi';
                }
            }
        }

        cancelEditButton.addEventListener("click", function () {
            localStorage.removeItem('editIndexPrestasi');
            editIndexPrestasi = null;
            submitButton.textContent = "Tambah";
            cancelEditButton.classList.add("hidden");
            form.reset();
            fileNameDisplay.textContent = "No file chosen";
            preview.classList.add("hidden");
            window.location.hash = '#/dashboard_prestasi';
        });

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
    }
};

export default UploadPrestasi;