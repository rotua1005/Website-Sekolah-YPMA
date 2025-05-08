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
        let ekstrakurikulerList = JSON.parse(localStorage.getItem("ekstrakurikuler")) || [];

        addEkskulBtn.addEventListener("click", () => {
            window.location.hash = '#/upload_eskul';
        });

        function tampilkanEkstrakurikuler(searchTerm = "") {
            const filteredEkskul = ekstrakurikulerList.filter(ekskul =>
                ekskul.nama.toLowerCase().includes(searchTerm.toLowerCase())
            );
            const ekskulListContainer = document.getElementById("ekstrakurikuler-list");
            ekskulListContainer.innerHTML = filteredEkskul.map((ekskul, index) => {
                const deskripsi = ekskul.deskripsi.length > 100 ? ekskul.deskripsi.substring(0, 100) + '... <a href="#" class="selengkapnya text-primary" data-index="' + index + '">Selengkapnya</a>' : ekskul.deskripsi;
                return `
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="${ekskul.gambar}" class="card-img-top" alt="${ekskul.nama}">
                            <div class="card-body">
                                <h5 class="card-title">${ekskul.nama}</h5>
                                <p class="card-text">${deskripsi}</p>
                                <p class="text-muted small">${ekskul.tanggal}</p>
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

            if (filteredEkskul.length === 0) {
                ekskulListContainer.innerHTML = `<p class="text-center text-muted">Tidak ada ekstrakurikuler yang ditemukan.</p>`;
            }

            document.querySelectorAll(".selengkapnya").forEach(link => {
                link.addEventListener("click", function(event) {
                    event.preventDefault();
                    const index = this.getAttribute("data-index");
                    const ekskul = ekstrakurikulerList[index];
                    if (ekskul) {
                        showAlert(`Detail Ekstrakurikuler:<br>Nama: ${ekskul.nama}<br>Deskripsi: ${ekskul.deskripsi.replace(/\n/g, '<br>')}<br>Tanggal: ${ekskul.tanggal}`, 'info');
                    }
                });
            });

            document.querySelectorAll(".edit-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    const ekskulToEdit = ekstrakurikulerList[index];
                    localStorage.setItem('editEkskul', JSON.stringify(ekskulToEdit));
                    localStorage.setItem('editIndexEkskul', index);
                    window.location.hash = '#/upload_eskul';
                });
            });

            document.querySelectorAll(".hapus-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    ekstrakurikulerList.splice(index, 1);
                    localStorage.setItem("ekstrakurikuler", JSON.stringify(ekstrakurikulerList));
                    tampilkanEkstrakurikuler();
                    showAlert('Ekstrakurikuler berhasil dihapus.', 'danger');
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

        tampilkanEkstrakurikuler();

        searchInput.addEventListener("input", function() {
            tampilkanEkstrakurikuler(this.value);
        });
    }
};

export default Dashboard_EkstraKurikuler;
