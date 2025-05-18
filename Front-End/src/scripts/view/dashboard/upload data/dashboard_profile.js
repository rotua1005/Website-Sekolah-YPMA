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
        let profileList = JSON.parse(localStorage.getItem("profile")) || [];

        addProfileBtn.addEventListener("click", () => {
            window.location.hash = '#/upload_profile';
        });

        function tampilkanProfile(searchTerm = "") {
            const filteredProfile = profileList.filter(profile =>
                profile.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (profile.mata_pelajaran && profile.mata_pelajaran.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            const profileListContainer = document.getElementById("profile-list");
            profileListContainer.innerHTML = filteredProfile.map((profile, index) => {
                let detailTambahan = '';
                if (profile.mata_pelajaran) {
                    detailTambahan = `<p class="text-muted small">Mata Pelajaran: ${profile.mata_pelajaran}</p>`;
                }
                return `
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="${profile.foto}" class="card-img-top" alt="${profile.nama}">
                            <div class="card-body">
                                <h5 class="card-title">${profile.jabatan}</h5>
                                <p class="card-text">${profile.nama}</p>
                                ${detailTambahan}
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                <button class="btn btn-primary edit-btn" data-index="${index}">
                                    <i class="bi bi-pencil-square"></i> Edit
                                </button>
                                <button class="btn btn-danger hapus-btn" data-index="${index}">
                                    <i class="bi bi-trash"></i> Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join("");

            if (filteredProfile.length === 0) {
                profileListContainer.innerHTML = `<p class="text-center text-muted">Tidak ada profile yang ditemukan.</p>`;
            }

            document.querySelectorAll(".edit-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    const profileToEdit = profileList[index];
                    localStorage.setItem('editProfile', JSON.stringify(profileToEdit));
                    localStorage.setItem('editIndexProfile', index);
                    window.location.hash = '#/upload_profile';
                });
            });

            document.querySelectorAll(".hapus-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    const profileToDelete = profileList[index];
                    const isKepalaSekolah = profileToDelete.jabatan === "Kepala Sekolah";
                    const jumlahKepalaSekolah = profileList.filter(p => p.jabatan === "Kepala Sekolah").length;

                    if (isKepalaSekolah && jumlahKepalaSekolah === 1) {
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

        searchInput.addEventListener("input", function() {
            tampilkanProfile(this.value);
        });
    }
};

export default Dashboard_Profile;