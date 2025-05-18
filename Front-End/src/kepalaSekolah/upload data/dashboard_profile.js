import MenuKepsek from "../menu/menu_kepsek";

const Dashboard_Profile = {
    async render() {
        return `
        <div class="dashboard-container bg-gray-100 min-h-screen flex">
            ${MenuKepsek.render()}
            <div class="dashboard-main flex-1 p-8">
                <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Dashboard Kepala Sekolah</h2>
                    <button class="btn btn-danger d-flex align-items-center">
                        <i class="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                </header>

                <main class="bg-white shadow-lg rounded-lg p-6">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h1 class="text-3xl font-bold text-gray-800">Profile</h1>
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
        MenuKepsek.afterRender();
        const searchInput = document.getElementById("search");
        let profileList = JSON.parse(localStorage.getItem("profile")) || [];

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
                        </div>
                    </div>
                `;
            }).join("");

            if (filteredProfile.length === 0) {
                profileListContainer.innerHTML = `<p class="text-center text-muted">Tidak ada profile yang ditemukan.</p>`;
            }
        }

        tampilkanProfile();

        searchInput.addEventListener("input", function() {
            tampilkanProfile(this.value);
        });
    }
};

export default Dashboard_Profile;
