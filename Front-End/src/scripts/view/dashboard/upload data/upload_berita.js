import MenuDashboard from '../../menu/menu_dashboard';

const UploadBerita = {
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
          <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Upload Berita Baru</h1>
          <form id="upload-form" class="space-y-6">
            <div class="space-y-2">
              <label for="gambar" class="block text-sm font-semibold text-gray-700">Tambah Foto</label>
              <div class="flex items-center gap-4">
                <input type="file" id="gambar" accept="image/*" class="hidden">
                <label for="gambar" class="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors">
                  Pilih File
                </label>
                <span id="file-name" class="text-gray-500 text-sm">No file chosen</span>
              </div>
              <img id="preview" class="mt-4 hidden w-48 h-48 object-cover rounded-lg shadow-md" style="max-height: 200px; max-width: 200px;" alt="Preview Image">
            </div>
            <div class="space-y-2">
              <label for="judul" class="block text-sm font-semibold text-gray-700">Tambah Judul Berita</label>
              <input type="text" id="judul" placeholder="Tambahkan judul berita" class="w-2/3 px-4 py-2 border border-black rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none">
            </div>
            <div class="space-y-2">
              <label for="deskripsi" class="block text-sm font-semibold text-gray-700">Tambah Isi Berita</label>
              <textarea id="deskripsi" placeholder="Tambahkan isi berita" class="w-2/3 px-4 py-2 border border-black rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none" rows="6"></textarea>
            </div>
            <div class="mt-6">
              <button type="submit" id="submit-button" class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Tambah
              </button>
              <button type="button" id="cancel-edit" class="hidden bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 mt-3">
                Batal
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
    `;
  },

  async afterRender() {
    MenuDashboard.afterRender();
    const form = document.getElementById("upload-form");
    const judulInput = document.getElementById("judul");
    const deskripsiInput = document.getElementById("deskripsi");
    const gambarInput = document.getElementById("gambar");
    const fileNameDisplay = document.getElementById("file-name");
    const preview = document.getElementById("preview");
    const submitButton = document.getElementById("submit-button");
    const cancelEditButton = document.getElementById("cancel-edit");

    let editIndex = localStorage.getItem('editIndex');
    let editData = localStorage.getItem('editBerita');

    // Cek apakah ada data untuk diedit
    if (editData) {
      editData = JSON.parse(editData);
      judulInput.value = editData.judul;
      deskripsiInput.value = editData.deskripsi;
      preview.src = editData.gambar;
      preview.classList.remove("hidden");
      fileNameDisplay.textContent = 'Gambar sebelumnya';
      submitButton.textContent = "Simpan Perubahan";
      cancelEditButton.classList.remove("hidden");
      localStorage.removeItem('editBerita'); // Hapus data edit setelah digunakan
    }

    // Function to handle file selection and display file name
    gambarInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        fileNameDisplay.textContent = file.name;
        const reader = new FileReader();
        reader.onload = function (e) {
          preview.src = e.target.result;
          preview.classList.remove("hidden");
        };
        reader.readAsDataURL(file);
      } else {
        fileNameDisplay.textContent = "No file chosen";
        preview.classList.add("hidden");
      }
    });

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const judul = judulInput.value.trim();
      const deskripsi = deskripsiInput.value.trim();
      const gambarFile = gambarInput.files[0];
      let formData = new FormData();
      formData.append('judul', judul);
      formData.append('deskripsi', deskripsi);
      if (gambarFile) {
        formData.append('gambar', gambarFile);
      } else if (editData && editData.gambar) {
        // If no new image is selected during edit, send the old image path
        formData.append('gambarLama', editData.gambar);
      }

      try {
        const baseUrl = 'http://localhost:5000'; // Update to your backend base URL
        const url = editIndex !== null && editIndex !== undefined 
          ? `${baseUrl}/api/dashboardUploadBerita/${editIndex}` 
          : `${baseUrl}/api/dashboardUploadBerita`;
        const method = editIndex !== null && editIndex !== undefined ? 'PUT' : 'POST';

        const response = await fetch(url, {
          method: method,
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          showAlert(data.message || `Berita berhasil ${method === 'PUT' ? 'diperbarui' : 'diupload'}.`, 'success');
          form.reset();
          fileNameDisplay.textContent = "No file chosen";
          preview.classList.add("hidden");
          localStorage.removeItem('editIndex');
          editIndex = null;
          submitButton.textContent = "Tambah";
          cancelEditButton.classList.add("hidden");
          window.location.hash = '#/dashboard_berita';
        } else {
          showAlert(data.message || 'Terjadi kesalahan saat mengupload berita.', 'danger');
        }
      } catch (error) {
        console.error("Error uploading data:", error);
        showAlert('Terjadi kesalahan jaringan.', 'danger');
      }
    });

    cancelEditButton.addEventListener("click", function () {
      localStorage.removeItem('editIndex');
      editIndex = null;
      submitButton.textContent = "Tambah";
      cancelEditButton.classList.add("hidden");
      form.reset();
      fileNameDisplay.textContent = "No file chosen";
      preview.classList.add("hidden");
      window.location.hash = '#/dashboard_berita';
    });

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
  },
};

export default UploadBerita;