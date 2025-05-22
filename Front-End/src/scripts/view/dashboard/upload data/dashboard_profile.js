import MenuDashboard from '../../menu/menu_dashboard';

const Dashboard_Profile = {
    async render() {
        return `
        <div class="dashboard-container bg-gray-100 min-h-screen flex">
            ${MenuDashboard.render()}
            <div class="dashboard-main flex-1 p-8">
                <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                    <button class="btn btn-danger d-flex align-items-center">
                        <i class="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                </header>

                <main class="bg-white shadow-lg rounded-lg p-6">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h1 class="text-3xl font-bold text-gray-800">Kelola Profile</h1>
                        <button id="add-profile-btn" class="btn btn-success d-flex align-items-center">
                            <i class="bi bi-plus-circle me-2"></i> Tambah Profile
                        </button>
                    </div>
                    <div class="mb-4">
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-search"></i></span>
                            <input type="text" id="search" class="form-control" placeholder="Cari profile...">
                        </div>
                    </div>
                    <div id="profile-list" class="row g-3">
                        <p class="text-center text-muted w-100">Memuat profile...</p>
                    </div>
                </main>
            </div>
        </div>
        `;
    },

    async afterRender() {
        MenuDashboard.afterRender();
        const addProfileBtn = document.getElementById("add-profile-btn");
        const searchInput = document.getElementById("search");
        const profileListContainer = document.getElementById("profile-list");
        let profileList = []; // Will store data fetched from API

        async function ambilProfileDariServer() {
            try {
                const response = await fetch('http://localhost:5000/api/dashboardProfile');
                if (!response.ok) throw new Error("Gagal fetch data profile");
                const data = await response.json();
                profileList = data;
                tampilkanProfile();
            } catch (error) {
                console.error("Gagal mengambil data profile:", error);
                profileListContainer.innerHTML = `<p class="text-center text-danger w-100">Gagal mengambil data profile.</p>`;
            }
        }

        addProfileBtn.addEventListener("click", () => {
            // Clear any lingering edit data when navigating to add new
            localStorage.removeItem('editProfile');
            window.location.hash = '#/upload_profile';
        });

        function tampilkanProfile(searchTerm = "") {
            const filteredProfile = profileList.filter(profile =>
                profile.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (profile.mata_pelajaran && profile.mata_pelajaran.toLowerCase().includes(searchTerm.toLowerCase()))
            );

            if (filteredProfile.length === 0) {
                profileListContainer.innerHTML = `<p class="text-center text-muted w-100">Tidak ada profile yang ditemukan.</p>`;
                return;
            }

            profileListContainer.innerHTML = filteredProfile.map(profile => {
                let detailTambahan = '';
                if (profile.jabatan === "Guru" && profile.mata_pelajaran) {
                    detailTambahan = `<p class="text-muted small">Mata Pelajaran: ${profile.mata_pelajaran}</p>`;
                }
                const fotoSrc = profile.foto ? `http://localhost:5000${profile.foto}` : 'path/to/default-profile-image.jpg'; // Adjust default image path

                return `
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="${fotoSrc}" class="card-img-top object-fit-cover" style="height: 200px;" alt="${profile.nama}">
                            <div class="card-body">
                                <h5 class="card-title">${profile.jabatan}</h5>
                                <p class="card-text"><strong>${profile.nama}</strong></p>
                                ${detailTambahan}
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                <button class="btn btn-primary edit-btn" data-id="${profile._id}">
                                    <i class="bi bi-pencil-square"></i> Edit
                                </button>
                                <button class="btn btn-danger hapus-btn" data-id="${profile._id}" data-jabatan="${profile.jabatan}">
                                    <i class="bi bi-trash"></i> Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join("");

            tambahkanEventListener();
        }

        function tambahkanEventListener() {
            document.querySelectorAll(".edit-btn").forEach(button => {
                button.addEventListener("click", async () => {
                    const id = button.getAttribute("data-id");
                    if (!confirm("Apakah Anda yakin ingin mengedit profile ini?")) return;

                    try {
                        const response = await fetch(`http://localhost:5000/api/dashboardProfile/${id}`);
                        if (!response.ok) throw new Error("Gagal mengambil data profile untuk diedit.");
                        const profileToEdit = await response.json();

                        localStorage.setItem('editProfile', JSON.stringify(profileToEdit));
                        window.location.hash = '#/upload_profile';
                    } catch (error) {
                        console.error(error);
                        showAlert("Gagal mengambil data profile untuk diedit.", "danger");
                    }
                });
            });

            document.querySelectorAll(".hapus-btn").forEach(button => {
                button.addEventListener("click", async () => {
                    const id = button.getAttribute("data-id");
                    const jabatan = button.getAttribute("data-jabatan");

                    if (jabatan === "Kepala Sekolah") {
                        const kepalaSekolahCount = profileList.filter(p => p.jabatan === "Kepala Sekolah").length;
                        if (kepalaSekolahCount === 1) {
                            if (!confirm("Ini adalah satu-satunya profile Kepala Sekolah. Apakah Anda yakin ingin menghapusnya?")) {
                                return;
                            }
                        }
                    }

                    if (!confirm("Apakah Anda yakin ingin menghapus profile ini?")) return;

                    try {
                        const response = await fetch(`http://localhost:5000/api/dashboardProfile/${id}`, {
                            method: 'DELETE',
                        });
                        const data = await response.json();
                        if (!response.ok) throw new Error(data.message || "Gagal menghapus profile");

                        showAlert(data.message || 'Profile berhasil dihapus.', 'success');
                        await ambilProfileDariServer(); // Re-fetch and display after deletion
                    } catch (err) {
                        console.error(err);
                        showAlert(err.message || 'Terjadi kesalahan saat menghapus profile.', 'danger');
                    }
                });
            });
        }

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
                setTimeout(() => alertBox.remove(), 200);
            }, 2000);
        }

        await ambilProfileDariServer(); // Initial data fetch

        searchInput.addEventListener("input", () => {
            tampilkanProfile(searchInput.value);
        });
    }
};

export default Dashboard_Profile;