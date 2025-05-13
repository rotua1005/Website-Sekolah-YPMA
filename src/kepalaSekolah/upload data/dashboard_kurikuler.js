import MenuKepsek from "../menu/menu_kepsek";

const Dashboard_EkstraKurikulerKepsek = {
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
                        <h1 class="text-3xl font-bold text-gray-800">Ekstrakurikuler</h1>
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
        MenuKepsek.afterRender();
        const searchInput = document.getElementById("search");
        let ekstrakurikulerList = JSON.parse(localStorage.getItem("ekstrakurikuler")) || [];

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

export default Dashboard_EkstraKurikulerKepsek;
