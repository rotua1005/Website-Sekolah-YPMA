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
                        <p class="text-center text-muted w-100">Memuat prestasi...</p>
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
        const prestasiListContainer = document.getElementById("prestasi-list");
        let prestasiList = []; // Will store data fetched from API

        async function ambilPrestasiDariServer() {
            try {
                const response = await fetch('http://localhost:5000/api/dashboardPrestasi');
                if (!response.ok) throw new Error("Gagal fetch data prestasi");
                const data = await response.json();
                prestasiList = data.reverse(); // Latest first
                tampilkanPrestasi();
            } catch (error) {
                console.error("Gagal mengambil data prestasi:", error);
                prestasiListContainer.innerHTML = `<p class="text-center text-danger w-100">Gagal mengambil data prestasi.</p>`;
            }
        }

        addPrestasiBtn.addEventListener("click", () => {
            // Clear any lingering edit data when going to add new
            localStorage.removeItem('editPrestasi');
            window.location.hash = '#/upload_prestasi';
        });

        function tampilkanPrestasi(searchTerm = "") {
            const filteredPrestasi = prestasiList.filter(prestasi =>
                prestasi.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prestasi.nama_ekstra.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredPrestasi.length === 0) {
                prestasiListContainer.innerHTML = `<p class="text-center text-muted w-100">Tidak ada prestasi yang ditemukan.</p>`;
                return;
            }

            prestasiListContainer.innerHTML = filteredPrestasi.map(prestasi => {
                const deskripsiSingkat = prestasi.deskripsi.length > 100
                    ? `${prestasi.deskripsi.slice(0, 100)}... <a href="#" class="selengkapnya text-primary" data-id="${prestasi._id}">Selengkapnya</a>`
                    : prestasi.deskripsi;

                const gambarSrc = prestasi.gambar ? `http://localhost:5000${prestasi.gambar}` : 'path/to/default-image.jpg';

                const tanggalFormatted = new Date(prestasi.tanggal).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                });

                return `
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="${gambarSrc}" class="card-img-top" alt="${prestasi.judul}">
                            <div class="card-body">
                                <h5 class="card-title">${prestasi.judul}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${prestasi.nama_ekstra}</h6>
                                <p class="card-text">${deskripsiSingkat}</p>
                                <p class="text-muted small">${tanggalFormatted}</p>
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                <button class="btn btn-primary edit-btn" data-id="${prestasi._id}">
                                    <i class="bi bi-pencil-square"></i> Edit
                                </button>
                                <button class="btn btn-danger hapus-btn" data-id="${prestasi._id}">
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
            document.querySelectorAll(".selengkapnya").forEach(link => {
                link.addEventListener("click", function (e) {
                    e.preventDefault();
                    const id = this.getAttribute("data-id");
                    const prestasi = prestasiList.find(p => p._id === id);
                    if (prestasi) {
                        showAlert(
                            `Detail Prestasi:<br><strong>Ekstrakurikuler:</strong> ${prestasi.nama_ekstra}<br><strong>Judul:</strong> ${prestasi.judul}<br><strong>Deskripsi:</strong> ${prestasi.deskripsi.replace(/\n/g, '<br>')}<br><em>Tanggal: ${new Date(prestasi.tanggal).toLocaleDateString('id-ID')}</em>`,
                            'info'
                        );
                    }
                });
            });

            document.querySelectorAll(".edit-btn").forEach(btn => {
                btn.addEventListener("click", async () => {
                    const id = btn.getAttribute("data-id");
                    if (!confirm("Apakah Anda yakin ingin mengedit prestasi ini?")) return;

                    try {
                        const response = await fetch(`http://localhost:5000/api/dashboardPrestasi/${id}`);
                        if (!response.ok) throw new Error("Gagal mengambil data prestasi untuk diedit.");
                        const prestasiToEdit = await response.json();

                        localStorage.setItem('editPrestasi', JSON.stringify(prestasiToEdit));
                        window.location.hash = '#/upload_prestasi';
                    } catch (error) {
                        console.error(error);
                        showAlert("Gagal mengambil data prestasi untuk diedit.", "danger");
                    }
                });
            });

            document.querySelectorAll(".hapus-btn").forEach(btn => {
                btn.addEventListener("click", async () => {
                    const id = btn.getAttribute("data-id");
                    if (!confirm("Apakah Anda yakin ingin menghapus prestasi ini?")) return;

                    try {
                        const response = await fetch(`http://localhost:5000/api/dashboardPrestasi/${id}`, {
                            method: 'DELETE',
                        });
                        if (!response.ok) throw new Error("Gagal menghapus prestasi");
                        showAlert('Prestasi berhasil dihapus.', 'success');
                        await ambilPrestasiDariServer(); // Re-fetch and display after deletion
                    } catch (err) {
                        console.error(err);
                        showAlert('Terjadi kesalahan saat menghapus prestasi.', 'danger');
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

        await ambilPrestasiDariServer(); // Initial data fetch

        searchInput.addEventListener("input", () => {
            tampilkanPrestasi(searchInput.value);
        });
    }
};

export default Dashboard_Prestasi;