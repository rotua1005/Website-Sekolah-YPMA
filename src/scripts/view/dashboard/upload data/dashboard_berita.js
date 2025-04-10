import MenuDashboard from '../../menu/menu_dashboard';

const Dashboard_Berita = {
    async render() {
        return `
        <div class="dashboard-container bg-gray-100 min-h-screen flex">
            ${MenuDashboard.render()}
            <div class="dashboard-main flex-1 p-8">
                <header class="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Dashboard Admin</h2>
                    <button class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
                </header>

                <main class="bg-white shadow-lg rounded-lg p-6">
                    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Upload Berita</h1>
                    <form id="upload-form" class="space-y-6 bg-gray-50 p-6 rounded-lg shadow">
                        <div>
                            <label class="block font-semibold text-lg text-gray-700">Judul Berita</label>
                            <input type="text" id="judul" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" required>
                        </div>
                        <div>
                            <label class="block font-semibold text-lg text-gray-700">Deskripsi</label>
                            <textarea id="deskripsi" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" rows="4" required></textarea>
                        </div>
                        <div>
                            <label class="block font-semibold text-lg text-gray-700">Upload Gambar</label>
                            <input type="file" id="gambar" accept="image/*" class="w-full p-3 border rounded-lg" required>
                            <img id="preview" class="mt-4 hidden w-full h-48 object-cover rounded-lg shadow-md" alt="Preview Image">
                        </div>
                        <button type="submit" id="submit-button" class="w-full bg-green-600 text-white p-3 rounded-lg text-xl font-semibold hover:bg-green-700 transition-all shadow">Upload Berita</button>
                        <button type="button" id="cancel-edit" class="hidden w-full bg-gray-500 text-white p-3 rounded-lg text-xl font-semibold hover:bg-gray-600 transition-all shadow">Batal</button>
                    </form>
                    <div class="mt-6">
                        <input type="text" id="search" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" placeholder="Cari berita...">
                    </div>
                    <div id="berita-list" class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
                </main>
            </div>
        </div>
        `;
    },

    async afterRender() {
        MenuDashboard.afterRender();
        const form = document.getElementById("upload-form");
        const preview = document.getElementById("preview");
        const submitButton = document.getElementById("submit-button");
        const cancelEditButton = document.getElementById("cancel-edit");
        const searchInput = document.getElementById("search");
        let beritaList = JSON.parse(localStorage.getItem("berita")) || [];
        let editIndex = null;

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const judul = document.getElementById("judul").value;
            const deskripsi = document.getElementById("deskripsi").value;
            const tanggal = new Date().toLocaleDateString();
            const gambar = document.getElementById("gambar").files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const gambarSrc = e.target.result;
                if (editIndex === null) {
                    if (!beritaList.some(berita => berita.judul === judul && berita.tanggal === tanggal)) {
                        const newBerita = { judul, deskripsi, tanggal, gambar: gambarSrc };
                        beritaList.push(newBerita);
                        try {
                            localStorage.setItem("berita", JSON.stringify(beritaList));
                            // Update data berita di localStorage untuk halaman depan
                            localStorage.setItem("beritaDepan", JSON.stringify(beritaList.slice(0, 3))); // Ambil 3 berita terbaru untuk halaman depan (bisa disesuaikan)
                        } catch (e) {
                            if (e.name === 'QuotaExceededError') {
                                showAlert('Storage limit exceeded. Please delete some items.', 'danger');
                            }
                        }
                        form.reset();
                        preview.classList.add("hidden");
                        tampilkanBerita();
                        showAlert('Berita berhasil diupload.', 'success');
                    } else {
                        showAlert('Berita sudah ada.', 'warning');
                    }
                } else {
                    beritaList[editIndex] = { judul, deskripsi, tanggal, gambar: gambarSrc };
                    localStorage.setItem("berita", JSON.stringify(beritaList));
                    // Update data berita di localStorage untuk halaman depan setelah edit
                    localStorage.setItem("beritaDepan", JSON.stringify(beritaList.slice(0, 3))); // Ambil 3 berita terbaru
                    form.reset();
                    preview.classList.add("hidden");
                    tampilkanBerita();
                    showAlert('Berita berhasil diedit.', 'success');
                    editIndex = null;
                    submitButton.textContent = "Upload Berita";
                    cancelEditButton.classList.add("hidden");
                }
            };
            reader.readAsDataURL(gambar);
        });

        document.getElementById("gambar").addEventListener("change", function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.src = e.target.result;
                    preview.classList.remove("hidden");
                };
                reader.readAsDataURL(file);
            }
        });

        cancelEditButton.addEventListener("click", function() {
            form.reset();
            preview.classList.add("hidden");
            editIndex = null;
            submitButton.textContent = "Upload Berita";
            cancelEditButton.classList.add("hidden");
        });

        searchInput.addEventListener("input", function() {
            tampilkanBerita(this.value);
        });

        function tampilkanBerita(searchTerm = "") {
            const filteredBerita = beritaList.filter(berita => berita.judul.toLowerCase().includes(searchTerm.toLowerCase()));
            const beritaListContainer = document.getElementById("berita-list");
            beritaListContainer.innerHTML = filteredBerita.map((berita, index) => {
                const deskripsi = berita.deskripsi.length > 100 ? berita.deskripsi.substring(0, 100) + '... <a href="#" class="selengkapnya" data-index="' + index + '">Selengkapnya</a>' : berita.deskripsi;
                return `
                    <div class="berita-item p-4 border rounded-lg shadow-lg">
                        <h3 class="text-xl font-bold">${berita.judul}</h3>
                        <p class="text-gray-700 whitespace-pre-line">${deskripsi}</p>
                        <p class="text-gray-500">${berita.tanggal}</p>
                        <img src="${berita.gambar}" alt="${berita.judul}" class="w-full h-32 object-cover rounded-lg mt-2">
                        <div class="mt-4 flex justify-between space-x-1">
                            <button class="detail-btn bg-blue-500 text-white p-2 rounded" data-index="${index}">Detail</button>
                            <button class="edit-btn bg-yellow-500 text-white p-2 rounded" data-index="${index}">Edit</button>
                            <button class="hapus-btn bg-red-500 text-white p-2 rounded" data-index="${index}">Hapus</button>
                        </div>
                    </div>
                `;
            }).join("");

            if (filteredBerita.length === 0) {
                beritaListContainer.innerHTML = `<p class="text-center text-gray-500">Tidak ada berita yang ditemukan.</p>`;
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

            document.querySelectorAll(".detail-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    const berita = beritaList[index];
                    if (berita) {
                        // Show detail berita in a modal or another way
                    }
                });
            });

            document.querySelectorAll(".edit-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    const berita = beritaList[index];
                    if (berita) {
                        document.getElementById("judul").value = berita.judul;
                        document.getElementById("deskripsi").value = berita.deskripsi;
                        preview.src = berita.gambar;
                        preview.classList.remove("hidden");
                        editIndex = index;
                        submitButton.textContent = "Edit Data";
                        cancelEditButton.classList.remove("hidden");
                        showAlert('Berita siap untuk diedit.', 'info');
                    }
                });
            });

            document.querySelectorAll(".hapus-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    beritaList.splice(index, 1);
                    localStorage.setItem("berita", JSON.stringify(beritaList));
                    // Update data berita di localStorage untuk halaman depan setelah hapus
                    localStorage.setItem("beritaDepan", JSON.stringify(beritaList.slice(0, 3))); // Ambil 3 berita terbaru
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
    }
};

export default Dashboard_Berita;