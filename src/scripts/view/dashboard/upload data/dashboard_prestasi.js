import MenuDashboard from '../../menu/menu_dashboard';

const Dashboard_Prestasi = {
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
                        <h1 class="text-3xl font-bold text-gray-800">Kelola Prestasi</h1>
                        <button id="add-prestasi-btn" class="btn btn-success d-flex align-items-center">
                            <i class="bi bi-plus-circle me-2"></i> Tambah Prestasi
                        </button>
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
        MenuDashboard.afterRender();
        const searchInput = document.getElementById("search");
        const addPrestasiBtn = document.getElementById("add-prestasi-btn");
        let prestasiList = JSON.parse(localStorage.getItem("prestasi")) || [];

        addPrestasiBtn.addEventListener("click", () => {
            window.location.hash = '#/upload_prestasi';
        });

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

            document.querySelectorAll(".edit-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    const prestasiToEdit = prestasiList[index];
                    localStorage.setItem('editPrestasi', JSON.stringify(prestasiToEdit));
                    localStorage.setItem('editIndexPrestasi', index);
                    window.location.hash = '#/upload_prestasi';
                });
            });

            document.querySelectorAll(".hapus-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    prestasiList.splice(index, 1);
                    localStorage.setItem("prestasi", JSON.stringify(prestasiList));
                    tampilkanPrestasi();
                    showAlert('Prestasi berhasil dihapus.', 'danger');
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

export default Dashboard_Prestasi;