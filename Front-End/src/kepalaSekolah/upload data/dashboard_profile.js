import MenuKepsek from "../menu/menu_kepsek";

const Dashboard_Profile = {
    async render() {
        return `
        <div class="dashboard-container bg-gray-100 min-h-screen flex">
            ${MenuKepsek.render()}
            <div class="dashboard-main flex-1 p-8">
                <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Dashboard Kepala Sekolah</h2>
                    <button class="btn btn-danger d-flex align-items-center" id="logoutButton">
                        <i class="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                </header>

                <main class="bg-white shadow-lg rounded-lg p-6">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h1 class="text-3xl font-bold text-gray-800">Profile Guru & Staff</h1>
                    </div>
                    <div class="mb-4">
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-search"></i></span>
                            <input type="text" id="search" class="form-control" placeholder="Cari profile...">
                        </div>
                    </div>
                    <div id="profile-list" class="row g-3">
                        <p class="text-center text-muted col-12">Memuat data profile...</p>
                    </div>
                </main>
            </div>
        </div>
        `;
    },

    async afterRender() {
        MenuKepsek.afterRender();
        const searchInput = document.getElementById("search");
        const profileListContainer = document.getElementById("profile-list");
        let currentProfileData = []; // To store fetched data for detail view

        // Base URL for your backend API
        const API_BASE_URL = 'http://localhost:5000'; // **IMPORTANT: Ensure this matches your Express server's address**

        async function fetchAndTampilkanProfile(searchTerm = "") {
            try {
                profileListContainer.innerHTML = `<p class="text-center text-muted col-12">Memuat data profile...</p>`;
                const url = `${API_BASE_URL}/api/dashboardProfile`; // Your backend's GET all profiles endpoint
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                currentProfileData = data; // Store fetched data

                const filteredProfile = data.filter(profile =>
                    profile.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    profile.jabatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (profile.mata_pelajaran && profile.mata_pelajaran.toLowerCase().includes(searchTerm.toLowerCase()))
                );

                if (filteredProfile.length === 0) {
                    profileListContainer.innerHTML = `<p class="text-center text-muted col-12">Tidak ada profile yang ditemukan.</p>`;
                    return;
                }

                profileListContainer.innerHTML = filteredProfile.map((profile) => {
                    let detailTambahan = '';
                    if (profile.mata_pelajaran) {
                        detailTambahan = `<p class="text-muted small">Mata Pelajaran: ${profile.mata_pelajaran}</p>`;
                    }
                    const imageUrl = `${API_BASE_URL}${profile.foto}`; // Construct full image URL
                    return `
                        <div class="col-md-4">
                            <div class="card h-100 shadow-sm">
                                <img src="${imageUrl}" class="card-img-top object-cover" style="height: 250px; object-fit: cover; border-radius: 0.5rem 0.5rem 0 0;" alt="${profile.nama}">
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title font-bold text-xl mb-1">${profile.nama}</h5>
                                    <h6 class="card-subtitle mb-2 text-primary">${profile.jabatan}</h6>
                                    ${detailTambahan}
                                    <p class="text-muted small mt-auto">Terakhir diperbarui: ${new Date(profile.updatedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <button class="btn btn-primary mt-3 selengkapnya-btn" data-id="${profile._id}">Lihat Detail</button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join("");

                // Add event listeners for "Lihat Detail" buttons
                document.querySelectorAll(".selengkapnya-btn").forEach(button => {
                    button.addEventListener("click", function() {
                        const profileId = this.getAttribute("data-id");
                        const selectedProfile = currentProfileData.find(p => p._id === profileId);
                        if (selectedProfile) {
                            showProfileDetailModal(selectedProfile);
                        }
                    });
                });

            } catch (error) {
                console.error("Error fetching and displaying profiles:", error);
                profileListContainer.innerHTML = `<p class="text-center text-red-500 col-12">Gagal memuat data: ${error.message}</p>`;
            }
        }

        function showProfileDetailModal(profile) {
            const updatedAtFormatted = new Date(profile.updatedAt).toLocaleDateString('id-ID', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            const imageUrl = `${API_BASE_URL}${profile.foto}`;
            let mataPelajaranHtml = '';
            if (profile.mata_pelajaran) {
                mataPelajaranHtml = `<p class="text-gray-700">Mata Pelajaran: <span class="font-semibold">${profile.mata_pelajaran}</span></p>`;
            }

            const detailContent = `
                <div class="text-center mb-4">
                    <img src="${imageUrl}" class="img-fluid rounded-full shadow-md" alt="${profile.nama}" style="width: 150px; height: 150px; object-fit: cover;">
                </div>
                <h3 class="font-bold text-2xl text-center mb-2">${profile.nama}</h3>
                <p class="text-center text-primary mb-3">${profile.jabatan}</p>
                ${mataPelajaranHtml}
                <p class="text-muted text-sm text-center mt-3">Terakhir diperbarui: ${updatedAtFormatted}</p>
            `;
            showAlert(detailContent, 'info', true); // Pass true to indicate raw HTML
        }

        // Custom alert function (updated to support HTML content for modals)
        function showAlert(message, type, isHtml = false) {
            const existingAlert = document.querySelector('.custom-alert');
            if (existingAlert) {
                existingAlert.remove(); // Remove any existing alert to prevent multiple
            }

            const alertBox = document.createElement("div");
            alertBox.className = `alert alert-${type} alert-dismissible fade show fixed-top m-3 custom-alert`;
            alertBox.role = "alert";
            if (isHtml) {
                alertBox.innerHTML = message;
            } else {
                alertBox.textContent = message;
            }
            alertBox.innerHTML += `
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `; // Add close button for manual dismissal

            document.body.appendChild(alertBox);

            // Auto-hide after 5 seconds if not explicitly closed (for simple alerts)
            // For detail modals, users should manually close.
            if (!isHtml) { // Only auto-hide simple text alerts
                setTimeout(() => {
                    const currentAlert = document.querySelector('.custom-alert');
                    if (currentAlert && currentAlert.classList.contains('show')) {
                        currentAlert.classList.remove("show");
                        setTimeout(() => currentAlert.remove(), 150);
                    }
                }, 5000); // 5 seconds
            }
        }

        // Initial load of profiles
        fetchAndTampilkanProfile();

        // Add event listener for search input
        searchInput.addEventListener("input", function() {
            fetchAndTampilkanProfile(this.value);
        });

        // Logout button functionality
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                console.log('User logged out');
                showAlert('Anda telah logout.', 'success');
                // Implement actual logout logic here (e.g., clear tokens, redirect)
            });
        }
    }
};

export default Dashboard_Profile;
