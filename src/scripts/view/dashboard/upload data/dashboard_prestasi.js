import MenuDashboard from '../../menu/menu_dashboard';

const Dashboard_Prestasi = {
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
                    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Upload Prestasi</h1>
                    <form id="upload-form" class="space-y-6 bg-gray-50 p-6 rounded-lg shadow">
                        <div>
                            <label class="block font-semibold text-lg text-gray-700">Judul Prestasi</label>
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
                        <button type="submit" id="submit-button" class="w-full bg-green-600 text-white p-3 rounded-lg text-xl font-semibold hover:bg-green-700 transition-all shadow">Upload Prestasi</button>
                        <button type="button" id="cancel-edit" class="hidden w-full bg-gray-500 text-white p-3 rounded-lg text-xl font-semibold hover:bg-gray-600 transition-all shadow">Batal</button>
                    </form>
                    <div class="mt-6">
                        <input type="text" id="search" class="w-full p-3 border rounded-lg text-lg focus:ring focus:ring-green-300" placeholder="Cari prestasi...">
                    </div>
                    <div id="prestasi-list" class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
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
        let prestasiList = JSON.parse(localStorage.getItem("prestasi")) || [];
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
                    if (!prestasiList.some(prestasi => prestasi.judul === judul && prestasi.tanggal === tanggal)) {
                        prestasiList.push({ judul, deskripsi, tanggal, gambar: gambarSrc });
                        try {
                            localStorage.setItem("prestasi", JSON.stringify(prestasiList));
                        } catch (e) {
                            if (e.name === 'QuotaExceededError') {
                                showAlert('Storage limit exceeded. Please delete some items.', 'danger');
                            }
                        }
                        form.reset();
                        preview.classList.add("hidden");
                        tampilkanPrestasi();
                        showAlert('Prestasi berhasil diupload.', 'success');
                    } else {
                        showAlert('Prestasi sudah ada.', 'warning');
                    }
                } else {
                    prestasiList[editIndex] = { judul, deskripsi, tanggal, gambar: gambarSrc };
                    localStorage.setItem("prestasi", JSON.stringify(prestasiList));
                    form.reset();
                    preview.classList.add("hidden");
                    tampilkanPrestasi();
                    showAlert('Prestasi berhasil diedit.', 'success');
                    editIndex = null;
                    submitButton.textContent = "Upload Prestasi";
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
            submitButton.textContent = "Upload Prestasi";
            cancelEditButton.classList.add("hidden");
        });

        searchInput.addEventListener("input", function() {
            tampilkanPrestasi(this.value);
        });

        function tampilkanPrestasi(searchTerm = "") {
            const filteredPrestasi = prestasiList.filter(prestasi => prestasi.judul.toLowerCase().includes(searchTerm.toLowerCase()));
            const prestasiListContainer = document.getElementById("prestasi-list");
            prestasiListContainer.innerHTML = filteredPrestasi.map((prestasi, index) => {
                const deskripsi = prestasi.deskripsi.length > 100 ? prestasi.deskripsi.substring(0, 100) + '... <a href="#" class="selengkapnya" data-index="' + index + '">Selengkapnya</a>' : prestasi.deskripsi;
                return `
                <div class="prestasi-item p-4 border rounded-lg shadow-lg">
                    <h3 class="text-xl font-bold">${prestasi.judul}</h3>
                    <p class="text-gray-700 whitespace-pre-line">${deskripsi}</p>
                    <p class="text-gray-500">${prestasi.tanggal}</p>
                    <img src="${prestasi.gambar}" alt="${prestasi.judul}" class="w-full h-32 object-cover rounded-lg mt-2">
                    <div class="mt-4 flex justify-between space-x-1">
                        <button class="detail-btn bg-blue-500 text-white p-2 rounded" data-index="${index}">Detail</button>
                        <button class="edit-btn bg-yellow-500 text-white p-2 rounded" data-index="${index}">Edit</button>
                        <button class="hapus-btn bg-red-500 text-white p-2 rounded" data-index="${index}">Hapus</button>
                    </div>
                </div>
                `;
            }).join("");

            if (filteredPrestasi.length === 0) {
                prestasiListContainer.innerHTML = `<p class="text-center text-gray-500">Tidak ada prestasi yang ditemukan.</p>`;
            }

            document.querySelectorAll(".selengkapnya").forEach(link => {
                link.addEventListener("click", function(event) {
                    event.preventDefault();
                    const index = this.getAttribute("data-index");
                    const prestasi = prestasiList[index];
                    if (prestasi) {
                        showAlert(`Detail Prestasi:<br>Judul: ${prestasi.judul}<br>Deskripsi: ${prestasi.deskripsi.replace(/\n/g, '<br>')}<br>Tanggal: ${prestasi.tanggal}`, 'info');
                    }
                });
            });

            document.querySelectorAll(".detail-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    const prestasi = prestasiList[index];
                    if (prestasi) {
                        // Show detail prestasi in a modal or another way
                    }
                });
            });

            document.querySelectorAll(".edit-btn").forEach(button => {
                button.addEventListener("click", function() {
                    const index = this.getAttribute("data-index");
                    const prestasi = prestasiList[index];
                    if (prestasi) {
                        document.getElementById("judul").value = prestasi.judul;
                        document.getElementById("deskripsi").value = prestasi.deskripsi;
                        preview.src = prestasi.gambar;
                        preview.classList.remove("hidden");
                        editIndex = index;
                        submitButton.textContent = "Edit Data";
                        cancelEditButton.classList.remove("hidden");
                        showAlert('Prestasi siap untuk diedit.', 'info');
                    }
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
    }
};

export default Dashboard_Prestasi;
