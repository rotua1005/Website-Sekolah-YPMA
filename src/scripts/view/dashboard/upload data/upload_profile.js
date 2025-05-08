import MenuDashboard from '../../menu/menu_dashboard';

const Upload_Profile = {
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
                    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Upload Profile</h1>
                    <form id="upload-form" class="space-y-6">
                        <div class="space-y-2">
                            <label for="foto" class="block text-sm font-semibold text-gray-700">Upload Foto</label>
                            <div class="flex items-center gap-4">
                                <input type="file" id="foto" accept="image/*" class="hidden">
                                <label for="foto" class="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors">
                                    Pilih File
                                </label>
                                <span id="file-name" class="text-gray-500 text-sm">No file chosen</span>
                            </div>
                            <img id="preview" class="mt-4 hidden w-48 h-48 object-cover rounded-lg shadow-md" style="max-height: 200px; max-width: 200px;" alt="Preview Image">
                        </div>
                        <div class="space-y-2">
                            <label for="jabatan" class="block text-sm font-semibold text-gray-700">Jabatan</label>
                            <select id="jabatan" class="w-2/3 px-4 py-2 border border-black rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none">
                                <option value="" disabled selected>Pilih Jabatan</option>
                                <option value="Kepala Sekolah">Kepala Sekolah</option>
                                <option value="Guru">Guru</option>
                                <option value="Tata Usaha">Tata Usaha</option>
                            </select>
                        </div>
                        <div id="mata-pelajaran-container" class="hidden space-y-2">
                            <label for="mata_pelajaran" class="block text-sm font-semibold text-gray-700">Mata Pelajaran</label>
                            <input type="text" id="mata_pelajaran" class="w-2/3 px-4 py-2 border border-black rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none">
                        </div>
                        <div class="space-y-2">
                            <label for="nama" class="block text-sm font-semibold text-gray-700">Nama</label>
                            <input type="text" id="nama" placeholder="Tambahkan nama" class="w-2/3 px-4 py-2 border border-black rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none">
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
        const jabatanSelect = document.getElementById("jabatan");
        const mataPelajaranContainer = document.getElementById("mata-pelajaran-container");
        const mataPelajaranInput = document.getElementById("mata_pelajaran");
        const fotoInput = document.getElementById("foto");
        const fileNameDisplay = document.getElementById("file-name");
        const preview = document.getElementById("preview");
        const namaInput = document.getElementById("nama");
        const submitButton = document.getElementById("submit-button");
        const cancelEditButton = document.getElementById("cancel-edit");

        let profileList = JSON.parse(localStorage.getItem("profile")) || [];
        let editIndex = localStorage.getItem('editIndexProfile');
        let editData = localStorage.getItem('editProfile');

        if (editData) {
            editData = JSON.parse(editData);
            jabatanSelect.value = editData.jabatan;
            namaInput.value = editData.nama;
            preview.src = editData.foto;
            preview.classList.remove("hidden");
            fileNameDisplay.textContent = 'Gambar sebelumnya';
            if (editData.jabatan === "Guru" && editData.mata_pelajaran) {
                mataPelajaranContainer.classList.remove("hidden");
                mataPelajaranInput.value = editData.mata_pelajaran;
            }
            submitButton.textContent = "Simpan Perubahan";
            cancelEditButton.classList.remove("hidden");
            localStorage.removeItem('editProfile');
        }

        fotoInput.addEventListener("change", function () {
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

        jabatanSelect.addEventListener("change", function () {
            if (this.value === "Guru") {
                mataPelajaranContainer.classList.remove("hidden");
                mataPelajaranInput.setAttribute("required", "");
            } else {
                mataPelajaranContainer.classList.add("hidden");
                mataPelajaranInput.removeAttribute("required");
                mataPelajaranInput.value = "";
            }
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const jabatan = jabatanSelect.value;
            const nama = namaInput.value.trim();
            const fotoFile = fotoInput.files[0];
            const mataPelajaran = mataPelajaranInput.value.trim();
            let fotoSrc = preview.src;

            if (!jabatan || !nama || (!fotoFile && !fotoSrc)) {
                showAlert('Semua field wajib diisi.', 'warning');
                return;
            }

            if (fotoFile) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    fotoSrc = e.target.result;
                    simpanProfile(jabatan, nama, fotoSrc, mataPelajaran);
                };
                reader.readAsDataURL(fotoFile);
            } else {
                simpanProfile(jabatan, nama, fotoSrc, mataPelajaran);
            }
        });

        function simpanProfile(jabatan, nama, fotoSrc, mataPelajaran) {
            const newProfile = { jabatan, nama, foto: fotoSrc };
            if (jabatan === "Guru") {
                newProfile.mata_pelajaran = mataPelajaran;
            }

            if (editIndex !== null && editIndex !== undefined) {
                profileList[parseInt(editIndex)] = newProfile;
                localStorage.setItem("profile", JSON.stringify(profileList));
                showAlert(`Profile ${jabatan} berhasil diperbarui.`, 'success');
                localStorage.removeItem('editIndexProfile');
                editIndex = null;
                submitButton.textContent = "Tambah";
                cancelEditButton.classList.add("hidden");
            } else {
                if (jabatan === "Kepala Sekolah" && profileList.some(p => p.jabatan === "Kepala Sekolah")) {
                    showAlert('Profile Kepala Sekolah sudah ada.', 'warning');
                    return;
                }
                profileList.push(newProfile);
                localStorage.setItem("profile", JSON.stringify(profileList));
                showAlert(`Profile ${jabatan} berhasil diupload.`, 'success');
            }
            form.reset();
            fileNameDisplay.textContent = "No file chosen";
            preview.classList.add("hidden");
            mataPelajaranContainer.classList.add("hidden");
            mataPelajaranInput.value = "";
            window.location.hash = '#/dashboard_profile';
        }

        cancelEditButton.addEventListener("click", function () {
            localStorage.removeItem('editIndexProfile');
            editIndex = null;
            submitButton.textContent = "Tambah";
            cancelEditButton.classList.add("hidden");
            form.reset();
            fileNameDisplay.textContent = "No file chosen";
            preview.classList.add("hidden");
            mataPelajaranContainer.classList.add("hidden");
            mataPelajaranInput.value = "";
            window.location.hash = '#/dashboard_profile';
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

export default Upload_Profile;