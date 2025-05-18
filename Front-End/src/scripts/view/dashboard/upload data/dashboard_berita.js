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
              <p class="text-center text-muted w-100">Memuat berita...</p>
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
    const beritaListContainer = document.getElementById("berita-list");
    let beritaList = [];

    async function ambilBeritaDariServer() {
      try {
        // **Perbaikan URL endpoint API sesuai backend router**
        const response = await fetch('http://localhost:5000/api/dashboardUploadBerita');
        if (!response.ok) throw new Error("Gagal fetch data");
        const data = await response.json();
        beritaList = data.reverse(); // Urutkan berita terbaru di atas
        tampilkanBerita();
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        beritaListContainer.innerHTML = `<p class="text-center text-danger w-100">Gagal mengambil data berita.</p>`;
      }
    }

    addBeritaBtn.addEventListener("click", () => {
      window.location.hash = '#/upload_berita';
    });

    function tampilkanBerita(searchTerm = "") {
      const filtered = beritaList.filter(b => b.judul.toLowerCase().includes(searchTerm.toLowerCase()));

      if (filtered.length === 0) {
        beritaListContainer.innerHTML = `<p class="text-center text-muted w-100">Tidak ada berita yang ditemukan.</p>`;
        return;
      }

      beritaListContainer.innerHTML = filtered.map(berita => {
        const deskripsiSingkat = berita.deskripsi.length > 100
          ? `${berita.deskripsi.slice(0, 100)}... <a href="#" class="selengkapnya text-primary" data-id="${berita._id}">Selengkapnya</a>`
          : berita.deskripsi;

        // Perbaikan URL gambar: berita.gambar sudah termasuk '/uploads/filename'
        const gambarSrc = berita.gambar ? `http://localhost:5000${berita.gambar}` : 'path/to/default-image.jpg';

        // Format tanggal agar tampil lebih rapi
        const tanggalFormatted = new Date(berita.tanggal).toLocaleDateString('id-ID', {
          day: 'numeric', month: 'long', year: 'numeric'
        });

        return `
          <div class="col-md-4">
            <div class="card h-100">
              <img src="${gambarSrc}" class="card-img-top" alt="${berita.judul}">
              <div class="card-body">
                <h5 class="card-title">${berita.judul}</h5>
                <p class="card-text">${deskripsiSingkat}</p>
                <p class="text-muted small">${tanggalFormatted}</p>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <button class="btn btn-primary edit-btn" data-id="${berita._id}">
                  <i class="bi bi-pencil-square"></i> Edit
                </button>
                <button class="btn btn-danger hapus-btn" data-id="${berita._id}">
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
      // Detail berita (selengkapnya)
      document.querySelectorAll(".selengkapnya").forEach(link => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          const id = this.getAttribute("data-id");
          const berita = beritaList.find(b => b._id === id);
          if (berita) {
            showAlert(
              `Detail Berita:<br><strong>${berita.judul}</strong><br>${berita.deskripsi.replace(/\n/g, '<br>')}<br><em>${new Date(berita.tanggal).toLocaleDateString('id-ID')}</em>`,
              'info'
            );
          }
        });
      });

      // Edit berita
      document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.getAttribute("data-id");
          if (!confirm("Apakah Anda yakin ingin mengedit berita ini?")) return;
      
          try {
            // Ambil data berita dari server berdasarkan id
            const response = await fetch(`http://localhost:5000/api/dashboardUploadBerita/${id}`, {
              method: 'GET',
            });
      
            if (!response.ok) throw new Error("Gagal mengambil data berita");
      
            const berita = await response.json();
      
            // Simpan data berita yang diambil ke localStorage (atau state global)
            localStorage.setItem('editBerita', JSON.stringify(berita));
      
            // Arahkan ke halaman edit/upload berita
            window.location.hash = '#/upload_berita';
      
          } catch (error) {
            console.error(error);
            showAlert("Gagal mengambil data berita untuk diedit.", "danger");
          }
        });
      });
      
      // Hapus berita
      document.querySelectorAll(".hapus-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
          const id = btn.getAttribute("data-id");
          if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;

          try {
            const response = await fetch(`http://localhost:5000/api/dashboardUploadBerita/${id}`, {
              method: 'DELETE',
            });
            if (!response.ok) throw new Error("Gagal menghapus berita");
            showAlert('Berita berhasil dihapus.', 'success');
            await ambilBeritaDariServer();
          } catch (err) {
            console.error(err);
            showAlert('Terjadi kesalahan saat menghapus berita.', 'danger');
          }
        });
      });
    }

    function showAlert(message, type) {
      // Hapus alert sebelumnya jika masih ada
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

    // Inisialisasi awal data berita
    await ambilBeritaDariServer();

    // Event search input
    searchInput.addEventListener("input", () => {
      tampilkanBerita(searchInput.value);
    });
  }
};

export default Dashboard_Berita;
