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
                    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6" id="form-title">Upload Profile</h1>
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
                            <input type="text" id="mata_pelajaran" class="w-2/3 px-4 py-2 border border-black rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none" placeholder="Masukkan mata pelajaran">
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
        const formTitle = document.getElementById("form-title");
        const jabatanSelect = document.getElementById("jabatan");
        const mataPelajaranContainer = document.getElementById("mata-pelajaran-container");
        const mataPelajaranInput = document.getElementById("mata_pelajaran");
        const fotoInput = document.getElementById("foto");
        const fileNameDisplay = document.getElementById("file-name");
        const preview = document.getElementById("preview");
        const namaInput = document.getElementById("nama");
        const submitButton = document.getElementById("submit-button");
        const cancelEditButton = document.getElementById("cancel-edit");

        let currentEditData = null;
        const storedEditData = localStorage.getItem('editProfile');

        // Check if there's data for editing
        if (storedEditData) {
            currentEditData = JSON.parse(storedEditData);
            formTitle.textContent = "Edit Profile"; // Change title for edit mode
            jabatanSelect.value = currentEditData.jabatan;
            namaInput.value = currentEditData.nama;
            // Prepend base URL for preview
            preview.src = `http://localhost:5000${currentEditData.foto}`;
            preview.classList.remove("hidden");
            fileNameDisplay.textContent = 'Gambar sebelumnya';
            if (currentEditData.jabatan === "Guru") {
                mataPelajaranContainer.classList.remove("hidden");
                mataPelajaranInput.value = currentEditData.mata_pelajaran || '';
            }
            submitButton.textContent = "Simpan Perubahan";
            cancelEditButton.classList.remove("hidden");
            // Do NOT remove from localStorage here. We need it in the submit handler.
        } else {
            formTitle.textContent = "Upload Profile"; // Default title for new upload
            submitButton.textContent = "Tambah";
            cancelEditButton.classList.add("hidden"); // Ensure hidden for new upload
        }

        // Show/hide mata pelajaran input based on jabatan
        jabatanSelect.addEventListener("change", function () {
            if (this.value === "Guru") {
                mataPelajaranContainer.classList.remove("hidden");
                mataPelajaranInput.setAttribute("required", "");
            } else {
                mataPelajaranContainer.classList.add("hidden");
                mataPelajaranInput.removeAttribute("required");
                mataPelajaranInput.value = ""; // Clear value if not Guru
            }
        });

        // Handle file selection and display file name
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

        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            const jabatan = jabatanSelect.value;
            const nama = namaInput.value.trim();
            const fotoFile = fotoInput.files[0];
            const mataPelajaran = mataPelajaranInput.value.trim();

            let formData = new FormData();
            formData.append('jabatan', jabatan);
            formData.append('nama', nama);
            if (jabatan === "Guru") {
                formData.append('mata_pelajaran', mataPelajaran);
            }

            // Conditional logic for image handling
            if (fotoFile) {
                // New image selected
                formData.append('foto', fotoFile);
            } else if (currentEditData && currentEditData.foto) {
                // No new image, but there was an old image (in edit mode)
                // Send the path of the old image so backend knows to keep it
                formData.append('fotoLama', currentEditData.foto);
            } else {
                // If in edit mode and no new image, and no old image was there,
                // or if it's a new post and no image is uploaded.
                // Backend validation should catch missing required image.
            }

            try {
                const baseUrl = 'http://localhost:5000';
                const url = currentEditData && currentEditData._id
                    ? `${baseUrl}/api/dashboardProfile/${currentEditData._id}`
                    : `${baseUrl}/api/dashboardProfile`;
                const method = currentEditData && currentEditData._id ? 'PUT' : 'POST';

                const response = await fetch(url, {
                    method: method,
                    body: formData,
                });

                const data = await response.json();

                if (response.ok) {
                    showAlert(data.message || `Profile berhasil ${method === 'PUT' ? 'diperbarui' : 'diupload'}.`, 'success');
                    form.reset();
                    fileNameDisplay.textContent = "No file chosen";
                    preview.classList.add("hidden");
                    mataPelajaranContainer.classList.add("hidden");
                    mataPelajaranInput.value = ""; // Clear input for next use

                    // Clear localStorage and reset state only AFTER successful submission
                    localStorage.removeItem('editProfile');
                    currentEditData = null; // Reset edit state
                    formTitle.textContent = "Upload Profile"; // Reset title
                    submitButton.textContent = "Tambah";
                    cancelEditButton.classList.add("hidden");
                    window.location.hash = '#/dashboard_profile'; // Redirect to dashboard
                } else {
                    showAlert(data.message || 'Terjadi kesalahan saat mengupload profile.', 'danger');
                }
            } catch (error) {
                console.error("Error uploading data:", error);
                showAlert('Terjadi kesalahan jaringan.', 'danger');
            }
        });

        cancelEditButton.addEventListener("click", function () {
            // Clear localStorage and reset state on cancellation
            localStorage.removeItem('editProfile');
            currentEditData = null; // Reset edit state
            formTitle.textContent = "Upload Profile"; // Reset title
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
            document.querySelectorAll(".small-alert").forEach(el => el.remove());

            const alertBox = document.createElement("div");
            alertBox.className = `alert alert-${type} alert-dismissible fade show fixed-top m-3 small-alert`;
            alertBox.role = "alert";
            alertBox.style.zIndex = "1050";
            alertBox.style.top = "60px";
            alertBox.innerHTML = `${message}`;
            document.body.appendChild(alertBox);

            setTimeout(() => {
                alertBox.classList.remove("show");
                setTimeout(() => alertBox.remove(), 200); // Allow time for fade out
            }, 2000); // Display for 2 seconds
        }
    }
};

export default Upload_Profile;