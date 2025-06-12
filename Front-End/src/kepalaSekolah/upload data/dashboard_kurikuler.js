import MenuKepsek from "../menu/menu_kepsek";

const Dashboard_EkstraKurikulerKepsek = {
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
                        <h1 class="text-3xl font-bold text-gray-800">Ekstrakurikuler</h1>
                    </div>
                    <div class="mb-4">
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-search"></i></span>
                            <input type="text" id="searchInputEkstrakurikulerKepsek" class="form-control" placeholder="Cari ekstrakurikuler berdasarkan nama...">
                        </div>
                    </div>
                    <div id="ekstrakurikuler-list-kepsek" class="row g-3">
                        <p class="text-center text-muted col-12">Memuat data ekstrakurikuler...</p>
                    </div>
                </main>
            </div>
        </div>
        `;
    },

    async afterRender() {
        MenuKepsek.afterRender();

        const searchInput = document.getElementById("searchInputEkstrakurikulerKepsek");
        const ekstrakurikulerListContainer = document.getElementById("ekstrakurikuler-list-kepsek");

        let currentEkstrakurikulerData = []; // To store fetched data for detail view

        // Base URL for your backend API
        const API_BASE_URL = 'http://localhost:5000'; // Make sure this matches your Express server's address

        async function fetchAndTampilkanEkstrakurikuler(searchTerm = "") {
            try {
                ekstrakurikulerListContainer.innerHTML = `<p class="text-center text-muted col-12">Memuat data ekstrakurikuler...</p>`;
                const url = `${API_BASE_URL}/api/dashboardEkstrakurikuler?search=${encodeURIComponent(searchTerm)}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                currentEkstrakurikulerData = data; // Store fetched data

                if (data.length === 0) {
                    ekstrakurikulerListContainer.innerHTML = `<p class="text-center text-muted col-12">Tidak ada data ekstrakurikuler yang ditemukan.</p>`;
                    return;
                }

                ekstrakurikulerListContainer.innerHTML = data.map((ekskul, index) => {
                    // Format date
                    const tanggal = new Date(ekskul.tanggal).toLocaleDateString('id-ID', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    });

                    // Truncate description for card view
                    const deskripsiSingkat = ekskul.deskripsi.length > 150 ?
                        ekskul.deskripsi.substring(0, 150) + '...' :
                        ekskul.deskripsi;

                    return `
                        <div class="col-md-4">
                            <div class="card h-100 shadow-sm">
                                <img src="${API_BASE_URL}${ekskul.gambar}" class="card-img-top object-cover" style="height: 200px;" alt="${ekskul.nama}">
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title font-bold text-xl mb-2">${ekskul.nama}</h5>
                                    <p class="card-text text-gray-700 flex-grow">${deskripsiSingkat}</p>
                                    <p class="text-muted small mt-2">Dibuat: ${tanggal}</p>
                                    <button class="btn btn-primary mt-auto selengkapnya-btn" data-id="${ekskul._id}">Lihat Detail</button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join("");

                // Add event listeners for "Lihat Detail" buttons
                document.querySelectorAll(".selengkapnya-btn").forEach(button => {
                    button.addEventListener("click", function() {
                        const ekskulId = this.getAttribute("data-id");
                        const selectedEkskul = currentEkstrakurikulerData.find(e => e._id === ekskulId);
                        if (selectedEkskul) {
                            showEkstrakurikulerDetailModal(selectedEkskul);
                        }
                    });
                });

            } catch (error) {
                console.error("Error fetching and displaying ekstrakurikuler:", error);
                ekstrakurikulerListContainer.innerHTML = `<p class="text-center text-red-500 col-12">Gagal memuat data: ${error.message}</p>`;
            }
        }

        function showEkstrakurikulerDetailModal(ekskul) {
            const tanggalFull = new Date(ekskul.tanggal).toLocaleDateString('id-ID', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            const imageUrl = `${API_BASE_URL}${ekskul.gambar}`;
            const detailContent = `
                <img src="${imageUrl}" class="img-fluid mb-3 rounded" alt="${ekskul.nama}" style="max-height: 300px; width: 100%; object-fit: contain;">
                <h3 class="font-bold text-2xl mb-2">${ekskul.nama}</h3>
                <p class="text-muted text-sm mb-3">Dibuat: ${tanggalFull}</p>
                <p class="text-gray-800 leading-relaxed whitespace-pre-wrap">${ekskul.deskripsi}</p>
            `;
            showAlert(detailContent, 'info', true); // Pass true to indicate raw HTML
        }

        // Custom alert function (updated to support HTML)
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

            // Auto-hide after 5 seconds if not explicitly closed
            setTimeout(() => {
                const currentAlert = document.querySelector('.custom-alert');
                if (currentAlert && currentAlert.classList.contains('show')) {
                    currentAlert.classList.remove("show");
                    setTimeout(() => currentAlert.remove(), 150);
                }
            }, 5000); // 5 seconds
        }


        // Initial load of extracurricular activities
        fetchAndTampilkanEkstrakurikuler();

        // Add event listener for search input
        searchInput.addEventListener("input", function() {
            fetchAndTampilkanEkstrakurikuler(this.value);
        });

        // Logout button functionality
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                console.log('User logged out');
                showAlert('Anda telah logout.', 'success');
            });
        }
    }
};

export default Dashboard_EkstraKurikulerKepsek;