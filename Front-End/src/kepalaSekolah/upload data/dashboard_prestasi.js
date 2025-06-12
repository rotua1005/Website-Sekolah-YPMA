import MenuKepsek from "../menu/menu_kepsek";

const Dashboard_PrestasiKepsek = {
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
                        <h1 class="text-3xl font-bold text-gray-800">Prestasi</h1>
                    </div>
                    <div class="mb-4">
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-search"></i></span>
                            <input type="text" id="search" class="form-control" placeholder="Cari prestasi...">
                        </div>
                    </div>
                    <div id="prestasi-list" class="row g-3">
                        <p class="text-center text-muted col-12">Memuat data prestasi...</p>
                    </div>
                </main>
            </div>
        </div>
        `;
    },

    async afterRender() {
        MenuKepsek.afterRender();
        const searchInput = document.getElementById("search");
        const prestasiListContainer = document.getElementById("prestasi-list");
        let currentPrestasiData = []; // To store fetched data

        const API_BASE_URL = 'http://localhost:5000'; // **Ensure this matches your backend URL**

        async function fetchAndTampilkanPrestasi(searchTerm = "") {
            try {
                prestasiListContainer.innerHTML = `<p class="text-center text-muted col-12">Memuat data prestasi...</p>`;
                const url = `${API_BASE_URL}/api/dashboardPrestasi`; // No search query needed for getAllPrestasi in your current backend
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                currentPrestasiData = data; // Store fetched data

                const filteredPrestasi = data.filter(prestasi =>
                    prestasi.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    prestasi.nama_ekstra.toLowerCase().includes(searchTerm.toLowerCase())
                );

                if (filteredPrestasi.length === 0) {
                    prestasiListContainer.innerHTML = `<p class="text-center text-muted col-12">Tidak ada prestasi yang ditemukan.</p>`;
                    return;
                }

                prestasiListContainer.innerHTML = filteredPrestasi.map((prestasi, index) => {
                    const deskripsi = prestasi.deskripsi.length > 100 ? prestasi.deskripsi.substring(0, 100) + '... <a href="#" class="selengkapnya text-primary" data-id="${prestasi._id}">Selengkapnya</a>' : prestasi.deskripsi;
                    const imageUrl = `${API_BASE_URL}${prestasi.gambar}`; // Construct full image URL
                    const tanggalFormatted = new Date(prestasi.tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

                    return `
                        <div class="col-md-4">
                            <div class="card h-100 shadow-sm">
                                <img src="${imageUrl}" class="card-img-top object-cover" style="height: 200px;" alt="${prestasi.judul}">
                                <div class="card-body d-flex flex-column">
                                    <h5 class="card-title font-bold text-xl mb-2">${prestasi.judul}</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">${prestasi.nama_ekstra}</h6>
                                    <p class="card-text text-gray-700 flex-grow">${deskripsi}</p>
                                    <p class="text-muted small mt-2">Dibuat: ${tanggalFormatted}</p>
                                    <button class="btn btn-primary mt-auto selengkapnya-btn" data-id="${prestasi._id}">Lihat Detail</button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join("");

                // Add event listeners for "Lihat Detail" buttons
                document.querySelectorAll(".selengkapnya-btn").forEach(button => {
                    button.addEventListener("click", function() {
                        const prestasiId = this.getAttribute("data-id");
                        const selectedPrestasi = currentPrestasiData.find(p => p._id === prestasiId);
                        if (selectedPrestasi) {
                            showPrestasiDetailModal(selectedPrestasi);
                        }
                    });
                });

            } catch (error) {
                console.error("Error fetching and displaying prestasi:", error);
                prestasiListContainer.innerHTML = `<p class="text-center text-red-500 col-12">Gagal memuat data: ${error.message}</p>`;
            }
        }

        function showPrestasiDetailModal(prestasi) {
            const tanggalFull = new Date(prestasi.tanggal).toLocaleDateString('id-ID', {
                year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            const imageUrl = `${API_BASE_URL}${prestasi.gambar}`;
            const detailContent = `
                <img src="${imageUrl}" class="img-fluid mb-3 rounded" alt="${prestasi.judul}" style="max-height: 300px; width: 100%; object-fit: contain;">
                <h3 class="font-bold text-2xl mb-2">${prestasi.judul}</h3>
                <h6 class="text-muted text-sm mb-2">Ekstrakurikuler: ${prestasi.nama_ekstra}</h6>
                <p class="text-muted text-sm mb-3">Tanggal: ${tanggalFull}</p>
                <p class="text-gray-800 leading-relaxed whitespace-pre-wrap">${prestasi.deskripsi}</p>
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

        // Initial load of achievements
        fetchAndTampilkanPrestasi();

        // Add event listener for search input
        searchInput.addEventListener("input", function() {
            fetchAndTampilkanPrestasi(this.value);
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

export default Dashboard_PrestasiKepsek;