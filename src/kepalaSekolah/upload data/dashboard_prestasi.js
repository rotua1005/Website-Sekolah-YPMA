import MenuKepsek from "../menu/menu_kepsek";

const Dashboard_PrestasiKepsek = {
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
                        <h1 class="text-3xl font-bold text-gray-800">Prestasi</h1>
                    </div>
                    <div class="mb-4">
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-search"></i></span>
                            <input type="text" id="search" class="form-control" placeholder="Cari prestasi...">
                        </div>
                    </div>
                    <div id="prestasi-list" class="row g-3">
                    </div>
                </main>
            </div>
        </div>
        `;
    },

    async afterRender() {
        MenuKepsek.afterRender();
        const searchInput = document.getElementById("search");
        let prestasiList = JSON.parse(localStorage.getItem("prestasi")) || [];

        function tampilkanPrestasi(searchTerm = "") {
            const filteredPrestasi = prestasiList.filter(prestasi =>
                prestasi.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prestasi.nama_ekstra.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const prestasiListContainer = document.getElementById("prestasi-list");
            prestasiListContainer.innerHTML = filteredPrestasi.map((prestasi, index) => {
                const deskripsi = prestasi.deskripsi.length > 100 ? prestasi.deskripsi.substring(0, 100) + '... <a href="#" class="selengkapnya text-primary" data-index="' + index + '">Selengkapnya</a>' : prestasi.deskripsi;
                return `
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="${prestasi.gambar}" class="card-img-top" alt="${prestasi.judul}">
                            <div class="card-body">
                                <h5 class="card-title">${prestasi.judul}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${prestasi.nama_ekstra}</h6>
                                <p class="card-text">${deskripsi}</p>
                                <p class="text-muted small">${prestasi.tanggal}</p>
                            </div>
                        </div>
                    </div>
                `;
            }).join("");

            if (filteredPrestasi.length === 0) {
                prestasiListContainer.innerHTML = `<p class="text-center text-muted">Tidak ada prestasi yang ditemukan.</p>`;
            }

            document.querySelectorAll(".selengkapnya").forEach(link => {
                link.addEventListener("click", function(event) {
                    event.preventDefault();
                    const index = this.getAttribute("data-index");
                    const prestasi = prestasiList[index];
                    if (prestasi) {
                        showAlert(`Detail Prestasi:<br>Ekstrakurikuler: ${prestasi.nama_ekstra}<br>Judul: ${prestasi.judul}<br>Deskripsi: ${prestasi.deskripsi.replace(/\n/g, '<br>')}<br>Tanggal: ${prestasi.tanggal}`, 'info');
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

        tampilkanPrestasi();

        searchInput.addEventListener("input", function() {
            tampilkanPrestasi(this.value);
        });
    }
};

export default Dashboard_PrestasiKepsek;
