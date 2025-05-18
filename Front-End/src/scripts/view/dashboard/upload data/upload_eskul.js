import MenuDashboard from '../../menu/menu_dashboard';

const UploadEkstraKurikuler = {
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
                    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Unggah Ekstrakurikuler Baru</h1>
                    <form id="upload-form-ekskul" class="space-y-6">
                        <div class="space-y-2">
                            <label for="gambar-ekskul" class="block text-sm font-semibold text-gray-700">Tambah Foto</label>
                            <div class="flex items-center gap-4">
                                <input type="file" id="gambar-ekskul" accept="image/*" class="hidden">
                                <label for="gambar-ekskul" class="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors">
                                    Pilih File
                                </label>
                                <span id="file-name-ekskul" class="text-gray-500 text-sm">No file chosen</span>
                            </div>
                            <img id="preview-ekskul" class="mt-4 hidden w-48 h-48 object-cover rounded-lg shadow-md" style="max-height: 200px; max-width: 200px;" alt="Preview Image">
                        </div>
                        <div class="space-y-2">
                            <label for="nama-ekskul" class="block text-sm font-semibold text-gray-700">Nama Ekstrakurikuler</label>
                            <input type="text" id="nama-ekskul" placeholder="Tambahkan nama ekstrakurikuler" class="w-2/3 px-4 py-2 border border-black rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none">
                        </div>
                        <div class="space-y-2">
                            <label for="deskripsi-ekskul" class="block text-sm font-semibold text-gray-700">Deskripsi Ekstrakurikuler</label>
                            <textarea id="deskripsi-ekskul" placeholder="Tambahkan deskripsi ekstrakurikuler" class="w-2/3 px-4 py-2 border border-black rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none" rows="6"></textarea>
                        </div>
                        <div class="mt-6">
                            <button type="submit" id="submit-button-ekskul" class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Tambah
                            </button>
                            <button type="button" id="cancel-edit-ekskul" class="hidden bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 mt-3">
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
        const form = document.getElementById("upload-form-ekskul");
        const namaInput = document.getElementById("nama-ekskul");
        const deskripsiInput = document.getElementById("deskripsi-ekskul");
        const gambarInput = document.getElementById("gambar-ekskul");
        const fileNameDisplay = document.getElementById("file-name-ekskul");
        const preview = document.getElementById("preview-ekskul");
        const submitButton = document.getElementById("submit-button-ekskul");
        const cancelEditButton = document.getElementById("cancel-edit-ekskul");

        let ekskulList = JSON.parse(localStorage.getItem("ekstrakurikuler")) || [];
        let editIndexEkskul = localStorage.getItem('editIndexEkskul');
        let editDataEkskul = localStorage.getItem('editEkskul');

        // Cek apakah ada data untuk diedit
        if (editDataEkskul) {
            editDataEkskul = JSON.parse(editDataEkskul);
            namaInput.value = editDataEkskul.nama;
            deskripsiInput.value = editDataEkskul.deskripsi;
            preview.src = editDataEkskul.gambar;
            preview.classList.remove("hidden");
            fileNameDisplay.textContent = 'Gambar sebelumnya';
            submitButton.textContent = "Simpan Perubahan";
            cancelEditButton.classList.remove("hidden");
            localStorage.removeItem('editEkskul'); // Hapus data edit setelah digunakan
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
            const nama = namaInput.value.trim();
            const deskripsi = deskripsiInput.value.trim();
            const tanggal = new Date().toLocaleDateString();
            const gambarFile = gambarInput.files[0];
            let gambarSrc = preview.src; 

            if (!nama) {
                showAlert('Nama ekstrakurikuler wajib diisi.', 'warning');
                return;
            }

            if (!deskripsi) {
                showAlert('Deskripsi ekstrakurikuler wajib diisi.', 'warning');
                return;
            }

            if (gambarFile) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    gambarSrc = e.target.result;
                    prosesSimpanEkskul(nama, deskripsi, tanggal, gambarSrc);
                };
                reader.readAsDataURL(gambarFile);
            } else {
                prosesSimpanEkskul(nama, deskripsi, tanggal, gambarSrc);
            }
        });

        function prosesSimpanEkskul(nama, deskripsi, tanggal, gambarSrc) {
            if (editIndexEkskul !== null && editIndexEkskul !== undefined) {
                ekskulList[parseInt(editIndexEkskul)] = { nama, deskripsi, tanggal, gambar: gambarSrc };
                localStorage.setItem("ekstrakurikuler", JSON.stringify(ekskulList));
                showAlert('Ekstrakurikuler berhasil diperbarui.', 'success');
                localStorage.removeItem('editIndexEkskul');
                editIndexEkskul = null;
                submitButton.textContent = "Tambah";
                cancelEditButton.classList.add("hidden");
                form.reset();
                fileNameDisplay.textContent = "No file chosen";
                preview.classList.add("hidden");
                window.location.hash = '#/dashboard_kurikuler';
            } else {
                if (!ekskulList.some(ekskul => ekskul.nama === nama && ekskul.tanggal === tanggal)) {
                    const newEkskul = { nama, deskripsi, tanggal, gambar: gambarSrc };
                    ekskulList.push(newEkskul);
                    try {
                        localStorage.setItem("ekstrakurikuler", JSON.stringify(ekskulList));
                    } catch (e) {
                        if (e.name === 'QuotaExceededError') {
                            showAlert('Storage limit exceeded. Please delete some items.', 'danger');
                        }
                    }
                    form.reset();
                    fileNameDisplay.textContent = "No file chosen";
                    preview.classList.add("hidden");
                    showAlert('Ekstrakurikuler berhasil diunggah.', 'success');
                    window.location.hash = '#/dashboard_kurikuler';
                } else {
                    showAlert('Ekstrakurikuler dengan nama dan tanggal yang sama sudah ada.', 'warning');
                }
            }
        }

        cancelEditButton.addEventListener("click", function () {
            localStorage.removeItem('editIndexEkskul');
            editIndexEkskul = null;
            submitButton.textContent = "Tambah";
            cancelEditButton.classList.add("hidden");
            form.reset();
            fileNameDisplay.textContent = "No file chosen";
            preview.classList.add("hidden");
            window.location.hash = '#/dashboard_kurikuler';
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

export default UploadEkstraKurikuler;