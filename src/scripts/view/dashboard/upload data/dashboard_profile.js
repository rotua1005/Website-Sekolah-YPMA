import MenuDashboard from '../../menu/menu_dashboard';

const Dashboard_Profile = {
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
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <form id="upload-form-kepala" class="space-y-6 bg-gray-50 p-6 rounded-lg shadow">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4">Kepala Sekolah</h2>
                            <div>
                                <label class="block font-semibold text-lg text-gray-700">Jabatan</label>
                                <input type="text" id="jabatan-kepala" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" required>
                            </div>
                            <div>
                                <label class="block font-semibold text-lg text-gray-700">Nama</label>
                                <input type="text" id="nama-kepala" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" required>
                            </div>
                            <div>
                                <label class="block font-semibold text-lg text-gray-700">Upload Foto</label>
                                <input type="file" id="foto-kepala" accept="image/*" class="w-full p-3 border rounded-lg" required>
                                <img id="preview-kepala" class="mt-4 hidden w-full h-48 object-cover rounded-lg shadow-md" alt="Preview Image">
                            </div>
                            <button type="submit" id="submit-button-kepala" class="w-full bg-green-600 text-white p-3 rounded-lg text-xl font-semibold hover:bg-green-700 transition-all shadow">Upload Profile</button>
                            <button type="button" id="cancel-edit-kepala" class="hidden w-full bg-gray-500 text-white p-3 rounded-lg text-xl font-semibold hover:bg-gray-600 transition-all shadow">Batal</button>
                        </form>

                        <form id="upload-form-guru" class="space-y-6 bg-gray-50 p-6 rounded-lg shadow">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4">Guru</h2>
                            <div>
                                <label class="block font-semibold text-lg text-gray-700">Jabatan</label>
                                <input type="text" id="jabatan-guru" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" required>
                            </div>
                            <div>
                                <label class="block font-semibold text-lg text-gray-700">Nama</label>
                                <input type="text" id="nama-guru" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" required>
                            </div>
                            <div>
                                <label class="block font-semibold text-lg text-gray-700">Upload Foto</label>
                                <input type="file" id="foto-guru" accept="image/*" class="w-full p-3 border rounded-lg" required>
                                <img id="preview-guru" class="mt-4 hidden w-full h-48 object-cover rounded-lg shadow-md" alt="Preview Image">
                            </div>
                            <button type="submit" id="submit-button-guru" class="w-full bg-green-600 text-white p-3 rounded-lg text-xl font-semibold hover:bg-green-700 transition-all shadow">Upload Profile</button>
                            <button type="button" id="cancel-edit-guru" class="hidden w-full bg-gray-500 text-white p-3 rounded-lg text-xl font-semibold hover:bg-gray-600 transition-all shadow">Batal</button>
                        </form>
                    </div>
                    <div class="mt-6">
                        <input type="text" id="search" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" placeholder="Cari profile...">
                    </div>
                    <div id="profile-list" class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
                </main>
            </div>
        </div>
        `;
    },

    async afterRender() {
        MenuDashboard.afterRender();
        const formKepala = document.getElementById("upload-form-kepala");
        const previewKepala = document.getElementById("preview-kepala");
        const submitButtonKepala = document.getElementById("submit-button-kepala");
        const cancelEditButtonKepala = document.getElementById("cancel-edit-kepala");

        const formGuru = document.getElementById("upload-form-guru");
        const previewGuru = document.getElementById("preview-guru");
        const submitButtonGuru = document.getElementById("submit-button-guru");
        const cancelEditButtonGuru = document.getElementById("cancel-edit-guru");

        const searchInput = document.getElementById("search");
        let profileList = JSON.parse(localStorage.getItem("profile")) || [];
        let editIndex = null;

        formKepala.addEventListener("submit", function (event) {
            event.preventDefault();
            handleFormSubmit("kepala");
        });

        formGuru.addEventListener("submit", function (event) {
            event.preventDefault();
            handleFormSubmit("guru");
        });

        document.getElementById("foto-kepala").addEventListener("change", function() {
            handleFileChange(this, previewKepala);
        });

        document.getElementById("foto-guru").addEventListener("change", function() {
            handleFileChange(this, previewGuru);
        });

        cancelEditButtonKepala.addEventListener("click", function() {
            handleCancelEdit("kepala");
        });

        cancelEditButtonGuru.addEventListener("click", function() {
            handleCancelEdit("guru");
        });

        searchInput.addEventListener("input", function() {
            tampilkanProfile(this.value);
        });

        function handleFormSubmit(type) {
            const jabatan = document.getElementById(`jabatan-${type}`).value;
            const nama = document.getElementById(`nama-${type}`).value;
            const foto = document.getElementById(`foto-${type}`).files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const fotoSrc = e.target.result;
                if (editIndex === null) {
                    if (!profileList.some(profile => profile.nama === nama && profile.jabatan === jabatan)) {
                        profileList.push({ jabatan, nama, foto: fotoSrc });
                        try {
                            localStorage.setItem("profile", JSON.stringify(profileList));
                        } catch (e) {
                            if (e.name === 'QuotaExceededError') {
                                showAlert('Storage limit exceeded. Please delete some items.', 'danger');
                            }
                        }
                        document.getElementById(`upload-form-${type}`).reset();
                        document.getElementById(`preview-${type}`).classList.add("hidden");
                        tampilkanProfile();
                        showAlert('Profile berhasil diupload.', 'success');
                    } else {
                        showAlert('Profile sudah ada.', 'warning');
                    }
                } else {
                    profileList[editIndex] = { jabatan, nama, foto: fotoSrc };
                    localStorage.setItem("profile", JSON.stringify(profileList));
                    document.getElementById(`upload-form-${type}`).reset();
                    document.getElementById(`preview-${type}`).classList.add("hidden");
                    tampilkanProfile();
                    showAlert('Profile berhasil diedit.', 'success');
                    editIndex = null;
                    document.getElementById(`submit-button-${type}`).textContent = "Upload Profile";
                    document.getElementById(`cancel-edit-${type}`).classList.add("hidden");
                }
            };
            reader.readAsDataURL(foto);
        }

        function handleFileChange(input, preview) {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.classList.remove("hidden");
                };
                reader.readAsDataURL(file);
            }
        }

        function handleCancelEdit(type) {
            document.getElementById(`upload-form-${type}`).reset();
            document.getElementById(`preview-${type}`).classList.add("hidden");
            editIndex = null;
            document.getElementById(`submit-button-${type}`).textContent = "Upload Profile";
            document.getElementById(`cancel-edit-${type}`).classList.add("hidden");
        }

        function tampilkanProfile(searchTerm = "") {
            const filteredProfile = profileList.filter(profile => profile.nama.toLowerCase().includes(searchTerm.toLowerCase()));
            const profileListContainer = document.getElementById("profile-list");
            profileListContainer.innerHTML = filteredProfile.map((profile, index) => {
                return `
                <div class="profile-item p-4 border rounded-lg shadow-lg">
                    <h3 class="text-xl font-bold">${profile.jabatan}</h3>
                    <p class="text-gray-700">${profile.nama}</p>
                    <img src="${profile.foto}" alt="${profile.nama}" class="w-full h-32 object-cover rounded-lg mt-2">
                    <div class="mt-4 flex justify-between space-x-1">
                        <button class="edit-btn bg-yellow-500 text-white p-2 rounded" data-index="${index}">Edit</button>
                        <button class="hapus-btn bg-red-500 text-white p-2 rounded" data-index="${index}">Hapus</button>
                    </div>
                </div>
                `;
            }).join("");

            if (filteredProfile.length === 0) {
                profileListContainer.innerHTML = `<p class="text-center text-gray-500">Tidak ada profile yang ditemukan.</p>`;
            }

            document.querySelectorAll(".edit-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    const profile = profileList[index];
                    if (profile) {
                        const type = profile.jabatan.toLowerCase().includes("kepala") ? "kepala" : "guru";
                        document.getElementById(`jabatan-${type}`).value = profile.jabatan;
                        document.getElementById(`nama-${type}`).value = profile.nama;
                        document.getElementById(`preview-${type}`).src = profile.foto;
                        document.getElementById(`preview-${type}`).classList.remove("hidden");
                        editIndex = index;
                        document.getElementById(`submit-button-${type}`).textContent = "Edit Data";
                        document.getElementById(`cancel-edit-${type}`).classList.remove("hidden");
                        showAlert('Profile siap untuk diedit.', 'info');
                    }
                });
            });

            document.querySelectorAll(".hapus-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    profileList.splice(index, 1);
                    localStorage.setItem("profile", JSON.stringify(profileList));
                    tampilkanProfile();
                    showAlert('Profile berhasil dihapus.', 'danger');
                });
            });
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

        tampilkanProfile();
    }
};

export default Dashboard_Profile;
