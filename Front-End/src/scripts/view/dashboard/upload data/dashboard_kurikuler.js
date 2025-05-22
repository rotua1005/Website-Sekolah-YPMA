import MenuDashboard from '../../menu/menu_dashboard';

const Dashboard_EkstraKurikuler = {
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
                            <h1 class="text-3xl font-bold text-gray-800">Kelola Ekstrakurikuler</h1>
                            <button id="add-ekskul-btn" class="btn btn-success d-flex align-items-center">
                                <i class="bi bi-plus-circle me-2"></i> Tambah Ekskul
                            </button>
                        </div>
                        <div class="mb-4">
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-search"></i></span>
                                <input type="text" id="search" class="form-control" placeholder="Cari ekstrakurikuler...">
                            </div>
                        </div>
                        <div id="ekstrakurikuler-list" class="row g-3">
                            <p class="text-center text-muted w-100">Memuat ekstrakurikuler...</p>
                        </div>
                    </main>
                </div>
            </div>
        `;
    },

    async afterRender() {
        MenuDashboard.afterRender();
        const searchInput = document.getElementById("search");
        const addEkskulBtn = document.getElementById("add-ekskul-btn");
        const ekskulListContainer = document.getElementById("ekstrakurikuler-list");
        let ekstrakurikulerList = []; // Will store data fetched from API

        async function ambilEkstrakurikulerDariServer() {
            try {
                const response = await fetch('http://localhost:5000/api/dashboardEkstrakurikuler');
                if (!response.ok) throw new Error("Gagal fetch data ekstrakurikuler");
                const data = await response.json();
                ekstrakurikulerList = data.reverse(); // Latest first
                tampilkanEkstrakurikuler();
            } catch (error) {
                console.error("Gagal mengambil data ekstrakurikuler:", error);
                ekskulListContainer.innerHTML = `<p class="text-center text-danger w-100">Gagal mengambil data ekstrakurikuler.</p>`;
            }
        }

        addEkskulBtn.addEventListener("click", () => {
            // Clear any lingering edit data when going to add new
            localStorage.removeItem('editEkskul');
            window.location.hash = '#/upload_eskul';
        });

        function tampilkanEkstrakurikuler(searchTerm = "") {
            const filteredEkskul = ekstrakurikulerList.filter(ekskul =>
                ekskul.nama.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredEkskul.length === 0) {
                ekskulListContainer.innerHTML = `<p class="text-center text-muted w-100">Tidak ada ekstrakurikuler yang ditemukan.</p>`;
                return;
            }

            ekskulListContainer.innerHTML = filteredEkskul.map(ekskul => {
                const deskripsiSingkat = ekskul.deskripsi.length > 100
                    ? `${ekskul.deskripsi.slice(0, 100)}... <a href="#" class="selengkapnya text-primary" data-id="${ekskul._id}">Selengkapnya</a>`
                    : ekskul.deskripsi;

                const gambarSrc = ekskul.gambar ? `http://localhost:5000${ekskul.gambar}` : 'path/to/default-image.jpg';

                const tanggalFormatted = new Date(ekskul.tanggal).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                });

                return `
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="${gambarSrc}" class="card-img-top" alt="${ekskul.nama}">
                            <div class="card-body">
                                <h5 class="card-title">${ekskul.nama}</h5>
                                <p class="card-text">${deskripsiSingkat}</p>
                                <p class="text-muted small">${tanggalFormatted}</p>
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                <button class="btn btn-primary edit-btn" data-id="${ekskul._id}">
                                    <i class="bi bi-pencil-square"></i> Edit
                                </button>
                                <button class="btn btn-danger hapus-btn" data-id="${ekskul._id}">
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
                    const ekskul = ekstrakurikulerList.find(b => b._id === id);
                    if (ekskul) {
                        showAlert(
                            `Detail Ekstrakurikuler:<br><strong>${ekskul.nama}</strong><br>${ekskul.deskripsi.replace(/\n/g, '<br>')}<br><em>${new Date(ekskul.tanggal).toLocaleDateString('id-ID')}</em>`,
                            'info'
                        );
                    }
                });
            });

            document.querySelectorAll(".edit-btn").forEach(btn => {
                btn.addEventListener("click", async () => {
                    const id = btn.getAttribute("data-id");
                    if (!confirm("Apakah Anda yakin ingin mengedit ekstrakurikuler ini?")) return;

                    try {
                        const response = await fetch(`http://localhost:5000/api/dashboardEkstrakurikuler/${id}`, {
                            method: 'GET',
                        });

                        if (!response.ok) throw new Error("Gagal mengambil data ekstrakurikuler");

                        const ekskul = await response.json();

                        // Store the full ekskul object, which contains the _id
                        localStorage.setItem('editEkskul', JSON.stringify(ekskul));

                        window.location.hash = '#/upload_eskul';
                    } catch (error) {
                        console.error(error);
                        showAlert("Gagal mengambil data ekstrakurikuler untuk diedit.", "danger");
                    }
                });
            });

            document.querySelectorAll(".hapus-btn").forEach(btn => {
                btn.addEventListener("click", async () => {
                    const id = btn.getAttribute("data-id");
                    if (!confirm("Apakah Anda yakin ingin menghapus ekstrakurikuler ini?")) return;

                    try {
                        const response = await fetch(`http://localhost:5000/api/dashboardEkstrakurikuler/${id}`, {
                            method: 'DELETE',
                        });
                        if (!response.ok) throw new Error("Gagal menghapus ekstrakurikuler");
                        showAlert('Ekstrakurikuler berhasil dihapus.', 'success');
                        await ambilEkstrakurikulerDariServer(); // Re-fetch and display after deletion
                    } catch (err) {
                        console.error(err);
                        showAlert('Terjadi kesalahan saat menghapus ekstrakurikuler.', 'danger');
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

        await ambilEkstrakurikulerDariServer();

        searchInput.addEventListener("input", () => {
            tampilkanEkstrakurikuler(searchInput.value);
        });
    }
};

export default Dashboard_EkstraKurikuler;