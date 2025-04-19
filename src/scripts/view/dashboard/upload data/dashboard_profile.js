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
                    <form id="upload-form" class="space-y-6 bg-gray-50 p-6 rounded-lg shadow">
                        <div>
                            <label for="jabatan" class="block font-semibold text-lg text-gray-700">Jabatan</label>
                            <select id="jabatan" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" required>
                                <option value="" disabled selected>Pilih Jabatan</option>
                                <option value="Kepala Sekolah">Kepala Sekolah</option>
                                <option value="Guru">Guru</option>
                                <option value="Tata Usaha">Tata Usaha</option>
                            </select>
                        </div>
                        <div id="mata-pelajaran-container" class="hidden">
                            <label for="mata_pelajaran" class="block font-semibold text-lg text-gray-700">Mata Pelajaran</label>
                            <input type="text" id="mata_pelajaran" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300">
                        </div>
                        <div>
                            <label for="nama" class="block font-semibold text-lg text-gray-700">Nama</label>
                            <input type="text" id="nama" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" required>
                        </div>
                        <div>
                            <label for="foto" class="block font-semibold text-lg text-gray-700">Upload Foto</label>
                            <input type="file" id="foto" accept="image/*" class="w-full p-3 border rounded-lg" required>
                            <img id="preview" class="mt-4 hidden w-full h-48 object-cover rounded-lg shadow-md" alt="Preview Image">
                        </div>
                        <button type="submit" id="submit-button" class="w-full bg-green-600 text-white p-3 rounded-lg text-xl font-semibold hover:bg-green-700 transition-all shadow">Upload Profile</button>
                        <button type="button" id="cancel-edit" class="hidden w-full bg-gray-500 text-white p-3 rounded-lg text-xl font-semibold hover:bg-gray-600 transition-all shadow">Batal</button>
                    </form>
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
        const form = document.getElementById("upload-form");
        const preview = document.getElementById("preview");
        const submitButton = document.getElementById("submit-button");
        const cancelButton = document.getElementById("cancel-edit"); // Perbaikan nama variabel
        const searchInput = document.getElementById("search");
        const jabatanSelect = document.getElementById("jabatan");
        const mataPelajaranContainer = document.getElementById("mata-pelajaran-container");
        const mataPelajaranInput = document.getElementById("mata_pelajaran");

        let profileList = JSON.parse(localStorage.getItem("profile")) || [];
        let editIndex = null;

        mataPelajaranContainer.classList.add("hidden");

        jabatanSelect.addEventListener("change", function() {
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
            handleFormSubmit();
        });

        document.getElementById("foto").addEventListener("change", function() {
            handleFileChange(this, preview);
        });

        cancelButton.addEventListener("click", function() {
            handleCancelEdit();
        });

        searchInput.addEventListener("input", function() {
            tampilkanProfile(this.value);
        });

        function handleFormSubmit() {
            const jabatan = document.getElementById("jabatan").value;
            const nama = document.getElementById("nama").value;
            const foto = document.getElementById("foto").files[0];
            const mataPelajaran = document.getElementById("mata_pelajaran").value;
            const reader = new FileReader();

            reader.onload = function(e) {
                const fotoSrc = e.target.result;
                const newProfile = { jabatan, nama, foto: fotoSrc };
                if (jabatan === "Guru") {
                    newProfile.mata_pelajaran = mataPelajaran;
                }

                let storedProfiles = JSON.parse(localStorage.getItem("profile")) || [];

                if (editIndex === null) {
                    if (jabatan === "Kepala Sekolah") {
                        if (!storedProfiles.some(profile => profile.jabatan === "Kepala Sekolah")) {
                            storedProfiles.push(newProfile);
                            localStorage.setItem("profile", JSON.stringify(storedProfiles));
                            resetForm();
                            tampilkanProfile();
                            showAlert('Profile Kepala Sekolah berhasil diupload.', 'success');
                        } else {
                            showAlert('Profile Kepala Sekolah sudah ada. Tidak dapat mengupload lebih dari satu.', 'warning');
                        }
                    } else {
                        storedProfiles.push(newProfile);
                        localStorage.setItem("profile", JSON.stringify(storedProfiles));
                        resetForm();
                        tampilkanProfile();
                        showAlert(`Profile ${jabatan} berhasil diupload.`, 'success');
                    }
                } else {
                    storedProfiles[editIndex] = newProfile;
                    localStorage.setItem("profile", JSON.stringify(storedProfiles));
                    resetForm();
                    tampilkanProfile();
                    showAlert(`Profile ${jabatan} berhasil diedit.`, 'success');
                    editIndex = null;
                    submitButton.textContent = "Upload Profile";
                    cancelButton.classList.add("hidden");
                }
                profileList = JSON.parse(localStorage.getItem("profile")) || [];
                tampilkanProfile();
            };
            reader.readAsDataURL(foto);
        }

        function resetForm() {
            form.reset();
            preview.classList.add("hidden");
            mataPelajaranContainer.classList.add("hidden");
            mataPelajaranInput.value = "";
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

        function handleCancelEdit() {
            resetForm();
            editIndex = null;
            submitButton.textContent = "Upload Profile";
            cancelButton.classList.add("hidden");
        }

        function tampilkanProfile(searchTerm = "") {
            const filteredProfile = profileList.filter(profile => profile.nama.toLowerCase().includes(searchTerm.toLowerCase()));
            const profileListContainer = document.getElementById("profile-list");
            profileListContainer.innerHTML = filteredProfile.map((profile, index) => {
                let detailTambahan = '';
                if (profile.mata_pelajaran) {
                    detailTambahan = `<p class="text-gray-600 text-sm mt-1">Mata Pelajaran: ${profile.mata_pelajaran}</p>`;
                }
                return `
                    <div class="profile-item p-4 border rounded-lg shadow-lg">
                        <h3 class="text-xl font-bold">${profile.jabatan}</h3>
                        <p class="text-gray-700">${profile.nama}</p>
                        ${detailTambahan}
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
                        document.getElementById("jabatan").value = profile.jabatan;
                        document.getElementById("nama").value = profile.nama;
                        document.getElementById("preview").src = profile.foto;
                        document.getElementById("preview").classList.remove("hidden");
                        editIndex = index;
                        submitButton.textContent = "Edit Data";
                        cancelButton.classList.remove("hidden");
                        if (profile.jabatan === "Guru" && profile.mata_pelajaran) {
                            mataPelajaranContainer.classList.remove("hidden");
                            mataPelajaranInput.value = profile.mata_pelajaran;
                            mataPelajaranInput.setAttribute("required", "");
                        } else {
                            mataPelajaranContainer.classList.add("hidden");
                            mataPelajaranInput.value = "";
                            mataPelajaranInput.removeAttribute("required");
                        }
                        showAlert('Profile siap untuk diedit.', 'info');
                    }
                });
            });

            document.querySelectorAll(".hapus-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    const profileToDelete = profileList[index];
                    if (profileToDelete.jabatan === "Kepala Sekolah" && profileList.filter(p => p.jabatan === "Kepala Sekolah").length === 1) {
                        const confirmDelete = confirm("Apakah Anda yakin ingin menghapus profile Kepala Sekolah? Ini adalah satu-satunya profile dengan jabatan ini.");
                        if (confirmDelete) {
                            profileList.splice(index, 1);
                            localStorage.setItem("profile", JSON.stringify(profileList));
                            tampilkanProfile();
                            showAlert('Profile Kepala Sekolah berhasil dihapus.', 'danger');
                        }
                    } else {
                        profileList.splice(index, 1);
                        localStorage.setItem("profile", JSON.stringify(profileList));
                        tampilkanProfile();
                        showAlert('Profile berhasil dihapus.', 'danger');
                    }
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