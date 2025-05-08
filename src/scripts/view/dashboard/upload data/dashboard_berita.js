import MenuDashboard from '../../menu/menu_dashboard';

const Dashboard_Berita = {
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
                        <h1 class="text-3xl font-bold text-gray-800">Kelola Berita</h1>
                        <button id="add-berita-btn" class="btn btn-success d-flex align-items-center">
                            <i class="bi bi-plus-circle me-2"></i> Tambah Berita
                        </button>
                    </div>
                    <div class="mb-4">
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-search"></i></span>
                            <input type="text" id="search" class="form-control" placeholder="Cari berita...">
                        </div>
                    </div>
                    <div id="berita-list" class="row g-3">
                    </div>
                </main>
            </div>
        </div>
        `;
    },

    async afterRender() {
        MenuDashboard.afterRender();
        const searchInput = document.getElementById("search");
        const addBeritaBtn = document.getElementById("add-berita-btn");
        let beritaList = JSON.parse(localStorage.getItem("berita")) || [];

        addBeritaBtn.addEventListener("click", () => {
            window.location.hash = '#/upload_berita';
        });

        function tampilkanBerita(searchTerm = "") {
            const filteredBerita = beritaList.filter(berita => berita.judul.toLowerCase().includes(searchTerm.toLowerCase()));
            const beritaListContainer = document.getElementById("berita-list");
            beritaListContainer.innerHTML = filteredBerita.map((berita, index) => {
                const deskripsi = berita.deskripsi.length > 100 ? berita.deskripsi.substring(0, 100) + '... <a href="#" class="selengkapnya text-primary" data-index="' + index + '">Selengkapnya</a>' : berita.deskripsi;
                return `
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="${berita.gambar}" class="card-img-top" alt="${berita.judul}">
                            <div class="card-body">
                                <h5 class="card-title">${berita.judul}</h5>
                                <p class="card-text">${deskripsi}</p>
                                <p class="text-muted small">${berita.tanggal}</p>
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

            if (filteredBerita.length === 0) {
                beritaListContainer.innerHTML = `<p class="text-center text-muted">Tidak ada berita yang ditemukan.</p>`;
            }

            document.querySelectorAll(".selengkapnya").forEach(link => {
                link.addEventListener("click", function(event) {
                    event.preventDefault();
                    const index = this.getAttribute("data-index");
                    const berita = beritaList[index];
                    if (berita) {
                        showAlert(`Detail Berita:<br>Judul: ${berita.judul}<br>Deskripsi: ${berita.deskripsi.replace(/\n/g, '<br>')}<br>Tanggal: ${berita.tanggal}`, 'info');
                    }
                });
            });

            document.querySelectorAll(".edit-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    const beritaToEdit = beritaList[index];
                    localStorage.setItem('editBerita', JSON.stringify(beritaToEdit));
                    localStorage.setItem('editIndex', index);
                    window.location.hash = '#/upload_berita';
                });
            });

            document.querySelectorAll(".hapus-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    beritaList.splice(index, 1);
                    localStorage.setItem("berita", JSON.stringify(beritaList));
                    localStorage.setItem("beritaDepan", JSON.stringify(beritaList.slice(0, 3)));
                    tampilkanBerita();
                    showAlert('Berita berhasil dihapus.', 'danger');
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

        tampilkanBerita();

        searchInput.addEventListener("input", function() {
            tampilkanBerita(this.value);
        });
    }
};

export default Dashboard_Berita;