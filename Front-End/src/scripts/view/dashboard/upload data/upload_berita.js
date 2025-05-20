import MenuDashboard from '../../menu/menu_dashboard';

const UploadBerita = {
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
                    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6" id="form-title">Upload Berita Baru</h1>
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
                            <label for="judul" class="block text-sm font-semibold text-gray-700">Tambah Judul Berita</label>
                            <input type="text" id="judul" placeholder="Tambahkan judul berita" class="w-2/3 px-4 py-2 border border-black rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none">
                        </div>
                        <div class="space-y-2">
                            <label for="deskripsi" class="block text-sm font-semibold text-gray-700">Tambah Isi Berita</label>
                            <textarea id="deskripsi" placeholder="Tambahkan isi berita" class="w-2/3 px-4 py-2 border border-black rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none" rows="6"></textarea>
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
        const formTitle = document.getElementById("form-title"); // Get the form title
        const judulInput = document.getElementById("judul");
        const deskripsiInput = document.getElementById("deskripsi");
        const gambarInput = document.getElementById("gambar");
        const fileNameDisplay = document.getElementById("file-name");
        const preview = document.getElementById("preview");
        const submitButton = document.getElementById("submit-button");
        const cancelEditButton = document.getElementById("cancel-edit");

        // Use a variable to store edit data, not directly remove from localStorage
        let currentEditData = null; 
        const storedEditData = localStorage.getItem('editBerita');

        // Cek apakah ada data untuk diedit
        if (storedEditData) {
            currentEditData = JSON.parse(storedEditData);
            formTitle.textContent = "Edit Berita"; // Change title for edit mode
            judulInput.value = currentEditData.judul;
            deskripsiInput.value = currentEditData.deskripsi;
            // FIX: Prepend base URL for preview
            preview.src = `http://localhost:5000${currentEditData.gambar}`;
            preview.classList.remove("hidden");
            fileNameDisplay.textContent = 'Gambar sebelumnya';
            submitButton.textContent = "Simpan Perubahan";
            cancelEditButton.classList.remove("hidden");
            // Do NOT remove from localStorage here. We need it in the submit handler.
        } else {
            formTitle.textContent = "Upload Berita Baru"; // Default title for new upload
            submitButton.textContent = "Tambah";
            cancelEditButton.classList.add("hidden"); // Ensure hidden for new upload
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
                // If user clears the file selection during edit, and there was an old image,
                // re-display the old image in preview. This requires a specific interaction
                // or just leave it blank if no new file. For simplicity, we just hide the preview.
                // If you want to retain old image for preview until new one selected,
                // you'd need more complex state management.
            }
        });

        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            const judul = judulInput.value.trim();
            const deskripsi = deskripsiInput.value.trim();
            const gambarFile = gambarInput.files[0];
            let formData = new FormData();
            formData.append('judul', judul);
            formData.append('deskripsi', deskripsi);

            // Conditional logic for image handling
            if (gambarFile) {
                // New image selected
                formData.append('gambar', gambarFile);
            } else if (currentEditData && currentEditData.gambar) {
                // No new image, but there was an old image (in edit mode)
                // Send the path of the old image so backend knows to keep it
                formData.append('gambarLama', currentEditData.gambar);
            } else {
                // No image selected for a new post OR no image for an update
                // You might want to add a validation here if image is mandatory for new posts
                // For now, it proceeds without an image.
            }

            try {
                const baseUrl = 'http://localhost:5000';
                // Determine URL and Method based on whether we are editing (currentEditData._id exists)
                const url = currentEditData && currentEditData._id
                    ? `${baseUrl}/api/dashboardUploadBerita/${currentEditData._id}`
                    : `${baseUrl}/api/dashboardUploadBerita`;
                const method = currentEditData && currentEditData._id ? 'PUT' : 'POST';

                const response = await fetch(url, {
                    method: method,
                    body: formData,
                });

                const data = await response.json();

                if (response.ok) {
                    showAlert(data.message || `Berita berhasil ${method === 'PUT' ? 'diperbarui' : 'diupload'}.`, 'success');
                    form.reset();
                    fileNameDisplay.textContent = "No file chosen";
                    preview.classList.add("hidden");
                    
                    // Clear localStorage and reset state only AFTER successful submission
                    localStorage.removeItem('editBerita');
                    currentEditData = null; // Reset edit state
                    formTitle.textContent = "Upload Berita Baru"; // Reset title
                    submitButton.textContent = "Tambah";
                    cancelEditButton.classList.add("hidden");
                    window.location.hash = '#/dashboard_berita'; // Redirect to dashboard
                } else {
                    showAlert(data.message || 'Terjadi kesalahan saat mengupload berita.', 'danger');
                }
            } catch (error) {
                console.error("Error uploading data:", error);
                showAlert('Terjadi kesalahan jaringan.', 'danger');
            }
        });

        cancelEditButton.addEventListener("click", function () {
            // Clear localStorage and reset state on cancellation
            localStorage.removeItem('editBerita');
            currentEditData = null; // Reset edit state
            formTitle.textContent = "Upload Berita Baru"; // Reset title
            submitButton.textContent = "Tambah";
            cancelEditButton.classList.add("hidden");
            form.reset();
            fileNameDisplay.textContent = "No file chosen";
            preview.classList.add("hidden");
            window.location.hash = '#/dashboard_berita'; // Redirect to dashboard
        });

        function showAlert(message, type) {
            // Hapus alert sebelumnya jika masih ada
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
    },
};

export default UploadBerita;